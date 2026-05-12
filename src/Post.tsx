import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import type { Comment, Post } from "../types";
import { useUser } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from 'remark-breaks'
import remarkGfm from "remark-gfm";
import "./Post.css";
import { CircleArrowLeft, ThumbsDown, ThumbsUp } from "lucide-react";

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isSignedIn, getToken } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/posts/${id}`)
        .then((res) => {
          setPost(res.data);
          setLikes(res.data.likes?.length || 0);
          setDislikes(res.data.dislikes?.length || 0);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    if (!id) return;
    setLoadingComments(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/${id}/comments`,
      );
      setComments(res.data);
    } catch (err) {
      console.error("Помилка завантаження коментарів:", err);
    } finally {
      setLoadingComments(false);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleVote = async (type: "like" | "dislike") => {
    const token = await getToken();
    if (!isSignedIn) {
      alert("Будь ласка, увійдіть, щоб оцінити пост");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${id}/vote`,
        { type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.error("Помилка голосування:", err);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isSignedIn) return;

    const token = await getToken();
    try {
      await axios.post(
        `http://localhost:5000/api/posts/${id}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setNewComment("");
      fetchComments();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response?.data?.message || "Не вдалося додати коментар");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const token = await getToken();
    if (!isSignedIn) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/posts/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchComments();
    } catch (err) {
      console.error("Помилка видалення коментаря:", err);
    }
  };

  if (!post) return <div className="text-center py-20">Завантаження...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10">
      <Link to="/" className="flex gap-2 text-blue-600 hover:text-blue-700 mb-6 justify-center">
        <CircleArrowLeft />
        <p>Назад до всіх постів</p>
      </Link>

      <div className="flex gap-6 h-fit mb-10 border-b pb-10">
        <img
          src={post.imageURL}
          alt="post_image"
          className="w-full max-w-[50%] min-h-[200px] rounded-md"
        />

        <div className="w-full max-w-[50%] flex flex-col gap-4 justify-center items-start">
          <h1 className="font-bold text-left">{post.title}</h1>

          <p className="">
            {new Date(post.createdAt).toLocaleDateString("uk-UA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handleVote("like")}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
            >
              <span><ThumbsUp /></span> {likes}
            </button>
            <button
              onClick={() => handleVote("dislike")}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
            >
              <span><ThumbsDown /></span> {dislikes}
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <img
              src={post.author.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">{post.author.name}</span>
          </div>
        </div>
      </div>

      <div className="prose max-w-none text-lg leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mt-10 border-t pt-10 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">
          Коментарі ({comments.length})
        </h2>

        {isSignedIn ? (
          <form onSubmit={handleAddComment} className="mb-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Напишіть коментар..."
              className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[100px]"
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Опублікувати коментар
            </button>
          </form>
        ) : (
          <div className="border border-(--border) p-4 rounded-lg mb-2 text-center">
            Увійдіть, щоб залишати коментарі
          </div>
        )}

        {loadingComments ? (
          <p>Завантаження коментарів...</p>
        ) : comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="flex gap-4">
                <img
                  src={comment.author.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-sm">
                      {new Date(comment.createdAt).toLocaleDateString("uk-UA")}
                    </span>
                    {user?.id === comment.authorId && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Видалити
                      </button>
                    )}
                  </div>
                  <p className="mt-1whitespace-pre-wrap text-left">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            Коментарів поки немає. Будьте першим!
          </p>
        )}
      </div>
    </div>
  );
};

export default SinglePost;

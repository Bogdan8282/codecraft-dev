import React, { useEffect, useState } from "react";
import type { Post } from "../types";
import { SignedIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useApi } from "./hooks/useApi";

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const api = useApi();

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts/dashboard");
      setPosts(res.data);
    } catch (err) {
      console.error("Помилка завантаження постів:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей пост?")) {
      try {
        await api.delete(`/posts/${id}`);
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== id));
      } catch (err) {
        alert("Помилка при видаленні");
        console.log(err);
      }
    }
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto p-6">Завантаження...</div>;
  }

  return (
    <div className="w-full px-6 py-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold mb-6">Мої пости</h1>
        <SignedIn>
          <Link
            to="/post/create"
            className="bg-green-600 text-white h-fit px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Написати пост
          </Link>
        </SignedIn>
      </div>
      <ul className="grid gap-4 grid-cols-1 xl:grid-cols-2">
        {posts.length === 0 ? (
          <p className="text-left text-lg">У вас ще немає постів...</p>
        ) : (
          posts.map((post) => (
            <li
              key={post._id}
              className="border px-4 py-2 rounded flex justify-between items-center gap-4"
            >
              <Link to={`/post/${post._id}`}>
                <h2 className="text-left">{post.title}</h2>
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Видалити
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type { Post } from "../types";
import { SignedIn } from "@clerk/clerk-react";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [sortBy, setSortBy] = useState("newest");

  const fetchPosts = async (query = searchQuery, sort = sortBy) => {
    setIsSearching(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append("search", query);
      if (sort) params.append("sort", sort);

      const url = `http://localhost:5000/api/posts?${params.toString()}`;
      const res = await axios.get(url);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchPosts(searchQuery, sortBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault();
    fetchPosts(searchQuery, sortBy);
  };

  const handleReset = () => {
    setSearchQuery("");
    fetchPosts("", sortBy);
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Блог</h1>
        <SignedIn>
          <Link
            to="/post/create"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            + Написати пост
          </Link>
        </SignedIn>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <form onSubmit={handleSearch} className="flex flex-1 gap-4">
          <input
            type="text"
            placeholder="Про що хочеш дізнатись..?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isSearching ? "Пошук..." : "Знайти"}
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-600 transition-colors"
            >
              X
            </button>
          )}
        </form>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white cursor-pointer"
        >
          <option value="newest">Найновіші</option>
          <option value="popular">Найпопулярніші</option>
          <option value="discussed">Найбільш обговорювані</option>
        </select>
      </div>

      <div className="space-y-8">
        {posts.length > 0
          ? posts.map((post) => (
              <div key={post._id} className="border-b pb-8 max-w-80">
                <Link to={`/post/${post._id}`}>
                  <h2 className="text-2xl font-semibold hover:text-blue-600">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(post.createdAt).toLocaleDateString("uk-UA")}
                </p>
                <p className="mt-3 text-lg line-clamp-3">
                  {post.content.substring(0, 280)}...
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={post.author.avatar}
                    alt="avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-500">
                    {post.author.name}
                  </span>
                </div>
                
                <Link
                  to={`/post/${post._id}`}
                  className="inline-block mt-4 text-blue-600 hover:underline"
                >
                  Читати повністю →
                </Link>
              </div>
            ))
          : "За вашим запитом нічого не знайдено..."}
      </div>
    </div>
  );
};

export default Home;

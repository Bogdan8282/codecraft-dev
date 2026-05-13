import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type { Post } from "../types";

import "./Home.css";
import { Search, SearchCheck, X } from "lucide-react";

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
    <div className="w-full mx-auto px-6 py-10">
      {/* <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold"></h1>
      </div> */}

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <form onSubmit={handleSearch} className="flex flex-1 gap-4">
          <input
            type="text"
            placeholder="Про що хочеш дізнатись..?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isSearching ? <SearchCheck /> : <Search />}
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-red-600 transition-colors"
            >
              <X />
            </button>
          )}
        </form>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="newest">Найновіші</option>
          <option value="popular">Найпопулярніші</option>
          <option value="discussed">Найбільш обговорювані</option>
        </select>
      </div>

      <div className="card-container">
        {posts.length > 0
          ? posts.map((post) => (
              <Link to={`/post/${post._id}`}>
                <div key={post._id} className="card">
                  <h2 className="font-semibold">
                    {post.title.substring(0, 80)}
                  </h2>
                  <p className="text-md line-clamp-3">
                    {post.content
                      .substring(0, 280)
                      .replace("#### ", "")
                      .replace("### ", "")
                      .replace("## ", "")
                      .replace("# ", "")
                      .replace("**", "")
                      .replace("__", "")}
                    ...
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt="avatar"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm">{post.author.name}</span>
                    </div>
                    <p className="text-sm">
                      {new Date(post.createdAt).toLocaleDateString("uk-UA")}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          : "За вашим запитом нічого не знайдено..."}
      </div>
    </div>
  );
};

export default Home;

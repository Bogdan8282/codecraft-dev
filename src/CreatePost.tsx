import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  const { getToken } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      console.log("TOKEN:", token);

      await axios.post(
        "http://localhost:5000/api/posts",
        { title, content, imageURL },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Помилка при створенні посту");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Створити новий пост</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Заголовок посту"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg text-lg"
        />
        <input
          type="text"
          placeholder="URL картинки"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-lg"
        />
        <textarea
          placeholder="Вміст посту..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={12}
          className="w-full p-3 border border-gray-300 rounded-lg text-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Опублікувати
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

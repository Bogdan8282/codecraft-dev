import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "./hooks/useApi";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const ToolbarButton: React.FC<{
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, active, title, children }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
      active
        ? "bg-blue-100 text-blue-700 border border-blue-300"
        : "text-gray-600 hover:bg-gray-100 border border-transparent"
    }`}
  >
    {children}
  </button>
);

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  const api = useApi();

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class: "min-h-[280px] p-3 focus:outline-none tiptap-content",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = editor?.getHTML() ?? "";
    try {
      await api.post("/posts", {
        title,
        content,
        imageURL,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Помилка при створенні посту");
    }
  };

  if (!editor) return null;

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
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
            <ToolbarButton
              title="Жирний (Ctrl+B)"
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
            >
              <strong>B</strong>
            </ToolbarButton>
            <ToolbarButton
              title="Курсив (Ctrl+I)"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
            >
              <em>I</em>
            </ToolbarButton>
            <ToolbarButton
              title="Підкреслений (Ctrl+U)"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={editor.isActive("underline")}
            >
              <span className="underline">U</span>
            </ToolbarButton>
            <ToolbarButton
              title="Закреслений"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              active={editor.isActive("strike")}
            >
              <span className="line-through">S</span>
            </ToolbarButton>

            <div className="w-px bg-gray-300 mx-1" />

            <ToolbarButton
              title="Заголовок 1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              active={editor.isActive("heading", { level: 1 })}
            >
              H1
            </ToolbarButton>
            <ToolbarButton
              title="Заголовок 2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={editor.isActive("heading", { level: 2 })}
            >
              H2
            </ToolbarButton>
            <ToolbarButton
              title="Заголовок 3"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              active={editor.isActive("heading", { level: 3 })}
            >
              H3
            </ToolbarButton>

            <div className="w-px bg-gray-300 mx-1" />

            <ToolbarButton
              title="Маркований список"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
            >
              • List
            </ToolbarButton>
            <ToolbarButton
              title="Нумерований список"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive("orderedList")}
            >
              1. List
            </ToolbarButton>
            <ToolbarButton
              title="Цитата"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              active={editor.isActive("blockquote")}
            >
              ❝
            </ToolbarButton>
            <ToolbarButton
              title="Код"
              onClick={() => editor.chain().focus().toggleCode().run()}
              active={editor.isActive("code")}
            >
              {"</>"}
            </ToolbarButton>

            <div className="w-px bg-gray-300 mx-1" />

            <ToolbarButton
              title="Скасувати (Ctrl+Z)"
              onClick={() => editor.chain().focus().undo().run()}
            >
              ↩
            </ToolbarButton>
            <ToolbarButton
              title="Повторити (Ctrl+Y)"
              onClick={() => editor.chain().focus().redo().run()}
            >
              ↪
            </ToolbarButton>
          </div>

          <EditorContent editor={editor} />
        </div>
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

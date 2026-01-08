import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", desc: "", author: "" });

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/api/post/${id}`, {
          headers: { "x-auth-token": token },
        });
        setPost(res.data);
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = { "x-auth-token": token };

    try {
      if (id) {
        await axios.post(`http://localhost:3000/api/post/edit/${id}`, post, {
          headers,
        });
      } else {
        await axios.post(`http://localhost:3000/api/posts`, post, { headers });
      }
      navigate("/posts");
    } catch (err) {
      alert("Error saving post");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-linear-to-br from-[#ffecd2] to-[#fcb69f] p-4 md:p-8 font-display">
      <div className="w-full max-w-180 mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-12">
        <div className="flex flex-col gap-2 mb-8 border-b border-[#f0f3f4] pb-6">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <span className="material-symbols-outlined text-lg">
              {id ? "edit_square" : "add_circle"}
            </span>
            <span>{id ? "Update Story" : "New Story"}</span>
          </div>
          <h1 className="text-[#121617] text-3xl md:text-4xl font-black leading-tight">
            {id ? "Edit Your Post" : "Create New Post"}
          </h1>
          <p className="text-[#657f86] text-base font-medium">
            Share your thoughts with the world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 group">
            <label className="text-[#121617] text-base font-bold">
              Post Title
            </label>
            <div className="relative">
              <input
                className="w-full rounded-2xl text-[#121617] focus:ring-4 focus:ring-primary/20 border border-[#dce3e5] h-14 px-5 text-base transition-all"
                placeholder="Enter an engaging title..."
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                required
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#9aaeb3]">
                title
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 group">
            <label className="text-[#121617] text-base font-bold">Author</label>
            <div className="relative">
              <input
                className="w-full rounded-2xl text-[#121617] focus:ring-4 focus:ring-primary/20 border border-[#dce3e5] h-14 px-5 text-base transition-all"
                placeholder="Writer's name"
                value={post.author}
                onChange={(e) => setPost({ ...post, author: e.target.value })}
                required
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#9aaeb3]">
                person
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 group">
            <label className="text-[#121617] text-base font-bold">
              Description
            </label>
            <div className="relative">
              <textarea
                className="w-full rounded-2xl text-[#121617] focus:ring-4 focus:ring-primary/20 border border-[#dce3e5] min-h-48 p-5 text-base transition-all resize-y"
                placeholder="Start writing your masterpiece here..."
                value={post.desc}
                onChange={(e) => setPost({ ...post, desc: e.target.value })}
                required
              />
              <span className="material-symbols-outlined absolute right-4 top-4 text-[#9aaeb3]">
                edit_note
              </span>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-4 pt-4 border-t border-[#f0f3f4]">
            <Link to="/posts">
              <button
                type="button"
                className="text-[#657f86] font-bold hover:text-black px-6 py-3"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full h-12 px-8 bg-primary text-black font-black shadow-lg hover:-translate-y-1 transition-all"
            >
              <span>{id ? "Update Post" : "Publish Post"}</span>
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;

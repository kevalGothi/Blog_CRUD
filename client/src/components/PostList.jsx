import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/api/posts", {
        headers: { "x-auth-token": token },
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    if (!confirm("Are you sure?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/post/${id}`, {
        headers: { "x-auth-token": token },
      });
      fetchPosts();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="bg-background-light min-h-screen font-display">
      <main className="px-4 py-8 md:px-10 lg:px-40">
        <div className="mx-auto max-w-300 flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[#121617] text-3xl md:text-5xl font-black">
                Latest Updates
              </h1>
              <p className="text-[#657f86] text-lg mt-2">
                Discover stories from writers on any topic.
              </p>
            </div>
            <Link
              to="/posts/new"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black rounded-full px-5 py-2.5 text-sm font-bold shadow-lg hover:-translate-y-1 transition-all"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Create Post</span>
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 md:gap-8 justify-center sm:justify-start">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col w-full min-[480px]:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] rounded-card border border-gray-200 shadow-inset-depth bg-surface-light p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Author
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {post.author}
                    </span>
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <h3 className="text-2xl font-black leading-tight mb-3 text-gray-900 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 mt-auto">
                  <Link to={`/posts/${post.id}`}>
                    <button className="px-5 py-2.5 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors">
                      Read More
                    </button>
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="px-5 py-2.5 rounded-full text-sm font-black text-black bg-primary hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostList;

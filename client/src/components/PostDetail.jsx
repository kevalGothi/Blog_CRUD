import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:3000/api/post/${id}`, {
          headers: { "x-auth-token": token },
        });
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="bg-background-light min-h-screen font-display flex flex-col">
      {/* Top Nav / Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#f0f3f4] bg-white/80 backdrop-blur-md">
        <div className="px-4 md:px-10 py-3 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#121617]">
            <Link
              to="/posts"
              className="flex items-center gap-2 hover:opacity-70"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="font-bold">Back</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-[#121617]">
              Welcome User
            </span>
          </div>
        </div>
      </header>

      <main className="grow w-full px-4 md:px-10 py-8 md:py-12">
        <div className="max-w-200 mx-auto flex flex-col gap-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[#657f86]">
            <Link to="/posts" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-[#121617] font-medium truncate max-w-50">
              {post.title}
            </span>
          </nav>

          {/* Post Header */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em] text-[#121617]">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#e5e7eb] pb-6">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-[#121617] font-bold text-base leading-none mb-1">
                    {post.author}
                  </span>
                  <span className="text-[#657f86] text-sm font-normal">
                    Published just now
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <Link
                to={`/posts/edit/${post.id}`}
                className="group flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-[#1e93b3] hover:brightness-110 hover:shadow-lg transition-all w-full sm:w-auto"
              >
                <span className="material-symbols-outlined text-black font-medium group-hover:rotate-12 transition-transform">
                  edit
                </span>
                <span className="text-black text-sm font-bold uppercase tracking-wide">
                  Edit Post
                </span>
              </Link>
            </div>
          </div>

          {/* Featured Image Placeholder (Since backend doesn't have images yet) */}
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm bg-gray-100 relative group">
            <div className="w-full h-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-primary/30">
                image
              </span>
            </div>
          </div>

          {/* Body Content */}
          <article className="flex flex-col gap-6 text-lg leading-relaxed text-[#121617]">
            <p className="whitespace-pre-wrap">{post.desc}</p>
          </article>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;

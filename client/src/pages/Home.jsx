import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/posts');
                setPosts(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4 py-8">
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-4">
                    <span className="block">Share your story</span>
                    <span className="block text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">with the world</span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-slate-500">
                    Discover stories, thinking, and expertise from writers on any topic.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 group">
                            <div className="h-48 overflow-hidden bg-slate-200 relative">
                                {post.img ? (
                                    <img src={post.img} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-pink-50 text-slate-300">
                                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>

                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                                            Article
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <Link to={`/post/${post.id}`} className="block mt-2">
                                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{post.title}</h2>
                                    </Link>
                                    <p className="mt-3 text-base text-slate-500 line-clamp-3 leading-relaxed">
                                        {post.desc.substring(0, 100)}...
                                    </p>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-900">
                                        {post.authorName || 'Anonymous'}
                                    </span>
                                    <Link to={`/post/${post.id}`} className="text-sm font-semibold text-primary hover:text-indigo-700">
                                        Read more &rarr;
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;

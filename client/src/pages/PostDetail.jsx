import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/posts/${id}`);
                setPost(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${id}`);
                navigate('/');
            } catch (err) {
                console.error(err);
                alert('Failed to delete post');
            }
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (!post) return <div className="text-center text-xl text-slate-500 py-12">Post not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="h-96 w-full overflow-hidden rounded-3xl relative shadow-2xl">
                {post.img ? (
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center text-slate-300">
                        <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                    <h1 className="text-4xl font-bold text-white mb-2 leading-tight">{post.title}</h1>
                    <div className="flex items-center text-white/90 space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                                {post.authorName ? post.authorName[0].toUpperCase() : 'A'}
                            </div>
                            <span className="font-medium">{post.authorName}</span>
                        </div>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-8 rounded-3xl" data-color-mode="light">
                        <MDEditor.Markdown
                            source={post.desc}
                            style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent', color: '#334155' }}
                        />
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    {/* User Controls */}
                    {user && user._id === post.authorId && (
                        <div className="glass-panel p-6 rounded-2xl space-y-4">
                            <h3 className="text-lg font-semibold text-slate-900">Manage Post</h3>
                            <div className="flex flex-col space-y-3">
                                <Link
                                    to={`/write?edit=${post.id}`}
                                    state={post}
                                    className="w-full py-2.5 px-4 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl font-medium text-center transition-colors"
                                >
                                    Edit Post
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="w-full py-2.5 px-4 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl font-medium text-center transition-colors"
                                >
                                    Delete Post
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Related or Other Info (Placeholder) */}
                    <div className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">About the Author</h3>
                        <p className="text-slate-500">
                            {post.authorName} is a writer on BlogPlus.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;

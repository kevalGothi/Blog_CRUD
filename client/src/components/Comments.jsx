import { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [submitting, setSubmitting] = useState(false);

    const fetchComments = async () => {
        try {
            const res = await api.get(`/posts/${postId}/comments`);
            setComments(res.data);
        } catch (err) {
            console.error('Failed to fetch comments', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            await api.post(`/posts/${postId}/comments`, { text: newComment });
            setNewComment('');
            fetchComments(); // Refresh list
        } catch (err) {
            console.error('Failed to post comment', err);
            alert('Failed to post comment');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-4 text-slate-400">Loading comments...</div>;

    return (
        <div className="glass-panel p-8 rounded-3xl space-y-8">
            <h3 className="text-2xl font-bold text-slate-800">
                Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            {user ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                            {user.username ? user.username[0].toUpperCase() : 'U'}
                        </div>
                        <div className="flex-grow space-y-3">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="What are your thoughts?"
                                className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500/20 resize-none h-32 transition-all placeholder:text-slate-400 text-slate-700"
                            />
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={submitting || !newComment.trim()}
                                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/30"
                                >
                                    {submitting ? 'Posting...' : 'Post Comment'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="p-6 bg-slate-50 rounded-xl text-center text-slate-600">
                    Please <a href="/login" className="text-indigo-600 font-medium hover:underline">log in</a> to leave a comment.
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="group animate-fade-in-up">
                            <div className="flex space-x-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0 shadow-sm">
                                    {comment.authorName ? comment.authorName[0].toUpperCase() : 'A'}
                                </div>
                                <div className="space-y-2 flex-grow">
                                    <div className="flex items-baseline justify-between">
                                        <h4 className="font-semibold text-slate-900">{comment.authorName}</h4>
                                        <span className="text-xs text-slate-400">
                                            {new Date(comment.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed text-base">{comment.text}</p>
                                </div>
                            </div>
                            <div className="h-px bg-slate-100 mt-6 group-last:hidden" />
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-slate-400 italic">
                        No comments yet. Be the first to share your thoughts!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comments;

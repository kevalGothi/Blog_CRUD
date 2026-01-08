import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import api from '../api';

const Write = () => {
    const state = useLocation().state;
    const navigate = useNavigate();

    const [title, setTitle] = useState(state?.title || '');
    const [desc, setDesc] = useState(state?.desc || '**Write your story here...**');
    const [img, setImg] = useState(state?.img || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (state) {
                await api.put(`/posts/${state.id}`, { title, desc, img });
            } else {
                await api.post('/posts', { title, desc, img });
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to save post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">
                {state ? 'Edit Post' : 'Create a New Post'}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-6 rounded-3xl space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full px-4 py-3 text-2xl font-bold border-b-2 border-slate-100 focus:border-primary outline-none bg-transparent placeholder-slate-300 transition-colors"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div data-color-mode="light">
                            <MDEditor
                                value={desc}
                                onChange={setDesc}
                                height={500}
                                preview="edit"
                                className="w-full rounded-xl overflow-hidden shadow-sm border border-slate-100"
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Publishing</h3>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Featured Image URL</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                            />
                        </div>

                        {img && (
                            <div className="aspect-video rounded-lg overflow-hidden bg-slate-100">
                                <img src={img} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="pt-4 border-t border-slate-100">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : (state ? 'Update' : 'Publish')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;

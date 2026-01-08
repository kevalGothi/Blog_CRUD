import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 w-full glass-panel border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            BlogPlus
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Home</Link>
                        {user ? (
                            <>
                                <Link to="/write" className="text-gray-700 hover:text-primary transition-colors font-medium">Write</Link>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-500">Hi, {user.username}</span>
                                    <button
                                        onClick={logout}
                                        className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-sm font-semibold"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-700 hover:text-primary transition-colors font-medium">Login</Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2.5 rounded-full bg-primary text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm font-semibold"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

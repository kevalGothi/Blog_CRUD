import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/30 blur-3xl opacity-50 mix-blend-multiply filter animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-200/30 blur-3xl opacity-50 mix-blend-multiply filter animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-3xl opacity-50 mix-blend-multiply filter animate-blob animation-delay-4000"></div>
            </div>

            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;

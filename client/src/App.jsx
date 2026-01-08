import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './pages/PostDetail';
import Write from './pages/Write';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/write" element={user ? <Write /> : <Navigate to="/login" />} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;

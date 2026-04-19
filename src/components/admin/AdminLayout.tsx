import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

export default function AdminLayout() {
<<<<<<< HEAD
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
=======
  const { isAuthenticated, user, loading } = useSelector((state: any) => state.auth);
>>>>>>> 0ba62f8 (added stripe)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
<<<<<<< HEAD
=======
  if (loading || (!user && isAuthenticated)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-primary animate-spin"></div>
      </div>
    );
  }

>>>>>>> 0ba62f8 (added stripe)
  if (!user?.is_staff) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#faf9f6] font-[var(--font-display)]">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto w-full p-8 relative animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}

import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[var(--color-background)] font-[var(--font-display)]">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto w-full p-8 relative animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}

import { FolderTree, FileWarning, MessageSquareWarning, ReplyAll } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const stats = [
    { name: 'Categories', path: '/admin/categories', icon: <FolderTree size={24} className="text-blue-500" /> },
    { name: 'Project Reports', path: '/admin/reports/projects', icon: <FileWarning size={24} className="text-orange-500" /> },
    { name: 'Comment Reports', path: '/admin/reports/comments', icon: <MessageSquareWarning size={24} className="text-purple-500" /> },
    { name: 'Reply Reports', path: '/admin/reports/replies', icon: <ReplyAll size={24} className="text-red-500" /> },
  ];

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">Admin Dashboard</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Welcome back. Select a module to manage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.path}
            className="card p-6 flex flex-col items-center justify-center gap-4 hover:shadow-lg transition-shadow border border-[var(--color-border-secondary)] hover:border-[var(--color-primary)]"
          >
            <div className="p-4 bg-[var(--color-surface-container)] rounded-full">
              {stat.icon}
            </div>
            <h3 className="font-semibold text-lg text-[var(--color-text-primary)]">{stat.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

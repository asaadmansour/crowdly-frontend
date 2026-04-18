import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
}

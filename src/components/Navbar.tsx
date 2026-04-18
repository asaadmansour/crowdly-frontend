import { Link, NavLink, useNavigate } from 'react-router-dom';
import type { NavLinkRenderProps } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../store/slices/authSlicer';

export default function Navbar() {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinkClasses = ({ isActive }: NavLinkRenderProps): string =>
    `relative py-1 duration-300 hover:text-primary-hover transition-all ` +
    (isActive
      ? 'text-primary border-b-2 border-primary'
      : 'text-on-surface border-b-2 border-transparent');

  const handleLogout = () => {
    dispatch(removeToken());
    navigate('/login');
  };

  return (
    /* slide down on page load */
    <nav className="w-full sticky top-0 z-50 animate-slide-down">
      <div className="w-[90%] mx-auto flex items-center justify-between py-4">

        <Link to="/" className="headline-md font-bold">
          Crowdly
        </Link>

        <div className="flex space-x-6 uppercase font-medium">
          <NavLink to="/explore"    className={navLinkClasses}>Explore</NavLink>
          <NavLink to="/categories" className={navLinkClasses}>Categories</NavLink>
          <NavLink to="/about"      className={navLinkClasses}>About</NavLink>
          <NavLink to="/contact"    className={navLinkClasses}>Contact</NavLink>
        </div>

        {isAuthenticated ? (
          <div className="flex justify-between items-center space-x-4">
            <Link to="/">
              <button type="button" className="btn-primary">
                Start A Campaign
              </button>
            </Link>
            <Link to="/profile" className="border-2 p-2 rounded-full">
              <User className="cursor-pointer hover:text-primary-hover duration-300" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="border-2 p-2 rounded-full hover:text-primary-hover hover:border-primary-hover duration-300 transition-all"
              title="Logout"
            >
              <LogOut className="cursor-pointer" size={20} />
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center space-x-4">
            <Link to="/login">
              <p className="uppercase hover:text-primary-hover duration-300 transition-colors">
                Login
              </p>
            </Link>
            <Link to="/register">
              <button type="button" className="btn-primary">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
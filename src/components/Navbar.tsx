import { Link, NavLink } from 'react-router-dom';
import type { NavLinkRenderProps } from 'react-router-dom';
import { User } from 'lucide-react';

export default function Navbar() {
  const loggedInUser = true;

  const navLinkClasses = ({ isActive }: NavLinkRenderProps): string =>
    `relative py-1 duration-300 hover:text-primary-hover transition-all ` +
    (isActive
      ? 'text-primary border-b-2 border-primary'
      : 'text-on-surface border-b-2 border-transparent');

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

        {loggedInUser ? (
          <div className="flex justify-between items-center space-x-4">
            <Link to="/">
              <button type="button" className="btn-primary">
                Start A Campaign
              </button>
            </Link>
            <Link to="/profile" className="border-2 p-2 rounded-full">
              <User className="cursor-pointer hover:text-primary-hover duration-300" />
            </Link>
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
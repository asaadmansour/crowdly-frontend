import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import type { NavLinkRenderProps } from 'react-router-dom';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const loggedInUser = true;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = ({ isActive }: NavLinkRenderProps): string =>
    `relative py-1 duration-300 transition-all text-sm font-medium tracking-wide ` +
    (isActive
      ? "text-primary"
      : "text-on-background hover:text-primary");

  const containerVariants: any = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.nav
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav-scrolled shadow-md'
          : 'glass-nav bg-background/50'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-[90%] mx-auto flex items-center justify-between py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="headline-md font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent"
          >
            Crowdly
          </Link>
        </motion.div>

        <motion.div className="flex space-x-8 uppercase font-medium" variants={itemVariants}>
          <NavLink to="/explore" className={navLinkClasses}>
            {({ isActive }) => (
              <div className="relative">
                <span>Explore</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            )}
          </NavLink>
          <NavLink to="/categories" className={navLinkClasses}>
            {({ isActive }) => (
              <div className="relative">
                <span>Categories</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            )}
          </NavLink>
          <NavLink to="/about" className={navLinkClasses}>
            {({ isActive }) => (
              <div className="relative">
                <span>About</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            )}
          </NavLink>
          <NavLink to="/contact" className={navLinkClasses}>
            {({ isActive }) => (
              <div className="relative">
                <span>Contact</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            )}
          </NavLink>
        </motion.div>

        <motion.div variants={itemVariants}>
          {loggedInUser ? (
            <div className="flex justify-between items-center space-x-4">
              <Link to="/">
                <motion.button
                  type="button"
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start A Campaign
                </motion.button>
              </Link>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/profile" className="border-2 border-primary p-2 rounded-full inline-block">
                  <User className="cursor-pointer text-primary hover:text-primary-hover duration-300" size={20} />
                </Link>
              </motion.div>
            </div>
          ) : (
            <div className="flex justify-between items-center space-x-4">
              <Link to="/login">
                <motion.p
                  className="uppercase hover:text-primary duration-300 transition-colors text-sm font-medium"
                  whileHover={{ x: 5 }}
                >
                  Login
                </motion.p>
              </Link>
              <Link to="/register">
                <motion.button
                  type="button"
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
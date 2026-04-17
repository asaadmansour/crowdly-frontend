import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
  };

  const floatingVariants: any = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-background flex items-center justify-center px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center max-w-2xl w-full" variants={containerVariants}>
        {/* 404 Number with animation */}
        <motion.div
          className="mb-8 relative"
          variants={floatingVariants}
          animate="float"
        >
          <motion.h1
            className="display-lg text-gradient font-black"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            404
          </motion.h1>

          {/* Decorative circle */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 rounded-full border-2 border-primary opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="headline-md text-on-background mb-4 font-bold"
          variants={itemVariants}
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="body-lg text-text-secondary mb-8 max-w-lg mx-auto"
          variants={itemVariants}
        >
          The page you're looking for seems to have wandered off. Don't worry, we have plenty of
          other amazing campaigns to explore!
        </motion.p>

        {/* Buttons Container */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          {/* Back Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => window.history.back()}
              className="btn-secondary flex items-center gap-2 group"
            >
              <motion.div
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowLeft size={18} />
              </motion.div>
              Go Back
            </button>
          </motion.div>

          {/* Home Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <button className="btn-primary flex items-center gap-2">
                <Home size={18} />
                Back to Home
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Explore Suggestions */}
        <motion.div className="mt-12 pt-8 border-t border-border-secondary" variants={itemVariants}>
          <motion.p className="text-text-secondary text-sm mb-6" variants={itemVariants}>
            Or explore these popular categories:
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
          >
            {['Explore', 'Categories', 'About', 'Contact'].map((link) => (
              <motion.div
                key={link}
                variants={itemVariants}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <Link to={`/${link.toLowerCase()}`}>
                  <button className="btn-secondary text-sm hover:border-primary hover:text-primary transition-colors">
                    {link}
                  </button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-10 left-10 w-20 h-20 rounded-full border-2 border-primary opacity-5"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-20 left-1/3 w-16 h-16 rounded-full border border-primary opacity-5"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  );
}

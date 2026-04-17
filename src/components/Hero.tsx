import doodle from '../assets/hero-doodle.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30, duration: 0.8 },
    },
  };

  const imageVariants: any = {
    hidden: { opacity: 0, x: 50, rotate: -10 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 200, damping: 20, duration: 0.8 },
    },
    float: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      className="bg-surface-container/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen w-[90%] mx-auto flex justify-between items-center">
        <motion.div
          className="max-w-[50%]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="label-md text-primary tracking-wider uppercase"
            variants={itemVariants}
          >
            Become the positivity you hope
          </motion.p>

          <motion.h1
            className="font-black text-5xl mt-4 leading-tight"
            variants={itemVariants}
          >
            Back the Ideas That <br /> Deserve to Exist
          </motion.h1>

          <motion.h2
            className="mt-4 body-lg max-w-md text-xl text-text-secondary"
            variants={itemVariants}
          >
            Discover campaigns from creators, change makers, and communities around the world. We create
            the bold unique, and the essential.
          </motion.h2>

          {/* Buttons */}
          <motion.div className="flex space-x-5 mt-8 flex-wrap gap-4" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/campaigns">
                <button type="button" className="btn-primary">
                  Start A Campaign
                </button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/explore">
                <button type="button" className="btn-secondary">
                  Explore Projects
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Doodle with floating animation */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={doodle}
            alt="doodle art"
            animate="float"
            variants={imageVariants}
            className="max-w-xl"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

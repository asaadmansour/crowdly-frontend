import { motion } from 'framer-motion';

export default function SuspenseSpinner() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const orbitVariants: any = {
    rotate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const pulseVariants: any = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center" variants={itemVariants}>
        {/* Animated Loader */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-8"
          variants={orbitVariants}
          animate="rotate"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary opacity-30"></div>

          {/* Middle ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-3 border-transparent border-b-primary opacity-60"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          ></motion.div>

          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"
            variants={pulseVariants}
            animate="pulse"
          ></motion.div>
        </motion.div>

        {/* Loading text */}
        <motion.h2
          className="headline-md text-on-background mb-3"
          variants={itemVariants}
        >
          Loading
        </motion.h2>

        <motion.div className="flex gap-1 justify-center" variants={itemVariants}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>

        {/* Subtle message */}
        <motion.p
          className="text-text-secondary text-sm mt-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Please wait while we prepare something amazing...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

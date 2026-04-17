import { motion } from 'framer-motion';

export default function Latest() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30, duration: 0.8 },
    },
  };

  const cardVariants: any = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
    hover: {
      y: -10,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transition: { type: 'spring' as const, stiffness: 400, damping: 30 },
    },
  };

  return (
    <motion.div
      className="bg-surface-container/60 mt-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="min-h-screen w-[90%] mx-auto mt-8">
        {/* Text part */}
        <motion.div
          className="flex justify-between items-start gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2 className="headline-md text-3xl font-bold whitespace-nowrap" variants={itemVariants}>
            Just Launched
          </motion.h2>
          <motion.p className="body-lg max-w-md text-text-secondary" variants={itemVariants}>
            These are the freshest projects we can offer! We like to help new projects by featuring them in our homepage!
          </motion.p>
        </motion.div>

        {/* Container + Cards */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="bg-surface-highest rounded-lg overflow-hidden cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-orange-500/10 flex items-center justify-center">
                <motion.p
                  className="text-text-secondary font-semibold"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  NEW PROJECT {index}
                </motion.p>
              </div>
              <div className="p-6">
                <motion.div
                  className="h-4 bg-border-secondary rounded w-3/4 mb-3"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="h-3 bg-border-secondary rounded w-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

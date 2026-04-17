import { motion } from 'framer-motion';

export default function Motive() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const quoteVariants: any = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
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
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Text part */}
          <motion.p
            className="text-primary text-7xl uppercase italic tracking-widest font-black"
            variants={quoteVariants}
          >
            "
          </motion.p>

          <motion.h2
            className="headline-md mt-4 text-center max-w-[50%] text-2xl font-bold leading-relaxed"
            variants={itemVariants}
          >
            Crowdy is the democratization of opportunity, where the value of an idea is decided by the people, not the gatekeepers.
          </motion.h2>

          <motion.p
            className="body-md text-center max-w-md text-text-secondary py-4 uppercase tracking-wide text-sm"
            variants={itemVariants}
          >
            -The Crowdy Team
          </motion.p>
        </motion.div>

        {/* Category Bubble Container */}
        <motion.div
          className="mt-40 flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2 className="font-black text-3xl" variants={itemVariants}>
            Find What Moves You
          </motion.h2>

          {/* Bubble Category */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-center"
            variants={containerVariants}
          >
            {['Technology', 'Social', 'Education', 'Environment', 'Health'].map((category) => (
              <motion.div
                key={category}
                className="px-6 py-3 rounded-full border-2 border-primary/30 hover:border-primary cursor-pointer transition-colors"
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(255, 86, 0, 0.1)',
                  borderColor: 'rgb(255, 86, 0)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-on-background font-medium">{category}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

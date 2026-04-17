import { motion } from 'framer-motion';

export default function Featured() {
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
      className="mt-10"
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
            className="text-primary uppercase italic tracking-widest text-sm"
            variants={itemVariants}
          >
            The Editor's choice
          </motion.p>

          <motion.h2 className="headline-md mt-4 text-3xl font-bold" variants={itemVariants}>
            Hand-Picked by Our Team
          </motion.h2>

          <motion.p
            className="body-lg text-center max-w-2xl text-text-secondary py-4"
            variants={itemVariants}
          >
            Every week, our editorial admins select five projects that demonstrate a story that needs to be told.
            A gesture towards humanity and a brighter future.
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
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-orange-500/20 flex items-center justify-center">
                <motion.p
                  className="text-text-secondary font-semibold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  PLACEHOLDER {index}
                </motion.p>
              </div>
              <div className="p-6">
                <motion.div
                  className="h-4 bg-border-secondary rounded w-3/4 mb-3"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="h-3 bg-border-secondary rounded w-full mb-2"
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

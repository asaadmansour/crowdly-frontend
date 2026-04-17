import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'

export default function Footer() {
  const today = new Date();

  const footerLinkClasses = `relative py-1 duration-300 hover:text-primary transition-all text-on-surface border-b-2 border-transparent hover:border-primary`

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const iconVariants: any = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.2, color: 'rgb(255, 86, 0)' },
  };

  return (
    <motion.footer
      className="bg-gradient-to-br from-outline-variant/40 to-surface-container/30 border-t border-border-secondary/30 mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="w-[90%] mx-auto flex justify-between py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Motto */}
        <motion.div className="flex flex-col space-y-4" variants={itemVariants}>
          <motion.p className="text-2xl font-black text-gradient">
            Crowdly
          </motion.p>
          <motion.p className="max-w-xs text-text-secondary body-md">
            Helping people co-operate and fill in the blanks! All for one and one for all!
          </motion.p>
        </motion.div>

        {/* Platform Tab */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-col space-y-4 uppercase">
            <p className="text-sm font-black tracking-wider">
              Platform
            </p>

            <div className="text-sm flex flex-col space-y-2">
              <Link to="/campaigns" className={footerLinkClasses}>
                Start A Campaign
              </Link>

              <Link to="/categories" className={footerLinkClasses}>
                View Categories
              </Link>

              <Link to="/explore" className={footerLinkClasses}>
                Explore Projects
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Company Tab */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-col space-y-4 uppercase">
            <p className="text-sm font-black tracking-wider">
              Company
            </p>

            <div className="text-sm flex flex-col space-y-2">
              <Link to="/about" className={footerLinkClasses}>
                About Us
              </Link>

              <Link to="/contact" className={footerLinkClasses}>
                Contact
              </Link>

              <Link to="/privacy&terms" className={footerLinkClasses}>
                Privacy & Terms
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="w-[90%] mx-auto h-px bg-gradient-to-r from-transparent via-border-secondary to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />

      {/* Socials links */}
      <motion.div
        className="flex space-x-8 justify-center mt-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className="cursor-pointer"
        >
          <FaFacebook size="1.5em" />
        </motion.div>
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className="cursor-pointer"
        >
          <FaSquareXTwitter size="1.5em" />
        </motion.div>
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className="cursor-pointer"
        >
          <FaYoutube size="1.5em" />
        </motion.div>
      </motion.div>

      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <p className="text-text-secondary text-sm">
          {today.getFullYear()} &copy; Crowdly All Rights Reserved
        </p>
      </motion.div>
    </motion.footer>
  )
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);

      // Update active section based on scroll position
      const sections = ['hero', 'experience', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMenuOpen(false);
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.a 
        className={styles.title} 
        href="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={styles.titleText}>Pavan</span>
        <span className={styles.titleAccent}>Kumar</span>
      </motion.a>
      
      <div className={styles.menu}>
        <motion.button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <motion.div
            className={styles.hamburger}
            animate={menuOpen ? "open" : "closed"}
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 }
              }}
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -8 }
              }}
            />
          </motion.div>
        </motion.button>
        
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              className={styles.menuItems}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {[
                { name: 'Experience', id: 'experience' },
                { name: 'Skills', id: 'skills' },
                { name: 'Projects', id: 'projects' },
                { name: 'Contact', id: 'contact' }
              ].map((item, index) => (
                <motion.li key={item.id} variants={itemVariants}>
                  <motion.button
                    className={`${styles.menuLink} ${activeSection === item.id ? styles.active : ''}`}
                    onClick={() => smoothScrollTo(item.id)}
                    whileHover={{ 
                      scale: 1.05,
                      color: "#64ffda"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    <motion.div 
                      className={styles.linkUnderline}
                      whileHover={{ scaleX: 1 }}
                    />
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        
        {/* Desktop Menu */}
        <ul className={styles.desktopMenu}>
          {[
            { name: 'Experience', id: 'experience' },
            { name: 'Skills', id: 'skills' },
            { name: 'Projects', id: 'projects' },
            { name: 'Contact', id: 'contact' }
          ].map((item) => (
            <motion.li key={item.id}>
              <motion.button
                className={`${styles.menuLink} ${activeSection === item.id ? styles.active : ''}`}
                onClick={() => smoothScrollTo(item.id)}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                <motion.div 
                  className={styles.linkUnderline}
                  whileHover={{ scaleX: 1 }}
                />
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

import React, { useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredLink, setHoveredLink] = useState(null);

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const linksVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  const contactLinks = [
    {
      icon: "contact/emailIcon.png",
      href: "mailto:pknuthi@ucdavis.edu",
      label: "pknuthi@ucdavis.edu",
      type: "email",
      hoverColor: "#0077b5"
    },
    {
      icon: "contact/linkedinIcon.png",
      href: "https://linkedin.com/in/pavan-k-nuthi",
      label: "linkedin/pavan-k-nuthi",
      type: "linkedin",
      hoverColor: "#0077b5"
    },
    {
      icon: "contact/githubIcon.png",
      href: "https://github.com/pavan-nuthi",
      label: "github/pavan-nuthi",
      type: "github",
      hoverColor: "#0077b5"
    }
  ];

  return (
    <footer id="contact" className={styles.container} ref={containerRef}>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={styles.content}
      >
        {/* Background Effects */}
        <motion.div 
          className={styles.backgroundGradient}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div variants={titleVariants} className={styles.textSection}>
          <motion.div className={styles.titleContainer}>
            <motion.h2 
              className={styles.title}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 20px rgba(100, 255, 218, 0.5)"
              }}
            >
              <span className={styles.titleNumber}>04.</span>
              <span className={styles.titleText}>Get In Touch</span>
            </motion.h2>
            <motion.div 
              className={styles.titleLine}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>
          
          <motion.p 
            className={styles.description}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, delay: 0.2 }
              }
            }}
          >
            Whether you have a question or just want to say hi!
            Let's create something <span className={styles.highlight}>amazing</span> together.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className={styles.linksSection}
          variants={linksVariants}
        >
          <motion.ul className={styles.links}>
            {contactLinks.map((link, index) => {
              return (
                <motion.li 
                  key={`contact-${link.type}-${index}`}
                  className={styles.link}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      y: 30,
                      rotateX: 90
                    },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      rotateX: 0,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut"
                      }
                    }
                  }}
                  onHoverStart={() => setHoveredLink(index)}
                  onHoverEnd={() => setHoveredLink(null)}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className={styles.linkContainer}
                    animate={{
                      backgroundColor: hoveredLink === index ? 
                        `${link.hoverColor}15` : "rgba(10, 25, 47, 0.8)",
                      borderColor: hoveredLink === index ? 
                        `${link.hoverColor}80` : "rgba(100, 255, 218, 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className={styles.iconContainer}
                      whileHover={{
                        rotate: 360,
                        scale: 1.2,
                        transition: { duration: 0.6 }
                      }}
                    >
                      <img src={getImageUrl(link.icon)} alt={`${link.type} icon`} />
                    </motion.div>
                    
                    <motion.a 
                      href={link.href}
                      target={link.type !== 'email' ? '_blank' : '_self'}
                      rel={link.type !== 'email' ? 'noopener noreferrer' : undefined}
                      className={styles.linkText}
                      whileHover={{
                        color: link.hoverColor,
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {link.label}
                      <motion.div 
                        className={styles.linkUnderline}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ backgroundColor: link.hoverColor }}
                      />
                    </motion.a>
                    
                    <motion.div 
                      className={styles.linkGlow}
                      animate={{
                        opacity: hoveredLink === index ? 0.4 : 0,
                        scale: hoveredLink === index ? 1.5 : 0.8
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ background: `radial-gradient(circle, ${link.hoverColor}30, transparent)` }}
                    />
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
        
        {/* Footer Text */}
        <motion.div 
          className={styles.footerText}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { duration: 0.6, delay: 1 }
            }
          }}
        >
          <motion.p
            whileHover={{
              color: "#64ffda",
              transition: { duration: 0.2 }
            }}
          >
            Designed & Built by Pavan Kumar Nuthi
          </motion.p>
          <motion.div 
            className={styles.scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑
          </motion.div>
        </motion.div>
        
        {/* Background Particles */}
        <motion.div 
          className={styles.backgroundDecoration}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </footer>
  );
};

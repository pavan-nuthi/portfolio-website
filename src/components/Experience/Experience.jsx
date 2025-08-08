import React, { useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

import styles from "./Experience.module.css";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredItem, setHoveredItem] = useState(null);

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



  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  return (
    <section className={styles.container} id="experience" ref={containerRef}>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className={styles.content}
      >
        <motion.div variants={titleVariants} className={styles.titleSection}>
          <motion.h2 
            className={styles.title}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 20px rgba(100, 255, 218, 0.5)"
            }}
          >
            <span className={styles.titleNumber}>01.</span>
            <span className={styles.titleText}>Where I've Worked</span>
          </motion.h2>
          <motion.div 
            className={styles.titleLine}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>



        {/* Timeline Section */}
        <motion.div className={styles.timelineSection} variants={timelineVariants}>
          <motion.div className={styles.timelineLine} />
          <motion.ul className={styles.history}>
            {history.map((historyItem, id) => {
              const isLast = id === history.length - 1;
              return (
                <motion.li 
                  key={`history-${historyItem.organisation}-${id}`}
                  className={styles.historyItem}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      x: id % 2 === 0 ? -50 : 50,
                      scale: 0.8
                    },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        ease: "easeOut"
                      }
                    }
                  }}
                  onHoverStart={() => setHoveredItem(id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <motion.div 
                    className={styles.timelineIcon}
                    animate={{
                      scale: hoveredItem === id ? 1.2 : 1,
                      backgroundColor: hoveredItem === id ? "rgba(100, 255, 218, 0.8)" : "rgba(100, 255, 218, 0.6)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={getImageUrl(historyItem.imageSrc)}
                      alt={`${historyItem.organisation} Logo`}
                      className={styles.expIcon}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 }
                      }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className={styles.historyItemDetails}
                    animate={{
                      backgroundColor: hoveredItem === id ? "rgba(100, 255, 218, 0.05)" : "rgba(10, 25, 47, 0.8)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3
                      whileHover={{
                        color: "#64ffda",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <span className={styles.role}>{historyItem.role}</span>
                      <span className={styles.at}> @ </span>
                      <span className={styles.organisation}>{historyItem.organisation}</span>
                    </motion.h3>
                    
                    <motion.p 
                      className={styles.dateRange}
                      whileHover={{
                        color: "#64ffda",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {historyItem.startDate} - {historyItem.endDate}
                    </motion.p>
                    
                    <motion.ul 
                      className={styles.experienceList}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.2
                          }
                        }
                      }}
                    >
                      {historyItem.experiences.map((experience, expId) => {
                        return (
                          <motion.li 
                            key={`exp-${expId}-${historyItem.organisation}`}
                            variants={{
                              hidden: { opacity: 0, x: -10 },
                              visible: { 
                                opacity: 1, 
                                x: 0,
                                transition: { duration: 0.4 }
                              }
                            }}
                            whileHover={{
                              x: 5,
                              color: "#64ffda",
                              transition: { duration: 0.2 }
                            }}
                          >
                            {experience}
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  </motion.div>
                  
                  {/* Connecting line for timeline */}
                  {!isLast && (
                    <motion.div 
                      className={styles.timelineConnector}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
        
        {/* Background decorations */}
        <motion.div 
          className={styles.backgroundDecoration1}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div 
          className={styles.backgroundDecoration2}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
};

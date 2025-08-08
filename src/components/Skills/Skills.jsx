import React, { useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

import styles from "./Skills.module.css";
import skills from "../../data/skills.json";
import { getImageUrl } from "../../utils";

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

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

  const skillsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className={styles.container} id="skills" ref={containerRef}>
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
            <span className={styles.titleNumber}>02.</span>
            <span className={styles.titleText}>Technologies I work with</span>
          </motion.h2>
          <motion.div 
            className={styles.titleLine}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className={styles.skillsSection}
          variants={skillsVariants}
        >
          <motion.div className={styles.skills}>
            {skills.map((skill, id) => {
              return (
                <motion.div 
                  key={`skill-${skill.title}-${id}`}
                  className={styles.skill}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      rotateY: 0,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut"
                      }
                    }
                  }}
                >
                  <div className={styles.skillImageContainer}>
                    <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
                  </div>
                  <p>{skill.title}</p>
                </motion.div>
              );
            })}
          </motion.div>
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

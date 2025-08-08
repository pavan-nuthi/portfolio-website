import React, { useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
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
        staggerChildren: 0.2
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

  const projectsGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className={styles.container} id="projects" ref={containerRef}>
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
            <span className={styles.titleNumber}>03.</span>
            <span className={styles.titleText}>Featured Projects</span>
          </motion.h2>
          <motion.div 
            className={styles.titleLine}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
        
        <motion.div 
          className={styles.projects}
          variants={projectsGridVariants}
        >
          {projects.map((project, id) => {
            return (
              <motion.div
                key={id}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 50,
                    rotateX: 15
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
              >
                <ProjectCard project={project} index={id} />
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Background decoration */}
        <motion.div 
          className={styles.backgroundDecoration}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.div>
    </section>
  );
};

import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1000}
      scale={1.02}
      transitionSpeed={2000}
      gyroscope={true}
    >
      <motion.div
        className={styles.container}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          y: -10,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        <motion.div className={styles.imageContainer}>
          <motion.img
            src={getImageUrl(imageSrc)}
            alt={`Image of ${title}`}
            className={styles.image}
            variants={imageVariants}
            initial="hidden"
            animate={imageLoaded ? "visible" : "hidden"}
            onLoad={() => setImageLoaded(true)}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4 }
            }}
          />
          <motion.div 
            className={styles.imageOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className={styles.overlayContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1 : 0.8, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span>View Project</span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div className={styles.content}>
          <motion.h3 
            className={styles.title}
            whileHover={{
              color: "#64ffda",
              transition: { duration: 0.2 }
            }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {description}
          </motion.p>
          
          <motion.ul 
            className={styles.skills}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            {skills.map((skill, id) => {
              return (
                <motion.li 
                  key={`${title}-${skill}-${id}`}
                  className={styles.skill}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.4 }
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(100, 255, 218, 0.2)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {skill}
                </motion.li>
              );
            })}
          </motion.ul>
          
          <motion.div 
            className={styles.links}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.4, duration: 0.3 }
            }}
            viewport={{ once: true }}
          >
            <motion.a 
              href={source} 
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(100, 255, 218, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View on GitHub</span>
              <motion.div 
                className={styles.linkIcon}
                whileHover={{ x: 3 }}
              >
                →
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Card glow effect */}
        <motion.div 
          className={styles.cardGlow}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </Tilt>
  );
};

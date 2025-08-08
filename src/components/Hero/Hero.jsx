import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Typewriter from "typewriter-effect";
import Tilt from "react-parallax-tilt";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    // Initialize particles
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#64ffda" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#64ffda",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
          }
        },
        retina_detect: true
      });
    }
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
    });
  };

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className={styles.container} ref={ref} onMouseMove={handleMouseMove}>
      <div id="particles-js" className={styles.particles}></div>
      
      <motion.div 
        className={styles.backgroundGradient}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(100, 255, 218, 0.1) 0%, transparent 50%)`
        }}
      />
      
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={itemVariants} className={styles.titleWrapper}>
          <h1 className={styles.title}>
            <span className={styles.greeting}>Hi, I'm</span>
            <span className={styles.name}>
              <Typewriter
                options={{
                  strings: ['Pavan Kumar', 'a Developer', 'a Problem Solver'],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                  deleteSpeed: 50,
                }}
              />
            </span>
          </h1>
        </motion.div>
        
        <motion.div variants={itemVariants} className={styles.descriptionWrapper}>
          <p className={styles.description}>
            I'm a <span className={styles.highlight}>Computer Science graduate student</span> at UC Davis,{' '}
            with hands-on experience building <span className={styles.highlight}>scalable infrastructure</span>,{' '}
            identity solutions, and distributed systems at{' '}
            <span className={styles.company}>Athenahealth</span> and <span className={styles.company}>Sprinklr</span>.{' '}
            Currently seeking opportunities as a{' '}
            <span className={styles.highlight}>Software Development Engineer (SDE)</span>,{' '}
            <span className={styles.highlight}>Backend Engineer</span>,{' '}
            <span className={styles.highlight}>Full Stack Engineer</span>,{' '}
            <span className={styles.highlight}>Frontend Engineer</span>, or{' '}
            <span className={styles.highlight}>DevOps Engineer</span>.
          </p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          className={styles.buttonContainer}
        >
          <motion.button
            className={styles.cvBtn}
            onClick={() => {window.open(getImageUrl("hero/Resume_Pavan_UCD.pdf"), '_blank');}}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(100, 255, 218, 0.1)",
              boxShadow: "0 10px 25px rgba(100, 255, 218, 0.2)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Resume</span>
            <motion.div 
              className={styles.btnRipple}
              whileHover={{ scale: 1.5, opacity: 0 }}
            />
          </motion.button>
        </motion.div>

      </motion.div>
      
      <motion.div className={styles.imageContainer}>
        <Tilt
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={1000}
          glareEnable={true}
          glareMaxOpacity={0.45}
          scale={1.02}
        >
          <motion.img
            src={getImageUrl("hero/heroImage.png")}
            alt="Hero image of me"
            className={styles.heroImg}
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            whileHover={{ scale: 1.05 }}
            style={floatingAnimation}
          />
        </Tilt>
        
        <motion.div 
          className={styles.glowEffect}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};

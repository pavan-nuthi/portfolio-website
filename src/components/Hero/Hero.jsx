import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Pavan</h1>
        <p className={styles.description}>
        I graduated with a degree in Computer Science and Engineering from PES University. I gained experience as a Devops Intern at Sprinklr. I am seeking opportunities as a Software Engineer,Devops Engineer or Systems Engineer.
        </p>
        <div className={styles.buttonContainer}>
        <a href="mailto:pavankumarnuthi@gmail.com" className={styles.contactBtn}>
          Contact Me
        </a>
        <button
          className={styles.cvBtn}
          onClick={() => {window.open(getImageUrl("hero/Resume.pdf"), '_blank');}}
        >
          Resume
        </button>
      </div>
      </div>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};

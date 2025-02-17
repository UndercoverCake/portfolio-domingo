import styles from "./hero.module.css"

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.glowEffect}></div>

      <div className={styles.decorativeElement}>
        <svg viewBox="0 0 200 200" fill="currentColor">
          <circle cx="0" cy="200" r="100" />
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.mainContent}>
            <h1 className={styles.name}>Kent Harold Domingo</h1>
            <p className={styles.description}>
            Welcome! This is a collection my own proud accomplishments in IT as well as the step by step of the work during my journey as a student of IT.
            </p>
            <a href="#" className={styles.ctaButton}>
              Learn more about me!
            </a>
          </div>

          <div className={styles.imageGrid}>
            <div className={styles.imageWrapper}>
              <img src="/K.jpg" alt="Project 1" className={styles.image} />

            </div>
            <div className={styles.imageWrapper}>
              <img src="/Proj1.png" alt="Project 2" className={styles.image} />
            </div>
            <div className={styles.imageWrapper}>
              <img src="/proj3.png" alt="Project 3" className={styles.image} />

            </div>
            <div className={styles.imageWrapper}>
              <img src="/Proj2.png" alt="Project 4" className={styles.image} />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



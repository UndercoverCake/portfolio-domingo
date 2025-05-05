import { useEffect, useState } from "react"
import styles from "./hero.module.css"
import { Link } from "react-router-dom"

export default function Hero() {
  const [typedName, setTypedName] = useState("")
  const [typedDescription, setTypedDescription] = useState("")
  const [showDescriptionCursor, setShowDescriptionCursor] = useState(true)
  const fullName = "Kent Harold Domingo"
  const fullDescription =
    "Welcome! This is a collection of my own proud accomplishments in IT as well as the step by step of the work during my journey as a student of IT."

  useEffect(() => {
    let nameIndex = 0
    let descIndex = 0
    const nameSpeed = 150
    const descSpeed = 20

    const nameTypingInterval = setInterval(() => {
      if (nameIndex <= fullName.length) {
        setTypedName(fullName.slice(0, nameIndex))
        nameIndex++
      } else {
        clearInterval(nameTypingInterval)
      }
    }, nameSpeed)

    const descTypingInterval = setInterval(() => {
      if (descIndex <= fullDescription.length) {
        setTypedDescription(fullDescription.slice(0, descIndex))
        descIndex++
      } else {
        clearInterval(descTypingInterval)
      }
    }, descSpeed)

    const blinkInterval = setInterval(() => {
      setShowDescriptionCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(nameTypingInterval)
      clearInterval(descTypingInterval)
      clearInterval(blinkInterval)
    }
  }, [])

  return (
    <div className={styles.hero}>
      <div className={styles.glowEffect}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.mainContent}>
            <div className={styles.textWrapper}>
              <h1 className={styles.name}>
                <span className={styles.nameText}>{typedName}</span>
              </h1>
              <p className={styles.description}>
                {typedDescription}
                {typedDescription.length === fullDescription.length && showDescriptionCursor && (
                  <span className={styles.cursor}>|</span>
                )}
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <Link to="/aboutme" className={styles.ctaButton}>
                About me!
                <span className={styles.buttonGlow}></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from "react"
import styles from "./ImageViewer.module.css"

const ImageViewer = ({ isOpen, imageUrl, onClose, alt }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 300) // Match this with the CSS transition time
  }

  if (!isOpen) return null

  return (
    <div className={`${styles.overlay} ${isAnimating ? styles.active : ""}`} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className={styles.imageContainer}>
          <img src={imageUrl || "/placeholder.svg"} alt={alt || "Enlarged image"} className={styles.fullImage} />
        </div>
      </div>
    </div>
  )
}

export default ImageViewer

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if we're scrolling up or down
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setVisible(false)
      } else {
        // Scrolling up
        setVisible(true)
      }

      // Always show navbar when at the top
      if (currentScrollY < 50) {
        setVisible(true)
        setScrolled(false)
      } else {
        setScrolled(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          KD
        </Link>

        <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <div className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
          <Link to="/" className={location.pathname === "/" ? styles.active : ""}>
            Home
          </Link>
          <Link to="/aboutme" className={location.pathname === "/aboutme" ? styles.active : ""}>
            About Me
          </Link>
          <Link to="/blog" className={location.pathname.includes("/blog") ? styles.active : ""}>
            Blog
          </Link>
          <Link to="/projects" className={location.pathname === "/projects" ? styles.active : ""}>
            Projects
          </Link>
          <Link to="/contact" className={location.pathname === "/contact" ? styles.active : ""}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

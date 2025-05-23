import styles from "./About-Me.module.css"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const projects = [
  {
    id: 1,
    title: "Daily Time Record Information Management System",
    description: "A project that was made to ease the DTR generation and storage of College of Computing studies.",
    image: "/Proj1.png?height=200&width=300&text=Project+1",
    link: "#",
    projectId: "project-1", // Added projectId to link to Projects page
  },
  {
    id: 2,
    title: "E-commerce and logistics system for direct suppliers",
    description: "Ongoing project that involves B2B transactions.",
    image: "/ECALSDS.png?height=200&width=300&text=Project+2",
    link: "#",
    projectId: "project-2", // Added projectId to link to Projects page
  },
  {
    id: 3,
    title: "Pokemon simulator",
    description: "A simple pokemon simulator.",
    image: "/pokemon-sim.png?height=200&width=300&text=Project+3",
    link: "#",
    projectId: "project-3", // Added projectId to link to Projects page
  },
]

const portfolioItems = [
  { id: 1, image: "/Brochure.png?height=300&width=300&text=Portfolio+1", alt: "Portfolio Item 1" },
  { id: 2, image: "/poster.png?height=300&width=300&text=Portfolio+2", alt: "Portfolio Item 2" },
  { id: 3, image: "/PrimaryLogo.png?height=300&width=300&text=Portfolio+3", alt: "Portfolio Item 3" },
  { id: 4, image: "/Print.png?height=300&width=300&text=Portfolio+4", alt: "Portfolio Item 4" },
]

const AboutMe = () => {
  const sectionRefs = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate)
          }
        })
      },
      { threshold: 0.1 },
    )

    sectionRefs.current.forEach((ref) => observer.observe(ref))

    return () => observer.disconnect()
  }, [])

  const handleProjectClick = (projectId) => {
    navigate("/projects", { state: { highlightProject: projectId } })
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header} ref={(el) => (sectionRefs.current[0] = el)}>
          <div className={styles.avatarContainer}>
            <img src="/K.jpg?height=150&width=150" alt="Your Name" className={styles.avatar} />
            <div className={styles.avatarRing}></div>
          </div>
          <h1 className={styles.name}>Kent Harold Domingo</h1>
          <p className={styles.tagline}>BSIT Student</p>
        </div>

        <section className={styles.section} ref={(el) => (sectionRefs.current[1] = el)}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <p>
            I am a backend web developer specializing in Python and the Django framework. With a strong focus on
            building scalable, secure, and efficient web applications, I have experience designing and managing
            databases, and optimizing backend performance.
          </p>
        </section>

        <section className={styles.section} ref={(el) => (sectionRefs.current[3] = el)}>
          <h2 className={styles.sectionTitle}>Projects / Works</h2>
          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <div
                key={project.id}
                className={styles.projectCard}
                onClick={() => handleProjectClick(project.projectId)}
              >
                <div className={styles.projectImageContainer}>
                  <img src={project.image || "/placeholder.svg"} alt={project.title} className={styles.projectImage} />
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.viewProjectLink}>View Project Details</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} ref={(el) => (sectionRefs.current[4] = el)}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skillsContainer}>
            {[
              "Web Development",
              "Project Management",
              "Graphic Designing",
              "Database Design",
              "API Development",
              "Python",
              "Django",
              "JavaScript",
              "React",
            ].map((skill) => (
              <span key={skill} className={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.section} ref={(el) => (sectionRefs.current[5] = el)}>
          <h2 className={styles.sectionTitle}>Other works</h2>
          <div className={styles.portfolioGrid}>
            {portfolioItems.map((item) => (
              <div key={item.id} className={styles.portfolioItem}>
                <img src={item.image || "/placeholder.svg"} alt={item.alt} className={styles.portfolioImage} />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection} ref={(el) => (sectionRefs.current[6] = el)}>
          <h2 className={styles.sectionTitle}>Let's Connect!</h2>
          <p className={styles.ctaText}>
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.contactIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+63 966 156 9116</span>
            </div>
            <div className={styles.contactItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.contactIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:domingokentharold@gmail.com">domingokentharold@gmail.com</a>
            </div>
            <div className={styles.socialLinks}>
              <a
                href="https://www.facebook.com/kento.haroldo"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.socialIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://github.com/UndercoverCake"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.socialIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/kent-harold-domingo"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.socialIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AboutMe

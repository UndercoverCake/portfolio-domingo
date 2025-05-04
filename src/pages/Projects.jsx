"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import styles from "./Projects.module.css"
import { projects } from "/data/projectsData.js"
import ImageViewer from "../components/ImageViewer"

export default function Projects() {
  const [animatedProjects, setAnimatedProjects] = useState([])
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedImageAlt, setSelectedImageAlt] = useState("")
  const projectsRef = useRef([])
  const location = useLocation()
  const highlightedProjectRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.dataset.id
            setAnimatedProjects((prev) => [...prev, projectId])
          }
        })
      },
      { threshold: 0.1 },
    )

    projectsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Check if we need to highlight a specific project (coming from About Me page)
    if (location.state && location.state.highlightProject) {
      const projectId = location.state.highlightProject
      const projectElement = document.getElementById(projectId)

      if (projectElement) {
        // Scroll to the project with a small delay to ensure animation is complete
        setTimeout(() => {
          projectElement.scrollIntoView({ behavior: "smooth", block: "center" })
          // Add a highlight effect
          projectElement.classList.add(styles.highlighted)
          // Remove the highlight effect after animation
          setTimeout(() => {
            projectElement.classList.remove(styles.highlighted)
          }, 2000)
        }, 500)
      }
    }
  }, [location.state])

  const handleImageClick = (imageUrl, alt) => {
    setSelectedImage(imageUrl)
    setSelectedImageAlt(alt)
    setViewerOpen(true)
  }

  return (
    <div className={styles.projectsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Projects</h1>
          <p className={styles.subtitle}>
            A collection of my work, including weekly projects and other software development endeavors
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={project.id}
              ref={(el) => (projectsRef.current[index] = el)}
              data-id={project.id}
              className={`${styles.projectCard} ${animatedProjects.includes(project.id) ? styles.animate : ""}`}
            >
              <div className={styles.projectImageContainer}>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={styles.projectImage}
                  onClick={() => handleImageClick(project.image, project.title)}
                />
                {project.featured && <div className={styles.featuredBadge}>Featured</div>}
              </div>
              <div className={styles.projectContent}>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.technologies}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.technology}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.linkIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      Repository
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.linkIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageViewer
        isOpen={viewerOpen}
        imageUrl={selectedImage}
        alt={selectedImageAlt}
        onClose={() => setViewerOpen(false)}
      />
    </div>
  )
}

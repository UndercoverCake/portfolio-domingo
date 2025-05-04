"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import styles from "./BlogPost.module.css"
import { blogPosts } from "/data/blogData.js"
import ImageViewer from "../components/ImageViewer"

export default function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [nextPost, setNextPost] = useState(null)
  const [prevPost, setPrevPost] = useState(null)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedImageAlt, setSelectedImageAlt] = useState("")

  useEffect(() => {
    // Simulate loading
    setLoading(true)
    window.scrollTo(0, 0)

    setTimeout(() => {
      const currentPost = blogPosts.find((post) => post.id === id)
      setPost(currentPost)

      const currentIndex = blogPosts.findIndex((post) => post.id === id)
      setPrevPost(currentIndex > 0 ? blogPosts[currentIndex - 1] : null)
      setNextPost(currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null)

      setLoading(false)
    }, 500)
  }, [id])

  const handleImageClick = (imageUrl, alt) => {
    setSelectedImage(imageUrl)
    setSelectedImageAlt(alt)
    setViewerOpen(true)
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className={styles.errorContainer}>
        <h2>Blog post not found</h2>
        <Link to="/blog" className={styles.backLink}>
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.blogPostPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.day}>Week {post.day}</span>
            <span className={styles.date}>{post.date}</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>
        </div>

        <div className={styles.content}>
          {post.content.map((section, index) => (
            <div key={index} className={styles.section}>
              {section.heading && <h2 className={styles.sectionHeading}>{section.heading}</h2>}
              {section.text && <p className={styles.sectionText}>{section.text}</p>}
              {section.image && (
                <div className={styles.sectionImageContainer}>
                  <img
                    src={section.image || "/placeholder.svg"}
                    alt={section.imageAlt || ""}
                    className={styles.sectionImage}
                    onClick={() => handleImageClick(section.image, section.imageAlt || section.heading || "")}
                  />
                  {section.imageCaption && <p className={styles.imageCaption}>{section.imageCaption}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.navigation}>
          {prevPost && (
            <Link to={`/blog/${prevPost.id}`} className={`${styles.navLink} ${styles.prevLink}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.navIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <div>
                <span className={styles.navLabel}>Previous</span>
                <span className={styles.navTitle}>
                  Week {prevPost.day}: {prevPost.title}
                </span>
              </div>
            </Link>
          )}

          {nextPost && (
            <Link to={`/blog/${nextPost.id}`} className={`${styles.navLink} ${styles.nextLink}`}>
              <div>
                <span className={styles.navLabel}>Next</span>
                <span className={styles.navTitle}>
                  Week {nextPost.day}: {nextPost.title}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.navIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          )}
        </div>

        <div className={styles.backToBlogs}>
          <Link to="/blog" className={styles.backLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.backIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to All Blogs
          </Link>
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

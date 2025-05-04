"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import styles from "./Blog.module.css"
import { blogPosts } from "/data/blogData"
import ImageViewer from "../components/ImageViewer"

export default function Blog() {
  const [animatedPosts, setAnimatedPosts] = useState([])
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedImageAlt, setSelectedImageAlt] = useState("")
  const postsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const postId = entry.target.dataset.id
            setAnimatedPosts((prev) => [...prev, postId])
          }
        })
      },
      { threshold: 0.1 },
    )

    postsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const handleImageClick = (imageUrl, alt) => {
    setSelectedImage(imageUrl)
    setSelectedImageAlt(alt)
    setViewerOpen(true)
  }

  return (
    <div className={styles.blogPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Practicum development blog</h1>
          <p className={styles.subtitle}>
            This is my catalog of how our crew is developing the required system for Practicum
          </p>
        </div>

        <div className={styles.blogGrid}>
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              ref={(el) => (postsRef.current[index] = el)}
              data-id={post.id}
              className={`${styles.blogCard} ${animatedPosts.includes(post.id) ? styles.animate : ""}`}
            >
              <div className={styles.blogImageContainer}>
                <img
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  className={styles.blogImage}
                  onClick={() => handleImageClick(post.coverImage, post.title)}
                />
                <div className={styles.blogDay}>Week {post.day}</div>
              </div>
              <div className={styles.blogContent}>
                <h2 className={styles.blogTitle}>{post.title}</h2>
                <p className={styles.blogDate}>{post.date}</p>
                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className={styles.readMoreLink}>
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.readMoreIcon}
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

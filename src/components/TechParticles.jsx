"use client"

import { useEffect, useRef, useState } from "react"

const TechParticles = () => {
  const canvasRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  const animationFrameId = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Tech-themed icons and symbols
    const techSymbols = ["</>", "{}", "[]", "//", "==", "=>", "&&", "||", "++", "**", "##", "$$", "@@"]

    // Initialize particles if not already done
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `hsla(${Math.random() * 60 + 200}, 70%, 60%, ${Math.random() * 0.5 + 0.1})`,
        symbol: techSymbols[Math.floor(Math.random() * techSymbols.length)],
        useSymbol: Math.random() > 0.7, // 30% chance to use a symbol instead of a dot
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Mouse interaction
        if (mousePosition.x !== null && mousePosition.y !== null) {
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            // Repel particles from mouse
            const angle = Math.atan2(dy, dx)
            const force = (100 - distance) / 1000
            particle.speedX -= Math.cos(angle) * force
            particle.speedY -= Math.sin(angle) * force

            // Limit speed
            const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
            if (speed > 2) {
              particle.speedX = (particle.speedX / speed) * 2
              particle.speedY = (particle.speedY / speed) * 2
            }
          }
        }

        // Draw particle
        ctx.globalAlpha = 0.7

        if (particle.useSymbol) {
          // Draw tech symbol
          ctx.font = `${particle.size * 5}px monospace`
          ctx.fillStyle = particle.color
          ctx.fillText(particle.symbol, particle.x, particle.y)
        } else {
          // Draw circle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
        }

        // Connect nearby particles with lines
        particlesRef.current.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(66, 153, 225, ${0.2 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [dimensions, mousePosition])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2, // Increased z-index to ensure visibility
      }}
    />
  )
}

export default TechParticles

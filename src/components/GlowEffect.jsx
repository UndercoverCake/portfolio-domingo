import { useEffect, useRef } from "react"

const GlowEffect = () => {
  const glowRef = useRef(null)

  useEffect(() => {
    const glowElement = glowRef.current

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e

      // Update the glow position to follow the mouse
      glowElement.style.background = `radial-gradient(
        600px circle at ${clientX}px ${clientY}px,
        rgba(66, 153, 225, 0.15),
        transparent 40%
      )`
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  )
}

export default GlowEffect

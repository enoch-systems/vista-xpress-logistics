import React, { useState, useRef } from 'react'

const LazyImage = ({ src, alt, className, placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af'%3ELoading...%3C/text%3E%3C/svg%3E" }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    // Fallback to placeholder on error
    setIsLoaded(true)
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      <img
        src={isInView ? (isLoaded ? src : placeholder) : placeholder}
        alt={alt}
        className={`transition-opacity duration-300 ${className} ${!isLoaded ? 'opacity-70' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

export default LazyImage

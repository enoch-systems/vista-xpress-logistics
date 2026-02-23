import React, { useState, useEffect, useRef } from 'react'
import vistaImage from '../assets/vista.jpeg'

const VistaImage = () => {
  const images = ['/assets/vista.jpeg', '/assets/vista.jpeg', '/assets/vista.jpeg', '/assets/vista.jpeg', '/assets/vista.jpeg']
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef(null)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000) // Auto-play every 4 seconds
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-right')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="px-4 py-4 relative">
      <style>
        {`
          @keyframes zoom {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .zoom-effect {
            animation: zoom 4s ease-in-out infinite;
          }
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-slide-in-right {
            animation: slideInRight 0.8s ease-out forwards;
          }
          .opacity-0 {
            opacity: 0;
          }
        `}
      </style>
      <div 
        ref={sectionRef}
        className="opacity-0"
      >
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
          src={images[currentIndex]}
          alt={`Vista Express Logistics - Image ${currentIndex + 1}`}
          className="w-full h-auto zoom-effect"
        />
          
          {/* Navigation buttons hidden */}
        </div>
        
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full ${
                index === currentIndex ? 'w-4 h-4 bg-amber-600' : 'w-2 h-2 bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default VistaImage;

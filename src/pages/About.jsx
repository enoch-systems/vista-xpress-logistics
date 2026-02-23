import React, { useEffect, useRef, useState } from 'react'

const AboutSection = () => {
  const sectionRef = useRef(null)
  const images = ['/assets/ceo1.jpg', '/assets/ceo2.jpg']
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000) // Auto-play every 4 seconds
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.classList.contains('opacity-0')) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate-slide-in-bottom')
          }
        })
      },
      { threshold: 0.2 }
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
    <section className="bg-gray-100 py-12 px-4 md:py-16 lg:py-20">
      <div className="container mx-auto text-center px-4 md:px-6 lg:px-8">
        <h2 className="block mt-1 text-lg md:text-xl lg:text-2xl leading-tight font-semibold text-black uppercase mb-8 md:mb-10 lg:mb-12">MEET THE LEAD FACILITATOR</h2>
        
        <div 
          ref={sectionRef}
          className="max-w-4xl mx-auto opacity-0"
        >
          {/* Image Carousel */}
          <div className="relative flex items-center justify-center mb-6 md:mb-8 lg:mb-10">
            <div className="relative overflow-hidden rounded-lg  w-76 h-76 md:w-72 md:h-72 lg:w-96 lg:h-96">
              <img
                src={images[currentIndex]}
                alt={`Ezinne Vivian Chinwendu - Image ${currentIndex + 1}`}
                className="w-full h-full object-contain zoom-effect transition-transform duration-1000 ease-in-out hover:scale-110"
              />
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mb-6 md:mb-8 lg:mb-10 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-4 h-4 bg-orange-500 scale-110' 
                    : 'w-2 h-2 bg-gray-400 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
          
          {/* Description */}
          <div className="text-center max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-6 md:mb-8 lg:mb-10">
            <p className="mt-2 text-gray-500 text-sm md:text-base lg:text-lg leading-relaxed md:leading-relaxed lg:leading-relaxed">
              Ezinne Vivian Chinwendu is the founder of Vista Express Logistics Academy. With years of experience in importation and logistics, she has helped countless individuals start and grow their mini-importation businesses. Her practical approach and industry insights make her the perfect guide for anyone looking to enter the profitable world of international trade.
            </p>
          </div>
          
          {/* Learn More Button */}
          <div className="text-center">
            <a href="#" className="text-orange-500 hover:text-orange-700 text-sm md:text-base lg:text-lg font-semibold">
              Know more {'>'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

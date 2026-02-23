import React, { useState, useEffect } from 'react'

const TestimonialSection = () => {
  const images = ['/assets/t1.jpg', '/assets/t2.jpg', '/assets/t3.jpg', '/assets/t4.jpg', '/assets/t5.jpg', '/assets/t6.jpg', '/assets/t7.jpg']
  const [currentIndex, setCurrentIndex] = useState(0)

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
    const interval = setInterval(nextSlide, 5000) // Auto-play every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-gray-100 py-12 md:py-16 lg:py-20 px-4">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="block mt-1 text-lg md:text-xl lg:text-2xl leading-tight font-semibold text-black uppercase text-center mb-8 md:mb-10 lg:mb-12">TESTIMONIALS</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-lg ">
            <img
              src={images[currentIndex]}
              alt={`Testimonial - Image ${currentIndex + 1}`}
              className="w-full h-auto max-h-[40rem] object-contain"
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
      </div>
    </section>
  )
}

export default TestimonialSection;

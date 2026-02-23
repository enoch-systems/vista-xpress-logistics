import React, { useEffect, useRef } from 'react'

const AboutSection = () => {
  const sectionRef = useRef(null)

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
    <section className="bg-blue-50 py-12 px-4">
      <style>
        {`
          @keyframes slideInBottom {
            from {
              opacity: 0;
              transform: translateY(100px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-in-bottom {
            animation: slideInBottom 0.8s ease-out forwards;
          }
          .opacity-0 {
            opacity: 0;
          }
        `}
      </style>
      <div 
        ref={sectionRef}
        className="container mx-auto opacity-0"
      >
        <p className="text-center text-gray-600 text-sm mb-2">About</p>
        <h2 className="block mt-1 text-lg leading-tight font-semibold text-amber-600 uppercase text-center">MEET THE LEAD FACILITATOR</h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Image Container with Navigation */}
          <div className="relative flex items-center justify-center mb-6">
            <button className="absolute left-0 text-gray-400 hover:text-gray-600 text-2xl">
              ‹
            </button>
            
            <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src="/assets/vista.jpeg" 
                alt="Ezinne Vivian Chinwendu" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <button className="absolute right-0 text-gray-400 hover:text-gray-600 text-2xl">
              ›
            </button>
          </div>
          
          {/* Description */}
          <div className="text-center max-w-2xl mx-auto mb-6">
            <p className="mt-2 text-gray-500">
              Ezinne Vivian Chinwendu is the founder of Vista Express Logistics Academy. With years of experience in importation and logistics, she has helped countless individuals start and grow their mini-importation businesses. Her practical approach and industry insights make her the perfect guide for anyone looking to enter the profitable world of international trade.
            </p>
          </div>
          
          {/* Learn More Button */}
          <div className="text-center">
            <button className="border-2 border-orange-500 text-orange-500 px-6 py-2 rounded-full font-medium hover:bg-orange-500 hover:text-white transition duration-300">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

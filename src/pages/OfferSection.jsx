import React, { useEffect, useRef } from 'react'

const OfferSection = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.classList.contains('opacity-0')) {
            // Add a small delay to ensure DOM is ready
            setTimeout(() => {
              entry.target.classList.remove('opacity-0')
              entry.target.classList.add('animate-slide-in-left')
            }, 100)
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
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
    <section id="offers-section" className="py-12 md:py-16 lg:py-20 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className="bg-white rounded-lg shadow-lg overflow-hidden md:flex opacity-0"
        >
          <div className="md:flex-shrink-0">
            <img
              className="h-full w-full object-cover md:w-56 lg:w-64"
              src="/assets/vista.jpeg"
              alt="Offer Image"
            />
          </div>
          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm md:text-base lg:text-lg text-black font-semibold">Special Offer</div>
            <h2 className="block mt-1 text-lg md:text-xl lg:text-2xl leading-tight font-bold text-black uppercase">
              First 20 students gets ₦20,000
            </h2>
            <p className="mt-2 text-gray-500 text-sm md:text-base lg:text-lg leading-relaxed">
              Limited spots available. Enroll now to claim your bonus and start your mini-importation journey with expert guidance.
            </p>
            <div className="mt-4 md:mt-6 lg:mt-8">
              <a href="#" className="text-orange-500 hover:text-orange-700 text-sm md:text-base lg:text-lg font-semibold">
                Know more {'>'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;

import React, { useEffect, useRef } from 'react'

const CourseSection = () => {
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
    <section id="courses-section" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="bg-gray-100 rounded-lg shadow-lg overflow-hidden md:flex opacity-0"
        >
          <div className="md:flex-shrink-0">
            <img
              className="h-full w-full object-cover md:w-56"
              src="/assets/vista.jpeg"
              alt="Course Image"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm text-black font-semibold">Education</div>
            <h2 className="block mt-1 text-lg leading-tight font-semibold text-amber-600 uppercase">
              Mini-Importation Course
            </h2>
            <p className="mt-2 text-gray-500">
              Learn to import and profit with our comprehensive course covering everything from finding suppliers to navigating customs regulations.
            </p>
            <div className="mt-4">
              <a href="#" className="text-gray-500 hover:text-indigo-900 text-sm font-semibold">
                Know more {'>'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
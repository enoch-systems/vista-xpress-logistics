import React, { useEffect, useRef } from 'react'

const BenefitsSection = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.classList.contains('opacity-0')) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate-slide-in-left')
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
    <section id="benefits-section" className="py-12 bg-gray-100">
      <style>
        {`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-slide-in-left {
            animation: slideInLeft 0.8s ease-out forwards;
          }
          .opacity-0 {
            opacity: 0;
          }
        `}
      </style>
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="bg-white rounded-lg shadow-lg overflow-hidden md:flex opacity-0"
        >
          <div className="md:flex-shrink-0">
            <img
              className="h-full w-full object-cover md:w-56"
              src="/assets/vista.jpeg"
              alt="Benefits Image"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm text-black font-semibold">Business</div>
            <h2 className="block mt-1 text-lg leading-tight font-semibold text-amber-600 uppercase">
              BENEFITS OF MINI-IMPORTATION BUSINESS
            </h2>
            <p className="mt-2 text-gray-500">
              Importation is one of the fastest paths to profit if you know how: buying cheap internationally + selling locally. Being an importer can serve as a side hustle while you maintain your full time job.
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

export default BenefitsSection;

import React, { useEffect, useRef } from 'react'

const TestimonialSection = () => {
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

  const TestimonialCard = ({ name, role, content, rating }) => (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 hover:shadow-lg transition duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h4 className="font-bold text-gray-800 text-sm md:text-base lg:text-lg">{name}</h4>
          <p className="text-xs md:text-sm lg:text-base text-gray-600">{role}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-lg md:text-xl lg:text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
      
      <p className="text-gray-700 text-xs md:text-sm lg:text-base leading-relaxed italic">"{content}"</p>
    </div>
  );

  return (
    <section className="bg-gray-100 py-12 md:py-16 lg:py-20 px-4">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="block mt-1 text-lg md:text-xl lg:text-2xl leading-tight font-semibold text-black uppercase text-center mb-8 md:mb-10 lg:mb-12">STUDENT TESTIMONIALS</h2>
        
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 opacity-0"
        >
          <TestimonialCard 
            name="Sarah Johnson"
            role="Business Owner"
            content="This course transformed my life! I started importing electronics and now make consistent profits. The step-by-step guidance was invaluable."
            rating={5}
          />
       
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

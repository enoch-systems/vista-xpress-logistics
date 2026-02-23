import React, { useEffect, useRef } from 'react'

const TestimonialSection = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-bottom')
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

  const TestimonialCard = ({ name, role, content, rating }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
      
      <p className="text-gray-700 text-sm leading-relaxed italic">"{content}"</p>
    </div>
  );

  return (
    <section className="bg-gray-100 py-12 px-4">
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
        <h2 className="block mt-1 text-lg leading-tight font-semibold text-amber-600 uppercase text-center mb-3">TESTIMONIALS</h2>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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

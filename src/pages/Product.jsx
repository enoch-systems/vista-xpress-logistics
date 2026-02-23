import React, { useEffect, useRef } from 'react'
import LazyImage from '../components/LazyImage'

const ProductSection = () => {
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

  const VideoCard = ({ thumbnail, title, description }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="relative">
        <LazyImage 
          src={thumbnail} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition duration-300 cursor-pointer">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
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
        <h2 className="block mt-1 text-lg leading-tight font-semibold text-amber-600 uppercase text-center">PRODUCT UNBOXING</h2>
        
        <p className="mt-2 text-gray-500 text-center">
          Watch our students unbox their imported products and see the quality firsthand. 
          These videos showcase real results from our mini-importation course graduates.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <VideoCard 
            thumbnail="/src/assets/logo.jpeg"
            title="Student Success: First Import"
            description="See how Sarah imported quality products and made her first profit within 2 weeks."
          />
          <VideoCard 
            thumbnail="/src/assets/logo.jpeg"
            title="Product Quality Showcase"
            description="Michael demonstrates the excellent quality of products sourced through our methods."
          />
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

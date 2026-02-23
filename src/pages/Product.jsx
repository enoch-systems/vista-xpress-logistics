import React, { useEffect, useRef } from 'react'

const ProductSection = () => {
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

  const VideoCard = ({ thumbnail, title, description }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-48 md:h-52 lg:h-56 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition duration-300 cursor-pointer">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6 lg:p-8">
        <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base lg:text-lg">{title}</h3>
        <p className="text-xs md:text-sm lg:text-base text-gray-600">{description}</p>
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20 px-4">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="block mt-1 text-lg md:text-xl lg:text-2xl leading-tight font-semibold text-black uppercase text-center mb-8 md:mb-10 lg:mb-12">PRODUCT UNBOXING</h2>
        
        <p className="mt-2 text-gray-500 text-center text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
          Watch our students unbox their imported products and see the quality firsthand. 
          These videos showcase real results from our mini-importation course graduates.
        </p>
        
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 opacity-0"
        >
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

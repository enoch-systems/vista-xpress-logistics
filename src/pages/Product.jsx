import React, { useEffect, useRef, useState } from 'react'

const ProductSection = () => {
  const sectionRef = useRef(null)
  const [modalVideo, setModalVideo] = useState(null)

  const openModal = (videoSrc, title) => {
    setModalVideo({ src: videoSrc, title })
  }

  const closeModal = () => {
    setModalVideo(null)
  }

  const VideoModal = ({ video, onClose }) => {
    if (!video) return null

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Blurred background */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        
        {/* Modal content */}
        <div 
          className="relative bg-black rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Video */}
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <video
              src={video.src}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      </div>
    )
  }

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
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden pt-5 hover:shadow-lg transition duration-300 cursor-pointer max-w-xs mx-auto"
      onClick={() => openModal(thumbnail, title)}
    >
      <div className="relative">
        {thumbnail.endsWith('.mp4') ? (
          <video
            src={thumbnail}
            alt={title}
            className="w-full h-48 md:h-52 lg:h-56 object-contain"
            muted
            loop
            playsInline
          />
        ) : (
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-48 md:h-52 lg:h-56 object-contain"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition duration-300">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-3  md:p-6 lg:p-8">
        <h3 className="font-bold font-semibold text-gray-800 mb-2 text-sm md:text-base lg:text-lg">{title}</h3>
        <p className="text-xs md:text-sm lg:text-base text-gray-500">{description}</p>
      </div>
    </div>
  );

  return (
    <>
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20 px-4">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="block mt-1 text-lg md:text-xl lg:text-2xl leading-tight font-semibold text-black uppercase text-center mb-8 md:mb-10 lg:mb-12">PRODUCT UNBOXING</h2>
        
        <p className="mt-2 text-gray-500 text-center text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
          Watch our students unbox their imported products and see the quality firsthand. 
          These videos showcase real results from our mini-importation course graduates.
        </p>
        
        <div 
          ref={sectionRef}
          className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 opacity-0 justify-center"
        >
          <VideoCard 
            thumbnail="/assets/clint.mp4"
            title="Product Unboxing"
            description="Watch our client share their experience with our importation services."
          />
        </div>
      </div>
    </section>
    <VideoModal video={modalVideo} onClose={closeModal} />
    </>
  );
};

export default ProductSection;

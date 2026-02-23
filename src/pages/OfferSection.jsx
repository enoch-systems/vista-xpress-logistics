import React, { useEffect, useRef, useState } from 'react'

const OfferSection = () => {
  const sectionRef = useRef(null)
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const OfferModal = () => {
    if (!showModal) return null

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={closeModal}
      >
        {/* White transparent blurred background */}
        <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-md" />
        
        {/* Modal content */}
        <div 
          className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Text content only */}
          <div className="p-8 md:p-12 lg:p-16 text-center">
            <div className="uppercase tracking-wide text-sm md:text-base lg:text-lg text-black font-semibold mb-4">Special Offer</div>
            <h2 className="block mt-1 text-base md:text-2xl lg:text-3xl leading-tight font-bold text-black uppercase mb-6">
              BENEFITS OF JOINING OUR FIRST OFFICIAL TRAINING BATCH
            </h2>
            <div className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed mb-8 text-left">
              <ul className="list-none space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 text-black text-lg">-</span>
                  <span className="text-gray-600">Guide beginners step-by-step on how to launch a successful importation business</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-black text-lg">-</span>
                  <span className="text-gray-600">Provide our participants with contact directory of over 100+ contacts of China, Vietnam and international manufacturers and suppliers.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-black text-lg">-</span>
                  <span className="text-gray-600">Startup capital funding of ₦20,000 for the first 20 participants to register for the training as this is our first official training. Register now to grab the offer!</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-black text-lg">-</span>
                  <span className="text-gray-600">You will start making money right from your first order within 2 weeks</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-black text-lg">-</span>
                  <span className="text-gray-600">Teach you how to attract paying customers and apply proven methods to achieve consistent sales</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-black text-lg">-</span>
                  <span className="text-gray-600">Help you build a business systems that can generate 300,000 - 500,000 monthly, even small capital.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-black text-lg">-</span>
                  <span className="text-gray-600">Our goal is simple - to raise smart, empower, financially independent entrepreneurs through legitimate global business opportunities.</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition duration-300 text-sm md:text-base">
                Enroll Now
              </button>
            </div>
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
    <>
    <section id="offers-section" className="py-12 md:py-16 lg:py-20 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className="bg-white rounded-lg shadow-lg overflow-hidden md:flex opacity-0 cursor-pointer hover:shadow-xl transition-shadow duration-300"
          onClick={openModal}
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
              BENEFITS OF JOINING OUR FIRST OFFICIAL TRAINING BATCH
            </h2>
            <p className="mt-2 text-gray-500 text-sm md:text-base lg:text-lg leading-relaxed">
              Guide beginners step-by-step on how to launch a successful importation business
            </p>
            <div className="mt-4 md:mt-6 lg:mt-8">
              <span className="text-orange-500 hover:text-orange-700 text-sm md:text-base lg:text-lg font-semibold inline-flex items-center">
                Know more {'>'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <OfferModal />
    </>
  );
};

export default OfferSection;

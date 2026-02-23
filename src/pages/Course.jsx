import React, { useEffect, useRef, useState } from 'react'

const CourseSection = () => {
  const sectionRef = useRef(null)
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const CourseModal = () => {
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
            <div className="uppercase tracking-wide text-sm md:text-base lg:text-lg text-black font-semibold mb-4">Education</div>
            <h2 className="block mt-1 text-base md:text-2xl lg:text-3xl leading-tight font-bold text-black uppercase mb-6">
              COURSE OVERVIEW FOR ADVANCED CLASS
            </h2>
            <div className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed mb-8 text-left">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-sm mb-2">COMPLETE CHINA IMPORTATION GUIDE</h3>
                  <ul className="list-none space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>How to source for goods on 1688 and Alibaba</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>How to link your alipay account to your 1688 account</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>How to identify reliable suppliers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Over 150+ reliable suppliers contact of different products, shipping companies, money exchangers, and many more</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>How to track your goods and request a refund</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>How to check the quality and weight of a product</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>List of fast moving products</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Sea shipping and air shipping calculation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Contacts of Shipping Companies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Contacts of currency exchange brokers</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm mb-2">HAIR IMPORTATION BUSINESS</h3>
                  <ul className="list-none space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Basic knowledge of different types of hairs, wigs, attachments and hair products</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>How to import hairs from China, Vietnam, Cambodia, and India</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>20+ Contacts of human hair supplier</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>20+ Contact of packet hair suppliers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>20+ Contacts of shipping companies and money exchangers for different countries</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Contacts of hair blend suppliers</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm mb-2">OKRIKA (THRIFT) BUSINESS</h3>
                  <ul className="list-none space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>100+ Contacts of bale wholesalers in Nigeria</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Contacts of manufacturers both in China and Nigeria</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>How to make payment to Chinese suppliers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Basic knowledge of different grade of bales</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm mb-2">VIETNAM KIDDIES IMPORTATION</h3>
                  <ul className="list-none space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Basic knowledge of Vietnam importation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Basic knowledge of importable items from Vietnam</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Vietnam currency conversion rate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>20+ Contacts of shipping agents</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>100+ Contacts of suppliers from Vietnam</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>How to verify quality items and products</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>How to calculate shipping and landing fee</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm mb-2">DUBAI AND TURKEY IMPORTATION</h3>
                  <ul className="list-none space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Benefits of Dubai and Turkey business</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>100+ Contacts of suppliers of various products</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Direct contacts of manufacturers and chat with them</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>20+ Contacts of money exchangers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>10+ Contacts of shipping agents</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm mb-2">BANGLADESH IMPORTATION</h3>
                  <ul className="list-none space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Introduction to Bangladesh importation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Basic knowledge of different products importable from Bangladesh</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Basic knowledge of currency conversion</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>10+ Contacts of manufacturer and suppliers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>10+ Shipping companies contact</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>How to negotiate for the payment on the delivery method (FOMO) strategy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Instant connection to suppliers channel and community</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm mb-2">SHEIN AND PAT PAT IMPORTATION</h3>
                  <ul className="list-none space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Introduction to Shein importation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Basic knowledge of different products importable from Bangladesh</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>Basic knowledge of currency conversion</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>10+ Contacts of manufacturer and suppliers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>10+ Shipping companies contact</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-black text-lg">-</span>
                      <span>How to ship directly to your country (Nigeria, Ghana, Cameroon)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition duration-300 text-sm md:text-base">
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
    <section id="courses-section" className="py-12 md:py-16 lg:py-20 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className="bg-gray-100 rounded-lg shadow-lg overflow-hidden md:flex opacity-0 cursor-pointer hover:shadow-xl transition-shadow duration-300"
          onClick={openModal}
        >
          <div className="md:flex-shrink-0">
            <img
              className="h-full w-full object-cover md:w-56 lg:w-64"
              src="/assets/vista.jpeg"
              alt="Course Image"
            />
          </div>
          <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm md:text-base lg:text-lg text-black font-semibold">Education</div>
            <h2 className="block mt-1 text-lg md:text-xl lg:text-2xl leading-tight font-bold text-black uppercase">
              Mini-Importation Course
            </h2>
            <p className="mt-2 text-gray-500 text-sm md:text-base lg:text-lg leading-relaxed">
              Learn to import and profit with our comprehensive course covering everything from finding suppliers to navigating customs regulations.
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
    <CourseModal />
    </>
  );
};

export default CourseSection;
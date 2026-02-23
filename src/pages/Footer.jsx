import React from 'react'
import logoImage from '../assets/logo2.png'
import { MapPin, Mail, Phone } from 'lucide-react'
import LazyImage from '../components/LazyImage'

const Footer = () => {
  const scrollToBenefits = () => {
    const benefitsSection = document.getElementById('benefits-section')
    if (benefitsSection) {
      const headerHeight = 80 // Approximate header height
      const elementPosition = benefitsSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToOffers = () => {
    const offersSection = document.getElementById('offers-section')
    if (offersSection) {
      const headerHeight = 80 // Approximate header height
      const elementPosition = offersSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses-section')
    if (coursesSection) {
      const headerHeight = 80 // Approximate header height
      const elementPosition = coursesSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToHome = () => {
    // Refresh page and scroll to top
    window.location.href = window.location.origin + window.location.pathname
  }

  return (
    <footer className="bg-[#140651] text-white py-8 px-4">
      <div className="container mx-auto text-center">
        {/* Company Logo and Name */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-3">
            <LazyImage
              src={logoImage}
              alt="Vista Express Logistics Logo"
              className="w-39 h-12 "
            />
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="mb-4">
          <ul className="flex justify-center space-x-6">
            <li><button onClick={scrollToHome} className="hover:text-amber-600 transition bg-transparent border-none text-white cursor-pointer">Home</button></li>
            <li><button onClick={scrollToBenefits} className="hover:text-amber-600 transition bg-transparent border-none text-white cursor-pointer">Benefit</button></li>
            <li><button onClick={scrollToOffers} className="hover:text-amber-600 transition bg-transparent border-none text-white cursor-pointer">Offers</button></li>
            <li><button onClick={scrollToCourses} className="hover:text-amber-600 transition bg-transparent border-none text-white cursor-pointer">Courses</button></li>
          </ul>
        </nav>
        
        {/* Social Media Icon */}
        <div className="mb-4 flex justify-center">
          <a href="#" className="text-gray-400 hover:text-amber-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
        
        {/* Contact Information */}
        <div className="mb-7 text-sm text-gray-400 space-y-1">
          <div className="flex items-center justify-center">
            <MapPin className="mr-2 text-gray-500" size={16} />
            <span>-----</span>
          </div>
          <div className="flex items-center justify-center">
            <Mail className="mr-2 text-gray-500 hover:text-amber-600 transition" size={16} />
            <span className="hover:text-amber-600 transition cursor-pointer">-----@gmail.com</span>
          </div>
          <div className="flex items-center justify-center">
            <Phone className="mr-2 text-gray-500 hover:text-amber-600 transition" size={16} />
            <span className="hover:text-amber-600 transition cursor-pointer">0806403XXXX </span>
          </div>
        </div>
        
        {/* Copyright and Built With */}
        <div className="border-t border-gray-700 pt-4 text-sm text-gray-400 mb-10">
          <p className="mb-2">
            © 2026 Vista Express Logistics
          </p>
        </div>
      </div>
      
      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/2348064032113" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition duration-300">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;

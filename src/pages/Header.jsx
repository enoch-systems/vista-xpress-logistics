import React from 'react'
import { FaBars } from 'react-icons/fa'
import logoImage from '../assets/logo.jpeg'
import LazyImage from '../components/LazyImage'

const Header = () => {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center ">
        <div className="flex items-center space-x-3 ">
          <LazyImage
            src={logoImage}
            alt="Vista Express Logistics Logo"
            className="w-39 h-12 rounded-full"
          />

        </div>
        <button className="text-gray-700 hover:text-gray-900">
          <FaBars className="text-2xl" />
        </button>
      </div>
    </header>
  )
}

export default Header;

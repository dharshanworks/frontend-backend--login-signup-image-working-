import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 py-3 mt-20'>

      <img src={assets.logo} alt="Company Logo" width={150} />

      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>
        © Dharshan | All rights reserved.
      </p>

      <div className='flex gap-2.5'>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={assets.facebook_icon} alt="Facebook" width={35} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={assets.instagram_icon} alt="Instagram" width={35} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={assets.twitter_icon} alt="Twitter" width={35} />
        </a>
      </div>

    </div>
  )
}

export default Footer

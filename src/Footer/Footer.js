import React from 'react'
import { Link
  
 } from 'react-router-dom'
const Footer = () => {
  return (
    <footer class="bg-gray-900 text-gray-300 py-6 px-16 font-sans tracking-wide">
      <div class="flex justify-between items-center max-lg:flex-col text-center flex-wrap gap-4">
        <p class="text-[15px] leading-loose">© Geeksarray. All rights reserved.</p>

        <ul class="flex space-x-6 gap-y-2 max-lg:justify-center flex-wrap">
          <li><Link to='/terms&conditions' class="text-[15px] hover:text-white">Terms of Service</Link></li>
          <li><Link to='/privacy-policy' class="text-[15px] hover:text-white">Privacy Policy</Link></li>
          <li><Link to="/Contact-us" class="text-[15px] hover:text-white">Contact</Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
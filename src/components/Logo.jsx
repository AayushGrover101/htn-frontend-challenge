import React from 'react'
import logo from '../assets/HTN-logo.png';

function Logo() {
  return (
    <a className="hover:bg-white hover:bg-opacity-15 transition-all p-1.5 rounded-lg" href="https://hackthenorth.com/" target="_blank" rel="noopener noreferrer" ><img src={logo} className="sm:w-[40px] sm:h-[40px] w-[33px] h-[33px]" alt="HTN Logo"></img></a>
  )
}

export default Logo
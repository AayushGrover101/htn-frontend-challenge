import React, { useEffect, useState, useRef } from 'react';
import logo from '../assets/HTN-logo.png';
import grid from '../assets/Dots-Grid.png';
import InstagramIcon from '../assets/Instagram-Icon.webp';
import YoutubeIcon from '../assets/Youtube-Icon.svg';

function SocialsGrid() {
  // Manage socials div
  const [showSocials, setShowSocials] = useState(false);

  const socialRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Close div on external click
    function handleClickOutside(event) {
      if (
        socialRef.current &&
        !socialRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowSocials(false);
      }
    }

    // Close div on scroll
    function handleScroll() {
      setShowSocials(false);
    }

    // Add event handlers to detect external clicks + scroll
    if (showSocials) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleScroll);
    }

    // Remove event handlers on component dismount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [showSocials])

  return (
    <>
      <button
        onClick={() => setShowSocials(!showSocials)}
        className="relative"
        ref={buttonRef}
      >
        <div className="hover:bg-white hover:bg-opacity-15 p-2 transition-all rounded-lg" >
          <img src={grid} className="w-[25px] h-[25px]" alt="Grid" ></img>
        </div>
      </button> 

      {showSocials && (
        <div ref={socialRef} className="absolute sm:right-[140px] right-[30px] sm:top-[80px] top-[90px] bg-white bg-opacity-[3%] backdrop-blur-lg border-gray-500 border-opacity-20 border-[1px] bg-background rounded-[10px] p-2.5 flex shadow-lg px-2.5 z-50">
          <a href="https://hackthenorth.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-2 px-4 hover:bg-white hover:bg-opacity-5 rounded-[10px] transition-all">
            <img src={logo} className="w-[43px] h-[43px]" alt="Website" />
            <span className="text-white text-[11px] mt-2.5">Website</span>
          </a>
          <a href="https://instagram.com/hackthenorth" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-2 px-4 hover:bg-white hover:bg-opacity-5 rounded-[10px] transition-all">
            <img src={InstagramIcon} className="w-[45px] h-[45px]" alt="Instagram" />
            <span className="text-white text-[11px] mt-2.5">Instagram</span>
          </a>
          <a href="https://www.youtube.com/@hackthenorthtv" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-2 px-4 hover:bg-white hover:bg-opacity-5 rounded-[10px] transition-all">
            <img src={YoutubeIcon} className="w-[45px] h-[45px]" alt="YouTube" />
            <span className="text-white text-[11px] mt-2.5">YouTube</span>
          </a>
        </div>
      )}
    </>
  )
}

export default SocialsGrid
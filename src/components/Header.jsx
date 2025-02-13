import React from 'react'
import TopBar from './TopBar'
import Searchbar from './Searchbar.jsx'
import Filters from './Filters.jsx'

function Header({ searchRef, onSignInClick }) {
  return (
    <>
      <div className="transition-all w-full" >
        <div className="min-[1000px]:fixed w-full z-20 bg-transparent top-0">
          <TopBar onSignInClick={onSignInClick} />
        </div>
        <h1 className="xs:mb-0 mb-[25px] lg:text-[50px] md:text-[45px] sm:text-[40px] xs:text-[37px] text-[38px] xs:leading-normal leading-tight text-center font-bold min-[1000px]:mt-[85px] sm:mt-[-23px] mt-[30px]"><span className="text-white text-glow-pink">Hackathon </span><br className="block xs:hidden"></br><span className="text-white text-glow-blue">Global </span><span className="text-white text-glow-yellow">Inc.</span></h1>
          <Searchbar inputRef={searchRef} />
          <Filters />
      </div>
    </>
    
  )
}

export default Header
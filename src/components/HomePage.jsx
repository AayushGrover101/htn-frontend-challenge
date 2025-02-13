import React, { useState, useEffect, useRef } from 'react';
import SignInPopUp from './SignInPopUp';
import Header from './Header'
import EventsBody from './EventsBody'
import TopBarScroll from './Search Page/TopBarScroll'
import FiltersScroll from './Search Page/FiltersScroll'
import CustomCursor from './CustomCursor.jsx';

function HomePage() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const mainSearchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowSearchBar(true);
      } else {
        setShowSearchBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!showSearchBar && mainSearchRef.current) {
      mainSearchRef.current.focus();
    }
  }, [showSearchBar]);

  return (
    <div>
      <CustomCursor />
      <div className={`fixed w-full z-50 bg-background top-0 transition-all duration-300 ${showSearchBar ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <TopBarScroll onSignInClick={() => setIsSignUpOpen(true)} />
        <FiltersScroll />
      </div>

      <Header searchRef={mainSearchRef} onSignInClick={() => setIsSignUpOpen(true)} />
      <EventsBody />

      {isSignUpOpen && <SignInPopUp onClose={() => setIsSignUpOpen(false)} />}
    </div>
  )
}

export default HomePage

import React from 'react';
import SearchbarScroll from './SearchbarScroll';
import Logo from '../Logo';
import SocialsGrid from '../SocialsGrid';
import SignInButton from '../SignInButton';

// Top bar component (scroll)
function TopBarScroll({ onSignInClick }) {
  return (
    <div className="min-w-[100vw] p-8 pt-0 sm:mt-7 mt-5 flex justify-between mb-0 pb-4 sm:pb-2.5 sm:border-b-0 border-b-[1px] border-white border-opacity-15">
      <Logo />

      <div className="flex-1 sm:pl-5 sm:pr-5 pl-3 pr-3">
        <SearchbarScroll />
      </div>

      <div className="flex items-center sm:space-x-3 space-x-1">
        <span className="hidden sm:flex">
          <SocialsGrid />
        </span>
        <SignInButton onSignInClick={onSignInClick} />
      </div>
    </div>
  );
}

export default TopBarScroll;
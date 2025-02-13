import React from 'react';
import Logo from './Logo';
import SignInButton from './SignInButton';
import SocialsGrid from './SocialsGrid';

// Top bar component (no-scroll)
function TopBar({ onSignInClick }) {
  return (
    <div className="m-8 mt-7 flex justify-between">
      <Logo />
      <div className="flex items-center">
        <SocialsGrid />
        <SignInButton onSignInClick={onSignInClick} />
      </div>
    </div>
  );
}

export default TopBar;

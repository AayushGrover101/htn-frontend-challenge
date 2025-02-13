import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function SignInButton({ onSignInClick }) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
    } else {
      onSignInClick();
    }
  };

  return (
    <>
      <button onClick={handleClick} className={`sm:px-5 px-5 xs:ml-3 ml-1.5 pt-1.5 pb-1.5 border-[1px] sm:text-sm text-xs rounded-lg border-white bg-opacity-20 bg-transparent text-white transition-all outline-none ${isAuthenticated ? 'hover:bg-opacity-100 hover:bg-white hover:text-background' : 'hover:bg-opacity-100 hover:text-white hover:bg-primary hover:border-primary hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]'}`}>
        {isAuthenticated ? 'LOG OUT' : 'SIGN IN'}
      </button>
    </>
  );
}

export default SignInButton;

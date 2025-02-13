import React, { useState, useRef, useEffect } from 'react';
import { User, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SignInImage from '/HTN-SignIn-Image.jpg';

const DEMO_USERNAME = 'hacker';
const DEMO_PASSWORD = 'htn2025';

function SignInPopUp({ onClose }) {
  const popUpRef = useRef(null);
  const usernameInputRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleOutsideClick = (e) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      setSuccessMessage('Successfully logged in.');
      setError('');
      setTimeout(() => {
        onClose();
      }, 500);
    } else {
      setError('Invalid credentials. Please try again.');
      setSuccessMessage('');
      setTimeout(() => {
        setError('');
      }, 1800);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={handleOutsideClick}>
      <div ref={popUpRef} className="sm:h-[70vh] h-[55vh] bg-background bg-opacity-100 rounded-[18px] shadow-xl w-full sm:w-[90%] max-w-sm lg:max-w-4xl overflow-hidden relative border border-white border-opacity-10 flex flex-row">
        
        {/* Left Side - Image (Only shown on large screens) */}
        <div className="hidden lg:block w-1/2 relative">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60" 
            style={{ backgroundImage: `url(${SignInImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20"></div>
        </div>

        {/* Right Side - Form (Full width on medium and small screens) */}
        <div className="w-full lg:w-1/2 p-12 my-auto">
          <button className="absolute top-3 right-3 sm:top-5 sm:right-5 text-white text-lg hover:bg-white hover:bg-opacity-15 px-2 rounded-lg transition-all" onClick={onClose}>✕</button>

          <h2 className="text-xl sm:text-2xl font-bold text-white text-center">Login as a Hacker</h2>
          <p className="text-xs sm:text-sm text-gray-400 text-center mb-4 sm:mb-6 mt-2">View private Hack the North events.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute top-1/2 left-3 sm:left-4 transform -translate-y-1/2 text-white w-[16px] h-[16px] sm:w-[19px] sm:h-[19px] opacity-70" />
                <input 
                  ref={usernameInputRef}
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-[40px] sm:h-[45px] text-[14px] sm:text-[16px] w-full border-[2px] border-transparent focus:border-opacity-20 focus:border-white focus:outline-none rounded-lg bg-white bg-opacity-[6%] pl-10 sm:pl-11 pr-3 sm:pr-5 pb-[1px] text-white"
                  required
                />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 pl-1">Test Username: <code className="bg-gray-800 px-1 rounded">hacker</code></p>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 sm:left-4 transform -translate-y-1/2 text-white w-[16px] h-[16px] sm:w-[19px] sm:h-[19px] opacity-70" />
                <input 
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-[40px] sm:h-[45px] text-[14px] sm:text-[16px] w-full border-[2px] border-transparent focus:border-opacity-20 focus:border-white focus:outline-none rounded-lg bg-white bg-opacity-[6%] pl-10 sm:pl-11 pr-3 sm:pr-5 pb-[1px] text-white"
                  required
                />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 pl-1">Test Password: <code className="bg-gray-800 px-1 rounded">htn2025</code></p>
            </div>

            {error && <p className="text-red-600 text-[10px] sm:text-xs pl-1">{error}</p>}
            {successMessage && <p className="text-green-600 text-[10px] sm:text-xs pl-1">{successMessage}</p>}

            <button type="submit" className="w-full py-2 sm:py-3 text-sm sm:text-md rounded-lg border-none bg-opacity-20 text-white bg-white hover:bg-opacity-100 hover:text-background hover:bg-white hover:border-primary transition-all outline-none mt-0">SIGN IN</button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default SignInPopUp;

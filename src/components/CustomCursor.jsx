import React, { useState, useEffect } from 'react';

function CustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isTouchScreen, setIsTouchScreen] = useState(false);
  const [isMouseInViewport, setIsMouseInViewport] = useState(true);

  useEffect(() => {
    // Remove custom cursor for touch screen
    const checkTouchScreen = () => {
      setIsTouchScreen(window.matchMedia('(pointer: coarse)').matches);
    };

    // Remove main cursor if not touch screen
    if (!isTouchScreen) {
      document.body.style.cursor = 'none';
    }

    // Move custom cursor based on mouse position
    const handleMouseMove = (e) => {
      if (isTouchScreen) return;
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOut = () => {
      setIsMouseInViewport(false);
    };

    const handleMouseOver = () => {
      setIsMouseInViewport(true);
    };

    checkTouchScreen();
    window.addEventListener('resize', checkTouchScreen);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mouseover', handleMouseOver);

    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('resize', checkTouchScreen);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mouseover', handleMouseOver);
      document.head.removeChild(style);
    };
  }, [isTouchScreen]);

  // Only render custom course if it is not a touchscreen and if the mouse is in frame
  if (isTouchScreen || !isMouseInViewport) return null;

  return (
    <div
      className="fixed w-3 h-3 border-2 border-white rounded-full pointer-events-none z-[100] cursor-none"
      style={{
        left: cursorPosition.x,
        top: cursorPosition.y,
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'transparent',
        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.28)',
      }}
    />
  );
}

export default CustomCursor;

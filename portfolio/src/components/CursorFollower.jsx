import React from "react";
export default function CursorFollower({ mousePosition, isDarkMode }) {
    return <>
    <div
          className="fixed pointer-events-none z-50 mix-blend-difference"
          style={{
            left: mousePosition.x - 10,
            top: mousePosition.y - 10,
            transition: 'all 0.1s ease-out',
          }}
        >
          <div className={`w-5 h-5 rounded-full opacity-50 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
        </div>
    </>
}
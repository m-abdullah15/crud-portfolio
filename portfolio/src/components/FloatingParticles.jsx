import React from "react";
export default function FloatingParticles({ mousePosition, isDarkMode }) {
    const particles = Array.from({ length: 50 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
        }));
    
        return (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className={`absolute rounded-full animate-float ${isDarkMode
                    ? 'bg-gradient-to-r from-blue-400/30 to-purple-400/30'
                    : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20'
                  }`}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDuration: `${particle.duration}s`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>
        )
}
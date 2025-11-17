import React from "react";
import { useNavigate } from 'react-router-dom';
import {Code, Mail,Phone,Github, ExternalLink,User,Briefcase,MessageCircle,ChevronDown,Menu,X,MapPin,Check,Sun,Moon} from 'lucide-react';
export default function Header({name, isDarkMode,activeSection,scrollToSection,toggleDarkMode,isMenuOpen,setIsMenuOpen}) {
     {/* Navigation */}
      return <nav className={`fixed top-0 w-full backdrop-blur-md z-50 border-b transition-all duration-500 ${isDarkMode
          ? 'bg-gray-900/90 border-gray-700/50'
          : 'bg-white/90 border-gray-200/50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                {name}
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-baseline space-x-4">
                {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeSection === item
                        ? isDarkMode
                          ? 'bg-blue-900/50 text-blue-300'
                          : 'bg-blue-100 text-blue-700'
                        : isDarkMode
                          ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                      }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${isDarkMode
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${isDarkMode
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md transition-colors ${isDarkMode
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
            </div>
            <AddUpdateButton isDarkMode={isDarkMode} setIsMenuOpen={setIsMenuOpen} />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t transition-colors ${isDarkMode
                ? 'bg-gray-900 border-gray-700'
                : 'bg-white border-gray-200'
              }`}>
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${activeSection === item
                      ? isDarkMode
                        ? 'bg-blue-900/50 text-blue-300'
                        : 'bg-blue-100 text-blue-700'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
}

function AddUpdateButton({ isDarkMode }){
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate('/auth')} className={`p-2 rounded-lg transition-all duration-300 ${isDarkMode
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
      Add/Update Info
    </button>
  );
}
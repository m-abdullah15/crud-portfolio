import React from "react";
import {Code, Mail,Phone,Github, ExternalLink,User,Briefcase,MessageCircle,ChevronDown,Menu,X,MapPin,Check,Sun,Moon} from 'lucide-react';
export default function Hero({user, isDarkMode,isLoaded,scrollToSection}) {
    const name = user?.name;
    const description = user?.description;
    const email = user?.email;
    const phone = user?.phone;
    const github = user?.github;

    return <section id="home" className={`pt-16 min-h-screen flex items-center relative transition-colors duration-500 ${isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  {name}
                </span>
              </h1>
              <p className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  View My Work
                  <ExternalLink className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`border-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${isDarkMode
                      ? 'border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400'
                      : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                    }`}
                >
                  Get In Touch
                </button>
              </div>

              <div className="flex justify-center space-x-6">
                <a href={`mailto:${email}`} className={`p-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'
                  }`}>
                  <Mail className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                </a>
                <a href={`tel:${phone}`} className={`p-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'
                  }`}>
                  <Phone className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'
                  }`}>
                  <Github className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className={`w-6 h-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
        </div>
      </section>
}
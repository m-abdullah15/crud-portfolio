import React from "react";
import {Code, Mail,Phone,Github, ExternalLink,User,Briefcase,MessageCircle,ChevronDown,Menu,X,MapPin,Check,Sun,Moon} from 'lucide-react';
export default function About({ user, isDarkMode }) {
  const location = user?.location || '';
  const experiences = user?.experiences || [];
  const description = user?.description || '';
  return <section id="about" className={`py-20 relative transition-colors duration-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>About Me</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className={`p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 ${isDarkMode
                  ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50'
                }`}>
                <User className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Web Developer</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  I specialize in building complete web solutions, from front-end user interfaces to back-end APIs.
                  My expertise spans across modern technologies including React.js, Node.js, and machine learning integration.
                </p>
              </div>

              <div className={`p-8 rounded-2xl transform hover:scale-105 transition-all duration-300 ${isDarkMode
                  ? 'bg-gradient-to-r from-emerald-900/50 to-teal-900/50'
                  : 'bg-gradient-to-r from-emerald-50 to-teal-50'
                }`}>
                <Code className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Full-Stack Expertise</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  With experience in both frontend and backend development, I create seamless digital experiences
                  that are both visually appealing and functionally robust.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-6 rounded-xl shadow-lg border transform hover:scale-105 transition-all duration-300 ${isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-white border-gray-100'
                }`}>
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Location</span>
                </div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{location}</p>
              </div>

              <div className={`p-6 rounded-xl shadow-lg border ${isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-white border-gray-100'
                } transform hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Experience</span>
                </div>
                <div className="space-y-4">
                  {experiences.length === 0 ? (
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No experience data available.</p>
                  ) : (
                    experiences.map((exp, idx) => (
                      <div key={idx} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-50'}`}>
                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{exp.title}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.company}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{exp.from} - {exp.to}</p>
                        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

}
import React from "react";
import {Code, Mail,Phone,Github, ExternalLink,User,Briefcase,MessageCircle,ChevronDown,Menu,X,MapPin,Check,Sun,Moon} from 'lucide-react';
export default function Projects({ user,isDarkMode,projects }) {
  const github = user?.github ;
    return <section id="projects" className={`py-20 relative transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Featured Projects</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              A showcase of my recent work and the technologies I'm passionate about
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} p-6 flex items-end relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="text-white relative z-10">
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-white/90 text-sm">{project.subtitle}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                          <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                 <a href={github}> <button className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transform hover:scale-105 transition-all duration-300 ${isDarkMode
                      ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-gray-600 hover:to-gray-500'
                      : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black'
                    }`}>
                    View Details
                  </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

}
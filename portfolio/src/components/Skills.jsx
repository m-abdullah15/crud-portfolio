import React from "react";
export default function Skills({ isDarkMode, skills }) {
    return       <section id="skills" className={`py-20 relative transition-colors duration-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Technical Skills</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className={`p-6 rounded-xl transform hover:scale-105 transition-all duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{skill.name}</span>
                  <span className="text-blue-600 font-medium">{skill.level}%</span>
                </div>
                <div className={`w-full rounded-full h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

}
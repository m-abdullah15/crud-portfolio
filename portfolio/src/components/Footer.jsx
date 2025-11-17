import React, { useContext } from "react";
import { Mail,Phone,Github } from 'lucide-react';
import DataContext from '../context/DataContext';

export default function Footer({ isDarkMode }) {
    const { user } = useContext(DataContext);
    const name = user?.name || 'Muhammad Abdullah';
    const email = user?.email || 'm.abdullah3042@gmail.com';
    const phone = user?.phone || '+923052686065';
    const github = user?.github || 'https://github.com/m-abdullah15';
    const year = new Date().getFullYear();
    return (
      <footer className={`py-12 relative transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {name}
            </h3>
            <p className="text-gray-400 mb-6">Web Developer • Full-Stack • Problem Solver</p>

            <div className="flex justify-center space-x-6 mb-8">
              <a href={`mailto:${email}`} className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors transform hover:scale-110">
                <Mail className="w-5 h-5 text-white" />
              </a>
              <a href={`tel:${phone}`} className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors transform hover:scale-110">
                <Phone className="w-5 h-5 text-white" />
              </a>
              <a href={github} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors transform hover:scale-110">
                <Github className="w-5 h-5 text-white" />
              </a>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © {year} {name}. Built with React.js & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
}
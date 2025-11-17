import React from "react";
import {Code, Mail,Phone,Github, ExternalLink,User,Briefcase,MessageCircle,ChevronDown,Menu,X,MapPin,Check,Sun,Moon} from 'lucide-react';
export default function Contact ({ user, isDarkMode }) {
  const email = user?.email ;
  const phone = user?.phone ;
  const whatsapp = user?.whatsapp ;
  return <section id="contact" className={`py-20 relative transition-colors duration-500 ${isDarkMode
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900'
    : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
     }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Get In Touch</h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              Ready to work together? Let's discuss your next project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Email</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Send me a message</p>
                <a
                  href={`mailto:${email}`}
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                >
                  {email}
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            <div className="text-center group">
              <div className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Phone</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Call me directly</p>
                <a
                  href={`tel:${phone}`}
                  className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center"
                >
                  {phone}
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            <div className="text-center group">
              <div className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Let's Chat</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Start a conversation on Whatsapp</p>
                <button
                  onClick={() => window.open(`https://wa.me/${whatsapp.replace(/[+\s-]/g, '')}`)}
                  className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
                >
                  {whatsapp}
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

}
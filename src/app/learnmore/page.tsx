"use client";

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Calendar, Clock, Shield, Users } from 'lucide-react';
import Navbar from '../Navbar';

const LearnMorePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);


  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar/>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Project Overview Section */}
        <div className="mb-16 text-center">
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            About DocAlert
          </h1>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
            A modern healthcare appointment management system designed to streamline the connection between patients and healthcare providers
          </p>
        </div>

        {/* Key Features Section */}
        <div className={`rounded-xl p-8 mb-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-custom-blue1 p-4 rounded-full mb-4">
                <Calendar className="w-6 h-6 text-black" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Smart Scheduling
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Intelligent appointment management with real-time availability
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-custom-blue1 p-4 rounded-full mb-4">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                24/7 Access
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Book appointments anytime, anywhere
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-custom-blue1 p-4 rounded-full mb-4">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Secure Platform
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Advanced security measures to protect your health information
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-custom-blue1 p-4 rounded-full mb-4">
                <Users className="w-6 h-6 text-black" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Expert Network
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Access to qualified healthcare professionals
              </p>
            </div>
          </div>
        </div>

        {/* Developer Credits Section */}
        <div className={`rounded-xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Developer Credits
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className={`text-center mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Parsa Bazrpash Amalgar, Vinay Nair, Leo Martinez, Stephane Poujol
              </h2>
              <p className="mb-4">
                Full Stack Developers
              </p>
              <p className="mb-6">
                Created with Next.js 13, Tailwind CSS, and modern web technologies to provide a seamless healthcare scheduling experience.
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://github.com/ParsaBazrpash/DocAlert" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`hover:text-custom-blue1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/parsa-bazrpash-amalgar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`hover:text-custom-blue1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="mailto:[prsawork1@gmail.com]" 
                  className={`hover:text-custom-blue1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
              
            </div>

            {/* Project Details */}
            <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <p className="mb-4">
                © 2025 DocAlert. All rights reserved.
              </p>
              <p>
                Built with ❤️ using Next.js, Tailwind CSS, and TypeScript
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMorePage;
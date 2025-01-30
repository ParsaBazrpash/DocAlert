"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock} from 'lucide-react';
import Navbar from '../Navbar';

const ContactPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  



  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar/>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Contact Us
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Contact Info and Map in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className={`w-6 h-6 mr-3 ${isDarkMode ? 'text-custom-blue1' : 'text-custom-blue2'}`} />
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Address</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      800 W Campbell Rd<br />
                      Richardson, TX 75080
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className={`w-6 h-6 mr-3 ${isDarkMode ? 'text-custom-blue1' : 'text-custom-blue2'}`} />
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Phone</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      +1 (214) 123-4567
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className={`w-6 h-6 mr-3 ${isDarkMode ? 'text-custom-blue1' : 'text-custom-blue2'}`} />
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      info@docalert.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className={`w-6 h-6 mr-3 ${isDarkMode ? 'text-custom-blue1' : 'text-custom-blue2'}`} />
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Hours</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Location
              </h2>
              <div className="w-full h-[300px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.3431773671946!2d-96.75247772427297!3d32.98574747435066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c21ff49e9cf91%3A0x7f5e12141f1f5a7!2sThe%20University%20of%20Texas%20at%20Dallas!5e0!3m2!1sen!2sus!4v1702660486099!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Emergency Contact
            </h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              For medical emergencies, please dial 911 or visit the nearest emergency room.
              For urgent but non-emergency matters during off-hours, call our 24/7 helpline:
              <span className="block mt-2 font-semibold text-custom-blue1">
                +1 (214) 911-9099
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
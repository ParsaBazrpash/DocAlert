"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, User, Bell,  Calendar, AlertCircle, LogOut, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthModal } from './components/AuthModal';
import { auth } from "../app/config/firebase";
import { signOut } from "firebase/auth";
import Image from 'next/image';

interface UserData {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const recentNotifications = [
  {
    id: 1,
    type: 'appointment',
    message: 'Upcoming appointment with Dr. Wilson tomorrow at 10:00 AM',
    time: '1 hour ago',
    isRead: false
  },
  {
    id: 2,
    type: 'reminder',
    message: 'Don\'t forget to bring your medical records',
    time: '3 hours ago',
    isRead: false
  },
  {
    id: 3,
    type: 'update',
    message: 'Dr. Chen has confirmed your appointment request',
    time: '5 hours ago',
    isRead: true
  }
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          email: user.email,
          photoURL: user.photoURL
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const UserButton = () => {
    if (!currentUser) {
      return (
        <button 
          onClick={() => setShowAuthModal(true)}
          className="bg-custom-blue1 px-4 py-2 rounded hover:bg-custom-blue2 flex items-center text-black"
        >
          <User className="w-4 h-4 mr-2" />
          Login / Sign Up
        </button>
      );
    }

    return (
      <div className="relative">
        <button 
          onClick={() => setShowUserMenu(!showUserMenu)}
          className={`flex items-center space-x-2 px-4 py-2 rounded 
            ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          {currentUser.photoURL ? (
            <Image 
            src={currentUser.photoURL} 
            alt={currentUser.displayName || ''} 
            width={32} 
            height={32} 
            className="rounded-full"
          />
          ) : (
            <div className={`w-8 h-8 rounded-full bg-custom-blue1 flex items-center justify-center text-black font-semibold`}>
              {currentUser.displayName?.[0].toUpperCase()}
            </div>
          )}
          <span className={isDarkMode ? 'text-white' : 'text-black'}>
            {currentUser.displayName}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {showUserMenu && (
          <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1
            ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <Link href="/profile" className={`block px-4 py-2 
              ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className={`w-full text-left px-4 py-2 flex items-center space-x-2
                ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
            <Image 
  src="/logo.svg" 
  alt="DocAlert Logo" 
  width={56}  // 14 * 4 = 56px
  height={56} 
  className="h-14 w-14"
/>
            </Link>
            <Link href="/">
              <span className="ml-2 text-xl font-bold text-custom-blue1">DocAlert</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`${pathname === '/' ? 'text-custom-blue1' : isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Home
            </Link>
            <Link 
              href="/doctors" 
              className={`${pathname === '/doctors' ? 'text-custom-blue1' : isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Doctors
            </Link>
            <Link 
              href="/appointments" 
              className={`${pathname === '/appointments' ? 'text-custom-blue1' : isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-blue-600'}`}
            >
              My Appointments
            </Link>
            <Link 
              href="/contact" 
              className={`${pathname === '/contact' ? 'text-custom-blue1' : isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Contact
            </Link>
            <Link 
              href="/learnmore" 
              className={`${pathname === '/contact' ? 'text-custom-blue1' : isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-blue-600'}`}
            >
              About Us
            </Link>

            

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
        <Link 
          href="/notifications"
          className={`${isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-custom-blue2'} flex items-center`}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Link>
      </div>

              

              {/* User Button */}
              <UserButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <div className="relative">
              <button 
                className={`${isDarkMode ? 'text-gray-300 hover:text-custom-blue1' : 'text-gray-600 hover:text-custom-blue2'}`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg overflow-hidden
                  ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Recent Notifications
                      </h3>
                      <Link href="/notifications" className="text-custom-blue1 text-sm hover:underline">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {recentNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex items-start p-2 rounded-lg ${
                            !notification.isRead ? 
                              (isDarkMode ? 'bg-gray-700' : 'bg-blue-50') : 
                              ''
                          }`}
                        >
                          <div className="flex-shrink-0 mt-1">
                            {notification.type === 'appointment' ? (
                              <Calendar className="w-5 h-5 text-custom-blue1" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-custom-blue1" />
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {notification.message}
                            </p>
                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <Link 
                href="/" 
                className={`block px-3 py-2 rounded ${pathname === '/' ? 'text-custom-blue1' : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/doctors" 
                className={`block px-3 py-2 rounded ${pathname === '/doctors' ? 'text-custom-blue1' : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Doctors
              </Link>
              <Link 
                href="/appointments" 
                className={`block px-3 py-2 rounded ${pathname === '/appointments' ? 'text-custom-blue1' : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                My Appointments
              </Link>
              <Link 
                href="/contact" 
                className={`block px-3 py-2 rounded ${pathname === '/contact' ? 'text-custom-blue1' : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/learnmore" 
                className={`block px-3 py-2 rounded ${pathname === '/appointments' ? 'text-custom-blue1' : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              {!currentUser ? (
                <button 
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded flex items-center bg-custom-blue1 text-black hover:bg-custom-blue2"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login / Sign Up
                </button>
              ) : (
                <>
                  <Link 
                    href="/profile" 
                    className={`block px-3 py-2 rounded ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded flex items-center ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        isDarkMode={isDarkMode}
      />
    </nav>
  );
};

export default Navbar;
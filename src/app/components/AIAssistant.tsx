// AIAssistant.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, RefreshCw } from 'lucide-react';
import Image from 'next/image';

// Type definitions
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  availability: string;
  image: string;
  location: string;
  email: string;
  phone: string;
}

interface Message {
  text: string;
  isBot: boolean;
  options?: string[];
  doctors?: Doctor[];
}

// Complete doctors array
const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    experience: "15+ years",
    rating: 4.8,
    reviews: 127,
    availability: "Mon - Fri",
    image: "/images/doc1.png",
    location: "New York Medical Center",
    email: "dr.wilson@docalert.com",
    phone: "+1 (555) 123-4567"
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    specialty: "Dermatologist",
    experience: "12+ years",
    rating: 4.9,
    reviews: 189,
    availability: "Mon - Sat",
    image: "/images/doc2.png",
    location: "Downtown Medical Hub",
    email: "dr.chen@docalert.com",
    phone: "+1 (555) 234-5678"
  },
  {
    id: 3,
    name: "Dr. Fareed Rodriguez",
    specialty: "Pediatrician",
    experience: "10+ years",
    rating: 4.7,
    reviews: 156,
    availability: "Tue - Sat",
    image: "/images/doc3.png",
    location: "Children's Wellness Center",
    email: "dr.rodriguez@docalert.com",
    phone: "+1 (555) 345-6789"
  },
  {
    id: 4,
    name: "Dr. John Peterson",
    specialty: "Neurologist",
    experience: "18+ years",
    rating: 4.9,
    reviews: 210,
    availability: "Mon - Fri",
    image: "/images/doc4.png",
    location: "Brain & Spine Institute",
    email: "dr.peterson@docalert.com",
    phone: "+1 (555) 456-7890"
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Dermatologist",
    experience: "8+ years",
    rating: 4.6,
    reviews: 98,
    availability: "Wed - Sun",
    image: "/images/doc5.png",
    location: "Skin Care Clinic",
    email: "dr.thompson@docalert.com",
    phone: "+1 (555) 567-8901"
  },
  {
    id: 6,
    name: "Dr. David Kim",
    specialty: "Orthopedic",
    experience: "20+ years",
    rating: 4.9,
    reviews: 245,
    availability: "Mon - Fri",
    image: "/images/doc6.png",
    location: "Orthopedic & Sports Medicine",
    email: "dr.kim@docalert.com",
    phone: "+1 (555) 678-9012"
  },
  {
    id: 7,
    name: "Dr. Joe Green",
    specialty: "Psychiatrist",
    experience: "14+ years",
    rating: 4.8,
    reviews: 167,
    availability: "Tue - Sat",
    image: "/images/doc8.png",
    location: "Mental Health Center",
    email: "dr.green@docalert.com",
    phone: "+1 (555) 789-0123"
  },
  {
    id: 8,
    name: "Dr. Maria Anderson",
    specialty: "Cardiologist",
    experience: "16+ years",
    rating: 4.7,
    reviews: 178,
    availability: "Mon - Fri",
    image: "/images/doc9.png",
    location: "Heart & Vascular Institute",
    email: "dr.anderson@docalert.com",
    phone: "+1 (555) 890-1234"
  },
  {
    id: 9,
    name: "Dr. Robert Becker",
    specialty: "Pediatrician",
    experience: "11+ years",
    rating: 4.8,
    reviews: 143,
    availability: "Mon - Sat",
    image: "/images/doc10.png",
    location: "Children's Medical Group",
    email: "dr.becker@docalert.com",
    phone: "+1 (555) 901-2345"
  },
  {
    id: 10,
    name: "Dr. Jane Noel",
    specialty: "Neurologist",
    experience: "22+ years",
    rating: 4.9,
    reviews: 289,
    availability: "Wed - Sun",
    image: "/images/doc11.png",
    location: "Neuroscience Center",
    email: "dr.noel@docalert.com",
    phone: "+1 (555) 012-3456"
  },
  {
    id: 11,
    name: "Dr. Sam Lee",
    specialty: "Ophthalmologist",
    experience: "13+ years",
    rating: 4.7,
    reviews: 156,
    availability: "Mon - Fri",
    image: "/images/doc12.png",
    location: "Vision Care Center",
    email: "dr.lee@docalert.com",
    phone: "+1 (555) 123-4567"
  },
  {
    id: 12,
    name: "Dr. Kellie Taylor",
    specialty: "Orthopedic",
    experience: "19+ years",
    rating: 4.8,
    reviews: 198,
    availability: "Tue - Sat",
    image: "/images/doc13.png",
    location: "Joint & Spine Center",
    email: "dr.taylor@docalert.com",
    phone: "+1 (555) 234-5678"
  },
  {
    id: 13,
    name: "Dr. Jack Martinez",
    specialty: "Psychiatrist",
    experience: "15+ years",
    rating: 4.8,
    reviews: 167,
    availability: "Mon - Fri",
    image: "/images/doc14.png",
    location: "Behavioral Health Institute",
    email: "dr.martinez@docalert.com",
    phone: "+1 (555) 345-6789"
  }
];

// Get unique specialties for options
const specialties = [...new Set(doctors.map(doc => doc.specialty))];

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hi! I'm your DocAlert assistant. I can help you find the right doctor. What type of specialist are you looking for?",
    isBot: true,
    options: specialties
  }]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userSelections, setUserSelections] = useState({
    specialty: "",
    experiencePreference: "",
    locationPreference: ""
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(savedTheme ? savedTheme === 'dark' : systemPrefersDark);
  }, []);

  const resetChat = () => {
    setMessages([{
      text: "Hi! I'm your DocAlert assistant. I can help you find the right doctor. What type of specialist are you looking for?",
      isBot: true,
      options: specialties
    }]);
    setCurrentStep(0);
    setUserSelections({
      specialty: "",
      experiencePreference: "",
      locationPreference: ""
    });
  };

  const handleOptionSelect = (option: string) => {
    setMessages(prev => [...prev, { text: option, isBot: false }]);
    
    switch(currentStep) {
      case 0:
        setUserSelections(prev => ({ ...prev, specialty: option }));
        setMessages(prev => [...prev, {
          text: "Great choice! How many years of experience do you prefer?",
          isBot: true,
          options: ["5+ years", "10+ years", "15+ years", "20+ years"]
        }]);
        setCurrentStep(1);
        break;
        
      case 1:
        setUserSelections(prev => ({ ...prev, experiencePreference: option }));
        // Get unique locations for the selected specialty
        const relevantLocations = [...new Set(
          doctors
            .filter(doc => doc.specialty === userSelections.specialty)
            .map(doc => doc.location)
        )];
        setMessages(prev => [...prev, {
          text: "Which location do you prefer?",
          isBot: true,
          options: relevantLocations
        }]);
        setCurrentStep(2);
        break;
        
      case 2:
        setUserSelections(prev => ({ ...prev, locationPreference: option }));
        // Filter and recommend doctors based on all criteria
        const yearsRequired = parseInt(userSelections.experiencePreference);
        const recommendedDoctors = doctors
          .filter(doc => 
            doc.specialty === userSelections.specialty &&
            parseInt(doc.experience) >= yearsRequired &&
            doc.location === option
          )
          .sort((a, b) => {
            // Sort by rating first
            if (b.rating !== a.rating) return b.rating - a.rating;
            // If ratings are equal, sort by number of reviews
            return b.reviews - a.reviews;
          })
          .slice(0, 3);

        if (recommendedDoctors.length > 0) {
          setMessages(prev => [...prev, {
            text: "Based on your preferences, here are the top recommended doctors:",
            isBot: true,
            doctors: recommendedDoctors
          }]);
        } else {
          setMessages(prev => [...prev, {
            text: "I couldn't find any doctors matching all your criteria. Here are the closest matches:",
            isBot: true,
            doctors: doctors
              .filter(doc => doc.specialty === userSelections.specialty)
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
          }]);
        }
        setCurrentStep(3);
        break;
    }
  };

  

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 rounded-full p-4 shadow-lg text-white"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      ) : (
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
        } rounded-lg shadow-xl w-96 h-[32rem] flex flex-col border`}>
          <div className="bg-blue-500 p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-semibold">DocAlert Assistant</h3>
            <div className="flex gap-2">
              <button 
                onClick={resetChat}
                className="text-white hover:text-gray-200"
                aria-label="Reset chat"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[90%] space-y-2 ${
                  msg.isBot ? 'flex flex-col items-start' : ''
                }`}>
                  <div className={`p-3 rounded-lg ${
                    msg.isBot 
                      ? isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-900'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {msg.text}
                  </div>
                  
                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.options.map((option, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleOptionSelect(option)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {msg.doctors && (
                    <div className="w-full space-y-3 mt-2">
                      {msg.doctors.map((doc, docIdx) => (
                        <div
                          key={docIdx}
                          className={`p-3 rounded-lg ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                          <Image
  src={doc.image}
  alt={doc.name}
  width={48}  // 12 * 4 = 48px
  height={48}
  className="rounded-full object-cover"
/>
                            <div className="flex-1">
                              <h4 className="font-semibold">{doc.name}</h4>
                                                            <p className="text-sm">{doc.experience} • {doc.availability}</p>
                              <p className="text-sm">{doc.location}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="text-center mt-4">
                        <button
                          onClick={resetChat}
                          className="text-blue-500 hover:text-blue-600 text-sm flex items-center justify-center gap-2 mx-auto"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Start New Search
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
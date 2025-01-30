"use client";

import React, { useState, useEffect } from 'react';
import { Star, Calendar, Phone, Mail, MapPin, Search } from 'lucide-react';
import Navbar from '../Navbar';
import Link from 'next/link';
import Image from 'next/image';


const doctors = [
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

const DoctorsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  // Get unique specialties for the filter dropdown
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);



  // Filter doctors based on search term and specialty
  useEffect(() => {
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, selectedSpecialty]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar/>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Expert Doctors
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Choose from our network of experienced healthcare professionals
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-3 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full p-3 pl-10 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className={`p-3 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {/* Doctor Image */}
              <div className="relative">
              <Image
  src={doctor.image}
  alt={doctor.name}
  width={192} // 48 * 4 = 192px
  height={192}
  className="object-cover"
/>
                <div className="absolute top-4 right-4 bg-custom-blue1 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {doctor.availability}
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {doctor.name}
                    </h3>
                    <p className="text-custom-blue1 font-medium">
                      {doctor.specialty}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className={`ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {doctor.rating} ({doctor.reviews})
                    </span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 mb-4">
                  <div className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{doctor.phone}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                <Link href={`/doctors/${doctor.id}/book`}>
                  <button className="flex-1 bg-custom-blue1 text-black px-9 py-2 rounded-lg hover:bg-custom-blue2 transition-colors">
                    Book Appointment
                  </button>
                </Link>
                <Link href={`/doctors/${doctor.id}`}>
                  <button className="flex-1 border-2 border-custom-blue1 text-custom-blue1 px-4 py-2 rounded-lg hover:bg-custom-blue1 hover:text-black transition-colors">
                    View Profile
                  </button>
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
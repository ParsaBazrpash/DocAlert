"use client";

import React, { useState, useEffect, use } from 'react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Navbar from '../../../Navbar';
import { useRouter } from 'next/navigation';
import { firestore, auth } from '../../../config/firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import Image from 'next/image';



interface FormData {
  name: string;
  email: string;
  phone: string;
  reason: string;
}

interface AppointmentData {
  userId: string;
  doctorId: string;
  name: string;
  speciality: string;
  image: string;
  location: string;
  dateTime: string;
  status: "upcoming" | "completed" | "cancelled";
  reason: string;
  email: string;
  phone: string;
}

const timeSlots: string[] = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

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

const sendNotification = async (
  userId: string,
  doctorName: string,
  appointmentDateTime: string,
  doctorSpecialty: string
) => {
  try {
    // Check browser support
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications');
      return;
    }

    // Request permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.error('Notification permission not granted');
      return;
    }

    // Create browser notification
    const notification = new Notification('Appointment Confirmed!', {
      body: `Your appointment with ${doctorName} is scheduled for ${appointmentDateTime}`,
      icon: '/icon.png',
      badge: '/icon.png'
    });

    // Store notification in Firestore with enhanced data
    const notificationData = {
      userId,
      type: 'appointment',
      doctorName,
      doctorSpecialty,
      appointmentDate: appointmentDateTime,
      message: `Appointment scheduled with ${doctorName} (${doctorSpecialty})`,
      time: new Date().toISOString(),
      isRead: false,
      status: 'upcoming'
    };

    await addDoc(collection(firestore, 'notifications'), notificationData);
    console.log('Notification stored in Firestore');

    // Handle notification clicks
    notification.onclick = () => {
      window.focus();
      notification.close();
    };

  } catch (error) {
    console.error('Error in sendNotification:', error);
  }
};

const bookAppointment = async (
  userId: string,
  doctorId: string,
  doctorName: string,
  doctorSpecialty: string,
  doctorImage: string,
  doctorLocation: string,
  appointmentDateTime: string,
  formData: FormData
): Promise<void> => {
  try {
    // Book the appointment
    const docRef = await addDoc(collection(firestore, "appointments"), {
      userId,
      doctorId,
      name: doctorName,
      speciality: doctorSpecialty,
      image: doctorImage,
      location: doctorLocation,
      dateTime: appointmentDateTime,
      status: "upcoming",
      reason: formData.reason,
      email: formData.email,
      phone: formData.phone
    } as AppointmentData);

    // Send the enhanced notification
    await sendNotification(
      userId,
      doctorName,
      appointmentDateTime,
      doctorSpecialty
    );

    console.log("Appointment booked with ID:", docRef.id);
  } catch (e) {
    console.error("Error booking appointment:", e);
    throw e;
  }
};

const BookingPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const router = useRouter();
  
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    reason: ""
  });

  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const doctorId = resolvedParams.id;
  const doctor = doctors.find(d => d.id === parseInt(doctorId));

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');

    // Request notification permission when component mounts
    const requestNotificationPermission = async () => {
      try {
        await Notification.requestPermission();
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    };
    requestNotificationPermission();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!doctor) {
      console.error("Doctor not found");
      return;
    }

    try {
      // Get the actual user ID from Firebase Auth
      const userId = auth.currentUser?.uid;
      if (!userId) {
        alert("Please sign in to book an appointment");
        return;
      }

      const appointmentDateTime = `${selectedDate} ${selectedTime}`;

      await bookAppointment(
        userId,
        doctorId,
        doctor.name,
        doctor.specialty,
        doctor.image,
        doctor.location,
        appointmentDateTime,
        formData
      );

      alert("Appointment booked successfully!");
      router.push('/appointments');
    } catch (error) {
      console.error("Error during booking:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className={`mb-8 flex items-center ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Doctor Profile
        </button>

        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Book Appointment
          </h1>
          <div className="flex items-center">
          <Image
  src={doctor.image}
  alt={doctor.name}
  width={64} // 16 * 4 = 64px
  height={64}
  className="rounded-full object-cover mr-4"
/>
            <div>
              <p className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {doctor.name}
              </p>
              <p className="text-custom-blue1">
                {doctor.specialty}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Select Date & Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Clock className="w-4 h-4 inline mr-2" />
                  Preferred Time
                </label>
                <select
                  required
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Information
            </h2>
            <input
              type="text"
              placeholder="Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-3 mb-4 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full p-3 mb-4 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full p-3 mb-4 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <textarea
              placeholder="Reason for appointment"
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className={`w-full p-3 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-custom-blue1 text-black py-3 rounded-lg hover:bg-custom-blue2 transition-colors text-lg font-semibold"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
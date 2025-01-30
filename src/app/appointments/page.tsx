"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Navbar from '../Navbar';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import Image from 'next/image';

interface Appointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  location: string;
  doctorImage: string;
  reason?: string;
  cancelled?: boolean;
}

const AppointmentsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const appointmentsRef = collection(firestore, 'appointments');
      const querySnapshot = await getDocs(appointmentsRef);

      const fetchedAppointments = querySnapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        const [date, time] = data.dateTime.split(' ');
        return {
          id: docSnapshot.id,
          doctorName: data.name,
          doctorSpecialty: data.speciality,
          date,
          time,
          location: data.location,
          doctorImage: data.image,
          reason: data.reason,
          cancelled: data.cancelled || false,
        };
      });

      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const appointmentRef = doc(firestore, 'appointments', appointmentId);
      await updateDoc(appointmentRef, {
        cancelled: true,
        cancelledAt: new Date().toISOString()
      });

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId
            ? { ...apt, cancelled: true }
            : apt
        )
      );
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  const handleRescheduleClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(appointment.date);
    setNewTime(appointment.time);
    setIsRescheduling(true);
  };

  const handleRescheduleSubmit = async () => {
    if (!selectedAppointment) return;

    try {
      const appointmentRef = doc(firestore, 'appointments', selectedAppointment.id);
      await updateDoc(appointmentRef, {
        dateTime: `${newDate} ${newTime}`
      });

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedAppointment.id
            ? { ...apt, date: newDate, time: newTime }
            : apt
        )
      );

      setIsRescheduling(false);
      setSelectedAppointment(null);
      alert('Appointment rescheduled successfully!');
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      alert('Failed to reschedule appointment. Please try again.');
    }
  };

  

  const activeAppointments = appointments.filter(apt => !apt.cancelled);
  

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My Appointments
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and view all appointments
          </p>
        </div>

        {/* Reschedule Modal */}
        {isRescheduling && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl max-w-md w-full`}>
              <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Reschedule Appointment
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    New Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    New Time
                  </label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleRescheduleSubmit}
                    className="flex-1 px-4 py-2 bg-custom-blue1 text-black rounded-lg hover:bg-custom-blue2 transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setIsRescheduling(false);
                      setSelectedAppointment(null);
                    }}
                    className="flex-1 px-4 py-2 border-2 border-gray-500 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Appointments */}
        <div className="space-y-4">
          {activeAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                <Image
  src={appointment.doctorImage}
  alt={appointment.doctorName}
  width={64}  // 16 * 4 = 64px
  height={64}
  className="rounded-full object-cover mr-4"
/>
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {appointment.doctorName}
                    </h3>
                    <p className="text-custom-blue1">
                      {appointment.doctorSpecialty}
                    </p>
                    {appointment.reason && (
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Reason: {appointment.reason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Calendar className="w-5 h-5 mr-2" />
                    {appointment.date}
                  </div>
                  <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Clock className="w-5 h-5 mr-2" />
                    {appointment.time}
                  </div>
                  <div className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <MapPin className="w-5 h-5 mr-2" />
                    {appointment.location}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleCancelAppointment(appointment.id)}
                  className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                >
                  Cancel Appointment
                </button>
                <button 
                  onClick={() => handleRescheduleClick(appointment)}
                  className="px-4 py-2 bg-custom-blue1 text-black rounded-lg hover:bg-custom-blue2 transition-colors"
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))}

          {activeAppointments.length === 0 && (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No active appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
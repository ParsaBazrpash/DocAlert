"use client";


import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Clock, X } from 'lucide-react';
import Navbar from '../Navbar';
import { collection, query, where, orderBy, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { firestore, auth } from '../config/firebase';


interface Notification {
  id: string;
  type: 'appointment';
  message: string;
  time: Date;
  appointmentDate: string;
  userId: string;
  doctorName: string;
}


const NotificationsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');


    const userId = auth.currentUser?.uid;
    if (!userId) {
      setLoading(false);
      return;
    }


    const notificationsRef = collection(firestore, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      where('type', '==', 'appointment'),
      orderBy('time', 'desc')
    );


    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Notification[];
     
      const currentTime = new Date().getTime();
      const filteredNotifications = newNotifications.filter(notification => {
        const appointmentTime = new Date(notification.appointmentDate).getTime();
        return appointmentTime - currentTime <= 24 * 60 * 60 * 1000 && appointmentTime > currentTime;
      });


      setNotifications(filteredNotifications);
      setLoading(false);
    });


    return () => unsubscribe();
  }, []);


  const closeNotification = async (notificationId: string) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;


      await deleteDoc(doc(firestore, 'notifications', notificationId));
    } catch (error) {
      console.error('Error closing notification:', error);
    }
  };


  const formatAppointmentTime = (timestamp: string | number): string => {
    if (!timestamp) return '';
    const date = new Date(timestamp); // this will work for both string and number types
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  


  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading notifications...</div>
        </div>
      </div>
    );
  }


  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <Bell className="w-8 h-8" />
            Upcoming Appointment Notifications
          </h1>
          <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Notifications for upcoming appointments in the next 24 hours</p>
        </div>


        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No upcoming notifications within the next 24 hours
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-l-4 border-custom-blue1 relative`}>
                <button
                  onClick={() => closeNotification(notification.id)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                  title="Close notification"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>


                <div className="flex items-start pr-8">
                  <Calendar className="w-6 h-6 text-custom-blue1 mt-1 mr-4" />
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Appointment Reminder</p>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Your appointment with {notification.doctorName} is scheduled soon.
                    </p>
                    <div className="mt-3 space-y-2">
                    <p className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
  <Clock className="w-4 h-4 mr-2" />
  {formatAppointmentTime(notification.appointmentDate)}  {/* No more type errors */}
</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


export default NotificationsPage;




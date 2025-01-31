"use client";

import React from 'react';
import Link from 'next/link';
import { Clock, Bell, User } from 'lucide-react';
import AIAssistant from '../app/components/AIAssistant';
import Navbar from './Navbar';
import Image from 'next/image';

const Page = () => {
  // We'll keep the dark mode state in the page for content theming
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(true);

  // Load theme preference from localStorage on mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar/>
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome to DocAlert
          </h1>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Schedule your medical appointments with ease
          </p>
          
          <Link href="/doctors">
            <button className="bg-custom-blue1 text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-custom-blue2 transition-colors">
              Book an Appointment
            </button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
        <Image 
  src="/images/doctormain.png" 
  alt="Medical Care" 
  width={800} // Adjust based on the actual image size
  height={300} 
/>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
            <h3 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-custom-blue1' : 'text-custom-blue2'}`}>13+</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Expert Doctors</p>
          </div>
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
            <h3 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-custom-blue1' : 'text-custom-blue2'}`}>1K+</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Happy Patients</p>
          </div>
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
            <h3 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-custom-blue1' : 'text-custom-blue2'}`}>24/7</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Available Support</p>
          </div>
        </div>

        {/* About DocAlert Section */}
        <div className={`rounded-xl p-8 mb-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-blue-500' : 'text-custom-blue1'}`}>
                WE ARE DOC ALERT
              </h2>
              <div className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-custom-blue3'}`}>
                <p>
                  At DocAlert, we are revolutionizing the way you manage your healthcare journey. Our innovative platform combines cutting-edge technology with compassionate care to provide you with seamless medical appointment scheduling and management.
                </p>
                <p>
                  Founded in 2024, our mission is to eliminate the barriers between patients and quality healthcare. We understand that your time is valuable, which is why we have developed an intelligent system that not only helps you find the right doctor but ensures you never miss an appointment.
                </p>
                <p>
                  Our network of certified healthcare professionals spans across multiple specialties, ensuring that whether you need a routine check-up or specialized care, you are always in good hands. With DocAlert, quality healthcare is just a click away.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
            <Image 
  src="/images/doctormain2.png" 
  alt="DocAlert Healthcare Platform" 
  width={500}  // Adjust based on actual image size
  height={300} 
  priority  // Loads this image faster if it's above the fold
/>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={`rounded-xl p-8 mb-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Choose DocAlert?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-custom-blue1 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Booking</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Book appointments in less than 2 minutes</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-custom-blue1 p-3 rounded-lg">
                <Bell className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Reminders</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Never miss your appointments</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-custom-blue1 p-3 rounded-lg">
                <User className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Expert Doctors</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Access to qualified specialists</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className={`rounded-xl p-8 mb-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            What Our Patients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-4">
              <Image 
  src="/images/people1.jpeg" 
  alt="Patient" 
  width={40}  // 10 * 4 = 40px
  height={40} 
  className="rounded-full mr-4"
/>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Emma Thompson</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Regular Patient</p>
                </div>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                DocAlert has made managing healthcare of my family so much easier. The appointment reminders are a lifesaver, and the doctors are always punctual and professional.
              </p>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-4">
              <Image
  src="/images/people2.jpeg"
  alt="Patient"
  width={40}  // 10 * 4 = 40px
  height={40}
  className="rounded-full mr-4"
/>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>David Martinez</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>New Patient</p>
                </div>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I was impressed by how quick and easy it was to book an appointment. The DocAlert assistant helped me find the right specialist for my needs. Highly recommended!
              </p>
            </div>
          </div>
        </div>




{/* How It Works Section */}
<div className={`rounded-xl p-8 mb-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
  <h2 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
    How DocAlert Works
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="text-center">
      <div className={`w-12 h-12 rounded-full bg-custom-blue1 flex items-center justify-center mx-auto mb-4`}>
        <span className="text-black font-bold">1</span>
      </div>
      <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sign Up</h3>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Create your account in minutes
      </p>
    </div>
    <div className="text-center">
      <div className={`w-12 h-12 rounded-full bg-custom-blue1 flex items-center justify-center mx-auto mb-4`}>
        <span className="text-black font-bold">2</span>
      </div>
      <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Find Doctor</h3>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Browse our network of specialists
      </p>
    </div>
    <div className="text-center">
      <div className={`w-12 h-12 rounded-full bg-custom-blue1 flex items-center justify-center mx-auto mb-4`}>
        <span className="text-black font-bold">3</span>
      </div>
      <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Book Visit</h3>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Schedule at your convenience
      </p>
    </div>
    <div className="text-center">
      <div className={`w-12 h-12 rounded-full bg-custom-blue1 flex items-center justify-center mx-auto mb-4`}>
        <span className="text-black font-bold">4</span>
      </div>
      <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Get Care</h3>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Receive quality healthcare
      </p>
    </div>
  </div>
</div>


{/* Health Resources Section */}
<div className={`rounded-xl p-8 mb-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
  <h2 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
    Health Resources & Information
  </h2>
  
  {/* Health Categories */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
    {/* Preventive Care */}
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Preventive Care
      </h3>
      <ul className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <li>• Regular health check-ups</li>
        <li>• Vaccination schedules</li>
        <li>• Health screenings by age</li>
        <li>• Lifestyle recommendations</li>
      </ul>
    </div>

    {/* Common Health Conditions */}
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Common Health Conditions
      </h3>
      <ul className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <li>• Diabetes management</li>
        <li>• Heart health guidelines</li>
        <li>• Mental health resources</li>
        <li>• Allergies and asthma care</li>
      </ul>
    </div>

    {/* Emergency Guidelines */}
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Emergency Guidelines
      </h3>
      <ul className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <li>• First aid basics</li>
        <li>• Emergency symptoms</li>
        <li>• When to call 911</li>
        <li>• Hospital emergency contacts</li>
      </ul>
    </div>
  </div>

  {/* Health Tips */}
  <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
    <h3 className={`text-xl font-semibold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      Quick Health Tips
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className={`p-4 rounded-lg bg-custom-blue1 text-black`}>
        <p className="font-semibold">Stay Hydrated</p>
        <p className="text-sm">Drink 8 glasses of water daily</p>
      </div>
      <div className={`p-4 rounded-lg bg-custom-blue1 text-black`}>
        <p className="font-semibold">Regular Exercise</p>
        <p className="text-sm">30 minutes daily activity</p>
      </div>
      <div className={`p-4 rounded-lg bg-custom-blue1 text-black`}>
        <p className="font-semibold">Healthy Sleep</p>
        <p className="text-sm">7-9 hours of sleep nightly</p>
      </div>
      <div className={`p-4 rounded-lg bg-custom-blue1 text-black`}>
        <p className="font-semibold">Balanced Diet</p>
        <p className="text-sm">Include fruits and vegetables</p>
      </div>
    </div>
  </div>
</div>

{/* FAQ Section */}
<div className={`rounded-xl p-8 mb-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                How do I book an appointment?
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Booking an appointment is simple! Just click on the Book an Appointment button, select your preferred doctor, choose an available time slot, and confirm your booking. You will receive an instant confirmation via email.
              </p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                What specialties do your doctors cover?
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our network includes specialists across various fields including General Practice, Pediatrics, Cardiology, Dermatology, Orthopedics, and more. You can view the full list of specialties when searching for doctors.
              </p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                How does the reminder system work?
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our reminder system sends notifications via email and SMS 24 hours before your appointment, and again 2 hours before. You can customize your reminder preferences in your account settings.
              </p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                What if I need to reschedule or cancel?
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You can reschedule or cancel appointments up to 24 hours before the scheduled time through your account dashboard. For last-minute changes, please contact our support team directly.
              </p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Is my medical information secure?
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Yes, we take your privacy seriously. All medical information is encrypted and stored securely following HIPAA guidelines. We never share your information without your explicit consent.
              </p>
            </div>
            <div>
              <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Do you accept insurance?
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Yes, we work with most major insurance providers. You can verify your insurance coverage and view estimated costs before booking an appointment. Contact our support team for specific insurance-related queries.
              </p>
            </div>
          </div>
        </div>


        {/* Call to Action */}
        <div className={`rounded-xl p-12 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Ready to Get Started?
          </h2>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Join thousands of patients who trust DocAlert for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/doctors">
              <button className="bg-custom-blue1 text-black px-8 py-3 rounded-lg font-semibold hover:bg-custom-blue2 transition-colors">
                Find a Doctor
              </button>
            </Link>
            <Link href="./learnmore">
              <button className={`border-2 border-custom-blue1 px-8 py-3 rounded-lg font-semibold 
                ${isDarkMode ? 'text-white hover:text-black' : 'text-gray-900 hover:text-black'} 
                hover:bg-custom-blue1 transition-colors`}>
                About Us
              </button>
            </Link>
            <AIAssistant />
          </div>
        </div>

        {/* Project Details */}
        <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p className="mb-4">
            © 2025 DocAlert. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Page;

'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/app/config/firebase'
import { onAuthStateChanged, updateProfile, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { User, LogOut, ArrowLeft } from 'lucide-react'
import Navbar from '../Navbar'

interface UserData {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  age: string;
  phone: string;
  address: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  emergencyContact: string;
}

interface FormData {
  displayName: string;
  age: string;
  phone: string;
  address: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  emergencyContact: string;
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  const [formData, setFormData] = useState<FormData>({
    displayName: '',
    age: '',
    phone: '',
    address: '',
    occupation: '',
    gender: '',
    dateOfBirth: '',
    emergencyContact: ''
  })

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setIsDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Load saved user data from localStorage if it exists
        const savedData = localStorage.getItem(`userData_${user.uid}`)
        const userData = savedData ? JSON.parse(savedData) : {}
        
        setUser({
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          email: user.email,
          photoURL: user.photoURL,
          ...userData
        })
        
        setFormData({
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          age: userData.age || '',
          phone: userData.phone || '',
          address: userData.address || '',
          occupation: userData.occupation || '',
          gender: userData.gender || '',
          dateOfBirth: userData.dateOfBirth || '',
          emergencyContact: userData.emergencyContact || ''
        })
      } else {
        router.push('/')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    setUpdating(true)

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName
        })
        
        // Save additional data to localStorage
        const additionalData = {
          age: formData.age,
          phone: formData.phone,
          address: formData.address,
          occupation: formData.occupation,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          emergencyContact: formData.emergencyContact
        }
        
        localStorage.setItem(`userData_${auth.currentUser.uid}`, JSON.stringify(additionalData))
        
        setUser({
          ...user,
          displayName: formData.displayName,
          ...additionalData
        } as UserData)
        
        setSuccessMessage('Profile successfully updated!')
        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      }
    } catch (err) {
      setError('Failed to update profile')
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg className="animate-spin h-8 w-8 text-custom-blue1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const inputClassName = `w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-custom-blue1 
    ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`

  const labelClassName = `block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.push('/')}
          className={`flex items-center space-x-2 mb-4 px-4 py-2 rounded-lg 
            ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        
        <div className={`max-w-2xl mx-auto rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border border-gray-200'}`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Profile Settings
              </h2>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-500 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* User Icon */}
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-custom-blue1 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Update Form */}
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="displayName" className={labelClassName}>
                      Display Name
                    </label>
                    <input
                      id="displayName"
                      name="displayName"
                      type="text"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClassName}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email || ''}
                      disabled
                      className={`${inputClassName} opacity-70 cursor-not-allowed`}
                    />
                  </div>

                  <div>
                    <label htmlFor="gender" className={labelClassName}>
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={inputClassName}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className={labelClassName}>
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClassName}>
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="occupation" className={labelClassName}>
                      Allergic to:
                    </label>
                    <input
                      id="occupation"
                      name="occupation"
                      type="text"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className={inputClassName}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <label htmlFor="address" className={labelClassName}>
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="emergencyContact" className={labelClassName}>
                    Emergency Contact
                  </label>
                  <input
                    id="emergencyContact"
                    name="emergencyContact"
                    type="text"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className={inputClassName}
                    placeholder="Name - Relationship - Phone Number"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded bg-red-100 border border-red-400 text-red-700">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="p-3 rounded bg-green-100 border border-green-400 text-green-700">
                    {successMessage}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={updating}
                  className={`w-full px-4 py-2 rounded bg-custom-blue1 text-black hover:bg-custom-blue2 
                    transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-blue1
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}`}
                >
                  {updating ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </div>
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
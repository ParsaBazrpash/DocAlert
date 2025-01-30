
"use client";


import { useState, ChangeEvent } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { X } from "lucide-react";


interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}


export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(true);


  const handleSignUp = async (): Promise<void> => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User signed up successfully!");
      onClose();
    } catch (err) {
      const error = err as AuthError;
      console.error("Error during sign-up:", error.message);
      alert(error.message);
    }
  };


  const handleLogIn = async (): Promise<void> => {
    try {
      const userCredential =await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.uid);
      alert("User logged in successfully!");
      onClose();
    } catch (err) {
      const error = err as AuthError;
      console.error("Error during log-in:", error.message);
      alert(error.message);
    }
  };


  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
     
      {/* Modal */}
      <div className={`relative w-full max-w-md p-6 rounded-xl shadow-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 rounded-full
            ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <X className="w-5 h-5" />
        </button>


        {/* Title */}
        <h2 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>


        {/* Form */}
        <div className="space-y-4">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 rounded border ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-custom-blue1`}
          />


          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded border ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-custom-blue1`}
          />


          {isSignUp && (
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-custom-blue1`}
            />
          )}


          <button
            onClick={isSignUp ? handleSignUp : handleLogIn}
            className="w-full py-2 px-4 bg-custom-blue1 hover:bg-custom-blue2 text-black rounded transition duration-200"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>


          <p className={`text-center mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setConfirmPassword("");
              }}
              className="text-custom-blue1 hover:underline focus:outline-none"
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};


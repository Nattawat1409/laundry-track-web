import React from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import LogoImage from '../assets/Logo.png';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      // Assuming success, redirect or show success message
      console.log('Registration successful:', response.data);
      // You can redirect here, e.g., window.location.href = '/login';
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };


  // const [array,setArray] = useState([]);
  
  //   // we create asynchornously function //
  //   const fetchAPI = async() =>{
  //     const response = await axios.get("http://localhost:3000/register");
  //     setArray(response.data.message);
  //     console.log(response.data.message);
  //   }
  
  //   useEffect(()=> {
  //     fetchAPI();
  //   },[]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={LogoImage} alt="Laundry Track Logo" className="w-50 h-auto" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">Create Account</h1>
        <p className="text-slate-500 text-center mb-8">Join us to track your laundry</p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <label className="flex items-start cursor-pointer mt-6">
            <input
              type="checkbox"
              className="w-4 h-4 accent-teal-400 rounded border-slate-300 cursor-pointer mt-1"
              required
            />
            <span className="ml-2 text-slate-600 cursor-pointer text-sm">
              I agree to the <a href="#terms" className="text-teal-400 hover:text-teal-500 font-medium">Terms of Service</a> and <a href="#privacy" className="text-teal-400 hover:text-teal-500 font-medium">Privacy Policy</a>
            </span>
          </label>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-teal-400 text-white font-semibold py-2.5 rounded-lg hover:bg-teal-500 transition-colors mt-8 shadow-md hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-300"></div>
          <span className="px-3 text-slate-400 text-sm">or</span>
          <div className="flex-1 border-t border-slate-300"></div>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-slate-600 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-teal-400 hover:text-teal-500 font-semibold transition-colors">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;

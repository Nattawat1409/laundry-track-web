import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../assets/Logo.png';
import { useAuth } from '../context/AuthContext';
import { describeAxiosError } from '../utils/errors';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError(describeAxiosError(err, 'Login failed'));
      console.error('Login failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={LogoImage} alt="Laundry Track Logo" className="w-50 h-auto" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">Welcome Back</h1>
        <p className="text-slate-500 text-center mb-8">Sign in to your account</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-teal-400 rounded border-slate-300 cursor-pointer"
              />
              <span className="ml-2 text-slate-600 cursor-pointer">Remember me</span>
            </label>
            <a href="#forgot" className="text-teal-400 hover:text-teal-500 font-medium transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-teal-400 text-white font-semibold py-2.5 rounded-lg hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-8 shadow-md hover:shadow-lg"
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-300"></div>
          <span className="px-3 text-slate-400 text-sm">or</span>
          <div className="flex-1 border-t border-slate-300"></div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-slate-600 text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-teal-400 hover:text-teal-500 font-semibold transition-colors">
            Create one now
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

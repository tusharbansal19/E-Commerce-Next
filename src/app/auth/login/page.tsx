'use client';
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X, Loader2, Mail, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../Providers';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/userSlice';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const dispatch = useDispatch();

  // Real-time validation
  useEffect(() => {
    const newErrors = {
      email: '',
      password: '',
      general: '',
    };
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
  }, [formData.email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '', general: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { email: '', password: '', general: '' };
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Invalid email or password.');
      }
      const data = await res.json();
      login(data.user); // AuthContext
      dispatch(setUser(data.user)); // Redux
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.replace('/dashboard');
      }, 1000);
    } catch (error) {
      let message = 'Invalid email or password.';
      if (error instanceof Error) message = error.message;
      setErrors(prev => ({ ...prev, general: message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden transition-colors duration-300">
      {/* Enhanced Animated Gradient Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <svg width="100%" height="100%" className="absolute inset-0 w-full h-full animate-pulse" style={{ opacity: 0.13 }}>
          <defs>
            <radialGradient id="loginBgGradient" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
            </radialGradient>
            <linearGradient id="loginBgWave" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.09" />
            </linearGradient>
          </defs>
          <ellipse cx="60%" cy="30%" rx="600" ry="300" fill="url(#loginBgGradient)" />
          <ellipse cx="20%" cy="80%" rx="400" ry="180" fill="#22c55e" opacity="0.12" />
          <ellipse cx="80%" cy="70%" rx="300" ry="120" fill="#16a34a" opacity="0.09" />
          <ellipse cx="50%" cy="90%" rx="700" ry="120" fill="url(#loginBgWave)" />
          <path d="M0,400 Q300,350 600,400 T1200,400 V600 H0 Z" fill="#4ade80" opacity="0.07" />
          <circle cx="90%" cy="10%" r="120" fill="#bbf7d0" opacity="0.10" />
          <circle cx="10%" cy="20%" r="80" fill="#22d3ee" opacity="0.06" />
        </svg>
      </div>
      {/* Main Content */}
      <div className="relative z-10">
        {/* Success Toast */}
        {showSuccess && (
          <div
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2
            transition-all duration-500 ease-out opacity-100 translate-y-0"
          >
            <Check className="w-5 h-5" />
            Login successful! Welcome back! 🎉
          </div>
        )}

        {/* General Error Message */}
        {errors.general && (
          <div
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2
            transition-all duration-500 ease-out opacity-100 translate-y-0"
          >
            <X className="w-5 h-5" />
            {errors.general}
          </div>
        )}

        <div className="flex min-h-screen items-center justify-center ">
          <div
            className={`w-full max-w-2xl backdrop-blur-xl rounded-4xl shadow-3xl border transition-all duration-500 ease-out opacity-100 scale-100`}
          >
              <h1 className='text-2xl font-bold text-green-500 w-full text-center'>LOGIN</h1>

            <div className="grid md:grid-cols-2 p-10 gap-12 ">
              {/* Left Section (Header & Description) */}
              <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-6">
                  <div
                      className="mx-auto md:mx-0 w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl
                      transition-all duration-600 ease-out opacity-100 translate-y-0 delay-200"
                  >
                      <Sparkles className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <h1 
                      className={`text-2xl font-extrabold mb-4 drop-shadow-lg 
                      transition-all duration-600 ease-out opacity-100 translate-y-0 delay-400`}
                  >
                      Welcome Back!
                  </h1>
                  <p 
                      className={`text-lg leading-relaxed 
                      transition-all duration-600 ease-out opacity-100 translate-y-0 delay-600`}
                  >
                      Access your account and continue your journey. We&apos;ve missed you!
                  </p>
              </div>

              {/* Right Section (Form) */}
              <div className="space-y-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Email */}
                  <div className="transition-all duration-600 ease-out opacity-100 translate-x-0 delay-300">
                    <div className="relative">
                      <Mail className={`absolute left-5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        aria-label="Email Address"
                        className={`w-full pl-14 pr-6 py-2 rounded-2xl text-black text-black border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/20 ${
                          errors.email
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-gray-200 bg-white/70 focus:border-green-500'
                        }`}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1 transition-all duration-300 ease-out opacity-100 translate-y-0">
                        <X className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="transition-all duration-600 ease-out opacity-100 translate-x-0 delay-400">
                    <div className="relative">
                      <Lock className={`absolute left-5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        aria-label="Password"
                        className={`w-full pl-14 pr-16 py-2 rounded-2xl text-black text-lg border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/20 ${
                          errors.password
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-gray-200 bg-white/70 focus:border-green-500'
                        }`}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700`}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1 transition-all duration-300 ease-out opacity-100 translate-y-0">
                        <X className="w-4 h-4" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-2xl font-bold text-xl transition-all duration-300 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all duration-600 ease-out opacity-100 translate-y-0 delay-500"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                {/* Google Sign In */}
                <button
                  type="button"
                  className={`w-full py-2 rounded-2xl font-semibold text-lg transition-all duration-300 border-2 flex items-center justify-center gap-4 shadow-sm hover:shadow-md transition-all duration-600 ease-out opacity-100 translate-y-0 delay-600`}
                  aria-label="Continue with Google"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                {/* Sign Up Link */}
                <div className="text-center mt-8 transition-all duration-600 ease-out opacity-100 delay-700">
                  <p className={`text-gray-600`}>
                    Don't have an account?{' '}
                    <Link
                      href="/auth/register"
                      className="text-green-500 hover:text-green-600 font-bold transition-colors"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
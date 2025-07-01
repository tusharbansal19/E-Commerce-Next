'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, Check, X, Loader2, User, Mail, Phone, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Password strength calculation
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  // Real-time validation
  useEffect(() => {
    const newErrors: Errors = {};
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate all fields
    const newErrors: Errors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    try {
      // Replace with your real API endpoint
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed.');
      }
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Here you would typically redirect to login or dashboard
      }, 3000);
    } catch (error: any) {
      setErrors(prev => ({ ...prev, general: error.message || 'Registration failed.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = (): string => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (): string => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden transition-colors duration-300">
      {/* Enhanced Animated Gradient Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <svg width="100%" height="100%" className="absolute inset-0 w-full h-full animate-pulse" style={{ opacity: 0.13 }}>
          <defs>
            <radialGradient id="registerBgGradient" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
            </radialGradient>
            <linearGradient id="registerBgWave" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.09" />
            </linearGradient>
          </defs>
          <ellipse cx="60%" cy="30%" rx="600" ry="300" fill="url(#registerBgGradient)" />
          <ellipse cx="20%" cy="80%" rx="400" ry="180" fill="#22c55e" opacity="0.12" />
          <ellipse cx="80%" cy="70%" rx="300" ry="120" fill="#16a34a" opacity="0.09" />
          <ellipse cx="50%" cy="90%" rx="700" ry="120" fill="url(#registerBgWave)" />
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
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-500 ease-out opacity-100 translate-y-0"
          >
            <Check className="w-5 h-5" />
            Account created successfully! Welcome aboard! 🎉
          </div>
        )}

        <div className="flex min-h-screen items-center justify-center p-4">
          <div
            className="w-full max-w-4xl backdrop-blur-xl rounded-2xl shadow-xl border bg-white border-gray-200 transition-all duration-500 ease-out opacity-100 scale-100"
          >
            <h1 className='text-2xl font-bold text-green-600 w-full text-center pt-6'>REGISTER</h1>

            <div className="grid md:grid-cols-2 p-6 gap-8">
              {/* Left Section - Form Fields */}
              <div className="space-y-4">
                <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                  {/* Full Name */}
                  <div>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className={`w-full pl-12 pr-4 py-3 rounded-lg text-base border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                          errors.fullName
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-gray-200 bg-white focus:border-green-500'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className={`w-full pl-12 pr-4 py-3 rounded-lg text-base border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                          errors.email
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-gray-200 bg-white focus:border-green-500'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className={`w-full pl-12 pr-4 py-3 rounded-lg text-base border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                          errors.phone
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-gray-200 bg-white focus:border-green-500'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Section - Password Fields & Buttons */}
              <div className="space-y-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Password */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className={`w-full pl-12 pr-10 py-3 rounded-lg text-base border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                          errors.password
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-gray-200 bg-white focus:border-green-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-gray-600">
                            Password Strength
                          </span>
                          <span className={`text-xs font-semibold ${
                            passwordStrength >= 75 ? 'text-green-600' : 
                            passwordStrength >= 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {getStrengthText()}
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-200">
                          <div
                            style={{ width: `${passwordStrength}%` }}
                            className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()}`}
                          />
                        </div>
                      </div>
                    )}
                    
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        className={`w-full pl-12 pr-10 py-3 rounded-lg text-base border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                          errors.confirmPassword
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-gray-200 bg-white focus:border-green-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label="Toggle confirm password visibility"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>

                  {/* Google Sign Up */}
                  <button
                    type="button"
                    className="w-full py-3 rounded-lg font-medium text-base transition-all duration-300 border flex items-center justify-center gap-3 shadow-sm hover:shadow-md border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                </form>

                {/* Login Link */}
                <div className="text-center mt-4">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link
                      href="/auth/login"
                      className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                    >
                      Sign In
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

export default SignUpPage;

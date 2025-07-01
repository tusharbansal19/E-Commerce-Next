'use client';
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X, Loader2, User, Mail, Phone, Lock, Sparkles } from 'lucide-react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  // Real-time validation
  useEffect(() => {
    const newErrors = {};
    
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
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
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Here you would typically redirect to login or dashboard
      }, 3000);
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900' 
        : 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100'
    }`}>
      {/* Custom styles for password strength bar transition */}
      <style jsx>{`
        .password-strength-bar {
          transition: width 0.3s ease-out;
        }
      `}</style>

      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
          darkMode 
            ? 'bg-white/10 text-white hover:bg-white/20' 
            : 'bg-black/10 text-gray-800 hover:bg-black/20'
        }`}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Success Toast */}
      {showSuccess && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2
          transition-all duration-500 ease-out opacity-100 translate-y-0"
        >
          <Check className="w-5 h-5" />
          Account created successfully! Welcome aboard! 🎉
        </div>
      )}

      <div className="flex min-h-screen items-center justify-center p-8">
        <div
          className={`w-full max-w-2xl backdrop-blur-xl rounded-4xl shadow-3xl border transition-all duration-500 ease-out opacity-100 scale-100
            ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/80 border-white/50'}`}
        >
          <div className="grid md:grid-cols-2 p-10 gap-12">
            {/* Left Section (Header & Description) */}
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left p-6">
                <div
                    className="mx-auto md:mx-0 w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl
                    transition-all duration-600 ease-out opacity-100 translate-y-0 delay-200"
                >
                    <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h1 
                    className={`text-5xl font-extrabold mb-4 drop-shadow-lg 
                    transition-all duration-600 ease-out opacity-100 translate-y-0 delay-400
                    ${darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                    Join the Future
                </h1>
                <p 
                    className={`text-lg leading-relaxed 
                    transition-all duration-600 ease-out opacity-100 translate-y-0 delay-600
                    ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                    Create your free account in seconds and unlock a world of possibilities. It's time to build something amazing.
                </p>
            </div>

            {/* Right Section (Form) */}
            <div className="space-y-8">
              {/* Full Name */}
              <div
                className="transition-all duration-600 ease-out opacity-100 translate-x-0 delay-300"
              >
                <div className="relative">
                  <User className={`absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className={`w-full pl-14 pr-6 py-5 rounded-3xl text-lg border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/20 ${
                      errors.fullName
                        ? 'border-red-500 focus:border-red-600'
                        : darkMode
                        ? 'border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-green-400'
                        : 'border-gray-200 bg-white/70 focus:border-green-500'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p
                    className="text-red-500 text-sm mt-2 flex items-center gap-1
                    transition-all duration-300 ease-out opacity-100 translate-y-0"
                  >
                    <X className="w-4 h-4" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div
                className="transition-all duration-600 ease-out opacity-100 translate-x-0 delay-400"
              >
                <div className="relative">
                  <Mail className={`absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className={`w-full pl-14 pr-6 py-5 rounded-3xl text-lg border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/20 ${
                      errors.email
                        ? 'border-red-500 focus:border-red-600'
                        : darkMode
                        ? 'border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-green-400'
                        : 'border-gray-200 bg-white/70 focus:border-green-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p
                    className="text-red-500 text-sm mt-2 flex items-center gap-1
                    transition-all duration-300 ease-out opacity-100 translate-y-0"
                  >
                    <X className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div
                className="transition-all duration-600 ease-out opacity-100 translate-x-0 delay-500"
              >
                <div className="relative">
                  <Phone className={`absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className={`w-full pl-14 pr-6 py-5 rounded-3xl text-lg border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/20 ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-600'
                        : darkMode
                        ? 'border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-green-400'
                        : 'border-gray-200 bg-white/70 focus:border-green-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p
                    className="text-red-500 text-sm mt-2 flex items-center gap-1
                    transition-all duration-300 ease-out opacity-100 translate-y-0"
                  >
                    <X className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div
                className="transition-all duration-600 ease-out opacity-100 translate-x-0 delay-600"
              >
                <div className="relative">
                  <Lock className={`absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className={`w-full pl-14 pr-16 py-5 rounded-3xl text-lg border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/20 ${
                      errors.password
                        ? 'border-red-500 focus:border-red-600'
                        : darkMode
                        ? 'border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-green-400'
                        : 'border-gray-200 bg-white/70 focus:border-green-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-6 top-1/2 transform -translate-y-1/2 ${
                      darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div
                    className="mt-3 origin-left transition-all duration-300 ease-out opacity-100 scale-x-100"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Password Strength
                      </span>
                      <span className={`text-sm font-semibold ${
                        passwordStrength >= 75 ? 'text-green-500' : 
                        passwordStrength >= 50 ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className={`w-full h-2.5 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        style={{ width: `${passwordStrength}%` }}
                        className={`h-full rounded-full password-strength-bar ${getStrengthColor()}`}
                      />
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p
                    className="text-red-500 text-sm mt-2 flex items-center gap-1
                    transition-all duration-300 ease-out opacity-100 translate-y-0"
                  >
                    <X className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div
                className="transition-all duration-600 ease-out opacity-100 translate-x-0 delay-700"
              >
                <div className="relative">
                  <Lock className={`absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className={`w-full pl-14 pr-16 py-5 rounded-3xl text-lg border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/20 ${
                      errors.confirmPassword
                        ? 'border-red-500 focus:border-red-600'
                        : darkMode
                        ? 'border-white/20 bg-white/5 text-white placeholder-gray-400 focus:border-green-400'
                        : 'border-gray-200 bg-white/70 focus:border-green-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-6 top-1/2 transform -translate-y-1/2 ${
                      darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {showConfirmPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p
                    className="text-red-500 text-sm mt-2 flex items-center gap-1
                    transition-all duration-300 ease-out opacity-100 translate-y-0"
                  >
                    <X className="w-4 h-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 rounded-3xl font-bold text-xl transition-all duration-300 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl flex items-center justify-center gap-3
                transition-all duration-600 ease-out opacity-100 translate-y-0 delay-800"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Google Sign Up */}
              <button
                type="button"
                className={`w-full py-5 rounded-3xl font-semibold text-lg transition-all duration-300 border-2 flex items-center justify-center gap-4 shadow-sm hover:shadow-md
                transition-all duration-600 ease-out opacity-100 translate-y-0 delay-900
                ${
                  darkMode 
                    ? 'border-white/20 text-white hover:bg-white/5' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Login Link */}
              <div
                className="text-center mt-8 transition-all duration-600 ease-out opacity-100 delay-1000"
              >
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className="text-green-500 hover:text-green-600 font-bold transition-colors"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

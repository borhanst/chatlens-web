import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, MessageCircle, Check, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { validateEmail, validatePassword, validateUsername } from '../../utils/auth';
import GoogleAuthButton from './GoogleAuthButton';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear general error when user starts typing
    if (error) setError('');
    
    // Real-time validation
    if (name === 'password') {
      const validation = validatePassword(value);
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[a-z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
      
      setValidationErrors(prev => ({
        ...prev,
        password: value ? (!validation.isValid ? validation.message : '') : ''
      }));
    }

    if (name === 'username') {
      const validation = validateUsername(value);
      setValidationErrors(prev => ({
        ...prev,
        username: value ? (!validation.isValid ? validation.message : '') : ''
      }));
    }

    if (name === 'email') {
      setValidationErrors(prev => ({
        ...prev,
        email: value ? (!validateEmail(value) ? 'Please enter a valid email address' : '') : ''
      }));
    }

    if (name === 'confirmPassword') {
      setValidationErrors(prev => ({
        ...prev,
        confirmPassword: value ? (value !== formData.password ? 'Passwords do not match' : '') : ''
      }));
    }

    // Clear validation error when field is empty
    if (!value && type !== 'checkbox') {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Handle checkbox errors (for terms agreement)
    if (type === 'checkbox' && name === 'agreeToTerms') {
      setValidationErrors(prev => ({
        ...prev,
        agreeToTerms: checked ? '' : 'You must agree to the terms and conditions'
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    // Required fields
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.username.trim()) errors.username = 'Username is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';

    // Validation rules
    if (formData.username) {
      const usernameValidation = validateUsername(formData.username);
      if (!usernameValidation.isValid) errors.username = usernameValidation.message;
    }

    if (formData.email && !validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (formData.password) {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) errors.password = passwordValidation.message;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form submit");
    
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profile: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          is_active: true
        }
      });

      if (response.success) {
        // Redirect to dashboard or home page
        navigate('/dashboard');
      } else {
        setError(response.message);
      }
    } catch (err) {
      const error = err as { message: string; errors?: Record<string, string[]> };
      
      if (error.errors) {
        // Handle field-specific errors
        const newValidationErrors: { [key: string]: string } = {};
        
        Object.entries(error.errors).forEach(([field, messages]) => {
          if (field === 'profile.first_name') newValidationErrors.firstName = messages[0];
          else if (field === 'profile.last_name') newValidationErrors.lastName = messages[0];
          else if (field === 'profile.is_active') newValidationErrors.isActive = messages[0];
          else newValidationErrors[field] = messages[0];
        });
        
        setValidationErrors(newValidationErrors);
      }
      
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-electric-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-electric-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-poppins font-bold text-gray-800">ChatLens</span>
          </Link>
          
          <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-2">
            Create your account
          </h2>
          <p className="text-gray-600 font-inter">
            Start your free trial today - no credit card required
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-700 font-inter">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  First name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 font-inter transition-colors ${
                      validationErrors.firstName ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'
                    }`}
                    placeholder="John"
                  />
                </div>
                {validationErrors.firstName && (
                  <p className="mt-1 text-xs text-red-600 font-inter">{validationErrors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-3 border rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 font-inter transition-colors ${
                    validationErrors.lastName ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="Doe"
                />
                {validationErrors.lastName && (
                  <p className="mt-1 text-xs text-red-600 font-inter">{validationErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 font-inter transition-colors ${
                    validationErrors.username ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="johndoe"
                />
              </div>
              {validationErrors.username && (
                <p className="mt-1 text-xs text-red-600 font-inter">{validationErrors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 font-inter transition-colors ${
                    validationErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-xs text-red-600 font-inter">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 font-inter transition-colors ${
                    validationErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-inter text-gray-600">
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                </div>
              )}
              
              {validationErrors.password && (
                <p className="mt-1 text-xs text-red-600 font-inter">{validationErrors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 font-inter transition-colors ${
                    validationErrors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && !validationErrors.confirmPassword && (
                <div className="mt-2">
                  {formData.password === formData.confirmPassword ? (
                    <div className="flex items-center text-green-600">
                      <Check className="w-4 h-4 mr-1" />
                      <span className="text-xs font-inter">Passwords match</span>
                    </div>
                  ) : null}
                </div>
              )}
              
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 font-inter">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1 transition-colors"
                />
                <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-700 font-inter">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-500 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-500 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {validationErrors.agreeToTerms && (
                <p className="text-xs text-red-600 font-inter ml-7">{validationErrors.agreeToTerms}</p>
              )}

              <div className="flex items-start">
                <input
                  id="subscribeNewsletter"
                  name="subscribeNewsletter"
                  type="checkbox"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1 transition-colors"
                />
                <label htmlFor="subscribeNewsletter" className="ml-3 block text-sm text-gray-700 font-inter">
                  Send me product updates and marketing emails (optional)
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-inter font-semibold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-inter">Or continue with</span>
              </div>
            </div>

            {/* Google Auth Button */}
            <GoogleAuthButton />
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 font-inter">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500 font-inter">
            Protected by industry-standard encryption
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <span>✓ No credit card required</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 14-day free trial</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 lg:pt-18 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-electric-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-gray-900 leading-tight mb-6">
              Transform Your Website Into an{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-electric-500">
                Intelligent Assistant
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 font-inter leading-relaxed mb-8 max-w-2xl">
              ChatLens analyzes your website content to create a powerful AI chatbot that helps visitors find information and complete tasks - all without coding.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-inter font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-inter font-semibold transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-500 font-inter">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                No credit card required
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                5-minute setup
              </div>
            </div>
          </div>

          {/* Floating Illustration */}
          <div className="relative animate-slide-up">
            <div className="relative">
              {/* Main Chat Interface */}
              <div className="animate-float bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-electric-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">ChatLens Assistant</div>
                    <div className="text-xs text-green-500 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                      Online
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-2xl rounded-tl-md p-3 max-w-xs">
                    <p className="text-sm text-gray-700">Hi! How can I help you today?</p>
                  </div>
                  
                  <div className="bg-primary-500 text-white rounded-2xl rounded-tr-md p-3 max-w-xs ml-auto">
                    <p className="text-sm">What are your pricing plans?</p>
                  </div>
                  
                  <div className="bg-gray-100 rounded-2xl rounded-tl-md p-3 max-w-xs">
                    <p className="text-sm text-gray-700">We offer three plans: Free, Business ($29/mo), and Enterprise. Would you like details on any specific plan?</p>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex items-center space-x-2 mt-4 text-gray-400">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs">AI is typing...</span>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-electric-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs font-bold">24/7</span>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-xs font-bold">99%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
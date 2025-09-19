import React from 'react';
import { Brain, Globe, Palette, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'Smart Conversations',
      description: 'Advanced AI understands context and provides accurate, helpful responses based on your website content.',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Globe,
      title: 'Full Site Understanding',
      description: 'Automatically crawls and analyzes your entire website to provide comprehensive knowledge base.',
      color: 'from-electric-500 to-electric-600'
    },
    {
      icon: Palette,
      title: 'Custom Branding',
      description: 'Match your brand perfectly with customizable colors, fonts, and chat interface styling.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Task Automation',
      description: 'Handle bookings, lead generation, and support tickets automatically with intelligent workflows.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Powerful Features for Modern Websites
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto">
            Everything you need to create an intelligent, helpful assistant that understands your business and delights your customers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-poppins font-bold text-primary-500 mb-2">10k+</div>
            <div className="text-gray-600 font-inter">Websites Powered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-poppins font-bold text-electric-500 mb-2">1M+</div>
            <div className="text-gray-600 font-inter">Conversations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-poppins font-bold text-green-500 mb-2">99.9%</div>
            <div className="text-gray-600 font-inter">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-poppins font-bold text-orange-500 mb-2">24/7</div>
            <div className="text-gray-600 font-inter">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
import React from 'react';
import { Upload, Settings, Rocket } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Connect Your Website',
      description: 'Simply enter your website URL and ChatLens will automatically crawl and analyze all your content.',
      code: 'chatLens.connect("yoursite.com")',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Settings,
      title: 'Customize & Train',
      description: 'Configure your chatbot\'s personality, appearance, and responses to match your brand perfectly.',
      code: 'chatLens.customize({ theme: "brand" })',
      color: 'from-electric-500 to-electric-600'
    },
    {
      icon: Rocket,
      title: 'Launch & Monitor',
      description: 'Deploy your intelligent assistant instantly and track performance with detailed analytics.',
      code: 'chatLens.deploy({ analytics: true })',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto">
            No coding required. No technical setup. Get your AI-powered chatbot running in minutes, not hours.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isReverse = index % 2 === 1;
            
            return (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${isReverse ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Content */}
                <div className={`animate-fade-in ${isReverse ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mr-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-inter font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Step {index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-poppins font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 font-inter leading-relaxed mb-8">
                    {step.description}
                  </p>

                  {/* Code Example */}
                  <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <code className="text-green-400">{step.code}</code>
                  </div>
                </div>

                {/* Visual */}
                <div className={`animate-slide-up ${isReverse ? 'lg:col-start-1' : ''}`}>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border border-gray-100">
                      <div className="space-y-4">
                        {/* Mock Interface */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-poppins font-semibold text-gray-800">ChatLens Setup</span>
                          </div>
                          <div className="text-sm text-green-500 font-inter">● Connected</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${step.color} rounded-full transition-all duration-1000`}
                              style={{ width: `${(index + 1) * 33.33}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 font-inter">
                            Step {index + 1} of 3 complete
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="bg-white rounded-lg p-3 border border-gray-100">
                            <div className="text-xs text-gray-500 font-inter mb-1">Pages Analyzed</div>
                            <div className="text-lg font-poppins font-bold text-gray-800">{(index + 1) * 47}</div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-100">
                            <div className="text-xs text-gray-500 font-inter mb-1">Accuracy</div>
                            <div className="text-lg font-poppins font-bold text-green-500">{95 + index * 2}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo CTA */}
        <div className="text-center mt-16">
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-inter font-semibold transition-colors shadow-lg hover:shadow-xl">
            Try Interactive Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
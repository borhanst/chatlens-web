import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for trying out ChatLens',
      features: [
        { name: '100 conversations/month', included: true },
        { name: '1 website', included: true },
        { name: 'Basic customization', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom integrations', included: false },
        { name: 'Priority support', included: false }
      ],
      cta: 'Start Free',
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Business',
      price: { monthly: 29, annual: 24 },
      description: 'For growing businesses',
      features: [
        { name: '5,000 conversations/month', included: true },
        { name: '5 websites', included: true },
        { name: 'Full customization', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Basic integrations', included: true },
        { name: 'Priority support', included: false }
      ],
      cta: 'Start Business Trial',
      popular: true,
      color: 'border-primary-500'
    },
    {
      name: 'Enterprise',
      price: { monthly: 99, annual: 79 },
      description: 'For large organizations',
      features: [
        { name: 'Unlimited conversations', included: true },
        { name: 'Unlimited websites', included: true },
        { name: 'White-label solution', included: true },
        { name: 'Dedicated support', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Priority support', included: true }
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'border-gray-200'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. No hidden fees, no surprises. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`font-inter ${!isAnnual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isAnnual ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`font-inter ${isAnnual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Annual
            </span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border-2 ${plan.color} ${
                plan.popular ? 'shadow-xl scale-105' : 'shadow-sm hover:shadow-lg'
              } transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 font-inter mb-6">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-gray-500 font-inter ml-2">
                      /month
                    </span>
                  )}
                </div>
                {isAnnual && plan.price.monthly > 0 && (
                  <p className="text-sm text-green-600 font-inter">
                    Billed annually (${plan.price.annual * 12}/year)
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                    )}
                    <span className={`font-inter ${
                      feature.included ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-4 rounded-xl font-inter font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Note */}
        <div className="text-center mt-16">
          <p className="text-gray-600 font-inter">
            Have questions about our pricing? 
            <a href="#contact" className="text-primary-500 hover:text-primary-600 font-semibold ml-1">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
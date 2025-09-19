import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

const SocialProof = () => {
  const logos = [
    { name: 'TechCorp', logo: 'TC' },
    { name: 'StartupHub', logo: 'SH' },
    { name: 'Digital Agency', logo: 'DA' },
    { name: 'E-Commerce Plus', logo: 'EC' },
    { name: 'SaaS Solutions', logo: 'SS' },
    { name: 'Marketing Pro', logo: 'MP' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStartup',
      content: 'ChatLens transformed our customer support. We\'ve seen a 40% reduction in support tickets and 95% customer satisfaction.',
      rating: 5,
      company: 'TS'
    },
    {
      name: 'Mike Chen',
      role: 'Marketing Director, E-Store',
      content: 'Installation took 5 minutes and now our website converts 25% better. The AI understands our products perfectly.',
      rating: 5,
      company: 'ES'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Founder, Consulting Firm',
      content: 'Our clients love the instant responses. ChatLens has become an essential part of our customer experience.',
      rating: 5,
      company: 'CF'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Trusted By */}
        <div className="text-center mb-16">
          <p className="text-sm font-inter font-medium text-gray-500 uppercase tracking-wide mb-8">
            Trusted by 10,000+ websites worldwide
          </p>
          
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {logos.map((company, index) => (
              <div
                key={index}
                className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-lg font-poppins font-bold text-gray-700">
                  {company.logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 text-center mb-12">
            What Our Customers Say
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 font-inter leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-electric-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-poppins font-semibold text-sm">
                      {testimonial.company}
                    </span>
                  </div>
                  <div>
                    <div className="font-poppins font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 font-inter">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study CTA */}
        <div className="bg-gradient-to-r from-primary-500 to-electric-500 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-2xl lg:text-3xl font-poppins font-bold mb-4">
            See How Companies Like Yours Succeed
          </h3>
          <p className="text-lg font-inter opacity-90 mb-8 max-w-2xl mx-auto">
            Download our case studies and discover how ChatLens helped businesses increase conversions by up to 40%.
          </p>
          <button className="bg-white text-primary-500 px-8 py-4 rounded-xl font-inter font-semibold hover:bg-gray-50 transition-colors inline-flex items-center">
            View Case Studies
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
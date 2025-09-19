import React from 'react';
import { ArrowRight, Shield, Clock } from 'lucide-react';

const BottomCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-500 to-electric-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-poppins font-bold text-white mb-6">
            Ready to Transform Your Website?
          </h2>
          
          <p className="text-xl text-white/90 font-inter leading-relaxed mb-12 max-w-3xl mx-auto">
            Join thousands of businesses already using ChatLens to provide exceptional customer experiences. 
            Start your free trial today and see the difference AI can make.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
            <div className="flex items-center text-white/90">
              <Shield className="w-5 h-5 mr-2" />
              <span className="font-inter">No credit card required</span>
            </div>
            <div className="flex items-center text-white/90">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-inter">5-minute setup</span>
            </div>
            <div className="flex items-center text-white/90">
              <ArrowRight className="w-5 h-5 mr-2" />
              <span className="font-inter">Cancel anytime</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-white hover:bg-gray-50 text-primary-600 px-8 py-4 rounded-xl font-inter font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center">
              Start Your Free Trial Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="text-white hover:text-white/80 font-inter font-medium transition-colors border-b border-white/50 hover:border-white/80">
              Schedule a Demo Instead
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-white/70 font-inter mb-4">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {['TechCorp', 'StartupHub', 'Digital Agency', 'SaaS Pro'].map((company, index) => (
                <div key={index} className="text-white/80 font-poppins font-semibold text-lg">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCTA;
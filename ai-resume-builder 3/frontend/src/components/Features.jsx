import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Resume Generation',
      description: 'Leverage advanced AI to create professional resumes tailored to your experience and the job you\'re applying for.'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Generate complete resumes in seconds with our optimized AI algorithms and streamlined interface.'
    },
    {
      icon: '📄',
      title: 'PDF Export',
      description: 'Download your resume as a high-quality PDF with proper formatting and professional layout.'
    },
    {
      icon: '🎨',
      title: 'Modern Design',
      description: 'Choose from professionally designed templates that make your resume stand out from the competition.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Access and create resumes on any device - desktop, tablet, or mobile with our responsive interface.'
    },
    {
      icon: '💡',
      title: 'Smart Suggestions',
      description: 'Get AI-powered suggestions to improve your resume content and increase your chances of getting hired.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We never store your personal information or resume data.'
    },
    {
      icon: '🌟',
      title: 'ATS-Friendly',
      description: 'Our resumes are optimized for Applicant Tracking Systems, ensuring they pass automated screening.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Powerful Features
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes CV Genie the ultimate tool for creating professional resumes
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Ready to Create Your Perfect Resume?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with CV Genie
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
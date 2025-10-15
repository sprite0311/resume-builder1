import React from 'react';

const About = () => {
  const team = [
    {
      name: 'Sarthak Dubey',
      role: 'Full Stack Developer',
      description: 'Passionate about creating innovative web applications and AI-powered solutions.',
      skills: ['React', 'Node.js', 'Python', 'AI/ML']
    },
    {
      name: 'Harman Singh Jassal',
      role: 'Frontend Developer & UI/UX Designer',
      description: 'Specializes in crafting beautiful user interfaces and exceptional user experiences.',
      skills: ['React', 'Tailwind CSS', 'Figma', 'UI/UX']
    }
  ];

  const stats = [
    { number: '10K+', label: 'Resumes Created' },
    { number: '95%', label: 'User Satisfaction' },
    { number: '50+', label: 'Countries Served' },
    { number: '24/7', label: 'AI Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About CV Genie
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Revolutionizing resume creation with AI-powered technology and modern design
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            At CV Genie, we believe everyone deserves a chance to showcase their talents effectively.
            Our mission is to democratize professional resume creation by combining cutting-edge AI
            technology with intuitive design, making it easy for anyone to create compelling resumes
            that open doors to new opportunities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stat.number}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Our Story
          </h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 leading-relaxed mb-4">
                CV Genie was born from the frustration of creating resumes. As developers ourselves,
                we experienced firsthand how time-consuming and stressful the resume creation process
                could be. We saw an opportunity to use our skills in AI and web development to
                create a solution that would make professional resume creation accessible to everyone.
              </p>
              <p className="text-gray-300 leading-relaxed">
                What started as a side project has grown into a powerful platform that helps
                thousands of professionals worldwide present themselves in the best possible light.
                We're committed to continuous improvement and innovation to make CV Genie the
                go-to tool for resume creation.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-gray-400 italic">Innovation meets simplicity</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Meet Our Team
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">👨‍💻</div>
                <h4 className="text-2xl font-semibold mb-2 text-blue-400">{member.name}</h4>
                <p className="text-purple-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 mb-4">{member.description}</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Our Values
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-semibold mb-2 text-blue-400">Innovation</h4>
              <p className="text-gray-300">We constantly push the boundaries of what's possible with AI and technology.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-xl font-semibold mb-2 text-green-400">Accessibility</h4>
              <p className="text-gray-300">Making professional tools available to everyone, regardless of their background.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-semibold mb-2 text-purple-400">Privacy</h4>
              <p className="text-gray-300">Your data is yours. We prioritize security and never compromise on privacy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const form = useRef();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    await emailjs.sendForm('service_2h66nty', 'template_giar0ac', form.current, 'gOG_Q-TQbPoQLWmhe')
          .then((result) => {
            console.log(result.text);
            alert('Message sent successfully!');
          }, (error) => {
            console.log(error);
            alert('Failed to send message.');
          });
      
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      details: 'cvgenieinfo@gmail.com',
      description: 'Send us an email anytime'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Available 24/7',
      description: 'Chat with our support team'
    },
    {
      icon: '🐛',
      title: 'Bug Reports',
      details: 'GitHub Issues',
      description: 'Report bugs and issues'
    },
    {
      icon: '💡',
      title: 'Feature Requests',
      details: 'GitHub Discussions',
      description: 'Suggest new features'
    }
  ];

  const faqs = [
    {
      question: 'How does CV Genie work?',
      answer: 'CV Genie uses advanced AI algorithms to analyze your input and generate professional resumes tailored to your experience and the job you\'re applying for.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take privacy seriously. Your data is encrypted and never stored permanently. We only process it temporarily to generate your resume.'
    },
    {
      question: 'Can I edit my resume after generation?',
      answer: 'Absolutely! The resume preview is fully editable. You can make changes directly in the preview before downloading your PDF.'
    },
    {
      question: 'What formats are supported for download?',
      answer: 'Currently, we support PDF format for download. The PDFs are optimized for printing and ATS (Applicant Tracking Systems).'
    },
    {
      question: 'Is there a limit to how many resumes I can create?',
      answer: 'No, there are no limits! You can create as many resumes as you need for different job applications.'
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
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Have questions? Need support? We're here to help you create the perfect resume.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} ref={form} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Contact Information</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl">{info.icon}</div>
                    <div>
                      <h4 className="font-semibold text-white">{info.title}</h4>
                      <p className="text-blue-400">{info.details}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-green-400">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="bg-gray-800/50 rounded-lg p-4 border border-white/10">
                    <summary className="font-semibold text-white cursor-pointer hover:text-blue-400 transition-colors">
                      {faq.question}
                    </summary>
                    <p className="text-gray-300 mt-2 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6 text-purple-400">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-3xl hover:text-blue-400 transition-colors">🐦</a>
            <a href="#" className="text-3xl hover:text-blue-400 transition-colors">💼</a>
            <a href="#" className="text-3xl hover:text-purple-400 transition-colors">📘</a>
            <a href="#" className="text-3xl hover:text-pink-400 transition-colors">📷</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
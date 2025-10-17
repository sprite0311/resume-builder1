import React, { useState } from 'react'

function ExperienceModal({ isOpen, onClose, experiences, onUpdateExperiences }) {
  const [currentExperience, setCurrentExperience] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  const handleAddExperience = () => {
    if (currentExperience.company && currentExperience.role) {
      onUpdateExperiences([...experiences, currentExperience])
      setCurrentExperience({
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        description: ''
      })
    }
  }

  const handleRemoveExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index)
    onUpdateExperiences(updatedExperiences)
  }

  const handleChange = (e) => {
    setCurrentExperience({ ...currentExperience, [e.target.name]: e.target.value })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[rgba(11,17,32,0.9)] to-[rgba(15,23,42,0.9)] p-6 rounded-xl border border-white/20 text-white max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Work Experience</h3>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
              <input
                name="company"
                value={currentExperience.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
              <input
                name="role"
                value={currentExperience.role}
                onChange={handleChange}
                placeholder="Job Title"
                className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
              <input
                name="startDate"
                type="month"
                value={currentExperience.startDate}
                onChange={handleChange}
                className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
              <input
                name="endDate"
                type="month"
                value={currentExperience.endDate}
                onChange={handleChange}
                className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={currentExperience.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities and achievements"
              className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />
          </div>
          <button
            onClick={handleAddExperience}
            className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all"
          >
            Add Experience
          </button>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Added Experiences:</h4>
          {experiences.map((exp, index) => (
            <div key={index} className="p-3 border border-white/20 rounded-lg bg-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-semibold">{exp.role} at {exp.company}</h5>
                  <p className="text-sm text-gray-400">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveExperience(index)}
                  className="text-red-400 hover:text-red-300 ml-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Form({ onGenerate, loading }) {
  const [form, setForm] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    summary: '',
    education: '',
    experience: [],
    skills: '',
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleUpdateExperiences(newExperiences) {
    setForm({ ...form, experience: newExperiences })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Format experience data for backend compatibility
    const formattedForm = {
      ...form,
      experience: form.experience.length > 0
        ? form.experience.map(exp =>
            `${exp.role} at ${exp.company} (${exp.startDate} - ${exp.endDate}): ${exp.description}`
          ).join('\n\n')
        : ''
    }
    onGenerate(formattedForm)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 border border-white/20 rounded-xl bg-gradient-to-br from-[rgba(11,17,32,0.9)] to-[rgba(15,23,42,0.9)] text-white shadow-2xl backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Create Your Resume</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Professional Title</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Frontend Developer" className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="your.email@example.com" className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Professional Summary</label>
          <textarea name="summary" value={form.summary} onChange={handleChange} placeholder="Brief overview of your professional background and goals" className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-24 resize-none" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Education</label>
          <textarea name="education" value={form.education} onChange={handleChange} placeholder="List your educational background (one per line)" className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-28 resize-none" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Work Experience</label>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left"
          >
            {form.experience.length > 0 ? `${form.experience.length} experience(s) added` : 'Click to add work experience'}
          </button>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Skills</label>
          <input name="skills" value={form.skills} onChange={handleChange} placeholder="JavaScript, React, Node.js, etc. (comma separated)" className="w-full p-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
        </div>

        <button type="submit" disabled={loading} className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Resume...
            </div>
          ) : 'Generate Resume'}
        </button>
      </div>

      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        experiences={form.experience}
        onUpdateExperiences={handleUpdateExperiences}
      />
    </form>
  )
}

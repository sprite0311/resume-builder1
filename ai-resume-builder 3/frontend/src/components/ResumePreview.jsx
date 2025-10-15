import React from 'react'

export default function ResumePreview({ data }) {
  if (!data) {
    return (
      <div className="text-gray-500">Your generated resume will appear here after you click <strong>Generate Resume</strong>.</div>
    )
  }

  const { name, title, email, phone, summary, education, experience, skills, resumeText } = data

  return (
    <div className="max-w-full text-sm leading-relaxed text-black scroll-auto bg-white p-6 rounded-lg shadow-inner" contentEditable={true}>
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-black mb-1">{name}</h1>
          <div className="text-lg text-blue-400 font-medium">{title}</div>
        </div>
        <div className="text-right text-sm text-white mt-4 md:mt-0">
          <div className="flex items-center justify-end mb-1">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {email}
          </div>
          <div className="flex items-center justify-end">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {phone}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 mb-6"></div>

      {resumeText ? (
        <div className="whitespace-pre-wrap text-black leading-relaxed" contentEditable={true}>{resumeText}</div>
      ) : (
        <>
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Professional Summary
            </h3>
            <div className="text-black leading-relaxed pl-7">{summary}</div>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              Work Experience
            </h3>
            <div className="text-gray-200 leading-relaxed pl-7 whitespace-pre-wrap">{experience}</div>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              Education
            </h3>
            <div className="text-gray-200 leading-relaxed pl-7 whitespace-pre-wrap">{education}</div>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2 pl-7">
              {skills.split(',').map((skill, index) => (
                <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

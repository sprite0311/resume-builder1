import express, { response } from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const HF_API_URL = 'https://router.huggingface.co/v1/chat/completions'
const HF_KEY = process.env.HF_API_KEY

if (!HF_KEY) {
  console.warn('No HF_API_KEY found in environment. Set HF_API_KEY in .env')
}
app.get('/api/get', (req, res) => {
  console.log("Hello World")
})
app.post('/api/generate', async (req, res) => {
  const payload = req.body || {}

  const prompt = `Create a concise, professional resume formatted in plain text for the following candidate. Include a summary, experience bullets with measurable impact (if possible), education, and skills.\n\nCandidate details:\nName: ${payload.name || ''}\nTitle: ${payload.title || ''}\nEmail: ${payload.email || ''}\nPhone: ${payload.phone || ''}\nSummary: ${payload.summary || ''}\nEducation: ${payload.education || ''}\nExperience: ${payload.experience || ''}\nSkills: ${payload.skills || ''}\n\nadd no text other than the resume while do mention suggestions at the end with heading suggestions(heading in lowercase). Invent the nececssary job description according to job and provide a better summary urself. Use proff emojis and DONT ADD ASTERISK OR ANYTHING`
  async function query(data) {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  query({ 
      messages: [
          {
              role: "user",
              content: prompt,
          },
      ],
      model: "openai/gpt-oss-20b:fireworks-ai",
  }).then((response) => {
    const {choices}= response
      console.log(choices[0].message.content);
      let resumeText = choices[0].message.content
    let suggestions = ''
    const splitMarker = /suggestions?/i
    if (splitMarker.test(resumeText)) {
      const parts = resumeText.split(/(?=Suggestions?)/i)
      resumeText = parts[0].trim()
      suggestions = parts[1] ? parts[1].replace(/Suggestions?/i, '').trim() : ''
    }
    console.log(`suggetion: ${suggestions}` )
      res.json({ resumeText, suggestions})

  });

    
    }
)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))

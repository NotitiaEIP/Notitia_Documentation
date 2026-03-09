/**
 * Meduza AI Provider — Google Gemini 1.5 Flash (100% free)
 * 1500 req/day · 15 RPM · no credit card
 * https://aistudio.google.com/app/apikey
 */

const STORAGE_KEY = 'notitia_gemini_key'
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

export function loadApiKey() {
  return localStorage.getItem(STORAGE_KEY) || ''
}

export function saveApiKey(key) {
  if (key) localStorage.setItem(STORAGE_KEY, key.trim())
  else localStorage.removeItem(STORAGE_KEY)
}

export function hasApiKey() {
  return !!loadApiKey()
}

/**
 * Call Gemini with the question + relevant doc passages as context.
 * Returns the generated text or throws on error.
 */
export async function callGemini(question, passages) {
  const apiKey = loadApiKey()
  if (!apiKey) throw new Error('NO_KEY')

  // Build context from passages (max ~3000 chars to stay within limits)
  const context = passages
    .slice(0, 5)
    .map((p) => `### ${p.docTitle} — ${p.heading}\n${p.textPlain}`)
    .join('\n\n')
    .slice(0, 3000)

  const systemPrompt = `Tu es Meduza, l'assistante IA de la documentation Notitia.
Règles :
- Réponds UNIQUEMENT en te basant sur la documentation fournie.
- Réponds en français, de façon claire, structurée et naturelle.
- Si une information n'est pas dans la documentation, dis-le honnêtement.
- Utilise des listes et du gras pour structurer si pertinent.
- Sois concise (max 250 mots).

Documentation pertinente :
${context}`

  const body = {
    contents: [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'Compris, je vais répondre en me basant uniquement sur la documentation Notitia.' }] },
      { role: 'user', parts: [{ text: question }] },
    ],
    generationConfig: {
      temperature: 0.25,
      maxOutputTokens: 600,
      topP: 0.8,
    },
  }

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const msg = err?.error?.message || `HTTP ${res.status}`
    if (res.status === 400 && msg.includes('API_KEY')) throw new Error('INVALID_KEY')
    if (res.status === 429) throw new Error('RATE_LIMIT')
    throw new Error(msg)
  }

  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('EMPTY_RESPONSE')
  return text.trim()
}

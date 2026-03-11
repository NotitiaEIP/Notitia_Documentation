/**
 * Meduza AI Provider — Google Gemini 2.5 Flash Lite
 */

const GEMINI_API_KEY = import.meta.env.VITE_NOTITIA_API || ''
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'

export function hasApiKey() {
  return !!GEMINI_API_KEY
}

/**
 * Call Gemini with the question + relevant doc passages as context.
 * Returns the generated text or throws on error.
 */
export async function callGemini(question, passages) {
  const apiKey = GEMINI_API_KEY

  // Build context from top 3 passages only (max ~2500 chars)
  const context = passages
    .slice(0, 3)
    .map((p) => `[${p.docTitle} — ${p.heading}]\n${p.textPlain}`)
    .join('\n\n')
    .slice(0, 2500)

  const systemPrompt = `Tu es Meduza, l'assistante IA de la documentation Notitia.

RÈGLES ABSOLUES :
1. Réponds avec UN SEUL paragraphe de prose naturelle (3-5 phrases). Jamais de liste.
2. Synthétise l'information — ne recopie PAS le texte source.
3. N'inclus aucun lien, URL, chemin (/docs/...) ou référence de page.
4. Si la question est générale ("c'est quoi", "présente", "explique le projet"), décris le projet avec tes propres mots.
5. Réponds uniquement en français.
6. Maximum 150 mots.

Documentation :
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

import { useState, useRef, useEffect, useCallback } from 'react'
import { indexAllDocs, searchDocs, generateAnswer, getDocStats } from '../utils/docSearchEngine'
import { callGemini, hasApiKey } from '../utils/aiProvider'
import { HiTrash, HiX, HiPaperAirplane } from 'react-icons/hi'
import { HiMiniDocumentText, HiMiniCpuChip } from 'react-icons/hi2'
import './DocChatbot.css'

const WELCOME_MESSAGE = {
  role: 'assistant',
  text: "Salut ! 🪼 Je suis **Meduza**, la mascotte IA de Notitia.\n\nPose-moi une question sur la documentation et je chercherai la meilleure réponse pour toi.\n\nExemples : *\"Qu'est-ce que Notitia ?\"*, *\"Comment fonctionne la sécurité ?\"*, *\"C'est quoi le Notitia Node ?\"*",
  sources: [],
}

export default function DocChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [indexed, setIndexed] = useState(false)
  const [stats, setStats] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const [animDir, setAnimDir] = useState(null)

  // Index docs when chatbot opens (re-indexes to catch changes)
  useEffect(() => {
    if (open) {
      const count = indexAllDocs()
      setIndexed(true)
      setStats(getDocStats())
      if (!count) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: "⚠️ Je n'ai trouvé aucun document à indexer. Vérifiez que la documentation est bien chargée.",
            sources: [],
          },
        ])
      }
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Open/close with swimming mascot animation
  const handleToggle = useCallback(() => {
    if (!open && !animDir) {
      // Fly in: mascot swims from trigger to panel header
      setAnimDir('in')
      setTimeout(() => {
        setOpen(true)
        setAnimDir(null)
      }, 650)
    } else if (open && !animDir) {
      // Fly out: mascot swims back from panel to trigger
      setOpen(false)
      setAnimDir('out')
      setTimeout(() => {
        setAnimDir(null)
      }, 700)
    }
  }, [open, animDir])

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault()
      const query = input.trim()
      if (!query || isTyping) return

      const userMessage = { role: 'user', text: query, sources: [] }
      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setIsTyping(true)

      const results = searchDocs(query, 5)

      // Always use Gemini
      try {
        const aiText = await callGemini(query, results)
        const sources = [...new Map(results.map((r) => [r.slug, { slug: r.slug, title: r.docTitle }])).values()]
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: aiText, sources },
        ])
      } catch (err) {
        if (err.message === 'RATE_LIMIT') {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', text: '⏱️ Limite de requêtes atteinte. Réessaie dans une minute.', sources: [] },
          ])
        } else {
          // Fallback silently to TF-IDF
          const answer = generateAnswer(query, results)
          setMessages((prev) => [...prev, { role: 'assistant', text: answer.text, sources: answer.sources }])
        }
      }

      setIsTyping(false)
    },
    [input, isTyping],
  )

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleClear = () => {
    setMessages([WELCOME_MESSAGE])
    setInput('')
  }

  // Simple markdown-ish renderer for chat messages
  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      // Bold
      let html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic (not inside bold)
      html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
      // Inline code
      html = html.replace(/`(.+?)`/g, '<code>$1</code>')
      // Internal doc links → router-friendly (we use anchor with data attr, handled below)
      html = html.replace(
        /\[(.+?)\]\(\/docs\/([^)]+)\)/g,
        '<a href="/docs/$2" class="chat-link chat-doc-link">$1 →</a>',
      )
      // External links
      html = html.replace(
        /\[(.+?)\]\((https?:\/\/[^)]+)\)/g,
        '<a href="$2" class="chat-link" target="_blank" rel="noopener">$1</a>',
      )
      // Bullet points (• or - )
      if (/^[•\-]\s/.test(line)) {
        html = `<span class="chat-bullet">▸</span> ${html.replace(/^[•\-]\s/, '')}`
        return (
          <p key={i} className="chat-msg-line chat-bullet-line" dangerouslySetInnerHTML={{ __html: html }} />
        )
      }
      // Table rows from engine: **Key** : Value → styled row
      if (/^<strong>/.test(html) && html.includes(' : ')) {
        return (
          <p key={i} className="chat-msg-line chat-kv-line" dangerouslySetInnerHTML={{ __html: html }} />
        )
      }

      if (!html.trim()) return <br key={i} />
      return (
        <p key={i} className="chat-msg-line" dangerouslySetInnerHTML={{ __html: html }} />
      )
    })
  }

  return (
    <>
      {/* ── Flying mascot (swim animation) ── */}
      {animDir && (
        <div className={`flying-mascot ${animDir === 'in' ? 'fly-in' : 'fly-out'}`}>
          <img src="/jellyfish-mascot.gif" alt="" className="flying-mascot-img" />
          <span className="flying-trail" />
        </div>
      )}

      {/* ── Floating trigger button ── */}
      <button
        className={`chatbot-trigger ${open ? 'open' : ''} ${animDir === 'in' ? 'trigger-hidden' : ''}`}
        onClick={handleToggle}
        aria-label={open ? 'Fermer le chatbot' : 'Ouvrir le chatbot Meduza'}
      >
        {open ? (
          <HiX className="trigger-close-icon" />
        ) : (
          <img
            src="/jellyfish-mascot.gif"
            alt="Meduza"
            className="trigger-mascot"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        )}
        {!open && !animDir && <span className="trigger-pulse" />}
      </button>

      {/* ── Chat panel ── */}
      <div className={`chatbot-panel ${open ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <img
              src="/jellyfish-mascot.gif"
              alt="Meduza"
              className="chatbot-avatar"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <div>
              <h3>Meduza</h3>
              <span className="chatbot-status ai-on">
                <HiMiniCpuChip size={11} style={{ marginRight: 3, verticalAlign: 'middle' }} />
                Gemini AI · {stats?.totalDocs || 0} docs
              </span>
            </div>
          </div>
          <div className="chatbot-header-actions">
            <button onClick={handleClear} title="Effacer la conversation" className="icon-btn">
              <HiTrash size={17} />
            </button>
            <button onClick={handleToggle} title="Fermer" className="icon-btn close-btn">
              <HiX size={17} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="chat-avatar-col">
                  <img
                    src="/jellyfish-mascot.gif"
                    alt=""
                    className="chat-msg-avatar"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
              <div className="chat-bubble">
                <div className="chat-bubble-text">{renderText(msg.text)}</div>
                {msg.sources?.length > 0 && (
                  <div className="chat-sources">
                    {msg.sources.map((s) => (
                      <a
                        key={s.slug}
                        href={`/docs/${s.slug}`}
                        className="chat-source-tag"
                      >
                        <HiMiniDocumentText size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                        {s.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message assistant">
              <div className="chat-avatar-col">
                <img
                  src="/jellyfish-mascot.gif"
                  alt=""
                  className="chat-msg-avatar"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              <div className="chat-bubble typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="chatbot-input-area" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pose ta question…"
            disabled={isTyping}
          />
          <button type="submit" disabled={isTyping || !input.trim()}>
            <HiPaperAirplane size={18} style={{ transform: 'rotate(90deg)' }} />
          </button>
        </form>
      </div>
    </>
  )
}

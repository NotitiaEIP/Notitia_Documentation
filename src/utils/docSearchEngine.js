/**
 * Meduza — Documentation AI Assistant
 *
 * Indexes all markdown docs (static + custom), uses TF-IDF scoring,
 * then synthesizes natural French responses: parses tables, strips
 * markdown syntax, builds a coherent answer and adds "en savoir plus" links.
 */

import { loadCustomDocs } from './contentCustomization'

// ── Static doc imports ──
const markdownModules = import.meta.glob('../docs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// ── Stop words (FR + EN) ──
const STOP_WORDS = new Set([
  'le','la','les','un','une','des','du','de','et','en','est','que','qui',
  'dans','pour','par','sur','au','aux','avec','ce','cette','ces','il','elle',
  'on','nous','vous','ils','se','son','sa','ses','ne','pas','plus','ou',
  'mais','donc','car','ni','si','je','tu','mon','ma','mes','ton','ta','tes',
  'the','a','an','is','are','was','be','to','of','and','in','it','for','on',
  'with','as','at','by','this','that','from','or','not','also','but','can',
  'has','been','have','do','does','did','etre','avoir','fait','sont','ete',
  'tout','tres','bien','aussi','entre','dont','comme','leur','apres','meme',
  'cest','veut','veux','dire','savoir','parle','dites','moi','toi','lui',
  'eux','cela','ceci','voici','voila','cquoi','quoi','cest',
])

// ── General overview query detection ──
const OVERVIEW_ROOTS = [
  'projet','notitia','noticia','presentation','introduction','overview',
  'presentez','keskeske','keseke','appli','application',
]

function isOverviewQuery(tokens) {
  if (tokens.length === 0 || tokens.length > 3) return false
  // At least one token must fuzzy-match an overview root
  const hasOverviewWord = tokens.some((t) =>
    OVERVIEW_ROOTS.some((r) => r.startsWith(t) || t.startsWith(r) || levenClose(t, r)),
  )
  return hasOverviewWord
}

function levenClose(a, b) {
  if (Math.abs(a.length - b.length) > 2) return false
  let diff = 0
  const len = Math.max(a.length, b.length)
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) diff++
    if (diff > 2) return false
  }
  return true
}

// ── Code block detection: skip passages that are mostly code ──
function isCodePassage(p) {
  const codeLines = p.text.split('\n').filter((l) => /^[│├└┌─\s]*[|/\\{}()\[\]]/.test(l) || l.trim().startsWith('`'))
  return codeLines.length / Math.max(p.text.split('\n').length, 1) > 0.4
}

function tokenize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
}

function slugFromKey(key) {
  const match = key.match(/\/([^/]+)\.md$/)
  return match ? match[1] : key
}

function titleFromMarkdown(md) {
  const match = md.match(/^#\s+(.+)$/m)
  return match ? match[1].replace(/[*_`#]/g, '').trim() : null
}

// ── Passage extraction ──
function splitIntoPassages(markdown, slug, docTitle) {
  const lines = markdown.split('\n')
  const passages = []
  let currentHeading = docTitle || slug
  let currentLines = []

  const flush = () => {
    const text = currentLines.join('\n').trim()
    if (text.length > 20) {
      passages.push({
        slug,
        docTitle: docTitle || slug,
        heading: currentHeading,
        text,
        textPlain: text
          .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')  // images → alt text
          .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')    // links → link text only
          .replace(/[#*_`>|\\\-]/g, ' ')               // remaining markdown
          .replace(/https?:\/\/\S+/g, '')              // bare URLs
          .replace(/\/docs\/[\w-]+/g, '')              // internal paths
          .replace(/\s+/g, ' ')
          .trim(),
      })
    }
    currentLines = []
  }

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      flush()
      currentHeading = headingMatch[2].replace(/[*_`#]/g, '').trim()
    }
    currentLines.push(line)
  }
  flush()
  return passages
}

// ── TF-IDF scoring ──
function computeScore(queryTokens, passageText) {
  const passageTokens = tokenize(passageText)
  if (!passageTokens.length) return 0

  const passageTokenSet = new Set(passageTokens)
  const passageFreq = {}
  for (const t of passageTokens) passageFreq[t] = (passageFreq[t] || 0) + 1

  let score = 0
  const matchedTokens = new Set()

  for (const qt of queryTokens) {
    if (passageFreq[qt]) {
      score += passageFreq[qt] * 3
      matchedTokens.add(qt)
      continue
    }
    for (const pt of passageTokenSet) {
      if (pt.startsWith(qt) || qt.startsWith(pt)) {
        score += 1.5
        matchedTokens.add(qt)
        break
      }
    }
  }

  const coverage = matchedTokens.size / queryTokens.length
  score *= 1 + coverage
  score /= Math.log2(passageTokens.length + 2)
  return score
}

// ═══════════════════════════════════════════════════════
//  SYNTHESIS ENGINE — converts raw markdown to chat text
// ═══════════════════════════════════════════════════════

/**
 * Parse markdown table rows into string[][] (separators filtered out).
 * Strips bold/italic markers from cell content.
 */
function parseMarkdownTable(text) {
  const lines = text.split('\n').filter((l) => l.trim().startsWith('|'))
  const rows = []
  for (const line of lines) {
    if (/^\|[\s\-:|]+\|$/.test(line.trim())) continue // skip separator
    const cells = line
      .split('|')
      .map((c) => c.trim().replace(/\*\*/g, '').replace(/\*/g, '').replace(/`/g, ''))
      .filter((c) => c !== '')
    if (cells.length >= 1) rows.push(cells)
  }
  return rows
}

/**
 * Convert a markdown table block to readable chat lines.
 * 2-col tables → **Key** : Value  (skipping header row)
 * Other tables  → bullet rows
 */
function renderTable(text) {
  const rows = parseMarkdownTable(text)
  if (!rows || rows.length === 0) return ''

  if (rows[0].length === 2) {
    // Skip first row (column headers like "Composant | Détail")
    const data = rows.length > 1 ? rows.slice(1) : rows
    return data.map((r) => `**${r[0]}** : ${r[1]}`).join('\n')
  }

  // Multi-column: skip header, render as bullets
  const data = rows.length > 1 ? rows.slice(1) : rows
  return data.map((r) => `• ${r.join(' | ')}`).join('\n')
}

/**
 * Extract the first clean paragraph from raw markdown,
 * keeping **bold** and *italic* for the chat renderer.
 */
function extractFirstParagraph(rawText) {
  const lines = rawText.split('\n')
  const out = []
  let inTable = false

  for (const line of lines) {
    const t = line.trim()
    if (!t) { if (out.length) break; continue }
    if (/^#{1,6}\s/.test(t)) continue           // skip headings
    if (t.startsWith('|')) { inTable = true; continue } // skip tables
    if (inTable) { inTable = false; continue }

    // Keep bold/italic, strip inline code and links
    const clean = t
      .replace(/`(.+?)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

    out.push(clean)
  }
  return out.join(' ').trim()
}

/**
 * Convert a full passage to chat-friendly text:
 * - Tables → **Key** : Value lines
 * - Headings → dropped (used as section label externally)
 * - Bullets → •
 * - Bold/italic → kept as-is for chat renderer
 */
function passageToChat(rawText) {
  const lines = rawText.split('\n')
  const output = []
  let tableBuffer = []

  const flushTable = () => {
    if (tableBuffer.length === 0) return
    const rendered = renderTable(tableBuffer.join('\n'))
    if (rendered) output.push(rendered)
    tableBuffer = []
  }

  for (const line of lines) {
    const t = line.trim()

    if (/^#{1,6}\s/.test(t)) { flushTable(); continue }

    if (t.startsWith('|')) { tableBuffer.push(t); continue }

    if (tableBuffer.length > 0) flushTable()

    if (!t) { output.push(''); continue }

    const clean = t
      .replace(/^[-*+]\s+/, '• ')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

    output.push(clean)
  }
  flushTable()

  return output.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

// ── Navigation-section blacklist ──
const NAV_HEADINGS = new Set([
  'liens rapides', 'quick links', 'voir aussi', 'see also',
  'sommaire', 'table des matieres', 'navigation', 'menu',
  'gestion de projet', 'project management',
])

function isNavigationPassage(p) {
  const h = p.heading
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
  if (NAV_HEADINGS.has(h)) return true

  // If >60% of non-empty lines are bullet links ( - [...] or ▸ ... — )
  const lines = p.text.split('\n').filter((l) => l.trim())
  if (lines.length === 0) return false
  const navLines = lines.filter((l) =>
    /^[-*+]\s*\[/.test(l.trim()) ||
    /^[▸►•]\s*.+—/.test(l.trim()) ||
    /^-\s+.+\u2014/.test(l.trim())
  )
  return navLines.length / lines.length > 0.55
}

// ── Public API ──

let _passages = []

export function indexAllDocs() {
  const passages = []

  for (const [key, content] of Object.entries(markdownModules)) {
    const slug = slugFromKey(key)
    const title = titleFromMarkdown(content)
    passages.push(...splitIntoPassages(content, slug, title))
  }

  const customDocs = loadCustomDocs()
  for (const doc of customDocs) {
    const title = titleFromMarkdown(doc.content) || doc.title
    passages.push(...splitIntoPassages(doc.content, doc.slug, title))
  }

  _passages = passages
  return passages.length
}

export function searchDocs(query, maxResults = 5) {
  if (!_passages.length) indexAllDocs()

  const queryTokens = tokenize(query)
  if (!queryTokens.length) return []

  const overview = isOverviewQuery(queryTokens)

  return _passages
    .filter((p) => !isNavigationPassage(p) && !isCodePassage(p))
    .map((p) => {
      let score = overview
        ? (p.slug === 'introduction' ? 100 : 0)  // force introduction for generic queries
        : computeScore(queryTokens, p.textPlain)

      if (!overview) {
        // Boost passages whose doc title or heading directly matches query tokens
        const titleTokens = tokenize(p.docTitle + ' ' + p.heading)
        const titleMatches = queryTokens.filter((qt) =>
          titleTokens.some((tt) => tt === qt || tt.startsWith(qt) || qt.startsWith(tt)),
        ).length
        if (titleMatches > 0) score *= 1 + titleMatches * 0.4
      }
      return { ...p, score }
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
}

/**
 * generateAnswer — synthesizes a natural French response.
 *
 * Takes the top scoring passages (any doc), renders each section
 * with clean text + parsed tables, then adds an "En savoir plus" link.
 */
export function generateAnswer(query, results) {
  if (!results.length) {
    return {
      text: "Je n'ai rien trouvé sur ce sujet dans la documentation. Essaie de reformuler ou consulte directement les sections.",
      sources: [],
    }
  }

  // Only use passages from the single best-scoring document
  const bestSlug = results[0].slug
  const topPassages = results.filter((p) => p.slug === bestSlug).slice(0, 2)

  const sources = [{ slug: bestSlug, title: results[0].docTitle }]

  const parts = []
  const seenHeadings = new Set()

  for (const passage of topPassages) {
    const headingKey = passage.heading
    if (seenHeadings.has(headingKey)) continue
    seenHeadings.add(headingKey)

    let content = passageToChat(passage.text)
    if (!content || content.length < 15) content = passage.textPlain.slice(0, 400)
    if (!content || content.length < 10) continue

    parts.push(content)
  }

  if (parts.length === 0) {
    parts.push(results[0].textPlain.slice(0, 500))
  }

  return {
    text: parts.filter(Boolean).join('\n\n'),
    sources,
  }
}

export function getDocStats() {
  if (!_passages.length) indexAllDocs()
  const uniqueDocs = new Set(_passages.map((p) => p.slug))
  return { totalPassages: _passages.length, totalDocs: uniqueDocs.size }
}

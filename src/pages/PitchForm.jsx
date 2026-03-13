import { useState } from 'react'
import { Link } from 'react-router-dom'
import './PitchForm.css'

const initialState = {
  fullName: '',
  email: '',
  role: '',
  need: '',
  message: '',
  consent: true,
}

export default function PitchForm() {
  const [formData, setFormData] = useState(initialState)
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(false)
    setErrorMessage('')

    if (!endpoint) {
      setStatus('error')
      setErrorMessage('Formspree non configuré. Ajoutez VITE_FORMSPREE_ENDPOINT dans votre environnement.')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          role: formData.role,
          need: formData.need,
          message: formData.message,
          consent: formData.consent,
          _subject: 'Nouvelle demande de demo Notitia',
          source: 'pitch-form',
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Le serveur a retourné une erreur.')
      }

      setStatus('success')
      setSubmitted(true)
      setFormData(initialState)
    } catch {
      setStatus('error')
      setErrorMessage('Envoi impossible pour le moment. Réessayez dans quelques instants.')
    }
  }

  return (
    <section className="pitch-page">
      <div className="pitch-card">
        <span className="pitch-tag">Call to action</span>
        <h1>Réservez votre démo Notitia</h1>
        <p>
          Remplissez ce formulaire après le pitch. Nous vous recontactons rapidement pour une
          démonstration personnalisée de l&apos;enregistrement vocal, la transcription, les mindmaps et Meduza AI.
        </p>

        <form className="pitch-form" onSubmit={handleSubmit}>
          <label>
            Nom complet
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email professionnel
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Rôle
            <input
              name="role"
              type="text"
              placeholder="Ex: CTO, Product Manager, Étudiant..."
              value={formData.role}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Votre besoin principal
            <select name="need" value={formData.need} onChange={handleChange} required>
              <option value="">Sélectionnez une option</option>
              <option value="meetings">Capturer des réunions</option>
              <option value="education">Cours et révisions</option>
              <option value="research">Recherche et documentation</option>
              <option value="team">Partage d&apos;insights en équipe</option>
            </select>
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="4"
              placeholder="Contexte, volume d'usage, attentes..."
              value={formData.message}
              onChange={handleChange}
            />
          </label>

          <label className="consent-row">
            <input
              name="consent"
              type="checkbox"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <span>J&apos;accepte d&apos;être recontacté(e) au sujet de Notitia.</span>
          </label>

          <button type="submit" className="pitch-submit-btn" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Envoi...' : 'Envoyer ma demande'}
          </button>
        </form>

        {submitted && (
          <div className="pitch-success">
            Merci, votre demande est bien prise en compte. Nous revenons vers vous très vite.
          </div>
        )}

        {status === 'error' && (
          <div className="pitch-error">
            {errorMessage}
          </div>
        )}

        <Link to="/" className="pitch-back-link">Retour à l&apos;accueil</Link>
      </div>
    </section>
  )
}
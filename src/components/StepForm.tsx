import { useState, useRef } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import type { IdeaInput, IdeaOutput } from '../App'

interface Props {
  onSubmit: (input: IdeaInput, output: IdeaOutput) => void
  initialValues: IdeaInput | null
}

async function callInspira(input: IdeaInput): Promise<IdeaOutput> {
  const res = await fetch('/api/inspira', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export default function StepForm({ onSubmit, initialValues }: Props) {
  const [titulo, setTitulo] = useState(initialValues?.titulo ?? '')
  const [descricao, setDescricao] = useState(initialValues?.descricao ?? '')
  const [problema, setProblema] = useState(initialValues?.problema ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const canSubmit = titulo.trim().length > 0 && descricao.trim().length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || loading) return
    setError(null)
    setLoading(true)
    try {
      const input: IdeaInput = { titulo, descricao, problema }
      const output = await callInspira(input)
      onSubmit(input, output)
    } catch {
      setError('Erro ao conectar com o servidor. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 pt-6">
      {/* Hero text */}
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold leading-tight" style={{ color: '#0B2265' }}>
          Transforme sua ideia em um grande impacto
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Conte sua ideia e veja ela impactando no dia-a-dia da fábrica!
        </p>
      </div>

      {/* Campo: Titulo */}
      <div>
        <label className="field-label">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="field-input"
          placeholder="Ex: Nova forma de reaproveitar resíduos na fábrica"
          maxLength={100}
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          disabled={loading}
        />
        <p className="counter">{titulo.length}/100</p>
      </div>

      {/* Campo: Descricao */}
      <div>
        <label className="field-label">
          Descrição <span className="text-red-500">*</span>
        </label>
        <textarea
          className="field-input h-32"
          placeholder="Conte sua ideia aqui..."
          maxLength={1000}
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          disabled={loading}
        />
        <p className="counter">{descricao.length}/1000</p>
      </div>

      {/* Campo: Problema */}
      <div>
        <label className="field-label">
          Qual problema essa ideia resolve?
        </label>
        <textarea
          className="field-input h-24"
          placeholder="Ex: Demora no processo, alto consumo de energia..."
          maxLength={500}
          value={problema}
          onChange={e => setProblema(e.target.value)}
          disabled={loading}
        />
        <p className="counter">{problema.length}/500</p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>
      )}

      {/* Actions */}
      <div className="space-y-2 pt-1">
        <button type="submit" className="btn-primary" disabled={!canSubmit || loading}>
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Analisando com IA...</>
          ) : (
            <>Continuar <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
        <button type="button" className="btn-ghost">
          Salvar rascunho
        </button>
      </div>
    </form>
  )
}
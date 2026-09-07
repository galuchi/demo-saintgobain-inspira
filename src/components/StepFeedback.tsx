import { useState } from 'react'
import { ArrowRight, RotateCcw, Loader2 } from 'lucide-react'
import type { IdeaInput, IdeaOutput } from '../App'

interface Props {
  input: IdeaInput
  output: IdeaOutput
  onContinue: () => void
  onBack: () => void
  onRegenerate: (output: IdeaOutput) => void
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

export default function StepFeedback({ input, output, onContinue, onBack, onRegenerate }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRegenerate = async () => {
    setError(null)
    setLoading(true)
    try {
      const newOutput = await callInspira(input)
      onRegenerate(newOutput)
    } catch {
      setError('Erro ao regenerar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 pt-8 pb-10 px-2">
      {/* Hero text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold leading-tight">
          <span style={{ color: '#0B2265' }}>Vamos tornar sua ideia </span>
          <span className="text-blue-600">ainda melhor</span>
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Utilize nosso assistente para aprimorar sua ideia antes de submetê-la.
        </p>
      </div>

      {/* Card Inspira */}
      <div className="bg-[#F0F4FA] rounded-3xl p-5 space-y-4">

        {/* Header: "Assistente Inspira  [IA]" */}
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-slate-800 text-base">Assistente Inspira</span>
          {/* Badge IA: gradiente roxo, letra em italico */}
          <span
            className="text-white text-xs font-bold italic px-2.5 py-1 rounded-lg"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}
          >
            IA
          </span>
        </div>

        {/* Score — italico roxo com acento correto */}
        <p className="font-semibold italic text-sm" style={{ color: '#7C3AED' }}>
          Score de ader&#234;ncia: {output.score}/100
        </p>

        {/* Improved idea card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
          <h3 className="font-bold text-sm leading-snug" style={{ color: '#0B2265' }}>
            {output.improved_title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {output.improved_description}
          </p>
        </div>

        {/* Tips box */}
        {output.tips.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-2">
            <p className="text-blue-700 font-semibold text-sm">
              Como aumento meu score?
            </p>
            <ul className="space-y-1.5">
              {output.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-blue-500 mt-0.5 flex-shrink-0">&#8226;</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gerar outra versao — borda azul, texto azul */}
        <button
          onClick={handleRegenerate}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-white border-2 border-blue-500
                     text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-xl py-3 text-sm font-semibold
                     transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Gerando nova versão...</>
          ) : (
            <><RotateCcw className="w-4 h-4" /> Gerar outra versão</>
          )}
        </button>

        {error && (
          <p className="text-red-500 text-xs text-center">{error}</p>
        )}
      </div>

      {/* Footer actions */}
      <div className="space-y-1">
        <button onClick={onContinue} className="btn-primary">
          Continuar <ArrowRight className="w-5 h-5" />
        </button>
        <button onClick={onBack} className="btn-ghost">
          Salvar rascunho
        </button>
      </div>
    </div>
  )
}

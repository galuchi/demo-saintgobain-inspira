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
    <div className="space-y-6 pt-6 pb-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold leading-tight">
          <span style={{ color: '#0B2265' }}>Vamos tornar sua ideia </span>
          <span className="text-blue-600">ainda melhor</span>
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Utilize nosso assistente para aprimorar sua ideia antes de submete-la.
        </p>
      </div>

      {/* Card Inspira */}
      <div className="bg-[#F0F4FA] rounded-3xl p-5 space-y-4">

        {/* Header: "Assistente Inspira  [IA]" */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 text-base">Assistente Inspira</span>
          <span className="bg-[#6D28D9] text-white text-xs font-bold px-2 py-0.5 rounded-md">
            IA
          </span>
        </div>

        {/* Score — italic blue, no separate bar */}
        <p className="text-blue-600 font-medium italic text-sm">
          Score de aderencia: {output.score}/100
        </p>

        {/* Improved idea card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
          <h3 className="font-bold text-slate-900 text-sm leading-snug">
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
                  <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Regenerate button */}
        <button
          onClick={handleRegenerate}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200
                     text-slate-700 hover:bg-slate-50 active:bg-slate-100 rounded-xl py-3 text-sm font-medium
                     transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Gerando nova versao...</>
          ) : (
            <><RotateCcw className="w-4 h-4" /> Gerar outra versao</>
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

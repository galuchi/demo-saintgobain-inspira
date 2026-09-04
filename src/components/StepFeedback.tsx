import { useState } from 'react'
import { ArrowRight, RotateCcw, ChevronLeft, Loader2, Sparkles } from 'lucide-react'
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

function ScoreBar({ score }: { score: number }) {
  const color = score >= 75 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-slate-600">Score de aderência</span>
        <span className="text-sm font-bold text-blue-600">{score}/100</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
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
    <div className="space-y-5 pt-6">
      {/* Hero text */}
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold leading-tight" style={{ color: '#0B2265' }}>
          Vamos tornar sua ideia ainda melhor
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Utilize nosso assistente para aprimorar sua ideia antes de submetê-la.
        </p>
      </div>

      {/* Card Inspira */}
      <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 space-y-3">
        {/* Card header */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3" />
            IA
          </span>
          <span className="font-semibold text-slate-800 text-sm">Assistente Inspira</span>
        </div>

        {/* Score bar */}
        <ScoreBar score={output.score} />

        {/* Improved idea card */}
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
          <h3 className="font-semibold text-slate-900 text-sm leading-snug">
            {output.improved_title}
          </h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            {output.improved_description}
          </p>
        </div>

        {/* Tips card */}
        {output.tips.length > 0 && (
          <div className="bg-blue-100/50 border border-blue-200/60 rounded-xl p-3 space-y-2">
            <p className="text-xs font-bold text-blue-900 uppercase tracking-wide">
              Como aumento meu score?
            </p>
            <ul className="space-y-1.5">
              {output.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">
                    {i + 1}
                  </span>
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
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700
                     hover:bg-slate-50 active:bg-slate-100 rounded-xl py-2.5 text-sm font-medium
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
      <div className="space-y-2">
        <button onClick={onContinue} className="btn-primary">
          Continuar <ArrowRight className="w-4 h-4" />
        </button>
        <button onClick={onBack} className="btn-ghost flex items-center justify-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Voltar
        </button>
      </div>
    </div>
  )
}
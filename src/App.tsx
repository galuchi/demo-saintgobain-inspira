import { useState } from 'react'
import Header from './components/Header'
import StepForm from './components/StepForm'
import StepFeedback from './components/StepFeedback'

export interface IdeaInput {
  titulo: string
  descricao: string
  problema: string
}

export interface IdeaOutput {
  score: number
  improved_title: string
  improved_description: string
  tips: string[]
}

type Step = 'form' | 'feedback' | 'success'

export default function App() {
  const [step, setStep] = useState<Step>('form')
  const [ideaInput, setIdeaInput] = useState<IdeaInput | null>(null)
  const [ideaOutput, setIdeaOutput] = useState<IdeaOutput | null>(null)

  const handleFormSubmit = (input: IdeaInput, output: IdeaOutput) => {
    setIdeaInput(input)
    setIdeaOutput(output)
    setStep('feedback')
  }

  const handleSuccess = () => setStep('success')

  const handleBack = () => setStep('form')

  if (step === 'success') {
    return (
      <div className="bg-slate-100 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-sg-blue">Ideia enviada com sucesso!</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Sua proposta foi registrada e será analisada pela equipe de inovação da Saint-Gobain.
            Você receberá um retorno em breve.
          </p>
          <button
            onClick={() => { setStep('form'); setIdeaInput(null); setIdeaOutput(null) }}
            className="btn-primary mt-4"
          >
            Enviar nova ideia
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        <Header />
        <main className="flex-1 px-4 pb-6">
          {step === 'form' && (
            <StepForm onSubmit={handleFormSubmit} initialValues={ideaInput} />
          )}
          {step === 'feedback' && ideaOutput && ideaInput && (
            <StepFeedback
              input={ideaInput}
              output={ideaOutput}
              onContinue={handleSuccess}
              onBack={handleBack}
              onRegenerate={(newOutput) => setIdeaOutput(newOutput)}
            />
          )}
        </main>
      </div>
    </div>
  )
}

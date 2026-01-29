import React, { useState } from 'react';

interface StudentOnboardingProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function StudentOnboarding({ onComplete, onBack }: StudentOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cnhCategory: 'B' // B = Carro, A = Moto, AB = Ambos
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Simula um delay de cadastro e completa
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto min-h-[100dvh]">
      {/* Header simples */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-10">
        <button onClick={step === 1 ? onBack : () => setStep(step - 1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <span className="material-symbols-outlined text-gray-700">arrow_back</span>
        </button>
        <div className="text-lg font-bold text-gray-900">Cadastro de Aluno</div>
        <div className="w-10"></div> {/* Espaçador para centralizar título */}
      </header>

      <main className="flex-1 px-6 py-8 max-w-lg mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8 flex items-center gap-2">
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        </div>

        <form onSubmit={handleNext} className="space-y-6">
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Vamos começar!</h2>
                <p className="text-gray-500">Preencha seus dados para encontrar os melhores instrutores.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="Ex: João Silva"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="joao@exemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Celular (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">O que você quer aprender?</h2>
                <p className="text-gray-500">Personalize sua experiência de aprendizado.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => setFormData({...formData, cnhCategory: 'B'})}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.cnhCategory === 'B' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <div className="text-3xl mb-2">🚗</div>
                  <div className="font-bold text-gray-900">Carro (B)</div>
                  <div className="text-xs text-gray-500 mt-1">Aulas práticas de direção veicular</div>
                </div>

                <div 
                  onClick={() => setFormData({...formData, cnhCategory: 'A'})}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.cnhCategory === 'A' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <div className="text-3xl mb-2">🛵</div>
                  <div className="font-bold text-gray-900">Moto (A)</div>
                  <div className="text-xs text-gray-500 mt-1">Aulas práticas de pilotagem</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-6">
                <div className="flex items-start gap-3">
                  <input type="checkbox" required className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                  <label className="text-sm text-gray-600">
                    Li e concordo com os <a href="#" className="text-blue-600 font-medium">Termos de Uso</a> e <a href="#" className="text-blue-600 font-medium">Política de Privacidade</a> do DriveHub.
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-gray-900/20"
            >
              {step === 2 ? 'Finalizar Cadastro' : 'Continuar'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

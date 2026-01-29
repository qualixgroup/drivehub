import React, { useState } from 'react';

interface InstructorOnboardingProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function InstructorOnboarding({ onComplete, onBack }: InstructorOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    credenical: '',
    vehicleModel: '',
    vehicleYear: '',
    plate: ''
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col overflow-y-auto min-h-[100dvh]">
      <header className="px-6 py-4 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-10">
        <button onClick={step === 1 ? onBack : () => setStep(step - 1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <span className="material-symbols-outlined text-gray-700">arrow_back</span>
        </button>
        <div className="text-lg font-bold text-gray-900">Cadastro de Instrutor</div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-6 py-8 max-w-lg mx-auto w-full">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-3 h-3 rounded-full transition-colors ${step >= i ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          ))}
        </div>

        <form onSubmit={handleNext} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          
          {step === 1 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-green-600 text-3xl">person</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Seus Dados</h2>
                <p className="text-gray-500 text-sm mt-1">Para começarmos a parceria.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Nome completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 mt-1 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 mt-1 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Celular</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 mt-1 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-blue-600 text-3xl">directions_car</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Seu Veículo</h2>
                <p className="text-gray-500 text-sm mt-1">O carro que será usado nas aulas.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Modelo do Veículo</label>
                  <input
                    type="text"
                    required
                    value={formData.vehicleModel}
                    onChange={e => setFormData({...formData, vehicleModel: e.target.value})}
                    className="w-full px-4 py-3 mt-1 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                    placeholder="Ex: HB20, Onix, Gol"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Ano</label>
                    <input
                      type="number"
                      required
                      value={formData.vehicleYear}
                      onChange={e => setFormData({...formData, vehicleYear: e.target.value})}
                      className="w-full px-4 py-3 mt-1 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                      placeholder="2023"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Placa</label>
                    <input
                      type="text"
                      required
                      value={formData.plate}
                      onChange={e => setFormData({...formData, plate: e.target.value})}
                      className="w-full px-4 py-3 mt-1 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                      placeholder="ABC-1234"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
                  <span className="material-symbols-outlined text-lg">info</span>
                  <span>O veículo deve ter pedal duplo instalado.</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-purple-600 text-3xl">badge</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Credenciamento</h2>
                <p className="text-gray-500 text-sm mt-1">Validação profissional.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Número da Credencial (DETRAN)</label>
                  <input
                    type="text"
                    required
                    value={formData.credenical}
                    onChange={e => setFormData({...formData, credenical: e.target.value})}
                    className="w-full px-4 py-3 mt-1 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                    placeholder="00000000"
                  />
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-gray-400 text-4xl mb-2">upload_file</span>
                  <div className="text-sm font-medium text-gray-600">Toque para enviar foto da CNH</div>
                  <div className="text-xs text-gray-400 mt-1">JPG ou PDF (Max 5MB)</div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" required className="w-5 h-5 text-green-600 rounded focus:ring-green-500" />
                    <span className="text-sm text-gray-600">Declaro que minhas informações são verdadeiras e estou apto a ministrar aulas.</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition-all active:scale-[0.98] shadow-lg shadow-green-600/20"
            >
              {step === 3 ? 'Enviar Cadastro' : 'Continuar'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

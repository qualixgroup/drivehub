import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import Map from './components/Map';
import StudentOnboarding from './components/onboarding/StudentOnboarding';
import InstructorOnboarding from './components/onboarding/InstructorOnboarding';

// Error Boundary
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error("Erro:", error, errorInfo); }
  render() {
    if (this.state.hasError) return <div className="p-10 text-red-600">Erro: {this.state.error?.message}</div>;
    return this.props.children;
  }
}

// ============================================
// COMPONENTES DA LANDING PAGE
// ============================================

// Header
const Header = ({ onOpenApp }: { onOpenApp: (mode: 'student' | 'instructor') => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-gray-900">DriveHub</span>
          </div>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#como-funciona" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Como funciona</a>
            <a href="#para-alunos" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Para Alunos</a>
            <a href="#para-instrutores" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Para Instrutores</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">FAQ</a>
          </nav>

          {/* Buttons Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <button onClick={() => onOpenApp('instructor')} className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors">
              Seja Instrutor
            </button>
            <button onClick={() => onOpenApp('student')} className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
              Agendar Aula
            </button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            <span className="material-symbols-outlined text-gray-700">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              <a href="#como-funciona" className="text-gray-600 font-medium py-2">Como funciona</a>
              <a href="#para-alunos" className="text-gray-600 font-medium py-2">Para Alunos</a>
              <a href="#para-instrutores" className="text-gray-600 font-medium py-2">Para Instrutores</a>
              <a href="#faq" className="text-gray-600 font-medium py-2">FAQ</a>
              <div className="pt-3 space-y-2">
                <button onClick={() => onOpenApp('student')} className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg">Agendar Aula</button>
                <button onClick={() => onOpenApp('instructor')} className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg">Seja Instrutor</button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = ({ onOpenApp }: { onOpenApp: (mode: 'student' | 'instructor') => void }) => (
  <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-50 to-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Aprenda a dirigir com os <span className="text-blue-600">melhores instrutores</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Conectamos você aos instrutores de direção mais qualificados da sua região. Agende aulas práticas de forma rápida e segura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={() => onOpenApp('student')} className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-lg shadow-gray-900/20">
              Agendar minha aula
            </button>
            <button onClick={() => onOpenApp('instructor')} className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all">
              Quero ser instrutor
            </button>
          </div>
          <div className="flex items-center gap-6 pt-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-500 text-lg">verified</span>
              <span>Instrutores verificados</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-500 text-lg">shield</span>
              <span>Pagamento seguro</span>
            </div>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="relative flex justify-center">
          <div className="relative w-72 h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-gray-900/30">
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full z-10"></div>
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
              <div className="h-full bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-2xl">D</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">DriveHub</h3>
                <p className="text-gray-500 text-sm mb-6">Seu ecossistema de direção</p>
                <div className="space-y-3 w-full">
                  <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-600">school</span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 text-sm">Sou Aluno</div>
                        <div className="text-gray-500 text-xs">Agendar aula</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-600">directions_car</span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 text-sm">Sou Instrutor</div>
                        <div className="text-gray-500 text-xs">Dar aulas</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Como Funciona
const HowItWorksSection = () => (
  <section id="como-funciona" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Como funciona</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Agendar sua aula de direção nunca foi tão fácil. Em apenas 3 passos você está pronto para aprender.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: 'location_on', title: 'Escolha o local', desc: 'Selecione onde deseja fazer sua aula prática. Pode ser perto de casa ou do trabalho.' },
          { icon: 'person_search', title: 'Encontre um instrutor', desc: 'Veja os instrutores disponíveis, suas avaliações e preços. Escolha o melhor para você.' },
          { icon: 'event_available', title: 'Agende e aprenda', desc: 'Confirme sua aula e aguarde o instrutor chegar. Simples assim!' },
        ].map((step, idx) => (
          <div key={idx} className="relative p-8 bg-gray-50 rounded-3xl hover:bg-blue-50 transition-colors group">
            <div className="absolute -top-4 left-8 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">{idx + 1}</div>
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg transition-shadow">
              <span className="material-symbols-outlined text-blue-600 text-2xl">{step.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Para Alunos
const ForStudentsSection = ({ onOpenApp }: { onOpenApp: () => void }) => (
  <section id="para-alunos" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Para quem quer aprender a dirigir</h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Chega de burocracia. Com o DriveHub você encontra instrutores qualificados, agenda no horário que preferir e paga de forma segura.
          </p>
          <ul className="space-y-4">
            {['Instrutores com avaliações reais', 'Preços transparentes', 'Pagamento pelo app ou dinheiro', 'Acompanhe sua evolução'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-400">check_circle</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button onClick={onOpenApp} className="mt-4 px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
            Começar agora
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: '500+', label: 'Instrutores ativos' },
            { value: '10k+', label: 'Aulas realizadas' },
            { value: '4.9', label: 'Avaliação média' },
            { value: '98%', label: 'Aprovação DETRAN' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur p-6 rounded-2xl text-center">
              <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
              <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Para Instrutores
const ForInstructorsSection = ({ onOpenApp }: { onOpenApp: () => void }) => (
  <section id="para-instrutores" className="py-20 bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="bg-gradient-to-br from-green-500 to-green-700 p-8 rounded-3xl">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold">R$ 3.500+</div>
              <div className="text-green-200 mt-2">Ganho médio mensal</div>
            </div>
            <div className="space-y-3">
              {['Você define seus horários', 'Receba pagamentos semanais', 'Suporte dedicado', 'Seguro incluso'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                  <span className="material-symbols-outlined text-white">check</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ganhe dinheiro dando aulas</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Se você é instrutor de direção credenciado, junte-se à nossa plataforma e aumente sua renda. Conectamos você a alunos da sua região.
          </p>
          <button onClick={onOpenApp} className="px-8 py-4 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-400 transition-colors shadow-lg shadow-green-500/30">
            Cadastre-se como instrutor
          </button>
        </div>
      </div>
    </div>
  </section>
);

// FAQ
const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = [
    { q: 'Preciso ter cartão de crédito para usar?', a: 'Não! Você pode pagar em dinheiro diretamente ao instrutor ou usar Pix. O pagamento pelo app é opcional.' },
    { q: 'Como sei se o instrutor é confiável?', a: 'Todos os instrutores passam por verificação de documentos e credenciais do DETRAN. Além disso, você pode ver avaliações de outros alunos.' },
    { q: 'Posso cancelar uma aula agendada?', a: 'Sim, você pode cancelar até 2 horas antes do horário marcado sem custo. Cancelamentos tardios podem ter taxa.' },
    { q: 'O app funciona em qualquer cidade?', a: 'Estamos expandindo! Atualmente operamos nas principais capitais e regiões metropolitanas. Confira a disponibilidade no app.' },
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Perguntas frequentes</h2>
          <p className="text-gray-600">Tire suas dúvidas sobre o DriveHub</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-5 flex justify-between items-center text-left"
              >
                <span className="font-semibold text-gray-900">{faq.q}</span>
                <span className="material-symbols-outlined text-gray-400 transition-transform" style={{ transform: openIdx === idx ? 'rotate(180deg)' : '' }}>expand_more</span>
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold">DriveHub</span>
          </div>
          <p className="text-gray-400 text-sm">Conectando alunos e instrutores para uma experiência de aprendizado única.</p>
        </div>
        {[
          { title: 'Empresa', links: ['Sobre nós', 'Carreiras', 'Blog', 'Imprensa'] },
          { title: 'Suporte', links: ['Central de ajuda', 'Segurança', 'Termos de uso', 'Privacidade'] },
          { title: 'Contato', links: ['contato@drivehub.com', '(11) 99999-9999', 'São Paulo, SP'] },
        ].map((col, idx) => (
          <div key={idx}>
            <h4 className="font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link, i) => (
                <li key={i}><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">© 2026 DriveHub. Todos os direitos reservados.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
            <span className="text-sm">📱</span>
          </a>
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
            <span className="text-sm">💬</span>
          </a>
          <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
            <span className="text-sm">📷</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================
// COMPONENTES DO APP (Aluno/Instrutor)
// ============================================

const StudentView = ({ onBack }: { onBack: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'searching' | 'selecting' | 'confirmed'>('idle');
  const [selected, setSelected] = useState<number | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null);

  // Simula um destino quando confirma
  useEffect(() => {
    if (status === 'confirmed') {
        // Pega localização atual e adiciona offset para simular destino
        navigator.geolocation.getCurrentPosition(pos => {
            setDestination([
                pos.coords.latitude + 0.01, 
                pos.coords.longitude + 0.01
            ]);
        });
    } else {
        setDestination(null);
    }
  }, [status]);

  const instructors = [
    { id: 1, name: 'Instrutor Carlos', vehicle: 'Gol Branco', rating: 4.9, price: 'R$ 60,00', eta: '5 min', photo: '👨‍🏫' },
    { id: 2, name: 'Instrutora Ana', vehicle: 'Onix Prata', rating: 5.0, price: 'R$ 75,00', eta: '8 min', photo: '👩‍🏫' },
    { id: 3, name: 'Instrutor Pedro', vehicle: 'HB20 Preto', rating: 4.8, price: 'R$ 55,00', eta: '3 min', photo: '👨‍🏫' },
  ];

  return (
    <div className="fixed inset-0 w-full bg-gray-100" style={{ height: '100dvh' }}>
      <div className="absolute inset-0">
          <Map destination={destination} showInstructors={status !== 'confirmed'} />
      </div>
      <button onClick={onBack} className="absolute z-[1000] p-3 bg-white rounded-full shadow-lg hover:scale-105 transition-transform" style={{ top: 'max(16px, env(safe-area-inset-top, 16px))', left: '16px' }}>
          <span className="material-symbols-outlined text-gray-800">arrow_back</span>
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.2)] p-6 z-[1000]" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))' }}>
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5"></div>
        {status === 'idle' && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Para onde vamos treinar?</h2>
                <div className="bg-gray-100 p-4 rounded-2xl flex items-center space-x-3 border border-gray-200">
                    <span className="material-symbols-outlined text-gray-400">search</span>
                    <span className="text-gray-400">Buscar local...</span>
                </div>
                <button onClick={() => { setStatus('searching'); setTimeout(() => setStatus('selecting'), 2000); }} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-transform">
                    Encontrar Instrutor
                </button>
            </div>
        )}
        {status === 'searching' && (
            <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h3 className="text-lg font-medium text-gray-700">Buscando instrutores...</h3>
            </div>
        )}
        {status === 'selecting' && (
            <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-900">Instrutores Disponíveis</h3>
                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                    {instructors.map(i => (
                        <div key={i.id} onClick={() => setSelected(i.id)} className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${selected === i.id ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}>
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4 text-2xl shadow-md">{i.photo}</div>
                            <div className="flex-1">
                                <div className="flex justify-between font-bold text-gray-900"><span>{i.name}</span><span className="text-blue-600">{i.price}</span></div>
                                <div className="text-sm text-gray-500 mt-1">{i.vehicle} • ⭐ {i.rating} • {i.eta}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <button disabled={!selected} onClick={() => setStatus('confirmed')} className={`w-full py-4 rounded-2xl font-bold transition-all ${selected ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gray-200 text-gray-400'}`}>
                    Chamar Instrutor
                </button>
            </div>
        )}
        {status === 'confirmed' && (
            <div className="text-center py-6">
                <div className="flex items-center justify-between mb-6 bg-blue-50 p-4 rounded-2xl">
                    <div className="text-left">
                        <div className="text-xs text-gray-500 font-bold uppercase">Destino</div>
                        <div className="font-bold text-gray-900">Rua Exemplo, 123</div>
                    </div>
                    <div className="text-right">
                         <div className="text-xs text-gray-500 font-bold uppercase">Tempo</div>
                        <div className="font-bold text-blue-600">15 min</div>
                    </div>
                </div>
                
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-4xl text-green-600">check_circle</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Instrutor a caminho!</h2>
                <p className="text-gray-500 mb-6">Aguarde no local de embarque.</p>
                <button onClick={() => { setStatus('idle'); setSelected(null); }} className="text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">Cancelar corrida</button>
            </div>
        )}
      </div>
    </div>
  );
};

const InstructorView = ({ onBack }: { onBack: () => void }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [incomingRequest, setIncomingRequest] = useState<any>(null);
  const [accepted, setAccepted] = useState(false);
  const [destination, setDestination] = useState<[number, number] | null>(null);

  useEffect(() => {
    let timeout: any;
    if (isOnline && !incomingRequest && !accepted) {
        timeout = setTimeout(() => {
            setIncomingRequest({ student: 'Mariana Silva', rating: 4.8, distance: '2.5 km', earnings: 'R$ 45,00', location: 'Rua das Flores, 123' });
        }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isOnline, incomingRequest, accepted]);

  const handleAccept = () => { 
      setAccepted(true); 
      setIncomingRequest(null);
      // Simula destino (aluno) próximo ao instrutor
      navigator.geolocation.getCurrentPosition(pos => {
          setDestination([
              pos.coords.latitude + 0.008, 
              pos.coords.longitude - 0.008
          ]);
      });
  };
  
  const handleFinish = () => { 
      setAccepted(false); 
      setIsOnline(false); 
      setDestination(null);
  };

  const openNavigation = () => {
    if (!destination) return;
    // Abre Google Maps com a rota
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination[0]},${destination[1]}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 w-full flex flex-col bg-gray-900" style={{ height: '100dvh' }}>
      <div className="absolute w-full z-[1000] flex justify-between items-start pointer-events-none" style={{ top: 'max(16px, env(safe-area-inset-top, 16px))', left: 0, right: 0, padding: '0 16px' }}>
        <button onClick={onBack} className="p-3 bg-white rounded-full shadow-lg pointer-events-auto hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-gray-800">arrow_back</span>
        </button>
        <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl text-white text-center pointer-events-auto min-w-[150px] shadow-xl">
            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ganhos do dia</div>
            <div className="text-2xl font-bold text-green-400">R$ 120,00</div>
        </div>
      </div>
      <div className={`flex-1 relative transition-all duration-300 ${incomingRequest ? 'opacity-60' : 'opacity-100'}`}>
          <Map destination={destination} showInstructors={false} />
      </div>
      {!incomingRequest && !accepted && (
          <div className="absolute left-0 w-full flex flex-col items-center z-[1000] space-y-4" style={{ bottom: 'max(40px, calc(env(safe-area-inset-bottom, 40px) + 20px))' }}>
            {isOnline && <span className="bg-black/80 backdrop-blur text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">🔍 Procurando alunos...</span>}
            <button onClick={() => setIsOnline(!isOnline)} className={`w-28 h-28 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-2xl font-bold transition-all hover:scale-105 ${isOnline ? 'bg-red-500' : 'bg-gradient-to-br from-blue-500 to-blue-700'} text-white`}>
                {isOnline ? 'PARAR' : 'GO'}
            </button>
          </div>
      )}
      {accepted && (
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-gray-900 via-gray-900 to-transparent p-6 z-[2000]" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))' }}>
            <div className="bg-green-600 rounded-2xl p-6 text-white shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl">🎓</div>
                        <div><h3 className="font-bold text-xl">Mariana Silva</h3><p className="text-green-200">Rua das Flores, 123</p></div>
                    </div>
                    <div className="text-right"><div className="text-2xl font-bold">R$ 45,00</div><div className="text-green-200 text-sm">2.5 km</div></div>
                </div>
                
                <div className="flex space-x-3">
                  <button onClick={openNavigation} className="flex-1 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors border border-white/20">
                    <span className="material-symbols-outlined">navigation</span>
                    Navegar (GPS)
                  </button>
                  <button onClick={handleFinish} className="flex-1 py-3 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg">
                    ✓ Finalizar
                  </button>
                </div>
            </div>
        </div>
      )}
      {incomingRequest && (
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-gray-900 via-gray-900 to-transparent p-6 z-[2000]" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))' }}>
          <div className="bg-gray-800 rounded-3xl p-6 border-2 border-green-500 shadow-2xl shadow-green-500/20">
            <div className="flex justify-between items-start mb-6">
                <div><h2 className="text-4xl font-bold text-green-400">{incomingRequest.earnings}</h2><span className="text-gray-400 text-sm">Aula de 50 min</span></div>
                <div className="text-right"><div className="text-2xl font-bold text-white">{incomingRequest.distance}</div><span className="text-gray-400 text-sm">Distância</span></div>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-2xl mb-6 flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl shadow-lg">🎓</div>
                <div><h3 className="font-bold text-lg text-white">{incomingRequest.student}</h3><span className="text-yellow-400 text-sm font-medium">⭐ {incomingRequest.rating}</span></div>
            </div>
            <div className="flex space-x-4">
                <button onClick={() => setIncomingRequest(null)} className="flex-1 py-4 bg-gray-700 rounded-xl font-bold text-gray-300 hover:bg-gray-600 transition-colors">Recusar</button>
                <button onClick={handleAccept} className="flex-[2] py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-bold text-white hover:from-green-400 hover:to-green-500 shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02]">Aceitar Corrida</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// APP PRINCIPAL
// ============================================

const App = () => {
  const [view, setView] = useState<'landing' | 'student-onboarding' | 'student' | 'instructor-onboarding' | 'instructor'>('landing');

  const handleOpenApp = (mode: 'student' | 'instructor') => {
    if (mode === 'student') setView('student-onboarding');
    if (mode === 'instructor') setView('instructor-onboarding');
  };

  if (view === 'student-onboarding') return <ErrorBoundary><StudentOnboarding onComplete={() => setView('student')} onBack={() => setView('landing')} /></ErrorBoundary>;
  if (view === 'student') return <ErrorBoundary><StudentView onBack={() => setView('landing')} /></ErrorBoundary>;
  
  if (view === 'instructor-onboarding') return <ErrorBoundary><InstructorOnboarding onComplete={() => setView('instructor')} onBack={() => setView('landing')} /></ErrorBoundary>;
  if (view === 'instructor') return <ErrorBoundary><InstructorView onBack={() => setView('landing')} /></ErrorBoundary>;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white overflow-x-hidden overflow-y-auto" style={{ minHeight: '100dvh' }}>
        <Header onOpenApp={handleOpenApp} />
        <main>
          <HeroSection onOpenApp={handleOpenApp} />
          <HowItWorksSection />
          <ForStudentsSection onOpenApp={() => handleOpenApp('student')} />
          <ForInstructorsSection onOpenApp={() => handleOpenApp('instructor')} />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;

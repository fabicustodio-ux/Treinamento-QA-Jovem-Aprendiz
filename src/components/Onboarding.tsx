import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  LayoutDashboard, 
  FileText, 
  TestTube2, 
  Bug as BugIcon, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Step {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  content: React.ReactNode;
}

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      id: 'shift_left',
      title: 'Shift Left Testing',
      subtitle: 'Qualidade desde o início',
      description: 'O conceito fundamental deste treinamento.',
      icon: Lightbulb,
      color: 'bg-amber-500',
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 italic text-amber-900 border-l-8 border-l-amber-500">
            "Shift Left é a prática de mover os testes para o início (esquerda) do ciclo de desenvolvimento de software."
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Por que usamos?
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Detectar erros antes que se tornem caros.</li>
                <li>• Melhorar o entendimento dos requisitos.</li>
                <li>• Reduzir o retrabalho dos desenvolvedores.</li>
                <li>• Entregar software com mais confiança.</li>
              </ul>
            </div>
            <div className="relative h-40 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-200">
               <div className="flex items-center gap-1 font-black text-[10px] tracking-tighter uppercase text-slate-400">
                  <div className="flex flex-col items-center gap-1 opacity-20">
                     <div className="w-8 h-8 rounded bg-slate-300" />
                     REQUISITOS
                  </div>
                  <ArrowRight className="w-4 h-4" />
                  <div className="flex flex-col items-center gap-1 opacity-20">
                     <div className="w-8 h-8 rounded bg-slate-300" />
                     DESENHO
                  </div>
                  <ArrowRight className="w-4 h-4" />
                  <div className="flex flex-col items-center gap-1">
                     <div className="w-12 h-12 rounded bg-blue-500 animate-pulse flex items-center justify-center text-white">QA</div>
                     TESTES (SHIFT LEFT)
                  </div>
                  <ArrowRight className="w-4 h-4" />
                  <div className="flex flex-col items-center gap-1 opacity-20">
                     <div className="w-8 h-8 rounded bg-slate-300" />
                     PRODUÇÃO
                  </div>
               </div>
               <div className="absolute top-2 left-2 text-[8px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-black">INÍCIO DO CICLO</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dashboard',
      title: 'Dashboard de Métricas',
      subtitle: 'Controle sua performance',
      description: 'Onde você vê seu progresso real no projeto.',
      icon: LayoutDashboard,
      color: 'bg-blue-500',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <p className="text-slate-600 leading-relaxed">
                Aqui você acompanha em tempo real quantos cenários estão em sucesso, falha ou pendentes.
             </p>
             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-2">
                <p className="text-xs font-bold text-blue-800">Dica de Mentor:</p>
                <p className="text-xs text-blue-700">Métricas saudáveis mostram que o QA está atuando em ambos os ambientes (QA e HOMO).</p>
             </div>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 shadow-2xl overflow-hidden aspect-video relative border border-slate-700">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
             <div className="relative z-10 space-y-3">
                <div className="h-2 w-24 bg-slate-700 rounded-full" />
                <div className="grid grid-cols-3 gap-2">
                   <div className="h-12 bg-slate-800 rounded-lg border border-slate-700 flex flex-col items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                   </div>
                   <div className="h-12 bg-slate-800 rounded-lg border border-slate-700 flex flex-col items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                   </div>
                   <div className="h-12 bg-slate-800 rounded-lg border border-slate-700 flex flex-col items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                   </div>
                </div>
                <div className="h-24 bg-slate-800/50 rounded-lg border border-slate-700" />
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'gherkin',
      title: 'Cenários (Gherkin)',
      subtitle: 'Planejamento e Escrita',
      description: 'A base da sua estratégia de testes.',
      icon: FileText,
      color: 'bg-purple-500',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed">
             O Gherkin é a linguagem que usamos para descrever comportamentos. Você deve escrever cenários 
             <span className="font-bold text-purple-600"> Positivos</span> (sucesso), 
             <span className="font-bold text-red-600"> Negativos</span> (erros tratados) e 
             <span className="font-bold text-blue-600"> Regressivos</span>.
          </p>
          <div className="bg-slate-900 p-4 rounded-xl font-mono text-[11px] text-blue-300 leading-relaxed border border-slate-800">
             <span className="text-pink-400">Dado</span> que estou na tela de login<br/>
             <span className="text-pink-400">Quando</span> informo "usuario@teste.com"<br/>
             <span className="text-pink-400">E</span> informo a senha correta<br/>
             <span className="text-pink-400">Então</span> devo acessar a home do sistema
          </div>
        </div>
      )
    },
    {
      id: 'testing',
      title: 'Ambiente de Testes',
      subtitle: 'Mão na massa!',
      description: 'Onde a mágica (e os bugs) acontecem.',
      icon: TestTube2,
      color: 'bg-red-500',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <div className="group flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100 hover:scale-105 transition-transform">
                <div className="bg-amber-500 p-2 rounded-lg text-white shadow-lg"><BugIcon className="w-4 h-4" /></div>
                <div>
                   <p className="text-xs font-black text-amber-800">AMBIENTE QA</p>
                   <p className="text-[10px] text-amber-700">Contém bugs propositais para você caçar.</p>
                </div>
             </div>
             <div className="group flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100 hover:scale-105 transition-transform">
                <div className="bg-green-500 p-2 rounded-lg text-white shadow-lg"><ShieldCheck className="w-4 h-4" /></div>
                <div>
                   <p className="text-xs font-black text-green-800">AMBIENTE HOMO</p>
                   <p className="text-[10px] text-green-700">Onde tudo deve funcionar perfeitamente.</p>
                </div>
             </div>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50" />
             <div className="relative z-10 flex gap-1">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-16 bg-blue-500/20 border border-blue-500/50 rounded-t-full rounded-b-lg flex items-center justify-center"
                >
                   <div className="w-8 h-8 rounded-full bg-blue-400/30 animate-pulse" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="w-10 h-14 bg-purple-500/20 border border-purple-500/50 rounded-t-full rounded-b-lg flex items-center justify-center mt-2"
                >
                   <div className="w-6 h-6 rounded-full bg-purple-400/30 animate-pulse" />
                </motion.div>
             </div>
             <p className="text-[8px] font-black text-slate-500 mt-4 tracking-widest uppercase">Simulador de Execução</p>
          </div>
        </div>
      )
    },
    {
      id: 'bugs',
      title: 'Bug Tracker',
      subtitle: 'Gestão de Defeitos',
      description: 'Evidencie e acompanhe a resolução.',
      icon: BugIcon,
      color: 'bg-orange-500',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 leading-relaxed">
             Ao encontrar um erro, registre-o no Bug Tracker. Detalhe o que aconteceu e classifique se é 
             um erro de <b>Desenvolvimento</b>, <b>Ambiente</b>, <b>Massa</b> ou <b>Documentação</b>.
          </p>
          <div className="flex gap-2 flex-wrap">
             {['Aberto', 'Corrigido', 'Em Validação', 'Fechado'].map(st => (
                <span key={st} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{st}</span>
             ))}
          </div>
        </div>
      )
    },
    {
      id: 'delivery',
      title: 'Entrega Final',
      subtitle: 'Missão Cumprida',
      description: 'Garantindo a qualidade total.',
      icon: ShieldCheck,
      color: 'bg-green-500',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-green-50 p-6 rounded-2xl border border-green-100">
             <div className="bg-green-500 p-4 rounded-xl text-white shadow-lg"><Award className="w-8 h-8" /></div>
             <div>
                <h4 className="font-bold text-green-900">Gerar seu Certificado</h4>
                <p className="text-sm text-green-700">Após completar todos os cenários e fechar todos os bugs, você estará pronto para o certificado.</p>
             </div>
          </div>
          <div className="text-center py-4">
             <p className="text-xs text-slate-400 italic font-medium">"Qualidade é o seu compromisso."</p>
          </div>
        </div>
      )
    }
  ];

  const next = () => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
  const prev = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const activeStep = steps[currentStep];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100 flex flex-col md:flex-row h-full min-h-[600px]">
        {/* Sidebar Nav */}
        <div className="w-full md:w-72 bg-slate-50 p-8 flex flex-col border-r border-slate-100">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2">Guia do<br/>Aprendiz</h2>
            <div className="h-1 w-12 bg-blue-600 rounded-full mx-auto md:mx-0" />
          </div>
          
          <div className="flex-1 space-y-4">
            {steps.map((step, idx) => (
              <button 
                key={step.id}
                onClick={() => setCurrentStep(idx)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left group",
                  currentStep === idx ? "bg-white shadow-xl shadow-slate-200 border border-slate-100" : "hover:bg-slate-200/50"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-transform group-hover:scale-110",
                  currentStep === idx ? step.color + " text-white shadow-lg" : "bg-slate-200 text-slate-500"
                )}>
                  <step.icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-xs font-black truncate uppercase tracking-widest", currentStep === idx ? "text-slate-900" : "text-slate-400")}>
                    {step.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
             Passo {currentStep + 1} de {steps.length}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-12 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStep.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className={cn("px-4 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em]", activeStep.color)}>
                    {activeStep.subtitle}
                  </span>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">{activeStep.title}</h1>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">{activeStep.description}</p>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  {activeStep.content}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
            <button 
              onClick={prev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-0 transition-all"
            >
              <ChevronLeft /> Anterior
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button 
                onClick={next}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
              >
                Continuar <ChevronRight />
              </button>
            ) : (
              <div className="flex items-center gap-2 text-green-600 font-black uppercase text-xs tracking-widest animate-bounce">
                Pronto para começar! <Target className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

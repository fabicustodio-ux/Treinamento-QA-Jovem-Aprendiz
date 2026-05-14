import React from 'react';
import { 
  Compass, 
  Map, 
  CheckSquare, 
  Target, 
  ArrowRightCircle,
  Users,
  ShieldCheck,
  ClipboardCheck,
  FileText,
  Bug as BugIcon,
  TestTubes
} from 'lucide-react';
import { cn } from '../lib/utils';

export function Orientation() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Bem-vindo ao Studio de QA!</h2>
          <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
            Este é o seu ambiente de treinamento prático. Aqui você aprenderá a cultura do 
            <span className="font-bold text-white"> Shift Left Testing</span>, atuando desde o 
            entendimento do requisito até a entrega final.
          </p>
        </div>
        <Compass className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-blue-500/30 -rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-blue-600 font-bold text-lg">
            <Target className="w-6 h-6" />
            Objetivo do Treinamento
          </div>
          <p className="text-slate-600 leading-relaxed">
            Formar profissionais com visão crítica e domínio técnico de QA, capacitando-os a realizar 
            o ciclo completo de testes em um cenário real simulado.
          </p>
          <ul className="space-y-2 text-sm text-slate-500">
            <li className="flex gap-2">
              <CheckSquare className="w-4 h-4 text-green-500 shrink-0" />
              <span>Entender processos de Shift Left</span>
            </li>
            <li className="flex gap-2">
              <CheckSquare className="w-4 h-4 text-green-500 shrink-0" />
              <span>Dominar escrita em Gherkin</span>
            </li>
            <li className="flex gap-2">
              <CheckSquare className="w-4 h-4 text-green-500 shrink-0" />
              <span>Gerenciar bugs com precisão</span>
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-purple-600 font-bold text-lg">
            <Users className="w-6 h-6" />
            Seu Papel como QA
          </div>
          <div className="space-y-3">
            <p className="text-slate-600 text-sm italic border-l-4 border-purple-200 pl-4 py-1">
              "QA não é apenas encontrar bugs, é garantir que o valor do negócio seja entregue com qualidade."
            </p>
            <p className="text-slate-500 text-sm">
              Você será o guardião das Regras de Negócio e da Satisfação do Cliente.
            </p>
          </div>
        </section>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Map className="w-6 h-6 text-orange-500" />
          A Jornada do QA (Fluxo do Processo)
        </h3>
        
        <div className="space-y-6 relative ml-4 border-l-2 border-slate-100 pl-8 pb-4">
          {[
            { 
              step: '1', title: 'Entendimento', 
              desc: 'Ler a User Story e identificar critérios de aceite.', 
              icon: ClipboardCheck, color: 'text-blue-500' 
            },
            { 
              step: '2', title: 'Planejamento', 
              desc: 'Escrever cenários em Gherkin e classificar (Pos/Neg/Reg).', 
              icon: FileText, color: 'text-purple-500' 
            },
            { 
              step: '3', title: 'Execução QA', 
              desc: 'Testar no "Ambiente de QA" e identificar ERROS intencionais.', 
              icon: TestTubes, color: 'text-red-500' 
            },
            { 
              step: '4', title: 'Bug Tracker', 
              desc: 'Registrar bugs e gerenciar até a correção.', 
              icon: BugIcon, color: 'text-orange-500' 
            },
            { 
              step: '5', title: 'Aprovação Final', 
              desc: 'Validar correções no "Ambiente Homologação" e dar o aceite.', 
              icon: ShieldCheck, color: 'text-green-500' 
            },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className={cn("absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center font-bold", item.color.replace('text', 'border'))}>
                {item.step}
              </div>
              <div className="flex gap-4">
                <div className={cn("bg-slate-50 p-2 rounded-lg h-fit", item.color)}>
                  <item.icon className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

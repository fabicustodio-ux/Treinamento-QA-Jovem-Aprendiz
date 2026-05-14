import React from 'react';
import { Send, CheckCircle2, AlertCircle, FileText, Bug as BugIcon, Clock, Lock, ShieldCheck } from 'lucide-react';
import { Scenario, Bug } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface FinalDeliveryProps {
  scenarios: Scenario[];
  bugs: Bug[];
  isDelivered: boolean;
  onDeliver: () => void;
  apprenticeName: string;
}

export function FinalDelivery({ scenarios, bugs, isDelivered, onDeliver, apprenticeName }: FinalDeliveryProps) {
  const completedQA = scenarios.filter(s => s.statusQA === 'sucesso').length;
  const completedHomo = scenarios.filter(s => s.statusHomo === 'sucesso').length;
  const totalScenarios = scenarios.length;
  
  const qaRate = totalScenarios > 0 ? (completedQA / totalScenarios) * 100 : 0;
  const homoRate = totalScenarios > 0 ? (completedHomo / totalScenarios) * 100 : 0;
  
  const openBugs = bugs.filter(b => b.status === 'aberto' || b.status === 'reaberto').length;
  const resolvedBugs = bugs.filter(b => b.status === 'corrigido' || b.status === 'fechado').length;
  const bugsQA = bugs.filter(b => b.environment === 'QA').length;
  const bugsHomo = bugs.filter(b => b.environment === 'HOMO').length;

  if (isDelivered) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100"
        >
          <div className="bg-green-600 p-12 text-center text-white space-y-4">
            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-black">Projeto Entregue!</h2>
            <p className="text-green-100 text-lg">Parabéns, {apprenticeName}. Sua entrega foi registrada com sucesso.</p>
          </div>

          <div className="p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Status Final</p>
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  Concluído
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Data da Entrega</p>
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <Clock className="w-5 h-5 text-blue-500" />
                  {new Date().toLocaleDateString('pt-BR')}
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">ID da Entrega</p>
                <div className="flex items-center gap-2 text-slate-700 font-mono text-sm font-bold">
                  QA-{Math.random().toString(36).substring(7).toUpperCase()}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
              <Lock className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-blue-900">Projeto em Modo Somente-Leitura</h4>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Os dados foram salvos definitivamente no repositório oficial. Nenhuma alteração adicional é permitida para garantir a integridade da evidência de aprendizado.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-lg border-b pb-2">Resumo Consolidado por Ambiente</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Ambiente de QA</p>
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-700 font-bold">Cenários: {completedQA}/{totalScenarios}</span>
                      <span className="text-blue-900 font-black">{Math.round(qaRate)}%</span>
                    </div>
                    <div className="w-full bg-blue-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full" style={{ width: `${qaRate}%` }} />
                    </div>
                    <p className="text-[10px] text-blue-500 font-bold">Bugs Relatados: {bugsQA}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Ambiente de Homologação</p>
                  <div className="bg-green-50 border border-green-100 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-700 font-bold">Cenários: {completedHomo}/{totalScenarios}</span>
                      <span className="text-green-900 font-black">{Math.round(homoRate)}%</span>
                    </div>
                    <div className="w-full bg-green-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-green-600 h-full" style={{ width: `${homoRate}%` }} />
                    </div>
                    <p className="text-[10px] text-green-500 font-bold">Bugs Relatados: {bugsHomo}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all border border-slate-200"
              >
                Gerar Relatório em PDF
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="space-y-8 text-center mb-12">
        <h2 className="text-4xl font-black text-slate-900">Entrega Final do Projeto</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Ao finalizar, seu progresso será consolidado e enviado para avaliação da mantora Fabiana Custodio. Certifique-se de que todos os cenários foram executados e evidências anexadas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Cenários (Gherkin)</h3>
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest",
              qaRate === 100 && homoRate === 100 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            )}>
              {qaRate === 100 && homoRate === 100 ? "Pronto" : "Pendente"}
            </span>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-500 uppercase tracking-widest">Progresso QA</span>
                <span className="font-bold text-slate-900">{Math.round(qaRate)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${qaRate}%` }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-500 uppercase tracking-widest">Progresso HOMO</span>
                <span className="font-bold text-slate-900">{Math.round(homoRate)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${homoRate}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Defeitos (Bugs)</h3>
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest",
              openBugs === 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              {openBugs === 0 ? "Estável" : "Bugs em Aberto"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total de Bugs</p>
              <p className="text-2xl font-black text-slate-800">{bugs.length}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Corrigidos</p>
              <p className="text-2xl font-black text-green-600">{resolvedBugs}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border-2 border-dashed border-amber-200 rounded-3xl p-8 space-y-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-amber-600" />
          <h4 className="font-bold text-amber-900 text-lg">Atenção!</h4>
        </div>
        <p className="text-amber-800 leading-relaxed">
          Após clicar em <strong>"Confirmar Entrega Final"</strong>, você não poderá mais editar cenários, excluir bugs ou alterar tipos de execução. O projeto ficará disponível apenas para consulta e auditoria posterior.
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <button 
          onClick={() => {
            if (confirm('Deseja realizar a entrega final do projeto? Esta ação bloqueia todas as alterações futuras.')) {
              onDeliver();
            }
          }}
          disabled={!apprenticeName}
          className={cn(
            "group flex items-center gap-3 px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl relative overflow-hidden",
            apprenticeName 
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 active:scale-95 shadow-blue-200" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          )}
        >
          <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          Confirmar Entrega Final
        </button>
        {!apprenticeName && (
          <p className="text-sm font-bold text-red-500">Por favor, informe seu nome na barra lateral antes de entregar.</p>
        )}
      </div>
    </div>
  );
}

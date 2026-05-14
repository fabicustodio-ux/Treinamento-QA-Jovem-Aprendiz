import React from 'react';
import { 
  FileText, 
  ClipboardList, 
  CreditCard, 
  MessageCircle, 
  AlertTriangle,
  ArrowRight,
  Info
} from 'lucide-react';

export function Requirements() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-blue-600 font-semibold tracking-wide uppercase text-sm">
          <FileText className="w-4 h-4" />
          Documentação de Requisitos
        </div>
        <h2 className="text-3xl font-bold text-slate-900">User Story & Regras de Negócio</h2>
        <p className="text-slate-500">Base para a criação dos cenários de teste Gherkin.</p>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            US #001
          </div>
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <ClipboardList className="text-blue-500" />
              User Story 1: Cadastro de Clientes
            </h3>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="flex gap-4">
                <span className="font-bold text-blue-700 w-12 shrink-0">Quem:</span>
                <span className="text-slate-700">Como cliente do posto de combustível "É logo Ali"</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-blue-700 w-12 shrink-0">O quê:</span>
                <span className="text-slate-700">Quero realizar meu cadastro no sistema</span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-blue-700 w-12 shrink-0">Por quê:</span>
                <span className="text-slate-700">Para participar de promoções, acumular benefícios e facilitar meu atendimento</span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <section className="space-y-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest text-slate-400">
                <ArrowRight className="w-3 h-3" />
                Dados do Cadastro
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Nome Completo', type: 'Obrigatório' },
                  { label: 'CPF', type: 'Obrigatório (11 dígitos)' },
                  { label: 'E-mail', type: 'Obrigatório (Formato válido)' },
                  { label: 'Telefone', type: 'Obrigatório (DDD + Número)' },
                  { label: 'Data de Nascimento', type: 'Opcional' },
                  { label: 'Aceite de Termos', type: 'Obrigatório' },
                ].map((field, i) => (
                  <li key={i} className="flex justify-between items-center bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-slate-700">{field.label}</span>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase",
                      field.type.includes('Obrigatório') ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-500"
                    )}>
                      {field.type}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest text-slate-400">
                <ArrowRight className="w-3 h-3" />
                Regras de Negócio Cruciais
              </h4>
              <div className="space-y-3">
                {[
                  "Não é permitido CPF ou E-mail duplicado.",
                  "O aceite dos termos é condição obrigatória para salvar.",
                  "O sistema deve validar os dados em tempo real ou no envio.",
                  "Deve retornar mensagens claras de sucesso ou erro específico."
                ].map((rule, i) => (
                  <div key={i} className="flex gap-3 text-sm text-slate-600 bg-orange-50/30 p-3 rounded-lg border border-orange-100">
                    <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    {rule}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="pt-6 space-y-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest text-slate-400">
              <MessageCircle className="w-4 h-4" />
              Mensageria Esperada
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { type: 'Sucesso', msg: 'Cadastro realizado com sucesso.' },
                { type: 'Erro', msg: 'Nome é obrigatório.' },
                { type: 'Erro', msg: 'CPF inválido ou já cadastrado.' },
                { type: 'Erro', msg: 'E-mail inválido ou já cadastrado.' },
                { type: 'Erro', msg: 'Telefone inválido.' },
                { type: 'Erro', msg: 'É necessário aceitar os termos para continuar.' },
              ].map((m, i) => (
                <div key={i} className={cn("p-3 rounded-lg text-xs font-medium border flex justify-between gap-2", m.type === 'Sucesso' ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700")}>
                  <span>{m.msg}</span>
                  <span className="opacity-50">{m.type}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

       <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <div className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            US #002
          </div>
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <ClipboardList className="text-purple-500" />
              User Story 2: Atualização de Cadastro
            </h3>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <p className="text-slate-700 leading-relaxed">
                Como cliente já cadastrado, quero atualizar meus dados no sistema para manter minhas informações corretas e atualizadas.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <section className="space-y-4">
               <h4 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest text-slate-400">
                 Campos Editáveis
               </h4>
               <div className="flex flex-wrap gap-2">
                 {['E-mail', 'Telefone', 'Data de Nascimento', 'Fidelidade'].map(tag => (
                   <span key={tag} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-100">
                     {tag}
                   </span>
                 ))}
               </div>
               <div className="flex items-start gap-2 text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                 <AlertTriangle className="w-4 h-4 shrink-0" strokeWidth={3} />
                 <span>O CPF é um campo imutável e não deve ser editado após o cadastro inicial.</span>
               </div>
             </section>

             <section className="space-y-4">
               <h4 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-xs tracking-widest text-slate-400">
                 Critérios de Aceite
               </h4>
               <ul className="space-y-2">
                 {[
                   "Dados antigos devem ser mantidos se houver erro.",
                   "Suporte a validação de formato igual ao cadastro.",
                   "Mensagem de sucesso confirmando a alteração."
                 ].map((c, i) => (
                   <li key={i} className="text-sm text-slate-600 flex gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                     {c}
                   </li>
                 ))}
               </ul>
             </section>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';

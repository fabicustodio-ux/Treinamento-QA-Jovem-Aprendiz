import React, { useState } from 'react';
import { 
  User, 
  CreditCard, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { cn } from '../lib/utils';

interface RegistrationFormProps {
  mode: 'QA' | 'HOMO';
  onSave?: (data: any) => void;
  readOnly?: boolean;
}

export function RegistrationForm({ mode, onSave, readOnly }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    birthDate: '',
    terms: false
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const validate = () => {
    setMessage(null);

    // QA Environment - Intentional Bugged Behavior
    if (mode === 'QA') {
      // Erro 04: Campo Nome vazio sem exibição de mensagem de erro
      if (!formData.name) {
        // Just doesn't show message if name is empty in QA
        // return false; 
      }

      // Erro 01: CPF inválido permitido (menos de 11 dígitos)
      // No validation check here in QA for CPF length

      // Erro 05: Sistema permite cadastro sem aceite dos termos
      // Even if terms is false, we might allow success or strange behavior
      
      // Simulating a random success message even with errors (Erro 06)
      if (formData.cpf.length < 11 && formData.cpf.length > 0) {
        setMessage({ type: 'success', text: 'Cadastro realizado com sucesso. (Bug #01: CPF < 11)' });
        return true;
      }
      
      if (!formData.terms) {
        setMessage({ type: 'success', text: 'Cadastro realizado com sucesso. (Bug #05: Termos não aceitos)' });
        return true;
      }

      if (formData.email && !formData.email.includes('@')) {
        setMessage({ type: 'success', text: 'Cadastro realizado com sucesso. (Bug #03: E-mail inválido)' });
        return true;
      }

      setMessage({ type: 'info', text: 'Erro genérico de processamento. (Bug #10)' });
      return false;
    }

    // HOMO Environment - Stable Behavior
    if (!formData.name) {
      setMessage({ type: 'error', text: 'Nome é obrigatório.' });
      return false;
    }
    if (formData.cpf.length !== 11) {
      setMessage({ type: 'error', text: 'CPF deve conter 11 números válidos.' });
      return false;
    }
    if (!formData.email.includes('@')) {
      setMessage({ type: 'error', text: 'E-mail deve estar em formato válido.' });
      return false;
    }
    if (!formData.phone) {
      setMessage({ type: 'error', text: 'Telefone inválido.' });
      return false;
    }
    if (!formData.terms) {
      setMessage({ type: 'error', text: 'É necessário aceitar os termos para continuar.' });
      return false;
    }

    setMessage({ type: 'success', text: 'Cadastro realizado com sucesso.' });
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
       onSave?.(formData);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-w-xl mx-auto">
      <div className={cn(
        "p-6 text-white flex items-center justify-between",
        mode === 'QA' ? "bg-red-600" : "bg-green-600"
      )}>
        <div>
          <h3 className="text-xl font-bold">Posto É Logo Ali</h3>
          <p className="text-xs opacity-80 uppercase tracking-widest font-semibold">
            {mode === 'QA' ? 'Ambiente de Testes (QA)' : 'Ambiente de Homologação'}
          </p>
        </div>
        {mode === 'QA' ? <AlertCircle className="w-8 h-8 opacity-40" /> : <ShieldCheck className="w-8 h-8 opacity-40" />}
      </div>

      <form onSubmit={handleSubmit} className={cn("p-8 space-y-5", readOnly && "opacity-60 pointer-events-none")}>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
            <User className="w-3 h-3" /> NOME COMPLETO
          </label>
          <input 
            type="text" 
            placeholder="Ex: João da Silva"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
              <CreditCard className="w-3 h-3" /> CPF
            </label>
            <input 
              type="text" 
              placeholder="000.000.000-00"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              value={formData.cpf}
              onChange={e => setFormData({...formData, cpf: e.target.value})}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
              <Calendar className="w-3 h-3" /> DATA NASC.
            </label>
            <input 
              type="text" 
              placeholder="DD/MM/AAAA"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              value={formData.birthDate}
              onChange={e => setFormData({...formData, birthDate: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
            <Mail className="w-3 h-3" /> E-MAIL
          </label>
          <input 
            type="text" 
            placeholder="joao@email.com"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
            <Phone className="w-3 h-3" /> TELEFONE
          </label>
          <input 
            type="text" 
            placeholder="(00) 00000-0000"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
           <input 
            type="checkbox" 
            id="terms"
            className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
            checked={formData.terms}
            onChange={e => setFormData({...formData, terms: e.target.checked})}
           />
           <label htmlFor="terms" className="text-xs text-slate-600 font-medium cursor-pointer">
             Aceito os termos e condições para realizar meu cadastro e receber benefícios.
           </label>
        </div>

        {message && (
          <div className={cn(
            "p-4 rounded-xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2",
            message.type === 'success' ? "bg-green-50 text-green-700 border-green-100 border" : 
            message.type === 'error' ? "bg-red-50 text-red-700 border-red-100 border" :
            "bg-slate-100 text-slate-700 border-slate-200 border"
          )}>
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message.text}
          </div>
        )}

        <div className="pt-4 flex gap-3">
          <button 
            type="button"
            onClick={() => {
              setFormData({ name: '', cpf: '', email: '', phone: '', birthDate: '', terms: false });
              setMessage(null);
            }}
            className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Limpar
          </button>
            <button 
              type="submit"
              disabled={readOnly}
              className={cn(
                "flex-[2] px-6 py-3 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95",
                mode === 'QA' ? "bg-red-600 hover:bg-red-700 shadow-red-200" : "bg-green-600 hover:bg-green-700 shadow-green-200",
                readOnly && "bg-slate-300 shadow-none cursor-not-allowed"
              )}
            >
              {readOnly ? "Formulário Bloqueado" : "Cadastrar Cliente"}
            </button>
        </div>
      </form>
    </div>
  );
}

import React from 'react';
import { LayoutDashboard, BookOpen, FileText, TestTube2, Bug as BugIcon, TestTubes, ShieldCheck, ChevronRight, Award, Trash2, Lock, Send, Globe, Layers, Save, Check, LogOut, Target } from 'lucide-react';
import { cn } from '../lib/utils';
import { TestEnvironment, TestStage } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  apprenticeName: string;
  setApprenticeName: (name: string) => void;
  onReset: () => void;
  onLogout: () => void;
  currentEnvironment: TestEnvironment;
  setCurrentEnvironment: (env: TestEnvironment) => void;
  currentStage: TestStage;
  setCurrentStage: (stage: TestStage) => void;
  onSave: () => void;
  showSavePulse: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'onboarding', label: 'Guia Inicial (Onboarding)', icon: Target },
  { id: 'orientation', label: 'Guia de Orientações', icon: BookOpen },
  { id: 'requirements', label: 'User Story / Requisitos', icon: FileText },
  { id: 'scenarios', label: 'Gestão de Gherkins', icon: TestTube2 },
  { id: 'bugtracker', label: 'Bug Tracker', icon: BugIcon },
  { id: 'qa_env', label: 'Ambiente de QA', icon: TestTubes },
  { id: 'homo_env', label: 'Ambiente Homologação', icon: ShieldCheck },
  { id: 'delivery', label: 'Entrega Final', icon: Send },
  { id: 'certificate', label: 'Gerar Certificado', icon: Lock },
];

export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  apprenticeName, 
  setApprenticeName, 
  onReset,
  onLogout,
  currentEnvironment,
  setCurrentEnvironment,
  currentStage,
  setCurrentStage,
  onSave,
  showSavePulse
}: SidebarProps) {
  const stages: TestStage[] = ['Gherkin', 'Execução', 'Reteste', 'Homologação', 'Aprovação'];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <TestTubes className="text-blue-400" />
          <span>Studio QA</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
          Foursys Training
        </p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <div className="mb-6 space-y-4 font-mono">
           <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50 space-y-2">
            <div className="flex justify-between items-start">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-1">
                <Target className="w-3 h-3" /> Aprendiz
              </p>
              <button 
                onClick={onLogout}
                title="Sair / Trocar Aprendiz"
                className="text-slate-500 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm font-bold text-white truncate">{apprenticeName}</p>
          </div>

          <div className="space-y-2">
            <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Globe className="w-3 h-3" /> Ambiente Ativo
            </p>
            <div className="grid grid-cols-2 gap-1 px-3">
              {(['QA', 'HOMO'] as const).map(env => (
                <button
                  key={env}
                  onClick={() => setCurrentEnvironment(env)}
                  className={cn(
                    "py-1.5 text-[10px] font-bold rounded-md transition-all border",
                    currentEnvironment === env 
                      ? "bg-blue-600 text-white border-blue-500 shadow-sm" 
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
                  )}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-3 h-3" /> Etapa do Teste
            </p>
            <select 
              value={currentStage}
              onChange={(e) => setCurrentStage(e.target.value as TestStage)}
              className="w-full mx-3 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-[10px] text-slate-200 outline-none focus:border-blue-500 appearance-none"
            >
              {stages.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group text-sm",
              activeTab === item.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                : "hover:bg-slate-800 hover:text-slate-100"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-slate-200")} />
              <span>{item.label}</span>
            </div>
            {activeTab === item.id && <ChevronRight className="w-3 h-3" />}
          </button>
        ))}
        </div>
      </nav>

      <div className="p-4 mt-auto space-y-4">
        <button 
          onClick={onSave}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-black rounded-xl transition-all border shadow-lg active:scale-95",
            showSavePulse 
              ? "bg-green-600 text-white border-green-500 shadow-green-900/40 animate-pulse" 
              : "bg-blue-600 text-white border-blue-500 shadow-blue-900/40 hover:bg-blue-500"
          )}
        >
          {showSavePulse ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {showSavePulse ? "SALVO!" : "SALVAR PROGRESSO"}
        </button>

        <button 
          onClick={() => {
            if (confirm('Tem certeza que deseja limpar todo o seu progresso? Esta ação não pode ser desfeita.')) {
              onReset();
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-900/30"
        >
          <Trash2 className="w-3 h-3" />
          Reiniciar Treinamento
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { UserPlus, Users, Play, Trash2, Search, Target } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface Session {
  name: string;
  lastUpdate: string;
}

interface SessionSelectorProps {
  sessions: Session[];
  onSelect: (name: string) => void;
  onCreate: (name: string) => void;
  onDelete: (name: string) => void;
}

export function SessionSelector({ sessions, onSelect, onCreate, onDelete }: SessionSelectorProps) {
  const [newName, setNewName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSessions = sessions.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-10"
      >
        <div className="text-center space-y-4">
          <div className="bg-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/20 rotate-3 animate-pulse">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Studio de QA</h1>
          <p className="text-slate-400 font-medium">Selecione seu nome para continuar o treinamento ou inicie um novo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* New Session */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Novo Aprendiz
            </h3>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
              <input 
                type="text" 
                placeholder="Exulado: Aline Silva"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all font-bold"
              />
              <button 
                onClick={() => {
                  if (newName.trim()) {
                    onCreate(newName.trim());
                    setNewName('');
                  }
                }}
                disabled={!newName.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-black py-4 rounded-xl shadow-xl shadow-blue-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Iniciar Treinamento
                <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Existing Sessions */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4" /> Retomar Progresso
            </h3>
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Buscar nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500"
                />
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredSessions.length > 0 ? (
                filteredSessions.map(session => (
                  <div 
                    key={session.name}
                    className="group bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 flex items-center justify-between transition-all"
                  >
                    <button 
                      onClick={() => onSelect(session.name)}
                      className="flex-1 text-left"
                    >
                      <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{session.name}</p>
                      <p className="text-[10px] text-slate-500">Visto por último: {new Date(session.lastUpdate).toLocaleDateString('pt-BR')}</p>
                    </button>
                    <button 
                      onClick={() => {
                        if(confirm(`Excluir todo o progresso de ${session.name}?`)) {
                          onDelete(session.name);
                        }
                      }}
                      className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 opacity-40">
                  <p className="text-xs font-bold text-slate-500 uppercase">Nenhum registro</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

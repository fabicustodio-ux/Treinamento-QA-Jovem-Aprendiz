import React, { useState } from 'react';
import { 
  Bug as BugIcon, 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle2,
  X,
  Link,
  FileUp,
  FileText,
  Check
} from 'lucide-react';
import { Bug, BugStatus, BugClassification, Scenario, TestEnvironment } from '../types';
import { cn } from '../lib/utils';

interface BugTrackerProps {
  bugs: Bug[];
  scenarios: Scenario[];
  onAdd: (bug: Omit<Bug, 'id' | 'createdAt' | 'environment' | 'stage'>) => void;
  onUpdateStatus: (id: string, status: BugStatus) => void;
  onDelete: (id: string) => void;
  readOnly?: boolean;
  currentEnvironment: TestEnvironment;
}

export function BugTracker({ bugs, scenarios, onAdd, onUpdateStatus, onDelete, readOnly, currentEnvironment }: BugTrackerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredBugs = bugs.filter(b => {
    const matchesEnv = b.environment === currentEnvironment;
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEnv && matchesSearch;
  });
  const [newBug, setNewBug] = useState<{
    title: string;
    description: string;
    classification: BugClassification;
    responsible: string;
    scenarioId: string;
    status: BugStatus;
    evidence: string;
  }>({
    title: '',
    description: '',
    classification: 'desenvolvimento',
    responsible: 'Time Dev',
    scenarioId: '',
    status: 'aberto',
    evidence: ''
  });

  const getStatusStyle = (status: BugStatus) => {
    switch (status) {
      case 'aberto': return 'bg-red-50 text-red-700 border-red-100';
      case 'corrigido': return 'bg-green-50 text-green-700 border-green-100';
      case 'em_validacao': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'fechado': return 'bg-slate-50 text-slate-700 border-slate-100';
      case 'reaberto': return 'bg-orange-50 text-orange-700 border-orange-100';
    }
  };

  const getClassificationStyle = (type: BugClassification) => {
    switch (type) {
      case 'desenvolvimento': return 'bg-blue-100 text-blue-800';
      case 'ambiente': return 'bg-amber-100 text-amber-800';
      case 'massa_de_dados': return 'bg-purple-100 text-purple-800';
      case 'erro_de_execucao': return 'bg-slate-100 text-slate-800';
      case 'documentacao': return 'bg-cyan-100 text-cyan-800';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newBug);
    setIsAdding(false);
    setNewBug({
      title: '',
      description: '',
      classification: 'desenvolvimento',
      responsible: 'Time Dev',
      scenarioId: '',
      status: 'aberto',
      evidence: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Bug Tracker ({currentEnvironment})</h2>
        <button 
          onClick={() => !readOnly && setIsAdding(true)}
          disabled={readOnly}
          className={cn(
            "text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95",
            readOnly ? "bg-slate-300 shadow-none cursor-not-allowed" : "bg-red-600 hover:bg-red-700 shadow-red-200"
          )}
        >
          <Plus className="w-4 h-4" />
          {readOnly ? "Reportes Bloqueados" : "Novo Bug"}
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Buscar bugs..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:border-red-500 outline-none text-sm"
        />
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border-2 border-red-100 shadow-xl">
           <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Reportar Bug</h3>
            <button onClick={() => setIsAdding(false)}><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
                type="text"
                placeholder="Título"
                className="w-full p-2 border rounded"
                value={newBug.title}
                onChange={e => setNewBug({...newBug, title: e.target.value})}
                required
            />
            <select 
                className="w-full p-2 border rounded"
                value={newBug.classification}
                onChange={e => setNewBug({...newBug, classification: e.target.value as BugClassification})}
            >
                <option value="desenvolvimento">Desenvolvimento</option>
                <option value="ambiente">Ambiente</option>
                <option value="massa_de_dados">Massa de Dados</option>
                <option value="erro_de_execucao">Erro de Execução</option>
                <option value="documentacao">Documentação</option>
            </select>
            <textarea 
                className="w-full p-2 border rounded"
                placeholder="Descrição"
                value={newBug.description}
                onChange={e => setNewBug({...newBug, description: e.target.value})}
                required
            />
            <select 
                className="w-full p-2 border rounded"
                value={newBug.scenarioId}
                onChange={e => setNewBug({...newBug, scenarioId: e.target.value})}
                required
            >
                <option value="">Cenário Vinculado</option>
                {scenarios.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Evidência do Erro</label>
              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-all cursor-pointer group">
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setNewBug({...newBug, evidence: file.name});
                  }}
                />
                {newBug.evidence ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-bold text-green-600 truncate">{newBug.evidence}</span>
                  </>
                ) : (
                  <>
                    <FileUp className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
                    <span className="text-xs font-bold text-slate-500 group-hover:text-red-600">Anexar Print ou PDF do Erro</span>
                  </>
                )}
              </label>
            </div>

            <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 transition-all active:scale-95">Reportar Defeito</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">Info</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Status</th>
              <th className="p-4">Etapa</th>
              <th className="p-4">Cenário</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredBugs.map(bug => (
              <tr key={bug.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-bold text-slate-800">{bug.title}</div>
                  <div className="text-xs text-slate-500 truncate max-w-xs">{bug.description}</div>
                  {bug.evidence && (
                    <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-blue-600">
                      <FileText className="w-3 h-3" />
                      {bug.evidence}
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <span className={cn("text-[10px] p-1 px-2 rounded-full font-bold uppercase", getClassificationStyle(bug.classification))}>
                    {bug.classification.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    value={bug.status}
                    onChange={e => !readOnly && onUpdateStatus(bug.id, e.target.value as BugStatus)}
                    disabled={readOnly}
                    className={cn(
                      "text-[10px] p-1 px-2 rounded-full font-bold uppercase border",
                      readOnly ? "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed" : cn("cursor-pointer", getStatusStyle(bug.status))
                    )}
                  >
                    <option value="aberto">Aberto</option>
                    <option value="corrigido">Corrigido</option>
                    <option value="em_validacao">Em Validação</option>
                    <option value="fechado">Fechado</option>
                    <option value="reaberto">Reaberto</option>
                  </select>
                </td>
                <td className="p-4 font-bold text-[10px] text-blue-600 uppercase">
                  {bug.stage}
                </td>
                <td className="p-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Link className="w-3 h-3" />
                      {scenarios.find(s => s.id === bug.scenarioId)?.title || 'Link Perdido'}
                    </div>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => !readOnly && onDelete(bug.id)} 
                    disabled={readOnly}
                    className={cn(
                      "transition-colors mx-auto block",
                      readOnly ? "text-slate-100 cursor-not-allowed" : "text-slate-300 hover:text-red-500"
                    )}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bugs.length === 0 && (
          <div className="p-10 text-center text-slate-400">Nenhum bug registrado.</div>
        )}
      </div>
    </div>
  );
}

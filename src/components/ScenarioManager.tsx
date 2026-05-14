import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  FileText,
  Search,
  Filter,
  Tag,
  MessageSquare,
  Paperclip,
  Save,
  X,
  Link,
  TestTubes,
  FileUp,
  Check
} from 'lucide-react';
import { Scenario, ExecutionStatus, TestType, TestEnvironment } from '../types';
import { cn } from '../lib/utils';

interface ScenarioManagerProps {
  scenarios: Scenario[];
  onAdd: (scenario: Omit<Scenario, 'id' | 'createdAt' | 'statusQA' | 'statusHomo'>) => void;
  onUpdateStatus: (id: string, status: ExecutionStatus, obs?: string, evidence?: string) => void;
  onDelete: (id: string) => void;
  readOnly?: boolean;
  currentEnvironment: TestEnvironment;
}

export function ScenarioManager({ scenarios, onAdd, onUpdateStatus, onDelete, readOnly, currentEnvironment }: ScenarioManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<TestType | 'all'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [executionObs, setExecutionObs] = useState('');
  const [executionEvidence, setExecutionEvidence] = useState<string | null>(null);
  
  const [newScenario, setNewScenario] = useState<{
    title: string;
    gherkin: string;
    type: TestType;
  }>({
    title: '',
    gherkin: '',
    type: 'positivo'
  });

  const getEnvStatus = (s: Scenario) => currentEnvironment === 'QA' ? s.statusQA : s.statusHomo;
  const getEnvObs = (s: Scenario) => currentEnvironment === 'QA' ? s.obsQA : s.obsHomo;
  const getEnvEvidence = (s: Scenario) => currentEnvironment === 'QA' ? s.evidenceQA : s.evidenceHomo;
  const getEnvStage = (s: Scenario) => currentEnvironment === 'QA' ? s.stageQA : s.stageHomo;

  const filteredScenarios = scenarios.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.gherkin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || s.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScenario.title || !newScenario.gherkin) return;
    onAdd(newScenario);
    setNewScenario({ title: '', gherkin: '', type: 'positivo' });
    setIsAdding(false);
  };

  const getStatusColor = (status: ExecutionStatus) => {
    switch (status) {
      case 'sucesso': return 'text-green-600 bg-green-50 border-green-100';
      case 'falha': return 'text-red-600 bg-red-50 border-red-100';
      case 'bloqueado': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'em_execucao': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'pendente': return 'text-slate-500 bg-slate-50 border-slate-100';
      default: return 'text-slate-400 bg-slate-50 border-slate-100';
    }
  };

  const getTestTypeColor = (type: TestType) => {
    switch (type) {
      case 'positivo': return 'text-green-700 bg-green-100';
      case 'negativo': return 'text-red-700 bg-red-100';
      case 'regressivo': return 'text-purple-700 bg-purple-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Cenários de Teste ({currentEnvironment})</h2>
          <p className="text-sm text-slate-500">Escreva e gerencie seu repositório de testes em Gherkin no ambiente {currentEnvironment}.</p>
        </div>
        <button 
          onClick={() => !readOnly && setIsAdding(true)}
          disabled={readOnly}
          className={cn(
            "text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95",
            readOnly ? "bg-slate-300 shadow-none cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
          )}
        >
          <Plus className="w-4 h-4" />
          Novo Cenário
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Buscar por título ou gherkin..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <div className="flex gap-1 p-1 bg-slate-50 rounded-lg">
            {(['all', 'positivo', 'negativo', 'regressivo'] as const).map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium capitalize",
                  activeFilter === f ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {f === 'all' ? 'Todos' : f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border-2 border-blue-100 shadow-xl animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Criar Novo Cenário</h3>
            <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Título do Cenário</label>
                <input 
                  type="text" 
                  value={newScenario.title}
                  onChange={e => setNewScenario({...newScenario, title: e.target.value})}
                  placeholder="Ex: Cadastro com sucesso"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Tipo de Teste</label>
                <select 
                  value={newScenario.type}
                  onChange={e => setNewScenario({...newScenario, type: e.target.value as TestType})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                >
                  <option value="positivo">Positivo</option>
                  <option value="negativo">Negativo</option>
                  <option value="regressivo">Regressivo</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex justify-between">
                <span>Gherkin</span>
                <span className="text-xs font-normal text-slate-400 italic">Given, When, Then...</span>
              </label>
              <textarea 
                rows={6}
                value={newScenario.gherkin}
                onChange={e => setNewScenario({...newScenario, gherkin: e.target.value})}
                placeholder="Dado que eu estou na tela de cadastro..."
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-mono text-sm"
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-6 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Salvar Cenário
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredScenarios.length > 0 ? (
          filteredScenarios.map(scenario => (
            <div key={scenario.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider", getTestTypeColor(scenario.type))}>
                        {scenario.type}
                      </span>
                      <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border tracking-wider flex items-center gap-1", getStatusColor(getEnvStatus(scenario)))}>
                        {getEnvStatus(scenario).replace('_', ' ')}
                      </span>
                      {getEnvStage(scenario) && (
                        <span className="text-[10px] font-black uppercase text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                          {getEnvStage(scenario)}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{scenario.title}</h4>
                  </div>
                  <button 
                    onClick={() => !readOnly && onDelete(scenario.id)}
                    disabled={readOnly}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      readOnly ? "text-slate-100 cursor-not-allowed" : "text-slate-300 hover:text-red-500 hover:bg-red-50"
                    )}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                  <div className="bg-slate-900 rounded-xl p-4 overflow-hidden relative group/code max-h-48 overflow-y-auto">
                    <pre className="text-blue-400 text-xs font-mono leading-relaxed overflow-x-auto">
                      {scenario.gherkin}
                    </pre>
                    <div className="absolute right-2 top-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                      <FileText className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>

                  {getEnvEvidence(scenario) && (
                    <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-100 text-blue-700 text-xs font-medium">
                      <FileText className="w-3.5 h-3.5" />
                      <span className="truncate flex-1">Evidência ({currentEnvironment}): {getEnvEvidence(scenario)}</span>
                    </div>
                  )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-50">
                   <div className="flex -space-x-2">
                      <div className={cn("w-7 h-7 rounded-full border-2 border-white flex items-center justify-center transition-colors", getEnvEvidence(scenario) ? "bg-blue-600" : "bg-slate-100")}>
                        <Paperclip className={cn("w-3 h-3", getEnvEvidence(scenario) ? "text-white" : "text-slate-400")} title={getEnvEvidence(scenario) ? "Evidência PDF anexada" : "Sem evidência"} />
                      </div>
                      <div className={cn("w-7 h-7 rounded-full border-2 border-white flex items-center justify-center", getEnvObs(scenario) ? "bg-amber-500" : "bg-slate-100")}>
                        <MessageSquare className={cn("w-3 h-3", getEnvObs(scenario) ? "text-white" : "text-slate-400")} />
                      </div>
                   </div>

                   <button 
                    onClick={() => {
                      if (readOnly) return;
                      setEditingId(scenario.id);
                      setExecutionObs(getEnvObs(scenario) || '');
                      setExecutionEvidence(getEnvEvidence(scenario) || null);
                    }}
                    disabled={readOnly}
                    className={cn(
                      "flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-colors",
                      readOnly ? "text-slate-400 bg-slate-50 cursor-not-allowed" : "text-blue-600 bg-blue-50 hover:bg-blue-100"
                    )}
                   >
                     <Play className="w-3 h-3 fill-current" />
                     {readOnly ? "Execução Bloqueada" : "Executar Teste"}
                   </button>
                </div>
              </div>

              {editingId === scenario.id && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Registro de Execução - {currentEnvironment}</h3>
                        <button onClick={() => setEditingId(null)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
                      </div>

                     <div className="space-y-6">
                        <div className="space-y-4">
                           <label className="text-sm font-bold text-slate-700">Evidências e Observações</label>
                           
                           <div className="space-y-3">
                             <div className="flex items-center gap-4">
                               <label className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group">
                                 <input 
                                   type="file" 
                                   accept=".pdf" 
                                   className="hidden" 
                                   onChange={(e) => {
                                     const file = e.target.files?.[0];
                                     if (file) setExecutionEvidence(file.name);
                                   }}
                                 />
                                 {executionEvidence ? (
                                   <>
                                     <Check className="w-4 h-4 text-green-500" />
                                     <span className="text-xs font-bold text-green-600 truncate max-w-[200px]">{executionEvidence}</span>
                                   </>
                                 ) : (
                                   <>
                                     <FileUp className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                     <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600">Anexar Evidência (PDF)</span>
                                   </>
                                 )}
                               </label>
                               {executionEvidence && (
                                 <button onClick={() => setExecutionEvidence(null)} className="text-xs font-bold text-red-500 hover:underline">Remover</button>
                               )}
                             </div>

                             <textarea 
                               rows={3}
                               value={executionObs}
                               onChange={e => setExecutionObs(e.target.value)}
                               placeholder="Anote detalhes da execução aqui..."
                               className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                             />
                           </div>
                        </div>

                        <div className="space-y-4">
                           <label className="text-sm font-bold text-slate-700">Selecionar Status para Salvar</label>
                           <div className="grid grid-cols-2 gap-2">
                              {(['sucesso', 'falha', 'bloqueado', 'nao_se_aplica', 'cancelado', 'em_execucao'] as const).map(st => (
                                <button
                                  key={st}
                                  onClick={() => {
                                    onUpdateStatus(scenario.id, st, executionObs, executionEvidence || undefined);
                                    setEditingId(null);
                                  }}
                                  className={cn(
                                    "flex items-center justify-center gap-2 p-3 rounded-xl border-2 text-sm font-bold transition-all hover:-translate-y-1",
                                    getEnvStatus(scenario) === st ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 hover:border-slate-200 text-slate-500"
                                  )}
                                >
                                  {st === 'sucesso' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                  {st === 'falha' && <AlertCircle className="w-4 h-4 text-red-500" />}
                                  <span className="capitalize">{st.replace('_', ' ')}</span>
                                </button>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center gap-4 text-slate-400">
            <TestTubes className="w-12 h-12 opacity-20" />
            <p className="font-medium">Nenhum cenário encontrado.</p>
            <button onClick={() => setIsAdding(true)} className="text-blue-600 text-sm font-bold underline underline-offset-4">Comece escrevendo seu primeiro Gherkin</button>
          </div>
        )}
      </div>
    </div>
  );
}

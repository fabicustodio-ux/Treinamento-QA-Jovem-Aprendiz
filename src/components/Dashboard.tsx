import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { Scenario, Bug, TestEnvironment } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Bug as BugIcon,
  Activity,
  FileText,
  TestTubes,
  Award,
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  scenarios: Scenario[];
  bugs: Bug[];
  onNavigate?: (tab: string) => void;
  currentEnvironment: TestEnvironment;
}

const COLORS = {
  sucesso: '#10b981',
  falha: '#ef4444',
  bloqueado: '#f59e0b',
  pendente: '#94a3b8',
  em_execucao: '#3b82f6',
  nao_se_aplica: '#64748b',
  cancelado: '#475569'
};

const BUG_STATUS_COLORS = {
  aberto: '#ef4444',
  corrigido: '#10b981',
  em_validacao: '#3b82f6',
  fechado: '#6366f1',
  reaberto: '#f97316'
};

export function Dashboard({ scenarios, bugs, onNavigate, currentEnvironment }: DashboardProps) {
  const filteredBugs = bugs.filter(b => b.environment === currentEnvironment);
  
  const getEnvStatus = (s: Scenario) => currentEnvironment === 'QA' ? s.statusQA : s.statusHomo;

  const statusData = [
    { name: 'Sucesso', value: scenarios.filter(s => getEnvStatus(s) === 'sucesso').length, color: COLORS.sucesso },
    { name: 'Falha', value: scenarios.filter(s => getEnvStatus(s) === 'falha').length, color: COLORS.falha },
    { name: 'Bloqueado', value: scenarios.filter(s => getEnvStatus(s) === 'bloqueado').length, color: COLORS.bloqueado },
    { name: 'Pendente', value: scenarios.filter(s => getEnvStatus(s) === 'pendente' || getEnvStatus(s) === 'em_execucao').length, color: COLORS.pendente },
  ].filter(i => i.value > 0);

  const bugTypeData = [
    { name: 'Aberto', value: filteredBugs.filter(b => b.status === 'aberto' || b.status === 'reaberto').length, color: BUG_STATUS_COLORS.aberto },
    { name: 'Corrigido', value: filteredBugs.filter(b => b.status === 'corrigido').length, color: BUG_STATUS_COLORS.corrigido },
    { name: 'Em Validação', value: filteredBugs.filter(b => b.status === 'em_validacao').length, color: BUG_STATUS_COLORS.em_validacao },
    { name: 'Fechado', value: filteredBugs.filter(b => b.status === 'fechado').length, color: BUG_STATUS_COLORS.fechado },
  ].filter(i => i.value > 0);

  const classificationData = [
    { name: 'Desenvolvimento', value: filteredBugs.filter(b => b.classification === 'desenvolvimento').length },
    { name: 'Ambiente', value: filteredBugs.filter(b => b.classification === 'ambiente').length },
    { name: 'Massa', value: filteredBugs.filter(b => b.classification === 'massa_de_dados').length },
    { name: 'Execução', value: filteredBugs.filter(b => b.classification === 'erro_de_execucao').length },
    { name: 'Doc', value: filteredBugs.filter(b => b.classification === 'documentacao').length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Métricas de Qualidade ({currentEnvironment})</h2>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
          <Activity className="w-4 h-4 text-green-500" />
          Status em Tempo Real
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-xl"><FileText className="text-blue-600 w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Scenarios</p>
            <p className="text-2xl font-bold text-slate-900">{scenarios.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="bg-green-50 p-3 rounded-xl"><CheckCircle2 className="text-green-600 w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Executados ({currentEnvironment})</p>
            <p className="text-2xl font-bold text-slate-900">{scenarios.filter(s => getEnvStatus(s) === 'sucesso').length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="bg-red-50 p-3 rounded-xl"><XCircle className="text-red-600 w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total de Falhas ({currentEnvironment})</p>
            <p className="text-2xl font-bold text-slate-900">{scenarios.filter(s => getEnvStatus(s) === 'falha').length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="bg-slate-50 p-3 rounded-xl"><Clock className="text-slate-600 w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pendente ({currentEnvironment})</p>
            <p className="text-2xl font-bold text-slate-900">{scenarios.filter(s => getEnvStatus(s) === 'pendente').length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <TestTubes className="w-5 h-5 text-blue-500" />
            Progresso de Testes
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            Distribuição de Bugs por Tipo
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classificationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-200">
        <div className="flex items-center gap-6">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <Award className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Treinamento em Andamento</h3>
            <p className="text-blue-100 text-sm">
              {scenarios.filter(s => getEnvStatus(s) === 'sucesso').length === scenarios.length && scenarios.length > 0 
                ? "Parabéns! Você concluiu todos os cenários neste ambiente."
                : `Você completou ${scenarios.filter(s => getEnvStatus(s) === 'sucesso').length} de ${scenarios.length} cenários no ambiente ${currentEnvironment}.`}
            </p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate?.('certificate')}
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all shadow-lg active:scale-95 shrink-0"
        >
          Visualizar Certificado
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

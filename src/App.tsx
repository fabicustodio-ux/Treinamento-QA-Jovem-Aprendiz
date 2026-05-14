/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Orientation } from './components/Orientation';
import { Requirements } from './components/Requirements';
import { ScenarioManager } from './components/ScenarioManager';
import { BugTracker } from './components/BugTracker';
import { RegistrationForm } from './components/RegistrationForm';
import { Certificate } from './components/Certificate';
import { FinalDelivery } from './components/FinalDelivery';
import { SessionSelector } from './components/SessionSelector';
import { Onboarding } from './components/Onboarding';
import { Scenario, Bug, ExecutionStatus, BugStatus, TestEnvironment, TestStage, SessionData } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Save, Globe, Layers, LogOut } from 'lucide-react';
import { cn } from './lib/utils';

const INITIAL_SCENARIOS: Scenario[] = [
  {
    id: '1',
    title: 'Cadastro com sucesso (Positivo)',
    type: 'positivo',
    statusQA: 'pendente',
    statusHomo: 'pendente',
    gherkin: `Esquema do Cenário: Cadastro realizado com sucesso
Dado que o cliente acessa a tela de cadastro
Quando preencher todos os campos obrigatórios com dados válidos
E aceitar os termos de uso
Então o sistema deve exibir a mensagem "Cadastro realizado com sucesso."`,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Validar CPF menor que 11 dígitos (Negativo)',
    type: 'negativo',
    statusQA: 'pendente',
    statusHomo: 'pendente',
    gherkin: `Cenário: CPF inválido
Dado que o cliente informa um CPF com menos de 11 dígitos
Quando clicar no botão cadastrar
Então o sistema deve exibir a mensagem de erro "CPF inválido ou já cadastrado."`,
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scenarios, setScenarios] = useState<Scenario[]>(INITIAL_SCENARIOS);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [apprenticeName, setApprenticeName] = useState('');
  const [isCertificateUnlocked, setIsCertificateUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [currentEnvironment, setCurrentEnvironment] = useState<TestEnvironment>('QA');
  const [currentStage, setCurrentStage] = useState<TestStage>('Gherkin');
  const [showSavePulse, setShowSavePulse] = useState(false);
  const [sessions, setSessions] = useState<Record<string, SessionData>>({});

  // Load available sessions metadata
  useEffect(() => {
    const savedSessions = localStorage.getItem('qa_sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  // Handle Session Selection
  const handleSelectSession = (name: string) => {
    const session = sessions[name];
    if (session) {
      setApprenticeName(name);
      setScenarios(session.scenarios);
      setBugs(session.bugs);
      setIsDelivered(session.isDelivered);
      setCurrentEnvironment(session.currentEnvironment);
      setCurrentStage(session.currentStage);
      setActiveTab('dashboard');
    }
  };

  const handleCreateSession = (name: string) => {
    if (sessions[name]) {
      alert('Este nome já está sendo usado. Por favor, escolha outro ou selecione na lista.');
      return;
    }
    const newSession: SessionData = {
      name,
      scenarios: INITIAL_SCENARIOS,
      bugs: [],
      isDelivered: false,
      currentEnvironment: 'QA',
      currentStage: 'Gherkin',
      lastUpdate: new Date().toISOString()
    };
    
    const updatedSessions = { ...sessions, [name]: newSession };
    setSessions(updatedSessions);
    localStorage.setItem('qa_sessions', JSON.stringify(updatedSessions));
    
    setApprenticeName(name);
    setScenarios(INITIAL_SCENARIOS);
    setBugs([]);
    setIsDelivered(false);
    setCurrentEnvironment('QA');
    setCurrentStage('Gherkin');
    setActiveTab('onboarding');
  };

  const handleDeleteSession = (name: string) => {
    const updatedSessions = { ...sessions };
    delete updatedSessions[name];
    setSessions(updatedSessions);
    localStorage.setItem('qa_sessions', JSON.stringify(updatedSessions));
    if (apprenticeName === name) {
      setApprenticeName('');
    }
  };

  const saveProgress = () => {
    if (!apprenticeName) return;

    const sessionData: SessionData = {
      name: apprenticeName,
      scenarios,
      bugs,
      isDelivered,
      currentEnvironment,
      currentStage,
      lastUpdate: new Date().toISOString()
    };

    const updatedSessions = { ...sessions, [apprenticeName]: sessionData };
    setSessions(updatedSessions);
    localStorage.setItem('qa_sessions', JSON.stringify(updatedSessions));
    
    setShowSavePulse(true);
    setTimeout(() => setShowSavePulse(false), 2000);
  };

  const logout = () => {
    if (confirm('Deseja salvar o progresso antes de sair?')) {
      saveProgress();
    }
    setApprenticeName('');
    setActiveTab('dashboard');
  };

  const resetTraining = () => {
    if (confirm('Isso apagará todo o seu progresso atual. Deseja continuar?')) {
      setScenarios(INITIAL_SCENARIOS);
      setBugs([]);
      setIsDelivered(false);
      setIsCertificateUnlocked(false);
      setActiveTab('dashboard');
      saveProgress();
    }
  };

  const deliverProject = () => {
    setIsDelivered(true);
    setActiveTab('delivery');
  };

  const addScenario = (scenario: Omit<Scenario, 'id' | 'createdAt' | 'statusQA' | 'statusHomo'>) => {
    const newS: Scenario = {
      ...scenario,
      id: crypto.randomUUID(),
      statusQA: 'pendente',
      statusHomo: 'pendente',
      createdAt: new Date().toISOString()
    };
    setScenarios([...scenarios, newS]);
  };

  const updateScenarioStatus = (id: string, status: ExecutionStatus, observations?: string, evidence?: string) => {
    setScenarios(scenarios.map(s => {
      if (s.id !== id) return s;
      
      if (currentEnvironment === 'QA') {
        return { ...s, statusQA: status, obsQA: observations, evidenceQA: evidence, stageQA: currentStage };
      } else {
        return { ...s, statusHomo: status, obsHomo: observations, evidenceHomo: evidence, stageHomo: currentStage };
      }
    }));
  };

  const deleteScenario = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
    setBugs(bugs.filter(b => b.scenarioId !== id));
  };

  const addBug = (bug: Omit<Bug, 'id' | 'createdAt' | 'environment' | 'stage'>) => {
    const newB: Bug = {
      ...bug,
      id: `BUG-${Math.floor(Math.random() * 10000)}`,
      environment: currentEnvironment,
      stage: currentStage,
      createdAt: new Date().toISOString()
    };
    setBugs([...bugs, newB]);
  };

  const updateBugStatus = (id: string, status: BugStatus) => {
    setBugs(bugs.map(b => b.id === id ? { ...b, status, closedAt: status === 'fechado' ? new Date().toISOString() : undefined } : b));
  };

  const deleteBug = (id: string) => {
    setBugs(bugs.filter(b => b.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard scenarios={scenarios} bugs={bugs} onNavigate={setActiveTab} currentEnvironment={currentEnvironment} />;
      case 'onboarding': return <Onboarding />;
      case 'orientation': return <Orientation />;
      case 'requirements': return <Requirements />;
      case 'scenarios': return (
        <ScenarioManager 
          scenarios={scenarios} 
          onAdd={addScenario} 
          onUpdateStatus={updateScenarioStatus} 
          onDelete={deleteScenario} 
          readOnly={isDelivered}
          currentEnvironment={currentEnvironment}
        />
      );
      case 'bugtracker': return (
        <BugTracker 
          bugs={bugs} 
          scenarios={scenarios} 
          onAdd={addBug} 
          onUpdateStatus={updateBugStatus} 
          onDelete={deleteBug} 
          readOnly={isDelivered}
          currentEnvironment={currentEnvironment}
        />
      );
      case 'qa_env': return (
        <div className="space-y-8">
           <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm flex gap-3">
             <span className="font-bold shrink-0 italic">Aviso de Treinamento:</span>
             Este ambiente contém erros propositais (bugs) conforme os requisitos do projeto. Seu objetivo é identificá-los através dos seus testes e reportá-los no Bug Tracker.
           </div>
           <RegistrationForm mode="QA" readOnly={isDelivered} />
        </div>
      );
      case 'homo_env': return (
        <div className="space-y-8">
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-green-800 text-sm flex gap-3">
             <span className="font-bold shrink-0">Homologação:</span>
             Ambiente estável para validação final. Aqui o sistema deve se comportar exatamente como definido nas Regras de Negócio.
           </div>
          <RegistrationForm mode="HOMO" readOnly={isDelivered} />
        </div>
      );
      case 'certificate': 
        if (!isCertificateUnlocked) {
          return (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl max-w-md w-full space-y-6 text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800">Área Restrita</h3>
                  <p className="text-sm text-slate-500">Informe a senha de mentoria para gerar seu certificado.</p>
                </div>
                <div className="space-y-4">
                  <input 
                    type="password"
                    placeholder="Senha"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (passwordInput === 'JuntosSomosMaisFortes') {
                          setIsCertificateUnlocked(true);
                        } else {
                          setPasswordError(true);
                        }
                      }
                    }}
                    className={cn(
                      "w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-center font-bold tracking-widest",
                      passwordError ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
                    )}
                  />
                  {passwordError && <p className="text-xs font-bold text-red-500">Senha incorreta. Tente novamente.</p>}
                  <button 
                    onClick={() => {
                      if (passwordInput === 'JuntosSomosMaisFortes') {
                        setIsCertificateUnlocked(true);
                      } else {
                        setPasswordError(true);
                      }
                    }}
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    Acessar Certificado
                  </button>
                </div>
              </div>
            </div>
          );
        }
        return <Certificate apprenticeName={apprenticeName} />;
      case 'delivery': return (
        <FinalDelivery 
          scenarios={scenarios} 
          bugs={bugs} 
          isDelivered={isDelivered} 
          onDeliver={deliverProject}
          apprenticeName={apprenticeName}
        />
      );
      default: return null;
    }
  };

  if (!apprenticeName) {
    return (
      <SessionSelector 
        sessions={Object.values(sessions)} 
        onSelect={handleSelectSession} 
        onCreate={handleCreateSession}
        onDelete={handleDeleteSession}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        apprenticeName={apprenticeName}
        setApprenticeName={setApprenticeName}
        onReset={resetTraining}
        onLogout={logout}
        currentEnvironment={currentEnvironment}
        setCurrentEnvironment={setCurrentEnvironment}
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
        onSave={saveProgress}
        showSavePulse={showSavePulse}
      />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}


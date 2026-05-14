export type TestEnvironment = 'QA' | 'HOMO';

export type TestStage = 
  | 'Gherkin' 
  | 'Execução' 
  | 'Reteste' 
  | 'Homologação' 
  | 'Aprovação';

export interface ProjectMetadata {
  isDelivered: boolean;
  deliveryDate?: string;
  apprenticeName: string;
}

export interface SessionData {
  name: string;
  scenarios: Scenario[];
  bugs: Bug[];
  isDelivered: boolean;
  currentEnvironment: TestEnvironment;
  currentStage: TestStage;
  lastUpdate: string;
}

export type TestType = 'positivo' | 'negativo' | 'regressivo';

export type ExecutionStatus = 
  | 'pendente'
  | 'em_execucao'
  | 'sucesso'
  | 'falha'
  | 'bloqueado'
  | 'nao_se_aplica'
  | 'cancelado';

export type BugStatus = 'aberto' | 'corrigido' | 'em_validacao' | 'fechado' | 'reaberto';

export type BugClassification = 
  | 'desenvolvimento'
  | 'ambiente'
  | 'massa_de_dados'
  | 'erro_de_execucao'
  | 'documentacao';

export interface Scenario {
  id: string;
  title: string;
  gherkin: string;
  type: TestType;
  statusQA: ExecutionStatus;
  statusHomo: ExecutionStatus;
  evidenceQA?: string;
  evidenceHomo?: string;
  obsQA?: string;
  obsHomo?: string;
  stageQA?: TestStage;
  stageHomo?: TestStage;
  createdAt: string;
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  classification: BugClassification;
  responsible: string;
  scenarioId: string;
  status: BugStatus;
  environment: TestEnvironment;
  stage: TestStage;
  createdAt: string;
  closedAt?: string;
  evidence?: string;
}

export interface Customer {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate?: string;
  acceptPromotions: boolean;
  createdAt: string;
}

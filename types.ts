
export enum Severity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface Vulnerability {
  id: string;
  title: string;
  severity: Severity;
  category: string;
  description: string;
  attackerLogic: string;
  defenderLogic: string;
  simulatedPayload: string;
  impact: string;
  riskScore: number;
  confidence: number;
  secureCodeFix: string;
  vulnerableCodeSnippet: string;
  killChainStage: string;
}

export interface SecurityReport {
  id: string;
  projectId: string;
  timestamp: string;
  overallScore: number;
  vulnerabilities: Vulnerability[];
  maturityScore: number;
}

export interface Project {
  id: string;
  name: string;
  owner: string;
  lastAnalysis: string;
  status: AnalysisStatus;
  riskTrend: number[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  onboarded: boolean;
}

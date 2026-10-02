export type GradeLevel = 'tieuhoc' | 'thcs' | 'thpt';

export type AppTab = 'map' | 'quiz' | 'flowchart' | 'cooperation' | 'chat';

export interface StudentProfile {
  name: string;
  school: string;
  className: string;
  gradeLevel: GradeLevel;
  coins: number;
  title: string;
  progress: number; // 0 - 100
  answeredQuestions: Record<string, boolean>; // questionId -> isCorrect
  completedStations: number[];
  visitedMarkers: string[];
  readFlowchartSteps: string[];
}

export type MarkerCategory = 'sovereignty' | 'ports' | 'cooperation' | 'resources';

export interface MapMarkerItem {
  id: string;
  name: string;
  sovereigntyNotice?: string;
  category: MarkerCategory;
  lat: number;
  lng: number;
  subtitle: string;
  description: string;
  badge: string;
  details: {
    geography: string;
    legalStatus: string;
    economicPotential: string;
    peacefulCooperation: string;
    keyFacts: string[];
  };
  iconType: 'island' | 'port' | 'handshake' | 'oil' | 'lighthouse';
}

export interface Question {
  id: string;
  stationId: number;
  stationName: string;
  lighthouseName: string;
  gradeLevel: 'all' | 'thcs' | 'thpt';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  kienSangHint: string;
  textbookRef: string;
}

export interface FlowchartStep {
  id: string;
  column: 1 | 2 | 3; // 1: Legal & Principles, 2: Priority Fields, 3: Vietnam Action
  stepNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  details: string;
  legalBasisOrExample: string;
  keyPoints: string[];
  icon: string;
  tag: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'kiensang';
  text: string;
  timestamp: string;
  suggestions?: string[];
  reference?: string;
}

export interface TitleBadge {
  id: string;
  title: string;
  requiredCoins: number;
  requiredProgress: number;
  icon: string;
  description: string;
}

export interface CaptainCardStatement {
  statement: string;
  is_correct: boolean;
  explanation: string;
}

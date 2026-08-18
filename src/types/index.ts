import { openAiModels } from "../settings";

export type Role = "user" | "assistant";

export type OpenAIModels = (typeof openAiModels)[number];

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: string;
}

export interface Recommendation {
  roleTitle: string;
  matchLevel: number;
  reason: string;
  modality: string;
  availability: string;
}

export interface CandidateData {
  skills: string[];
  yearsOfExperience: number;
  availability: string;
  targetVacancy: string;
  preferredModality: string | null;
  canStart: string | null;
  salaryRange: string | null;
  timezoneOrLocation: string | null;
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  recommendations?: Recommendation[] | null;
  candidateData?: CandidateData | null;
  timestamp: string;
  model?: string;
}

export interface ChatResponseDTO {
  reply: string;
  candidateData: CandidateData;
  recommendations: Recommendation[];
}

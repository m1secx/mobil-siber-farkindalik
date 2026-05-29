export type EducationModuleLevel = 'beginner' | 'intermediate';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface EducationModule {
  id: string;
  title: string;
  description: string;
  level: EducationModuleLevel;
  durationMinutes: number;
  content: string[];
  quiz: QuizQuestion[];
}

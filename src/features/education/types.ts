export type ModuleDifficulty = 'beginner' | 'intermediate';

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
};

export type EducationContentSection = {
  id: string;
  title: string;
  body: string;
};

export type EducationModule = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: ModuleDifficulty;
  contentSections: EducationContentSection[];
  quizQuestions: QuizQuestion[];
};

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
  video?: {
    title: string;
    youtubeVideoId?: string;
    youtubeUrl?: string;
    description: string;
  };
  contentSections: EducationContentSection[];
  quizQuestions: QuizQuestion[];
};

export type QuizReviewItem = {
  questionId: string;
  questionText: string;
  selectedOptionId: string | null;
  selectedOptionText: string;
  correctOptionId: string;
  correctOptionText: string;
  isCorrect: boolean;
  isAnswered: boolean;
  explanation?: string;
};

export type QuizReviewSummary = {
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  scorePercent: number;
};

export type QuizReviewResult = {
  items: QuizReviewItem[];
  summary: QuizReviewSummary;
};

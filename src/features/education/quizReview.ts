import type { QuizQuestion, QuizReviewItem, QuizReviewResult } from './types';

export type QuizAnswersMap = Record<string, string>;

const isQuizAnswersMap = (value: unknown): value is QuizAnswersMap => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((item) => typeof item === 'string');
};

export function serializeQuizAnswers(answers: QuizAnswersMap): string {
  return encodeURIComponent(JSON.stringify(answers));
}

export function parseQuizAnswersParam(value: string | string[] | undefined | null): QuizAnswersMap {
  const normalizedValue = Array.isArray(value) ? value[0] : value;

  if (!normalizedValue) {
    return {};
  }

  try {
    const parsedValue = JSON.parse(decodeURIComponent(normalizedValue)) as unknown;

    if (!isQuizAnswersMap(parsedValue)) {
      return {};
    }

    return parsedValue;
  } catch {
    return {};
  }
}

export function buildQuizReview(
  questions: QuizQuestion[],
  answers: QuizAnswersMap
): QuizReviewResult {
  const items: QuizReviewItem[] = questions.map((question) => {
    const selectedOptionId = answers[question.id] ?? null;
    const selectedOption = question.options.find((option) => option.id === selectedOptionId);
    const correctOption = question.options.find((option) => option.id === question.correctOptionId);
    const isAnswered = selectedOptionId !== null;
    const isCorrect = selectedOptionId === question.correctOptionId;

    let selectedOptionText = 'Cevaplanmadı';

    if (isAnswered) {
      selectedOptionText = selectedOption ? selectedOption.text : 'Geçersiz cevap';
    }

    return {
      questionId: question.id,
      questionText: question.question,
      selectedOptionId,
      selectedOptionText,
      correctOptionId: question.correctOptionId,
      correctOptionText: correctOption?.text ?? 'Doğru cevap bulunamadı',
      isCorrect,
      isAnswered,
      explanation: question.explanation,
    };
  });

  const totalQuestions = items.length;
  const correctCount = items.filter((item) => item.isCorrect).length;
  const unansweredCount = items.filter((item) => !item.isAnswered).length;
  const wrongCount = totalQuestions - correctCount - unansweredCount;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return {
    items,
    summary: {
      totalQuestions,
      correctCount,
      wrongCount,
      unansweredCount,
      scorePercent,
    },
  };
}

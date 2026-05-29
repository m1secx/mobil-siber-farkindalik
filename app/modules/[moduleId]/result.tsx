import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';

import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { Button } from '@/src/components/ui/Button';
import { theme } from '@/src/theme';
import { getEducationModuleById } from '@/src/features/education';

function parseAnswers(raw: string | undefined): Record<string, string> | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
      const result: Record<string, string> = {};
      for (const key of Object.keys(parsed)) {
        if (typeof parsed[key] === 'string') {
          result[key] = parsed[key];
        }
      }
      return Object.keys(result).length > 0 ? result : undefined;
    }
  } catch {
    // ignore parse errors
  }
  return undefined;
}

export default function QuizResultScreen() {
  const router = useRouter();
  const { moduleId, score, total, answers } = useLocalSearchParams<{
    moduleId: string;
    score: string;
    total: string;
    answers?: string;
  }>();

  const module = moduleId ? getEducationModuleById(moduleId) : undefined;
  const scoreNum = score ? parseInt(score, 10) : NaN;
  const totalNum = total ? parseInt(total, 10) : NaN;
  const parsedAnswers = parseAnswers(answers);

  const isValid =
    module !== undefined &&
    !isNaN(scoreNum) &&
    !isNaN(totalNum) &&
    totalNum > 0 &&
    scoreNum >= 0 &&
    scoreNum <= totalNum;

  const percentage = isValid ? Math.round((scoreNum / totalNum) * 100) : 0;

  function getFeedback(percent: number): string {
    if (percent >= 80) return 'Harika! Siber güvenlik konusunda güçlü bir farkındalığınız var.';
    if (percent >= 50) return 'İyi gidiyorsunuz. Biraz daha pratik yaparak kendinizi geliştirebilirsiniz.';
    return 'Bu konuyu tekrar gözden geçirmeniz faydalı olacaktır.';
  }

  if (!isValid) {
    return (
      <ScreenContainer contentContainerStyle={styles.container} scroll>
        <View style={styles.errorContent}>
          <Text style={styles.errorTitle}>Sonuç bilgisi bulunamadı.</Text>
          <Button text="Geri Dön" onPress={() => router.back()} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer contentContainerStyle={styles.container} scroll>
      <SectionHeader
        style={styles.header}
        subtitle="Quiz tamamlandı"
        title={module.title}
      />

      <View style={styles.resultCard}>
        <Text style={styles.scoreLabel}>Sonucunuz</Text>
        <Text style={styles.scoreValue}>
          {scoreNum} / {totalNum}
        </Text>
        <Text style={styles.percentage}>{percentage}%</Text>
        <Text style={styles.feedback}>{getFeedback(percentage)}</Text>
      </View>

      {parsedAnswers ? (
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Soru İncelemesi</Text>
          {module.quiz.map((question, qIndex) => {
            const selectedOptionId = parsedAnswers[question.id];
            const isCorrect = selectedOptionId === question.correctOptionId;
            const selectedOption = question.options.find(
              (o) => o.id === selectedOptionId
            );
            const correctOption = question.options.find(
              (o) => o.id === question.correctOptionId
            );

            return (
              <View key={question.id} style={styles.reviewCard}>
                <Text style={styles.reviewQuestionNumber}>
                  Soru {qIndex + 1}
                </Text>
                <Text style={styles.reviewQuestionText}>
                  {question.question}
                </Text>

                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>Seçiminiz:</Text>
                  <Text
                    style={[
                      styles.answerValue,
                      selectedOptionId === undefined
                        ? styles.answerMissing
                        : isCorrect
                          ? styles.answerCorrect
                          : styles.answerIncorrect,
                    ]}>
                    {selectedOption?.text ?? 'Cevaplanmadı'}
                  </Text>
                </View>

                {correctOption && (
                  <View style={styles.answerRow}>
                    <Text style={styles.answerLabel}>Doğru cevap:</Text>
                    <Text style={[styles.answerValue, styles.answerCorrect]}>
                      {correctOption.text}
                    </Text>
                  </View>
                )}

                <Text style={styles.reviewExplanation}>
                  {question.explanation}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <Text style={styles.fallbackText}>
          Soru inceleme bilgisi okunamadı.
        </Text>
      )}

      <View style={styles.actions}>
        <Button
          text="Modüle Dön"
          onPress={() =>
            router.push(`/modules/${module.id}` as Href)
          }
        />
        <Button
          text="Eğitimlere Dön"
          onPress={() => router.push('/(tabs)/two' as Href)}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  resultCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  scoreLabel: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  scoreValue: {
    color: theme.colors.textPrimary,
    ...theme.typography.title,
  },
  percentage: {
    color: theme.colors.primary,
    ...theme.typography.subtitle,
  },
  feedback: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  reviewSection: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  reviewTitle: {
    color: theme.colors.textPrimary,
    ...theme.typography.subtitle,
    marginBottom: theme.spacing.sm,
  },
  reviewCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  reviewQuestionNumber: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  reviewQuestionText: {
    color: theme.colors.textPrimary,
    ...theme.typography.subtitle,
  },
  answerRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  answerLabel: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  answerValue: {
    ...theme.typography.body,
  },
  answerCorrect: {
    color: theme.colors.success,
  },
  answerIncorrect: {
    color: theme.colors.error,
  },
  answerMissing: {
    color: theme.colors.textTertiary,
  },
  reviewExplanation: {
    color: theme.colors.textSecondary,
    ...theme.typography.caption,
    marginTop: theme.spacing.xs,
    lineHeight: 20,
  },
  actions: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  errorTitle: {
    color: theme.colors.textPrimary,
    ...theme.typography.subtitle,
  },
  fallbackText: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
});

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';

import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { Button } from '@/src/components/ui/Button';
import { theme } from '@/src/theme';
import { getEducationModuleById } from '@/src/features/education';

export default function QuizScreen() {
  const router = useRouter();
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();

  const module = moduleId ? getEducationModuleById(moduleId) : undefined;

  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!module) {
    return (
      <ScreenContainer contentContainerStyle={styles.container} scroll>
        <View style={styles.errorContent}>
          <Text style={styles.errorTitle}>Modül bulunamadı.</Text>
          <Button text="Geri Dön" onPress={() => router.back()} />
        </View>
      </ScreenContainer>
    );
  }

  const allAnswered = module.quiz.every((q) => answers[q.id] !== undefined);

  const correctCount = module.quiz.reduce((count, q) => {
    return answers[q.id] === q.correctOptionId ? count + 1 : count;
  }, 0);

  function handleSelectOption(questionId: string, optionId: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }

  return (
    <ScreenContainer contentContainerStyle={styles.container} scroll>
      <SectionHeader
        style={styles.header}
        subtitle={`${module.quiz.length} soru`}
        title={`${module.title} — Quiz`}
      />

      <View style={styles.list}>
        {module.quiz.map((question, qIndex) => (
          <View key={question.id} style={styles.questionCard}>
            <Text style={styles.questionNumber}>
              Soru {qIndex + 1}
            </Text>
            <Text style={styles.questionText}>{question.question}</Text>

            <View style={styles.options}>
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option.id;
                return (
                  <Pressable
                    key={option.id}
                    onPress={() =>
                      handleSelectOption(question.id, option.id)
                    }
                    style={[
                      styles.option,
                      isSelected && styles.optionSelected,
                    ]}>
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}>
                      {option.text}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {answers[question.id] && (
              <Text
                style={[
                  styles.explanation,
                  answers[question.id] === question.correctOptionId
                    ? styles.explanationCorrect
                    : styles.explanationIncorrect,
                ]}>
                {question.explanation}
              </Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        {!allAnswered && (
          <Text style={styles.hintText}>
            Sonucu görmek için tüm soruları cevaplayın.
          </Text>
        )}

        <Button
          text="Sonucu Gör"
          disabled={!allAnswered}
          onPress={() => {
            const score = module.quiz.reduce((count, q) => {
              return answers[q.id] === q.correctOptionId ? count + 1 : count;
            }, 0);
            router.push(
              `/modules/${module.id}/result?score=${score}&total=${module.quiz.length}&answers=${encodeURIComponent(JSON.stringify(answers))}` as Href
            );
          }}
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
  list: {
    gap: theme.spacing.lg,
  },
  questionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  questionNumber: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  questionText: {
    color: theme.colors.textPrimary,
    ...theme.typography.subtitle,
  },
  options: {
    gap: theme.spacing.sm,
  },
  option: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  optionSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
  },
  optionText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  optionTextSelected: {
    color: theme.colors.primary,
    ...theme.typography.body,
  },
  explanation: {
    ...theme.typography.caption,
    marginTop: theme.spacing.xs,
    lineHeight: 20,
  },
  explanationCorrect: {
    color: theme.colors.success,
  },
  explanationIncorrect: {
    color: theme.colors.error,
  },
  footer: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xl,
  },
  hintText: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
    textAlign: 'center',
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
});

import { Stack, type Href, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { educationModules } from '@/src/features/education/modules';
import { theme } from '@/src/theme';

export default function ModuleQuizScreen() {
  const router = useRouter();
  const { moduleId } = useLocalSearchParams<{ moduleId?: string | string[] }>();
  const normalizedModuleId = Array.isArray(moduleId) ? moduleId[0] : moduleId;
  const module = educationModules.find((item) => item.id === normalizedModuleId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!module) {
    return (
      <ScreenContainer contentContainerStyle={styles.container}>
        <Stack.Screen options={{ title: 'Quiz' }} />

        <SectionHeader
          style={styles.header}
          title="Quiz bulunamadı"
          subtitle="Bu modüle ait quiz bulunamadı veya modül kaldırılmış olabilir."
        />

        <Card style={styles.card}>
          <Text style={styles.description}>
            Eğitimler listesine dönerek başka bir modül seçebilirsiniz.
          </Text>
        </Card>

        <Button
          onPress={() => router.push('/(tabs)/two' as Href)}
          style={styles.button}
          text="Eğitimlere Dön"
        />
      </ScreenContainer>
    );
  }

  const totalQuestions = module.quizQuestions.length;
  const currentQuestion = module.quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleNext = () => {
    if (!selectedOptionId) {
      return;
    }

    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: selectedOptionId,
    };

    setAnswers(nextAnswers);

    if (isLastQuestion) {
      const score = module.quizQuestions.reduce((total, question) => {
        return total + (nextAnswers[question.id] === question.correctOptionId ? 1 : 0);
      }, 0);

      router.push(`/modules/${module.id}/result?score=${score}&total=${totalQuestions}` as Href);
      return;
    }

    setCurrentQuestionIndex((previous) => previous + 1);
    setSelectedOptionId(null);
  };

  return (
    <ScreenContainer
      contentContainerStyle={styles.container}
      scroll
      scrollProps={{ showsVerticalScrollIndicator: false }}>
      <Stack.Screen options={{ title: 'Quiz' }} />

      <SectionHeader
        style={styles.header}
        title={module.title}
        subtitle={`Soru ${currentQuestionIndex + 1} / ${totalQuestions}`}
      />

      <Card style={styles.card}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        <View style={styles.options}>
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <Pressable
                key={option.id}
                onPress={() => setSelectedOptionId(option.id)}
                style={({ pressed }) => [
                  styles.option,
                  isSelected && styles.optionSelected,
                  pressed && styles.optionPressed,
                ]}>
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option.text}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Button
        disabled={!selectedOptionId}
        onPress={handleNext}
        style={styles.button}
        text={isLastQuestion ? 'Sonucu Gör' : 'Sonraki Soru'}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  card: {
    gap: theme.spacing.lg,
  },
  description: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  questionText: {
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  options: {
    gap: theme.spacing.md,
  },
  option: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  optionSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  optionPressed: {
    opacity: 0.9,
  },
  optionText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  optionTextSelected: {
    color: theme.colors.textPrimary,
  },
  button: {
    marginTop: theme.spacing.xl,
  },
});

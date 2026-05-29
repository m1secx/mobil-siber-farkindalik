import { Stack, type Href, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import {
  buildQuizReview,
  getEducationModuleById,
  parseQuizAnswersParam,
} from '@/src/features/education';
import { theme } from '@/src/theme';

const parseNumberParam = (value: string | string[] | undefined) => {
  const normalizedValue = Array.isArray(value) ? value[0] : value;
  const parsedValue = Number(normalizedValue);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return 0;
  }

  return parsedValue;
};

export default function ModuleResultScreen() {
  const router = useRouter();
  const { moduleId, score, total, answers } = useLocalSearchParams<{
    moduleId?: string | string[];
    score?: string | string[];
    total?: string | string[];
    answers?: string | string[];
  }>();

  const normalizedModuleId = Array.isArray(moduleId) ? moduleId[0] : moduleId;
  const module = normalizedModuleId ? getEducationModuleById(normalizedModuleId) : undefined;
  const parsedAnswers = parseQuizAnswersParam(answers);
  const safeScore = parseNumberParam(score);
  const safeTotal = parseNumberParam(total);

  let feedback = 'Bu modülü tekrar gözden geçirmek faydalı olabilir.';

  if (!module) {
    return (
      <ScreenContainer contentContainerStyle={styles.container}>
        <Stack.Screen options={{ title: 'Sonuç' }} />

        <SectionHeader
          style={styles.header}
          title="Sonuç bulunamadı"
          subtitle="Bu quiz sonucu görüntülenemiyor."
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

  const review = buildQuizReview(module.quizQuestions, parsedAnswers);
  const resolvedTotal = safeTotal || review.summary.totalQuestions;
  const percentage = resolvedTotal > 0 ? Math.round((safeScore / resolvedTotal) * 100) : 0;

  if (percentage >= 80) {
    feedback = 'Harika! Bu konuda oldukça iyi görünüyorsun.';
  } else if (percentage >= 50) {
    feedback = 'İyi gidiyorsun. Birkaç noktayı tekrar etmek faydalı olabilir.';
  }

  return (
    <ScreenContainer
      contentContainerStyle={styles.container}
      scroll
      scrollProps={{ showsVerticalScrollIndicator: false }}>
      <Stack.Screen options={{ title: 'Sonuç' }} />

      <SectionHeader style={styles.header} title="Quiz Tamamlandı" subtitle={module.title} />

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Sonuç Özeti</Text>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Skor</Text>
          <Text style={styles.metricValue}>
            {safeScore} / {resolvedTotal} doğru
          </Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Başarı Oranı</Text>
          <Text style={styles.metricValue}>%{percentage}</Text>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Geri Bildirim</Text>
        <Text style={styles.description}>{feedback}</Text>
      </Card>

      <View style={styles.reviewSection}>
        {review.items.map((item, index) => {
          const statusLabel = item.isAnswered
            ? item.isCorrect
              ? 'Doğru'
              : 'Yanlış'
            : 'Cevaplanmadı';
          const statusStyle = item.isAnswered
            ? item.isCorrect
              ? styles.statusSuccess
              : styles.statusError
            : styles.statusMuted;

          return (
            <Card key={item.questionId} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}>Soru {index + 1}</Text>
                <View style={[styles.statusBadge, statusStyle]}>
                  <Text style={[styles.statusText, statusStyle]}>{statusLabel}</Text>
                </View>
              </View>

              <Text style={styles.questionText}>{item.questionText}</Text>

              <View style={styles.answerBlock}>
                <Text style={styles.answerLabel}>Senin cevabın</Text>
                <Text style={styles.answerText}>{item.selectedOptionText}</Text>
              </View>

              <View style={styles.answerBlock}>
                <Text style={styles.answerLabel}>Doğru cevap</Text>
                <Text style={styles.answerText}>{item.correctOptionText}</Text>
              </View>

              {item.explanation ? (
                <View style={styles.answerBlock}>
                  <Text style={styles.answerLabel}>Açıklama</Text>
                  <Text style={styles.explanationText}>{item.explanation}</Text>
                </View>
              ) : null}
            </Card>
          );
        })}
      </View>

      <View style={styles.actions}>
        <Button
          onPress={() => router.push('/(tabs)/two' as Href)}
          style={styles.button}
          text="Eğitimlere Dön"
        />
        <Button
          onPress={() => router.push(`/modules/${module.id}` as Href)}
          style={styles.button}
          text="Modüle Dön"
        />
      </View>
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
    gap: theme.spacing.md,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  description: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  metricLabel: {
    flex: 1,
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  metricValue: {
    color: theme.colors.textPrimary,
    ...theme.typography.caption,
  },
  reviewSection: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  reviewCard: {
    gap: theme.spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  reviewTitle: {
    flex: 1,
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  statusText: {
    ...theme.typography.caption,
  },
  statusSuccess: {
    backgroundColor: '#E7F8F4',
    color: theme.colors.success,
  },
  statusError: {
    backgroundColor: '#FDECEA',
    color: theme.colors.error,
  },
  statusMuted: {
    backgroundColor: theme.colors.background,
    color: theme.colors.textTertiary,
  },
  questionText: {
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  answerBlock: {
    gap: theme.spacing.xs,
  },
  answerLabel: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  answerText: {
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  explanationText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  actions: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  button: {
    width: '100%',
  },
});

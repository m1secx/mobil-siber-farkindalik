import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';

import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { Button } from '@/src/components/ui/Button';
import { theme } from '@/src/theme';
import { getEducationModuleById } from '@/src/features/education';

export default function QuizResultScreen() {
  const router = useRouter();
  const { moduleId, score, total } = useLocalSearchParams<{
    moduleId: string;
    score: string;
    total: string;
  }>();

  const module = moduleId ? getEducationModuleById(moduleId) : undefined;
  const scoreNum = score ? parseInt(score, 10) : NaN;
  const totalNum = total ? parseInt(total, 10) : NaN;

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
  actions: {
    gap: theme.spacing.md,
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

import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';

import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { Button } from '@/src/components/ui/Button';
import { theme } from '@/src/theme';
import { getEducationModuleById } from '@/src/features/education';

export default function ModuleDetailScreen() {
  const router = useRouter();
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();

  const module = moduleId ? getEducationModuleById(moduleId) : undefined;

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

  return (
    <ScreenContainer contentContainerStyle={styles.container} scroll>
      <SectionHeader
        style={styles.header}
        subtitle={module.description}
        title={module.title}
      />

      <View style={styles.metaRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {module.level === 'beginner' ? 'Başlangıç' : 'Orta'}
          </Text>
        </View>
        <Text style={styles.metaText}>
          {module.durationMinutes} dk • {module.quiz.length} soru
        </Text>
      </View>

      <View style={styles.contentSection}>
        {module.content.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </View>

      <View style={styles.quizSection}>
        <Button
          text="Quiz'e Başla"
          onPress={() =>
            router.push(`/modules/${module.id}/quiz` as Href)
          }
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  badge: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  badgeText: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  metaText: {
    color: theme.colors.textSecondary,
    ...theme.typography.caption,
  },
  contentSection: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  paragraph: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
    lineHeight: 24,
  },
  quizSection: {
    gap: theme.spacing.sm,
    marginTop: 'auto',
  },
  quizHint: {
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

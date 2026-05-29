import { type Href, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { educationModules } from '@/src/features/education';
import { theme } from '@/src/theme';

const difficultyLabels = {
  beginner: 'Başlangıç',
  intermediate: 'Orta',
} as const;

export default function TrainingsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer
      contentContainerStyle={styles.container}
      scroll
      scrollProps={{ showsVerticalScrollIndicator: false }}>
      <SectionHeader
        style={styles.header}
        title="Eğitimler"
        subtitle="Siber güvenlik farkındalığını artıracak kısa eğitim içerikleri burada yer alacak."
      />

      <View style={styles.content}>
        {educationModules.map((module) => (
          <Pressable
            key={module.id}
            onPress={() => router.push(`/modules/${module.id}` as Href)}
            style={({ pressed }) => [styles.pressable, pressed && styles.pressablePressed]}>
            <Card style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{module.title}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{difficultyLabels[module.difficulty]}</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>{module.description}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{module.durationMinutes} dk</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{module.quizQuestions.length} soru</Text>
              </View>
            </Card>
          </Pressable>
        ))}
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
  content: {
    gap: theme.spacing.md,
  },
  pressable: {
    borderRadius: 12,
  },
  pressablePressed: {
    opacity: 0.9,
  },
  card: {
    gap: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  cardTitle: {
    flex: 1,
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  badge: {
    borderRadius: 999,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  badgeText: {
    color: theme.colors.primary,
    ...theme.typography.caption,
  },
  cardDescription: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  metaText: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  metaDot: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
});

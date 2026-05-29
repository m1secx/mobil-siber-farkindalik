import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter, type Href } from 'expo-router';

import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { theme } from '@/src/theme';
import { educationModules } from '@/src/features/education';

export default function TrainingsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer contentContainerStyle={styles.container} scroll>
      <SectionHeader
        style={styles.header}
        subtitle="Siber güvenlik konularında kendinizi geliştirin."
        title="Eğitimler"
      />

      <View style={styles.list}>
        {educationModules.map((module) => (
          <Pressable
            key={module.id}
            accessibilityRole="button"
            onPress={() =>
              router.push(`/modules/${module.id}` as Href)
            }
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{module.title}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {module.level === 'beginner' ? 'Başlangıç' : 'Orta'}
                </Text>
              </View>
            </View>
            <Text style={styles.cardDescription}>{module.description}</Text>
            <View style={styles.cardMeta}>
              <Text style={styles.metaText}>{module.durationMinutes} dk</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{module.quiz.length} soru</Text>
            </View>
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
  list: {
    gap: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  cardTitle: {
    flex: 1,
    color: theme.colors.textPrimary,
    ...theme.typography.subtitle,
  },
  cardDescription: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  metaText: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  metaDot: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
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
});

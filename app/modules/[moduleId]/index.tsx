import { Stack, type Href, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { getEducationModuleById } from '@/src/features/education';
import { getScenarioByModuleId } from '@/src/features/scenarios';
import { theme } from '@/src/theme';

const difficultyLabels = {
  beginner: 'Başlangıç',
  intermediate: 'Orta',
} as const;

export default function ModuleDetailScreen() {
  const router = useRouter();
  const { moduleId } = useLocalSearchParams<{ moduleId?: string | string[] }>();
  const normalizedModuleId = Array.isArray(moduleId) ? moduleId[0] : moduleId;
  const module = normalizedModuleId ? getEducationModuleById(normalizedModuleId) : undefined;
  const scenario = normalizedModuleId ? getScenarioByModuleId(normalizedModuleId) : undefined;

  if (!module) {
    return (
      <ScreenContainer contentContainerStyle={styles.container}>
        <Stack.Screen options={{ title: 'Eğitim Detayı' }} />

        <SectionHeader
          style={styles.header}
          title="Modül bulunamadı"
          subtitle="Bu eğitim modülü mevcut değil veya kaldırılmış olabilir."
        />

        <Card style={styles.card}>
          <Text style={styles.description}>
            Eğitimler listesine dönerek kullanılabilir modülleri yeniden inceleyebilirsiniz.
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

  return (
    <ScreenContainer
      contentContainerStyle={styles.container}
      scroll
      scrollProps={{ showsVerticalScrollIndicator: false }}>
      <Stack.Screen options={{ title: 'Eğitim Detayı' }} />

      <SectionHeader style={styles.header} title={module.title} subtitle={module.description} />

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Modül Özeti</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Süre</Text>
          <Text style={styles.metaValue}>{module.durationMinutes} dk</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Zorluk</Text>
          <Text style={styles.metaValue}>{difficultyLabels[module.difficulty]}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Quiz</Text>
          <Text style={styles.metaValue}>{module.quizQuestions.length} soru</Text>
        </View>
      </Card>

      {module.video ? (
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>{module.video.title}</Text>
          <Text style={styles.bodyText}>{module.video.description}</Text>
          <Text style={styles.noteText}>Video içeriği yakında uygulama içinde gösterilecek.</Text>
        </Card>
      ) : null}

      <View style={styles.sections}>
        {module.contentSections.map((section) => (
          <Card key={section.id} style={styles.card}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            <Text style={styles.bodyText}>{section.body}</Text>
          </Card>
        ))}
      </View>

      {scenario ? (
        <Button
          onPress={() => router.push(`/modules/${module.id}/scenario` as Href)}
          style={styles.button}
          text="Senaryoyu Başlat"
        />
      ) : null}

      <Button
        onPress={() => router.push(`/modules/${module.id}/quiz` as Href)}
        style={styles.button}
        text="Quiz’i Başlat"
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
  sections: {
    gap: theme.spacing.md,
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  metaLabel: {
    flex: 1,
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  metaValue: {
    color: theme.colors.textPrimary,
    ...theme.typography.caption,
  },
  bodyText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  noteText: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  button: {
    marginTop: theme.spacing.xl,
  },
});

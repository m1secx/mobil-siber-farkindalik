import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';

import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { Button } from '@/src/components/ui/Button';
import { theme } from '@/src/theme';
import { getEducationModuleById } from '@/src/features/education';
import { getMailboxScenario } from '@/src/features/scenarios';

export default function ScenarioScreen() {
  const router = useRouter();
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();

  const module = moduleId ? getEducationModuleById(moduleId) : undefined;
  const scenario = getMailboxScenario();
  const [selectedEmailId, setSelectedEmailId] = useState<string | undefined>(
    undefined
  );

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

  if (module.id !== 'phishing-awareness') {
    return (
      <ScreenContainer contentContainerStyle={styles.container} scroll>
        <View style={styles.errorContent}>
          <Text style={styles.errorTitle}>
            Bu modül için senaryo bulunmuyor.
          </Text>
          <Button
            text="Modüle Dön"
            onPress={() =>
              router.push(`/modules/${module.id}` as Href)
            }
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer contentContainerStyle={styles.container} scroll>
      <SectionHeader
        style={styles.header}
        subtitle={scenario.description}
        title={scenario.title}
      />

      <View style={styles.list}>
        {scenario.emails.map((email) => {
          const isSelected = selectedEmailId === email.id;
          const preview = email.body.split('\n')[0].slice(0, 60);

          return (
            <Pressable
              key={email.id}
              accessibilityRole="button"
              onPress={() => setSelectedEmailId(email.id)}
              style={({ pressed }) => [
                styles.card,
                isSelected && styles.cardSelected,
                pressed && styles.cardPressed,
              ]}>
              <View style={styles.cardHeader}>
                <View style={styles.senderInfo}>
                  <Text style={styles.senderName}>{email.sender}</Text>
                  <Text style={styles.senderEmail}>{email.senderEmail}</Text>
                </View>
                <Text style={styles.receivedAt}>{email.receivedAt}</Text>
              </View>
              <Text style={styles.subject}>{email.subject}</Text>
              <Text style={styles.preview}>{preview}...</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        {!selectedEmailId && (
          <Text style={styles.hintText}>
            Sonucu görmek için bir e-posta seçin.
          </Text>
        )}

        <Button
          text="Sonucu Gör"
          disabled={!selectedEmailId}
          onPress={() => {
            if (selectedEmailId) {
              router.push(
                `/modules/${module.id}/scenario-result?selectedEmailId=${selectedEmailId}` as Href
              );
            }
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
    gap: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  cardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
  },
  senderInfo: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  senderName: {
    color: theme.colors.textPrimary,
    ...theme.typography.subtitle,
  },
  senderEmail: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  subject: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  preview: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
    marginTop: theme.spacing.xs,
  },
  receivedAt: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
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

import { Stack, type Href, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { getScenarioByModuleId } from '@/src/features/scenarios';
import { theme } from '@/src/theme';

export default function ModuleScenarioScreen() {
  const router = useRouter();
  const { moduleId } = useLocalSearchParams<{ moduleId?: string | string[] }>();
  const normalizedModuleId = Array.isArray(moduleId) ? moduleId[0] : moduleId;
  const scenario = normalizedModuleId ? getScenarioByModuleId(normalizedModuleId) : undefined;

  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  if (!normalizedModuleId || !scenario) {
    return (
      <ScreenContainer contentContainerStyle={styles.container}>
        <Stack.Screen options={{ title: 'Senaryo' }} />

        <SectionHeader
          style={styles.header}
          title="Bu modül için senaryo bulunamadı."
          subtitle="Şu anda bu eğitim için etkileşimli senaryo hazır değil."
        />

        <Card style={styles.card}>
          <Text style={styles.bodyText}>
            Modüle dönerek eğitim içeriğini ve quiz bölümünü kullanmaya devam edebilirsiniz.
          </Text>
        </Card>

        <Button
          onPress={() => router.push(`/modules/${normalizedModuleId ?? ''}` as Href)}
          style={styles.button}
          text="Modüle Dön"
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      contentContainerStyle={styles.container}
      scroll
      scrollProps={{ showsVerticalScrollIndicator: false }}>
      <Stack.Screen options={{ title: 'Senaryo' }} />

      <SectionHeader style={styles.header} title={scenario.title} subtitle={scenario.description} />

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Yönerge</Text>
        <Text style={styles.bodyText}>
          Aşağıdaki e-postaları inceleyin ve oltalama amacı taşıdığını düşündüğünüz tek mesajı
          seçin.
        </Text>
      </Card>

      <View style={styles.emailList}>
        {scenario.emails.map((email) => {
          const isSelected = selectedEmailId === email.id;

          return (
            <Pressable
              key={email.id}
              onPress={() => setSelectedEmailId(email.id)}
              style={({ pressed }) => [styles.emailPressable, pressed && styles.emailPressed]}>
              <Card style={[styles.emailCard, isSelected && styles.emailCardSelected]}>
                <View style={styles.emailHeader}>
                  <View style={styles.emailIdentity}>
                    <Text style={styles.senderName}>{email.senderName}</Text>
                    <Text style={styles.senderEmail}>{email.senderEmail}</Text>
                  </View>
                  <Text style={styles.emailTime}>{email.time}</Text>
                </View>

                <Text style={styles.subject}>{email.subject}</Text>
                <Text style={styles.preview}>{email.preview}</Text>
              </Card>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.actions}>
        <Button
          disabled={!selectedEmailId}
          onPress={() =>
            router.push(
              `/modules/${scenario.moduleId}/scenario-result?selectedEmailId=${selectedEmailId}` as Href
            )
          }
          style={styles.button}
          text="Sonucu Gör"
        />
        <Button
          onPress={() => router.push(`/modules/${scenario.moduleId}` as Href)}
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
  bodyText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  emailList: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  emailPressable: {
    borderRadius: 12,
  },
  emailPressed: {
    opacity: 0.92,
  },
  emailCard: {
    gap: theme.spacing.md,
  },
  emailCardSelected: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    backgroundColor: theme.colors.background,
  },
  emailHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  emailIdentity: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  senderName: {
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  senderEmail: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  emailTime: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  subject: {
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  preview: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  actions: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  button: {
    width: '100%',
  },
});

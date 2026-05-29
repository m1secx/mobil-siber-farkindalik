import { Stack, type Href, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { getScenarioByModuleId } from '@/src/features/scenarios';
import { theme } from '@/src/theme';

export default function ModuleScenarioResultScreen() {
  const router = useRouter();
  const { moduleId, selectedEmailId } = useLocalSearchParams<{
    moduleId?: string | string[];
    selectedEmailId?: string | string[];
  }>();

  const normalizedModuleId = Array.isArray(moduleId) ? moduleId[0] : moduleId;
  const normalizedSelectedEmailId = Array.isArray(selectedEmailId)
    ? selectedEmailId[0]
    : selectedEmailId;
  const scenario = normalizedModuleId ? getScenarioByModuleId(normalizedModuleId) : undefined;
  const selectedEmail = scenario?.emails.find((email) => email.id === normalizedSelectedEmailId);
  const phishingEmail = scenario?.emails.find((email) => email.id === scenario.phishingEmailId);
  const isCorrectSelection = Boolean(
    selectedEmail && phishingEmail && selectedEmail.id === phishingEmail.id
  );
  const highlightedIndicators = phishingEmail
    ? scenario?.indicators.filter((indicator) => phishingEmail.indicatorIds.includes(indicator.id)) ??
      []
    : [];

  if (!normalizedModuleId || !normalizedSelectedEmailId || !scenario || !selectedEmail || !phishingEmail) {
    return (
      <ScreenContainer contentContainerStyle={styles.container}>
        <Stack.Screen options={{ title: 'Senaryo Sonucu' }} />

        <SectionHeader
          style={styles.header}
          title="Senaryo sonucu görüntülenemedi."
          subtitle="Seçim bilgisi eksik olabilir veya bu modül için senaryo bulunamadı."
        />

        <Card style={styles.card}>
          <Text style={styles.bodyText}>
            Senaryoya dönerek e-postaları yeniden inceleyip tekrar deneyebilirsiniz.
          </Text>
        </Card>

        <Button
          onPress={() => router.push(`/modules/${normalizedModuleId ?? ''}/scenario` as Href)}
          style={styles.button}
          text="Senaryoya Dön"
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      contentContainerStyle={styles.container}
      scroll
      scrollProps={{ showsVerticalScrollIndicator: false }}>
      <Stack.Screen options={{ title: 'Senaryo Sonucu' }} />

      <SectionHeader
        style={styles.header}
        title={isCorrectSelection ? 'Doğru seçim' : 'Yanlış seçim'}
        subtitle={scenario.title}
      />

      <Card style={styles.card}>
        <View style={styles.resultHeader}>
          <Text style={styles.cardTitle}>Değerlendirme</Text>
          <View style={[styles.statusBadge, isCorrectSelection ? styles.statusSuccess : styles.statusError]}>
            <Text style={[styles.statusText, isCorrectSelection ? styles.statusSuccess : styles.statusError]}>
              {isCorrectSelection ? 'Doğru seçim' : 'Yanlış seçim'}
            </Text>
          </View>
        </View>
        <Text style={styles.bodyText}>{scenario.explanation}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Senin seçtiğin e-posta</Text>
        <Text style={styles.emailTitle}>{selectedEmail.subject}</Text>
        <Text style={styles.metaText}>
          {selectedEmail.senderName} • {selectedEmail.senderEmail}
        </Text>
        <Text style={styles.bodyText}>{selectedEmail.preview}</Text>
        <Text style={styles.explanationText}>{selectedEmail.explanation}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Doğru phishing e-postası</Text>
        <Text style={styles.emailTitle}>{phishingEmail.subject}</Text>
        <Text style={styles.metaText}>
          {phishingEmail.senderName} • {phishingEmail.senderEmail}
        </Text>
        <Text style={styles.bodyText}>{phishingEmail.preview}</Text>
        <Text style={styles.explanationText}>{phishingEmail.explanation}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Phishing göstergeleri</Text>
        <View style={styles.indicatorList}>
          {highlightedIndicators.map((indicator) => (
            <View key={indicator.id} style={styles.indicatorItem}>
              <Text style={styles.indicatorLabel}>{indicator.label}</Text>
              <Text style={styles.bodyText}>{indicator.description}</Text>
            </View>
          ))}
        </View>
      </Card>

      <View style={styles.actions}>
        <Button
          onPress={() => router.push(`/modules/${scenario.moduleId}` as Href)}
          style={styles.button}
          text="Modüle Dön"
        />
        <Button
          onPress={() => router.push(`/modules/${scenario.moduleId}/quiz` as Href)}
          style={styles.button}
          text="Quiz’e Git"
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
  resultHeader: {
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
  bodyText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  emailTitle: {
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  metaText: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  explanationText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  indicatorList: {
    gap: theme.spacing.md,
  },
  indicatorItem: {
    gap: theme.spacing.xs,
  },
  indicatorLabel: {
    color: theme.colors.textPrimary,
    ...theme.typography.caption,
  },
  actions: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  button: {
    width: '100%',
  },
});

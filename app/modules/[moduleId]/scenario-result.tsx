import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';

import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { Button } from '@/src/components/ui/Button';
import { theme } from '@/src/theme';
import { getEducationModuleById } from '@/src/features/education';
import { getMailboxScenario, getEmailById } from '@/src/features/scenarios';

export default function ScenarioResultScreen() {
  const router = useRouter();
  const { moduleId, selectedEmailId } = useLocalSearchParams<{
    moduleId: string;
    selectedEmailId: string;
  }>();

  const module = moduleId ? getEducationModuleById(moduleId) : undefined;
  const scenario = getMailboxScenario();
  const selectedEmail = selectedEmailId
    ? getEmailById(selectedEmailId)
    : undefined;
  const phishingEmail = scenario.emails.find((e) => e.isPhishing);

  const isCorrect = selectedEmail?.isPhishing === true;

  if (!module || !selectedEmail) {
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
        subtitle="Senaryo tamamlandı"
        title={scenario.title}
      />

      <View
        style={[
          styles.resultCard,
          isCorrect ? styles.resultCardSuccess : styles.resultCardError,
        ]}>
        <Text style={styles.resultStatus}>
          {isCorrect ? 'Doğru Tespit!' : 'Yanlış Tespit'}
        </Text>
        <Text style={styles.resultMessage}>
          {isCorrect
            ? 'Phishing e-postasını başarıyla tespit ettiniz. İyi bir gözlemci olduğunuzu kanıtladınız.'
            : 'Seçtiğiniz e-posta phishing değildi. Phishing e-postalarını tanımak için bazı ipuçlarını gözden geçirin.'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seçiminiz</Text>
        <View style={styles.emailCard}>
          <Text style={styles.emailSender}>{selectedEmail.sender}</Text>
          <Text style={styles.emailAddress}>{selectedEmail.senderEmail}</Text>
          <Text style={styles.emailSubject}>{selectedEmail.subject}</Text>
        </View>
      </View>

      {phishingEmail && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doğru Cevap (Phishing)</Text>
          <View style={styles.emailCard}>
            <Text style={styles.emailSender}>{phishingEmail.sender}</Text>
            <Text style={styles.emailAddress}>
              {phishingEmail.senderEmail}
            </Text>
            <Text style={styles.emailSubject}>{phishingEmail.subject}</Text>
          </View>
        </View>
      )}

      {phishingEmail && phishingEmail.indicators.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phishing Göstergeleri</Text>
          {phishingEmail.indicators.map((indicator) => (
            <View key={indicator.id} style={styles.indicatorCard}>
              <Text style={styles.indicatorLabel}>{indicator.label}</Text>
              <Text style={styles.indicatorDescription}>
                {indicator.description}
              </Text>
            </View>
          ))}
        </View>
      )}

      {phishingEmail && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Öğretici Açıklama</Text>
          <Text style={styles.explanation}>
            {phishingEmail.explanation}
          </Text>
        </View>
      )}

      <View style={styles.actions}>
        <Button
          text="Modüle Dön"
          onPress={() =>
            router.push(`/modules/${module.id}` as Href)
          }
        />
        <Button
          text="Quiz'e Git"
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
  resultCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  resultCardSuccess: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.success,
  },
  resultCardError: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.error,
  },
  resultStatus: {
    ...theme.typography.subtitle,
    textAlign: 'center',
  },
  resultMessage: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
    ...theme.typography.subtitle,
    marginBottom: theme.spacing.sm,
  },
  emailCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  emailSender: {
    color: theme.colors.textPrimary,
    ...theme.typography.subtitle,
  },
  emailAddress: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  emailSubject: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
    marginTop: theme.spacing.xs,
  },
  indicatorCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  indicatorLabel: {
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  indicatorDescription: {
    color: theme.colors.textSecondary,
    ...theme.typography.caption,
    lineHeight: 20,
  },
  explanation: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
    lineHeight: 24,
  },
  actions: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
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

import { Stack, type Href, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { educationModules } from '@/src/features/education/modules';
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
  const { moduleId, score, total } = useLocalSearchParams<{
    moduleId?: string | string[];
    score?: string | string[];
    total?: string | string[];
  }>();

  const normalizedModuleId = Array.isArray(moduleId) ? moduleId[0] : moduleId;
  const module = educationModules.find((item) => item.id === normalizedModuleId);
  const safeScore = parseNumberParam(score);
  const safeTotal = parseNumberParam(total);
  const percentage = safeTotal > 0 ? Math.round((safeScore / safeTotal) * 100) : 0;

  let feedback = 'Bu modülü tekrar gözden geçirmek faydalı olabilir.';

  if (percentage >= 80) {
    feedback = 'Harika! Bu konuda oldukça iyi görünüyorsun.';
  } else if (percentage >= 50) {
    feedback = 'İyi gidiyorsun. Birkaç noktayı tekrar etmek faydalı olabilir.';
  }

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

  return (
    <ScreenContainer contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: 'Sonuç' }} />

      <SectionHeader style={styles.header} title="Quiz Tamamlandı" subtitle={module.title} />

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Sonuç Özeti</Text>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Skor</Text>
          <Text style={styles.metricValue}>
            {safeScore} / {safeTotal} doğru
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
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.xxl,
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
  actions: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  button: {
    width: '100%',
  },
});

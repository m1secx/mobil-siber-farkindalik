import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { useAuth } from '@/src/providers/auth-provider';
import { theme } from '@/src/theme';

const stats = [
  { label: 'Toplam Puan', value: 'Yakında' },
  { label: 'Tamamlanan Modül', value: 'Yakında' },
  { label: 'Sıralama', value: 'Yakında' },
] as const;

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <ScreenContainer contentContainerStyle={styles.container}>
      <SectionHeader
        style={styles.header}
        title="Profil"
        subtitle="Hesap ve kullanıcı bilgileri burada yer alacak."
      />

      <View style={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Hesap Bilgileri</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email ?? 'Email bilgisi yok'}</Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>İlerleme Özeti</Text>
          {stats.map((item) => (
            <View key={item.label} style={styles.statRow}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
            </View>
          ))}
        </Card>
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
  content: {
    gap: theme.spacing.md,
  },
  card: {
    gap: theme.spacing.md,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  infoRow: {
    gap: theme.spacing.xs,
  },
  infoLabel: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  infoValue: {
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  statLabel: {
    flex: 1,
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  statValue: {
    color: theme.colors.primary,
    ...theme.typography.caption,
  },
});

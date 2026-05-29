import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { useAuth } from '@/src/providers/auth-provider';
import { theme } from '@/src/theme';

export default function HomeScreen() {
  const { signOut, user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignOut = async () => {
    setError(null);
    setIsSubmitting(true);

    const nextError = await signOut();

    setError(nextError);
    setIsSubmitting(false);
  };

  return (
    <ScreenContainer contentContainerStyle={styles.container}>
      <SectionHeader
        style={styles.header}
        subtitle="Hesabınızla ilişkili temel başlangıç alanı burada yer alır."
        title="Ana Sayfa"
      />

      <View style={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Hesap Özeti</Text>
          <Text style={styles.description}>
            Giriş yapmış kullanıcı alanı için sade başlangıç ekranı.
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email ?? 'Email bilgisi yok'}</Text>
          </View>
          {isSubmitting ? <Text style={styles.metaText}>Çıkış yapılıyor...</Text> : null}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Bugünkü Öneri</Text>
          <Text style={styles.description}>
            Eğitimler sekmesinden kısa modülleri inceleyerek güvenli parola ve oltalama farkındalığı
            konularına hızlıca göz atın.
          </Text>
        </Card>
      </View>

      <Button
        disabled={isSubmitting}
        loading={isSubmitting}
        onPress={handleSignOut}
        style={styles.button}
        text="Çıkış Yap"
      />
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
  description: {
    color: theme.colors.textSecondary,
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
  metaText: {
    color: theme.colors.textPrimary,
    ...theme.typography.caption,
  },
  errorText: {
    color: theme.colors.error,
    ...theme.typography.caption,
  },
  button: {
    marginTop: theme.spacing.xl,
  },
});

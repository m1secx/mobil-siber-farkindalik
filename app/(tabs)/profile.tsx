import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { useAuth } from '@/src/providers/auth-provider';
import { theme } from '@/src/theme';

export default function ProfileScreen() {
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
        subtitle="Hesap bilgilerinizi görüntüleyebilir ve oturumunuzu sonlandırabilirsiniz."
        title="Profil"
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hesap Bilgileri</Text>
        <Text style={styles.cardLabel}>Email</Text>
        <Text style={styles.cardValue}>{user?.email ?? 'Email bilgisi yok'}</Text>
      </View>

      <View style={styles.footer}>
        {isSubmitting ? <Text style={styles.metaText}>Cikis yapiliyor...</Text> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          onPress={handleSignOut}
          style={styles.button}
          text="Cikis Yap"
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
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    ...theme.typography.subtitle,
  },
  cardLabel: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
  cardValue: {
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  footer: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  metaText: {
    color: theme.colors.textSecondary,
    ...theme.typography.caption,
  },
  errorText: {
    color: theme.colors.error,
    ...theme.typography.caption,
  },
  button: {
    marginTop: theme.spacing.sm,
  },
});

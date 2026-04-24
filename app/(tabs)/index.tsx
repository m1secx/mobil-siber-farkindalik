import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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
        <Text style={styles.description}>
          Giris yapmis kullanici alani icin sade baslangic ekrani.
        </Text>
        <Text style={styles.metaText}>{user?.email ?? 'Email bilgisi yok'}</Text>
        {isSubmitting ? <Text style={styles.metaText}>Cikis yapiliyor...</Text> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <Pressable
        disabled={isSubmitting}
        onPress={handleSignOut}
        style={({ pressed }) => [styles.button, (pressed || isSubmitting) && styles.buttonPressed]}>
        <Text style={styles.buttonText}>{isSubmitting ? 'Bekleyin...' : 'Cikis Yap'}</Text>
      </Pressable>
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
  description: {
    color: theme.colors.textSecondary,
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
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: theme.colors.surface,
    ...theme.typography.button,
  },
});

import { Link, type Href } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { useAuth } from '@/src/providers/auth-provider';
import { theme } from '@/src/theme';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function RegisterScreen() {
  const { isConfigured, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(null);
    setError(null);
    setSuccess(null);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(null);
    setError(null);
    setSuccess(null);
  };

  const handleRegister = async () => {
    let hasError = false;

    if (!email.trim()) {
      setEmailError('Email alanini doldurun.');
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError('Gecerli bir email adresi girin.');
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('Sifre alanini doldurun.');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Sifre en az 6 karakter olmali.');
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (hasError) {
      setError(null);
      setSuccess(null);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const nextError = await signUp(email, password);

    if (nextError) {
      setError(nextError);
    } else {
      setEmail('');
      setPassword('');
      setSuccess(
        'Kayit basarili. Email dogrulamasi aciksa gelen kutunuzu kontrol edin, degilse giris yapabilirsiniz.'
      );
    }

    setIsSubmitting(false);
  };

  return (
    <ScreenContainer contentContainerStyle={styles.container}>
      <SectionHeader
        style={styles.header}
        subtitle="Email ve sifre ile yeni bir hesap olusturarak uygulamayi kullanmaya baslayin."
        title="Kayıt Ol"
      />

      <View style={styles.card}>
        {!isConfigured ? (
          <Text style={styles.errorText}>Supabase ortam degiskenleri eksik.</Text>
        ) : null}

        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email"
          onChangeText={handleEmailChange}
          placeholder="ornek@email.com"
          value={email}
          error={emailError ?? undefined}
        />
        <Input
          autoCapitalize="none"
          label="Sifre"
          onChangeText={handlePasswordChange}
          placeholder="Sifrenizi olusturun"
          secureTextEntry
          value={password}
          error={passwordError ?? undefined}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}

        <Button
          disabled={!isConfigured || isSubmitting}
          loading={isSubmitting}
          onPress={handleRegister}
          style={styles.button}
          text="Kayit Ol"
        />
      </View>

      <Link href={'/login' as Href} style={styles.link}>
        Hesabin var mi? Giris yap
      </Link>
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
    gap: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.error,
    ...theme.typography.caption,
  },
  successText: {
    color: theme.colors.success,
    ...theme.typography.caption,
  },
  button: {
    marginTop: theme.spacing.sm,
  },
  link: {
    marginTop: theme.spacing.lg,
    color: theme.colors.primary,
    ...theme.typography.body,
  },
});

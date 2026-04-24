import { Link, type Href } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { useAuth } from '@/src/providers/auth-provider';
import { theme } from '@/src/theme';

export default function LoginScreen() {
  const { isConfigured, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isFormIncomplete = !email.trim() || !password;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setError(null);
    setSuccess(null);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setError(null);
    setSuccess(null);
  };

  const getValidationMessage = () => {
    if (!email.trim() && !password) {
      return 'Email ve sifre alanlarini doldurun.';
    }

    if (!email.trim()) {
      return 'Email alanini doldurun.';
    }

    if (!password) {
      return 'Sifre alanini doldurun.';
    }

    return null;
  };

  const handleLogin = async () => {
    const validationMessage = getValidationMessage();

    if (validationMessage) {
      setSuccess(null);
      setError(validationMessage);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const nextError = await signIn(email, password);

    if (nextError) {
      setError(nextError);
    } else {
      setSuccess('Giris basarili. Yonlendiriliyorsunuz...');
    }

    setIsSubmitting(false);
  };

  return (
    <ScreenContainer contentContainerStyle={styles.container}>
      <SectionHeader
        style={styles.header}
        subtitle="Email ve sifrenizle hesabınıza güvenli şekilde giriş yapın."
        title="Giriş Yap"
      />

      <View style={styles.form}>
        {isConfigured ? null : (
          <Text style={styles.errorText}>Supabase ortam degiskenleri eksik.</Text>
        )}

        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email"
          onChangeText={handleEmailChange}
          placeholder="ornek@email.com"
          value={email}
        />
        <Input
          autoCapitalize="none"
          label="Sifre"
          onChangeText={handlePasswordChange}
          placeholder="Sifrenizi girin"
          secureTextEntry
          value={password}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}

        <Button
          disabled={!isConfigured || isFormIncomplete}
          loading={isSubmitting}
          onPress={handleLogin}
          style={styles.button}
          text="Giris Yap"
        />
      </View>

      <Link href={'/register' as Href} style={styles.link}>
        Hesabin yok mu? Kayit ol
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
  form: {
    gap: theme.spacing.lg,
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
    marginTop: theme.spacing.xl,
  },
  link: {
    marginTop: theme.spacing.lg,
    color: theme.colors.primary,
    ...theme.typography.body,
  },
});

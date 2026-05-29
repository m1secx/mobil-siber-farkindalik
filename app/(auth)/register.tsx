import { Link, type Href } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { useAuth } from '@/src/providers/auth-provider';
import { theme } from '@/src/theme';

export default function RegisterScreen() {
  const { isConfigured, signUp } = useAuth();
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
      return 'Email ve şifre alanlarını doldurun.';
    }

    if (!email.trim()) {
      return 'Email alanını doldurun.';
    }

    if (!password) {
      return 'Şifre alanını doldurun.';
    }

    return null;
  };

  const handleRegister = async () => {
    const validationMessage = getValidationMessage();

    if (validationMessage) {
      setSuccess(null);
      setError(validationMessage);
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
        'Kayıt başarılı. Email doğrulaması açıksa gelen kutunuzu kontrol edin, değilse giriş yapabilirsiniz.'
      );
    }

    setIsSubmitting(false);
  };

  return (
    <ScreenContainer contentContainerStyle={styles.container}>
      <SectionHeader
        style={styles.header}
        subtitle="Email ve şifre ile yeni bir hesap oluşturarak uygulamayı kullanmaya başlayın."
        title="Kayıt Ol"
      />

      <View style={styles.form}>
        {!isConfigured ? (
          <Text style={styles.errorText}>Supabase ortam değişkenleri eksik.</Text>
        ) : null}

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
          label="Şifre"
          onChangeText={handlePasswordChange}
          placeholder="Şifrenizi oluşturun"
          secureTextEntry
          value={password}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}

        <Button
          disabled={!isConfigured || isFormIncomplete}
          loading={isSubmitting}
          onPress={handleRegister}
          style={styles.button}
          text="Kayıt Ol"
        />
      </View>

      <Link href={'/login' as Href} style={styles.link}>
        Hesabın var mı? Giriş yap
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

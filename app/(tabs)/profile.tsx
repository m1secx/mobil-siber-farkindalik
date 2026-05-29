import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { theme } from '@/src/theme';

export default function ProfileScreen() {
  return (
    <ScreenContainer contentContainerStyle={styles.container}>
      <SectionHeader
        style={styles.header}
        title="Profil"
        subtitle="Hesap ve kullanıcı bilgileri burada yer alacak."
      />

      <View style={styles.content}>
        <Text style={styles.description}>
          Profil bilgileri ve hesapla ilgili temel içerikler burada gösterilecek.
        </Text>
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
  description: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
});

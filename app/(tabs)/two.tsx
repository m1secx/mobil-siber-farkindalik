import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { theme } from '@/src/theme';

type Module = {
  id: string;
  title: string;
  description: string;
  status: string;
};

const modules: Module[] = [
  {
    id: '1',
    title: 'Oltalama Saldırıları',
    description: 'Sahte e-posta ve web sitelerini tanıma, phishing tekniklerine karşı farkındalık.',
    status: 'Yakında',
  },
  {
    id: '2',
    title: 'Parola Güvenliği',
    description: 'Güçlü parola oluşturma, parola yöneticileri ve çok faktörlü doğrulama.',
    status: 'Yakında',
  },
  {
    id: '3',
    title: 'Sosyal Mühendislik',
    description: 'Manipülasyon tekniklerini anlama ve sosyal mühendislik saldırılarına karşı korunma.',
    status: 'Yakında',
  },
  {
    id: '4',
    title: 'Güvenli Bağlantılar',
    description: 'HTTPS, güvenli Wi-Fi kullanımı ve bağlantı güvenliği temelleri.',
    status: 'Yakında',
  },
  {
    id: '5',
    title: 'Mobil Uygulama İzinleri',
    description: 'Uygulama izinlerini yönetme ve gereksiz erişim haklarını sınırlandırma.',
    status: 'Yakında',
  },
];

export default function TrainingsScreen() {
  return (
    <ScreenContainer contentContainerStyle={styles.container} scroll>
      <SectionHeader
        style={styles.header}
        subtitle="Siber güvenlik konularında kendinizi geliştirin."
        title="Eğitimler"
      />

      <View style={styles.list}>
        {modules.map((module) => (
          <View key={module.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{module.title}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{module.status}</Text>
              </View>
            </View>
            <Text style={styles.cardDescription}>{module.description}</Text>
          </View>
        ))}
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
  list: {
    gap: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  cardTitle: {
    flex: 1,
    color: theme.colors.textPrimary,
    ...theme.typography.subtitle,
  },
  cardDescription: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  badge: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  badgeText: {
    color: theme.colors.textTertiary,
    ...theme.typography.caption,
  },
});

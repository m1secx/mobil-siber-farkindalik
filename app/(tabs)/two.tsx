import { StyleSheet, Text, View } from 'react-native';

import { Card } from '@/src/components/ui/Card';
import { ScreenContainer } from '@/src/components/ui/ScreenContainer';
import { SectionHeader } from '@/src/components/ui/SectionHeader';
import { theme } from '@/src/theme';

const modules = [
  {
    title: 'Oltalama Saldırıları',
    description: 'Şüpheli mesajları, sahte bağlantıları ve kimlik avı işaretlerini tanımayı öğrenin.',
  },
  {
    title: 'Parola Güvenliği',
    description: 'Güçlü parola oluşturma, parola tekrarını önleme ve hesap koruma temellerini keşfedin.',
  },
  {
    title: 'Sosyal Mühendislik',
    description: 'Manipülasyon tekniklerini fark ederek günlük iletişimde daha dikkatli karar verin.',
  },
  {
    title: 'Güvenli Bağlantılar',
    description: 'Ortak ağlarda, bağlantı paylaşımlarında ve tarayıcı kullanımında güvenli adımları öğrenin.',
  },
  {
    title: 'Mobil Uygulama İzinleri',
    description: 'Uygulamaların istediği izinleri değerlendirip gereksiz erişimleri sınırlamayı öğrenin.',
  },
] as const;

export default function TrainingsScreen() {
  return (
    <ScreenContainer
      contentContainerStyle={styles.container}
      scroll
      scrollProps={{ showsVerticalScrollIndicator: false }}>
      <SectionHeader
        style={styles.header}
        title="Eğitimler"
        subtitle="Siber güvenlik farkındalığını artıracak kısa eğitim içerikleri burada yer alacak."
      />

      <View style={styles.content}>
        {modules.map((module) => (
          <Card key={module.title} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{module.title}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Yakında</Text>
              </View>
            </View>
            <Text style={styles.cardDescription}>{module.description}</Text>
          </Card>
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
  content: {
    gap: theme.spacing.md,
  },
  card: {
    gap: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  cardTitle: {
    flex: 1,
    color: theme.colors.textPrimary,
    ...theme.typography.body,
  },
  badge: {
    borderRadius: 999,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  badgeText: {
    color: theme.colors.primary,
    ...theme.typography.caption,
  },
  cardDescription: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
});

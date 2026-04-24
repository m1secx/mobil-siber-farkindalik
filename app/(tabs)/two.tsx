import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function TrainingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eğitimler</Text>
      <Text style={styles.description}>
        Phishing, parola güvenliği ve benzeri konular için eğitim içerikleri burada yer alacak.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
});

import { Stack } from 'expo-router';

export default function ModulesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[moduleId]/index"
        options={{ title: 'Eğitim Detayı' }}
      />
      <Stack.Screen
        name="[moduleId]/quiz"
        options={{ title: 'Quiz' }}
      />
      <Stack.Screen
        name="[moduleId]/result"
        options={{ title: 'Sonuç' }}
      />
    </Stack>
  );
}

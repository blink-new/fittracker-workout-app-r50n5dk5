import { Stack } from 'expo-router';
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="programs" />
        <Stack.Screen name="exercises" />
        <Stack.Screen name="exercise-history" />
        <Stack.Screen name="workout-session" />
      </Stack>
    </AppProvider>
  );
}
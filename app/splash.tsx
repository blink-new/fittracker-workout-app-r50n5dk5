import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';

export default function SplashScreen() {
  const router = useRouter();
  const { state } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.user) {
        router.replace('/programs');
      } else {
        router.replace('/auth');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [state.user, router]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>💪</Text>
        <Text style={styles.title}>FitTracker</Text>
        <Text style={styles.subtitle}>Track Your Workout Journey</Text>
        <ActivityIndicator size="large" color="#FF6B35" style={styles.loader} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});
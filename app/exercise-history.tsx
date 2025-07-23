import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useApp } from '../context/AppContext';

export default function ExerciseHistoryScreen() {
  const router = useRouter();
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const { state, getLastSessionForExercise } = useApp();

  // Find the exercise
  const exercise = state.programs
    .flatMap(program => program.exercises)
    .find(ex => ex.id === exerciseId);

  const lastSession = getLastSessionForExercise(exerciseId!);

  const handleBack = () => {
    router.back();
  };

  const handleStartNewSession = () => {
    router.push(`/workout-session?exerciseId=${exerciseId}`);
  };

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.title}>{exercise.name}</Text>
          <Text style={styles.subtitle}>{exercise.description}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Muscles</Text>
          <View style={styles.muscleGroup}>
            {exercise.targetMuscles.map((muscle, index) => (
              <View key={index} style={styles.muscleTag}>
                <Text style={styles.muscleText}>{muscle}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Session</Text>
          
          {lastSession ? (
            <View style={styles.sessionCard}>
              <Text style={styles.sessionDate}>
                {new Date(lastSession.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              
              <View style={styles.gridHeader}>
                <Text style={styles.gridHeaderText}>Set</Text>
                <Text style={styles.gridHeaderText}>Weight</Text>
                <Text style={styles.gridHeaderText}>Reps</Text>
                <Text style={styles.gridHeaderText}>Intensity</Text>
              </View>
              
              {lastSession.sets.map((set, index) => (
                <View key={index} style={styles.gridRow}>
                  <Text style={styles.gridCell}>{set.setNumber}</Text>
                  <Text style={styles.gridCell}>{set.weight} lbs</Text>
                  <Text style={styles.gridCell}>{set.reps}</Text>
                  <Text style={styles.gridCell}>{set.intensity}/10</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noSessionCard}>
              <Text style={styles.noSessionText}>No previous sessions</Text>
              <Text style={styles.noSessionSubtext}>Start your first workout!</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartNewSession}
        >
          <Text style={styles.startButtonText}>Start New Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  muscleGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  muscleTag: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  muscleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  sessionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  gridHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#4ECDC4',
    marginBottom: 8,
  },
  gridHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4ECDC4',
    textAlign: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  gridCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  noSessionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  noSessionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  noSessionSubtext: {
    fontSize: 14,
    color: '#999',
  },
  startButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 32,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});
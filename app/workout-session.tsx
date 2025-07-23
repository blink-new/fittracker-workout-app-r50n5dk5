import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useApp } from '../context/AppContext';
import { WorkoutSet, WorkoutSession } from '../types';
import { StorageService } from '../utils/storage';

export default function WorkoutSessionScreen() {
  const router = useRouter();
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const { state, getLastSessionForExercise, addSession } = useApp();

  const [sets, setSets] = useState<WorkoutSet[]>([
    { setNumber: 1, weight: 0, reps: 0, intensity: 5 },
    { setNumber: 2, weight: 0, reps: 0, intensity: 5 },
    { setNumber: 3, weight: 0, reps: 0, intensity: 5 },
  ]);

  // Find the exercise
  const exercise = state.programs
    .flatMap(program => program.exercises)
    .find(ex => ex.id === exerciseId);

  useEffect(() => {
    // Auto-populate with last session data
    const lastSession = getLastSessionForExercise(exerciseId!);
    if (lastSession && lastSession.sets.length > 0) {
      const newSets = sets.map((set, index) => {
        const lastSet = lastSession.sets[index];
        if (lastSet) {
          return {
            ...set,
            weight: lastSet.weight,
            reps: lastSet.reps,
            intensity: lastSet.intensity,
          };
        }
        return set;
      });
      setSets(newSets);
    }
  }, [exerciseId]);

  const updateSet = (setIndex: number, field: keyof WorkoutSet, value: string) => {
    const numValue = field === 'setNumber' ? setIndex + 1 : parseFloat(value) || 0;
    setSets(prevSets =>
      prevSets.map((set, index) =>
        index === setIndex ? { ...set, [field]: numValue } : set
      )
    );
  };

  const isFormComplete = () => {
    return sets.every(set => set.weight > 0 && set.reps > 0 && set.intensity > 0);
  };

  const handleSaveData = async () => {
    if (!state.user || !exercise) {
      Alert.alert('Error', 'User or exercise not found');
      return;
    }

    try {
      const session: WorkoutSession = {
        id: StorageService.generateId(),
        userId: state.user.id,
        exerciseId: exerciseId!,
        date: new Date().toISOString(),
        sets: sets,
      };

      await addSession(session);
      
      Alert.alert(
        'Success!',
        'Workout session saved successfully',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save workout session');
    }
  };

  const handleBack = () => {
    router.back();
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
          <Text style={styles.subtitle}>New Workout Session</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          <View style={styles.gridHeader}>
            <Text style={styles.gridHeaderText}>Set</Text>
            <Text style={styles.gridHeaderText}>Weight</Text>
            <Text style={styles.gridHeaderText}>Reps</Text>
            <Text style={styles.gridHeaderText}>Intensity</Text>
          </View>

          {sets.map((set, index) => (
            <View key={index} style={styles.gridRow}>
              <View style={styles.setNumberCell}>
                <Text style={styles.setNumberText}>Set {set.setNumber}</Text>
              </View>
              
              <View style={styles.inputCell}>
                <TextInput
                  style={styles.input}
                  value={set.weight > 0 ? set.weight.toString() : ''}
                  onChangeText={(value) => updateSet(index, 'weight', value)}
                  placeholder="0"
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>lbs</Text>
              </View>
              
              <View style={styles.inputCell}>
                <TextInput
                  style={styles.input}
                  value={set.reps > 0 ? set.reps.toString() : ''}
                  onChangeText={(value) => updateSet(index, 'reps', value)}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.inputCell}>
                <TextInput
                  style={styles.input}
                  value={set.intensity > 0 ? set.intensity.toString() : ''}
                  onChangeText={(value) => updateSet(index, 'intensity', value)}
                  placeholder="5"
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>/10</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.intensityGuide}>
          <Text style={styles.guideTitle}>Intensity Guide</Text>
          <Text style={styles.guideText}>1-3: Light • 4-6: Moderate • 7-8: Hard • 9-10: Maximum</Text>
        </View>

        {isFormComplete() && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveData}
          >
            <Text style={styles.saveButtonText}>Save Data</Text>
          </TouchableOpacity>
        )}
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  gridContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gridHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#4ECDC4',
    marginBottom: 16,
  },
  gridHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ECDC4',
    textAlign: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  setNumberCell: {
    flex: 1,
    alignItems: 'center',
  },
  setNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  inputCell: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    minWidth: 60,
  },
  unitText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  intensityGuide: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  guideText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 32,
  },
  saveButtonText: {
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
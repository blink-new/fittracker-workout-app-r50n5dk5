import { WorkoutProgram } from '../types';

export const getDefaultPrograms = (): WorkoutProgram[] => [
  {
    id: 'program_1',
    name: 'Upper Body Strength',
    description: 'Build strength in your upper body with compound movements',
    exercises: [
      {
        id: 'exercise_1_1',
        name: 'Bench Press',
        description: 'Classic chest exercise for building upper body strength',
        targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
        programId: 'program_1',
      },
      {
        id: 'exercise_1_2',
        name: 'Pull-ups',
        description: 'Bodyweight exercise for back and bicep development',
        targetMuscles: ['Back', 'Biceps'],
        programId: 'program_1',
      },
      {
        id: 'exercise_1_3',
        name: 'Overhead Press',
        description: 'Shoulder strength and stability exercise',
        targetMuscles: ['Shoulders', 'Triceps', 'Core'],
        programId: 'program_1',
      },
      {
        id: 'exercise_1_4',
        name: 'Barbell Rows',
        description: 'Build a strong back with this pulling movement',
        targetMuscles: ['Back', 'Biceps', 'Rear Delts'],
        programId: 'program_1',
      },
      {
        id: 'exercise_1_5',
        name: 'Dips',
        description: 'Compound movement for triceps and chest',
        targetMuscles: ['Triceps', 'Chest', 'Shoulders'],
        programId: 'program_1',
      },
      {
        id: 'exercise_1_6',
        name: 'Bicep Curls',
        description: 'Isolation exercise for bicep development',
        targetMuscles: ['Biceps'],
        programId: 'program_1',
      },
    ],
  },
  {
    id: 'program_2',
    name: 'Lower Body Power',
    description: 'Explosive lower body movements for strength and power',
    exercises: [
      {
        id: 'exercise_2_1',
        name: 'Squats',
        description: 'The king of all exercises for leg development',
        targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
        programId: 'program_2',
      },
      {
        id: 'exercise_2_2',
        name: 'Deadlifts',
        description: 'Full body compound movement focusing on posterior chain',
        targetMuscles: ['Hamstrings', 'Glutes', 'Back', 'Core'],
        programId: 'program_2',
      },
      {
        id: 'exercise_2_3',
        name: 'Lunges',
        description: 'Unilateral leg exercise for balance and strength',
        targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
        programId: 'program_2',
      },
      {
        id: 'exercise_2_4',
        name: 'Bulgarian Split Squats',
        description: 'Single leg exercise for strength and stability',
        targetMuscles: ['Quadriceps', 'Glutes'],
        programId: 'program_2',
      },
      {
        id: 'exercise_2_5',
        name: 'Calf Raises',
        description: 'Isolation exercise for calf development',
        targetMuscles: ['Calves'],
        programId: 'program_2',
      },
      {
        id: 'exercise_2_6',
        name: 'Hip Thrusts',
        description: 'Glute-focused exercise for power and strength',
        targetMuscles: ['Glutes', 'Hamstrings'],
        programId: 'program_2',
      },
    ],
  },
];
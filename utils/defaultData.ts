import { WorkoutProgram, Exercise } from '../types';

const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const getDefaultPrograms = (): WorkoutProgram[] => {
  return [
    {
      id: generateId(),
      name: 'Upper Body Strength',
      description: 'Focus on building upper body muscle and strength',
      exercises: [
        {
          id: generateId(),
          name: 'Bench Press',
          description: 'Chest, shoulders, and triceps',
          muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
        },
        {
          id: generateId(),
          name: 'Pull-ups',
          description: 'Back and biceps',
          muscleGroups: ['Back', 'Biceps'],
        },
        {
          id: generateId(),
          name: 'Overhead Press',
          description: 'Shoulders and triceps',
          muscleGroups: ['Shoulders', 'Triceps'],
        },
        {
          id: generateId(),
          name: 'Barbell Rows',
          description: 'Back and biceps',
          muscleGroups: ['Back', 'Biceps'],
        },
        {
          id: generateId(),
          name: 'Dips',
          description: 'Chest, shoulders, and triceps',
          muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
        },
        {
          id: generateId(),
          name: 'Bicep Curls',
          description: 'Biceps',
          muscleGroups: ['Biceps'],
        },
      ],
    },
    {
      id: generateId(),
      name: 'Lower Body Power',
      description: 'Build explosive lower body strength and power',
      exercises: [
        {
          id: generateId(),
          name: 'Squats',
          description: 'Quadriceps, glutes, and hamstrings',
          muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
        },
        {
          id: generateId(),
          name: 'Deadlifts',
          description: 'Hamstrings, glutes, and back',
          muscleGroups: ['Hamstrings', 'Glutes', 'Back'],
        },
        {
          id: generateId(),
          name: 'Lunges',
          description: 'Quadriceps, glutes, and hamstrings',
          muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
        },
        {
          id: generateId(),
          name: 'Leg Press',
          description: 'Quadriceps and glutes',
          muscleGroups: ['Quadriceps', 'Glutes'],
        },
        {
          id: generateId(),
          name: 'Calf Raises',
          description: 'Calves',
          muscleGroups: ['Calves'],
        },
        {
          id: generateId(),
          name: 'Hip Thrusts',
          description: 'Glutes and hamstrings',
          muscleGroups: ['Glutes', 'Hamstrings'],
        },
      ],
    },
  ];
};
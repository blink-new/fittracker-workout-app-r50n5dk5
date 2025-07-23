export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  targetMuscles: string[];
  programId: string;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  exerciseId: string;
  date: string;
  sets: WorkoutSet[];
}

export interface WorkoutSet {
  setNumber: number;
  weight: number;
  reps: number;
  intensity: number; // 1-10 scale
}

export interface AppState {
  user: User | null;
  programs: WorkoutProgram[];
  sessions: WorkoutSession[];
}
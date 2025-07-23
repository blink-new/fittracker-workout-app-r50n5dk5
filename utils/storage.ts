import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, WorkoutProgram, WorkoutSession, AppState } from '../types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEYS = {
  USER: '@workout_tracker_user',
  PROGRAMS: '@workout_tracker_programs',
  SESSIONS: '@workout_tracker_sessions',
};

export const StorageService = {
  // User management
  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  },

  // Programs management
  async savePrograms(programs: WorkoutProgram[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
    } catch (error) {
      console.error('Error saving programs:', error);
    }
  },

  async getPrograms(): Promise<WorkoutProgram[]> {
    try {
      const programsData = await AsyncStorage.getItem(STORAGE_KEYS.PROGRAMS);
      return programsData ? JSON.parse(programsData) : [];
    } catch (error) {
      console.error('Error getting programs:', error);
      return [];
    }
  },

  // Sessions management
  async saveSessions(sessions: WorkoutSession[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions:', error);
    }
  },

  async getSessions(): Promise<WorkoutSession[]> {
    try {
      const sessionsData = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      return sessionsData ? JSON.parse(sessionsData) : [];
    } catch (error) {
      console.error('Error getting sessions:', error);
      return [];
    }
  },

  async addSession(session: WorkoutSession): Promise<void> {
    try {
      const sessions = await this.getSessions();
      sessions.push(session);
      await this.saveSessions(sessions);
    } catch (error) {
      console.error('Error adding session:', error);
    }
  },

  // Get last session for specific exercise
  async getLastSessionForExercise(exerciseId: string, userId: string): Promise<WorkoutSession | null> {
    try {
      const sessions = await this.getSessions();
      const exerciseSessions = sessions
        .filter(session => session.exerciseId === exerciseId && session.userId === userId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      return exerciseSessions.length > 0 ? exerciseSessions[0] : null;
    } catch (error) {
      console.error('Error getting last session:', error);
      return null;
    }
  },

  // Clear all data
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER,
        STORAGE_KEYS.PROGRAMS,
        STORAGE_KEYS.SESSIONS,
      ]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  },

  // Generate UUID
  generateId(): string {
    return uuidv4();
  }
};
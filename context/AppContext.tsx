import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, WorkoutProgram, WorkoutSession, AppState } from '../types';
import { StorageService } from '../utils/storage';
import { getDefaultPrograms } from '../utils/defaultData';

interface AppContextType {
  state: AppState;
  login: (user: User) => void;
  logout: () => void;
  addSession: (session: WorkoutSession) => void;
  getLastSessionForExercise: (exerciseId: string) => WorkoutSession | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_PROGRAMS'; payload: WorkoutProgram[] }
  | { type: 'SET_SESSIONS'; payload: WorkoutSession[] }
  | { type: 'ADD_SESSION'; payload: WorkoutSession };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_PROGRAMS':
      return { ...state, programs: action.payload };
    case 'SET_SESSIONS':
      return { ...state, sessions: action.payload };
    case 'ADD_SESSION':
      return { ...state, sessions: [...state.sessions, action.payload] };
    default:
      return state;
  }
};

const initialState: AppState = {
  user: null,
  programs: [],
  sessions: [],
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      // Load user
      const user = await StorageService.getUser();
      dispatch({ type: 'SET_USER', payload: user });

      // Load or initialize programs
      let programs = await StorageService.getPrograms();
      if (programs.length === 0) {
        programs = getDefaultPrograms();
        await StorageService.savePrograms(programs);
      }
      dispatch({ type: 'SET_PROGRAMS', payload: programs });

      // Load sessions
      const sessions = await StorageService.getSessions();
      dispatch({ type: 'SET_SESSIONS', payload: sessions });
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const login = async (user: User) => {
    try {
      await StorageService.saveUser(user);
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = async () => {
    try {
      await StorageService.removeUser();
      dispatch({ type: 'SET_USER', payload: null });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const addSession = async (session: WorkoutSession) => {
    try {
      await StorageService.addSession(session);
      dispatch({ type: 'ADD_SESSION', payload: session });
    } catch (error) {
      console.error('Error adding session:', error);
    }
  };

  const getLastSessionForExercise = (exerciseId: string): WorkoutSession | null => {
    if (!state.user) return null;
    
    const exerciseSessions = state.sessions
      .filter(session => session.exerciseId === exerciseId && session.userId === state.user!.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return exerciseSessions.length > 0 ? exerciseSessions[0] : null;
  };

  return (
    <AppContext.Provider
      value={{
        state,
        login,
        logout,
        addSession,
        getLastSessionForExercise,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
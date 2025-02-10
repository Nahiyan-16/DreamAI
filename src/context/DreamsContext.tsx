import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Dream {
  id: string;
  date: Date;
  description: string;
  interpretation: string;
}

interface DreamsContextType {
  dreams: Dream[];
  addDream: (dream: Dream) => Promise<void>;
  deleteDream: (id: string) => Promise<boolean>;
  loading: boolean;
}

const DreamsContext = createContext<DreamsContextType | undefined>(undefined);

export const DreamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDreams();
  }, []);

  const loadDreams = async () => {
    try {
      const storedDreams = await AsyncStorage.getItem('dreams');
      if (storedDreams) {
        const parsedDreams = JSON.parse(storedDreams).map((dream: any) => ({
          ...dream,
          date: new Date(dream.date),
        }));
        setDreams(parsedDreams);
      }
    } catch (error) {
      console.error('Error loading dreams:', error);
    } finally {
      setLoading(false);
    }
  };

  const isDreamExistsForDate = (date: Date) => {
    return dreams.some(dream => {
      const dreamDate = new Date(dream.date);
      return (
        dreamDate.getFullYear() === date.getFullYear() &&
        dreamDate.getMonth() === date.getMonth() &&
        dreamDate.getDate() === date.getDate()
      );
    });
  };

  const addDream = async (dream: Dream) => {
    try {
      if (isDreamExistsForDate(dream.date)) {
        throw new Error('You have already recorded a dream for this date');
      }

      const updatedDreams = [...dreams, dream];
      await AsyncStorage.setItem('dreams', JSON.stringify(updatedDreams));
      setDreams(updatedDreams);
    } catch (error) {
      console.error('Error saving dream:', error);
      throw error;
    }
  };

  const deleteDream = async (id: string) => {
    try {
      const updatedDreams = dreams.filter(dream => dream.id !== id);
      // First update AsyncStorage
      await AsyncStorage.setItem('dreams', JSON.stringify(updatedDreams));
      // Then update state
      setDreams(updatedDreams);
      return true;
    } catch (error) {
      console.error('Error deleting dream:', error);
      throw new Error('Failed to delete dream');
    }
  };

  return (
    <DreamsContext.Provider value={{ dreams, addDream, deleteDream, loading }}>
      {children}
    </DreamsContext.Provider>
  );
};

export const useDreams = () => {
  const context = useContext(DreamsContext);
  if (context === undefined) {
    throw new Error('useDreams must be used within a DreamsProvider');
  }
  return context;
}; 
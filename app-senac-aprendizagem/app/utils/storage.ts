// Crie um novo arquivo storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

export const getData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error('Error reading data:', e);
    return null;
  }
};

// storage.ts
export const fullReset = async () => {
    try {
      await 
      AsyncStorage.clear();
    } catch (e) {
      console.error('Erro no reset completo:', e);
    }
  };
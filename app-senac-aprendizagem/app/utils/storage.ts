// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

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

export const resetProgress = async () => {
    try {
        // Remove os dados de conclusão dos níveis
        await AsyncStorage.removeItem("quizCompletedLevel1");
        await AsyncStorage.removeItem("quizCompletedLevel2");
        await AsyncStorage.removeItem("quizCompletedLevel3");

        // Remove as pontuações
        await AsyncStorage.removeItem("quizScore1");
        await AsyncStorage.removeItem("quizScore2");
        await AsyncStorage.removeItem("quizScore3");

        // Mantém os níveis desbloqueados apenas até o primeiro
        await AsyncStorage.setItem("quizLevel2", "locked");
        await AsyncStorage.setItem("quizLevel3", "locked");

        console.log("Progresso do quiz resetado com sucesso!");
    } catch (e) {
        console.error("Erro ao resetar o progresso:", e);
    }
};


export const resetData = async () => {
  try{
    await AsyncStorage.removeItem("name");
    await AsyncStorage.removeItem("selectedAvatar");
  } catch (e){
    console.error("erro ao resetar dados",e)
  }
  
}
export const clearAppCache = async () => {
  try {
    await AsyncStorage.clear();
    
  } catch (e) {
    console.error("Erro ao limpar o cache do aplicativo:", e);
  }
};
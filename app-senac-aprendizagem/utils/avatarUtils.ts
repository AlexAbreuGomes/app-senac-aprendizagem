// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CarrosselAvatares } from '../types/carrosselAvataresTypes';
import { avatares } from '../data/carrosselAvatares';

const CUSTOM_AVATARS_KEY = 'customAvatars';

// Salvar avatar personalizado
export const saveCustomAvatar = async (uri: string): Promise<CarrosselAvatares> => {
  try {
    console.log('Salvando avatar personalizado com URI:', uri);
    const customAvatars = await getCustomAvatars();
    const newId = `custom_${Date.now()}`;
    
    const newAvatar: CarrosselAvatares = {
      id: newId,
      img: { uri }, // Mudança aqui: colocando a URI no formato correto
      isCustom: true,
      uri: uri,
    };

    const updatedAvatars = [...customAvatars, newAvatar];
    await AsyncStorage.setItem(CUSTOM_AVATARS_KEY, JSON.stringify(updatedAvatars));
    console.log('Avatar personalizado salvo no AsyncStorage');
    
    return newAvatar;
  } catch (error) {
    console.error('Erro ao salvar avatar personalizado:', error);
    throw error;
  }
};

// Recuperar avatares personalizados
export const getCustomAvatars = async (): Promise<CarrosselAvatares[]> => {
  try {
    const stored = await AsyncStorage.getItem(CUSTOM_AVATARS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao recuperar avatares personalizados:', error);
    return [];
  }
};

// Obter todos os avatares (pré-definidos + personalizados)
export const getAllAvatars = async (): Promise<CarrosselAvatares[]> => {
  try {
    const customAvatars = await getCustomAvatars();
    console.log('Avatares personalizados encontrados:', customAvatars.length);
    console.log('Avatares pré-definidos:', avatares.length);
    return [...avatares, ...customAvatars];
  } catch (error) {
    console.error('Erro ao obter todos os avatares:', error);
    return avatares;
  }
};

// Remover avatar personalizado
export const removeCustomAvatar = async (id: string): Promise<void> => {
  try {
    const customAvatars = await getCustomAvatars();
    const updatedAvatars = customAvatars.filter(avatar => avatar.id !== id);
    await AsyncStorage.setItem(CUSTOM_AVATARS_KEY, JSON.stringify(updatedAvatars));
  } catch (error) {
    console.error('Erro ao remover avatar personalizado:', error);
    throw error;
  }
};

// Salvar avatar selecionado (atualizada para suportar personalizados)
export const saveSelectedAvatar = async (avatar: CarrosselAvatares): Promise<void> => {
  try {
    await AsyncStorage.setItem('selectedAvatar', JSON.stringify(avatar));
  } catch (error) {
    console.error('Erro ao salvar avatar selecionado:', error);
    throw error;
  }
};
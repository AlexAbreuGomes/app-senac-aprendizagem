// components/ResetButton.tsx
import { Alert, Pressable, Text, StyleSheet } from 'react-native';
import { fullReset } from '../app/utils/storage';
import React from 'react';

export const ResetButton = () => {
  const handleReset = () => {
    Alert.alert(
      'Resetar Progresso',
      'Tem certeza que deseja apagar todo seu progresso?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => fullReset() }
      ]
    );
  };

  return (
    <Pressable onPress={handleReset} style={styles.button}>
      <Text style={styles.text}>Resetar Progresso</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#044B8B',
    padding: 2,
    width: 80,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 20,
    elevation: 3,
  },
  text: {
    color: '#ffffff57',
    fontFamily: 'IBM-Plex-Mono',
    fontSize: 12,
    textAlign: 'center',
  }
});
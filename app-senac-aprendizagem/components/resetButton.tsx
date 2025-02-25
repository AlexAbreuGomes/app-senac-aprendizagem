// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import { Alert, Pressable, Text, StyleSheet } from 'react-native';
import React from 'react';

type ResetButtonProps = {
  onReset: () => void; // Aceita uma função como argumento
  title?: string; // Permite personalizar o texto do botão
};

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset, title = "Resetar" }) => {
  const handlePress = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja apagar os dados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: onReset }
      ]
    );
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#044B8B',
    padding: 3,
    width: 80,
    borderRadius: 10,
    margin: 10,
    elevation: 3,
  },
  text: {
    color: '#ffffff',
    fontFamily: 'IBM-Plex-Mono',
    fontSize: 12,
    textAlign: 'center',
  }
});

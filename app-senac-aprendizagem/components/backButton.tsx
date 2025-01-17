import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Usando ícones do Ionicons (ou escolha outro)
import React from 'react';

type BackButtonProps = {
  onPress: () => void;
}

export const BackButton = ({ onPress }: BackButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Ionicons name="arrow-back" size={30} color="#044B8B" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 7,  // Ajusta o espaço ao redor do ícone,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: 15,
  },
});
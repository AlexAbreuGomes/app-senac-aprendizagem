import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../app/constants/colors'; // Ajuste conforme necessário

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

const Button = ({ title, onPress, style }: ButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.button,
      style,
      pressed && styles.pressed, // Estilo ao pressionar
    ]}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.accent,
    padding: 23,
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: 'LuckiestGuy-Regular', // Fonte personalizada
  },
  pressed: {
    opacity: 0.7, // Efeito de opacidade ao pressionar
  },
});

export default Button;
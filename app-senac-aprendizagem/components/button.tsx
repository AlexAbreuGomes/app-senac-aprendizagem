import { Pressable, Text, StyleSheet } from 'react-native';
import React from 'react';

type buttonProps = {
    onpress: () => void
    style?: any
    name: string
};
export const ButtonGeneric = ({onpress, style, name}: buttonProps) => {
    return (
        <Pressable onPress={onpress} style={style}>
            <Text style={[styles.button,  { fontFamily: 'LuckiestGuy' }]}>{name}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
  button: {
    fontFamily: "LuckiestGuy",
    fontSize: 20,
    padding: 0,  // Ajusta o espaço ao redor do ícone,
    color: "#fff",
  },
});

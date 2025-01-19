import { Pressable, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width

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
    width: screenWidth * 0.85,
    textAlign: "center",
    padding: 0,  // Ajusta o espaço ao redor do ícone,
    color: "#fff",
  },
});

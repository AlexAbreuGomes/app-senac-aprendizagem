import { Pressable, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width

type buttonProps = {
    onpress: () => void
    style?: any
    name: string
    url?: string
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
    fontSize: 30,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    
   
  },
});

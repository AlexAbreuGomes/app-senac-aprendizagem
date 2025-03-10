// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import { Pressable, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width

type buttonProps = {
    onPress: () => void
    style?: any
    name: string
    url?: string
};
export const ButtonGeneric = ({onPress, style, name}: buttonProps) => {
    return (
        <Pressable onPress={onPress} style={style}>
            <Text style={[styles.button,  { fontFamily: 'LuckiestGuy' }]}>{name}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
  button: {
    fontFamily: "LuckiestGuy",
    fontSize: 20,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.85,
    textAlign: "center",
   
  },
});

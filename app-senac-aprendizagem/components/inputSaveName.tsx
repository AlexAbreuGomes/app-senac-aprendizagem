// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import { View, Dimensions, StyleSheet, TextInput } from "react-native";
import React from 'react';

const screenWidth = Dimensions.get('window').width;

interface NameInputProps {
  onSave: (name: string) => void;
}

export const NameInput: React.FC<NameInputProps> = ({ onSave }) => {
  const handleChange = (value: string) => {
    onSave(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome..."
        placeholderTextColor="#114c8099"
        maxLength={15}
        onChangeText={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: screenWidth - 65,
    height: 50,
    borderColor: '#044B8B',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 20,
    fontFamily: 'IBMPlexMonoMedium',
    color: '#044B8B',
  },
});

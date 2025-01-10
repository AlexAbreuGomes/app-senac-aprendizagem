import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TextInput } from "react-native";
import React from 'react';

interface NameInputProps {
  onSave: (name: string) => void; // Função chamada ao alterar o nome
};

export const NameInput: React.FC<NameInputProps> = ({ onSave }) => {
  const handleChange = (value: string) => {
    onSave(value); // Atualiza o estado do nome no componente pai
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome..."
        placeholderTextColor="#114c8099"
        onChangeText={handleChange} // Chama a função passada por props
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#044B8B',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: -15,
    marginBottom: 20,
    paddingLeft: 10,
    width: 329,
    fontSize: 16,
    fontFamily: 'IBMPlexMonoMedium',
    color: '#044B8B',
  },
});

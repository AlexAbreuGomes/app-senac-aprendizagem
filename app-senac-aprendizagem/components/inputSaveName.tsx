import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TextInput } from "react-native";
import React, { useState } from 'react';

interface NameInputProps {
  onSave: (name: string) => void;
}

export const NameInput: React.FC<NameInputProps> = ({ onSave }) => {
  const [name, setName] = useState<string>('');

  const handleChange = (value: string) => {
    setName(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite  seu nome..."
        value={name}
        onChangeText={handleChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
   
  },
  input: {
    height: 40,
    borderColor: '#044B8B',
    borderWidth: 3,
    borderRadius: 10,
    width: 300,
  },
});



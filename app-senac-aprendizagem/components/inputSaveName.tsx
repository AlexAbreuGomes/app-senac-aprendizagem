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
         placeholderTextColor="#114c8099"
        value={name}
        onChangeText={handleChange}
        
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



// Screen.tsx

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Botao } from "../components/button"; // botão importado
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NameInput } from "../components/inputSaveName" // Importando o novo componente

export default function Screen() {
  const start = () => {
    router.replace("/home");
  };

  const saveNameToFile = async (name: string) => {
    try {
      await AsyncStorage.setItem('name', name);
      console.log('Nome salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o nome:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <Text style={styles.h1}>BEM-VINDO À SUA JORNADA DE APRENDIZADO!</Text>
      <Text style={styles.p}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim aliquam reiciendis esse natus! Officia porro iusto non odit, commodi magni consectetur quis adipisci nisi recusandae corporis facere doloribus facilis corrupti!</Text>

      {/* Chamando o componente NameInput */}
      <NameInput onSave={saveNameToFile} />

      <Botao 
        onpress={start} 
        style={styles.button} 
        name="começar"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  p: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  }
});

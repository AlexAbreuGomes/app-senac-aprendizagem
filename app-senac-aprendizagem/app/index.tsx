
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NameInput } from "../components/inputSaveName" // Importando o novo componente
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Button, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ButtonGeneric } from "../components/button"; // botão importado
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono_400Regular, IBMPlexMono_700Bold } from "@expo-google-fonts/ibm-plex-mono";


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

  useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMonoRegular: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
  });


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />


      <Text style={styles.h1}>BEM-VINDO À SUA JORNADA DE APRENDIZADO!</Text>
      <Text style={styles.p}>
        Esse app é seu guia no início do programa jovem aprendiz, com informações, ferramenta interativa e atividades para tornar seu aprendizado mais prático.
      </Text>
      <Text style={styles.p}>
      pesonalize sua expêriencia:
      </Text>
      <NameInput onSave={saveNameToFile} />
      <Text style={styles.h1}>Escolha seu avatar:</Text>
      <ButtonGeneric onpress={start} style={styles.button} name="começar" />

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
      fontFamily: "LuckiestGuy",
      fontSize: 22,
      color: "#044B8B",
    },
    p: {
      color: "#044B8B",
      fontFamily: "IBMPlexMonoRegular",
      fontSize: 16,
      textAlign: "center",
      padding:15,
    },
    button: {
      width: '85%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#F7941D",
      borderRadius: 30,
      elevation: 10, // Altere para aumentar a intensidade
      shadowColor: '#000', // Cor da sombra
      shadowOffset: { width: 0, height: 4 }, // Direção da sombra
      shadowOpacity: 0.1, // Transparência da sombra
      shadowRadius: 5, // Raio de desfoque
    },

});

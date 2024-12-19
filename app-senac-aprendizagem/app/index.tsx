
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
      <View style={styles.containerScreen}>

        <View style={styles.textSuperior}>
          <Text style={styles.h1Superior}>BEM-VINDO À SUA JORNADA DE APRENDIZADO!</Text>
        </View>

        <View style={styles.textInfo}>
          <Text style={styles.p}>
            Esse app é seu guia no início do programa jovem aprendiz, com informações, ferramenta interativa e atividades para tornar seu aprendizado mais prático.
          </Text>
        </View>
        
        <View>
          <Text style={styles.p}>pesonalize sua expêriencia:</Text>
          <NameInput onSave={saveNameToFile} />
        </View>

        <Text style={styles.h1Inferior}>Escolha seu avatar:</Text>

        <View>
          <Text>espaço avatares</Text>
        </View>


        <View>
          <ButtonGeneric onpress={start} style={styles.button} name="começar" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerScreen:{
    flex: 1,
  },
  textSuperior: {
    flex: 1,
    paddingTop:50,
    padding: 20,
    borderWidth:1,
    borderColor: "#044B8B",
    
    
  },
  textInfo:{
    flex: 2,
  },
  h1Superior: {
    fontFamily: "LuckiestGuy",
    fontSize: 22,
    color: "#044B8B",
  },
  h1Inferior: {
    fontFamily: "LuckiestGuy",
    fontSize: 22,
    color: "#F7941D",
  },
  p: {
    color: "#044B8B",
    fontFamily: "IBMPlexMonoRegular",
    fontSize: 16,
    textAlign: "center",

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

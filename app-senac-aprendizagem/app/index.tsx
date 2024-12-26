import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NameInput } from "../components/inputSaveName" // Importando o novo componente
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Button, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ButtonGeneric } from "../components/button"; // botão importado
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono, IBMPlexMono_400Regular, IBMPlexMono_700Bold, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";


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
    IBMPlexMonoMedium: IBMPlexMono_500Medium
  });


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar  />
      

      
      <View style={styles.cxBemVindo}>
      <Text style={styles.h1Superior}>BEM-VINDO À SUA JORNADA DE APRENDIZADO!</Text>
      </View>
      
      <View style={styles.cxSubtitulo}>
      <Text style={styles.p}>
        Esse app é seu guia no início do programa jovem aprendiz, com informações, ferramenta interativa e atividades para tornar seu aprendizado mais prático.
      </Text>
      </View>
      

      <View style={styles.cxGeral}>
      <Text style={styles.h1Inferior}>
      pesonalize sua expêriencia:
      </Text>
      <View>
      <NameInput onSave={saveNameToFile}  />
      </View>

      
      <Text style={styles.h1Inferior}>Escolha seu avatar:</Text>

      <View style={styles.avatars}>
        <Text style={styles.p}>Avatar 1</Text>
        <Text style={styles.p}>Avatar 2</Text>
        <Text style={styles.p}>Avatar 3</Text>
      </View>
    
      <ButtonGeneric onpress={start} style={styles.button}  name="começar"  />
      </View>

      <View style={styles.logo}>
        <Image resizeMode="contain" style={styles.imgLogo}   source={require("../assets/logo-senac.png")} />
      </View>

    </SafeAreaView>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 80,
      backgroundColor: "#fff",
      
    },
    cxBemVindo: {
      justifyContent: "flex-start",
      width: '85%',
      marginBottom: 10,

      
    },

    cxSubtitulo: {
      justifyContent: "center",
      alignItems: "center",
      width: '90%',
      marginBottom: 50,
      

    },

    cxGeral: {
      justifyContent: "center",
      alignItems: "flex-start",
      marginBottom: 20,
      width: '85%',
    },
    h1Superior: {
      fontFamily: "LuckiestGuy",
      fontSize: 24,
      color: "#044B8B",
      textAlign: "center"
    },
    h1Inferior: {
      fontFamily: "LuckiestGuy",
      fontSize: 17,
      color: "#F7941D",
    },
    p: {
      color: "#044B8B",
      fontFamily: "IBMPlexMonoMedium",
      fontSize: 16,
      marginBottom: 10,
      textAlign: "center",
      
      
      
    },
    avatars: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      marginTop: 10,
      width: '100%',
      height: 70,
      borderColor: "#044B8B",
      backgroundColor : "#fff",
      borderRadius: 20,
      padding: 10,
      elevation: 2.5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

    },
    button: {
      width: '101%',
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#F7941D",
      borderRadius: 30,
      marginTop: 20,
      marginBottom: 10,
      elevation: 5,
      shadowColor: "#044B8B",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    
    },
    logo: {
      justifyContent: "center",
      alignItems: "center",
      width: '100%',
      height: 70,
      backgroundColor : "#044B8B",
      
     
    },
    imgLogo: {
      width: 90,
      height: 100,
    },
    
    

});

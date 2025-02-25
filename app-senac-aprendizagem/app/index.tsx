// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NameInput } from "../components/inputSaveName";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LayoutAnimation, StyleSheet, Text, View, Image, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ButtonGeneric } from "../components/button";
import { CarrosselAvatar } from '../components/carrosselAvatares';
import { avatares } from '../data/carrosselAvatares';
import { CarrosselAvatares } from "../types/carrosselAvataresTypes";
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono, IBMPlexMono_400Regular, IBMPlexMono_700Bold, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";

const screenWidth = Dimensions.get('window').width;

export default function Screen() {
  const [userName, setUserName] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<CarrosselAvatares | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedName = await AsyncStorage.getItem("name");
      if (storedName) {
        setTimeout(() => {
          router.replace("/home");
        }, 100);
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const start = async () => {
    try {
      if (userName) {
        await AsyncStorage.setItem("name", userName);
      }
      if (selectedAvatar) {
        await AsyncStorage.setItem("selectedAvatar", JSON.stringify(selectedAvatar));
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      router.replace("/home");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  const saveNameToState = (name: string) => {
    setUserName(name);
  };

  const handleSelectAvatar = (avatar: CarrosselAvatares) => {
    setSelectedAvatar(avatar);
  };

  useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMonoRegular: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
    IBMPlexMonoMedium: IBMPlexMono_500Medium,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cxBemVindo}>
            <Text style={styles.h1Superior}>BEM-VINDO À SUA JORNADA DE APRENDIZADO!</Text>
          </View>

          <View style={styles.cxSubtitulo}>
            <Text style={styles.p}>
            Esse app é seu guia de início no programa de aprendizagem, com informações,
            ferramentas interativas e atividades para lhe ajudar nessa jornada.
            </Text>
          </View>

          <View style={styles.cxGeral}>
            <Text style={styles.h1Inferior2}>Personalize sua experiência:</Text>
            <NameInput onSave={saveNameToState} />
            <Text style={styles.h1Inferior}>Escolha seu avatar:</Text>
            <CarrosselAvatar
              data={avatares}
              onSelectAvatar={handleSelectAvatar}
              selectedAvatarId={selectedAvatar?.id}
            />
            <ButtonGeneric onPress={start} style={styles.button} name="Começar" />
          </View>
        </ScrollView>

        {/* Footer fixo, mas sem `position: absolute` */}
        <View style={styles.logo}>
          <Image
            resizeMode="contain"
            style={styles.imgLogo}
            source={require("../assets/images/conectar.png")}
          />
          <Text style={styles.logoText}>Conecta Aprendiz</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 20, // Garante espaço suficiente para o footer e botão
  },
  cxBemVindo: {
    justifyContent: "flex-start",
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
 
    cxSubtitulo: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%", // Antes estava 90%, o que pode estar limitando o texto
      paddingHorizontal: 20, // Adiciona espaçamento lateral para evitar corte
      marginBottom: 20,
    },
  cxGeral: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  h1Superior: {
    fontFamily: "LuckiestGuy",
    fontSize: 30,
    color: "#044B8B",
    textAlign: "center",
  },
  h1Inferior: {
    fontFamily: "LuckiestGuy",
    fontSize: 20,
    color: "#F7941D",
    textAlign: "justify",
    width: "100%",
    paddingBottom: 10,
    paddingLeft: 40,
    
  },
  h1Inferior2: {
    fontFamily: "LuckiestGuy",
    fontSize: 20,
    marginBottom: 10,
    color: "#F7941D",
    textAlign: "left",
    width: "100%",
    paddingTop: 20,
    paddingLeft: 40,
    
  },
  p: {
    color: "#044B8B",
    fontSize: 18,
    textAlign: "center", // Alterado de "justify" para "center" temporariamente
    width: "100%", // Antes estava 85%, pode estar limitando o texto
    paddingHorizontal: 20, // Adiciona espaçamento interno para evitar corte
    lineHeight: 24,
  },
  button: {
    width: screenWidth * 0.85,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
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
    width: "100%",
    height: 70,
    backgroundColor: "#044B8B",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#ffffff",
    width: 90,
    textAlign: "center",
    fontFamily: "LuckiestGuy",
    fontSize: 18,
  },
  imgLogo: {
    width: 35,
    height: 40,
    resizeMode: "contain",
  },
});

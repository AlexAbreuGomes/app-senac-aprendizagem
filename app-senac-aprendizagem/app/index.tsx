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
      <StatusBar backgroundColor="#ffffff" />

      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Conteúdo Principal */}
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>
                BEM-VINDO À{'\n'}SUA JORNADA DE{'\n'}APRENDIZADO!
              </Text>
            </View>

            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                Esse app é seu guia no início do programa jovem aprendiz, com informações,
                ferramentas interativas e atividades para lhe ajudar.
              </Text>
            </View>

            <View style={styles.customizationSection}>
              <Text style={styles.sectionTitle}>PERSONALIZE SUA EXPERIÊNCIA:</Text>
              <NameInput onSave={saveNameToState} />
              
              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>ESCOLHA SEU AVATAR:</Text>
              <CarrosselAvatar
                data={avatares}
                onSelectAvatar={handleSelectAvatar}
                selectedAvatarId={selectedAvatar?.id}
              />
            </View>

            <ButtonGeneric 
              onpress={start} 
              style={styles.startButton} 
              name="ComeçAR" 
            />
          </View>
        </ScrollView>

        {/* Footer Fixo */}
        <View style={styles.footer}>
          <Image
            style={styles.logoImage}
            source={require("../assets/images/conectar.png")}
          />
          <Text style={styles.footerText}>Conecta Aprendiz</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 90, // Espaço para o footer
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'LuckiestGuy',
    fontSize: 34,
    color: '#044B8B',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: 0.5,
  },
  descriptionBox: {
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  descriptionText: {
    fontFamily: 'IBMPlexMonoMedium',
    fontSize: 18,
    color: '#044B8B',
    textAlign: 'center',
    lineHeight: 24,
  },
  customizationSection: {
    width: '100%',
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontFamily: 'LuckiestGuy',
    fontSize: 20,
    color: '#F7941D',
    marginBottom: 15,
    paddingLeft: 8,
  },
  startButton: {
    width: screenWidth * 0.9,
    height: 70,
    backgroundColor: '#F7941D',
    borderRadius: 30,
    marginVertical: 25,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",

  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#044B8B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  footerText: {
    color: "#ffffff",
    width: 90,
    textAlign: "center",
    fontFamily: "LuckiestGuy",
    fontSize: 18,
    letterSpacing: 0.5,
    marginTop: 5,
  },
});
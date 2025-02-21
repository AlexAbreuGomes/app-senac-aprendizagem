import React, {  useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NameInput } from "../components/inputSaveName";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LayoutAnimation ,StyleSheet, Text, View, Image, Dimensions, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ButtonGeneric } from "../components/button";
import { CarrosselAvatar } from '../components/carrosselAvatares'; // Importando o componente CarrosselAvatar
import { avatares } from '../data/carrosselAvatares'; // Dados dos avatares
import { CarrosselAvatares } from "../types/carrosselAvataresTypes";
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono, IBMPlexMono_400Regular, IBMPlexMono_700Bold, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";


const screenWidth = Dimensions.get('window').width

export default function Screen() {
  const [userName, setUserName] = useState<string>(""); // Estado para o nome do usuário
  const [selectedAvatar, setSelectedAvatar] = useState<CarrosselAvatares | null>(null); // Estado para o avatar selecionado
  const [loading, setLoading] = useState(true); // Estado para exibir carregamento

  // 🚀 Verifica se o usuário já tem cadastro ao iniciar o app
  useEffect(() => {
    const checkUser = async () => {
      const storedName = await AsyncStorage.getItem("name");
      if (storedName) {
        setTimeout(() => {
          router.replace("/home");
        }, 100); // Pequeno delay para suavizar a transição
      } else {
        setLoading(false); // Se não tiver cadastro, exibe a tela normalmente
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
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.cxBemVindo}>
        <Text style={styles.h1Superior}>
          BEM-VINDO À SUA JORNADA DE APRENDIZADO!
        </Text>
      </View>

      <View style={styles.cxSubtitulo}>
        <Text style={styles.p}>
          Esse app é seu guia no início do programa jovem aprendiz, com
          informações, ferramentas interativas e atividades para lhe ajudar nessa jornada.
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
        <ButtonGeneric onpress={start} style={styles.button} name="Começar" />
      </View>

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",

  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cxBemVindo: {
    justifyContent: "flex-start",
    width: "100%",
    padding: 10,
    marginTop: 40,

  },
  cxSubtitulo: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "90%",
    height: "20%",

  },
  cxGeral: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "85%",

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
    textAlign: "left", // Garante alinhamento consistente
    flexShrink: 1,     // Permite que o texto seja reduzido para evitar quebra
    width: "100%",     // Ocupa toda a largura disponível
    paddingBottom: 10, // Espaçamento inferior

  },
  h1Inferior2: {
    fontFamily: "LuckiestGuy",
    fontSize: 20,
    marginBottom: 10,
    color: "#F7941D",
    textAlign: "left", // Garante alinhamento consistente
    flexShrink: 1,     // Permite que o texto seja reduzido para evitar quebra
    width: "100%",     // Ocupa toda a largura disponível
    paddingBottom: 10, // Espaçamento inferior

  },
  p: {
    color: "#044B8B",
    fontFamily: "IBMPlexMonoMedium",
    fontSize: 20,
    textAlign: "center",
    flexWrap: "wrap", // Permite quebra de linha
    width: "100%",
    lineHeight: 25, // Ajusta o espaçamento entre linhas
  },
  button: {
    width: screenWidth * 0.85,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
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
    width: "100%",
    height: 70,
    backgroundColor: "#044B8B",
    flexDirection: "row",
  },
  logoText: {
    color: "#ffffffff",
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

import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Carrossel } from "../../../components/carrossel"; // Ajuste conforme sua estrutura
import { imagensCarrossel } from "../../../data/carrosselAlunos"; // Ajuste conforme sua estrutura
import { Conteudos } from "../../../components/boxContent";
import { conteudosAprendizagem } from "../../../data/boxConteudosData";
import { avatares } from "../../../data/carrosselAvatares"; // Lista de avatares
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import {
  useFonts as IBMPlexMono,
  IBMPlexMono_400Regular,
  IBMPlexMono_700Bold,
  IBMPlexMono_500Medium,
} from "@expo-google-fonts/ibm-plex-mono";

const screenWidth = Dimensions.get("window").width;

export default function Screen() {
  useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMonoRegular: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
    IBMPlexMonoMedium: IBMPlexMono_500Medium,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<any>(null); // Para aceitar o retorno de require()

  // Recupera o nome e o avatar salvos
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedName = await AsyncStorage.getItem("name");
        const savedAvatar = await AsyncStorage.getItem("selectedAvatar");

        if (savedName) setUserName(savedName);
        if (savedAvatar) {
          const { id } = JSON.parse(savedAvatar); // Decodifica o objeto salvo
          const avatar = avatares.find((item) => item.id === id); // Busca o avatar correspondente
          if (avatar) setUserImage(avatar.img); // Define a imagem com require()
        }
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    fetchUserData();
  }, []);

  // Intervalo do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % imagensCarrossel.length;

        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderConteudos = ({ item }: { item: typeof conteudosAprendizagem[0] }) => (
    <Conteudos
      titulo={item.titulo}
      id={item.id} // Passando o id necessário
      onPress={item.onPress}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <Text style={styles.h1}>SENAC APRENDIZAGEM</Text>
      <View style={styles.viewFlatlist}>
        <FlatList
          ref={flatListRef}
          data={imagensCarrossel}
          renderItem={({ item }) => <Carrossel data={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
        />
      </View>
      <ScrollView>
        <View style={styles.nameInput}>
          {userImage && <Image source={userImage} style={styles.userImage} />}
          <Text style={styles.welcome}>
            {userName ? `Bem-vindo(a), ${userName}!` : "Bem-vindo(a)!"}
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <FlatList
            data={conteudosAprendizagem}
            renderItem={renderConteudos} // Usando renderConteudos para garantir que 'id' seja passado
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 25,
    color: "#044B8B",
    textAlign: "left",
    fontFamily: "LuckiestGuy",
    padding: 10,
    flexWrap: "wrap", // Permite que o texto quebre em várias linhas
    maxWidth: "80%", // Limita a largura máxima para que o texto quebre
  },

  userImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  nameInput: {
    width: screenWidth - 20,
    height: 130,
    backgroundColor: "#FFFFFF", // Fundo branco
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    padding: 10,
    shadowColor: "#0059B3", // Cor da sombra
    shadowOffset: {
      width: 5, // Deslocamento horizontal da sombra
      height: 10, // Deslocamento vertical da sombra
    },
    shadowOpacity: 0.3, // Transparência da sombra
    shadowRadius: 8, // Raio de desfoque da sombra
    elevation: 15, // Elevação para Android
  },

  h1: {
    fontSize: 30,
    color: "#044B8B",
    textAlign: "center",
    margin: 5,
    fontFamily: "LuckiestGuy",
  },
  viewFlatlist: {
    padding: 10,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

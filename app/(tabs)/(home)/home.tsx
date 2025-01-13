import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Carrossel } from "../../../components/carrossel"; // Ajuste conforme sua estrutura
import { imagensCarrossel } from "../../../data/carrosselAlunos"; // Ajuste conforme sua estrutura
import { Conteudos } from "../../../components/boxContent";
import { conteudosAprendizagem } from "../../../data/boxConteudosData";
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono_400Regular, IBMPlexMono_700Bold } from "@expo-google-fonts/ibm-plex-mono";

const screenWidth = Dimensions.get("window").width;

export default function Screen() {
  useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMonoRegular: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [userName, setUserName] = useState<string | null>(null); // Estado para armazenar o nome do usuário

  // Recupera o nome salvo
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const savedName = await AsyncStorage.getItem("name"); // Busca o nome do AsyncStorage
        if (savedName) {
          setUserName(savedName); // Atualiza o estado com o nome recuperado
        }
      } catch (error) {
        console.error("Erro ao recuperar o nome:", error);
      }
    };

    fetchUserName();
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
      id={item.id}  // Passando o id necessário
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

      {/* Exibe o nome do usuário se disponível */}
      <View style={styles.nameInput}>
        <Text style={styles.welcome}>
          {userName ? `Bem-vindo(a), ${userName}!` : "Bem-vindo(a)!"}
        </Text>
        <Text  style={styles.welcome}>
       {userName}  
        </Text>
      </View>

      <View style={styles.cardContainer}> {/* Container para centralizar os cards */}
        <FlatList
          data={conteudosAprendizagem}
          renderItem={renderConteudos}  // Usando renderConteudos para garantir que 'id' seja passado
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 18,
    color: "#044B8B",
    textAlign: "left",
    fontFamily: "LuckiestGuy",
    padding: 10,
  },
  nameInput: {
    width: screenWidth - 20,
    height: 100,
    borderWidth: 1,
    borderColor: "#0059B3",
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
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
  cardContainer: { // Adicionado para centralizar os cards
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

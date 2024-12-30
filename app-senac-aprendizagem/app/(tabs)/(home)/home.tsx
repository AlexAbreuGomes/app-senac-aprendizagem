import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Carrossel } from "../../../components/carrossel"; // Ajuste conforme sua estrutura
import { imagensCarrossel } from "../../../data/carrosselAlunos"; // Ajuste conforme sua estrutura
import { Conteudos } from "../../../components/boxContent";
import { conteudosAprendizagem } from "../../../data/boxConteudosData";
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono_400Regular, IBMPlexMono_700Bold } from "@expo-google-fonts/ibm-plex-mono";

export default function Screen() {
  useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMonoRegular: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

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

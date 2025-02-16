import { useRouter, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { conteudosAprendizagem } from "../../data/boxConteudosData";
import { VideoAprendizagem } from "../../components/videoComponent";
import { videos } from "../../data/videos";
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono, IBMPlexMono_400Regular, IBMPlexMono_700Bold, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;


export default function Detalhes() {
  const { id } = useLocalSearchParams(); // Pega o ID da URL
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    LuckiestGuy: require('@expo-google-fonts/luckiest-guy'),
  });

  useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMonoRegular: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
    IBMPlexMonoMedium: IBMPlexMono_500Medium,
  });

  // Encontra o conteúdo correspondente ao ID
  const conteudo = conteudosAprendizagem.find((item) => item.id === Number(id));

  // Filtra os vídeos relacionados ao conteúdo
  const videosDoConteudo = videos.filter((video) => video.id === Number(id));

  if (!conteudo) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Conteúdo não encontrado!</Text>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    );
  }

  //novo
  const markContentAsCompleted = async () => {
    try {
      const storageKey = "completedContentIds";
      const stored = await AsyncStorage.getItem(storageKey);
      const completedIds = stored ? JSON.parse(stored) as number[] : [];
  
      // Converte o id da URL para número
      const currentId = Number(id);
  
      // Se ainda não estiver concluído, adiciona o ID
      if (!completedIds.includes(currentId)) {
        completedIds.push(currentId);
        await AsyncStorage.setItem(storageKey, JSON.stringify(completedIds));
      }
    } catch (error) {
      console.error("Erro ao salvar conteúdo concluído:", error);
    }
    router.back();
  };
  

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView >
        <Text style={styles.title}>{conteudo.titulo}</Text>

        {videosDoConteudo.length > 0 && (
          <View style={styles.videosContainer}>
            {videosDoConteudo.map((video) => (
              <VideoAprendizagem key={video.id} data={video} />
            ))}
            
          </View>
          
        )}
        <View style={styles.container}>

          <Text style={styles.description}>{conteudo.descricao}</Text>
          <Text style= {styles.text}>{conteudo.texto}</Text>

          <View style={styles.congratulations}>
            <Text style={styles.h1}>Parabéns por concluir o conteúdo!</Text>
          </View>


          <View style={styles.congratulations}>
            <Text style={styles.h2}>clique no botão abaixo para seguir para o próximo tema e continuar aprendendo!</Text>
          </View>

          <TouchableOpacity onPress={markContentAsCompleted}  style={styles.button}>
            <Text style={styles.textButton}>Concluído</Text>
            <View style={styles.icon}>
              <FontAwesome name="arrow-right" size={20 as const} color="#F7941D" />
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>

  );

}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  videosContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  subTitulo: {
    fontSize: 20,
    marginBottom: 8,
    fontFamily: "LuckiestGuy",
    color: "#044B8B"
  },
  containerAll: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white"
  },
  title: {
    fontSize: 35,
    width: screenWidth -20 ,
    fontFamily: "LuckiestGuy",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    color: "#044B8B",

  },
  description: {
    fontSize: 20,
    marginBottom: 16,
    fontFamily: "LuckiestGuy",
    color: "#044B8B",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "IBMPlexMonoMedium",
    color: "#044B8B",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "LuckiestGuy",
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    color: "#044B8B"
  },
  dica: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: "IBMPlexMonoMedium",
    color: "#044B8B"
  },
  subsection: {
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify",
    alignContent: "center",
    color: "#044B8B"
  },
  subTitle: {
    fontSize: 18,
    fontFamily: "LuckiestGuy",
    color: "#044B8B"
  },
  subText: {
    fontSize: 16,
    marginTop: 4,
    fontFamily: "IBMPlexMonoMedium",
    color: "#044B8B",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify",
  },
  imageDesc: {
    fontSize: 14,
    fontFamily: "IBMPlexMonoMedium",
    color: "#044B8B",
    marginTop: 4,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  button: {
    width: "101%",
    height: 70,
    flexDirection: "row",
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
  icon: {
    width: 35,
    height: 35,
    marginLeft: 20, // Espaço entre texto e ícone
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50, // Torna o contêiner do ícone circular
    backgroundColor: "#ffff", // Fundo transparente
    justifyContent: "center", // Centraliza o ícone verticalmente
    alignItems: "center", // Centraliza o ícone horizontalmente
  },
  textButton: {
    color: "#ffffff",
    fontFamily: "LuckiestGuy",
    fontSize: 20,
  },
  congratulations: {
    marginTop: 20,
    alignItems: "center", // Centraliza os filhos horizontalmente
    justifyContent: "center", // Centraliza os filhos verticalmente
    textAlign: "center", // Centraliza o texto dentro do componente
  },
  h1: {
    fontSize: 16,
    fontFamily: "LuckiestGuy",
    color: "#044B8B"
  },
  h2: {
    fontSize: 12,
    fontFamily: "IBMPlexMonoBold",
    color: "#044B8B"
  }
});

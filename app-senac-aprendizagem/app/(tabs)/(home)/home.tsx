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
import { useFonts as IBMPlexMono, IBMPlexMono_400Regular, IBMPlexMono_700Bold, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "expo-router";
import { calculateScorePercentage } from "../../utils/scoreUtils";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
  const [completedContentIds, setCompletedContentIds] = useState<number[]>([]);
  const [percentage, setPercentage] = useState<number>(0);  // Mudar para número

  // Função para recuperar o nome e o avatar salvos
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

  // Função para recuperar conteúdos concluídos
  const fetchCompletedContent = async () => {
    try {
      const storageKey = "completedContentIds";
      const stored = await AsyncStorage.getItem(storageKey);
      setCompletedContentIds(stored ? JSON.parse(stored) : []);
    } catch (error) {
      console.error("Erro ao recuperar conteúdos concluídos:", error);
    }
  };

  // Efeito para carregar dados do usuário e conteúdos concluídos ao iniciar
  useEffect(() => {
    fetchUserData();
    fetchCompletedContent();
  }, []);

  // Atualiza os conteúdos concluídos quando a tela fica em foco
  useFocusEffect(
    React.useCallback(() => {
      fetchCompletedContent();
    }, [])
  );

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

  useEffect(() => {
    const loadScore = async () => {
      try {
        const storedScore1 = await AsyncStorage.getItem("quizScore1");
        const storedScore2 = await AsyncStorage.getItem("quizScore2");
        const storedScore3 = await AsyncStorage.getItem("quizScore3");
        if (storedScore3 && storedScore2 && storedScore1) {
          const modulo3 = JSON.parse(storedScore3);
          const modulo2 = JSON.parse(storedScore2);
          const modulo1 = JSON.parse(storedScore1);
          const mediaScore = (modulo1.score + modulo2.score + modulo3.score) / 3
          setPercentage(mediaScore); // Exibe o score diretamente
        } else if (storedScore2 && storedScore1) {
          const modulo2 = JSON.parse(storedScore2);
          const modulo1 = JSON.parse(storedScore1);
          const mediaScore = (modulo1.score + modulo2.score) / 2
          setPercentage(mediaScore);
        } else if (storedScore1) {
          const modulo1 = JSON.parse(storedScore1);
          setPercentage(modulo1.score);
        }
      } catch (error) {
        console.error("Erro ao carregar pontuação:", error);
      }
    };

    loadScore();
  }, []);

  const renderConteudos = ({ item }: { item: typeof conteudosAprendizagem[0] }) => (
    <Conteudos
      titulo={item.titulo}
      id={item.id} // Passando o id necessário
      icon={item.icon}
      isCompleted={completedContentIds.includes(item.id)} // passa true se o conteúdo estiver concluído
      onPress={item.onPress}
    />
  );



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.h1}>CONECTA APRENDIZ</Text>

      <View style={styles.viewFlatlist}>
        <FlatList
          ref={flatListRef}
          data={imagensCarrossel}
          renderItem={({ item }) => <Carrossel data={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        ListHeaderComponent={
          <View style={styles.fistBox}>
            <View style={styles.pontuacao}>
              <View style={styles.posicaoNome}>
                {userImage && <Image source={userImage} style={styles.userImage} />}

                <Text style={styles.welcome}>
  {userName ? `Bem-vindo(a).\n${userName}` : "Bem-vindo(a)."}
</Text>

              </View>
              {/* Pontuação abaixo do nome */}

              <View style={styles.pontosContainer}>
                <MaterialIcons name="stars" size={25} color="#F7941D" />
                <View style={styles.pontosTexto}>
                <Text style={styles.pontos}>Score:</Text>
                <Text style={styles.pontos}>{percentage.toFixed(2)}%</Text>
                </View>
              </View>
            </View>
          </View>

        }
        data={conteudosAprendizagem}
        renderItem={renderConteudos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fistBox: {
    justifyContent: "center",
    width: screenWidth - 20,
    
    backgroundColor: "#FFFFFF", // Fundo branco
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#0059B3", // Cor da sombra
    shadowOffset: {
      width: 5, // Deslocamento horizontal da sombra
      height: 10, // Deslocamento vertical da sombra
    },
    shadowOpacity: 0.3, // Transparência da sombra
    shadowRadius: 8, // Raio de desfoque da sombra
    elevation: 15, // Elevação para Android
  },
  welcome: {
    fontSize: 20,
    color: "#044B8B",
    textAlign: "left",
    fontFamily: "LuckiestGuy",
    width: '80%',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },

  pontuacao: {
    flexDirection: "row", // Deixa os pontos e conteúdos lado a lado
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",

  },

  posicaoNome: {
    width: "75%",
    flexDirection: "row",
    alignContent: "center", // Deixa os pontos e conteúdos lado a lado
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },

  conteudos: {
    color: "#044B8B",
    fontFamily: "LuckiestGuy",
    fontSize: 18,
  },

  pontosContainer: {
    flexDirection: "row", // Empilha os elementos dentro da pontuação
    alignItems: "flex-start",
    alignContent: "flex-end",
    justifyContent: "flex-end"
  },
  pontosTexto: {
    flexDirection: "column",
    alignItems: "flex-end",
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  pontos: {
    color: "#F7941D",
    fontFamily: "LuckiestGuy",
    fontSize: 18,
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
    flexGrow: 1, // Garante que o FlatList ocupe o espaço restante
    justifyContent: "center", // Garante que o conteúdo apareça no topo
    alignItems: "center",
    padding: 10,
  },
});

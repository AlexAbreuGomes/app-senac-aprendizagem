import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Carrossel } from "../../../components/carrossel";
import { imagensCarrossel } from "../../../data/carrosselAlunos";
import { Conteudos } from "../../../components/boxContent";
import { conteudosAprendizagem } from "../../../data/boxConteudosData";
import { avatares } from "../../../data/carrosselAvatares";
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono, IBMPlexMono_400Regular, IBMPlexMono_700Bold, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { calculateScorePercentage } from "../../utils/scoreUtils";

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
  const [userImage, setUserImage] = useState<any>(null);
  const [quizAverage, setQuizAverage] = useState<string | null>(null);

  const [percentage, setPercentage] = useState<number>(0);  // Mudar para número

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedName = await AsyncStorage.getItem("name");
        const savedAvatar = await AsyncStorage.getItem("selectedAvatar");

        if (savedName) setUserName(savedName);
        if (savedAvatar) {
          const { id } = JSON.parse(savedAvatar);
          const avatar = avatares.find((item) => item.id === id);
          if (avatar) setUserImage(avatar.img);
        }
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };


    fetchUserData();
  }, []);

  useEffect(() => {
    const loadScore = async () => {
      try {
        const storedScore = await AsyncStorage.getItem("quizScore");
        console.log("Teste StoreScore", storedScore);
        if (storedScore) {
          const { score, totalQuestions } = JSON.parse(storedScore);
          // Se score já for a porcentagem, então não precisa de cálculo.
          setPercentage(score); // Exibe o score diretamente
          console.log("Pontuação carregada:", { score, totalQuestions });
        }
      } catch (error) {
        console.error("Erro ao carregar pontuação:", error);
      }
    };

    loadScore();
  }, []);

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
      id={item.id}
      icon={item.icon}
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
        />
      </View>

      <FlatList
        ListHeaderComponent={
          <View style={styles.nameInput}>
            {userImage && <Image source={userImage} style={styles.userImage} />}

            <View style={styles.pontuacao}>
              <Text style={styles.welcome}>
                {userName ? `Bem-vindo(a), ${userName}!` : "Bem-vindo(a)!"}
              </Text>

              <View style={styles.posicaoPontos}>
                <View style={styles.pontosContainer}>
                  <MaterialIcons name="stars" size={24} color="#F7941D" />
                  <Text style={styles.pontos}>{"Total Pontos:"} {percentage.toFixed(2)}%</Text>
                </View>

                <View style={styles.pontosContainer}>
                  <MaterialIcons name="task" size={24} color="#044B8B" />
                  <Text style={styles.conteudos}>Conteúdo Concluído</Text>
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
  welcome: {
    fontSize: 20,
    color: "#044B8B",
    textAlign: "left",
    fontFamily: "LuckiestGuy",
    paddingLeft: 10,
    flexDirection: "row",

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
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    flexDirection: "row",
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
  pontuacao: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",

  },

  posicaoPontos: {
    flexDirection: "column",
    justifyContent: "space-between", // Distribui os itens nas extremidades
    width: "100%", // Garante que ocupem toda a largura disponível
    marginTop: 35, // Espaçamento entre "Bem-vindo(a)" e os pontos
  },

  conteudos: {
    color: "#044B8B",
    fontFamily: "LuckiestGuy",
    fontSize: 15,
    marginRight: 10
  },
  pontosContainer: {
    flexDirection: "row",
    alignItems: "center",  // Centraliza verticalmente
    justifyContent: "center", // Centraliza horizontalmente
    marginLeft: -40
  },
  pontos: {
    color: "#F7941D",
    fontFamily: "LuckiestGuy",
    fontSize: 15,
    marginLeft: 5, // Espaço entre o ícone e o texto
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

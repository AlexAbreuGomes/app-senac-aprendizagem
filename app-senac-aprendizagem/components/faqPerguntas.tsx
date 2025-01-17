import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Faq } from "../types/faqTypes";
import { useState } from "react";
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import {
  useFonts as IBMPlexMono,
  IBMPlexMono_400Regular,
  IBMPlexMono_700Bold,
  IBMPlexMono_500Medium,
} from "@expo-google-fonts/ibm-plex-mono";
import React from "react";

type Props = {
  data: Faq;
};

export const FaqPerguntas = ({ data }: Props) => {
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const alternarResposta = () => {
    setMostrarResposta(!mostrarResposta);
  };

  useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMonoRegular: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
    IBMPlexMonoMedium: IBMPlexMono_500Medium,
  });

  return (
    <View style={styles.areaPerguntaResposta}>
      <TouchableOpacity style={styles.areaFaq} onPress={alternarResposta}>
        <Text style={styles.textFaq}>{data.pergunta}</Text>
        <Image style={styles.iconSeta} source={require("../assets/icon-seta-down.png")} />
      </TouchableOpacity>
      {mostrarResposta && (
        <View style={styles.respostaContainer}>
          <Text style={styles.textResposta}>{data.resposta}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  areaPerguntaResposta: {
    flex: 1,
    width: "100%",
  },
  areaFaq: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#044B8B",
    backgroundColor: "#F0F8FF", // Fundo leve para destaque
  },
  textFaq: {
    flex: 1, // Adicionado para evitar quebra de linha
    fontSize: 18,
    fontFamily: "IBMPlexMonoBold",
    textAlign: "left",
    color: "#044B8B",
  },
  iconSeta: {
    width: 24,
    height: 24,
  },
  respostaContainer: {
    marginTop: 5, // Espaço entre pergunta e resposta
    padding: 15,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#044B8B",
    backgroundColor: "#E6F7FF", // Fundo diferenciado para respostas
  },
  textResposta: {
    fontSize: 16,
    fontFamily: "IBMPlexMonoMedium",
    textAlign: "justify",
    color: "#044B8B",
    lineHeight: 22, // Melhor espaçamento entre linhas
  },
});

// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, FlatList, View, ScrollView } from "react-native";
import { PDFItem } from "../../../components/pdfButton";
import { PDF } from "../../../data/pdf"; // Importe o array de PDFs
import React from "react";
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono, IBMPlexMono_400Regular, IBMPlexMono_700Bold, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";
import { StatusBar } from "expo-status-bar";

export default function Screen() {
  const [fontsLoaded] = useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMonoRegular: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
    IBMPlexMonoMedium: IBMPlexMono_500Medium,
  });

  if (!fontsLoaded) {
    return null; // Aguarde o carregamento das fontes
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false} // Remove a barra de rolagem vertical
      >
        
        <Text style={styles.h1}>O que é uma ata?</Text>
        <View style={styles.textOne}>
          <Text style={styles.cxTexto}>
            No Senac, utilizamos a ata como uma ferramenta essencial para acompanhar as
            atividades realizadas pelo aprendiz no ambiente de trabalho. Esta prática está alinhada
            à metodologia pedagógica baseada em competências, que visa integrar teoria e prática
            de forma efetiva.
            {"\n\n"}
            A ata é preenchida pelo aluno e serve para registrar, de maneira detalhada, as tarefas
            desempenhadas, os desafios enfrentados e as habilidades desenvolvidas pelo
            estudante. Este documento é fundamental para garantir que as atividades realizadas estejam de
            acordo com o plano pedagógico do curso e que contribuam para o desenvolvimento
            das competências previstas.
            {"\n\n"}
            Além de ser um registro formal das ações do aprendiz, a ata permite que o instrutor acompanhe
            o progresso do aluno no contexto profissional, identifique possíveis lacunas e proponha intervenções,
            se necessário. Assim, asseguramos que o progresso de aprendizagem seja significativo e promova o crescimento 
            pessoal e profissional do aprendiz.
            {"\n\n"}
            O uso da ata reforça a parceria entre a instituição de ensino, 
            a empresa e o aprendiz, criando um canal de comunicação e promovendo 
            a excelência no desenvolvimento de competências no âmbito da Educação Profissional.
          </Text>
        </View>

        <Text style={styles.h1}>Exemplos de ATA</Text>

        <FlatList
          data={PDF} // A lista de PDFs
          keyExtractor={(item) => item.id.toString()} // Converte o ID para string
          renderItem={({ item }) => <PDFItem item={item} />} // Renderiza um PDFItem
          contentContainerStyle={styles.listContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  h1: {
    fontSize: 30,
    color: "#044B8B",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
    fontFamily: "LuckiestGuy",
  },
  listContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
    flexWrap: "wrap",
  },
  cxTexto: {
    fontFamily: "IBMPlexMonoMedium",
    fontSize: 16,
    color: "#044B8B",
    textAlign: "justify",
    width: "100%", // Garante que o texto ocupa toda a largura
    lineHeight: 22, // Ajusta o espaçamento entre linhas
    flexWrap: "wrap", // Permite a quebra de palavras
    overflow: "hidden", // Evita transbordamento
  },
  textOne: {
    width: "100%",
    padding: 10,
  },
});

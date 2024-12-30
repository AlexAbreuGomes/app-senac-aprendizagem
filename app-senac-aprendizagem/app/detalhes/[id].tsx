import { useRouter, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { conteudosAprendizagem } from "../../data/boxConteudosData";

export default function Detalhes() {
  const { id } = useLocalSearchParams(); // Pega o ID da URL
  const router = useRouter();

  // Encontra o conteúdo correspondente ao ID
  const conteudo = conteudosAprendizagem.find((item) => item.id === Number(id));

  if (!conteudo) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Conteúdo não encontrado!</Text>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{conteudo.titulo}</Text>
      <Text style={styles.description}>{conteudo.descricao}</Text>
      <Text style={styles.text}>{conteudo.texto}</Text>

      {/* Renderizar dicas, se existirem */}
      {conteudo.dicas && (
        <View>
          <Text style={styles.subtitle}>Dicas:</Text>
          {conteudo.dicas.map((dica, index) => (
            <Text key={index} style={styles.dica}>• {dica}</Text>
          ))}
        </View>
      )}

      {/* Renderizar subtítulos, se existirem */}
      {conteudo.subtitulos && (
        <View>
          <Text style={styles.subtitle}>Subtítulos:</Text>
          {conteudo.subtitulos.map((subtitulo, index) => (
            <View key={index} style={styles.subsection}>
              <Text style={styles.subTitle}>{subtitulo.titulo}</Text>
              <Text style={styles.subText}>{subtitulo.conteudo}</Text>
              {subtitulo.imagem && (
                <Text style={styles.imageDesc}>{subtitulo.imagem.descricao}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Renderizar imagens, se existirem */}
      {conteudo.imagens && (
        <View>
          <Text style={styles.subtitle}>Imagens:</Text>
          {conteudo.imagens.map((imagem, index) => (
            <Text key={index} style={styles.imageDesc}>
              {imagem.descricao}
            </Text>
          ))}
        </View>
      )}

      <Button title="Voltar" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
  },
  dica: {
    fontSize: 16,
    marginLeft: 8,
  },
  subsection: {
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 16,
    marginTop: 4,
  },
  imageDesc: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    marginTop: 4,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

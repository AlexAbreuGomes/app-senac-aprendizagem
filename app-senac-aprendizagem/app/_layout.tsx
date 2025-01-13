import { useRouter, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router/stack";
import React from "react";
import { BackButton } from "../components/backButton";
import { conteudosAprendizagem } from "../data/boxConteudosData"; // Importa os conteúdos

export default function Layout() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Obtém o ID da rota

  // Encontra o título com base no ID
  const conteudo = conteudosAprendizagem.find((item) => item.id === Number(id));
  const titulo = conteudo ? conteudo.titulo : "" ; // Fallback para "Detalhes" se o conteúdo não for encontrado

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Desativa o cabeçalho globalmente
      }}
    >
      {/* Rota inicial */}
      <Stack.Screen name="index" />

      {/* Rotas de abas */}
      <Stack.Screen name="(tabs)" />

      {/* Rota dinâmica para detalhes */}
      <Stack.Screen
        name="detalhes/[id]"
        options={{
          headerShown: true,
          title: titulo, // Usa o título dinâmico
          headerTitleStyle: {
            fontSize: 16,
            fontFamily: "LuckiestGuy",
            color: "#fff", // Cor do texto do título
          },
          headerStyle: {
            backgroundColor: "#044B8B", // Cor de fundo do cabeçalho
          },
          headerTintColor: "#fff", // Define a cor da seta e do texto "voltar"
          headerLeft: () => (
            <BackButton
              onPress={() => {
                console.log("Botão de voltar pressionado!");
                router.back();
              }}
            /> // Botão de voltar com log
          ),
        }}
      />
    </Stack>
  );
}

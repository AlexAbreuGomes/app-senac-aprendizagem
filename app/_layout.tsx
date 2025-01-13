import { Stack } from "expo-router/stack";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Desativa o cabeçalho globalmente
      }}
    >
      
      {/* Rotas de abas */}
      <Stack.Screen name="(tabs)"  />
      
      {/* Rota dinâmica para detalhes */}
      <Stack.Screen 
        name="detalhes/[id]" 
        options={{
          headerShown: true, // Mostra o cabeçalho apenas na tela de detalhes
          title: "Detalhes", // Define o título do cabeçalho
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}

import { Stack } from 'expo-router/stack';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Desativa o cabeçalho globalmente
      }}
    >
      {/* Tela inicial com o botão de Iniciar Quiz */}
      <Stack.Screen name="quiz"  />
    </Stack>
  );
}

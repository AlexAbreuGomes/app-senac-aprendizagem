import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router'; // Uso do expo-router para navegação

const App = () => {
  // Carregar as fontes globalmente
  const [fontsLoaded] = useFonts({
    'LuckiestGuy-Regular': require('../quizAprendizagem/assets/fonts/LuckiestGuy-Regular.ttf'),
    'IBM-Plex-Mono': require('../quizAprendizagem/assets/fonts/IBMPlexMono-Bold.ttf' ),
    'IBM-Plex-Mono2': require('../quizAprendizagem/assets/fonts/IBMPlexMono-Regular.ttf' ),
    'IBM-Plex-Mono3': require('../quizAprendizagem/assets/fonts/IBMPlexMono-Medium.ttf' )
  });

  // Verificar se as fontes estão carregadas, caso contrário, mostrar uma mensagem
  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  // Renderizar a navegação do expo-router
  return <Slot/>; // Isso renderiza a tela baseada na rota atual
};

export default App;

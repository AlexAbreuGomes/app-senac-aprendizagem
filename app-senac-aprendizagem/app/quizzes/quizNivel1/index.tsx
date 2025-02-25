// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Image, SafeAreaView, Platform } from 'react-native';
import { Stack, Tabs, useRouter } from 'expo-router';
import { useFonts } from 'expo-font'; 
import Button from '../../../components/ButtonQuiz'; // Importando o botão padronizado
import { COLORS } from '../../../constants/colors';
import { BackButton } from '../../../components/backButton';



const Index = () => {
  const router = useRouter();

    const [fontsLoaded] = useFonts({
       'LuckiestGuy-Regular': require('../../../assets/fonts/LuckiestGuy-Regular.ttf'),
       'IBM-Plex-Mono': require('../../../assets/fonts/IBMPlexMono-Bold.ttf' ),
       'IBM-Plex-Mono2': require('../../../assets/fonts/IBMPlexMono-Regular.ttf' ),
       'IBM-Plex-Mono3': require('../../../assets/fonts/IBMPlexMono-Medium.ttf' )
     });
  
    // Verificar se as fontes estão carregadas, caso contrário, mostrar uma mensagem
    if (!fontsLoaded) {
      return <Text>Carregando fontes...</Text>;
    }
  
 

  return (
    <>
    
    <Stack.Screen
            options={{
              headerShown: true,
              title: "Quiz  do  aprendizado - Nivel 1",
              headerTitleStyle: {
                fontSize: 18,
                color: "#ffffff",
                fontFamily: "LuckiestGuy-Regular",
                
              },
              animation: "slide_from_bottom",
              
              headerTitleAlign: "center",

              headerStyle: {
                backgroundColor: "#044B8B",  
              },
              headerTintColor: "#fff",
              headerLeft: () =>
                Platform.OS === "ios" ? <BackButton /> : null,
            }}
          />
 
      

    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background}  translucent={true}  />
      
      <View style={styles.header}>
        <Image source={require('../../../assets/images/icon-gear-quiz1.png')} style={styles.image} />
        <Text style={styles.title1}>Fundamentos do Conteúdo aprendido</Text>
      </View>
     

      {/* <Text style={styles.title}>Introdução ao Quiz</Text> */}

      {/* <Text style={styles.subtitle}>Antes de começar, veja como funciona e o que esperar:</Text> */}

      

      <View style={styles.pointsContainer}>
        <Text style={styles.pointTitle}>Desafio:</Text>
        <Text style={styles.pointDescription}>Acertar <Text style={{ fontFamily: 'IBM-Plex-Mono' }}> no mínimo 70% das perguntas</Text> para avançar para o próximo nível.</Text>
      </View>

      <View style={styles.pointsContainer}>
        <Text style={styles.pointTitle}>O que esperar:</Text>
        <Text style={styles.pointDescription}>Testar seus conhecimentos sobre o programa de aprendizagem</Text>
      </View>

      <View style={styles.pointsContainer}>
        <Text style={styles.pointTitle}>Como funciona:</Text>
        <Text style={styles.pointDescription}>Cada pergunta aborda os principais conceitos aprendidos. Responda com atenção!</Text>
      </View>

      {/* Substituindo o botão nativo pelo botão padronizado */}
      <Button  style={styles.button}
        title="Iniciar Quiz" 
        onPress={() => router.replace('quizzes/quizNivel1/quizGame1')} 
        
      />
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#044B8B',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 2,
    resizeMode: 'contain',
  },
  title1: {
    width: '90%',
    fontSize: 24,
    fontFamily: 'LuckiestGuy-Regular',
    color: '#ffffff',
    textAlign: 'left',
    flexWrap: "wrap", // Permite que o texto quebre em várias linhas
    maxWidth: "75%", // Limita a largura máxima para que o texto quebre
  },
  title: {
    fontSize: 20,
    fontFamily: 'IBM-Plex-Mono',
    marginBottom: 5,
    marginTop: 20,
    textAlign: 'left',
    color: '#ffffff',
    paddingLeft: 15,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'IBM-Plex-Mono',
    marginBottom: 40,
    marginTop: 40,
    textAlign: 'left',
    color: '#ffffff',
     marginHorizontal: 15,
  },
  pointsContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
    width: '90%',
  },
  pointTitle: {
    fontSize: 17,
  fontFamily: 'IBM-Plex-Mono',
    color: '#ffffff',
  },
  pointDescription: {
    fontSize: 16,
    fontFamily: 'IBM-Plex-Mono2',  
    color: '#ffffff',
    marginTop: 5,
  },
  button: {
  marginTop: 50,
  },
 
});

export default Index;
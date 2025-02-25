// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono, IBMPlexMono_400Regular, IBMPlexMono_700Bold, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";
import { Linking } from "react-native";
import React from "react";
import { ButtonGeneric } from "../../../components/button";


const screenWidth = Dimensions.get('window').width;

export default function Screen() {

    // const [fontsLoaded] = useFonts({
    //     LuckiestGuy: require('@expo-google-fonts/luckiest-guy'),
    // });

    useFonts({
        LuckiestGuy: LuckiestGuy_400Regular,
        IBMPlexMonoRegular: IBMPlexMono_400Regular,
        IBMPlexMonoBold: IBMPlexMono_700Bold,
        IBMPlexMonoMedium: IBMPlexMono_500Medium,
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <ScrollView>
                <View style={styles.containerImg}>
                    <Image
                        source={require('../../../assets/alunos/foto-4.jpeg')}
                        style={styles.img}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.textOne}>
                    <Image
                        source={require('../../../assets/icon-conheca-one.png')}
                        style={styles.iconOne}
                    />
                    <Text style={styles.h1}>O que é o Conecta Aprendiz?</Text>
                    <Text style={styles.h2}>O Conecta Aprendiz é um aplicativo desenvolvido por alunos do curso Técnico de Desenvolvimento de Sistemas do Senac-RN Zona Norte da turma 2023.14.109, em parceria com a turma 08/2024 de Aprendizagem em Serviços de Supermercado também do CEP Zona Norte. 

                        {"\n\n"}
                        O objetivo é oferecer suporte prático, dinâmico e motivador, tirando as dúvidas mais comuns dos aprendizes e proporcionando uma experiência de aprendizado acessível e enriquecedora.
                    
                    </Text>
                </View>

                <View style={styles.textTwo}>
                    <Image
                        source={require('../../../assets/icon-conheca-two.png')}
                        style={styles.iconOne}
                    />
                    <Text style={styles.h1}>Por trás do Conecta Aprendiz</Text>

                    <Text style={styles.h2}>
                        A ideia surgiu ao identificar a necessidade de esclarecer as dúvidas mais comuns dos aprendizes, como por exemplo: primeiro dia no curso, primeiro dia na empresa, timidez, lidando com o público, ata, lei de aprendizagem e etc.
                        {"\n\n"}

                        O Conecta Aprendiz visa também trazer um apoio socioemocional aos iniciantes, buscando uma conexão emocional. Através dos vídeos de experiência na aprendizagem dos aprendizes concluintes dessa jornada, mostramos que eles também vivenciaram situações de medo, ansiedade, dentre outros, mas que, com apoio, conseguiram vencer.
                        {"\n\n"}

                        A dedicação dos alunos de ambos os cursos e a orientação dos professores foram fundamentais para criar uma ferramenta que apoiasse e fortalecesse o aprendizado do aprendiz.
                        {"\n\n"}

                        O aplicativo foi desenvolvido como parte do Projeto Integrador dos alunos de Desenvolvimento de Sistemas da turma 2023.14.109 e Projeto Integrador III da turma 08/2024 de Supermercado.
                    </Text>

                </View>

                <View style={styles.textThree}>
                    <Image
                        source={require('../../../assets/icon-conheca-three.png')}
                        style={styles.iconOne}
                    />

                    <Text style={styles.h1}>Aplicativo Desenvolvido por:</Text>
                    

                    <View style={styles.linking}>
                        {[
                            { name: 'Daniew Cruz', url: 'https://www.linkedin.com/in/daniewcruz/' },
                            { name: 'Alex Abreu Gomes', url: 'https://www.linkedin.com/in/alexdeabreu/' },
                            { name: 'Wesllen Ferreira', url: 'https://www.linkedin.com/in/wesllen-d-b-ferreira/' },
                            { name: 'Rafael Bezerra', url: 'https://www.linkedin.com/in/rafabsilva/' },
                            { name: 'Jean Carlo Costa', url: 'https://www.linkedin.com/in/jean-carlo-costa' },
                            { name: 'Pedro Henrique', url: 'https://www.linkedin.com/in/pedro-henrique-724778316' },
                            
                        ].map((developer, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => Linking.openURL(developer.url)}
                                activeOpacity={0.7} // Dá um leve efeito ao toque
                            >
                                <Text style={styles.linkText}>
                                    {developer.name}
                                    {index < 6 ? '' : ''}
                                </Text>
                            </TouchableOpacity>
                        ))}

                       
                    </View>

                </View>

                <View style={styles.textFor}>
                    <Image
                        source={require('../../../assets/icon-conheca-for.png')}
                        style={styles.iconOne}
                    />
                    <Text style={styles.h1}>Conteúdo educativo</Text>
                    <Text style={styles.h2}>Elaborado pelos alunos Jovens Aprendizes da turma 08/2024 CEP Zona Norte/RN,
                        e pela Instrutora Thalissa Vitória, garantindo que o conteúdo seja relevante e
                        acessível para os iniciantes dessa jornada.
                    </Text>
                </View>

                <View style={styles.formulario}>
    <Text style={styles.h3}>Gostou do app? Deixe sua opinião no </Text>
    
    <ButtonGeneric 
        onPress={() => Linking.openURL('https://forms.gle/U7FGFs3SeCi16jh6A')} style={styles.button}
        name="Formulário de Feedback"
        
    />
</View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerImg: {
        width: "100%",
        height: 180,
        alignItems: "center",
    },
    img: {
        width: '100%',
        height: 180,
    },
    textOne: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#044B8B',
        padding: 10,

    },
    iconOne: {
        width: 55,  
        height: 53,
        resizeMode: "cover",
        marginBottom: 10,
        marginTop: 30,


    },
    h1: {
        fontFamily: "LuckiestGuy",
        fontSize: 22,
        textAlign: "justify",
        color: "#ffffff",
        paddingTop: 5
    },
    h2: {
        fontFamily: "IBMPlexMonoRegular",
        fontSize: 16,
        textAlign: "justify",
        color: "#ffffff",
        padding: 10,
        lineHeight: 26,      // Reduz o padding para ocupar menos espaço
        marginBottom: 10
    },
    textTwo: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#044B8B',
        padding: 10
    },
    textThree: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#044B8B',
        padding: 10
    },
    dev: {
        fontFamily: "IBMPlexMonoRegular",
        fontSize: 16,
        textAlign: "justify",
        color: "#ffffff",
        padding: 10,
    },
    linking: {
        flexDirection: "row", // Deixa os itens em linha
        flexWrap: "wrap",     // Permite quebrar linha se necessário
        justifyContent: "center", // Centraliza horizontalmente
        alignItems: "center", // Alinha verticalmente
        padding: 5,          // Espaçamento interno
        gap: 0,              // Espaço entre os itens
    },
    linkText: {
        fontSize: 17,
        color: '#ffffff', 
        textDecorationLine: 'underline', // Indica que é um link
        marginHorizontal: 20, // Espaço entre os nomes
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10
    },

    textFor: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#044B8B',
        padding: 10
    },
    formulario: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#044B8B',
        padding: 10
    },
    h3: {
        fontFamily: "IBMPlexMonoRegular",
        fontSize: 14,
        textAlign: "center",
        color: "#ffffff",
        marginTop: 30

    },
    linkText2: {
        fontSize: 14,
        color: '#ffffff',  // Mantém o contraste com o fundo
        textDecorationLine: 'underline',  // Deixa claro que é um link
        fontFamily: "IBMPlexMonoRegular",
        marginBottom: 15
    },
    button: {
        width: screenWidth * 0.80,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7941D",
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 10,
        elevation: 5,
        shadowColor: "#044B8B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },

})

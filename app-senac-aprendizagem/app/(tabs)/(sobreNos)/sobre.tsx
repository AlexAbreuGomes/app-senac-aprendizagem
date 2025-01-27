import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono_400Regular, IBMPlexMono_700Bold } from "@expo-google-fonts/ibm-plex-mono";
import { Linking } from "react-native";

export default function Screen() {

    const [fontsLoaded] = useFonts({
        LuckiestGuy: require('@expo-google-fonts/luckiest-guy'),
    });

    useFonts({
        LuckiestGuy: LuckiestGuy_400Regular,
        IBMPlexMonoRegular: IBMPlexMono_400Regular,
        IBMPlexMonoBold: IBMPlexMono_700Bold,
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <ScrollView>
                <View style={styles.containerImg}>
                    <Image
                        source={require('../../../assets/img-conheca.png')}
                        style={styles.img}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.textOne}>
                    <Image
                        source={require('../../../assets/icon-conheca-one.png')}
                        style={styles.iconOne}
                    />
                    <Text style={styles.h1}>O que é o app SABER Aprendizagem?</Text>
                    <Text style={styles.h2}>O SABER Aprendizagem é um aplicativo criado por
                        alunos do curso técnico de Desenvolvimento de Sistemas do SENAC-RN
                        Zona Norte, em parceria com jovens aprendizes de 2024. O objetivo é
                        oferecer suporte prático e motivador, tirando as dúvidas mais comuns
                        dos aprendizes e proporcionando uma experiência de aprendizado
                        acessível e enriquecedora.
                    </Text>
                </View>

                <View style={styles.textTwo}>
                    <Image
                        source={require('../../../assets/icon-conheca-two.png')}
                        style={styles.iconOne}
                    />
                    <Text style={styles.h1}>Por trás do SABER Aprendizagem</Text>
                    <Text style={styles.h2}>A ideia surgiu ao identificar a necessidade
                        de esclarecer dúvidas recorrentes de alunos. A dedicação dos alunos
                        de ambos os cursos e a orientação dos professores foram fundamentais
                        para criar uma ferramenta que apoiasse o aprendizado. O aplicativo
                        foi desenvolvido como parte do Projeto Integrador dos alunos de
                        Desenvolvimento de Sistemas e do projeto final dos jovens aprendizes.
                    </Text>
                </View>

                <View style={styles.textThree}>
                    <Image
                        source={require('../../../assets/icon-conheca-three.png')}
                        style={styles.iconOne}
                    />

                    <Text style={styles.h1}>Equipe de Desenvolvimento</Text>
                    <Text style={styles.h2}>Desenvolvido por:</Text>

                    <View style={styles.linking}>
                        <Text style={styles.h2} onPress={() => Linking.openURL('https://www.linkedin.com/in/daniewcruz/')}>
                            Daniew Cruz,
                        </Text>
                        <Text style={styles.h2} onPress={() => Linking.openURL('https://www.linkedin.com/in/alexdeabreu/')}>
                            Alex Abreu,
                        </Text>
                        <Text style={styles.h2} onPress={() => Linking.openURL('https://www.linkedin.com/in/wesllen-d-b-ferreira/')}>
                            Wesllen Ferreira,
                        </Text>
                        <Text style={styles.h2} onPress={() => Linking.openURL('https://www.linkedin.com/in/rafabsilva/')}>
                            Rafael Bezerra,
                        </Text>
                        <Text style={styles.h2} onPress={() => Linking.openURL('https://www.linkedin.com/in/jean-carlo-costa')}>
                            Jean Carlo,
                        </Text>
                        <Text style={styles.h2} onPress={() => Linking.openURL('https://github.com/PedroHAXGDev')}>
                            Pedro Henrique,
                        </Text>
                        <Text style={styles.h2} onPress={() => Linking.openURL('https://www.linkedin.com/in/gerson-soares-063b552b0/')}>
                            Gerson Soares,
                        </Text>
                        <Text style={styles.h2} onPress={() => Linking.openURL('https://www.linkedin.com/in/gelson-lli/')}>
                            Gelson Lima
                        </Text>
                    </View>
                </View>

                <View style={styles.textFor}>
                    <Image
                        source={require('../../../assets/icon-conheca-for.png')}
                        style={styles.iconOne}
                    />
                    <Text style={styles.h1}>Conteúdo educativo</Text>
                    <Text style={styles.h2}>Elaborado pelos alunos jovens aprendizes e pela
                        professora Thalissa Vitória da turma de 2024, garantindo que o conteúdo
                        seja relevante e acessível para os iniciantes.
                    </Text>
                </View>

                <View style={styles.formulario}>
                    <Text style={styles.h3}>Gostou do app? Deixe sua opinião no formulário de feedback</Text>
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
        width: 57,
        height: 36,
        marginTop: 20
    },
    h1: {
        fontFamily: "LuckiestGuy",
        fontSize: 16,
        textAlign: "center",
        color: "#ffffff",
        paddingTop: 5
    },
    h2: {
        fontFamily: "IBMPlexMonoBold",
        fontSize: 12,
        textAlign: "center",
        color: "#ffffff",
        padding: 5,       // Reduz o padding para ocupar menos espaço
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
    linking: {
        flexDirection: "row", // Deixa os itens em linha
        flexWrap: "wrap",     // Permite quebrar linha se necessário
        justifyContent: "center", // Centraliza horizontalmente
        alignItems: "center", // Alinha verticalmente
        padding: 5,          // Espaçamento interno
        gap: 0,              // Espaço entre os itens
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
        fontSize: 10,
        textAlign: "center",
        color: "#ffffff",
        padding: 10
    },
})

import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet,Text, View, FlatList } from "react-native"
import { StatusBar } from "expo-status-bar"
import { faqs } from "../../../data/faq"
import { FaqPerguntas } from "../../../components/faqPerguntas"
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono_400Regular, IBMPlexMono_700Bold } from "@expo-google-fonts/ibm-plex-mono";
import { router, Stack } from "expo-router"
import { BackButton } from "../../../components/backButton"

export default function Screen (){

    useFonts({
        LuckiestGuy: LuckiestGuy_400Regular,
        IBMPlexMonoRegular: IBMPlexMono_400Regular,
        IBMPlexMonoBold: IBMPlexMono_700Bold,
      });

    return(
        <>

           <Stack.Screen
                  options={{
                    headerShown: true,
                    title: "",
                    headerTitleStyle: {
                      fontSize: 30,
                      color: "#0361dd",
                    },
                    headerTitleAlign: "center",
                    headerLeft: () => (
                      <BackButton onPress={() => router.back()} /> // Botão de voltar
                    ),
                  }}
                />

        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <Text style={styles.h1}>O QUE É UM ATA</Text>
            
            <View style={styles.areaFaq}>
                <Text style={styles.tituloFAQ}>Dúvidas Frequêntes</Text>
                <FlatList 
                    data={faqs}
                    renderItem={({item}) => <FaqPerguntas data={item}/>}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.flatlist}
                />
            </View> 
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    h1:{
        fontSize: 32,
        marginBottom: 10,
        fontFamily: 'LuckiestGuy',
        color: '#044B8B'
    },
    areaFaq:{
        flex:1,
        borderWidth: 2,
        borderColor: 'transparent',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        gap:20
    },
    tituloFAQ:{
        borderWidth: 0,
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: 'LuckiestGuy',
        color: '#044B8B'
    },
    flatlist: {
        borderWidth: 1,
        borderColor: 'transparent',
        gap: 20,
    },
});
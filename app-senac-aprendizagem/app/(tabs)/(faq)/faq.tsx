import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet,Text, View, FlatList, Linking, Dimensions } from "react-native"
import { StatusBar } from "expo-status-bar"
import { faqs } from "../../../data/faq"
import { FaqPerguntas } from "../../../components/faqPerguntas"
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono, IBMPlexMono_400Regular, IBMPlexMono_700Bold, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";
import React, { useState, useEffect, useRef } from "react";
import { imagensCarrossel } from "../../../data/carrosselAlunos"
import { ButtonGeneric } from "../../../components/button"

const screenWidth = Dimensions.get('window').width

export default function Screen (){

      useFonts({
        LuckiestGuy: LuckiestGuy_400Regular,
        IBMPlexMonoRegular: IBMPlexMono_400Regular,
        IBMPlexMonoBold: IBMPlexMono_700Bold,
        IBMPlexMonoMedium: IBMPlexMono_500Medium,
      });
      
        const openGoogleForm = () => {
          Linking.openURL('https://forms.gle/Qg8ygLfhHoSMDBtd8');
        };
        
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <View style={styles.areaFaq}>
                <Text style={styles.tituloFAQ}>Dúvidas Frequentes</Text>
                <FlatList 
                    data={faqs}
                    renderItem={({item}) => <FaqPerguntas data={item}/>}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.flatlist}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={styles.viewFlatlist}>
           <ButtonGeneric onPress={openGoogleForm} style={styles.button} name="Ajuda" />
           </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    h1:{
        fontSize: 32,
        fontFamily: 'LuckiestGuy',
        color: '#044B8B',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    areaFaq:{
        flex:1,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        gap:20
    },
    tituloFAQ:{
        paddingLeft: 10,
        fontSize: 40,
        marginTop:10,
        fontFamily: 'LuckiestGuy',
        color: '#044B8B',
        alignContent: 'center',
        textAlign: 'center'

    },
    flatlist: {
        gap: 10,
    },
    viewFlatlist: {
        padding: 10,
      },
      button: {
        width: screenWidth * 0.90,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color:"#ffffff",
        backgroundColor: "#044B8B",
        borderRadius: 30,
        marginBottom: 10,
        marginLeft: 9,
        elevation: 5,
        shadowColor: "#044B8B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
});
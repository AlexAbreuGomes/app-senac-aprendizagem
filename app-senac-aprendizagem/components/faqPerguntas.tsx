import { Image, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { Faq } from "../types/faqTypes"
import {useState } from 'react'
import { useFonts, LuckiestGuy_400Regular,} from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono,IBMPlexMono_400Regular,IBMPlexMono_700Bold,IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";
import React from "react";


type Props = {
    data: Faq;
}

export const FaqPerguntas = ({data}: Props) =>{

    const [mostrarResposta, setMostrarResposta] = useState(false);
    const alternarResposta = () => {
        setMostrarResposta(!mostrarResposta);
    };


     useFonts({
       LuckiestGuy: LuckiestGuy_400Regular,
       IBMPlexMonoRegular: IBMPlexMono_400Regular,
       IBMPlexMonoBold: IBMPlexMono_700Bold,
       IBMPlexMonoMedium: IBMPlexMono_500Medium,
     });

    return(
        <View style={styles.areaPerguntaResposta}>
            <TouchableOpacity style={styles.areaFaq} onPress={alternarResposta}>
                <Text style={styles.textFaq}>{data.pergunta}</Text>
                <Image style={styles.iconSeta} source={require('../assets/icon-seta-down.png')}/>
            </TouchableOpacity>
            {mostrarResposta && (
                <View style={styles.respostaContainer}>
                    <Text style={styles.textResposta}>{data.resposta}</Text>
                </View>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    areaPerguntaResposta:{
        flex:1,
        borderWidth: 1,
        borderColor: 'transparent',
        width: '100%',
    },
    areaFaq:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        borderWidth: 2,
        borderTopWidth: 0,
        borderRadius: 20,
        borderColor: '#044B8B' 
    },
    textFaq:{
        borderWidth: 1,
        borderColor: 'transparent',
        width: '80%',
        fontSize: 18,
        fontFamily:'IBMPlexMonoBold',
        textAlign: 'left', 
        color: '#044B8B'
    },
    iconSeta:{
        borderWidth: 1,
        borderColor: 'transparent',
        width: 38,
        height: 38,
    },
    respostaContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        borderWidth: 2,
        borderTopWidth: 0,
        borderRadius: 20,
        borderColor: '#044B8B'
    },
    textResposta:{
        borderWidth: 1,
        borderColor: 'transparent',
        width: '100%',
        fontSize: 17,
        fontFamily:'IBMPlexMonoMedium',
        textAlign: 'justify', 
        color: '#044B8B'
    }
});

import {useCallback, useState} from 'react'
import {Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { Video } from "../types/videosTypes";
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono_400Regular, IBMPlexMono_700Bold} from "@expo-google-fonts/ibm-plex-mono";

type Props = {
  data: Video;
};

export const VideoAprendizagem = ({ data }: Props) => {
  useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMono: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
  });

    const [watched, setWatched] = useState(false); // Estado para controlar se o vídeo foi assistido

    const openYoutubeVideo = useCallback(() => {
        Linking.openURL(data.video)
          .then(() => setWatched(true)) // Atualiza o estado após o redirecionamento
          .catch((err) => console.error("Erro ao abrir URL", err));
      }, [data.video]);

    return (
        <View style={styles.areaVideo}>
        {watched && (
            <View style={styles.areaStatus}>
              <Image
                style={styles.imgStatus}
                source={require("../assets/icon_popper-de-festa.png")}
              />
              <Text style={styles.textStatus}>Vídeo Assistido com Sucesso!</Text>
              <TouchableOpacity style={styles.btnPlayAgain} onPress={openYoutubeVideo}>
                <Text style={styles.textbtn}>Ver novamente</Text>
              </TouchableOpacity>
            </View>
        )}

            <View style={styles.videoContainer}>
                <TouchableOpacity onPress={openYoutubeVideo}>
                    <Image 
                        style={styles.btnPlayVideo}
                        source={require('../assets/icon_botao-play.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
               <Text style={styles.textTitulo}>{data.titulo}</Text>
               <Text style={styles.textSubtitulo}>{data.subtitulo}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    areaVideo: {
        flexDirection: 'column',
        borderWidth: 0,
        borderColor: 'red',
        width: '100%',
        height: 250
        
    },
    areaStatus:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        zIndex: 1,
        backgroundColor: '#044B8B',
        width: '100%',
        height: '55%',
        marginBottom: -135,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80
    },
    imgStatus:{
        width: 40,
        height: 40,
        borderWidth: 0,
    },
    textStatus:{
        fontSize: 17,
        color: 'white',
        fontFamily: 'monospace',
        fontWeight: 'bold'
    },
    btnPlayAgain:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7941D',
        width: 150,
        height: 30,
        borderRadius: 20,
    },
    textbtn:{
        fontSize: 15,
        color: 'white',
        fontFamily: 'monospace',
        fontWeight: 'bold'
    },
    videoContainer: {
        alignItems: 'center',
        justifyContent: 'center', 
        width: '100%', // Ajuste conforme necessário
        height: '65%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1, 
        borderBottomWidth: 0,
        borderColor: '#004586',
    },
    btnPlayVideo:{
        width: 100,
        height: 100
    },
    textContainer: {
        borderWidth: 1,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderColor: '#044B8B',
        width: '100%',
        height: '35%'
    },
    textTitulo: {
        backgroundColor: '#044B8B',
        color: 'white',
        fontSize: 17,
        fontFamily: 'LuckiestGuy',
        textAlign: 'justify',
        paddingLeft: 10,
        paddingRight: 10
    },
    textSubtitulo: {
        fontSize: 15,
        fontFamily: 'IBMPlexMonoRegular',
        textAlign: 'justify',
        paddingLeft: 10,
        paddingRight: 10
    },
});


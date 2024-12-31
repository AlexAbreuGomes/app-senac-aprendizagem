import {Dimensions, StyleSheet, Text, View} from 'react-native'
import { Video } from "../types/videosTypes";

import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono_400Regular, IBMPlexMono_700Bold } from "@expo-google-fonts/ibm-plex-mono";
import YoutubeIframe from 'react-native-youtube-iframe';

type Props = {
    data: Video;
}

export const VideoAprendizagem = ({data}: Props) => {

    useFonts({
        LuckiestGuy: LuckiestGuy_400Regular,
        IBMPlexMonoRegular: IBMPlexMono_400Regular,
        IBMPlexMonoBold: IBMPlexMono_700Bold,
      });

    return(
        <View style={styles.areaVideo}>
            <View style={styles.videoContainer}>
                <YoutubeIframe
                  videoId={data.video}
                  height={160}
                  contentScale={0.7}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textTitulo}>{data.titulo}</Text>
                <Text style={styles.textSubtitulo}>{data.subtitulo}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    areaVideo: {
        flexDirection: 'column',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#004586',
        width: '100%',
        height: 230,
    },

    videoContainer: {
        width: '100%', // Ajuste conforme necessário
        height: '70%',
        overflow: 'hidden', // Necessário para aplicar o borderRadius
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        borderWidth: 0,
        borderColor: 'red'
    },

    textContainer:{
        borderWidth: 0,
        borderColor: 'pink',
        width: '100%',
        height: '30%',
    },

    textTitulo:{
        backgroundColor: '#004586',
        color: 'white',
        fontSize: 13,
        fontFamily: 'LuckiestGuy',
        textAlign: 'justify',
        paddingLeft: 5,
        paddingRight: 5
    },

    textSubtitulo:{
        fontSize: 12,
        fontFamily: 'monospace',
        paddingLeft: 5,
        paddingRight: 5
    }
})
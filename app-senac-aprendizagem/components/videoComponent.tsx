import {Dimensions, StyleSheet, Text, View} from 'react-native'
import { Video } from "../types/videosTypes";

import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono_400Regular, IBMPlexMono_700Bold } from "@expo-google-fonts/ibm-plex-mono";
import YoutubeIframe from 'react-native-youtube-iframe';

type Props = {
    data: Video;
}

const screenWidth = Dimensions.get('window').width

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
                  height={135}
                />
            </View>
            <Text style={styles.textTitulo}>{data.titulo}</Text>
            <Text style={styles.textSubtitulo}>{data.subtitulo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    areaVideo: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#004586',
        width: '100%',
        height: 200,
    },

    videoContainer: {
        width: '100%', // Ajuste conforme necessário
        overflow: 'hidden', // Necessário para aplicar o borderRadius
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        paddingLeft: 10,
        paddingRight: 10
    }
})
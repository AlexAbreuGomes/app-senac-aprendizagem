import { useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Video } from "../types/videosTypes";
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono_400Regular, IBMPlexMono_700Bold } from "@expo-google-fonts/ibm-plex-mono";
import YoutubeIframe from 'react-native-youtube-iframe';
import * as ScreenOrientation from 'expo-screen-orientation';

type Props = {
  data: Video;
};

export const VideoAprendizagem = ({ data }: Props) => {
  useFonts({
    LuckiestGuy: LuckiestGuy_400Regular,
    IBMPlexMono: IBMPlexMono_400Regular,
    IBMPlexMonoBold: IBMPlexMono_700Bold,
  });

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  return (
    <View style={styles.areaVideo}>
      <View style={styles.videoContainer}>
        <YoutubeIframe
          videoId={data.video}
          height={160}
          contentScale={0.7}
          onFullScreenChange={onFullScreenChange}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitulo}>{data.titulo}</Text>
        <Text style={styles.textSubtitulo}>{data.subtitulo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  areaVideo: {
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#004586',
    width: '100%',
  },

  videoContainer: {
    width: '100%', // Ajuste conforme necessário
    overflow: 'hidden', // Necessário para aplicar o borderRadius
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 0,
  },

  textContainer: {
    borderWidth: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#004586',
    width: '100%',
  },

  textTitulo: {
    backgroundColor: '#004586',
    color: 'white',
    fontSize: 18,
    fontFamily: 'LuckiestGuy',
    textAlign: 'justify',
    paddingLeft: 10,
    paddingRight: 10,
  },

  textSubtitulo: {
    fontSize: 16,
    fontFamily: 'IBMPlexMonoRegular',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

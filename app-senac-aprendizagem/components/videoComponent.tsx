// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import React, { useCallback, useState } from 'react';
import { Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Video } from "../types/videosTypes";
import { useFonts, LuckiestGuy_400Regular,} from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono,IBMPlexMono_400Regular,IBMPlexMono_700Bold,IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";


const screenWidth = Dimensions.get('window').width


// Função para extrair o videoId da URL do YouTube
const extractVideoId = (url: string): string | null => {
  const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|(?:https?:\/\/(?:www\.)?youtu\.be\/))([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Função para obter o thumbnail do vídeo
const getVideoThumbnail = (videoUrl: string) => {
  const videoId = extractVideoId(videoUrl);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return '';
};

type Props = {
  data: Video;
};

export const VideoAprendizagem = ({ data }: Props) => {
  useFonts({
         LuckiestGuy: LuckiestGuy_400Regular,
         IBMPlexMonoRegular: IBMPlexMono_400Regular,
         IBMPlexMonoBold: IBMPlexMono_700Bold,
         IBMPlexMonoMedium: IBMPlexMono_500Medium,
       });

  const [watched, setWatched] = useState(false);  // Estado para controlar se o vídeo foi assistido

  const openYoutubeVideo = useCallback(() => {
    Linking.openURL(data.video)  // Abre o vídeo do YouTube
      .then(() => setWatched(true))  // Marca o vídeo como assistido
      .catch((err) => console.error("Erro ao abrir URL", err));
  }, [data.video]);

  const videoThumbnail = getVideoThumbnail(data.video);  // Pega a URL do thumbnail

  const thumbnailSource = videoThumbnail
    ? { uri: videoThumbnail }
    : require("../assets/alunos/capaSpotify.jpeg");

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
            style={styles.imgTambnail}
            source={thumbnailSource}  // Exibe o thumbnail do vídeo
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitulo}>{data.titulo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  areaVideo: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: 260,
  },
  areaStatus: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    zIndex: 1,
    backgroundColor: '#044B8B',
    width: '100%',
    height: '55%',
    marginBottom: -130,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  imgStatus: {
    width: 40,
    height: 40,
  },
  textStatus: {
    fontSize: 17,
    color: 'white',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  btnPlayAgain: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7941D',
    width: 150,
    height: 30,
    borderRadius: 20,
  },
  textbtn: {
    fontSize: 15,
    color: 'white',
    fontFamily: '',
    fontWeight: 'bold',
  },
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '65%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imgTambnail: {
    width: screenWidth-20,
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#004586',
  },
  textContainer: {
    borderWidth: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#044B8B',
    width: '100%',
  },
  textTitulo: {
    backgroundColor: '#044B8B',
    color: 'white',
    fontSize: 17,
    fontFamily: 'LuckiestGuy',
    textAlign: 'justify',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
  },
  textSubtitulo: {
    fontSize: 18,
    color: '#044B8B',
    fontFamily: 'IBMPlexMonoMedium',
    textAlign: 'justify',
    paddingLeft: 10,
    paddingRight: 10,
    flexWrap: 'wrap',  // Permite que o texto quebre em várias linhas
    overflow: 'hidden',  // Garante que o texto não ultrapasse os limites
  }
});

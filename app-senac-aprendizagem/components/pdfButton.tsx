import React from 'react';
import { View, Button, Linking, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { PdfData } from '../types/pdfTypes';
import { useFonts, LuckiestGuy_400Regular,} from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono,IBMPlexMono_400Regular,IBMPlexMono_700Bold,IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";

const screenWidth = Dimensions.get("window").width;

interface PDFItemProps {
  item: PdfData;
}

export const PDFItem: React.FC<PDFItemProps> = ({ item }) => {
  const handlePress = () => {
    Linking.openURL(item.url).catch((err) =>
      console.error('Erro ao abrir o link: ', err)
    );
  };

  useFonts({
          LuckiestGuy: LuckiestGuy_400Regular,
          IBMPlexMonoRegular: IBMPlexMono_400Regular,
          IBMPlexMonoBold: IBMPlexMono_700Bold,
          IBMPlexMonoMedium: IBMPlexMono_500Medium,
        });

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <MaterialIcons name="picture-as-pdf" size={24} color="#F7941D" />
      <Text style={styles.text}>PDF {item.id}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 2,
    marginVertical: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    
  },
  text: {
    fontFamily: "IBMPlexMonoBold",
    fontSize: 24,
    color: "#044B8B",
    textAlign: "center",
    marginLeft: 10,
  },
});

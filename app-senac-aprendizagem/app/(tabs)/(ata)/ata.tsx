
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, FlatList } from "react-native";
import { PDFItem } from "../../../components/pdfButton";
import { PDF } from "../../../data/pdf"; // Importe o array de PDFs
import React from "react";
import { useFonts, LuckiestGuy_400Regular,} from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono,IBMPlexMono_400Regular,IBMPlexMono_700Bold,IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";
import { StatusBar } from "expo-status-bar";

export default function Screen() {

      useFonts({
        LuckiestGuy: LuckiestGuy_400Regular,
        IBMPlexMonoRegular: IBMPlexMono_400Regular,
        IBMPlexMonoBold: IBMPlexMono_700Bold,
        IBMPlexMonoMedium: IBMPlexMono_500Medium,
      });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.h1}>Ata</Text>

      {/* Use FlatList para renderizar os PDFs */}
      <FlatList
        data={PDF} // A lista de PDFs
        keyExtractor={(item) => item.id.toString()} // Converte o ID para string
        renderItem={({ item }) => <PDFItem item={item} />} // Renderiza um PDFItem
        contentContainerStyle={styles.listContainer}
        horizontal={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  h1: {
    fontSize: 30,
    color: "#044B8B",
    textAlign: "center",
    margin: 5,
    fontFamily: "LuckiestGuy",
  },
  listContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  },
});

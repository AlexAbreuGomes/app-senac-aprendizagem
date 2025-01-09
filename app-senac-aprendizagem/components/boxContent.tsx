import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { ConteudosProps } from "../types/boxConteudosTypes";

const screenWidth = Dimensions.get("window").width;

export const Conteudos: React.FC<ConteudosProps> = ({ titulo, id }) => {
  const router = useRouter();

  return (
    <Pressable style={styles.card} onPress={() => router.push(`/detalhes/${id}`)}>
      <View style={styles.header}>
        <View style={styles.icon} />
        <Text style={styles.title}>{titulo}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth - 20,
    height: 170,
    backgroundColor: "#0059B3",
    borderRadius: 20,
    padding: 10,
    marginBottom: 16,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#084A9E",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

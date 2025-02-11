import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { ConteudosProps } from "../types/boxConteudosTypes";
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;

//novo
interface ConteudosExtendedProps extends ConteudosProps {
  isCompleted?: boolean; // nova prop opcional
}

export const Conteudos: React.FC<ConteudosProps> = ({ titulo, id, icon, isCompleted }) => {
  const router = useRouter();

  return (
    <Pressable style={styles.card} onPress={() => router.push(`/detalhes/${id}`)}>
      <View style={styles.header}>
        <View style={[styles.icon, isCompleted && styles.iconCompleted]}>
          <Image source={icon} style={styles.iconImage} />
        </View>
        <Text style={styles.title}>{titulo}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth - 20,
    height: 150,
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
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  iconCompleted: { 
    backgroundColor: "lightgreen", // Fundo verde para indicar conclusão
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: "cover", // Ajusta o ícone para caber no círculo
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "LuckiestGuy",
  },
});

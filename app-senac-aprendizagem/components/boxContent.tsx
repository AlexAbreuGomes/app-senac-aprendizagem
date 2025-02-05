import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { ConteudosProps } from "../types/boxConteudosTypes";

const screenWidth = Dimensions.get("window").width;

export const Conteudos: React.FC<ConteudosProps> = ({ titulo, id, icon }) => {
  const router = useRouter();

  return (
    <Pressable style={styles.card} onPress={() => router.push(`/detalhes/${id}`)}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Image source={icon} style={styles.iconImage} />
        </View>
        <Text style={styles.title}>{titulo}</Text>
      </View>
      <View style={styles.barraProgresso}>
        <View style={styles.progresso}></View>
        <Text style={styles.porcentagemProgresso}>0%</Text>
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
    borderWidth: 0,
    borderColor: 'red'
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

  barraProgresso:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 30,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'white',
    marginTop: 30,
    paddingLeft: 5,
    gap: 10
  },
  progresso:{
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'lightgreen',
    height: '60%',
    width: '10%'
  },

  porcentagemProgresso:{
    fontFamily: 'monospace',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  }
});

// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import AntDesign from "@expo/vector-icons/build/AntDesign";
import Entypo from "@expo/vector-icons/build/Entypo";
import { useRouter } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";





import React from "react";

export function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={router.back} hitSlop={40} style={styles.button}>
      {Platform.OS === "ios" ? (
        <AntDesign name="closecircle" size={50} color={'blue'} />
      ) : (
        <Entypo name="chevron-left" size={50} color={'green'} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginLeft: -10,
  },
});

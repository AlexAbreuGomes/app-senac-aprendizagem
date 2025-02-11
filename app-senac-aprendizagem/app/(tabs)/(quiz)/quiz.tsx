
import { router, Stack, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Pressable, View, StatusBar, Image, Animated } from "react-native";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons"; // Importando o ícone de check
import { getData } from "../../utils/storage";
import { COLORS } from "../../../constants/colors";
import { ResetButton } from "../../../components/resetButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const coinImages = {
  1: require("../../../assets/images/moeda01.png"),
  2: require("../../../assets/images/moeda02.png"),
  3: require("../../../assets/images/moeda03.png"),
} as const;


export default function Screen() {
  const [unlockedLevels, setUnlockedLevels] = useState<number>(1);

  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        const level2 = await getData("quizLevel2");
        const level3 = await getData("quizLevel3");
        let maxLevel = 1;
        if (level3 === "unlocked") maxLevel = 3;
        else if (level2 === "unlocked") maxLevel = 2;
        setUnlockedLevels(maxLevel);
      };
      loadProgress();
    }, [])
  );

  const CoinButton = ({ level, unlocked }: { level: keyof typeof coinImages; unlocked: boolean }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const isCompleted = level < unlockedLevels; // Se o nível já foi concluído

    useEffect(() => {
      if (level === unlockedLevels) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.93, duration: 500, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
          ])
        ).start();
      }
    }, [level, unlockedLevels]);

    return (
      <Pressable
        onPress={() => unlocked && router.push(`../../quizzes/quizNivel${level}`)}
        disabled={!unlocked}
      >
        <View style={styles.coinWrapper}>
          <Animated.Image
            source={coinImages[level]}
            style={[
              styles.coinImage,
              !unlocked && styles.lockedCoin,
              level === unlockedLevels && { transform: [{ scale: scaleAnim }] },
              isCompleted && styles.completedCoin, // Moeda já concluída
            ]}
          />
          {isCompleted && (
            <Ionicons name="checkmark-circle" size={25} color="#F7941D" style={styles.checkIcon} />
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} translucent={true} />
        <View style={styles.header}>
          <Text style={styles.title}>Quiz do Aprendizado</Text>
          <Text style={styles.description}>
            Mostre seu conhecimento!
            <Text style={{ fontFamily: "IBM-Plex-Mono", fontSize: 16 }}>
              Toque nas moedas para começar, responda ao quiz e, ao completar, você desbloqueia os próximos.
            </Text>
            Acumule pontos, complete os três desafios. 
          </Text>

        </View>

        <View style={styles.imgEscada}>
          <Image source={require("../../../assets/images/escada.png")} style={styles.imgEscada} />
        </View>
        <View style={styles.coinContainer}>
          <View style={styles.coinPosition1}><CoinButton level={1} unlocked={true} /></View>
          <View style={styles.coinPosition2}><CoinButton level={2} unlocked={unlockedLevels >= 2} /></View>
          <View style={styles.coinPosition3}><CoinButton level={3} unlocked={unlockedLevels >= 3} /></View>
        </View>
        <View style={styles.resetSection}>
          <ResetButton />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.background2,
  },
  header: {
    width: "100%",
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 15,
  },
  description: {
    fontSize: 15,
    color: COLORS.white,
    marginBottom: 5,
    textAlign: "justify",
    fontFamily: "IBM-Plex-Mono2",
  },
  title: {
    fontSize: 21,
    fontFamily: "LuckiestGuy-Regular",
    color: COLORS.white,
    marginBottom: 5,
  },
  imgEscada: {
    width: '150%',
    height: 535,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: -51,
    marginLeft: 331,
    resizeMode: "contain",
  },
  coinContainer: {
    position: "absolute",
    top: "50%",
    left: "10%",
    width: "80%",
    height: "50%",
    justifyContent: "space-between",
  },
  coinPosition1: {
    position: "absolute",
    bottom: "12.4%",
    left: "60%",
  },
  coinPosition2: {
    position: "absolute",
    bottom: "53%",
    left: "27%",
  },
  coinPosition3: {
    position: "absolute",
    bottom: "105.4%",
    right: "77%",
  },
  coinWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  coinImage: {
    width: 100,
    height: 120,
    resizeMode: "contain",
  },
  lockedCoin: {
    opacity: 0.5,
  },
  completedCoin: {
    opacity: 0.7, // Moeda concluída fica um pouco mais escura
  },
  checkIcon: {
    position: "absolute",
    top: "50%",
    left: "52%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  resetSection: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 5,

  },
});

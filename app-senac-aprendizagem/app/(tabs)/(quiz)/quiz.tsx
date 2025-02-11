import { router, Stack, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Pressable, View, StatusBar, Image, Animated } from "react-native";
import React, { useCallback, useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons"; // Importando o ícone de check
import { getData } from "../../utils/storage";
import { COLORS } from "../../../constants/colors";
import { ResetButton } from "../../../components/resetButton";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

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
            <Ionicons name="checkmark-circle" size={24} color="#F7941D" style={styles.checkIcon} />
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
            <Text style={{ fontFamily: "IBM-Plex-Mono", fontSize: 15 }}>
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
    height: "21.8%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 10,
  },
  description: {
    fontSize: 15,
    color: COLORS.white,
    textAlign: "justify",
    fontFamily: "IBM-Plex-Mono2",
    lineHeight: 18,
    width: "93%",
    height: 90,
  },
  title: {
    fontSize: 18,
    fontFamily: "LuckiestGuy-Regular",
    color: COLORS.white,
    marginBottom: 3,
  },
  imgEscada: { 
    width: width * 1.5, // Mantém a proporção de 150% do width da tela
    height: 535, 
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 79,
    marginLeft: width * 0.08, // Usa proporção da largura da tela
    resizeMode: "contain",
  },
  coinContainer: {
    position: "absolute",
    top: height * 0.2, // 50% da altura da tela
    left: width * 0.099, // 10% da largura da tela
    width: width * 0.90, // 80% da largura da tela
    height: height * 0.7, // 50% da altura da tela
  },
  coinPosition1: {
    position: "absolute",
    top: height * 0.505, // 12.4% da altura da tela
    left: width * 0.44, // 60% da largura da tela
  },
  coinPosition2: {
    position: "absolute",
    bottom: height * 0.272, // 53% da altura da tela
    left: width * 0.20, // 27% da largura da tela
  },
  coinPosition3: {
    position: "absolute",
    bottom: height * 0.534, // 105.4% da altura da tela (pode precisar de ajuste)
    right: width * 0.76, // 77% da largura da tela
  },
  coinWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  coinImage: {
    width: width * 0.22, // 20% da largura da tela (ajustável)
    height: width * 0.23, // Mantém a proporção quadrada
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
    top: "54%",
    left: "55%",
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

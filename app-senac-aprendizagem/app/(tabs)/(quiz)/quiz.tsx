import { router, Stack, useFocusEffect } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, Text, Pressable, View } from "react-native"
import { BackButton } from "../../../components/backButton"
import { StatusBar } from "expo-status-bar"
import React, { useCallback, useEffect, useState } from "react"
import { getData } from "../../utils/storage"
import { COLORS } from "../../../constants/colors"
import { ResetButton } from "../../../components/resetButton"
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  
      loadProgress(); // Recarrega os dados sempre que a tela receber foco
  
    }, [])
  );
  
  const CoinButton = ({ level, unlocked }: { level: number; unlocked: boolean }) => (
    <Pressable
      onPress={() => unlocked && router.push(`../../quizzes/quizNivel${level}`)}
      style={[styles.coin, !unlocked && styles.lockedCoin]}
      disabled={!unlocked}
    >
      <Text style={styles.coinText}>Nível {level}</Text>
      {unlocked && <Text style={styles.statusText}>🔓</Text>}
      {!unlocked && <Text style={styles.statusText}>🔒</Text>}
    </Pressable>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Text style={styles.title}>Escolha o Nível</Text>
        
        <View style={styles.coinContainer}>
          <CoinButton level={1} unlocked={true} />
          <CoinButton level={2} unlocked={unlockedLevels >= 2} />
          <CoinButton level={3} unlocked={unlockedLevels >= 3} />
        </View>
        <View style={styles.resetSection}>
        <ResetButton />
      </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontFamily: 'LuckiestGuy-Regular',
    color: COLORS.white,
    marginBottom: 40,
  },
  coinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  coin: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  lockedCoin: {
    backgroundColor: COLORS.secondary,
    opacity: 0.6,
  },
  coinText: {
    color: COLORS.white,
    fontFamily: 'IBM-Plex-Mono',
    fontSize: 16,
  },
  statusText: {
    fontSize: 24,
    marginTop: 5,
  },
  resetSection: {
    marginTop: 40,
    alignSelf: 'center'
  }
});
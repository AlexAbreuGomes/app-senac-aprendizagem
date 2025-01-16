import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet,Text, View, FlatList } from "react-native"
import { StatusBar } from "expo-status-bar"
import { faqs } from "../../../data/faq"
import { FaqPerguntas } from "../../../components/faqPerguntas"
import { useFonts, LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy";
import { useFonts as IBMPlexMono_400Regular, IBMPlexMono_700Bold } from "@expo-google-fonts/ibm-plex-mono";
import React, { useState, useEffect, useRef } from "react";
import { imagensCarrossel } from "../../../data/carrosselAlunos"
import { Carrossel } from "../../../components/carrossel"

export default function Screen (){

    useFonts({
        LuckiestGuy: LuckiestGuy_400Regular,
        IBMPlexMonoRegular: IBMPlexMono_400Regular,
        IBMPlexMonoBold: IBMPlexMono_700Bold,
      });

        const [currentIndex, setCurrentIndex] = useState(0);
        const flatListRef = useRef<FlatList>(null);
        
      // Intervalo do carrossel
        useEffect(() => {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
              const nextIndex = (prevIndex + 1) % imagensCarrossel.length;
      
              if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
              }
      
              return nextIndex;
            });
          }, 3000);
      
          return () => clearInterval(interval);
        }, []);

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar/>
            <Text style={styles.h1}>SENAC APRENDIZAGEM</Text>
                  <View style={styles.viewFlatlist}>
                    
                    <FlatList
                      ref={flatListRef}
                      data={imagensCarrossel}
                      renderItem={({ item }) => <Carrossel data={item} />}
                      keyExtractor={(item) => item.id.toString()}
                      horizontal={true}
                    />
                  </View>

            
            <View style={styles.areaFaq}>
                <Text style={styles.tituloFAQ}>Dúvidas Frequêntes</Text>
                <FlatList 
                    data={faqs}
                    renderItem={({item}) => <FaqPerguntas data={item}/>}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.flatlist}
                />
            </View> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    h1:{
        fontSize: 32,
        marginBottom: 10,
        fontFamily: 'LuckiestGuy',
        color: '#044B8B',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    areaFaq:{
        flex:1,
        borderWidth: 2,
        borderColor: 'transparent',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        gap:20
    },
    tituloFAQ:{
        borderWidth: 0,
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: 'LuckiestGuy',
        color: '#044B8B'
    },
    flatlist: {
        borderWidth: 1,
        borderColor: 'transparent',
        gap: 20,
    },
    viewFlatlist: {
        padding: 10,
      },
});
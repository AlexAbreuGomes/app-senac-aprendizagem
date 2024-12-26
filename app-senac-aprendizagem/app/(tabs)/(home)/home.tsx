import { SafeAreaView } from "react-native-safe-area-context"
import React, {useState, useEffect, useRef} from 'react'
import { Dimensions, FlatList, StyleSheet,Text, View,  } from "react-native"
import { StatusBar } from "expo-status-bar"

import { Carrossel } from "../../../components/carrossel"
import { imagensCarrossel } from "../../../data/carrosselAlunos"
import { CourseCard } from "../../../components/boxContent"


export default function Screen (){

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null); // Declara explicitamente o tipo


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % imagensCarrossel.length; // Volta ao início quando chega no último item
                
                // Verifique se flatListRef.current está definido
                if (flatListRef.current) {
                    flatListRef.current.scrollToIndex({ index: nextIndex, animated: true }); // Move a FlatList
                }
                
                return nextIndex;
            });
        }, 3000); // Alteração a cada 3 segundos
    
        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [imagensCarrossel]);
    

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar/>
                <Text>
                    SENAC APRENDIZAGEM
                </Text>
            <View style={styles.viewFlatlist}>
                <FlatList
                    ref={flatListRef}
                    data={imagensCarrossel}
                    renderItem={({item}) => <Carrossel data={item}/>}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    
                />
            </View>
            <View style={styles.card}>
            <CourseCard title="Curso 1" progress={50} onPress={() => {}} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    },
    h1:{
        fontSize: 15,
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    },
    card:{
        alignItems: 'center',
    },

    viewFlatlist: {
        padding: 10
    },

   
})
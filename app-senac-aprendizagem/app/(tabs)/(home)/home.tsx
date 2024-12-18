import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions, FlatList, StyleSheet,Text, View } from "react-native"
import { StatusBar } from "expo-status-bar"

import { Carrossel } from "../../../components/carrossel"
import { imagensCarrossel } from "../../../data/carrosselAlunos"

export default function Screen (){

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar/>
                <Text>
                    SENAC APRENDIZAGEM
                </Text>

                <FlatList
                    data={imagensCarrossel}
                    renderItem={({item}) => <Carrossel data={item}/>}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    contentContainerStyle={styles.flatlist}
                />

                
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1:{
        fontSize: 15,
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    },
    flatlist:{
     
        gap: 20
    }
})
import { imagensCarrossel } from "../data/carrosselAlunos"
import { FlatList, Image, ScrollView, StyleSheet,Text, View } from "react-native"

import { ImagemCarrossel } from "../types/carrosselTypes"

type Props = {
    data: ImagemCarrossel;
}


export const Carrossel = ({data}: Props) => {
    return(
        <View>
           <Image 
            source={{uri: data.img}}
            style={styles.imgCarrossel}
            resizeMode="cover"
            />
        </View>       
    )
}


const styles = StyleSheet.create({
    imgCarrossel:{
        width: 300,
        height: 250,
        borderRadius: 20,
        
    }
})



import { imagensCarrossel } from "../data/carrosselAlunos"
import { Dimensions, FlatList, Image, ScrollView, StyleSheet,Text, View } from "react-native"

import { ImagemCarrossel } from "../types/carrosselTypes"

type Props = {
    data: ImagemCarrossel;
}

const screenWidth = Dimensions.get('window').width;

export const Carrossel = ({data}: Props) => {
    return(
        <View >
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
        width: screenWidth-20,
        height: 200,
        borderRadius: 20,
    }
})



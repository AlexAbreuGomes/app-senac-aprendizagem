// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import { Dimensions,  Image, StyleSheet, View } from "react-native"
import { ImagemCarrossel } from "../types/carrosselTypes"
import React from 'react';

type Props = {
    data: ImagemCarrossel;
}

const screenWidth = Dimensions.get('window').width;

export const Carrossel = ({data}: Props) => {
    return(
        <View >
           <Image 
            source={data.img}
            style={styles.imgCarrossel}
            resizeMode="cover"
            />
        </View>       
    )
};

const styles = StyleSheet.create({
    imgCarrossel:{
        width: screenWidth-20,
        height: 200,
        borderRadius: 20,
    }
});



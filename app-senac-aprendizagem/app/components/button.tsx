import { Pressable, Text } from 'react-native';
import React from 'react';

type buttonProps = {
    onpress: () => void
    style?: any
    name: string
}
export const Botao = ({onpress, style, name}: buttonProps) => {
    return (
        <Pressable onPress={onpress} style={style}>
            <Text>{name}</Text>
        </Pressable>
    );
}
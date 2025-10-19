// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import React from 'react';
import { FlatList, Image, TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import { CarrosselAvatares } from '../types/carrosselAvataresTypes';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface CarrosselAvataresProps {
  data: CarrosselAvatares[];
  onSelectAvatar: (avatar: CarrosselAvatares) => void;
  selectedAvatarId?: string;
  onAddCustomPhoto?: (uri: string) => void;
}

export const CarrosselAvatar: React.FC<CarrosselAvataresProps> = ({
  data,
  onSelectAvatar,
  selectedAvatarId,
  onAddCustomPhoto
}) => {

  const pickImage = async () => {
    try {
      console.log('Iniciando seleção de imagem da galeria...');
      // Solicitar permissão para acessar a galeria
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("Permissão necessária", "É necessário permitir o acesso à galeria para selecionar uma foto.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      console.log('Resultado da seleção:', result);

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log('URI da imagem selecionada:', result.assets[0].uri);
        if (onAddCustomPhoto) {
          onAddCustomPhoto(result.assets[0].uri);
        }
      } else {
        console.log('Seleção cancelada ou sem resultado');
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao selecionar a imagem.');
    }
  };

  const takePhoto = async () => {
    try {
      console.log('Iniciando captura de foto...');
      // Solicitar permissão para acessar a câmera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("Permissão necessária", "É necessário permitir o acesso à câmera para tirar uma foto.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      console.log('Resultado da captura:', result);

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log('URI da foto capturada:', result.assets[0].uri);
        if (onAddCustomPhoto) {
          onAddCustomPhoto(result.assets[0].uri);
        }
      } else {
        console.log('Captura cancelada ou sem resultado');
      }
    } catch (error) {
      console.error('Erro ao capturar foto:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao capturar a foto.');
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      "Selecionar Foto",
      "Escolha uma opção:",
      [
        { text: "Galeria", onPress: pickImage },
        { text: "Câmera", onPress: takePhoto },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  return (
    <FlatList
      horizontal
      data={onAddCustomPhoto ? [{ id: 'add-custom', img: null, isCustom: true }, ...data] : data}
      keyExtractor={(item) => item.id}
      extraData={selectedAvatarId} // Força re-render quando selectedAvatarId muda
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.avatarContainer,
            selectedAvatarId === item.id && styles.selectedAvatar,
          ]}
          onPress={() => {
            if (item.id === 'add-custom') {
              showImagePickerOptions();
            } else {
              onSelectAvatar(item);
            }
          }}
        >
          {item.id === 'add-custom' ? (
            <View style={styles.addPhotoContainer}>
              <MaterialIcons name="add-a-photo" size={30} color="#044B8B" />
              <Text style={styles.addPhotoText}>Foto</Text>
            </View>
          ) : (
            <Image
              source={item.isCustom && item.uri ? { uri: item.uri } : item.img}
              style={styles.avatarImage}
              onError={(error) => {
                console.log('Erro ao carregar imagem:', error.nativeEvent.error);
              }}
              onLoad={() => {
                console.log('Imagem carregada com sucesso:', item.isCustom ? item.uri : 'avatar pré-definido');
              }}
            />
          )}
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'transparent',
    margin: 2,
  },
  selectedAvatar: {
    borderColor: '#F7941D',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  addPhotoContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#044B8B',
    borderStyle: 'dashed',
  },
  addPhotoText: {
    fontSize: 10,
    color: '#044B8B',
    fontWeight: 'bold',
    marginTop: 2,
  },
});


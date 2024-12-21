import React, { useState } from 'react';
import { ScrollView, Image, TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle, ImageStyle } from 'react-native';

interface Avatar {
  id: number;
  source: any; // Pode ser ajustado conforme o tipo dos avatares (e.g., require/import)
}

interface AvatarCarouselProps {
  avatars: Avatar[]; // Array de avatares
  onAvatarSelect: (id: number) => void; // Função chamada ao selecionar um avatar
  containerStyle?: StyleProp<ViewStyle>; // Estilização do container do carrossel
  avatarStyle?: StyleProp<ImageStyle>; // Estilização individual do avatar
  selectedAvatarStyle?: StyleProp<ViewStyle>; // Estilo adicional para o avatar selecionado
}

const AvatarCarousel: React.FC<AvatarCarouselProps> = ({
  avatars,
  onAvatarSelect,
  containerStyle,
  avatarStyle,
  selectedAvatarStyle,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const handleSelectAvatar = (id: number) => {
    setSelectedAvatar(id);
    onAvatarSelect(id); // Notifica o componente pai
  };

  return (
    <View style={[styles.carousel, containerStyle]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            onPress={() => handleSelectAvatar(avatar.id)}
            style={[
              styles.avatarContainer,
              selectedAvatar === avatar.id && [styles.selectedAvatar, selectedAvatarStyle],
            ]}
          >
            <Image source={avatar.source} style={[styles.avatar, avatarStyle]} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    flexDirection: 'row',
  },
  avatarContainer: {
    marginHorizontal: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  selectedAvatar: {
    borderColor: '#f00', // Padrão: vermelho
  },
  avatar: {
    width: 80,
    height: 80, // Tamanho padrão
  },
});

export default AvatarCarousel;

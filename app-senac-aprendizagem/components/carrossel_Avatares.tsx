import React from 'react';
import { ScrollView, Image, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, ImageStyle } from 'react-native';

type AvatarCarouselProps = {
  avatars: { id: number; source: any }[]; // Array de avatares
  onAvatarSelect: (id: number) => void;  // Callback ao selecionar um avatar
  avatarStyle?: StyleProp<ImageStyle>;  // Estilo para o avatar
  containerStyle?: StyleProp<ViewStyle>; // Estilo para o carrossel
  selectedAvatarId?: number;            // Avatar selecionado opcional
};

export const AvatarCarousel = ({
  avatars,
  onAvatarSelect,
  avatarStyle,
  containerStyle,
  selectedAvatarId,
}: AvatarCarouselProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, containerStyle]}
    >
      {avatars.map((avatar) => (
        <TouchableOpacity
          key={avatar.id}
          onPress={() => onAvatarSelect(avatar.id)}
          style={[
            styles.avatarContainer,
            selectedAvatarId === avatar.id && styles.selectedAvatar, // Aplica estilo ao selecionado
          ]}
        >
          <Image source={avatar.source} style={[styles.avatar, avatarStyle]} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  avatarContainer: {
    marginHorizontal: 8,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#f00', // Vermelho como padrão para selecionado
  },
  avatar: {
    width: 70,
    height: 70,
  },
});

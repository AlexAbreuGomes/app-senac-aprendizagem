import React from 'react';
import { FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CarrosselAvatares } from '../types/carrosselAvataresTypes';

interface CarrosselAvataresProps {
  data:CarrosselAvatares[];
  onSelectAvatar: (avatar: CarrosselAvatares) => void;
  selectedAvatarId?: string;
}

export const CarrosselAvatar: React.FC<CarrosselAvataresProps> = ({ data, onSelectAvatar, selectedAvatarId }) => {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.avatarContainer,
            selectedAvatarId === item.id && styles.selectedAvatar,
          ]}
          onPress={() => onSelectAvatar(item)}
        >
          <Image source={{uri: item.img}} style={styles.avatarImage} />
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#F7941D',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 30,
  },
});


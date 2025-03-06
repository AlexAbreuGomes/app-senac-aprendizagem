// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

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
          <Image source={item.img} style={styles.avatarImage} />

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
});


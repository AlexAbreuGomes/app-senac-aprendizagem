import React, { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Dimensions, View } from "react-native";
import { AvatarPickerProps } from "../types/carrosselAvatarTYPE"
import { Avatar } from "../types/AVATAR";

const screenWidth = Dimensions.get("window").width;

export const AvatarPicker = ({
  avatars,
  onAvatarSelect,
  selectedAvatarId,
  containerStyle,
  avatarContainerStyle,
  avatarImageStyle,
  selectedAvatarStyle,
}: AvatarPickerProps) => {
  const [internalSelectedAvatar, setInternalSelectedAvatar] = useState<number | null>(
    selectedAvatarId || null
  );

  const handleAvatarPress = (id: number) => {
    setInternalSelectedAvatar(id);
    onAvatarSelect?.(id); // Dispara callback, se fornecido
  };

  const renderAvatar = ({ item }: { item: Avatar }) => (
    <Pressable
      onPress={() => handleAvatarPress(item.id)}
      style={[
        styles.avatarContainer,
        avatarContainerStyle,
        internalSelectedAvatar === item.id && [styles.selectedAvatar, selectedAvatarStyle],
      ]}
    >
      <Image source={item.image} style={[styles.avatarImage, avatarImageStyle]} />
    </Pressable>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={avatars}
        renderItem={renderAvatar}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 20,
    height: 80,
    alignSelf: "center",
    marginVertical: 10,
    alignItems: 'center'
  },
  listContent: {
    alignItems: "center",
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  selectedAvatar: {
    borderColor: "#0059B3", // Cor padrão para avatar selecionado
  },
});

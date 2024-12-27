import React, { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Dimensions, View, StyleProp, ViewStyle, ImageStyle} from "react-native";

type Avatar = {
  id: number;
  image: any; // Tipo da imagem (pode ser ajustado dependendo do carregamento de imagens)
};

type AvatarPickerProps = {
  avatars: Avatar[]; // Array de avatares
  onAvatarSelect?: (id: number) => void; // Callback para selecionar o avatar
  selectedAvatarId?: number; // ID do avatar pré-selecionado
  containerStyle?: StyleProp<ViewStyle>; // Estilo personalizado do contêiner
  avatarContainerStyle?: StyleProp<ViewStyle>; // Estilo do contêiner de cada avatar
  avatarImageStyle?: StyleProp<ImageStyle>; // Estilo da imagem de cada avatar
  selectedAvatarStyle?: StyleProp<ViewStyle>; // Estilo do avatar selecionado
};

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

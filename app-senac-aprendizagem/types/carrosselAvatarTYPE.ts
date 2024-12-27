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

export const {Avatar, AvatarPickerProps}

import {StyleProp, ViewStyle, ImageStyle} from "react-native";
import { Avatar } from "./AVATAR";


export type AvatarPickerProps = {
  avatars: Avatar[]; // Array de avatares
  onAvatarSelect?: (id: number) => void; // Callback para selecionar o avatar
  selectedAvatarId?: number; // ID do avatar pré-selecionado
  containerStyle?: StyleProp<ViewStyle>; // Estilo personalizado do contêiner
  avatarContainerStyle?: StyleProp<ViewStyle>; // Estilo do contêiner de cada avatar
  avatarImageStyle?: StyleProp<ImageStyle>; // Estilo da imagem de cada avatar
  selectedAvatarStyle?: StyleProp<ViewStyle>; // Estilo do avatar selecionado
};

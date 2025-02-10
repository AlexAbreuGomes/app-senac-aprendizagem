export type ConteudoAprendizagem = {
  id: number;
  titulo: string;
  descricao: string;
  texto: string;
  icon?: any;
  onPress: () => void;
  
};


export type ConteudosProps = Pick<ConteudoAprendizagem, "id" | "titulo" | "onPress" | "icon" >;

export type Subtitulo = {
    titulo: string;
    conteudo: string;
    imagem?: Imagem;
  };
  
  export type Imagem = {
    src?: any; // Caminho da imagem usando require
    descricao?: string;
  };
  
  export type ConteudoAprendizagem = {
    id: number;
    titulo: string;
    descricao: string;
    texto: string;
    dicas?: string[];
    subtitulos?: Subtitulo[];
    imagens?: Imagem[];
    onPress: () => void;
  };
  
  export type ConteudosProps = Pick<ConteudoAprendizagem, "titulo" | "onPress" | "id">;

  
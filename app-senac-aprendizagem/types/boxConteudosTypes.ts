// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

export type ConteudoAprendizagem = {
  id: number;
  titulo: string;
  descricao: string;
  texto: string;
  icon?: any;
  onPress?: () => void;
  
};

export type ConteudosProps = Pick<ConteudoAprendizagem, "id" | "titulo" | "onPress" | "icon"> & {
  isCompleted?: boolean;
};


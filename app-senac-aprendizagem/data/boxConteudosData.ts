import { ConteudoAprendizagem } from "../types/boxConteudosTypes";

export const conteudosAprendizagem: ConteudoAprendizagem[] = [
  {
    id: 1,
    titulo: "Comunicação",
    descricao: "A importância da comunicação e práticas para aprimorar.",
    texto: `A comunicação é uma habilidade essencial em qualquer área da vida. 
    Seja na escola, no trabalho ou em casa, saber se expressar e entender os outros ajuda a evitar conflitos, 
    construir relacionamentos e alcançar melhores resultados.`,
    onPress: () => console.log("Comunicação"),
    dicas: [
      "Escute com atenção (Escuta Ativa)",
      "Evite interromper enquanto o outro fala",
      "Confirme o que foi ouvido",
    ],
    subtitulos: [
      {
        titulo: "Escuta Ativa",
        conteudo: `Ouvir é mais do que estar presente. Prestar atenção total no que está sendo dito, não interromper e confirmar o que foi ouvido.`,
        imagem: {
          descricao: "Pessoa ouvindo atentamente outra pessoa.",
        },
      },
    ],
    imagens: [
      {
       
        descricao: "Imagem ilustrativa sobre comunicação.",
      },
    ],
  },
  {
    id: 2,
    titulo: "teste",
    descricao: "Práticas de ensino e aprendizado eficientes.",
    texto: `A educação é o processo de facilitar a aprendizagem ou a aquisição de conhecimento, habilidades, valores, crenças e hábitos.`,
    onPress: () => console.log("Educação"),
    imagens: [
      {
        
        descricao: "Estudantes em uma sala de aula.",
      },
    ],
  },
  {
    id: 3,
    titulo: "Educação",
    descricao: "Práticas de ensino e aprendizado eficientes.",
    texto: `A educação é o processo de facilitar a aprendizagem ou a aquisição de conhecimento, habilidades, valores, crenças e hábitos.`,
    onPress: () => console.log("Educação"),
    imagens: [
      {
        
        descricao: "Estudantes em uma sala de aula.",
      },
    ],
  },
  {
    id: 4,
    titulo: "Educação",
    descricao: "Práticas de ensino e aprendizado eficientes.",
    texto: `A educação é o processo de facilitar a aprendizagem ou a aquisição de conhecimento, habilidades, valores, crenças e hábitos.`,
    onPress: () => console.log("Educação"),
    imagens: [
      {
        
        descricao: "Estudantes em uma sala de aula.",
      },
    ],
  },
  {
    id: 5,
    titulo: "Educação",
    descricao: "Práticas de ensino e aprendizado eficientes.",
    texto: `A educação é o processo de facilitar a aprendizagem ou a aquisição de conhecimento, habilidades, valores, crenças e hábitos.`,
    onPress: () => console.log("Educação"),
    imagens: [
      {
        
        descricao: "Estudantes em uma sala de aula.",
      },
    ],
  },
];

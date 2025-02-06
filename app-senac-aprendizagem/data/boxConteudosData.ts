import { ConteudoAprendizagem } from "../types/boxConteudosTypes";

export const conteudosAprendizagem: ConteudoAprendizagem[] = [
  {
    id: 1,
    titulo: "Comunicação",
    descricao: "A importância da comunicação e práticas para aprimorar.",
    texto: "A comunicação é essencial em todas as áreas da vida, ajudando a evitar conflitos e construir relacionamentos.",
    icon: require("../assets/icons8-communication-96.png"),
    onPress: () => console.log("Comunicação"),
  },
  {
    id: 2,
    titulo: "Educação",
    descricao: "Práticas de ensino e aprendizado eficientes.",
    texto: "A educação facilita a aprendizagem, promovendo conhecimento, habilidades e valores.",
    icon: require("../assets/icons8-communication-96.png"),
    onPress: () => console.log("Educação"),
  },
  {
    id: 3,
    titulo: "Trabalho em Equipe",
    descricao: "A importância da colaboração e do trabalho conjunto.",
    texto: "Trabalhar em equipe permite que diferentes habilidades sejam combinadas para alcançar melhores resultados.",
    icon: require("../assets/icons8-communication-96.png"),
    onPress: () => console.log("Trabalho em Equipe"),
  },
  {
    id: 4,
    titulo: "Gestão do Tempo",
    descricao: "Como gerenciar melhor seu tempo e aumentar a produtividade.",
    texto: "Uma boa gestão do tempo permite que você organize suas tarefas e aumente sua eficiência no dia a dia.",
    icon: require("../assets/icons8-communication-96.png"),
    onPress: () => console.log("Gestão do Tempo"),
  },
  {
    id: 5,
    titulo: "Resolução de Problemas",
    descricao: "Estratégias para resolver problemas de forma eficaz.",
    texto: "Resolver problemas exige análise, criatividade e pensamento crítico para encontrar as melhores soluções.",
    icon: require("../assets/icons8-communication-96.png"),
    onPress: () => console.log("Resolução de Problemas"),
  },
];


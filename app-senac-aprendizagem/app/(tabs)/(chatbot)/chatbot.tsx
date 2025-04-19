// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Tipo para as mensagens
interface Message {
  id: string;
  text: string;
  user: 'user' | 'bot';
  timestamp: number;
}

// Base de conhecimento sobre Aprendizagem Profissional
const aprendizagemInfo = {
  definicao: 
    "A Aprendizagem Profissional é um instrumento de qualificação profissional para adolescentes e jovens, concretizado através da obrigação legal de cumprimento de cota de contratação de aprendizes pelas empresas. As empresas se tornam responsáveis por assegurar formação técnico-profissional metódica aos jovens, desenvolvida por meio de atividades teóricas e práticas organizadas em tarefas de complexidade progressiva.",
  
  quemPodeSer: 
    "Adolescentes ou jovens entre 14 e 24 anos podem ser aprendizes. Caso não tenham concluído o Ensino Médio, devem estar matriculados e frequentando a escola regular. Em locais sem oferta de Ensino Médio, a contratação pode ocorrer sem a frequência escolar, desde que o jovem tenha concluído o Ensino Fundamental.\n\nPessoas com deficiência também podem ser aprendizes, sem limite máximo de idade, e a exigência de escolaridade deve considerar suas habilidades e competências relacionadas à profissionalização.",
  
  contratacao: 
    "A contratação deve ser formalizada através de contrato de trabalho escrito, com anotação em CTPS e registro de empregado. O cargo deve ser registrado como 'aprendiz' seguido da função do programa, com correspondência na CBO. Em anotações gerais, deve constar a natureza especial do contrato, indicando a instituição formadora e a data de início e término.",
  
  contratosSuccessivos: 
    "Não é possível ter contratos de aprendizagem sucessivos com o mesmo empregado sob pena de o segundo ser considerado por prazo indeterminado, salvo quando houver intervalo mínimo de 6 meses entre o término do primeiro e início do segundo contrato.",
  
  mesmosCursos: 
    "O jovem não pode fazer o mesmo curso de aprendizagem mais de uma vez. Ele pode celebrar contratos sucessivos em empresas diferentes, dentro do limite de idade (14 a 24 anos), mas não pode repetir o mesmo curso, exceto se não o tiver concluído com certificação por alguma justificativa legal.",
  
  aprendizPCD: 
    "Para o aprendiz com deficiência não há limite máximo de idade, e o prazo máximo de dois anos para o contrato pode ser estendido. O tempo adicional deve ser baseado em aspectos relacionados à deficiência avaliados individualmente, com plano de curso complementar.\n\nAprendizes PCD com 18 anos ou mais não precisam comprovar matrícula e frequência escolar, apenas no programa de aprendizagem. A rescisão antecipada por desempenho insuficiente não pode ocorrer quando faltar recursos de acessibilidade, tecnologias assistivas ou apoio necessário.",
  
  rescisaoAntecipada: 
    "O contrato pode ser rescindido antecipadamente nas seguintes situações:\n\n• Quando o aprendiz completar 24 anos antes do término previsto\n• Por desempenho insuficiente ou inadaptação (com laudo da entidade executora)\n• Em casos de falta disciplinar grave (art. 482 da CLT)\n• Quando a ausência injustificada à escola causar perda do ano letivo\n• A pedido do aprendiz\n• Por fechamento do estabelecimento sem possibilidade de transferência\n• Por morte do empregador individual\n• Na rescisão indireta",
  
  verbasRescisórias: 
    "As verbas rescisórias variam conforme o motivo da rescisão:\n\n• Término normal do contrato: saldo de salário, 13º e férias proporcionais, saque do FGTS\n• Rescisão por desempenho insuficiente: saldo de salário, 13º e férias proporcionais, saque do FGTS\n• Falta disciplinar grave: apenas saldo de salário e férias proporcionais\n• A pedido do aprendiz: saldo de salário, 13º e férias proporcionais, saque do FGTS\n• Rescisão indireta: todas as verbas, incluindo multa do FGTS e indenização do art. 479 CLT",
  
  salario: 
    "A lei garante ao aprendiz o direito ao salário mínimo-hora, observando-se, caso exista, melhor condição salarial (como piso da categoria). Além das horas práticas, devem ser computadas no salário também as horas destinadas às atividades teóricas.",
  
  calculoSalario: 
    "O salário mensal do aprendiz é calculado pela fórmula:\n\nSalário Mensal = (Salário-hora × horas trabalhadas semanais × semanas no mês × 7) ÷ 6\n\nO número de semanas varia conforme os dias no mês:\n• 31 dias: 4,4285 semanas\n• 30 dias: 4,2857 semanas\n• 29 dias: 4,1428 semanas\n• 28 dias: 4 semanas",
  
  adicionalNoturno: 
    "O aprendiz maior de 18 anos que trabalhe em horário noturno tem direito ao adicional noturno. Aprendizes menores de 18 anos não podem trabalhar em horário noturno.",
  
  insalubridade: 
    "O aprendiz maior de 18 anos exposto a condições insalubres ou perigosas tem direito aos respectivos adicionais. O adicional de insalubridade é calculado sobre o salário mínimo, enquanto o de periculosidade é calculado sobre o valor salarial recebido. Se houver ambos, recebe-se apenas o de maior valor. Aprendizes menores de 18 anos não podem trabalhar em locais insalubres ou perigosos.",
  
  descontos: 
    "Podem ser descontados do salário do aprendiz os percentuais de INSS, vale-transporte, faltas e atrasos injustificados não abonados, seguindo a regra geral do art. 462 da CLT.",
  
  faltaCurso: 
    "As faltas ao curso teórico podem ser descontadas do salário, pois as horas teóricas integram a jornada. Descontam-se as faltas não justificadas legalmente ou não autorizadas pelo empregador, com reflexos no repouso semanal remunerado e eventuais feriados.",
  
  contribuicaoSindical: 
    "O desconto da contribuição sindical para aprendizes está condicionado à autorização prévia e expressa em favor do sindicato representativo da categoria ou profissão.",
  
  jornada: 
    "A jornada do aprendiz é definida no programa e contrato de aprendizagem, não podendo exceder seis horas diárias como regra geral.",
  
  feriados: 
    "O trabalho em feriados não é permitido aos aprendizes, pois exigiria folga compensatória, o que é vedado pelo art. 432 da CLT.",
  
  controlePonto: 
    "É necessário o controle de ponto do aprendiz tanto na parte teórica quanto prática. O estabelecimento com 10 ou mais empregados está obrigado a registrar o controle de jornada, que pode ser manual, mecânico ou eletrônico. O controle de frequência às aulas não substitui o registro de jornada.",
  
  folgasTeorica: 
    "Durante as folgas das atividades teóricas, o aprendiz pode cumprir jornada integral na empresa, desde que previsto no programa de aprendizagem e respeitada a jornada máxima de 6 horas (jornadas superiores não podem ser exclusivamente práticas). Folgas e recessos devem estar previstos no programa e calendário.",
  
  alteracaoHorario: 
    "É possível alterar o horário de trabalho mediante celebração de termo aditivo ao contrato, assinado pelas partes e pela entidade formadora, desde que não prejudique o aprendiz.",
  
  ferias: 
    "O aprendiz tem direito a férias após cada período de 12 meses de contrato. Faltas injustificadas têm reflexos no período de férias, conforme o art. 130 da CLT. As férias devem estar previstas no programa, contrato e calendário.",
  
  fgts: 
    "A contribuição ao FGTS para o aprendiz corresponde a 2% da remuneração paga ou devida no mês anterior.",
  
  previdencia: 
    "Os aprendizes gozam de proteção previdenciária, com os mesmos direitos de outros trabalhadores.",
  
  valeTransporte: 
    "O aprendiz tem direito ao vale-transporte para todos os deslocamentos necessários: residência/empresa, residência/entidade formadora e empresa/entidade formadora, caso necessário. Se em um mesmo dia houver deslocamentos diferentes, devem ser fornecidos vales suficientes para todo o percurso.",
  
  afastamentoDoenca: 
    "No caso de afastamento por doença ou acidente, o contrato é interrompido nos primeiros 15 dias (pagos pelo empregador) e suspenso a partir do 16º dia, quando o pagamento fica a cargo do INSS. Durante a suspensão, o contrato não pode ser rescindido e o aprendiz continua contando para a cota. No auxílio-doença acidentário, é devido o recolhimento do FGTS e garantida a estabilidade de 12 meses após a cessação do benefício.",
  
  estabilidadeGravidez: 
    "A aprendiz grávida tem direito à estabilidade, conforme a Súmula 244 do TST. O contrato pode ser prorrogado excepcionalmente até o fim do período de estabilidade, mesmo ultrapassando o prazo máximo de 2 anos ou a idade de 24 anos. Não há transformação em contrato indeterminado, mantendo-se as condições originais. Se impossível continuar a parte teórica, a jornada será exclusivamente prática.",
  
  estabilidadeAcidente: 
    "O aprendiz tem direito à estabilidade por acidente de trabalho, conforme a Súmula 378 do TST. É necessário afastamento superior a 15 dias e recebimento do auxílio-doença acidentário. A estabilidade é de 12 meses após a cessação do benefício, conforme o art. 118 da Lei 8.213/1991.",
  
  sancoesDisciplinares: 
    "As sanções disciplinares da CLT (advertência, suspensão e demissão por justa causa) aplicam-se aos aprendizes, como a qualquer outro empregado.",
  
  continuidade: 
    "Se o aprendiz continuar na empresa após o término do contrato, o vínculo passa a vigorar como contrato por prazo indeterminado, com todos os direitos correspondentes, mediante as devidas alterações contratuais e ajustes nas obrigações trabalhistas.",
  
  licencaPaternidade: 
    "O aprendiz que for pai tem direito à licença-paternidade de 5 dias corridos, a partir do primeiro dia útil após o nascimento ou adoção."
};

export default function ChatbotScreen() {
  // Estado para o texto de entrada
  const [inputText, setInputText] = useState('');
  // Estado para armazenar todas as mensagens
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: 'Olá! Sou o assistente virtual especializado em Aprendizagem Profissional. Como posso ajudar você hoje?\n\nPosso esclarecer dúvidas sobre contratação, direitos e deveres dos aprendizes, jornada de trabalho, salário, e muito mais!', 
      user: 'bot', 
      timestamp: Date.now() 
    }
  ]);
  
  // Referência para o scroll
  const scrollViewRef = useRef<FlatList>(null);

  // Função para encontrar a resposta mais relevante
  const getBotResponse = (userMessage: string) => {
    const userMessageLower = userMessage.toLowerCase();
    
    // Identificar as informações mais relevantes com base no texto do usuário
    
    // Definição da Aprendizagem Profissional
    if (userMessageLower.includes('o que é') || userMessageLower.includes('definição') || 
        userMessageLower.includes('conceito') || userMessageLower.includes('aprendizagem profissional') || 
        userMessageLower.includes('explicar aprendizagem')) {
      return aprendizagemInfo.definicao;
    }
    
    // Quem pode ser aprendiz
    else if (userMessageLower.includes('quem pode') || userMessageLower.includes('ser aprendiz') || 
             userMessageLower.includes('idade') || userMessageLower.includes('requisitos') || 
             userMessageLower.includes('posso ser')) {
      return aprendizagemInfo.quemPodeSer;
    }
    
    // Contratação do aprendiz
    else if (userMessageLower.includes('contratar') || userMessageLower.includes('contratação') || 
             userMessageLower.includes('formalizar') || userMessageLower.includes('ctps') || 
             userMessageLower.includes('carteira')) {
      return aprendizagemInfo.contratacao;
    }
    
    // Contratos sucessivos
    else if (userMessageLower.includes('duas vezes') || userMessageLower.includes('mesma empresa') || 
             userMessageLower.includes('contratos sucessivos') || userMessageLower.includes('recontratar')) {
      return aprendizagemInfo.contratosSuccessivos;
    }
    
    // Repetição de cursos
    else if (userMessageLower.includes('mesmo curso') || userMessageLower.includes('repetir curso') || 
             userMessageLower.includes('fazer de novo') || userMessageLower.includes('curso mais de uma vez')) {
      return aprendizagemInfo.mesmosCursos;
    }
    
    // Aprendiz PCD
    else if (userMessageLower.includes('pcd') || userMessageLower.includes('deficiência') || 
             userMessageLower.includes('deficiente') || userMessageLower.includes('especial')) {
      return aprendizagemInfo.aprendizPCD;
    }
    
    // Rescisão antecipada
    else if (userMessageLower.includes('rescisão') || userMessageLower.includes('rescindir') || 
             userMessageLower.includes('terminar antes') || userMessageLower.includes('demissão') || 
             userMessageLower.includes('demitir')) {
      return aprendizagemInfo.rescisaoAntecipada;
    }
    
    // Verbas rescisórias
    else if (userMessageLower.includes('verbas') || userMessageLower.includes('rescisórias') || 
             userMessageLower.includes('pagamento rescisão') || userMessageLower.includes('indenização')) {
      return aprendizagemInfo.verbasRescisórias;
    }
    
    // Salário do aprendiz
    else if (userMessageLower.includes('salário') || userMessageLower.includes('pagamento') || 
             userMessageLower.includes('remuneração') || userMessageLower.includes('ganhar') || 
             userMessageLower.includes('quanto ganha')) {
      return aprendizagemInfo.salario;
    }
    
    // Cálculo do salário
    else if (userMessageLower.includes('calcular') || userMessageLower.includes('cálculo') || 
             userMessageLower.includes('fórmula') || userMessageLower.includes('como calcular')) {
      return aprendizagemInfo.calculoSalario;
    }
    
    // Adicional noturno
    else if (userMessageLower.includes('noturno') || userMessageLower.includes('noite') || 
             userMessageLower.includes('adicional noturno')) {
      return aprendizagemInfo.adicionalNoturno;
    }
    
    // Insalubridade e periculosidade
    else if (userMessageLower.includes('insalubridade') || userMessageLower.includes('periculosidade') || 
             userMessageLower.includes('perigoso') || userMessageLower.includes('insalubre')) {
      return aprendizagemInfo.insalubridade;
    }
    
    // Descontos no salário
    else if (userMessageLower.includes('descontos') || userMessageLower.includes('descontar') || 
             userMessageLower.includes('dedução') || userMessageLower.includes('tirar do salário')) {
      return aprendizagemInfo.descontos;
    }
    
    // Faltas ao curso
    else if (userMessageLower.includes('faltar curso') || userMessageLower.includes('faltas teóricas') || 
             userMessageLower.includes('faltar aula')) {
      return aprendizagemInfo.faltaCurso;
    }
    
    // Contribuição sindical
    else if (userMessageLower.includes('sindicat') || userMessageLower.includes('contribuição sindical')) {
      return aprendizagemInfo.contribuicaoSindical;
    }
    
    // Jornada de trabalho
    else if (userMessageLower.includes('jornada') || userMessageLower.includes('horário') || 
             userMessageLower.includes('horas') || userMessageLower.includes('trabalhar quantas horas')) {
      return aprendizagemInfo.jornada;
    }
    
    // Trabalho em feriados
    else if (userMessageLower.includes('feriado') || userMessageLower.includes('feriados') || 
             userMessageLower.includes('trabalhar feriado')) {
      return aprendizagemInfo.feriados;
    }
    
    // Controle de ponto
    else if (userMessageLower.includes('ponto') || userMessageLower.includes('controle') || 
             userMessageLower.includes('registro') || userMessageLower.includes('registrar horário')) {
      return aprendizagemInfo.controlePonto;
    }
    
    // Folgas das atividades teóricas
    else if (userMessageLower.includes('folga') || userMessageLower.includes('folgas teóricas') || 
             userMessageLower.includes('sem aula') || userMessageLower.includes('teórica')) {
      return aprendizagemInfo.folgasTeorica;
    }
    
    // Alteração de horário
    else if (userMessageLower.includes('mudar horário') || userMessageLower.includes('alteração horário') || 
             userMessageLower.includes('trocar horário')) {
      return aprendizagemInfo.alteracaoHorario;
    }
    
    // Férias
    else if (userMessageLower.includes('férias') || userMessageLower.includes('descanso anual')) {
      return aprendizagemInfo.ferias;
    }
    
    // FGTS
    else if (userMessageLower.includes('fgts') || userMessageLower.includes('fundo de garantia')) {
      return aprendizagemInfo.fgts;
    }
    
    // Previdência
    else if (userMessageLower.includes('previdência') || userMessageLower.includes('inss') || 
             userMessageLower.includes('aposentadoria') || userMessageLower.includes('seguro')) {
      return aprendizagemInfo.previdencia;
    }
    
    // Vale transporte
    else if (userMessageLower.includes('vale') || userMessageLower.includes('transporte') || 
             userMessageLower.includes('passagem') || userMessageLower.includes('ônibus') || 
             userMessageLower.includes('locomoção')) {
      return aprendizagemInfo.valeTransporte;
    }
    
    // Afastamento por doença
    else if (userMessageLower.includes('doença') || userMessageLower.includes('afastamento') || 
             userMessageLower.includes('ficar doente') || userMessageLower.includes('auxílio doença')) {
      return aprendizagemInfo.afastamentoDoenca;
    }
    
    // Estabilidade na gravidez
    else if (userMessageLower.includes('gravidez') || userMessageLower.includes('grávida') || 
             userMessageLower.includes('gestante') || userMessageLower.includes('engravidar')) {
      return aprendizagemInfo.estabilidadeGravidez;
    }
    
    // Estabilidade por acidente
    else if (userMessageLower.includes('acidente') || userMessageLower.includes('estabilidade acidente') || 
             userMessageLower.includes('acidentado')) {
      return aprendizagemInfo.estabilidadeAcidente;
    }
    
    // Sanções disciplinares
    else if (userMessageLower.includes('sanção') || userMessageLower.includes('punição') || 
             userMessageLower.includes('advertência') || userMessageLower.includes('suspensão') || 
             userMessageLower.includes('disciplina')) {
      return aprendizagemInfo.sancoesDisciplinares;
    }
    
    // Continuidade após o término
    else if (userMessageLower.includes('continuar') || userMessageLower.includes('depois do contrato') || 
             userMessageLower.includes('após término') || userMessageLower.includes('efetivação')) {
      return aprendizagemInfo.continuidade;
    }
    
    // Licença paternidade
    else if (userMessageLower.includes('paternidade') || userMessageLower.includes('pai') || 
             userMessageLower.includes('filho') || userMessageLower.includes('nascimento')) {
      return aprendizagemInfo.licencaPaternidade;
    }
    
    // Tópicos disponíveis (caso não encontre uma correspondência específica)
    else {
      return "Posso fornecer informações sobre diversos tópicos relacionados à Aprendizagem Profissional. Pergunte sobre:\n\n• O que é Aprendizagem Profissional\n• Quem pode ser aprendiz\n• Como contratar um aprendiz\n• Salário e benefícios do aprendiz\n• Jornada de trabalho\n• Direitos e deveres\n• Rescisão do contrato\n• Estabilidade\n\nComo posso ajudá-lo hoje?";
    }
  };

  // Função para enviar mensagem
  const sendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      user: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    
    // Simula uma breve pausa antes da resposta do bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        user: 'bot',
        timestamp: Date.now()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 800);
  };

  // Função para renderizar cada mensagem
  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.user === 'user';
    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.botMessage
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Text>
      </View>
    );
  };

  // Lista de sugestões para o usuário
  const suggestions = [
    "O que é Aprendizagem Profissional?",
    "Quem pode ser aprendiz?",
    "Como é calculado o salário?",
    "Quais são os direitos do aprendiz?",
    "O que acontece ao fim do contrato?"
  ];

  // Função para selecionar uma sugestão
  const selectSuggestion = (suggestion: string) => {
    // Adiciona a sugestão como mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      user: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Simula resposta do bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(suggestion),
        user: 'bot',
        timestamp: Date.now()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Assistente de Aprendizagem Profissional</Text>
        </View>
        
        <FlatList
          ref={scrollViewRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        />
        
        {messages.length === 1 && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Sugestões:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionScroll}>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.suggestionButton}
                  onPress={() => selectSuggestion(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite sua dúvida sobre Aprendizagem..."
            multiline={true}
            maxLength={500}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={inputText.trim() === ''}
          >
            <Ionicons 
              name="send" 
              size={24} 
              color={inputText.trim() === '' ? '#cccccc' : '#0066cc'} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#e31c19', // Cor mais alinhada com o SENAC
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  messageContainer: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 18,
    marginBottom: 14,
    elevation: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e6f5ff',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  suggestionsContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#555',
  },
  suggestionScroll: {
    flexDirection: 'row',
  },
  suggestionButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  suggestionText: {
    fontSize: 14,
    color: '#0066cc',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 20,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
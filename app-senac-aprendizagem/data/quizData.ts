// Copyright (c) 2025 Alex de Abreu Gomes, Daniel Cruz, Jean Carlos, Rafael Bezerra, Wesllen D. B. Ferreira, Pedro Henrique, Tahlissa Vitoria.
// Licensed under Proprietary License - All rights reserved. Unauthorized usage or distribution is prohibited.

const quizData = [
  {
    question: 'O que é Aprendizagem Profissional?',
    options: [
      'Programa voltado para jovens que combina teoria e prática em um ambiente de trabalho.',
      'Aprendizagem adquirida apenas dentro do ambiente profissional',
      'Curso rápido para qualquer pessoa melhorar suas habilidades técnicas.',
      'Modalidade de ensino superior voltada para a formação de especialistas.'
    ],
    correct_option: 'Programa voltado para jovens que combina teoria e prática em um ambiente de trabalho.',
  },
  {
    question: 'Quem pode ser aprendiz?',
    options: [
      'Qualquer pessoa de qualquer idade',
      'O adolescente ou jovem entre 14 e 24 anos',
      'Apenas quem já tem experiência profissional',
      'Apenas estudantes universitários'
    ],
    correct_option: 'O adolescente ou jovem entre 14 e 24 anos',
  },
  {
    question: 'Como formalizar a contratação do aprendiz?',
    options: [
      'A empresa deve fazer um contrato de aprendizagem e registrar na carteira de trabalho.',
      'Basta a empresa registrar o jovem como voluntário.',
      'O aprendiz começa a trabalhar sem precisar de contrato formal.',
      'Apenas um acordo verbal entre empresa e aprendiz é suficiente'
    ],
    correct_option: 'A empresa deve fazer um contrato de aprendizagem e registrar na carteira de trabalho.',
  },
  {
    question: 'O jovem pode ser aprendiz por duas ou mais vezes na mesma empresa?',
    options: [
      'Sim, ele pode ser aprendiz várias vezes na mesma empresa, sem limite de contratos.',
      'Não, ele só pode ser aprendiz uma vez, em qualquer empresa.',
      'Não, após o primeiro contrato, o jovem deve obrigatoriamente ser efetivado.',
      'Não é possível a pactuação de contratos de aprendizagem sucessivos com o mesmo empregado sob pena de o segundo contrato ser considerado por prazo indeterminado, salvo quando for observado o interstício mínimo de 6 (seis) meses entre o término do primeiro contrato de aprendizagem e o início do segundo contrato de aprendizagem.'
    ],
    correct_option: 'Não é possível a pactuação de contratos de aprendizagem sucessivos com o mesmo empregado sob pena de o segundo contrato ser considerado por prazo indeterminado, salvo quando for observado o interstício mínimo de 6 (seis) meses entre o término do primeiro contrato de aprendizagem e o início do segundo contrato de aprendizagem.',
  },
  {
    question: 'O jovem pode fazer o mesmo curso de aprendizagem mais de uma vez?',
    options: [
      'Sim, pode repetir o mesmo curso de aprendizagem quantas vezes quiser.',
      'Não, só pode fazer um curso de aprendizagem uma única vez.',
      'Não é possível a pactuação de contratos de aprendizagem sucessivos com o mesmo empregado sob pena de o segundo contrato ser considerado por prazo indeterminado, salvo quando for observado o interstício mínimo de 6 (seis) meses entre o término do primeiro contrato de aprendizagem e o início do segundo contrato de aprendizagem.',
      'Sim, mas apenas se for em empresas diferentes'
    ],
    correct_option: 'Não é possível a pactuação de contratos de aprendizagem sucessivos com o mesmo empregado sob pena de o segundo contrato ser considerado por prazo indeterminado, salvo quando for observado o interstício mínimo de 6 (seis) meses entre o término do primeiro contrato de aprendizagem e o início do segundo contrato de aprendizagem.',
  },
  {
    question: 'Quais os detalhes do contrato do aprendiz PCD?',
    options: [
      'O contrato do aprendiz PCD pode ter duração maior que o limite geral.',
      'O contrato do aprendiz PCD não exige vínculo empregatício.',
      'O aprendiz PCD não precisa cumprir carga horária teórica.',
      'O contrato do aprendiz PCD é igual ao de qualquer outro aprendiz, sem adaptações.'
    ],
    correct_option: 'O contrato do aprendiz PCD pode ter duração maior que o limite geral.',
  },
  {
    question: 'Rescisão antecipada do contrato de aprendizagem pode acontecer?',
    options: [
      'Pode ser rescindido antecipadamente se o jovem for efetivado na empresa.',
      'Só pode ser encerrado no prazo final, sem exceções.',
      'Pode ser rescindido antecipadamente por desempenho insuficiente, falta disciplinar grave ou pedido do aprendiz.',
      'Pode ser rescindido a qualquer momento, sem necessidade de justificativa.'
    ],
    correct_option: 'Pode ser rescindido antecipadamente por desempenho insuficiente, falta disciplinar grave ou pedido do aprendiz.',
  },
  {
    question: 'Quais são as verbas rescisórias devidas após o término do contrato de aprendizagem?',
    options: [
      'Em qualquer rescisão, o aprendiz recebe apenas o salário do mês.',
      'Tem direito ao saldo de salário, 13º salário, férias, e FGTS.',
      'O aprendiz nunca recebe verbas rescisórias, pois o contrato é temporário.',
      'Independentemente do motivo da rescisão, o aprendiz recebe todos os direitos de um trabalhador efetivo.'
    ],
    correct_option: 'Tem direito ao saldo de salário, 13º salário, férias, e FGTS.',
  },
  {
    question: 'Qual deve ser o salário do aprendiz?',
    options: [
      'Deve ser, no mínimo, o proporcional ao salário mínimo conforme as horas trabalhadas.',
      'Deve receber, no mínimo, um salário mínimo integral.',
      'Recebe um valor fixo definido pela empresa, sem regras específicas.',
      'Não tem direito a salário, apenas a um auxílio financeiro.'
    ],
    correct_option: 'Deve ser, no mínimo, o proporcional ao salário mínimo conforme as horas trabalhadas.',
  },
  {
    question: 'O aprendiz tem direito ao adicional noturno?',
    options: [
      'Não, pois aprendizes não podem trabalhar à noite.',
      'Sim. O jovem, maior de 18 anos, que cumpra jornada em horário noturno faz jus ao recebimento do respectivo adicional.',
      'Não, o aprendiz nunca recebe adicional noturno.',
      'Não, o aprendiz não tem direito ao adicional noturno.'
    ],
    correct_option: 'Sim. O jovem, maior de 18 anos, que cumpra jornada em horário noturno faz jus ao recebimento do respectivo adicional.',
  }


];

export default quizData;

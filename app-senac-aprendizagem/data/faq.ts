import { Faq } from "../types/faqTypes";

export const faqs: Faq[] = [
    {
        id: 1,
        pergunta: 'Quem deve assinar a ata?',
        resposta: 'A ata deve ser assinada pelo aprendiz, pelo supervisor responsável e pelo Instrutor da instituição de ensino. Cada assinatura garante a legitimidade do registro e comprova que as informações foram verificadas e aprovadas.'
    },
    {
        id: 2,
        pergunta: 'O supervisor assinou no campo errado.O que fazer?',
        resposta: 'Se o supervisor assinou no campo errado, informe-o imediatamente para que seja feita uma correção. Ele pode riscar de forma simples a assinatura errada (mantendo-a legível), escrever "assinado em campo incorreto" e assinar novamente no local correto. Caso haja dúvidas, consulte o responsável pela administração do livro ATA para orientações.'
    },
    {
        id: 3,
        pergunta: 'O supervisor solicitou correções ortográficas da minha ata. O que fazer?',
        resposta: 'Se o supervisor solicitou correções ortográficas, revise cuidadosamente o texto da ATA, corrigindo os erros apontados. Use uma caneta de mesma cor (geralmente azul ou preta) e faça as correções de forma limpa e legível, sem rasurar excessivamente. Se necessário, explique as alterações no rodapé ou ao lado das correções.'
    },
    {
        id: 4,
        pergunta: 'Não encontrei o supervisor que me acompanhou nos 2 primeiros dias para assinar a ata. O que fazer?',
        resposta: 'Caso o supervisor não esteja disponível para assinar a ATA, tente entrar em contato com ele por outros meios, como email ou telefone, para organizar um momento em que ele possa assiná-la. Se ele não puder assinar, consulte o instrutor responsável para entender como proceder. Normalmente outro supervisor que esteja presente pode validar as atividades realizadas.'
    },
];
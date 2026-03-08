export interface Challenge {
  id: number;
  dateKey: string;
  question: string;
  options: string[];
  correctAnswer: string;
  passwordWord: string;
  letter: string;
}

export const ANNIVERSARY_DATE = "2026-03-12";

export const challenges: Challenge[] = [
  {
    id: 1,
    dateKey: "2026-03-08",
    question: 'Complete a frase: "Deixa eu ver esse ..."',
    options: ["Negócio aí", "Trem aí", "Halls aí", "Fio aí"],
    correctAnswer: "Halls aí",
    passwordWord: "NOSSO",
    letter:
      "Feliz Dia Internacional da Mulher, meu amor. Obrigado por me permitir fazer parte da sua história." +
      "\n" +
      "A escolha da resposta é só pra representar que você é de fazer e não de falar... Quando nos conhecemos eu sentia que você era alguém especial. Hoje eu celebro a mulher incrível, forte (que chora sem ninguem ver e sem parecer que ta chorando) e doce (as vezes mal-humorada) que você é. Que eu possa ser motivo de sorriso e acolhimento na sua vida. Eu te amo 💜",
  },
  {
    id: 2,
    dateKey: "2026-03-09",
    question: 'Complete a frase: "Eu quero que entrem um dentro do outro..."',
    options: [
      "Se fodam e vão pra puta que pariu!",
      "E vão pra casa do caralho",
      "Se fodam e vão pra casa do caralho",
      "Vão pra casa do caralho e se fodam",
    ],
    correctAnswer: "Se fodam e vão pra puta que pariu!",
    passwordWord: "AMOR",
    letter:
      "Todas as nossas experiências juntos são a prova de que a nossa companhia um para o outro é o melhor lugar do mundo. Obrigado por cada abraço nos momentos de dores e tristeza, por cada conversa longa e por dividir comigo o silêncio confortável de quem se ama de verdade.",
  },
  {
    id: 3,
    dateKey: "2026-03-10",
    question:
      "Qual é a nossa comida preferida de casal num domingo às 23:00h da noite?",
    options: [
      "Lanchão Gratidão do Big Nando",
      "Lanche do Arroz",
      "Lanche do Galego",
      "Lanche do Brazerus",
    ],
    correctAnswer: "Lanchão Gratidão do Big Nando",
    passwordWord: "É",
    letter:
      "Entre todos os lanches e comidas do mundo, a minha favorita é sempre a que eu divido com você. Seja no sofá, maratonando série, ou depois de um dia cansativo, ou até mesmo num domingo às 23:00h da noite, é o seu sorriso ao dar a primeira mordida que faz tudo valer a pena.",
  },
  {
    id: 4,
    dateKey: "2026-03-11",
    question: "Qual música é significativa pra mim dentro do relacionamento?",
    options: [
      "Vermilion - Slipknot",
      "Sulfur - Slipknot",
      "Minha Cura - Mc Cabelinho",
      "Lembranças de Amor - Vitor e Léo",
    ],
    correctAnswer: "Minha Cura - Mc Cabelinho",
    passwordWord: "PARA",
    letter:
      "Minha Cura, foi a música que ditou todo o início e construção do relacionamento de volta. Entre todas as musicas, histórias de séries e filmes que assistimos, a minha história favorita continua sendo a nossa. Obrigado por rir alto comigo, por compartilhar assistir animes comigo e por me lembrar todos os dias que o nosso relacionamento é leve, divertido e verdadeiro.",
  },
  {
    id: 5,
    dateKey: "2026-03-12",
    question: "Onde nós demos nosso primeiro abraço?",
    options: [
      "No pátio do antigo campus da Facthus",
      "Durante nosso primeiro beijo",
      "No pós primeiro beijo",
      "Na escada do fundo da Facthus",
    ],
    correctAnswer: "No pátio do antigo campus da Facthus",
    passwordWord: "SEMPRE",
    letter:
      "Entre beijos, abraços, pés na bunda com beijos na sequência, términos, distanciamento..." +
      "Em meio a tudo isso por algum motivo cá estamos nós de novo... Seis anos atrás em Março além da Pandemia(estávamos distantes), já haviamos rompido o nosso quase..." +
      "Três anos depois em uma noite de sábado num quarto de Airbnb começamos o namoro..." +
      "Talvez seja a forma torta?! Sim, Mas o que nesse relacionamento não foi torto e fora do padrão ? Ou você vai me dizer que é comum pessoas terminarem e se beijar depois?." +
      "Chegamos ao último desafio... e também ao começo de muitos outros momentos juntos. " +
      "Se cada pergunta foi uma memória, cada palavra formou aquilo que sentimos todos os dias. " +
      "\n\nNosso amor é para sempre. " +
      "Obrigado por dividir a vida comigo. " +
      "E agora… chegou a hora da sua surpresa final. 💜",
  },
];

export const FINAL_PHRASE = "NOSSO AMOR É PARA SEMPRE";

export const orderedChallenges = challenges.sort(
  (a, b) => new Date(a.dateKey).getTime() - new Date(b.dateKey).getTime(),
);
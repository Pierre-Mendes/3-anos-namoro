<template>
  <section class="final" :class="{ glow: stage >= 3 }">
    <header class="header">
      <button class="back-btn" type="button" @click="goBack">
        ←
      </button>
      <div>
        <p class="eyebrow">Frase secreta</p>
        <h2>O que os desafios revelaram?</h2>
      </div>
    </header>

    <p class="hint">
      Use as palavras que você descobriu para montar a frase completa. Dica: é exatamente o que eu sinto por você.
    </p>

    <form class="phrase-form" @submit.prevent="checkPhrase">
      <label for="phrase" class="label">Digite a frase secreta</label>
      <input
        id="phrase"
        v-model="input"
        class="input"
        type="text"
        placeholder="Ex: EU TE AMO, MEU AMOR! 💜"
        autocomplete="off"
      />
      <p v-if="error" class="error">
        Quase lá... confere as palavrinhas com carinho. 💭
      </p>
      <button class="submit" type="submit">
        Revelar surpresa
      </button>
    </form>

    <HeartExplosion :active="stage === 1" />

    <transition name="fade-up">
      <div v-if="stage >= 2" class="fireworks-wrapper">
        <FireworksHearts />
      </div>
    </transition>

    <transition name="fade-up">
      <section v-if="stage >= 4" class="letter-card">
        <h3>Minha carta para você</h3>
        <p>
          Hoje a gente celebra 3 anos de uma história que me fez crescer, sonhar mais alto e acreditar em um futuro
          cheio de luz ao seu lado. Quando eu olho para trás e lembro de cada riso, cada abraço apertado e cada noite
          em que a gente só existiu um para o outro, meu peito se enche de gratidão.
        </p>
        <p>
          Passamos por muitos momentos bons e por momentos horríveis... Mas mesmo com dor, dúvidas, impasses...
          Acho que nunca compramos a ideia de não sermos eternos. Espero que eu ainda possa ser seu motivo de escolha diária.
        </p>
        <p>
          Obrigado por ser a mulher que você é, és forte, sensível do teu jeito, inteligente, é gata pra caramba, é gostosa, tem mó rabão.
          Você me inspira a buscar ser um homem melhor a cada dia e me mostra todos os dias o que é um amor paciente, verdadeiro e leve.
        </p>
        <p>
          Eu não sei exatamente como vão ser os próximos anos, o que a vida nos reserva, quais são os próximos planos, como executaremos...
          mas eu sei que quero todos eles com você... Ficarmos juntos tem seu preço tal qual cada um ir pro seu lado...
          Mas eu quero continuar... construir um lar, uma casa, rotina, sonhos e memórias, lado a lado, de mãos dadas com você...
        </p>
        <p>
          Confesso que me cocei muito pra converter isso em um pedido de casamento... Não ta dando pra comportar mais o titulo de namorado/namorada
          Mas acho que merecemos mais... E eu sei que morar junto não muda os títulos... Mas ressignifica muita coisa. Hoje vivemos um momento delicado
          Precisamos nos agarrar à alguma coisa... Espero que esse ano o Natal seja, em uma mesa nossa, com a nossa ceia, nossa casa, nosso lar...
          Deus sabe o que faz... Com ele na frente regindo nossos caminhos tudo é possível
        </p>
        <p class="closing">
          Te amo mais a cada dia. Que esse seja apenas mais um capítulo de uma história longa, bonita e do jeitinho que
          a gente merece: cheia de amor. Até ficarmos bem velhinhos soiznhos de novo!
        </p>
        <p class="signature">Com todo o meu amor,</p>
        <p class="signature strong">seu eterno Pietro. 💜</p>

        <SurpriseReveal />
      </section>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeartExplosion from '../components/HeartExplosion.vue';
import FireworksHearts from '../components/FireworksHearts.vue';
import SurpriseReveal from '../components/SurpriseReveal.vue';
import { FINAL_PHRASE } from '../data/challenges';

const router = useRouter();

const input = ref('');
const error = ref(false);
const stage = ref(0);

const normalized = (value: string) => value.trim().toUpperCase();

const goBack = () => {
  router.back();
};

const checkPhrase = () => {
  if (normalized(input.value) !== normalized(FINAL_PHRASE)) {
    error.value = true;
    return;
  }
  error.value = false;
  startSequence();
};

const startSequence = () => {
  if (stage.value > 0) return;
  stage.value = 1;
  window.setTimeout(() => {
    stage.value = 2;
    window.setTimeout(() => {
      stage.value = 3;
      window.setTimeout(() => {
        stage.value = 4;
      }, 1000);
    }, 1500);
  }, 1000);
};
</script>

<style scoped>
.final {
  text-align: left;
  transition: background 0.7s ease, box-shadow 0.7s ease;
  border-radius: 1.6rem;
  padding: 1.1rem 1rem 1.6rem;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 20px 50px rgba(93, 18, 65, 0.5);
}

.final.glow {
  background: radial-gradient(circle at top, #ffe5ec, #fff0f5);
  box-shadow: 0 30px 80px rgba(186, 44, 106, 0.7);
}

.header {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.back-btn {
  border-radius: 999px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 22px rgba(178, 24, 92, 0.3);
  font-size: 1.1rem;
  cursor: pointer;
}

.eyebrow {
  margin: 0;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #c75b8a;
}

h2 {
  margin: 0.1rem 0 0;
  font-size: 1.28rem;
  color: #b2185c;
}

.hint {
  margin: 0.3rem 0 0.9rem;
  font-size: 0.88rem;
  color: #7c3356;
}

.phrase-form {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-bottom: 1.2rem;
}

.label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #c75b8a;
}

.input {
  border-radius: 0.9rem;
  border: 1px solid rgba(255, 143, 171, 0.7);
  padding: 0.65rem 0.75rem;
  font-size: 0.95rem;
  outline: none;
  background: rgba(255, 255, 255, 0.95);
}

.input::placeholder {
  color: #c98ea8;
}

.error {
  margin: 0;
  font-size: 0.82rem;
  color: #c9184a;
}

.submit {
  margin-top: 0.3rem;
  border-radius: 999px;
  border: none;
  padding: 0.8rem 1rem;
  background: linear-gradient(135deg, #c9184a, #ff4d6d);
  color: #fff;
  font-size: 0.96rem;
  font-weight: 600;
  box-shadow: 0 18px 40px rgba(201, 24, 74, 0.7);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.submit:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 12px 30px rgba(201, 24, 74, 0.6);
}

.fireworks-wrapper {
  margin-top: 0.4rem;
}

.letter-card {
  margin-top: 1.4rem;
}

.letter-card h3 {
  margin: 0 0 0.6rem;
  font-size: 1.1rem;
  color: #b2185c;
}

.letter-card p {
  font-size: 0.9rem;
  color: #4a1430;
  line-height: 1.55;
  margin: 0 0 0.6rem;
}

.closing {
  font-weight: 600;
}

.signature {
  margin: 0.1rem 0;
  font-size: 0.9rem;
  color: #7c3356;
}

.signature.strong {
  font-weight: 600;
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>


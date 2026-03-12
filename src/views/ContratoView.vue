<template>

    <div class="contract">

        <h1>📜 Renovação de Relacionamento</h1>

        <p>
            Eu, <strong>Pierre Mendes Salatiel</strong>,
            declaro que desejo renovar oficialmente
            nosso relacionamento por mais um ciclo
            de amor e aventuras.
        </p>

        <div class="signatures">

            <div class="sig">
                <span class="signature">Pierre Mendes Salatiel</span>
                <small>✔ Assinado</small>
            </div>

            <div class="sig">

                <template v-if="signed">

                    <span class="signature">{{ partnerName }}</span>
                    <small>✔ Assinado</small>
                    
                    <button class="certificate-btn" @click="goToCertificate">
                        Ver Certificado 🏆
                    </button>

                </template>

                <template v-else>

                    <input v-model="name" placeholder="Digite seu nome" />

                    <button @click="sign">

                        Assinar contrato 💜

                    </button>

                </template>

            </div>

        </div>

        <HeartExplosion v-if="showHearts" />

    </div>

</template>

<script setup lang="ts">

import { ref } from "vue"
import { useRouter } from "vue-router"
import HeartExplosion from "/src/components/HeartExplosion.vue"
import { useRelationshipContract } from "/src/composables/useRelationshipContract"

const router = useRouter()
const { partnerName, signed, signContract } = useRelationshipContract()

const name = ref("")
const showHearts = ref(false)

function goToCertificate() {
    router.push({ name: 'certificado' })
}

function sign() {

    if (!name.value) return

    signContract(name.value)

    showHearts.value = true

    setTimeout(() => {

        showHearts.value = false

    }, 1200)

}

</script>

<style scoped>
.contract {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, .1);
}

.signatures {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.sig {
    background: #ffe5ec;
    padding: 1rem;
    border-radius: 12px;
}

button {
    background: #ff4d6d;
    border: none;
    color: white;
    padding: .7rem 1.2rem;
    border-radius: 999px;
    cursor: pointer;
    margin-top: .5rem;
}

input {
    padding: .5rem;
    border-radius: 8px;
    border: 1px solid #ddd;
}

.signature {
    font-family: 'Dancing Script', cursive;
    font-size: 1.8rem;
    color: #4a1430;
    display: block;
    margin-bottom: 0.2rem;
}

.certificate-btn {
    background: linear-gradient(135deg, #a2d2ff, #bde0fe);
    color: #023e8a;
    font-weight: 600;
    margin-top: 1rem;
    width: 100%;
    box-shadow: 0 10px 20px rgba(162, 210, 255, 0.4);
}
</style>
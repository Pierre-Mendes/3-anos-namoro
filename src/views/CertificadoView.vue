<template>

    <div v-if="!signed">

        <h2>🔒 Certificado bloqueado</h2>

        <p>Assine primeiro o contrato de renovação para liberar!</p>

        <button @click="router.push({ name: 'contrato' })">Ir para Contratos 📜</button>

    </div>

    <RelationshipCertificate v-else :partner="partnerName" />

</template>

<script setup lang="ts">

import { useRouter } from "vue-router"
import RelationshipCertificate from "/src/components/RelationshipCertificate.vue"
import { useRelationshipContract } from "/src/composables/useRelationshipContract"

const router = useRouter()
const { partnerName, signed } = useRelationshipContract()

</script>

<style scoped>
button {
    background: #ff4d6d;
    border: none;
    color: white;
    padding: .7rem 1.2rem;
    border-radius: 999px;
    cursor: pointer;
    margin-top: 1rem;
}
</style>
<template>

    <div class="certificate">

        <h1>🏆 Certificado Oficial</h1>

        <p>Este documento confirma que</p>

        <h2>Pierre Mendes Salatiel</h2>

        <p>e</p>

        <h2>{{ partner }}</h2>

        <p>renovaram seu relacionamento com amor.</p>

        <button @click="download">

            Baixar certificado 📄

        </button>

    </div>

</template>

<script setup lang="ts">

import { generateCertificatePDF } from "/src/utils/generateCertificatePDF"

const props = defineProps<{ partner: string }>()

function download() {

    generateCertificatePDF(props.partner)

}

</script>

<style scoped>
.certificate {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    border: 4px solid #ff8fab;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, .1);
}

button {
    margin-top: 1rem;
    background: #ff4d6d;
    border: none;
    color: white;
    padding: .7rem 1.2rem;
    border-radius: 999px;
    cursor: pointer;
}
</style>
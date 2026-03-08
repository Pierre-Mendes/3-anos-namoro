<template>

    <div v-if="!isFinalDay">

        <h2>🔒 Certificado bloqueado</h2>

        <p>Volte no último dia para desbloquear.</p>

    </div>

    <RelationshipCertificate v-else :partner="partnerName" />

</template>

<script setup lang="ts">

import RelationshipCertificate from "/src/components/RelationshipCertificate.vue"
import { useRelationshipContract } from "/src/composables/useRelationshipContract"

const { partnerName } = useRelationshipContract()

const finalDate = new Date("2026-06-12")
const today = new Date()

const isFinalDay = today >= finalDate

</script>
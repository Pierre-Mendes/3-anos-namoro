<template>
    <div class="timeline">
        <div v-for="challenge in items" :key="challenge.dateKey" class="timeline-item">
            <button class="circle" :class="{
                done: challenge.done,
                unlocked: challenge.unlocked && !challenge.done,
                locked: !challenge.unlocked
            }" @click="select(challenge.index)">
                <span v-if="challenge.done">💜</span>
                <span v-else>{{ challenge.index + 1 }}</span>
            </button>

            <div class="line" v-if="challenge.index < items.length - 1"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface TimelineItem {
    index: number
    dateKey: string
    unlocked: boolean
    done: boolean
}

const props = defineProps<{
    items: TimelineItem[]
}>()

const emit = defineEmits<{
    (e: "select", index: number): void
}>()

const select = (index: number) => {
    const item = props.items[index]
    if (!item.unlocked) return

    emit("select", index)
}
</script>

<style scoped>
.timeline {
    display: flex;
    align-items: center;
    overflow-x: auto;
    padding: 8px 0;
}

.timeline-item {
    display: flex;
    align-items: center;
}

.circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    font-weight: bold;
    cursor: pointer;
    background: #ffe5ec;
    color: #b2185c;
    display: flex;
    align-items: center;
    justify-content: center;
}

.circle.unlocked {
    background: #ff8fab;
    color: white;
}

.circle.done {
    background: #c9184a;
    color: white;
}

.circle.locked {
    opacity: 0.35;
    cursor: not-allowed;
}

.line {
    width: 30px;
    height: 2px;
    background: #ffc2d1;
}
</style>
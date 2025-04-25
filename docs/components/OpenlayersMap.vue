<script setup>
import { onMounted } from 'vue'

const props = defineProps({
    mapId: {
        type: String,
        required: true
    },
    initOpenLayersMap: {
        type: Function,
        required: true
    }
})

onMounted(() => {
    props.initOpenLayersMap(props.mapId);
})
</script>

<template>
    <div :id="mapId" class="map"></div>
</template>

<style scoped>
.map {
    width: 100%;
    height: 500px;
    border: 1px solid gray;
    border-radius: 8px;
    overflow: hidden;
}
</style>
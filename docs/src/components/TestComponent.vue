<script setup>
const props = defineProps({
    type: String
})
</script>

<template>
    <div class="container"
         :class="{
            'info': type === 'info',
            'warning': type === 'warning'
         }">
        <p class="container-title">
            {{type}}
        </p>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.container {
    margin: 16px 0;
    font-size: var(--vp-custom-block-font-size);
    border-left: 5px solid;
    border-radius: 5px;
    overflow: hidden;
}

.info {
    border-left-color: #00b8d4;
    background-color: var(--vp-custom-block-info-bg);

    .container-title {
        background-color: #00b8d41a;
    }
}

.warning {
    border-left-color: #ff9100;
    background-color: var(--vp-custom-block-warning-bg);

    .container-title {
        background-color: #ff91001a;
    }
}

.container-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 10px 16px;
    margin: 0;
}

.content {
    padding: 5px 16px;
}
</style>
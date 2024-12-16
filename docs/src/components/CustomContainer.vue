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
    background-color: whitesmoke;
    overflow: hidden;
}


.dark .container {
    background-color: var(--vp-custom-block-info-bg);
}

.info {
    border-left-color: #00b8d4;

    .container-title {
        background-color: rgba(0, 184, 212, 0.2);
    }
}

.warning {
    border-left-color: #ff9100;

    .container-title {
        background-color: rgba(255, 145, 0, 0.2);
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
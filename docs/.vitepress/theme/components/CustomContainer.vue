<script setup>
const props = defineProps({
    type: String
})
</script>

<template>
    <div class="container"
         :class="{
            'info': type === 'info',
            'warning': type === 'warning',
            'danger': type === 'danger',
            'todo': type === 'todo'
         }">
        <div class="container-title">
            <img :src="{
                'info': '/icons/icon-info.svg',
                'warning': '/icons/icon-warning.svg',
                'danger': '/icons/icon-danger.svg',
                'todo': '/icons/icon-todo.svg'
            }[type]" alt="{{type}}" />
            <p>{{type}}</p>
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
:root {
    --custom-block-info-color: #00b8d4;
    --custom-block-warning-color: #ff9100;
    --custom-block-danger-color: #ff0000;
}

.container {
    margin: 16px 0;
    font-size: var(--vp-custom-block-font-size);
    border-left: 5px solid;
    border-radius: 5px;
    box-shadow: 5px 7px 15px rgba(0,0,0,0.1);
    overflow: hidden;
}

.dark .container {
    background-color: var(--vp-custom-block-info-bg);
}

.info {
    border-left-color: #00b8d4;

    .container-title {
        color: #00b8d4;
    }
}

.warning {
    border-left-color: #ff9100;

    .container-title {
        color: #ff9100;
    }
}

.danger {
    border-left-color: #ff0000;

    .container-title {
        color: #ff0000;
    }
}

.todo {
    border-left-color: #9b71ff;

    .container-title {
        color: #9b71ff;
    }
}

.container-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 10px 16px 0;
    margin: 0;
    height: 50px;
}

.container-title img {
    width: 25px;
    height: 25px;
}

.content {
    padding: 5px 16px;
}
</style>
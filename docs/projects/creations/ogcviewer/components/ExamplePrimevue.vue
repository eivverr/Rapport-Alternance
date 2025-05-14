<script setup>

</script>

<template>
    <div class="container">
        <Card style="width: 25rem; overflow: hidden">
            <template #header>
                <img alt="user header" src="/img/card-vue.jpg?url" />
            </template>
            <template #title>Advanced Card</template>
            <template #subtitle>Card subtitle</template>
            <template #content>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button label="Cancel" severity="secondary" outlined />
                    <Button label="Save" />
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

p {
    margin: 0;
}

.p-card-footer div {
    display: flex;
    gap: 1rem;
    margin-top: 0.25rem;
}

button {
    width: 100%;
}
</style>
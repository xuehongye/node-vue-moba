<template>
    <div class="notFound" @click="$router.push('/')" title="点击回到首页"></div>
</template>

<style scoped>
.notFound{
    width: 100vw;
    height: 100vh;
    background: url('../assets/notFound.jpg') center center no-repeat;
    background-size: cover;
    cursor: pointer;
}
</style>

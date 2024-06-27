<template>
    <div>
        <img alt="Vue logo" src="@/assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <h1>Here are many child components!</h1>
        <el-button>Default</el-button>
    </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
    name: 'HomePage',
    components: {
        HelloWorld
    }
}
</script>

<style lang="scss" scoped></style>
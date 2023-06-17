<template>
<v-app-bar color="primary" density="compact">
    <v-app-bar-title>파일 관리</v-app-bar-title>

    <SignUp />
    <SignIn />
</v-app-bar>
</template>

<script>
import SignUp from './SignUp.vue'
import SignIn from './SignIn.vue'

export default {
    name: 'TopBar',
    components: {
        SignUp,
        SignIn,
    },

    data: () => ({}),
}
</script>

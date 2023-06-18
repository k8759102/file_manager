<template>
<v-main>
    <TopBar />

    <v-main>
        <v-container fluid>
        </v-container>
    </v-main>
</v-main>
</template>

<script>
import TopBar from './TopBar.vue'

export default {
    name: 'FileManagerMain',
    components: {
        TopBar,
    },

    data: () => ({}),
}
</script>

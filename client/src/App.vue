<template>
<v-app>
    <FileManagerMain />
</v-app>
</template>

<script>
import FileManagerMain from './containers/FileManagerMain.vue'

export default {
    name: 'App',

    components: {
        FileManagerMain,
    },

    data: () => ({
        //
    }),
}
</script>

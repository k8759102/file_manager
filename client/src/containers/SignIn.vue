<template>
<v-dialog v-model="dialog" persistent width="512">
    <template v-slot:activator="{ props }">
        <v-btn v-bind="props">Sign In</v-btn>
    </template>

    <v-card>
        <v-card-title>
            <span class="text-h5">Sign In</span>
        </v-card-title>
        <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="signin">
                <TextField ref="userId" v-model="userId" label="ID (E-mail)" :rules="[rules.required, rules.email]" />
                <TextField ref="password" v-model="password" type="password" label="비밀번호" :rules="[rules.required, rules.password]" />
            </v-form>
            <v-alert v-show="isAlert" type="error" title="에러 발생">{{ alertText }}</v-alert>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="blue-darken-1" variant="text" @click="closeForm">
                닫기
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="submit">
                로그인
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import axios from 'axios'
import TextField from '../components/TextField.vue'

export default {
    components: {
        TextField,
    },
    data: () => ({
        dialog: true,
        userId: 'test@test.com',
        password: '!Root1234',

        isAlert: false,
        alertText: '',

        rules: {
            required: value => !!value || '필수 입력 값입니다.',
            email: value => {
                const pattern =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || '이메일 형식에 맞지 않습니다.'
            },
            password: value => {
                const pattern =
                    /^(?=.*\d)(?=.*[A-Z]).{8,}$/
                return pattern.test(value) || '8자 이상의 1개의 대문자, 숫자를 포함한 형식이여야 합니다.'
            },
        },
    }),
    computed: {
        form() {
            return {
                userId: this.userId,
                password: this.password,
            }
        },
    },
    methods: {
        closeForm() {
            this.dialog = false;
            this.isAlert = false;
            this.$refs.form.reset();
        },
        async submit() {
            const validationInfo = await this.$refs.form.validate();
            const {
                valid
            } = validationInfo;
            const {
                userId,
                password
            } = this;

            if (valid) {
                const result = await axios.post('http://localhost:3000/controllers/users/signin', {
                    userId,
                    password
                });
                console.log('result: ', result);

                // if (data.type === "success") {
                //     this.dialog = false;
                //     this.isAlert = false;
                //     this.$refs.form.reset();
                // }
                // if (data.type === "error") {
                //     this.isAlert = true;
                //     this.alertText = data.message;
                // }
            }
        }
    },
}
</script>

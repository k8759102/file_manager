<template>
<v-dialog v-model="dialog" persistent width="512">
    <template v-slot:activator="{ props }">
        <v-btn v-bind="props"> Sign Up </v-btn>
    </template>

    <v-card>
        <v-card-title>
            <span class="text-h5">Sign Up</span>
        </v-card-title>
        <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="signup">
                <TextField ref="name" v-model="name" label="이름" :rules="[rules.required, rules.nameCounter]" />
                <TextField ref="userId" v-model="userId" label="ID (E-mail)" :rules="[rules.required, rules.email]" />
                <TextField ref="password" v-model="password" type="password" label="비밀번호" :rules="[rules.required, rules.password]" />
                <TextField ref="cPassword" v-model="cPassword" type="password" label="비밀번호 확인" :rules="[rules.required, checkPassword]" />
            </v-form>
            <v-alert v-show="isAlert" type="error" title="에러 발생">{{ alertText }}</v-alert>
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn color="blue-darken-1" variant="text" @click="closeForm">
                닫기
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="submit">
                등록
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
        dialog: false,
        name: '',
        userId: '',
        password: '',
        cPassword: '',

        isAlert: false,
        alertText: '',

        rules: {
            required: value => !!value || '필수 입력 값입니다.',
            nameCounter: value => value.length <= 20 || '20자 이하로 입력해주세요.',
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
                name: this.name,
                userId: this.userId,
                password: this.password,
                cPassword: this.cPassword,
            }
        },
    },
    methods: {
        checkPassword(val) {
            return this.password !== val && '패스워드가 일치하지 않습니다';
        },
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
                name,
                userId,
                password
            } = this;

            if (valid) {
                const {
                    data
                } = await axios.post('http://localhost:3000/controllers/users/signup', {
                    name,
                    userId,
                    password
                });

                if (data.type === "success") {
                    this.dialog = false;
                    this.isAlert = false;
                    this.$refs.form.reset();
                }
                if (data.type === "error") {
                    this.isAlert = true;
                    this.alertText = data.message;
                }
            }
        }
    },
}
</script>

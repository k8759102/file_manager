<template>
<v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
        <v-card ref="form">
            <v-card-text>
                <v-text-field ref="name" v-model="name" :rules="[() => !!name || 'This field is required']" :error-messages="errorMessages" label="Full Name" placeholder="John Doe" required></v-text-field>
                <v-text-field ref="address" v-model="address" :rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
              addressCheck
            ]" label="Address Line" placeholder="Snowy Rock Pl" counter="25" required></v-text-field>
                <v-text-field ref="city" v-model="city" :rules="[() => !!city || 'This field is required', addressCheck]" label="City" placeholder="El Paso" required></v-text-field>
                <v-text-field ref="state" v-model="state" :rules="[() => !!state || 'This field is required']" label="State/Province/Region" required placeholder="TX"></v-text-field>
                <v-text-field ref="zip" v-model="zip" :rules="[() => !!zip || 'This field is required']" label="ZIP / Postal Code" required placeholder="79938"></v-text-field>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
                <v-btn variant="text"> Cancel </v-btn>
                <v-spacer></v-spacer>
                <v-slide-x-reverse-transition>
                    <v-tooltip v-if="formHasErrors" location="left">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon class="my-0" v-bind="attrs" @click="resetForm" v-on="on">
                                <v-icon>mdi-refresh</v-icon>
                            </v-btn>
                        </template>
                        <span>Refresh form</span>
                    </v-tooltip>
                </v-slide-x-reverse-transition>
                <v-btn color="primary" variant="text" @click="submit"> Submit </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
export default {
    data: () => ({
        errorMessages: '',
        name: null,
        address: null,
        city: null,
        state: null,
        zip: null,
        country: null,
        formHasErrors: false,
    }),

    computed: {
        form() {
            return {
                name: this.name,
                address: this.address,
                city: this.city,
                state: this.state,
                zip: this.zip,
                country: this.country,
            }
        },
    },

    watch: {
        name() {
            this.errorMessages = ''
        },
    },

    methods: {
        addressCheck() {
            this.errorMessages =
                this.address && !this.name ? `Hey! I'm required` : ''

            return true
        },
        resetForm() {
            this.errorMessages = []
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
                this.$refs[f].reset()
            })
        },
        submit() {
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
                if (!this.form[f]) this.formHasErrors = true

                this.$refs[f].validate(true)
            })
        },
    },
}
</script>

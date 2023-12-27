<template>
    <v-card rounded="xxl" class="mx-auto my-auto">
        <v-card-text>
            <v-form
                ref="insertForm"
                lazy-validation
                @submit.prevent
            >
                <v-text-field label="API-URL" v-model="url" :rules="inputRule"></v-text-field>
                <v-text-field label="Your token" v-model="$store.getters.token" disabled :rules="inputRule"></v-text-field>
                <v-text-field label="API-body" v-model="body" :rules="inputRule"></v-text-field>
                <v-btn
                    @click="requestInsert"
                    type="submit"
                    outlined
                    style="margin: auto 20%; border-color: #1976D2; color: #1976D2;"
                >
                    Insert new account
                </v-btn>
                <v-snackbar
                    v-model="snackbar"
                    :timeout="timeout"
                    color="error"
                >
                    You typed incorrect data
                </v-snackbar>
                <v-snackbar
                    v-model="snackbar400"
                    :timeout="timeout"
                    color="#F05F06"
                >
                    You typed an already existing account
                </v-snackbar>
                <v-snackbar
                    v-model="snackbar200"
                    :timeout="timeout"
                    color="#50C878"
                >
                    New account was insert successful
                </v-snackbar>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: 'insertNewAccount',

        data: () => ({
            url: '',
            body: '',
            inputRule: [
                input => {
                    if (input)
                        return true
                    else
                        return 'Type this field'
                }
            ],
            snackbar: false,
            snackbar400: false,
            snackbar200: false,
            timeout: 2000
        }),

        methods: {
            requestInsert() {
                if (this.url && this.$store.getters.token && this.body) {
                    const query = {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `bearer ${this.$store.getters.token}`
                        },
                        body: JSON.stringify(JSON.parse(this.body))
                    }

                    fetch(this.url, query)
                        .then(response => {
                            if (response.status != 200 && response.status != 400) {
                                console.log(response)
                                this.snackbar = true
                            }
                            else if (response.status == 400) {
                                this.snackbar400 = true
                            }
                            else {
                                this.snackbar200 = true
                            }
                        })
                        .catch(error => console.error(error))
                }
            }
        }
    }
</script>

<style>

.v-text-field {
    width: 500px;
}

</style>

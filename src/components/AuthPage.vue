<template>
  <v-card rounded="xxl" class="mx-auto my-auto">
    <v-card-text>
      <v-form
        ref="authForm"
        lazy-validation
        @submit.prevent
      >
        <v-text-field
          v-model="login"
          label="Type your login"
          :rules="loginRule"
        />
        <v-text-field
          v-model="password"
          label="Type your password"
          type="password"
          :rules="passRule"
        />
        <v-btn
          class="mt-2"
          type="submit"
          @click="requestAuth"
          outlined
          style="margin: auto 20%; border-color: #1976D2; color: #1976D2"
          >
          Continue
        </v-btn>
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          color="error"
        >
          You typed incorrect data
        </v-snackbar>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import router from '@/router'

  export default {
    name: 'AuthPage',

    data: () => ({
      login: '',
      password: '',
      token: '',
      loginRule: [
        input => {
          if (input)
            return true
          else
            return 'Type your login in field higher'
        },
        input => {
          if (input.length <= 50)
            return true
          else
            return 'Your login is very long'
        }
      ],
      passRule: [
        input => {
          if (input)
            return true
          else
            return 'Type your password in field higher'
        }
      ],
      snackbar: false,
      timeout: 2000
    }),

    methods: {
      requestAuth() {
        if (this.login && this.password) {
          this.token = ''
          this.error = ''
          const url = 'http://127.0.0.1:11030/api/v0/auth/login'
          const query = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "login": this.login,
              "password": this.password
            })
          }

          fetch(url, query)
            .then(response => {
              if (response.status != 200) {
                this.snackbar = true
              }
              else {
                response.json().then(result => {
                  this.token = result.accessToken
                  this.$store.commit('setToken', this.token)
                  router.push("/pageforapi")
                })
              }
            })
            .catch(error => console.error(error))
        }
      }
    }
  }
</script>

<style>

.v-form {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
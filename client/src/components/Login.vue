<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-text-field
          type="email"
          name="email"
          label="Email"
          v-model="email"
        ></v-text-field>
        <br>
        <v-text-field
          type="password"
          name="password"
          v-model="password"
          label="Password"
        ></v-text-field>
        <br>
        <div v-html="error" class="danger-alert" />
        <br>
        <v-btn
          class="cyan"
          dark
          @click="login">
          Log In
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        // this is a reference to the component.
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        // error is what is returned by axios
        // the same one you're exporting as default
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

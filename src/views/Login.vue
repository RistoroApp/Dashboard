<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer />
              <!--              <v-tooltip bottom>-->
              <!--                <template v-slot:activator="{ on }">-->
              <!--                  <v-btn :href="source" icon large target="_blank" v-on="on">-->
              <!--                    <v-icon>mdi-code-tags</v-icon>-->
              <!--                  </v-btn>-->
              <!--                </template>-->
              <!--                <span>Source</span>-->
              <!--              </v-tooltip>-->
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    large
                    href="https://codepen.io/johnjleider/pen/pMvGQO"
                    target="_blank"
                    v-on="on"
                  >
                    <v-icon>mdi-codepen</v-icon>
                  </v-btn>
                </template>
                <span>Codepen</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="person"
                  type="text"
                  v-model="email"
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  v-model="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click.prevent="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import apiLogin from "../api/login/login";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const { email, password } = this;
      try {
        await apiLogin.login({ email: email, password: password });
        await this.$router.push("/");
      } catch (e) {
        console.log("Error " + e.message);
      }
    }
  }
};
</script>

<style scoped></style>

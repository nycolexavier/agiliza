<script lang="ts">
import { ROUTES } from '@/router/utils/routes';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },
  },
});
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card variant="outlined">
          <v-card-title class="text-center">
            <h2>Login</h2>
          </v-card-title>

          <v-card-text>
            <v-form>
              <v-text-field
                label="E-mail"
                type="email"
                variant="outlined"
                placeholder="Digite seu e-mail"
              />

              <v-text-field
                label="Senha"
                type="password"
                variant="outlined"
                placeholder="Digite sua senha"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="irParaODashboard" block color="primary">
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

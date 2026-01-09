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
  <BaseFormContainer>
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
                :rules="[
                  (v) => !!v || 'E-mail obrigatório',
                  (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
                ]"
              />

              <v-text-field
                label="Senha"
                type="password"
                variant="outlined"
                placeholder="Digite sua senha"
                :rules="[(v) => v.length >= 6 || 'Mínimo 6 caracteres']"
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
 </BaseFormContainer>
</template>

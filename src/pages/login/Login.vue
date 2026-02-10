<script lang="ts">
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',

  data() {
    return {
      email: '',
      senha: '',
      loading: false,
    };
  },

  methods: {
    async login() {
      try {
        this.loading = true;

        const response = await api.post('/auth/login', {
          email: this.email,
          senha: this.senha,
        });

        const { access_token } = response.data;

        localStorage.setItem('token', access_token);

        this.$router.push(ROUTES.dashboard);
      } catch (error) {
        alert('E-mail ou senha inválidos');
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <v-container fluid class="fill-height d-flex align-center justify-center">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card variant="outlined">
            <v-card-title class="text-center">
              <h2>Login</h2>
            </v-card-title>

            <v-card-text>
              <v-form >
                <v-text-field
                  v-model="email"
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
                  v-model="senha"
                  label="Senha"
                  type="password"
                  variant="outlined"
                  placeholder="Digite sua senha"
                  :rules="[(v) => v.length >= 6 || 'Mínimo 6 caracteres']"
                />
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn
                block
                color="primary"
                :loading="loading"
                :disabled="loading"
                @click="login"
              >
                <template v-if="!loading"> Entrar </template>
                <template v-else>
                  <v-progress-circular
                    indeterminate
                    size="20"
                    width="2"
                    color="white"
                  ></v-progress-circular>
                </template>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </BaseFormContainer>
</template>

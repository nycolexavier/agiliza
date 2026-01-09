<script lang="ts">
import BaseFormContainer from '@/components/base/BaseFormContainer.vue';
import BaseSnackbar from '@/components/base/BaseSnackbar.vue';
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'FornecedorCriarPage',

  components: {
    Footer,
    BaseSnackbar,
  },

  data() {
    return {
      form: {
        nome: '',
        cargo: '',
        email: '',
        status: 'ativo',
        telefone: '',
      },

      snackbar: false,
      snackbarTexto: '',
      snackbarTipo: 'success',
    };
  },

  methods: {
    irParaFornecedor() {
      this.$router.push(ROUTES.fornecedores.list);
    },

    async enviarForm() {
      try {
        await api.post(`/fornecedores`, {
          nome: this.form.nome,
          cargo: this.form.cargo,
          email: this.form.email,
          status: this.form.status,
          telefone: this.form.telefone,
        });

        (this.snackbarTexto = 'Depósito criado com sucesso'),
          (this.snackbarTipo = 'success');
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.fornecedores.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar fornecedor', error);
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <v-row>
      <v-col>
        <h2>Cadastrar fornecedor</h2>
      </v-col>

      <v-col cols="12" md="4" class="text-end">
        <v-btn variant="outlined" @click="irParaFornecedor"> Voltar </v-btn>
      </v-col>
    </v-row>

    <v-card variant="outlined">
      <v-card-text>
        <v-form @submit.prevent="enviarForm">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.nome"
                label="Nome"
                variant="outlined"
                required
                :rules="[(v) => !!v || 'Quantidade de medida é obrigatório']"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.cargo"
                label="Cargo"
                variant="outlined"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.email"
                label="Telefone"
                variant="outlined"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.telefone"
                label="Telefone"
                variant="outlined"
                required
              />
            </v-col>
          </v-row>

          <v-row class="mt4">
            <v-col cols="12" class="d-flex justify-end gap-4">
              <v-btn variant="outlined" @click="irParaFornecedor">
                Cancelar
              </v-btn>

              <v-btn
                color="primary"
                type="submit"
                :disabled="!form.nome || !form.cargo || !form.email"
              >
                Criar fornecedor
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <BaseSnackbar
      v-model="snackbar"
      :texto="snackbarTexto"
      :tipo="snackbarTipo"
    />
  </BaseFormContainer>
</template>

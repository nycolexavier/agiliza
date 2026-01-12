<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import { ROUTES } from '@/router/utils/routes';
import {
  FornecedoresIDPatch,
  FornecedoresListID,
} from '@/services/fornecedores';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FornecedorEditarPage',

  components: {
    Footer,
  },

  data(vm) {
    return {
      fornecedor: null as Fornecedor | null,
      form: {
        nome: '',
        cargo: '',
        email: '',
        status: 'ativo',
        telefone: '',
      },
    };
  },

  mounted() {
    this.buscarUsuario();
  },

  methods: {
    irParaOFornecedor() {
      if (!this.fornecedor) return;
      this.$router.push(ROUTES.fornecedores.ver(this.fornecedor?.id));
    },

    async buscarUsuario() {
      try {
        const id = this.$route.params.id;
        if (typeof id === 'string') {
          const response = await FornecedoresListID(id);
          this.fornecedor = response.data;

          this.form.nome = response.data.nome;
          this.form.cargo = response.data.cargo;
          this.form.email = response.data.email;
          this.form.status = response.data.status;
          this.form.telefone = response.data.telefone;
        }
      } catch (error) {
        console.error('Erro ao buscar fornecedores', error);
      }
    },

    async enviarForm() {
      try {
        const id = this.$route.params.id;

        if (typeof id === 'string') {
          const response = await FornecedoresIDPatch(id, this.form);

          return response;
        }
      } catch (error) {}
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="8">
        <h2>Editar fornecedor</h2>
        <p v-if="fornecedor" class="text-medium-emphasis">
          {{ fornecedor?.nome }}
        </p>
      </v-col>
    </v-row>

    <v-col cols="12" md="4" class="text-end">
      <v-btn variant="outlined" @click="irParaOFornecedor"> Voltar </v-btn>
    </v-col>

    <v-card variant="outlined">
      <v-card-text>
        <v-form @submit.prevent="enviarForm">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.cargo"
                label="Cargo"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.email"
                label="E-mail"
                type="email"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-fiel
                v-model="form.telefone"
                label="Telefone"
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12" class="d-flex justify-end gap-4">
              <v-btn> Cancelar </v-btn>

              <v-btn
                color="primary"
                type="submit"
                :disabled="!form?.nome || !form?.email || !form?.cargo"
              >
                Salvar alterações
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </BaseFormContainer>
</template>

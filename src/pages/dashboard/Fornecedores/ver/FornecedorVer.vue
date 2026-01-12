<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { FornecedoresListID } from '@/services/fornecedores';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FornecedorVerPage',

  components: {
    Footer,
  },

  data() {
    return {
      fornecedorEdicao: null as Fornecedor | null,
    };
  },

  mounted() {
    this.buscarFornecedores();
  },

  methods: {
    irParaOFornecedor() {
      this.$router.push(ROUTES.fornecedores.list);
    },

    irParaFornecedorEditar() {
      if (!this.fornecedorEdicao) return;
      this.$router.push(ROUTES.fornecedores.editar(this.fornecedorEdicao.id));
    },

    async buscarFornecedores() {
      const id = this.$route.params.id;
      if (typeof id === 'string') {
        const response = await FornecedoresListID(id);
        this.fornecedorEdicao = response.data;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <v-row>
      <v-col>
        <h2>Fornecedor</h2>
        <p v-if="fornecedorEdicao" class="text-medium-emphasis">
          {{ fornecedorEdicao?.nome }}
        </p>
      </v-col>

      <v-col cols="12" md="4" class="text-end">
        <v-btn variant="outlined" @click="irParaOFornecedor"> Voltar </v-btn>
      </v-col>
    </v-row>

    <!-- Card de visualização -->

    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <strong>Nome</strong>
            <div>{{ fornecedorEdicao?.nome }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Cargo</strong>
            <div>{{ fornecedorEdicao?.cargo }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>E-mail</strong>
            <div>{{ fornecedorEdicao?.email }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Telefone</strong>
            <div>{{ fornecedorEdicao?.telefone }}</div>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" class="d-flex justify-end gap-4">
            <v-btn variant="outlined" @click="irParaOFornecedor">
              Voltar
            </v-btn>

            <v-btn color="primary" @click="irParaFornecedorEditar">
              Editar fornecedor
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </BaseFormContainer>
</template>

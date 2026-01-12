<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Movimentacao } from '@/interfaces/Movimentacao';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MovimentacoesEditarPage',

  components: {
    Footer,
  },

  data() {
    return {
      movimentacao: null as Movimentacao | null,
      form: {
        tipomovimentacao: '',
        quantidade: '',
        datamovimentacao: '',
        status: 'ativo',
        idlote: '',
        idproduto: '',
        idfornecedor: '',
      },
    };
  },

  mounted() {
    this.buscarMovimentacao();
  },

  methods: {
    irParaAMovimentacao() {
      if (!this.movimentacao) return;
      this.$router.push(ROUTES.movimentacao.ver(this.movimentacao.id));
    },

    async buscarMovimentacao() {
      try {
        const id = this.$route.params.id;

        const response = await api.get(`/movimentacao/${id}`);
        this.movimentacao = response.data;

        this.form.tipomovimentacao = response.data.tipomovimentacao;
        this.form.quantidade = response.data.quantidade;
        this.form.datamovimentacao = response.data.datamovimentacao;
        this.form.status = response.data.status;
        this.form.idlote = response.data.idlote;
        this.form.idproduto = response.data.idproduto;
        this.form.idfornecedor = response.data.idfornecedor;
      } catch (error) {
        console.error('Erro ao buscar movimentação', error);
      }
    },

    async enviarForm() {
      try {
        const response = await api.patch(
          `/movimentacoes/${this.movimentacao?.id}`,
          {
            tipomovimentacao: this.form.tipomovimentacao,
            quantidade: this.form.quantidade,
            datamovimentacao: this.form.datamovimentacao,
            idlote: this.form.idlote,
            idproduto: this.form.idproduto || null,
            idfornecedor: this.form.idfornecedor || null,
          }
        );

        return response;
      } catch (error) {
        console.error('Erro ao editar movimentação', error);
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <!-- Cabeçalho -->
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2>Editar movimentação: {{ movimentacao?.id }}</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" class="mr-2" @click="irParaAMovimentacao">
          Voltar para movimentação
        </v-btn>
      </v-col>
    </v-row>

    <!-- Card do formulário -->
    <v-card variant="outlined">
      <v-card-text>
        <v-form @submit.prevent="enviarForm">
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="form.tipomovimentacao"
                label="Tipo de movimentação"
                :items="['entrada', 'saida']"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.quantidade"
                label="Quantidade"
                type="number"
                required
                :rules="[(v) => !!v || 'Quantidade é obrigatória']"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.datamovimentacao"
                label="Data da movimentação"
                type="date"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="form.idlote" label="ID do lote" required />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="form.idproduto" label="ID do produto" />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.idfornecedor"
                label="ID do fornecedor"
              />
            </v-col>
          </v-row>

          <!-- Ações -->
          <v-row class="mt-4">
            <v-col cols="12" class="text-end">
              <v-btn
                type="submit"
                color="primary"
                :disabled="
                  !form.tipomovimentacao ||
                  !form.quantidade ||
                  !form.datamovimentacao ||
                  !form.idlote
                "
              >
                Salvar alterações
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <Footer />
  </BaseFormContainer>
</template>

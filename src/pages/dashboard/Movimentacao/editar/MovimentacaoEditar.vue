<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { TipoMovimentacao, type Movimentacao } from '@/interfaces/Movimentacao';
import { ROUTES } from '@/router/utils/routes';
import {
  MovimentacaoIDPatch,
  MovimentacaoListID,
} from '@/services/movimentacao.services';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import FormCard from '@/components/form/FormCard.vue';

export default defineComponent({
  name: 'MovimentacoesEditarPage',

  components: {
    Footer,
    FormCard,
    PageHeader,
  },

  data() {
    return {
      isLoading: false,

      TipoMovimentacao,
      movimentacao: null as Movimentacao | null,
      form: {
        tipomovimentacao: undefined as TipoMovimentacao | undefined,
        quantidade: undefined as number | undefined,
        dataMovimentacao: '',
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

        if (typeof id === 'string') {
          const response = await MovimentacaoListID(id);
          this.movimentacao = response.data;

          this.form.tipomovimentacao = response.data.tipomovimentacao;
          this.form.quantidade = response.data.quantidade;
          this.form.dataMovimentacao = response.data.dataMovimentacao;
          this.form.status = response.data.status;
          this.form.idlote = response.data.idlote;
          this.form.idproduto = response.data.idproduto;
          this.form.idfornecedor = response.data.idfornecedor;
        }
      } catch (error) {
        console.error('Erro ao buscar movimentação', error);
      }
    },

    async enviarForm() {
      try {
        this.isLoading = true;
        const id = this.$route.params.id;
        if (typeof id === 'string') {
          const response = await MovimentacaoIDPatch(id, {
            tipo: this.form.tipo,
            quantidade: this.form.quantidade,
            dataMovimentacao: this.form.dataMovimentacao,
            idlote: this.form.idlote,
          });
          return response;
        }
      } catch (error) {
        console.error('Erro ao editar movimentação', error);
      }
      finally{
        this.isLoading = false;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      :title="`Editar movimentação #{{ movimentacao?.id }}`"
      showBack
      backLabel="Voltar para ver o movimentação"
      @back="irParaAMovimentacao"
    />

    <FormCard
     v-if="!isLoading"
      submitLabel="Salvar alterações"
      :disabled="
        !form.tipomovimentacao ||
        !form.quantidade ||
        !form.dataMovimentacao ||
        !form.idlote
      "
      @submit="enviarForm"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="form.tipomovimentacao"
            label="Tipo de movimentação"
            :items="[
              { title: 'Entrada', value: TipoMovimentacao.ENTRADA },
              { title: 'Saída', value: TipoMovimentacao.SAIDA },
            ]"
            required
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-mode.number="form.quantidade"
            label="Quantidade"
            type="number"
            required
            :rules="[(v) => !!v || 'Quantidade é obrigatória']"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.dataMovimentacao"
            label="Data da movimentação"
            type="date"
            required
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="form.idlote" label="ID do lote" required />
        </v-col>
      </v-row>
    </FormCard>

        <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate/>
      <p>Carregando movimentações...</p>
    </div>

    <Footer />
  </BaseFormContainer>
</template>

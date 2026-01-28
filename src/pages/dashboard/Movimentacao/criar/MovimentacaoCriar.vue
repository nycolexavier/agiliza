<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { MovimentacaoPost } from '@/services/movimentacao.services';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import CreateFormCard from '@/components/form/CreateFormCard.vue';
import type { Status } from '@/interfaces/Status';
import { TipoMovimentacao } from '@/interfaces/Movimentacao';
import { LoteList } from '@/services/lote';
import { dataNaoFutura } from '@/utils/validators/dateRules';
import {
  precoCustoMenorOuIgualVenda,
  precoVendaMaiorOuIgualCusto,
} from '@/utils/validators/priceRules';

export default defineComponent({
  name: 'MovimentacaoCriarPage',

  components: {
    Footer,
    PageHeader,
    CreateFormCard,
  },

  data() {
    return {
      TipoMovimentacao,

       isLoading: false,

      hoje: new Date().toISOString().substring(0, 10),

      lotes: [] as { id: string; codigoLote: string; quantidade: number }[],

      quantidadeDisponivel: 0,

      form: {
        loteId: '',
        tipo: '' as TipoMovimentacao,
        quantidade: 0,
        dataMovimentacao: '',
        status: 'ativo' as Status,
      },

      snackbar: false,
      snackbarTexto: '',
      snackbarCor: 'success',
    };
  },

  methods: {
    dataNaoFutura,
    precoCustoMenorOuIgualVenda,
    precoVendaMaiorOuIgualCusto,

    irParaMovimentacoes() {
      this.$router.push(ROUTES.movimentacao.list);
    },

    validarQuantidade(v: number) {
      if (!v) return 'Quantidade é obrigatória';

      if (v <= 0) return 'Quantidade deve ser maior que zero';

      if (this.form.tipo === 'saida' && v > this.quantidadeDisponivel) {
        return `Quantidade maior que o estoque disponível (${this.quantidadeDisponivel})`;
      }

      return true;
    },

    async enviarForm() {
      try {
        this.isLoading = true;
        await MovimentacaoPost({
          loteId: this.form.loteId,
          tipo: this.form.tipo,
          quantidade: Number(this.form.quantidade),
          dataMovimentacao: this.form.dataMovimentacao,
          criadoPorId: "675ee6b6-d15b-43c3-b728-d6a188eebe25"
        });

        this.snackbarTexto = 'Movimentação criada com sucesso';
        this.snackbarCor = 'success';
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.movimentacao.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar movimentação', error);

        this.snackbarTexto = 'Erro ao criar movimentação';
        this.snackbarCor = 'error';
        this.snackbar = true;
      } finally {
        this.isLoading = false;
      }
    },
  },

  async mounted() {
    try {
      const response = await LoteList();
      this.lotes = response.data;
      console.log(this.lotes);
    } catch (error) {
      console.error('Erro ao buscar a movimentação', error);
    }
  },

  watch: {
    'form.loteId'(novoId) {
      const loteSelecionado = this.lotes.find((l) => l.id === novoId);
      console.log('loteSelecionado', loteSelecionado);
      console.log('novoId', novoId);
      this.quantidadeDisponivel = loteSelecionado
        ? Number(loteSelecionado.quantidade)
        : 0;

      console.log('quantidadeDisponivel', this.quantidadeDisponivel);
      this.form.quantidade = 0;
    },
  },
});
</script>
<template>
  <BaseFormContainer>
    <PageHeader
      title="Criar movimentação"
      showBack
      backLabel="Voltar para movimentações"
      @back="irParaMovimentacoes"
    />

    <CreateFormCard   v-if="!isLoading"
      submitLabel="Criar movimentação"
      :disabled="
        !form.loteId || !form.tipo || !form.quantidade || !form.dataMovimentacao
      "
      @submit="enviarForm"
    >
      <v-col cols="12" md="6">
        <v-select
          v-model="form.loteId"
          label="Código Lote"
          :items="lotes"
          item-title="codigoLote"
          item-value="id"
          required
          :rules="[(v) => !!v || 'ID Lote é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="form.tipo"
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
          v-model="form.quantidade"
          label="Quantidade"
          type="number"
          required
          :rules="[(v) => validarQuantidade(Number(v))]"
          :max="form.tipo === 'saida' ? quantidadeDisponivel : undefined"
        />
        <v-alert v-if="form.loteId" type="info" variant="tonal" class="mb-4">
          Estoque disponível do lote:
          <strong>{{ quantidadeDisponivel }}</strong>
        </v-alert>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.dataMovimentacao"
          label="Data da movimentação"
          type="date"
          :max="hoje"
          required
          :rules="[(v) => !!v || 'Data é obrigatória', dataNaoFutura]"
        />
      </v-col>
    </CreateFormCard>

        <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate/>
      <p>Carregando movimentacoes...</p>
    </div>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarCor"
      timeout="3000"
      location="top right"
    >
      {{ snackbarTexto }}
    </v-snackbar>

    <Footer />
  </BaseFormContainer>
</template>

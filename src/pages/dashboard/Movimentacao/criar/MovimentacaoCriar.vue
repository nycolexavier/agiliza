<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { MovimentacaoPost } from '@/services/movimentacao.services';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import CreateFormCard from '@/components/form/CreateFormCard.vue';
import type { Status } from '@/interfaces/Status';
import type { TipoMovimentacao } from '@/interfaces/Movimentacao';
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
      hoje: new Date().toISOString().substring(0, 10),

      lotes: [] as { id: string; codigoLote: string; quantidade: number }[],

      quantidadeDisponivel: 0,

      form: {
        idlote: '',
        tipomovimentacao: '' as TipoMovimentacao,
        quantidade: '',
        datamovimentacao: '',
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

      if (
        this.form.tipomovimentacao === 'saida' &&
        v > this.quantidadeDisponivel
      ) {
        return `Quantidade maior que o estoque disponível (${this.quantidadeDisponivel})`;
      }

      return true;
    },

    async enviarForm() {
      try {
        await MovimentacaoPost({
          idlote: this.form.idlote,
          tipomovimentacao: this.form.tipomovimentacao,
          quantidade: Number(this.form.quantidade),
          datamovimentacao: this.form.datamovimentacao,
          status: this.form.status,
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
    'form.idlote'(novoId) {
      const loteSelecionado = this.lotes.find((l) => l.id === novoId);
      console.log('loteSelecionado', loteSelecionado);
      console.log('novoId', novoId);
      this.quantidadeDisponivel = loteSelecionado
        ? loteSelecionado.quantidade
        : 0;

      console.log('quantidadeDisponivel', this.quantidadeDisponivel);
      this.form.quantidade = '';
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

    <CreateFormCard
      submitLabel="Criar movimentação"
      :disabled="
        !form.idlote ||
        !form.tipomovimentacao ||
        !form.quantidade ||
        !form.datamovimentacao
      "
      @submit="enviarForm"
    >
      <v-col cols="12" md="6">
        <v-select
          v-model="form.idlote"
          label="ID do Lote"
          :items="lotes"
          item-title="codigoLote"
          item-value="id"
          type="number"
          required
          :rules="[(v) => !!v || 'ID Lote é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="form.tipomovimentacao"
          :items="['saída']"
          label="Tipo de movimentação"
          required
          :rules="[(v) => !!v || 'Tipo é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.quantidade"
          label="Quantidade"
          type="number"
          required
          :rules="[(v) => validarQuantidade(Number(v))]"
          :max="
            form.tipomovimentacao === 'saida' ? quantidadeDisponivel : undefined
          "
        />
        <v-alert v-if="form.idlote" type="info" variant="tonal" class="mb-4">
          Estoque disponível do lote:
          <strong>{{ quantidadeDisponivel }}</strong>
        </v-alert>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.datamovimentacao"
          label="Data da movimentação"
          type="date"
          :max="hoje"
          required
          :rules="[(v) => !!v || 'Data é obrigatória', dataNaoFutura]"
        />
      </v-col>
    </CreateFormCard>

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

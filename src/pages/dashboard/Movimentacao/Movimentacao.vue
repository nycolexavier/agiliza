<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Movimentacao } from '@/interfaces/Movimentacao';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';
import { MovimentacaoList } from '@/services/movimentacao.services';
import PageHeader from '@/components/layouts/PageHeader.vue';
import SearchInput from '@/components/form/SearchInput.vue';
import BaseTable from '@/components/base/BaseTable.vue';

export default defineComponent({
  name: 'MovimentacoesPage',

  components: {
    Footer,
    BaseTable,
    PageHeader,
    SearchInput,
  },

  data() {
    return {
      movimentacoes: [] as Movimentacao[],
      busca: '',
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Lote', key: 'idlote' },
        { title: 'Tipo', key: 'tipomovimentacao' },
        { title: 'Quantidade', key: 'quantidade' },
        { title: 'Data', key: 'datamovimentacao' },
        { title: 'Status', key: 'status' },
        { title: 'Ações', key: 'actions' },
      ],

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    movimentacoesPaginadas(): Movimentacao[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.movimentacoesFiltradas.slice(inicio, fim);
    },

    movimentacoesFiltradas(): Movimentacao[] {
      if (!this.busca) {
        return this.movimentacoes;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.movimentacoes.filter((mov: Movimentacao) =>
        removerAcentos(mov.tipomovimentacao).includes(buscaNormalizada)
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  mounted() {
    this.buscarMovimentacoes();
  },

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    irParaMovimentacaoVer(id: string) {
      this.$router.push(ROUTES.movimentacao.ver(id));
    },

    irParaCriarMovimentacao() {
      this.$router.push(ROUTES.movimentacao.new);
    },

    async buscarMovimentacoes() {
      const response = await MovimentacaoList();
      this.movimentacoes = response.data;
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title="Movimentações"
      actionLabel="Nova movimentação"
      secondaryLabel="Dashboard"
      @action="irParaCriarMovimentacao"
      @secondary="irParaODashboard"
    />

    <SearchInput v-model="busca" label="Buscar por tipo de movimentação" />

    <BaseTable
      :headers="headers"
      :items="movimentacoesPaginadas"
      actionLabel="Ver"
      @action="(item) => irParaMovimentacaoVer(item.id)"
    />

    <!-- Paginação -->
    <v-row class="mt-4" align="center" justify="center">
      <v-btn
        variant="outlined"
        @click="paginaAtual--"
        :disabled="paginaAtual === 1"
      >
        Anterior
      </v-btn>

      <span class="mx-4"> Página {{ paginaAtual }} </span>

      <v-btn
        variant="outlined"
        @click="paginaAtual++"
        :disabled="
          paginaAtual * itensPorPagina >= movimentacoesFiltradas.length
        "
      >
        Próximo
      </v-btn>
    </v-row>

    <Footer />
  </BaseFormContainer>
</template>

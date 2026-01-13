<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Deposito } from '@/interfaces/Deposito/Deposito';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';
import { DepositoList } from '@/services/deposito.services';
import PageHeader from '@/components/layouts/PageHeader.vue';
import SearchInput from '@/components/form/SearchInput.vue';
import BaseTable from '@/components/base/BaseTable.vue';
import BasePagination from '@/components/base/BasePagination.vue';

export default defineComponent({
  name: 'DepositoPage',

  components: {
    Footer,
    BaseTable,
    PageHeader,
    SearchInput,
    BasePagination,
  },

  data() {
    return {
      deposito: [] as Deposito[],
      busca: '',
      headers: [
        { title: 'Corredor', key: 'corredor' },
        { title: 'Prateleira', key: 'prateleira' },
        { title: 'Sessão', key: 'sessao' },
        { title: 'Qtd. Máxima', key: 'quantidadeMaxima' },
        { title: 'Ações', key: 'actions' },
      ],

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  mounted() {
    this.buscarDeposito();
  },

  computed: {
    depositoPaginados(): Deposito[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.depositoFiltrado.slice(inicio, fim);
    },

    depositoFiltrado(): Deposito[] {
      if (!this.busca) {
        return this.deposito;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.deposito.filter((deposito) =>
        removerAcentos(deposito.corredor).includes(buscaNormalizada)
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  methods: {
    irParaDepositoVer(id: string) {
      this.$router.push(ROUTES.deposito.ver(id));
    },

    irParaDepositoCriar() {
      this.$router.push(ROUTES.deposito.new);
    },

    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    async buscarDeposito() {
      const response = await DepositoList();

      this.deposito = response.data;
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title="Depósitos"
      actionLabel="Adicionar depósito"
      @action="irParaDepositoCriar"
    />

    <SearchInput v-model="busca" label="Buscar por corredor" />

    <BaseTable
      :headers="headers"
      :items="depositoPaginados"
      actionLabel="Ver mais"
      @action="(item) => irParaDepositoVer(item.id)"
    />

    <BasePagination
      v-model:paginaAtual="paginaAtual"
      :itensPorPagina="itensPorPagina"
      :totalItens="depositoFiltrado.length"
    />

    <Footer />
  </BaseFormContainer>
</template>

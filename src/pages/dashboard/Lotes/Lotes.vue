<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Lote } from '@/interfaces/Lotes/Lote';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';
import { LoteList } from '@/services/lote';
import PageHeader from '@/components/layouts/PageHeader.vue';
import SearchInput from '@/components/form/SearchInput.vue';
import BaseTable from '@/components/base/BaseTable.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import DateBadge from '@/components/base/DateBadge.vue';

export default defineComponent({
  name: 'ProdutosPage',

  components: {
    Footer,
    DateBadge,
    PageHeader,
    SearchInput,
    BaseTable,
    BasePagination,
  },

  data() {
    return {
      isLoading: false,

      lotes: [] as Lote[],
      busca: '',
      headers: [
        { title: 'Código do lote', key: 'codigoLote' },
        { title: 'Marca', key: 'marca.nome' },
        { title: 'Produto', key: 'produto.nome' },
        { title: 'Status', key: 'status' },
        { title: 'Data de validade', key: 'dataValidade' },
        { title: 'Ações', key: 'actions' },
      ],

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    lotesPaginados(): Lote[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.lotesFiltrado.slice(inicio, fim);
    },

    lotesFiltrado(): Lote[] {
      if (!this.busca) {
        return this.lotes;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.lotes.filter((lote) =>
        removerAcentos(lote.codigoLote).includes(buscaNormalizada),
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  mounted() {
    this.buscarLotes();
  },

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    irParaOLotesEditar(id: string) {
      this.$router.push(ROUTES.lotes.ver(id));
    },

    irParaOLotesAdd() {
      this.$router.push(ROUTES.lotes.new);
    },

    async buscarLotes() {
      try {
        this.isLoading = true;
        const response = await LoteList();

        this.lotes = response.data;
      } catch (error) {
        console.error('Erro ao buscar lote');
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title="Entrada de lote"
      actionLabel="Adicionar lote"
      @action="irParaOLotesAdd"
    />

    <SearchInput v-model="busca" label="Buscar por código do lote" />

    <BaseTable
      v-if="!isLoading"
      :headers="headers"
      :items="lotesPaginados"
      actionLabel="Ver +"
      @action="(item) => irParaOLotesEditar(item.id)"
    >
      <template #item.dataValidade="{ item }">
        <DateBadge :date="item.dataValidade" />
      </template>
    </BaseTable>

    <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate />
      <p>Carregando lotes...</p>
    </div>

    <BasePagination
      v-model:paginaAtual="paginaAtual"
      :itensPorPagina="itensPorPagina"
      :totalItens="lotesFiltrado.length"
    />

    <Footer />
  </BaseFormContainer>
</template>

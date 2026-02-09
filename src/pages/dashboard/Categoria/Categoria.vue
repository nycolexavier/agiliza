<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Categoria } from '@/interfaces/Categoria';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';
import { CategoriaList } from '@/services/categoria';
import PageHeader from '@/components/layouts/PageHeader.vue';
import SearchInput from '@/components/form/SearchInput.vue';
import BaseTable from '@/components/base/BaseTable.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import DataFormatada from '@/components/formatters/DataFormatada.vue';

export default defineComponent({
  name: 'CategoriaPage',

  components: {
    Footer,
    BaseTable,
    PageHeader,
    SearchInput,
    BasePagination,
    DataFormatada,
  },

  data() {
    return {
      isLoading: false,
      categoria: [] as Categoria[],
      busca: '',
      headers: [
        { title: 'Nome', key: 'nome' },
        { title: 'Criado em', key: 'criadoEm' },
        // { title: 'Criado por', key: 'criadoPor' },
        { title: 'Atualizado em', key: 'atualizadoEm' },
        { title: 'Ações', key: 'actions' },
      ],

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    produtosPaginados(): Categoria[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.categoriaFiltrada.slice(inicio, fim);
    },

    categoriaFiltrada(): Categoria[] {
      if (!this.busca) {
        return this.categoria;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.categoria.filter((categoria) =>
        removerAcentos(categoria.nome).includes(buscaNormalizada),
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  mounted() {
    this.buscarProdutos();
  },

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    irParaProdutosVer(id: string) {
      this.$router.push(ROUTES.categoria.ver(id));
    },

    irParaCriarProduto() {
      this.$router.push(ROUTES.categoria.new);
    },

    async buscarProdutos() {
      try {
        const response = await CategoriaList();

        this.categoria = response.data;
      } catch (error) {
        console.error('Erro ao buscar categorias');
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
      title="Categoria"
      actionLabel="Adicionar categoria"
      @action="irParaCriarProduto"
    />

    <SearchInput v-model="busca" label="Buscar categoria pelo nome" />

    <BaseTable
      v-if="!isLoading"
      :headers="headers"
      :items="produtosPaginados"
      actionLabel="Ver +"
      @action="(item) => irParaProdutosVer(item.id)"
    >
      <template #item.criadoEm="{ item }">
        <DataFormatada :value="item.criadoEm" />
      </template>

      <template #item.atualizadoEm="{ item }">
        <DataFormatada :value="item.atualizadoEm" />
      </template>
    </BaseTable>

    <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate />
      <p>Carregando categorias...</p>
    </div>

    <BasePagination
      v-model:paginaAtual="paginaAtual"
      :itensPorPagina="itensPorPagina"
      :totalItens="categoriaFiltrada.length"
    />

    <Footer />
  </BaseFormContainer>
</template>

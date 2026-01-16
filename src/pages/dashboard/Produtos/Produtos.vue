<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Produto } from '@/interfaces/Produtos/Produto';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';
import { ProdutosList } from '@/services/Produtos';
import PageHeader from '@/components/layouts/PageHeader.vue';
import BaseTable from '@/components/base/BaseTable.vue';
import BasePagination from '@/components/base/BasePagination.vue';

export default defineComponent({
  name: 'ProdutosPage',

  components: {
    Footer,
    PageHeader,
    BaseTable,
    BasePagination,
  },

  data() {
    return {
      produto: [] as Produto[],
      busca: '',
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Nome', key: 'nome' },
        { title: 'SKU', key: 'sku' },
        { title: 'Unidade', key: 'unidadeMedida' },
        { title: 'Quantidade', key: 'quantidadeProduto' },
        { title: 'Categoria', key: 'categoria' },
        { title: 'Status', key: 'status' },
        { title: 'Ações', key: 'actions' },
      ],

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    produtosPaginados(): Produto[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.produtoFiltrado.slice(inicio, fim);
    },

    produtoFiltrado(): Produto[] {
      if (!this.busca) {
        return this.produto;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.produto.filter((produto) =>
        removerAcentos(produto.nome).includes(buscaNormalizada)
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
      this.$router.push(ROUTES.produtos.ver(id));
    },

    irParaCriarProduto() {
      this.$router.push(ROUTES.produtos.new);
    },

    async buscarProdutos() {
      const response = await ProdutosList();

      this.produto = response.data;
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title="Produtos"
      actionLabel="Adicionar produto"
      @action="irParaCriarProduto"
    />

    <v-text-field
      v-model="busca"
      label="Buscar produto pelo nome"
      variant="outlined"
      density="compact"
      clearable
      class="mb-4"
    />

    <BaseTable
      :headers="headers"
      :items="produtosPaginados"
      actionLabel="Editar"
      @action="(item) => irParaProdutosVer(item.id)"
    />

    <BasePagination
      v-model:paginaAtual="paginaAtual"
      :itensPorPagina="itensPorPagina"
      :totalItens="produtoFiltrado.length"
    />

    <Footer />
  </BaseFormContainer>
</template>

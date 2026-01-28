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
      isLoading: false,
      produto: [] as Produto[],
      busca: '',
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Nome', key: 'nome' },
        { title: 'SKU', key: 'sku' },
        { title: 'Descrição', key: 'descricao' },
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
      try{

        const response = await ProdutosList();
  
        console.log(response.data);
        this.produto = response.data;
      }
      catch(error){
        console.error("Erro ao buscar produtos")
      } finally{
        this.isLoading = false;
      }

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
    v-if="!isLoading"
      :headers="headers"
      :items="produtosPaginados"
      actionLabel="Editar"
      @action="(item) => irParaProdutosVer(item.id)"
    />

            <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate/>
      <p>Carregando produtos...</p>
    </div>

    <BasePagination
      v-model:paginaAtual="paginaAtual"
      :itensPorPagina="itensPorPagina"
      :totalItens="produtoFiltrado.length"
    />

    <Footer />
  </BaseFormContainer>
</template>

<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Marca } from '@/interfaces/Marca';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';
import { MarcaList } from '@/services/marca';
import PageHeader from '@/components/layouts/PageHeader.vue';
import SearchInput from '@/components/form/SearchInput.vue';
import BaseTable from '@/components/base/BaseTable.vue';
import BasePagination from '@/components/base/BasePagination.vue';

export default defineComponent({
  name: 'ProdutosPage',

  components: {
    Footer,
    BaseTable,
    PageHeader,
    SearchInput,
    BasePagination,
  },

  data() {
    return {
      marca: [] as Marca[],
      busca: '',
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Nome', key: 'nome' },
        { title: 'Criado em', key: 'criadoEm' },
        { title: 'Criado por', key: 'criadoPor' },
        { title: 'Atualizado em', key: 'atualizadoEm' },
        { title: 'Ações', key: 'actions' },
      ],

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    produtosPaginados(): Marca[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.marcaFiltrada.slice(inicio, fim);
    },

    marcaFiltrada(): Marca[] {
      if (!this.busca) {
        return this.marca;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.marca.filter((marca) =>
        removerAcentos(marca.nome).includes(buscaNormalizada)
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
      this.$router.push(ROUTES.marca.ver(id));
    },

    irParaCriarProduto() {
      this.$router.push(ROUTES.marca.new);
    },

    async buscarProdutos() {
      const response = await MarcaList();

      this.marca = response.data;
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title="Marca"
      actionLabel="Adicionar marca"
      @action="irParaCriarProduto"
    />

    <SearchInput v-model="busca" label="Buscar marca pelo nome" />

    <BaseTable
      :headers="headers"
      :items="produtosPaginados"
      actionLabel="Ver"
      @action="(item) => irParaProdutosVer(item.id)"
    />

    <BasePagination
      v-model:paginaAtual="paginaAtual"
      :itensPorPagina="itensPorPagina"
      :totalItens="marcaFiltrada.length"
    />

    <Footer />
  </BaseFormContainer>
</template>

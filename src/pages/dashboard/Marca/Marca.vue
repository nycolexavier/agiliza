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
import DataFormatada from '@/components/formatters/DataFormatada.vue';

export default defineComponent({
  name: 'ProdutosPage',

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
      marca: [] as Marca[],
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
        removerAcentos(marca.nome).includes(buscaNormalizada),
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
      try {
        const response = await MarcaList();

        this.marca = response.data;
      } catch (error) {
        console.error('Erro ao buscar marcas');
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
      title="Marca"
      actionLabel="Adicionar marca"
      @action="irParaCriarProduto"
    />

    <SearchInput v-model="busca" label="Buscar marca pelo nome" />

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
      <p>Carregando marcas...</p>
    </div>

    <BasePagination
      v-model:paginaAtual="paginaAtual"
      :itensPorPagina="itensPorPagina"
      :totalItens="marcaFiltrada.length"
    />

    <Footer />
  </BaseFormContainer>
</template>

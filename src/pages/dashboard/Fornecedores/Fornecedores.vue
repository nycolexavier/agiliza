<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';
import { FornecedoresList } from '@/services/fornecedores';
import PageHeader from '@/components/layouts/PageHeader.vue';
import BaseTable from '@/components/base/BaseTable.vue';
import SearchInput from '@/components/form/SearchInput.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import TelefoneFormatado from '@/components/formatters/TelefoneFormatado.vue';
// todo add cnpj e endereço
export default defineComponent({
  name: 'FornecedoresPage',

  components: {
    Footer,
    PageHeader,
    SearchInput,
    BaseTable,
    BasePagination,
    TelefoneFormatado,
  },

  data() {
    return {
      isLoading: false,

      fornecedores: [] as Fornecedor[],
      busca: '',

      headers: [
        { title: 'Nome', key: 'nome' },
        { title: 'Cargo', key: 'cargo' },
        { title: 'E-mail', key: 'email' },
        { title: 'Status', key: 'status' },
        { title: 'Telefone', key: 'telefone' },
        { title: 'Ações', key: 'actions' },
      ],

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    fornecedoresPaginados(): Fornecedor[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.fornecedorFiltrado.slice(inicio, fim);
    },

    fornecedorFiltrado(): Fornecedor[] {
      if (!this.busca) {
        return this.fornecedores;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.fornecedores.filter((fornecedor) =>
        removerAcentos(fornecedor.nome).includes(buscaNormalizada),
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  mounted() {
    this.buscarFornecedores();
  },

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    irParaFornecedoresEdicao(id: string) {
      this.$router.push(ROUTES.fornecedores.ver(id));
    },

    irParaAddFornecedor() {
      this.$router.push(ROUTES.fornecedores.new);
    },

    async buscarFornecedores() {
      try {
        const response = await FornecedoresList();

        this.fornecedores = response.data;
      } catch (error) {
        console.error('Erro ao buscar fornecedores');
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
      title="Fornecedores"
      actionLabel="Adicionar fornecedor"
      @action="irParaAddFornecedor"
    />

    <SearchInput v-model="busca" label="Buscar fornecedor pelo nome" />

    <BaseTable
      v-if="!isLoading"
      :headers="headers"
      :items="fornecedoresPaginados"
      actionLabel="Editar"
      @action="(item) => irParaFornecedoresEdicao(item.id)"
    >
      <template #item.telefone="{ item }">
        <TelefoneFormatado :telefone="item.telefone" />
      </template>
    </BaseTable>

    <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate />
      <p>Carregando fornecedores...</p>
    </div>

    <BasePagination
      v-model:paginaAtual="paginaAtual"
      :itensPorPagina="itensPorPagina"
      :totalItens="fornecedorFiltrado.length"
    />

    <Footer />
  </BaseFormContainer>
</template>

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

export default defineComponent({
  name: 'FornecedoresPage',

  components: {
    Footer,
    PageHeader,
    SearchInput,
    BaseTable,
  },

  data() {
    return {
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
        removerAcentos(fornecedor.nome).includes(buscaNormalizada)
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
      const response = await FornecedoresList();

      this.fornecedores = response.data;
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
      :headers="headers"
      :items="fornecedoresPaginados"
      actionLabel="Editar"
      @action="(item) => irParaFornecedoresEdicao(item.id)"
    />

    <v-row class="mt-4" align="center" justify="center">
      <v-btn
        variant="outlined"
        class="me-4"
        @click="paginaAtual--"
        :disabled="paginaAtual === 1"
      >
        Anterior
      </v-btn>

      <span>Página {{ paginaAtual }}</span>

      <v-btn
        variant="outlined"
        class="ms-4"
        @click="paginaAtual++"
        :disabled="paginaAtual * itensPorPagina >= fornecedorFiltrado.length"
      >
        Próximo
      </v-btn>
    </v-row>

    <Footer />
  </BaseFormContainer>
</template>

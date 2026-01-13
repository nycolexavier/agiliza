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

export default defineComponent({
  name: 'ProdutosPage',

  components: {
    Footer,
    PageHeader,
    SearchInput,
    BaseTable,
  },

  data() {
    return {
      lotes: [] as Lote[],
      busca: '',
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Código do lote', key: 'codigoLote' },
        { title: 'Marca', key: 'marca' },
        { title: 'Produto', key: 'produto' },
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
        removerAcentos(lote.codigoLote).includes(buscaNormalizada)
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

    async buscarLotes() {
      const response = await LoteList();

      this.lotes = response.data;
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader title="Lotes" actionLabel="Adicionar lotes" />

    <SearchInput v-model="busca" label="Buscar por código do lote" />

    <BaseTable
      :headers="headers"
      :items="lotesPaginados"
      actionLabel="Ver"
      @action="(item) => irParaOLotesEditar(item.id)"
    />

    <!-- Paginação -->
    <v-row class="mt-4" justify="center" align="center">
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
        :disabled="paginaAtual * itensPorPagina >= lotesFiltrado.length"
      >
        Próximo
      </v-btn>
    </v-row>

    <Footer />
  </BaseFormContainer>
</template>

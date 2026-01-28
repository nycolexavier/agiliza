<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Movimentacao } from '@/interfaces/Movimentacao';
import { ROUTES } from '@/router/utils/routes';
import { MovimentacaoListID } from '@/services/movimentacao.services';
import PageHeader from '@/components/layouts/PageHeader.vue';
import SearchInput from '@/components/form/SearchInput.vue';
import DetailsCard from '@/components/card/DetailsCard.vue';

export default defineComponent({
  name: 'MovimentacoesPage',

  components: {
    Footer,
    DetailsCard,
    PageHeader,
    SearchInput,
  },

  data() {
    return {
       isLoading: false,

      movimentacoes: null as Movimentacao | null,
      busca: '',

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  mounted() {
    this.buscarMovimentacoes();
  },

  methods: {
    irParaDashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    irParaEditarMovimentacao() {
      if (!this.movimentacoes) return;
      this.$router.push(ROUTES.movimentacao.editar(this.movimentacoes.id));
    },

    irParaMovimentacao(id: string) {
      this.$router.push(ROUTES.movimentacao.list);
    },

    async buscarMovimentacoes() {
      try{
this.isLoading = true;
        const id = this.$route.params.id;
        if (typeof id === 'string') {
          const response = await MovimentacaoListID(id);
          this.movimentacoes = response.data;
        }
      }
      catch(error){
        console.error('Erro ao buscar usuários', error);
      } finally {
        this.isLoading = false;
      }
      }
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      :title="`Movimentação: ${movimentacoes?.id}`"
      showback
      backLabel="Voltar para movimentações"
      actionLabel="Editar"
      :actionDisabled="!movimentacoes"
      @back="irParaMovimentacao"
      @action="irParaEditarMovimentacao"
    />

    <DetailsCard
      v-if="!isLoading"
      :items="[
        { label: 'ID', value: movimentacoes?.id },
        { label: 'Tipo', value: movimentacoes?.tipo },
        { label: 'Quantidade', value: movimentacoes?.quantidade },
        { label: 'Data', value: movimentacoes?.dataMovimentacao },
        { label: 'Status', value: movimentacoes?.status },
      ]"
    />

    <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate />
      <p>Carregando movimentações...</p>
    </div>

    <Footer />
  </BaseFormContainer>
</template>

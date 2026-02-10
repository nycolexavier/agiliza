<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Movimentacao } from '@/interfaces/Movimentacao';
import { ROUTES } from '@/router/utils/routes';
import {
  MovimentacaoListID,
  MovimentacoesPorLote,
} from '@/services/movimentacao.services';
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
      historico: [] as Movimentacao[],
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

    // irParaEditarMovimentacao() {
    //   if (!this.movimentacoes) return;
    //   this.$router.push(ROUTES.movimentacao.editar(this.movimentacoes.id));
    // },

    irParaMovimentacao(id: string) {
      this.$router.push(ROUTES.movimentacao.list);
    },

    async buscarMovimentacoes() {
      try {
        this.isLoading = true;
        const id = this.$route.params.id;
        if (typeof id === 'string') {
          const response = await MovimentacaoListID(id);
          this.movimentacoes = response.data;

          const loteId = response.data.lote?.id;
          if (loteId) {
            const historicoResponse = await MovimentacoesPorLote(loteId);
            this.historico = historicoResponse.data;
          }
        }
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
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
      :title="`Movimentação: ${movimentacoes?.id}`"
      showback
      backLabel="Voltar para movimentações"
      :actionDisabled="!movimentacoes"
      @back="irParaMovimentacao"
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

    <v-card
      v-if="!isLoading && historico.length"
      class="mt-6"
      variant="outlined"
    >
      <v-card-title> Histórico do lote </v-card-title>

      <v-table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Tipo</th>
            <th>Quantidade</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="mov in historico"
            :key="mov.id"
            :class="{ 'bg-grey-lighten-4': mov.id === movimentacoes?.id }"
          >
            <td>{{ mov.dataMovimentacao }}</td>
            <td>
              <v-chip
                :color="mov.tipo === 'entrada' ? 'success' : 'error'"
                variant="outlined"
              >
                {{ mov.tipo }}
              </v-chip>
            </td>
            <td>{{ mov.quantidade }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <Footer />
  </BaseFormContainer>
</template>

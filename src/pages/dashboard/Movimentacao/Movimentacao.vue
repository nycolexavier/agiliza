<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Movimentacao } from '@/interfaces/Movimentacao';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';
import { MovimentacaoList } from '@/services/movimentacao.services';

export default defineComponent({
  name: 'MovimentacoesPage',

  components: {
    Footer,
  },

  data() {
    return {
      movimentacoes: [] as Movimentacao[],
      busca: '',

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    movimentacoesPaginadas(): Movimentacao[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.movimentacoesFiltradas.slice(inicio, fim);
    },

    movimentacoesFiltradas(): Movimentacao[] {
      if (!this.busca) {
        return this.movimentacoes;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.movimentacoes.filter((mov: Movimentacao) =>
        removerAcentos(mov.tipomovimentacao).includes(buscaNormalizada)
      );
    },
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
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    irParaMovimentacaoVer(id: string) {
      this.$router.push(ROUTES.movimentacao.ver(id));
    },

    irParaCriarMovimentacao() {
      this.$router.push(ROUTES.movimentacao.new);
    },

    async buscarMovimentacoes() {
      const response = await MovimentacaoList();
      this.movimentacoes = response.data;
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <!-- Cabeçalho -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="6">
        <h2>Movimentações</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn color="primary" class="mr-2" @click="irParaCriarMovimentacao">
          Nova movimentação
        </v-btn>

        <v-btn variant="outlined" @click="irParaODashboard"> Dashboard </v-btn>
      </v-col>
    </v-row>

    <!-- Busca -->
    <v-text-field
      v-model="busca"
      label="Buscar por tipo de movimentação"
      variant="outlined"
      density="compact"
      clearable
      class="mb-4"
    />

    <!-- Tabela -->
    <v-card variant="outlined">
      <v-data-table :items="movimentacoesPaginadas" item-key="id">
        <template #headers>
          <tr>
            <th>ID</th>
            <th>Lote</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Status</th>
            <th class="text-end">Ações</th>
          </tr>
        </template>

        <template #item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.idlote }}</td>
            <td>{{ item.tipomovimentacao }}</td>
            <td>{{ item.quantidade }}</td>
            <td>{{ item.datamovimentacao }}</td>
            <td>{{ item.status }}</td>

            <td class="text-end">
              <v-btn
                size="small"
                variant="outlined"
                @click="irParaMovimentacaoVer(item.id)"
              >
                Ver
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <!-- Paginação -->
    <v-row class="mt-4" align="center" justify="center">
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
        :disabled="
          paginaAtual * itensPorPagina >= movimentacoesFiltradas.length
        "
      >
        Próximo
      </v-btn>
    </v-row>

    <Footer />
  </BaseFormContainer>
</template>

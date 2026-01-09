<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Deposito } from '@/interfaces/Deposito/Deposito';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';

export default defineComponent({
  name: 'DepositoPage',

  components: {
    Footer,
  },

  data() {
    return {
      deposito: [] as Deposito[],
      busca: '',

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  mounted() {
    this.buscarDeposito();
  },

  computed: {
    depositoPaginados(): Deposito[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.depositoFiltrado.slice(inicio, fim);
    },

    depositoFiltrado(): Deposito[] {
      if (!this.busca) {
        return this.deposito;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.deposito.filter((deposito) =>
        removerAcentos(deposito.corredor).includes(buscaNormalizada)
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  methods: {
    irParaDepositoVer(id: number) {
      this.$router.push(ROUTES.deposito.ver(id));
    },

    irParaDepositoCriar() {
      this.$router.push(ROUTES.deposito.new);
    },

    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    async buscarDeposito() {
      const response = await api.get<Deposito[]>('/deposito');

      this.deposito = response.data;
    },
  },
});
</script>

<template>
  <v-container fluid>
    <!-- Cabeçalho -->
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2>Depósitos</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" class="me-2" @click="irParaODashboard">
          Dashboard
        </v-btn>

        <v-btn color="primary" @click="irParaDepositoCriar">
          Adicionar depósito
        </v-btn>
      </v-col>
    </v-row>

    <!-- Busca -->
    <v-card variant="outlined" class="mb-4">
      <v-card-text>
        <v-text-field v-model="busca" label="Buscar por corredor" clearable />
      </v-card-text>
    </v-card>

    <!-- Tabela -->
    <v-card variant="outlined">
      <v-data-table :items="depositoPaginados" item-key="id">
        <template #headers>
          <tr>
            <th>Corredor</th>
            <th>Prateleira</th>
            <th>Sessão</th>
            <th>Quantidade máxima</th>
            <th>Ações</th>
          </tr>
        </template>

        <template #item="{ item }">
          <tr>
            <td>{{ item.corredor }}</td>
            <td>{{ item.prateleira }}</td>
            <td>{{ item.sessao }}</td>
            <td>{{ item.quantidadeMaxima }}</td>

            <td>
              <v-btn
                size="small"
                variant="outlined"
                @click="irParaDepositoVer(item.id)"
              >
                Ver
              </v-btn>
            </td>
          </tr>
        </template>

        <template #no-data> Nenhum depósito encontrado </template>
      </v-data-table>
    </v-card>

    <!-- Paginação -->
    <v-row class="mt-4" align="center" justify="center">
      <v-btn
        variant="outlined"
        class="me-2"
        @click="paginaAtual--"
        :disabled="paginaAtual === 1"
      >
        Anterior
      </v-btn>

      <span>Página {{ paginaAtual }}</span>

      <v-btn
        variant="outlined"
        class="ms-2"
        @click="paginaAtual++"
        :disabled="paginaAtual * itensPorPagina >= depositoFiltrado.length"
      >
        Próximo
      </v-btn>
    </v-row>

    <Footer />
  </v-container>
</template>

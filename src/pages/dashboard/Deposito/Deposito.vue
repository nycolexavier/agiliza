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
  <div>
    <h1>Página de Deposito</h1>

    <input type="text" v-model="busca" placeholder="Buscar por corredor" />

    <br />

    <v-btn @click="irParaDepositoCriar">Adicionar Deposito</v-btn>

    <br />

    <v-btn @click="irParaODashboard">Dashboard</v-btn>

    <table>
      <thead>
        <tr>
          <th>Corredor</th>
          <th>Prateleira</th>
          <th>Sessão</th>
          <th>Quantidade Máxima</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in depositoPaginados" :key="item.id">
          <td>{{ item.corredor }}</td>
          <td>{{ item.prateleira }}</td>
          <td>{{ item.sessao }}</td>
          <td>{{ item.quantidadeMaxima }}</td>

          <td>
            <v-btn @click="irParaDepositoVer(item.id)">Ver</v-btn>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <v-btn @click="paginaAtual--" :disabled="paginaAtual === 1">
        Anterior
      </v-btn>

      <span>Página {{ paginaAtual }}</span>

      <v-btn
        @click="paginaAtual++"
        :disabled="paginaAtual * itensPorPagina >= depositoFiltrado.length"
      >
        Próximo
      </v-btn>
    </div>

    <Footer />
  </div>
</template>

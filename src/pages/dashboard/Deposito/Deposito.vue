<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Deposito } from '@/interfaces/Deposito/Deposito';
import { removerAcentos } from '@/utils/string';

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

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  computed: {
    depositoPaginados(): Deposito[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.depositoFiltradoPorCorredor.slice(inicio, fim);
    },

    depositoFiltradoPorCorredor(): Deposito[] {
      if (!this.busca) {
        return this.deposito;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.deposito.filter((deposito) =>
        removerAcentos(deposito.corredor).includes(buscaNormalizada)
      );
    },
  },

  methods: {
    irParaDepositoVer(id: number) {
      this.$router.push(`/dashboard/deposito/${id}`);
    },

    irParaDepositoCriar() {
      this.$router.push(`/dashboard/deposito/new`);
    },

    irParaODashboard() {
      this.$router.push('/dashboard');
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

    <button @click="irParaDepositoCriar">Adicionar Deposito</button>

    <br />

    <button @click="irParaODashboard">Dashboard</button>

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
            <button @click="irParaDepositoVer(item.id)">Ver</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <button @click="paginaAtual--" :disabled="paginaAtual === 1">
        Anterior
      </button>

      <span>Página {{ paginaAtual }}</span>

      <button
        @click="paginaAtual++"
        :disabled="
          paginaAtual * itensPorPagina >= depositoFiltradoPorCorredor.length
        "
      >
        Próximo
      </button>
    </div>

    <Footer />
  </div>
</template>

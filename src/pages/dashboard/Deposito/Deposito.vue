<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Deposito } from '@/interfaces/Deposito/Deposito';

export default defineComponent({
  name: 'DepositoPage',

  components: {
    Footer,
  },

  data() {
    return {
      tabela: [] as Deposito[],
    };
  },

  mounted() {
    this.buscarDeposito();
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

      this.tabela = response.data;
    },
  },
});
</script>

<template>
  <div>
    <h1>Página de Deposito</h1>

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
        <tr v-for="item in tabela" :key="item.id">
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
    <Footer />
  </div>
</template>

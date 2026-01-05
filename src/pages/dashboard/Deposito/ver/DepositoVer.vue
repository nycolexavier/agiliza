<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Deposito } from '@/interfaces/Deposito/Deposito';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DepositoVerPage',

  components: {
    Footer,
  },

  data() {
    return {
      deposito: null as Deposito | null,
    };
  },

  mounted() {
    this.verDeposito();
  },

  methods: {
    irParaoDeposito() {
      this.$router.push(`/dashboard/deposito`);
    },

    async verDeposito() {
      const response = await api.get(`/deposito/${this.deposito?.id}`);
      this.deposito = response.data;
    },
  },
});
</script>

<template>
  <div>
    <h1>Olá {{ deposito?.id }}</h1>

    <button @click="irParaoDeposito">Voltar pro deposito</button>

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
        <tr>
          <td>{{ deposito?.corredor }}</td>
          <td>{{ deposito?.prateleira }}</td>
          <td>{{ deposito?.sessao }}</td>
          <td>{{ deposito?.quantidadeMaxima }}</td>
        </tr>
      </tbody>
    </table>
    <Footer />
  </div>
</template>

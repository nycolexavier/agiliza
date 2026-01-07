<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Deposito } from '@/interfaces/Deposito/Deposito';
import { ROUTES } from '@/router/utils/routes';
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
      this.$router.push(ROUTES.deposito.list);
    },

    irParaODepositoEditar(){
      if(!this.deposito) return
      
      this.$router.push(ROUTES.deposito.editar(this.deposito.id))
    },

    async verDeposito() {
      const id = this.$route.params.id;
      const response = await api.get(`/deposito/${id}`);
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

          <td>
            <button @click="irParaODepositoEditar">
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Footer />
  </div>
</template>

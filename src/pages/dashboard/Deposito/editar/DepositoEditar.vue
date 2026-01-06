<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Deposito } from '@/interfaces/Deposito/Deposito';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DepositoEditarPage',

  components: {
    Footer,
  },

  data(vm) {
    return {
      deposito: null as Deposito | null,
      form: {
        corredor: '',
        prateleira: '',
        sessao: '',
        quantidadeMaxima: '',
      },
    };
  },

  mounted() {
    this.buscarDeposito();
  },

  methods: {
    irParaODeposito() {
      this.$router.push(`/dashboard/deposito/${this.deposito?.id}`);
    },

    async buscarDeposito() {
      try {
        const id = this.$route.params.id;

        const response = await api.get(`/deposito/${id}`);
        this.deposito = response.data;

        this.form.corredor = response.data.corredor;
        this.form.prateleira = response.data.prateleira;
        this.form.sessao = response.data.sessao;
        this.form.quantidadeMaxima = response.data.quantidadeMaxima;
      } catch (error) {
        console.error('Erro ao buscar deposito', error);
      }
    },

    async enviarForm() {
      try {
        const response = await api.patch(`/deposito/${this.deposito?.id}`, {
          corredor: this.form.corredor,
          prateleira: this.form.prateleira,
          sessao: this.form.sessao,
          quantidadeMaxima: this.form.quantidadeMaxima,
        });

        return response;
      } catch (error) {}
    },
  },
});
</script>

<template>
  <div>
    <h1>Editar deposito {{ deposito?.id }}</h1>

    <button @click="irParaODeposito">Voltar para ver o deposito</button>

    <form @submit.prevent="enviarForm">
      <input v-model="form.corredor" placeholder="Corredor" />
      <br />
      <input v-model="form.prateleira" placeholder="prateleira" />
      <br />
      <input v-model="form.sessao" placeholder="sessao" />
      <br />
      <input v-model="form.quantidadeMaxima" placeholder="quantidadeMaxima" />
      <br />
      <button
        @click="enviarForm"
        type="submit"
        :disabled="
          !form.corredor ||
          !form.prateleira ||
          !form.sessao ||
          !form.quantidadeMaxima        "
      >
        Editar
      </button>
    </form>
    <Footer />
  </div>
</template>

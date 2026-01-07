<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DepositoCriarPage',

  components: {
    Footer,
  },

  data() {
    return {
      form: {
        corredor: '',
        prateleira: '',
        sessao: '',
        quantidadeMaxima: '',
      },
    };
  },

  methods: {
    irParaODeposito() {
      this.$router.push(ROUTES.deposito.list);
    },

    async enviarForm() {
      const response = await api.post(`/deposito`, {
        corredor: this.form.corredor,
        prateleira: this.form.prateleira,
        sessao: this.form.sessao,
        quantidadeMaxima: this.form.quantidadeMaxima,
      });
    },
  },
});
</script>

<template>
  <div>
    <h1>Criar um depósito</h1>

    <button @click="irParaODeposito">Voltar para depósito</button>

    <form @click.prevent="enviarForm">
      <input v-model="form.corredor" type="text" placeholder="Corredor" />
      <br />
      <input v-model="form.prateleira" type="text" placeholder="Prateleira" />
      <br />
      <input v-model="form.sessao" type="text" placeholder="Sessao" />
      <br />
      <input
        v-model="form.quantidadeMaxima"
        type="text"
        placeholder="Quantidade máxima"
      />
      <br />
      <button>Criar</button>
    </form>
  </div>
</template>

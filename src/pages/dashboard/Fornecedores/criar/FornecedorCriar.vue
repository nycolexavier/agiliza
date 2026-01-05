<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import api from '@/services/api';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'FornecedorCriarPage',

  components: {
    Footer,
  },

  data() {
    return {
      form: {
        nome: '',
        cargo: '',
        email: '',
        status: 'ativo',
        telefone: '',
      },
    };
  },

  methods: {
    irParaFornecedor() {
      this.$router.push(`/dashboard/fornecedores`);
    },

    async enviarForm() {
      try {
        await api.post(`/fornecedores`, {
          nome: this.form.nome,
          cargo: this.form.cargo,
          email: this.form.email,
          status: this.form.status,
          telefone: this.form.telefone,
        });

        alert('AA');
      } catch (error) {
        console.error('Erro ao criar fornecedor', error);
      }
    },
  },
});
</script>

<template>
  <div>
    <h1>Cadastrar um fornecedor</h1>

    <button @click="irParaFornecedor">Fornecedores</button>

    <form @submit.prevent="enviarForm">
      <input v-model="form.nome" type="name" placeholder="Nome" />

      <br />

      <input v-model="form.cargo" type="text" placeholder="Cargo" />

      <br />

      <input v-model="form.email" type="email" placeholder="E-mail" />

      <br />

      <input v-model="form.telefone" type="number" placeholder="Telefone" />

      <br />

      <button
        type="submit"
        :disabled="!form.nome || !form.cargo || !form.email"
      >
        Criar
      </button>
    </form>
  </div>
</template>

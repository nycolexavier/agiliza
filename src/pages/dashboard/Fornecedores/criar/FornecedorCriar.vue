<script lang="ts">
import api from '@/services/api';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup(props, ctx) {

    const router = useRouter();

    let form = reactive({
      nome: '',
      cargo: '',
      email: '',
      status: 'ativo',
      telefone: '',
    });

    function irParaFornecedor(){
        router.push(`/dashboard/fornecedores`)
    }

    async function enviarForm() {
      try {
        await api.post(`/fornecedores`, {
          nome: form.nome,
          cargo: form.cargo,
          email: form.email,
          status: form.status,
          telefone: form.telefone,
        });
      } catch (error) {
        console.error('Erro ao criar fornecedor', error);
      }
    }

    return { form, enviarForm, irParaFornecedor };
  },
};
</script>

<template>
  <div>
    <h1>Cadastrar um fornecedor</h1>

    <button @click="irParaFornecedor">Fornecedor</button>

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

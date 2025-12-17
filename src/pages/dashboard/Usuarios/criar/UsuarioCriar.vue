<script lang="ts">
import api from '@/services/api';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup(props, ctx) {
    const router = useRouter();

    function irParaUsuarios() {
      router.push(`/dashboard/usuarios`);
    }

    let form = reactive({
      nome: '',
      cargo: '',
      email: '',
      status: 'ativo',
      telefone: '',
    });

    async function enviarForm() {
      try {
        await api.post(`/usuarios`, {
          nome: form.nome,
          cargo: form.cargo,
          email: form.email,
          status: form.status,
          telefone: form.telefone,
        });

        console.log('Deu!');
      } catch (error) {
        console.error('Erro ao criar usuário', error);
      }
    }

    return {
      form,
      enviarForm,
      irParaUsuarios,
    };
  },
};
</script>

<template>
  <div>
    <h1>Vamos criar um usuário</h1>

    <button @click="irParaUsuarios">usuarios</button>

    <form @submit.prevent="enviarForm">
      <input v-model="form.nome" placeholder="Nome" />
      <br />
      <input v-model="form.cargo" placeholder="cargo" />
      <br />
      <input type="email" v-model="form.email" placeholder="email" />
      <br />
      <input v-model="form.telefone" placeholder="telefone" />

      <button
        type="submit"
        :disabled="!form.nome || !form.email || !form.cargo"
      >
        Criar
      </button>
    </form>
  </div>
</template>

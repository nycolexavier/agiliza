<script lang="ts">
import api from '@/services/api';
import { useRouter } from 'vue-router';
export default {
  setup(props, ctx) {
    const router = useRouter();

    function irParaODeposito() {
      router.push(`/dashboard/deposito`);
    }

    let form = {
      corredor: '',
      prateleira: '',
      sessao: '',
      quantidadeMaxima: '',
    };

    async function enviarForm() {
      const response = await api.post(`/deposito`, {
        corredor: form.corredor,
        prateleira: form.prateleira,
        sessao: form.sessao,
        quantidadeMaxima: form.quantidadeMaxima,
      });
    }

    return { form, enviarForm, irParaODeposito };
  },
};
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

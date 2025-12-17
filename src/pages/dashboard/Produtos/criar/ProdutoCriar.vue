<script lang="ts">
import api from '@/services/api';
import { reactive } from 'vue';

export default {
  setup(props, ctx) {
    let form = reactive({
      nome: '',
      sku: '',
      quantidadeMedida: '',
      quantidadeProduto: '',
      status: 'ativo',
      categoria: '',
    });

    async function enviarForm() {
      try {
        await api.post(`/produtos`, {
          nome: form.nome,
          sku: form.sku,
          quantidadeMedida: form.quantidadeMedida,
          quantidadeProduto: form.quantidadeProduto,
          status: form.status,
          categoria: form.categoria,
        });

        console.log('Deu certo!');
      } catch (error) {
        console.error('Erro ao criar produto', error);
      }
    }
    return {
      form,
      enviarForm,
    };
  },
};
</script>

<template>
  <div>
    <h1>Criar um produto</h1>

    <form @submit.prevent="enviarForm" action="">
      <input v-model="form.nome" type="text" placeholder="Nome" />

      <br />

      <input v-model="form.sku" type="text" placeholder="SKU" />

      <br />

      <input
        v-model="form.quantidadeMedida"
        type="text"
        placeholder="Quantidade de Medida"
      />

      <br />

      <input
        v-model="form.quantidadeProduto"
        type="text"
        placeholder="Quantidade de Produto"
      />

      <br />

      <input v-model="form.categoria" type="text" placeholder="Categoria" />

      <button
        type="submit"
        :disabled="
          !form.nome ||
          !form.categoria ||
          !form.quantidadeMedida ||
          !form.quantidadeProduto ||
          !form.sku
        "
      >
        Criar
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import type { Produto } from '@/interfaces/Produtos/Produto';
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const id = computed(() => route.params.id);

    function irParaOsProdutos() {
      router.push('/dashboard/produtos');
    }

    const produto = ref<Produto | null>(null);

    async function buscarProdutos() {
      const response = await api.get(`/produtos/${id.value}`);
      produto.value = response.data;

      console.log('response.data', response.data);
    }

    onMounted(() => {
      buscarProdutos();
    });

    return {
      id,
      produto,
      irParaOsProdutos,
    };
  },
};
</script>

<template>
  <h1>Editar Produto {{ id }}</h1>

  <button @click="irParaOsProdutos">Produtos</button>

  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>nome</th>
        <th>sku</th>
        <th>unidade de medida</th>
        <th>quantidade de produto</th>
        <th>categoria</th>
        <th>status</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>{{ produto?.id }}</td>
        <td>{{ produto?.nome }}</td>
        <td>{{ produto?.sku }}</td>
        <td>{{ produto?.unidadeMedida }}</td>
        <td>{{ produto?.quantidadeProduto }}</td>
        <td>{{ produto?.categoria }}</td>
        <td>{{ produto?.status }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    function irParaOFornecedor() {
      router.push(`/dashboard/fornecedores`);
    }

    const id = computed(() => route.params.id);

    const fornecedorEdicao = ref<Fornecedor | null>(null);

    async function buscarFornecedores() {
      const response = await api.get(`/fornecedores/${id.value}`);
      fornecedorEdicao.value = response.data;
    }

    onMounted(() => {
      buscarFornecedores();
    });

    return {
      id,
      buscarFornecedores,
      fornecedorEdicao,
      irParaOFornecedor,
    };
  },
};
</script>

<template>
  <div>
    <h1>Olá {{ id }}</h1>

    <button @click="irParaOFornecedor">Fornecedor</button>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cargo</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>Telefone</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{{ fornecedorEdicao?.nome }}</td>
          <td>{{ fornecedorEdicao?.cargo }}</td>
          <td>{{ fornecedorEdicao?.email }}</td>
          <td>{{ fornecedorEdicao?.status }}</td>
          <td>{{ fornecedorEdicao?.telefone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

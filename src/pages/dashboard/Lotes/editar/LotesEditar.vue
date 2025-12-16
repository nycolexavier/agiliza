<script lang="ts">
import type { Lote } from '@/interfaces/Lotes/Lote';
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup(props, ctx) {
    const route = useRoute();

    const id = computed(() => route.params.id);

    const lote = ref<Lote | null>(null);

    async function buscarLote() {
      const response = await api.get(`/lotes/${id.value}`);
      lote.value = response.data;
    }

    onMounted(() => {
      buscarLote();
    });

    return {
      id,
      lote,
    };
  },
};
</script>

<template>
  <div>
    <h1>Deu certo {{ id }}</h1>

    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Código Lote</th>
          <th>Marca</th>
          <th>Produto</th>
          <th>Status</th>
          <th>Data de validade</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{{ lote?.id }}</td>
          <td>{{ lote?.codigoLote }}</td>
          <td>{{ lote?.marca }}</td>
          <td>{{ lote?.produto }}</td>
          <td>{{ lote?.status }}</td>
          <td>{{ lote?.dataValidade }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

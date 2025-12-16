<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import type { Lote } from '@/interfaces/Lotes/Lote';

export default {
  setup() {
    const router = useRouter();

    function irParaODashboard() {
      router.push('/dashboard');
    }

    const tabela = ref<Lote[]>([]);

    async function buscarLotes() {
      const response = await api.get<Lote[]>('/lotes');

      tabela.value = response.data;
    }

    onMounted(() => {
      buscarLotes();
    });

    return {
      irParaODashboard,
      tabela
    };
  },
};
</script>

<template>
  <div>
    <h1>Página de Lotes</h1>

    <button @click="irParaODashboard">Dashboard</button>

    <p>(to-do) campo de busca</p>

    <br />

    <table>
      <thead>
        <tr>
          <th>Código Lote</th>
          <th>Marca</th>
          <th>Produto</th>
          <th>Status</th>
          <th>Data de validade</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in tabela" :key="item.id">
          <td>{{ item.codigoLote }}</td>
          <td>{{ item.marca }}</td>
          <td>{{ item.produto }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.dataValidade }}</td>

          <td>
            <button>Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Footer />
  </div>
</template>

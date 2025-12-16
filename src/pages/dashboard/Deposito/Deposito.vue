<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { computed, onMounted, ref } from 'vue';
import api from '@/services/api';
import type { Deposito } from '@/interfaces/Deposito/Deposito';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup(props, ctx) {
    const router = useRouter();

    function irParaDepositoEdicao(id: number) {
      router.push(`/dashboard/fornecedores/${id}`);
    }

    function irParaODashboard() {
      router.push('/dashboard');
    }

    const tabela = ref<Deposito[]>([]);

    async function buscarDeposito() {
      const response = await api.get<Deposito[]>('/deposito');

      tabela.value = response.data;
    }

    onMounted(() => {
      buscarDeposito();
    });

    return {
      irParaDepositoEdicao,
      irParaODashboard,
      tabela,
    };
  },
};
</script>

<template>
  <div>
    <h1>Página de Deposito</h1>

    <br />

    <button @click="irParaODashboard">Dashboard</button>

    <table>
      <thead>
        <tr>
          <th>Corredor</th>
          <th>Prateleira</th>
          <th>Sessão</th>
          <th>Quantidade Máxima</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in tabela" :key="item.id">
          <td>{{ item.corredor }}</td>
          <td>{{ item.prateleira }}</td>
          <td>{{ item.sessao }}</td>
          <td>{{ item.quantidadeMaxima }}</td>

          <td>
            <button @click="irParaDepositoEdicao(item.id)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Footer />
  </div>
</template>

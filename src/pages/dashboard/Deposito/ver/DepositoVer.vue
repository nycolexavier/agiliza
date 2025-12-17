<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Deposito } from '@/interfaces/Deposito/Deposito';
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
  setup(props, ctx) {
    const route = useRoute();
    const router = useRouter();
    const id = computed(() => route.params.id);

    const deposito = ref<Deposito | null>(null);

    function irParaoDeposito() {
      router.push(`/dashboard/deposito`);
    }

    async function verDeposito() {
      const response = await api.get(`/deposito/${id.value}`);
      deposito.value = response.data;
    }

    onMounted(() => {
      verDeposito();
    });

    return {
      id,
      deposito,
      irParaoDeposito,
    };
  },
};
</script>

<template>
  <div>
    <h1>Olá {{ id }}</h1>

    <button @click="irParaoDeposito">Voltar pro deposito</button>

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
        <tr>
          <td>{{ deposito?.corredor }}</td>
          <td>{{ deposito?.prateleira }}</td>
          <td>{{ deposito?.sessao }}</td>
          <td>{{ deposito?.quantidadeMaxima }}</td>
        </tr>
      </tbody>
    </table>
    <Footer />
  </div>
</template>

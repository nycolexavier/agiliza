<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';
import type { Produto } from '@/interfaces/Produtos/Produto';

export default {
  setup(props, ctx) {
    const router = useRouter();

    function irParaODashboard() {
      router.push('/dashboard');
    }

    function irParaProdutosEdicao(id: number) {
      router.push(`/dashboard/produtos/${id}`);
    }

    const tabela = ref<Produto[]>([]);

    async function buscarProdutos() {
      const response = await api.get<Produto[]>('/produtos');

      tabela.value = response.data;

      console.log(response.data);
    }

    onMounted(() => {
      buscarProdutos();
    });

    return {
      tabela,
      irParaODashboard,
      irParaProdutosEdicao,
    };
  },
};
</script>

<template>
  <div>
    <h1>Página de produtos</h1>

    <br />

    <button @click="irParaODashboard">Dashboard</button>

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
        <tr v-for="item in tabela" :key="item.id">
          <td>{{ item?.id }}</td>
          <td>{{ item.nome }}</td>
          <td>{{ item.sku }}</td>
          <td>{{ item.unidadeMedida }}</td>
          <td>{{ item.quantidadeProduto }}</td>
          <td>{{ item.categoria }}</td>
          <td>{{ item.status }}</td>

          <td>
            <button @click="irParaProdutosEdicao(item.id)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Footer />
  </div>
</template>

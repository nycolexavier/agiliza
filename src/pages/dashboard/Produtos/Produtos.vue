<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Produto } from '@/interfaces/Produtos/Produto';

export default defineComponent({
  name: 'ProdutosPage',

  components: {
    Footer,
  },

  data() {
    return {
      tabela: [] as Produto[],
    };
  },

  mounted() {
    this.buscarProdutos();
  },

  methods: {
    irParaODashboard() {
      this.$router.push('/dashboard');
    },

    irParaProdutosVer(id: number) {
      this.$router.push(`/dashboard/produtos/${id}`);
    },

    irParaCriarProduto() {
      this.$router.push(`/dashboard/produtos/new`);
    },

    async buscarProdutos() {
      const response = await api.get<Produto[]>('/produtos');

      this.tabela = response.data;

      console.log(response.data);
    },
  },
});
</script>

<template>
  <div>
    <h1>Página de produtos</h1>

    <br />

    <button @click="irParaCriarProduto">Adicionar produtos</button>
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
            <button @click="irParaProdutosVer(item.id)">Ver</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Footer />
  </div>
</template>

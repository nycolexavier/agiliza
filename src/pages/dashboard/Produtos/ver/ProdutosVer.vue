<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Produto } from '@/interfaces/Produtos/Produto';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProdutosVerPage',
  components: {
    Footer,
  },

  data() {
    return {
      produto: null as Produto | null,
    };
  },

  mounted() {
    this.buscarProduto();
  },

  methods: {
    irParaOsProdutos() {
      this.$router.push('/dashboard/produtos');
    },

    irParaProdutosEditar() {
      this.$router.push(`/dashboard/produtos/${this.produto?.id}/editar`);
    },

    async buscarProduto() {
      const id = this.$route.params.id;
      const response = await api.get(`/produtos/${id}`);
      this.produto = response.data;
    },
  },
});
</script>

<template>
  <h1>Ver produto: {{ produto?.nome }}</h1>

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

        <td><button @click="irParaProdutosEditar">Editar</button></td>
      </tr>
    </tbody>
  </table>
</template>

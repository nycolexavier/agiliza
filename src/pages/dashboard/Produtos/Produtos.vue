<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Produto } from '@/interfaces/Produtos/Produto';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';

export default defineComponent({
  name: 'ProdutosPage',

  components: {
    Footer,
  },

  data() {
    return {
      produto: [] as Produto[],
      busca: '',

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    produtosPaginados(): Produto[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.produtoFiltrado.slice(inicio, fim);
    },

    produtoFiltrado(): Produto[] {
      if (!this.busca) {
        return this.produto;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.produto.filter((produto) =>
        removerAcentos(produto.nome).includes(buscaNormalizada)
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  mounted() {
    this.buscarProdutos();
  },

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    irParaProdutosVer(id: number) {
      this.$router.push(ROUTES.produtos.list);
    },

    irParaCriarProduto() {
      this.$router.push(ROUTES.produtos.new);
    },

    async buscarProdutos() {
      const response = await api.get<Produto[]>('/produtos');

      this.produto = response.data;
    },
  },
});
</script>

<template>
  <div>
    <h1>Página de produtos</h1>

    <br />

    <input type="text" v-model="busca" placeholder="Buscar por nome" />

    <br />

    <v-btn @click="irParaCriarProduto">Adicionar produtos</v-btn>

    <br />
    <v-btn @click="irParaODashboard">Dashboard</v-btn>

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
        <tr v-for="item in produtosPaginados" :key="item.id">
          <td>{{ item?.id }}</td>
          <td>{{ item.nome }}</td>
          <td>{{ item.sku }}</td>
          <td>{{ item.unidadeMedida }}</td>
          <td>{{ item.quantidadeProduto }}</td>
          <td>{{ item.categoria }}</td>
          <td>{{ item.status }}</td>

          <td>
            <v-btn @click="irParaProdutosVer(item.id)">Ver</v-btn>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <v-btn @click="paginaAtual--" :disabled="paginaAtual === 1">
        Anterior
      </v-btn>

      <span>Página {{ paginaAtual }}</span>

      <v-btn
        @click="paginaAtual++"
        :disabled="paginaAtual * itensPorPagina >= produtoFiltrado.length"
      >
        Próximo
      </v-btn>
    </div>

    <Footer />
  </div>
</template>

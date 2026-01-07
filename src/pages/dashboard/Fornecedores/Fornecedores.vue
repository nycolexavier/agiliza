<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';

export default defineComponent({
  name: 'FornecedoresPage',

  components: {
    Footer,
  },

  data() {
    return {
      fornecedores: [] as Fornecedor[],
      busca: '',

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    fornecedoresPaginados(): Fornecedor[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.fornecedorFiltrado.slice(inicio, fim);
    },

    fornecedorFiltrado(): Fornecedor[] {
      if (!this.busca) {
        return this.fornecedores;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.fornecedores.filter((fornecedor) =>
        removerAcentos(fornecedor.nome).includes(buscaNormalizada)
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  mounted() {
    this.buscarFornecedores();
  },

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    irParaFornecedoresEdicao(id: number) {
      this.$router.push(ROUTES.fornecedores.ver(id));
    },

    irParaAddFornecedor() {
      this.$router.push(ROUTES.fornecedores.new);
    },

    async buscarFornecedores() {
      const response = await api.get<Fornecedor[]>('/fornecedores');

      this.fornecedores = response.data;
    },
  },
});
</script>

<template>
  <div>
    <h1>Página de Fornecedores</h1>

    <input type="text" v-model="busca" placeholder="Buscar pelo nome" />

    <br />

    <v-btn @click="irParaAddFornecedor">Adicionar fornecedor</v-btn>
    <br />
    <v-btn @click="irParaODashboard">Dashboard</v-btn>

    <br />

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
        <tr v-for="item in fornecedoresPaginados" :key="item.id">
          <td>{{ item.nome }}</td>
          <td>{{ item.cargo }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.telefone }}</td>

          <td>
            <v-btn @click="irParaFornecedoresEdicao(item.id)">Ver</v-btn>
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
        :disabled="paginaAtual * itensPorPagina >= fornecedorFiltrado.length"
      >
        Próximo
      </v-btn>
    </div>

    <Footer />
  </div>
</template>

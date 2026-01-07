<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';

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

      return this.fornecedorFiltradoPorNome.slice(inicio, fim);
    },

    fornecedorFiltradoPorNome(): Fornecedor[] {
      if (!this.busca) {
        return this.fornecedores;
      }

      const buscaNormalizada = this.removerAcentos(this.busca);

      return this.fornecedores.filter((fornecedor) =>
        this.removerAcentos(fornecedor.nome).includes(buscaNormalizada)
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
      this.$router.push('/dashboard');
    },

    irParaFornecedoresEdicao(id: number) {
      this.$router.push(`/dashboard/fornecedores/${id}`);
    },

    irParaAddFornecedor() {
      this.$router.push(`/dashboard/fornecedores/new`);
    },

    // to-do: rever esse conceito
    removerAcentos(texto: string) {
      return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
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

    <button @click="irParaAddFornecedor">Adicionar fornecedor</button>
    <br />
    <button @click="irParaODashboard">Dashboard</button>

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
            <button @click="irParaFornecedoresEdicao(item.id)">Ver</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <button @click="paginaAtual--" :disabled="paginaAtual === 1">
        Anterior
      </button>

      <span>Página {{ paginaAtual }}</span>

      <button
        @click="paginaAtual++"
        :disabled="
          paginaAtual * itensPorPagina >= fornecedorFiltradoPorNome.length
        "
      >
        Próximo
      </button>
    </div>

    <Footer />
  </div>
</template>

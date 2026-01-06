<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent, onMounted, ref } from 'vue';
import api from '@/services/api';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';

export default defineComponent({
  name: 'FornecedoresPage',

  components: {
    Footer,
  },

  data() {
    return {
      tabela: [] as Fornecedor[],
    };
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

    async buscarFornecedores() {
      const response = await api.get<Fornecedor[]>('/fornecedores');

      this.tabela = response.data;

      console.log(response.data);
    },
  },
});
</script>

<template>
  <div>
    <h1>Página de Fornecedores</h1>

    <button @click="irParaAddFornecedor">Adicionar fornecedor</button>
    <br />
    <button @click="irParaODashboard">Dashboard</button>

    <p>(to-do) campo de busca</p>

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
        <tr v-for="item in tabela" :key="item.id">
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

    <Footer />
  </div>
</template>

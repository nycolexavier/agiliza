<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FornecedorEditarPage',

  components: {
    Footer,
  },

  data() {
    return {
      fornecedorEdicao: null as Fornecedor | null,
    };
  },

  mounted() {
    this.buscarFornecedores();
  },

  methods: {
    irParaOFornecedor() {
      this.$router.push(`/dashboard/fornecedores`);
    },

    async buscarFornecedores() {
      const response = await api.get(
        `/fornecedores/${this.fornecedorEdicao?.id}`
      );
      this.fornecedorEdicao = response.data;
    },
  },
});
</script>

<template>
  <div>
    <h1>Olá {{ fornecedorEdicao?.nome }}</h1>

    <button @click="irParaOFornecedor">Fornecedor</button>

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
        <tr>
          <td>{{ fornecedorEdicao?.nome }}</td>
          <td>{{ fornecedorEdicao?.cargo }}</td>
          <td>{{ fornecedorEdicao?.email }}</td>
          <td>{{ fornecedorEdicao?.status }}</td>
          <td>{{ fornecedorEdicao?.telefone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

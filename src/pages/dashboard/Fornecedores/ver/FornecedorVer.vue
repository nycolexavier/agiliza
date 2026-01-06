<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FornecedorVerPage',

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

    irParaFornecedorEditar(){
      this.$router.push(`/dashboard/fornecedores/${this.fornecedorEdicao?.id}/editar`)
    },

    async buscarFornecedores() {
    const id = this.$route.params.id;

      const response = await api.get(
        `/fornecedores/${id}`
      );
      this.fornecedorEdicao = response.data;

      console.log(this.fornecedorEdicao);
    },
  },
});
</script>

<template>
  <div>
    <h1>Oláaaaaaa {{ fornecedorEdicao?.nome }}</h1>

    <button @click="irParaOFornecedor">voltar para ver o fornecedor</button>

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

          <td>
            <button @click="irParaFornecedorEditar">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

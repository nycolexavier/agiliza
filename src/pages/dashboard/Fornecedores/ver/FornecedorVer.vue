<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import { ROUTES } from '@/router/utils/routes';
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
      this.$router.push(ROUTES.fornecedores.list);
    },

    irParaFornecedorEditar() {
      if (!this.fornecedorEdicao) return;
      this.$router.push(ROUTES.fornecedores.editar(this.fornecedorEdicao.id));
    },

    async buscarFornecedores() {
      const id = this.$route.params.id;

      const response = await api.get(`/fornecedores/${id}`);
      this.fornecedorEdicao = response.data;

      console.log(this.fornecedorEdicao);
    },
  },
});
</script>

<template>
  <div>
    <h1>Oláaaaaaa {{ fornecedorEdicao?.nome }}</h1>

    <v-btn @click="irParaOFornecedor">voltar para ver o fornecedor</v-btn>

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
            <v-btn @click="irParaFornecedorEditar">Editar</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

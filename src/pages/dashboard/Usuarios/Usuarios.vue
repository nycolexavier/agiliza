<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';

export default defineComponent({
  name: 'UsuariosPage',

  components: {
    Footer,
  },

  data() {
    return {
      tabela: [] as Usuario[],
    };
  },

  mounted() {
    this.buscarUsuarios();
  },

  methods: {
    irParaODashboard() {
      this.$router.push(`/dashboard`);
    },

    async buscarUsuarios() {
      try {
        console.log("entrou")
        const response = await api.get<Usuario[]>(`/usuarios`);
        this.tabela = response.data;

        console.log('response.data', response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      }
    },

    irParaCriarUsuario() {
      this.$router.push(`/dashboard/usuarios/new`);
    },

    irParaVerUsuarios(id: number) {
      this.$router.push(`/dashboard/usuarios/${id}`);
    },
  },
});
</script>

<template>
  <div>
    <h1>Página de Usuários</h1>

    <p>(to-do) campo de busca</p>

    <button @click="irParaCriarUsuario">adicionar usuários</button>

    <br />

    <button @click="irParaODashboard">Dashboard</button>

    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Nome</th>
          <th>Cargo</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>Telefone</th>
        </tr>
      </thead>

      <tbody v-if="tabela.length">
        <tr v-for="item in tabela" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nome }}</td>
          <td>{{ item.cargo }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.telefone }}</td>

          <td>
            <button @click="irParaVerUsuarios(item.id)">Editar</button>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="7">Nenhum usuário encontrado</td>
        </tr>
      </tbody>
    </table>

    <Footer />
  </div>
</template>

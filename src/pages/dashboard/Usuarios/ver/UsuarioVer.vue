<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UsuariosVerPage',

  components: {
    Footer,
  },

  data() {
    return {
      usuario: null as Usuario | null,
    };
  },

  mounted() {
    this.buscarUsuario();
  },

  methods: {
    irParaOUsuarios() {
      this.$router.push(ROUTES.usuarios.list);
    },

    irParaUsuarioEditar() {
      if (!this.usuario) return;
      this.$router.push(ROUTES.usuarios.editar(this.usuario?.id));
    },

    async buscarUsuario() {
      try {
        const id = this.$route.params.id;

        const response = await api.get(`/usuarios/${id}`);
        this.usuario = response.data;
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      }
    },
  },
});
</script>

<template>
  <div>
    <h1>Ver usuário {{ usuario?.nome }}</h1>

    <v-btn @click="irParaOUsuarios">Usuários</v-btn>

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

      <tbody>
        <tr>
          <td>{{ usuario?.id }}</td>
          <td>{{ usuario?.nome }}</td>
          <td>{{ usuario?.cargo }}</td>
          <td>{{ usuario?.email }}</td>
          <td>{{ usuario?.status }}</td>
          <td>{{ usuario?.telefone }}</td>

          <td>
            <v-btn @click="irParaUsuarioEditar">Editar</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
    <Footer />
  </div>
</template>

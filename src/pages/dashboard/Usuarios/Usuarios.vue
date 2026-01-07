<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';

export default defineComponent({
  name: 'UsuariosPage',

  components: {
    Footer,
  },

  data() {
    return {
      usuario: [] as Usuario[],
      busca: '',

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    usuariosPaginados(): Usuario[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.usuariosFiltrados.slice(inicio, fim);
    },

    usuariosFiltrados(): Usuario[] {
      if (!this.busca) {
        return this.usuario;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.usuario.filter((usuario) =>
        removerAcentos(usuario.nome).includes(buscaNormalizada)
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  mounted() {
    this.buscarUsuarios();
  },

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    async buscarUsuarios() {
      try {
        const response = await api.get<Usuario[]>(`/usuarios`);
        this.usuario = response.data;
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      }
    },

    irParaCriarUsuario() {
      this.$router.push(ROUTES.usuarios.new);
    },

    irParaVerUsuarios(id: number) {
      this.$router.push(ROUTES.usuarios.ver(id));
    },
  },
});
</script>

<template>
  <div>
    <h1>Página de Usuários</h1>

    <input type="text" v-model="busca" placeholder="Buscar usuário pelo nome" />

    <br />

    <v-btn @click="irParaCriarUsuario">adicionar usuários</v-btn>

    <br />

    <v-btn @click="irParaODashboard">Dashboard</v-btn>

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

      <tbody v-if="usuario.length">
        <tr v-for="item in usuariosPaginados" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nome }}</td>
          <td>{{ item.cargo }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.telefone }}</td>

          <td>
            <v-btn @click="irParaVerUsuarios(item.id)">Editar</v-btn>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="7">Nenhum usuário encontrado</td>
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
        :disabled="paginaAtual * itensPorPagina >= usuariosFiltrados.length"
      >
        Próximo
      </v-btn>
    </div>

    <Footer />
  </div>
</template>

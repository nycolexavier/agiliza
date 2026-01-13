<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';
import { UsuariosList } from '@/services/usuarios.services';
import PageHeader from '@/components/layouts/PageHeader.vue';
import SearchInput from '@/components/form/SearchInput.vue';

export default defineComponent({
  name: 'UsuariosPage',

  components: {
    Footer,
    PageHeader,
    SearchInput,
  },

  data() {
    return {
      usuario: [] as Usuario[],
      busca: '',

      paginaAtual: 1,
      itensPorPagina: 10,

      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Nome', key: 'nome' },
        { title: 'Cargo', key: 'cargo' },
        { title: 'E-mail', key: 'email' },
        { title: 'Status', key: 'status' },
        { title: 'Telefone', key: 'telefone' },
        { title: 'Ações', key: 'actions' },
      ],
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
        const response = await UsuariosList();
        this.usuario = response.data;
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      }
    },

    irParaCriarUsuario() {
      this.$router.push(ROUTES.usuarios.new);
    },

    irParaVerUsuarios(id: string) {
      this.$router.push(ROUTES.usuarios.ver(id));
    },
  },
});
</script>

<template>
  <v-contatiner fuild>
    <PageHeader
      title="Usuários"
      actionLabel="Adicionar usuário"
      @action="irParaCriarUsuario"
    />

    <SearchInput v-model="busca" label="Buscar usuário pelo nome" />

    <v-card variant="outlined">
      <v-data-table :headers="headers" :items="usuariosPaginados">
        <template #item.actions="{ item }">
          <v-btn
            size="small"
            variant="outlined"
            @click="irParaVerUsuarios(item.id)"
          >
            Ver mais
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-row class="mt-4" justify="center" align="center">
      <v-btn
        variant="outlined"
        @click="paginaAtual--"
        :disabled="paginaAtual === 1"
      >
        Anterior
      </v-btn>
      <span class="mx-4">Página {{ paginaAtual }}</span>

      <v-btn
        variant="outlined"
        @click="paginaAtual++"
        :disabled="paginaAtual * itensPorPagina >= usuariosFiltrados.length"
      >
        Próximo
      </v-btn>
    </v-row>
  </v-contatiner>
</template>

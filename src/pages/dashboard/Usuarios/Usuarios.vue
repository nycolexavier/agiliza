<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';
import { UsuariosList } from '@/services/usuarios.services';
import PageHeader from '@/components/layouts/PageHeader.vue';
import SearchInput from '@/components/form/SearchInput.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import BaseTable from '@/components/base/BaseTable.vue';

export default defineComponent({
  name: 'UsuariosPage',

  components: {
    Footer,
    BaseTable,
    PageHeader,
    SearchInput,
    BasePagination,
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

    <BaseTable
      :headers="headers"
      :items="usuariosPaginados"
      actionLabel="Editar"
      @action="(item) => irParaVerUsuarios(item.id)"
    />

    <BasePagination
      v-model:paginaAtual="paginaAtual"
      :itensPorPagina="itensPorPagina"
      :totalItens="usuariosFiltrados.length"
    />
  </v-contatiner>
</template>

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
import TelefoneFormatado from '@/components/formatters/TelefoneFormatado.vue';

export default defineComponent({
  name: 'UsuariosPage',

  components: {
    Footer,
    BaseTable,
    PageHeader,
    SearchInput,
    BasePagination,
    TelefoneFormatado,
  },

  data() {
    return {
      usuarios: [] as Usuario[],
      busca: '',

      isLoading: false,

      paginaAtual: 1,
      itensPorPagina: 10,

      headers: [
        { title: 'Nome', key: 'name' },
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
        return this.usuarios;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.usuarios.filter((usuario) => {
        const texto = removerAcentos(
          `${usuario.name} ${usuario.email} ${usuario.cargo} ${usuario.telefone} ${usuario.status} ${usuario.id} `,
        );
        return texto.includes(buscaNormalizada);
      });
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
        this.isLoading = true;
        const response = await UsuariosList();
        this.usuarios = response.data;
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      } finally {
        this.isLoading = false;
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
      v-if="!isLoading"
      :headers="headers"
      :items="usuariosPaginados"
      actionLabel="Ver +"
      @action="(item) => irParaVerUsuarios(item.id)"
    >
      <template #item.telefone="{ item }">
        <TelefoneFormatado :telefone="item.telefone" />
      </template>
    </BaseTable>

    <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate />
      <p>Carregando usuários...</p>
    </div>

    <BasePagination
      v-model:paginaAtual="paginaAtual"
      :itensPorPagina="itensPorPagina"
      :totalItens="usuariosFiltrados.length"
    />
  </v-contatiner>
</template>

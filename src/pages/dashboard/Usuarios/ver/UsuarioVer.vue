<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { ROUTES } from '@/router/utils/routes';
import { UsuariosListID } from '@/services/usuarios.services';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import DetailsCard from '@/components/card/DetailsCard.vue';

export default defineComponent({
  name: 'UsuariosVerPage',

  components: {
    Footer,
    PageHeader,
    DetailsCard,
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

        if (typeof id === 'string') {
          const response = await UsuariosListID(id);
          this.usuario = response.data;
        }
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      :title="`Usuário: ${usuario?.nome}`"
      showBack
      backLabel="Voltar para usuarios"
      actionLabel="Editar usuario"
      :actionDisabled="!usuario"
      @back="irParaOUsuarios"
      @action="irParaUsuarioEditar"
    />

    <DetailsCard
      :items="[
        { label: 'ID', value: usuario?.id },
        { label: 'Nome', value: usuario?.nome },
        {
          label: 'Status',
          value: usuario?.status === 'ativo' ? 'Ativo' : 'Inativo',
        },
        { label: 'Status', value: usuario?.status },
        { label: 'Telefone', value: usuario?.telefone },
      ]"
    />

    <Footer />
  </BaseFormContainer>
</template>

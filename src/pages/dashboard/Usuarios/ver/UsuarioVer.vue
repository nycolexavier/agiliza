<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { ROUTES } from '@/router/utils/routes';
import { UsuariosListID } from '@/services/usuarios.services';
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
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="8">
        <h2>Usuário</h2>

        <p v-if="usuario" class="text-medium-emphasis">{{ usuario?.nome }}</p>
      </v-col>

      <v-col cols="12" md="4" class="text-end">
        <v-btn variant="outlined" @click="irParaOUsuarios"> Voltar </v-btn>
      </v-col>
    </v-row>

    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <strong>ID</strong>
            <div>{{ usuario?.id }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Nome</strong>
            <div>{{ usuario?.cargo }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>E-mail</strong>
            <div>{{ usuario?.status }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Telefone</strong>
            <div>{{ usuario?.telefone }}</div>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" class="d-flex justify-end">
            <v-btn color="primary" @click="irParaUsuarioEditar">
              Editar usuário
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <Footer />
  </BaseFormContainer>
</template>

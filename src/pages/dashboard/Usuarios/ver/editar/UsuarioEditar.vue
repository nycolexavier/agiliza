<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { ROUTES } from '@/router/utils/routes';
import { UsuariosIDPatch, UsuariosListID } from '@/services/usuarios.services';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import FormCard from '@/components/form/FormCard.vue';
import { emailRules } from '@/utils/validators/emailRules';

export default defineComponent({
  name: 'UsuarioEditarPage',

  components: {
    Footer,
    FormCard,
    PageHeader,
  },

  data() {
    return {
      usuario: null as Usuario | null,

      emailRules,

      form: {
        name: '',
        email: '',
        telefone: '',
      },

      snackbar: false,
      snackbarTexto: '',
      snackbarCor: 'success',
    };
  },

  mounted() {
    this.buscarUsuario();
  },

  methods: {
    irParaOUsuario() {
      if (!this.usuario) return;
      this.$router.push(ROUTES.usuarios.ver(this.usuario?.id));
    },

    async buscarUsuario() {
      try {
        const id = this.$route.params.id;

        if (typeof id === 'string') {
          const response = await UsuariosListID(id);
          this.usuario = response.data;

          this.form.name = response.data.name;
          this.form.email = response.data.email;
          this.form.telefone = response.data.telefone;
        }
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      }
    },

    async enviarForm() {
      try {
        const id = this.$route.params.id;

        if (typeof id === 'string') {
          const response = await UsuariosIDPatch(id, this.form);

          (this.snackbarTexto = 'Usuario editado com sucesso'),
            (this.snackbarCor = 'success');
          this.snackbar = true;

          setTimeout(() => {
            this.$router.push(ROUTES.usuarios.list);
          }, 1000);
          return response;
        }
      } catch (error) {}
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      :title="`Editar usário: ${usuario?.name}`"
      showBack
      backLabel="Voltar para ver o usário"
      @back="irParaOUsuario"
    />

    <FormCard submitLabel="Salvar alterações" @submit="enviarForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.name" label="Nome" variant="outlined" />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.email"
            label="E-mail"
            :rules="emailRules"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.telefone"
            label="Telefone"
            variant="outlined"
          />
        </v-col>
      </v-row>
    </FormCard>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarCor"
      timeout="3000"
      location="top right"
    >
      {{ snackbarTexto }}
    </v-snackbar>
  </BaseFormContainer>
</template>

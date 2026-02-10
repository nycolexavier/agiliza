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
        senha: '',
        status: null as 'ativo' | 'inativo' | null,
      },

      showSenha: false,
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
          this.form.status = response.data.status;
        }
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      }
    },

    async enviarForm() {
      try {
        const id = this.$route.params.id;
        if (typeof id === 'string') {
          const payload: any = {
            name: this.form.name,
            email: this.form.email,
            telefone: this.form.telefone,
          };

          if (this.form.senha && this.form.senha.length >= 6) {
            payload.senha = this.form.senha;
          }

          await UsuariosIDPatch(id, payload);

          ((this.snackbarTexto = 'Usuario editado com sucesso'),
            (this.snackbarCor = 'success'));
          this.snackbar = true;

          setTimeout(() => {
            this.$router.push(ROUTES.usuarios.list);
          }, 1000);
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

        <v-col cols="12" md="6">
          <v-select
            v-model="form.status"
            :items="['ativo', 'inativo']"
            label="Status"
            variant="outlined"
            required
          />
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

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.senha"
            label="Nova senha"
            variant="outlined"
            :append-icon="showSenha ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="showSenha = !showSenha"
            :type="showSenha ? 'text' : 'password'"
            :rules="[
              (v) =>
                !v || v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres',
            ]"
            placeholder="Deixe vazio para manter a senha atual"
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

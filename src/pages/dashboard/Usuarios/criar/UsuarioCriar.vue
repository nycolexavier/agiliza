<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { UsuariosPost } from '@/services/usuarios.services';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';

export default defineComponent({
  name: 'UsuarioCriarPage',

  components: {
    Footer,
    PageHeader,
  },

  data() {
    return {
      usuario: null as Usuario | null,

      form: {
        nome: '',
        cargo: '',
        email: '',
        status: 'ativo',
        telefone: '',
      },

      snackbar: false,
      snackbarTexto: '',
      snackbarCor: 'success',
    };
  },

  methods: {
    irParaUsuarios() {
      this.$router.push(ROUTES.usuarios.list);
    },

    async enviarForm() {
      try {
        await UsuariosPost(this.form);

        this.snackbarTexto = 'Usuário criado com sucesso';
        this.snackbarCor = 'success';
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.usuarios.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar usuário', error);
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <v-row class="mb-4">
      <v-col cols="12">
        <h2>Criar usuário</h2>
      </v-col>
    </v-row>

    <v-form @submit.prevent="enviarForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.nome"
            label="Nome"
            variant="outlined"
            required
            :rules="[(v) => !!v || 'Nome é obrigatório']"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.cargo"
            label="Cargo"
            variant="outlined"
            required
            :rules="[(v) => !!v || 'Cargo é obrigatório']"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="form.email" label="Email" variant="outlined" />
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="form.status"
            :items="['ativo', 'inativo']"
            label="Status"
            variant="outlined"
          />
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12" class="d-flex gap-4">
          <v-btn
            type="submit"
            color="primary"
            :disabled="!form.nome || !form.email || !form.cargo"
          >
            Criar Usuário
          </v-btn>

          <v-btn variant="outlined" @click="irParaUsuarios"> Voltar </v-btn>
        </v-col>
      </v-row>
    </v-form>

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

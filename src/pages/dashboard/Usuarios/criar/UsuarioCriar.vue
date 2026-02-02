<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { UsuariosPost } from '@/services/usuarios.services';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import { CARGOS, type Cargo } from '@/interfaces/Cargo';
import FormCard from '@/components/form/FormCard.vue';
import { emailRules } from '@/utils/validators/emailRules';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';

export default defineComponent({
  name: 'UsuarioCriarPage',

  components: {
    Footer,
    FormCard,
    PageHeader,
  },

  data() {
    return {
      usuario: null as Usuario | null,

      cargos: CARGOS,

      emailRules,

      form: {
        name: '',
        cargo: '' as Cargo,
        email: '',
        status: 'ativo' as Usuario['status'],
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
        const payload = {
          ...this.form,
          name: this.form.name.toLocaleLowerCase().trim(),
          email: this.form.name.toLocaleLowerCase().trim(),
        };

        await UsuariosPost(payload);

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
    <PageHeader
      title="Criar usuário"
      showBack
      backLabel="Voltar para usuários"
      @back="irParaUsuarios"
    />

    <FormCard @submit="enviarForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.name"
            label="Nome completo"
            variant="outlined"
            required
            :rules="[(v) => !!v || 'Nome é obrigatório']"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="form.cargo"
            :items="cargos"
            label="Cargo"
            variant="outlined"
            required
            :rules="[(v) => !!v || 'Cargo é obrigatório']"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="Email"
            variant="outlined"
          />
        </v-col>

        <!-- to-do: arrumar isso (status) -->
        <v-col cols="12" md="6">
          <v-select
            v-model="form.status"
            :items="['ativo', 'inativo']"
            label="Status"
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

      <template #actions>
        <v-btn
          type="submit"
          color="primary"
          :disabled="!form.name || !form.email || !form.cargo"
        >
          Criar Usuário
        </v-btn>

        <v-btn variant="outlined" @click="irParaUsuarios"> Voltar </v-btn>
      </template>
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

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

  data(vm) {
    return {
      usuario: null as Usuario | null,

      emailRules,

      form: {
        nome: '',
        cargo: '',
        email: '',
        status: 'ativo',
        telefone: '',
      },
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

          this.form.nome = response.data.nome;
          this.form.cargo = response.data.cargo;
          this.form.email = response.data.email;
          this.form.status = response.data.status;
          this.form.telefone = response.data.telefone;

          console.log(response.data);
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
      :title="`Editar usário: ${usuario?.id}`"
      showBack
      backLabel="Voltar para ver o usário"
      @back="irParaOUsuario"
    />

    <FormCard submitLabel="Salvar alterações" @submit="enviarForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.nome" label="Nome" variant="outlined" />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="form.cargo" label="Cargo" variant="outlined" />
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
  </BaseFormContainer>
</template>

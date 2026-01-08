<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UsuarioCriarPage',

  components: {
    Footer,
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
    };
  },

  methods: {
    irParaUsuarios() {
      this.$router.push(ROUTES.usuarios.list);
    },

    async enviarForm() {
      try {
        await api.post(`/usuarios`, {
          nome: this.form.nome,
          cargo: this.form.cargo,
          email: this.form.email,
          status: this.form.status,
          telefone: this.form.telefone,
        });

        console.log('Deu!');
      } catch (error) {
        console.error('Erro ao criar usuário', error);
      }
    },
  },
});
</script>

<template>
  <v-container fluid>
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
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.cargo"
            label="Cargo"
            variant="outlined"
            required
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.email"
            label="Telefone"
            variant="outlined"
          />
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
  </v-container>
</template>

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
  <div>
    <h1>Vamos criar um usuário</h1>

    <v-btn @click="irParaUsuarios">usuarios</v-btn>

    <form @submit.prevent="enviarForm">
      <input v-model="form.nome" placeholder="Nome" />
      <br />
      <input v-model="form.cargo" placeholder="cargo" />
      <br />
      <input type="email" v-model="form.email" placeholder="email" />
      <br />
      <input v-model="form.telefone" placeholder="telefone" />

      <v-btn type="submit" :disabled="!form.nome || !form.email || !form.cargo">
        Criar
      </v-btn>
    </form>
  </div>
</template>

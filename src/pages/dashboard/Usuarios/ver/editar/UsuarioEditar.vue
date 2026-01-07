<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UsuarioEditarPage',

  components: {
    Footer,
  },

  data(vm) {
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

        const response = await api.get(`/usuarios/${id}`);
        this.usuario = response.data;

        this.form.nome = response.data.nome;
        this.form.cargo = response.data.cargo;
        this.form.email = response.data.email;
        this.form.status = response.data.status;
        this.form.telefone = response.data.telefone;

        console.log(this.usuario?.nome);
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      }
    },

    async enviarForm() {
      try {
        console.log('Editou?');

        const response = await api.patch(`/usuarios/${this.usuario?.id}`, {
          nome: this.form.nome,
          cargo: this.form.cargo,
          email: this.form.email,
          telefone: this.form.telefone,
        });

        console.log('response', response);

        return response;
      } catch (error) {}
    },
  },
});
</script>

<template>
  <div>
    <h1>Ver usuário {{ usuario?.nome }}</h1>

    <v-btn @click="irParaOUsuario">Voltar para ver o usuário</v-btn>

    <form @submit.prevent="enviarForm">
      <input v-model="form.nome" placeholder="Nome" />
      <br />
      <input v-model="form.cargo" placeholder="cargo" />
      <br />
      <input type="email" v-model="form.email" placeholder="email" />
      <br />
      <input v-model="form.telefone" placeholder="telefone" />

      <v-btn type="submit" :disabled="!form.nome || !form.email || !form.cargo">
        Editar
      </v-btn>
    </form>
    <Footer />
  </div>
</template>

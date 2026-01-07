<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FornecedorEditarPage',

  components: {
    Footer,
  },

  data(vm) {
    return {
      fornecedor: null as Fornecedor | null,
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
    irParaOFornecedor() {
      if (!this.fornecedor) return;
      this.$router.push(ROUTES.fornecedores.ver(this.fornecedor?.id));
    },

    async buscarUsuario() {
      try {
        const id = this.$route.params.id;

        const response = await api.get(`/fornecedores/${id}`);
        this.fornecedor = response.data;

        this.form.nome = response.data.nome;
        this.form.cargo = response.data.cargo;
        this.form.email = response.data.email;
        this.form.status = response.data.status;
        this.form.telefone = response.data.telefone;

        console.log(this.fornecedor?.nome);
      } catch (error) {
        console.error('Erro ao buscar fornecedores', error);
      }
    },

    async enviarForm() {
      try {
        console.log('Editou?');

        const response = await api.patch(
          `/fornecedores/${this.fornecedor?.id}`,
          {
            nome: this.form.nome,
            cargo: this.form.cargo,
            email: this.form.email,
            telefone: this.form.telefone,
          }
        );

        console.log('response', response);

        return response;
      } catch (error) {}
    },
  },
});
</script>

<template>
  <div>
    <h1>Editar fornecedor {{ fornecedor?.nome }}</h1>

    <v-btn @click="irParaOFornecedor">Voltar para ver o fornecedor</v-btn>

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

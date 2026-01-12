<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { UsuariosIDPatch, UsuariosListID } from '@/services/usuarios.services';
import { defineComponent } from 'vue';
import { toPhysical } from 'vuetify/lib/util/anchor.mjs';

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

        if (typeof id === 'string') {
          const response = await UsuariosListID(id);
          this.usuario = response.data;

          this.form.nome = response.data.nome;
          this.form.cargo = response.data.cargo;
          this.form.email = response.data.email;
          this.form.status = response.data.status;
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
          return response;
        }
      } catch (error) {}
    },
  },
});
</script>

<template>
  <!-- <div>
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
  </div> -->

  <BaseFormContainer>
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="8">
        <h2>Editar usário</h2>

        <p v-if="usuario" class="text-medium-emphasis">
          {{ usuario?.nome }}
        </p>
      </v-col>

      <v-col cols="12" md="4" class="text-end">
        <v-btn variant="outlined" @click="irParaOUsuario"> Voltar </v-btn>
      </v-col>
    </v-row>

    <v-card variant="outlined">
      <v-card-text>
        <v-form @submite.prevent="enviarForm">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.nome"
                label="Nome"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.cargo"
                label="Cargo"
                variant="outlined"
              />
            </v-col>

            <v-col>
              <v-text-field
                v-model="form.email"
                label="E-mail"
                type="email"
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

          <v-row class="mt-4">
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                color="primary"
                type="submit"
                :disabled="!form.nome || !form.email || !form.cargo"
              >
                Salvar alterações
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </BaseFormContainer>
</template>

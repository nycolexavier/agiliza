<script lang="ts">
import BaseFormContainer from '@/components/base/BaseFormContainer.vue';
import BaseSnackbar from '@/components/base/BaseSnackbar.vue';
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { MarcaPost } from '@/services/marca';
import { defineComponent, reactive } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';

export default defineComponent({
  name: 'MarcaCriarPage',

  components: {
    Footer,
    PageHeader,
    BaseSnackbar,
  },

  data() {
    return {
      form: {
        nome: '',
        criadoEm: '',
        atualizadoEm: '',
      },

      snackbar: false,
      snackbarTexto: '',
      snackbarTipo: 'success',
    };
  },

  methods: {
    irParaMarca() {
      this.$router.push(ROUTES.marca.list);
    },

    async enviarForm() {
      try {
        await MarcaPost({
          nome: this.form.nome,
          criadoEm: this.form.criadoEm,
          atualizadoEm: this.form.atualizadoEm,
        });

        (this.snackbarTexto = 'Depósito criado com sucesso'),
          (this.snackbarTipo = 'success');
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.fornecedores.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar fornecedor', error);
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      :title="`Editar marca #{{ marca?.id }}`"
      showBack
      backLabel="Voltar para ver o marca"
      @back="irParaMarca"
    />

    <v-card variant="outlined">
      <v-card-text>
        <v-form @submit.prevent="enviarForm">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.nome"
                label="Nome"
                variant="outlined"
                required
                :rules="[(v) => !!v || 'Quantidade de medida é obrigatório']"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <BaseSnackbar
      v-model="snackbar"
      :texto="snackbarTexto"
      :tipo="snackbarTipo"
    />
  </BaseFormContainer>
</template>

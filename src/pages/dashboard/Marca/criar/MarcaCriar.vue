<script lang="ts">
import BaseFormContainer from '@/components/base/BaseFormContainer.vue';
import BaseSnackbar from '@/components/base/BaseSnackbar.vue';
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { MarcaPost } from '@/services/marca';
import { defineComponent } from 'vue';
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
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
        });

        (this.snackbarTexto = 'Marca criado com sucesso'),
          (this.snackbarTipo = 'success');
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.marca.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar marca', error);
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader title="Editar marca" showBack @back="irParaMarca" />

    <FormCard @submit="enviarForm">
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
      </v-row>

      <template #actions>
        <v-btn variant="outlined" @click="irParaMarca"> Cancelar </v-btn>

        <v-btn color="primary" type="submit" :disabled="!form.nome">
          Criar marca
        </v-btn>
      </template>
    </FormCard>

    <BaseSnackbar
      v-model="snackbar"
      :texto="snackbarTexto"
      :tipo="snackbarTipo"
    />
  </BaseFormContainer>
</template>

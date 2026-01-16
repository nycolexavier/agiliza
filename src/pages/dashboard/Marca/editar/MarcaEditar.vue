<script lang="ts">
import BaseFormContainer from '@/components/base/BaseFormContainer.vue';
import BaseSnackbar from '@/components/base/BaseSnackbar.vue';
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { MarcaPost } from '@/services/marca';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import FormCard from '@/components/form/FormCard.vue';

export default defineComponent({
  name: 'MarcaCriarPage',

  components: {
    Footer,
    FormCard,
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

        (this.snackbarTexto = 'Marca criadoa com sucesso'),
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

    <FormCard submitLabel="Salvar" :disabled="!form.nome" @submit="enviarForm">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.nome"
          label="Nome"
          variant="outlined"
          required
          :rules="[(v) => !!v || 'Nome é obrigatório']"
        />
      </v-col>
    </FormCard>

    <BaseSnackbar
      v-model="snackbar"
      :texto="snackbarTexto"
      :tipo="snackbarTipo"
    />
  </BaseFormContainer>
</template>

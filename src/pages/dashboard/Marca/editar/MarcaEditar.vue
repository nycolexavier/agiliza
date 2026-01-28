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
        isLoading: false,
      marca: '',
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
        this.isLoading = true;
        await MarcaPost({
          nome: this.form.nome,
          criadoEm: this.form.criadoEm,
          atualizadoEm: this.form.atualizadoEm,
        });

        (this.snackbarTexto = 'Marca criadoa com sucesso'),
          (this.snackbarTipo = 'success');
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.marca.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar fornecedor', error);
      }finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      :title="`Editar marca`"
      showBack
      backLabel="Voltar para ver o marca"
      @back="irParaMarca"
    />

    <FormCard   v-if="!isLoading" submitLabel="Salvar" :disabled="!form.nome" @submit="enviarForm">
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

        <div v-else class="text-center pa-4">
          <v-progress-circular indeterminate/>
          <p>Carregando marca...</p>
        </div>

    <BaseSnackbar
      v-model="snackbar"
      :texto="snackbarTexto"
      :tipo="snackbarTipo"
    />
  </BaseFormContainer>
</template>

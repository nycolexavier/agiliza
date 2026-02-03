<script lang="ts">
import BaseFormContainer from '@/components/base/BaseFormContainer.vue';
import BaseSnackbar from '@/components/base/BaseSnackbar.vue';
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { CategoriaPost } from '@/services/categoria';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import CreateFormCard from '@/components/form/CreateFormCard.vue';

export default defineComponent({
  name: 'CategoriaCriarPage',

  components: {
    Footer,
    PageHeader,
    BaseSnackbar,
    CreateFormCard,
  },

  data() {
    return {
       isLoading: false,
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
    irParaCategoria() {
      this.$router.push(ROUTES.categoria.list);
    },

    async enviarForm() {
      try {
        this.isLoading = true;
        await CategoriaPost({
          nome: this.form.nome.toLocaleLowerCase().trim(),
        });

        (this.snackbarTexto = 'Categoria criado com sucesso'),
          (this.snackbarTipo = 'success');
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.categoria.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar categoria', error);

          const mensagemErro =
    error?.response?.data?.message ||
    'Erro ao criar categoria. Tente novamente.';

  this.snackbarTexto = mensagemErro;
  this.snackbarTipo = 'error';
  this.snackbar = true;
      } finally{
          this.isLoading = false;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader title="Criar categoria" showBack @back="irParaCategoria" />

    <CreateFormCard
      v-if="!isLoading"
      submitLabel="Criar categoria"
      :disabled="!form.nome"
      @submit="enviarForm"
    >
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.nome"
          label="Nome"
          variant="outlined"
          required
          :rules="[(v) => !!v || 'Nome é obrigatório']"
        />
      </v-col>
    </CreateFormCard>

        <div v-else class="text-center pa-4">
          <v-progress-circular indeterminate/>
          <p>Carregando categoria...</p>
        </div>

    <BaseSnackbar
      v-model="snackbar"
      :texto="snackbarTexto"
      :tipo="snackbarTipo"
    />
  </BaseFormContainer>
</template>

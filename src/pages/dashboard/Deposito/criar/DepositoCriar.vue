<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { DepositoPost } from '@/services/deposito.services';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import FormCard from '@/components/form/FormCard.vue';
import CreateFormCard from '@/components/form/CreateFormCard.vue';

export default defineComponent({
  name: 'DepositoCriarPage',

  components: {
    Footer,
    PageHeader,
    FormCard,
    CreateFormCard,
  },

  data() {
    return {
      isLoading: false,

      form: {
        corredor: '',
        temProduto: false,
      },

      snackbar: false,
      snackbarTexto: '',
      snackbarCor: '',
      snackbarTipo: '',
    };
  },

  methods: {
    irParaODeposito() {
      this.$router.push(ROUTES.deposito.list);
    },

    async enviarForm() {
      try {
        this.isLoading = true;
        const response = await DepositoPost(this.form);

        ((this.snackbarTexto = 'Depósito criado com sucesso'),
          (this.snackbarCor = 'success'));
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.deposito.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar um depósito');

        const mensagemErro =
          error?.response?.data?.message ||
          'Erro ao criar depósito. Tente novamente.';

        this.snackbarTexto = mensagemErro;
        this.snackbarCor = 'error';
        this.snackbarTipo = 'error';
        this.snackbar = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title="Criar depósito"
      showBack
      backLabel="Voltar para depósitos"
      @back="irParaODeposito"
    />

    <CreateFormCard
      v-if="!isLoading"
      submitLabel="Criar depósito"
      :disabled="!form.corredor"
      @submit="enviarForm"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.corredor" label="Corredor" required />
        </v-col>
      </v-row>
    </CreateFormCard>

    <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate />
      <p>Carregando depósitos...</p>
    </div>

    <Footer />

    <v-snackbar
      v-model="snackbar"
      :color="snackbarCor"
      timeout="3000"
      location="top right"
    >
      {{ snackbarTexto }}
    </v-snackbar>
  </BaseFormContainer>
</template>

<script lang="ts">
import BaseFormContainer from '@/components/base/BaseFormContainer.vue';
import BaseSnackbar from '@/components/base/BaseSnackbar.vue';
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { FornecedoresPost } from '@/services/fornecedores';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import CreateFormCard from '@/components/form/CreateFormCard.vue';
import { emailRules } from '@/utils/validators/emailRules';
import type { Status } from '@/interfaces/Status';

export default defineComponent({
  name: 'FornecedorCriarPage',

  components: {
    Footer,
    PageHeader,
    BaseSnackbar,
    CreateFormCard,
  },

  data() {
    return {
      isLoading: false,

      emailRules,
      form: {
        nome: '',
        email: '',
        status: 'ativo' as Status,
        telefone: '',
      },

      snackbar: false,
      snackbarTexto: '',
      snackbarTipo: 'success',
    };
  },

  methods: {
    irParaFornecedor() {
      this.$router.push(ROUTES.fornecedores.list);
    },

    async enviarForm() {
      try {
        this.isLoading = true;
        const payload = {
          ...this.form,
          nome: this.form.nome.toLocaleLowerCase().trim(),
          email: this.form.email.toLocaleLowerCase().trim(),
        };

        await FornecedoresPost(payload);

        ((this.snackbarTexto = 'Fornecedor criado com sucesso'),
          (this.snackbarTipo = 'success'));
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.fornecedores.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar fornecedor', error);

                console.error('Erro ao criar fornecedor', error);

          const mensagemErro =
    error?.response?.data?.message ||
    'Erro ao criar marca. Tente novamente.';

  this.snackbarTexto = mensagemErro;
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
      title="Cadastrar fornecedor"
      showBack
      backLabel="Voltar para fornecedor"
      @back="irParaFornecedor"
    />

    <CreateFormCard
      v-if="!isLoading"
      submitLabel="Criar fornecedor"
      :disabled="!form.nome || !form.email"
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

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.email"
          label="E-mail"
          :rules="emailRules"
          variant="outlined"
          required
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.telefone"
          label="Telefone"
          variant="outlined"
          required
        />
      </v-col>
    </CreateFormCard>

    <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate />
      <p>Carregando fornecedores...</p>
    </div>

    <BaseSnackbar
      v-model="snackbar"
      :texto="snackbarTexto"
      :tipo="snackbarTipo"
    />
  </BaseFormContainer>
</template>

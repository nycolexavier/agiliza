<script lang="ts">
import BaseFormContainer from '@/components/base/BaseFormContainer.vue';
import BaseSnackbar from '@/components/base/BaseSnackbar.vue';
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { FornecedoresPost } from '@/services/fornecedores';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';

export default defineComponent({
  name: 'FornecedorCriarPage',

  components: {
    Footer,
    PageHeader,
    BaseSnackbar,
  },

  data() {
    return {
      form: {
        nome: '',
        cargo: '',
        email: '',
        status: 'ativo',
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
        await FornecedoresPost(this.form);

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
      title="Cadastrar fornecedor"
      showBack
      backLabel="Voltar para fornecedor"
      @back="irParaFornecedor"
    />

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

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.cargo"
            label="Cargo"
            variant="outlined"
            required
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.email"
            label="E-mail"
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
      </v-row>

      <template #actions>
        <v-btn variant="outlined" @click="irParaFornecedor"> Cancelar </v-btn>

        <v-btn
          color="primary"
          type="submit"
          :disabled="!form.nome || !form.cargo || !form.email"
        >
          Criar fornecedor
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

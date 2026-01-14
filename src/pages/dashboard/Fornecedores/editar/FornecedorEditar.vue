<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import { ROUTES } from '@/router/utils/routes';
import {
  FornecedoresIDPatch,
  FornecedoresListID,
} from '@/services/fornecedores';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import FormCard from '@/components/form/FormCard.vue';
import { emailRules } from '@/utils/validators/emailRules';

export default defineComponent({
  name: 'FornecedorEditarPage',

  components: {
    Footer,
    PageHeader,
    FormCard,
  },

  data(vm) {
    return {
      fornecedor: null as Fornecedor | null,
      emailRules,
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
        if (typeof id === 'string') {
          const response = await FornecedoresListID(id);
          this.fornecedor = response.data;

          this.form.nome = response.data.nome;
          this.form.cargo = response.data.cargo;
          this.form.email = response.data.email;
          this.form.status = response.data.status;
          this.form.telefone = response.data.telefone;
        }
      } catch (error) {
        console.error('Erro ao buscar fornecedores', error);
      }
    },

    async enviarForm() {
      try {
        const id = this.$route.params.id;

        if (typeof id === 'string') {
          const response = await FornecedoresIDPatch(id, this.form);

          return response;
        }
      } catch (error) {}
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title="Editar fornecedor"
      :subtitle="fornecedor?.nome"
      :showBack="true"
      @back="irParaOFornecedor"
    />

    <FormCard
      submitLabel="Salvar alterações"
      :disabled="!form?.nome || !form?.email || !form?.cargo"
      showCancel
      @submit="enviarForm"
    >
      <v-col cols="12" md="6">
        <v-text-field v-model="form.cargo" label="Cargo" variant="outlined" />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.email"
          :rules="emailRules"
          label="E-mail"
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
    </FormCard>
  </BaseFormContainer>
</template>

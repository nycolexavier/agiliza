<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { ProdutosPost } from '@/services/Produtos';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import CreateFormCard from '@/components/form/CreateFormCard.vue';
import type { Status } from '@/interfaces/Status';

export default defineComponent({
  name: 'ProdutoCriarPage',

  components: {
    Footer,
    PageHeader,
    CreateFormCard,
  },

  data() {
    return {
      form: {
        nome: '',
        sku: '',
        quantidadeMedida: '',
        quantidadeProduto: '',
        status: 'ativo' as Status,
        categoria: '',
      },
      snackbar: false,
      snackbarTexto: '',
      snackbarCor: 'success',
    };
  },

  methods: {
    irParaOProduto() {
      this.$router.push(ROUTES.produtos.list);
    },

    async enviarForm() {
      try {
        await ProdutosPost({
          nome: this.form.nome,
          sku: this.form.sku,
          unidadeMedida: this.form.quantidadeMedida,
          quantidadeProduto: this.form.quantidadeProduto,
          status: this.form.status,
          categoria: this.form.categoria,
        });

        this.snackbarTexto = 'Produto criado com sucesso';
        this.snackbarCor = 'sucsess';
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.produtos.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar produto', error);
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title="Criar produto"
      showBack
      backLabel="Voltar para produtos"
      @back="irParaOProduto"
    />

    <CreateFormCard
      submitLabel="Criar produto"
      :disabled="
        !form.nome ||
        !form.categoria ||
        !form.quantidadeMedida ||
        !form.quantidadeProduto ||
        !form.sku
      "
      @submit="enviarForm"
    >
      <v-col cols="12" md="6">
        <v-text-field v-model="form.nome" label="Nome" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="form.sku" label="SKU" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.quantidadeMedida"
          label="Quantidade de medida"
          required
          :rules="[(v) => !!v || 'Quantidade de medida é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.quantidadeProduto"
          label="Quantidade de produto"
          required
          :rules="[(v) => !!v || 'Quantidade de produto é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.categoria"
          label="Categoria"
          required
          :rules="[(v) => !!v || 'Categoria é obrigatório']"
        />
      </v-col>
    </CreateFormCard>

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

<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { ProdutosPost } from '@/services/Produtos';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import CreateFormCard from '@/components/form/CreateFormCard.vue';
import type { Status } from '@/interfaces/Status';
import type { Categoria } from '@/interfaces/Categoria';
import { CategoriaList } from '@/services/categoria';
import CategoriaDialog from '@/components/categoria/CategoriaDialog.vue';

export default defineComponent({
  name: 'ProdutoCriarPage',

  components: {
    Footer,
    PageHeader,
    CreateFormCard,
    CategoriaDialog,
  },

  data() {
    return {
      isLoading: false,
      categorias: [] as Categoria[],
      dialogCategoria: false,

      form: {
        nome: '',
        sku: '',
        status: 'ativo' as Status,
        categoriaId: null as string | null,
        isPerecivel: false,
        descricao: '',
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
        this.isLoading = true;
        await ProdutosPost({
          nome: this.form.nome,
          sku: this.form.sku,
          descricao: '',
          // status: this.form.status,
          categoriaId: this.form.categoriaId!,
          isPerecivel: this.form.isPerecivel,
        });

        this.snackbarTexto = 'Produto criado com sucesso';
        this.snackbarCor = 'sucsess';
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.produtos.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar produto', error);
      } finally {
        this.isLoading = false;
      }
    },

    async categoriaCriada(novaCategoria: Categoria) {
      this.categorias.push(novaCategoria);
      this.form.categoriaId = novaCategoria.id;
    },
  },

  async mounted() {
    const response = await CategoriaList();
    this.categorias = response.data;
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
      v-if="!isLoading"
      submitLabel="Criar produto"
      :disabled="!form.nome || !form.categoriaId || !form.sku"
      @submit="enviarForm"
    >
      <v-col cols="12" md="6">
        <v-text-field v-model="form.nome" label="Nome" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="form.sku" label="SKU" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="form.categoriaId"
          :items="categorias"
          :item-title="(item) => item.nome"
          item-value="id"
          label="Categoria"
          clearable
          required
        />

        <v-btn
          variant="text"
          color="primary"
          class="mt-2"
          @click="dialogCategoria = true"
        >
          + Criar nova categoria
        </v-btn>
      </v-col>

      <v-col cols="12" md="6">
        <p class="mb-2 font-weight-medium">É perecível?</p>

        <v-switch
          v-model="form.isPerecivel"
          color="primary"
          inset
          :label="form.isPerecivel ? 'Sim' : 'Não'"
        />
      </v-col>
    </CreateFormCard>

    <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate />
      <p>Carregando produtos...</p>
    </div>

    <CategoriaDialog v-model="dialogCategoria" @created="categoriaCriada" />

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

<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Produto } from '@/interfaces/Produtos/Produto';
import { ROUTES } from '@/router/utils/routes';
import { ProdutosListID, ProdutosPost } from '@/services/Produtos';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';

export default defineComponent({
  name: 'ProdutosEditarPage',

  components: {
    Footer,
    PageHeader,
  },

  data(vm) {
    return {
       isLoading: false,
      produto: null as Produto | null,
      form: {
        nome: '',
        sku: '',
        quantidade: '',
        status: 'ativo',
        categoria: '',
      },
    };
  },

  mounted() {
    this.buscarProduto();
  },

  methods: {
    irParaOProduto() {
      if (!this.produto) return;
      this.$router.push(ROUTES.produtos.ver(this.produto?.id));
    },

    async buscarProduto() {
      try {
          this.isLoading = true;
        const id = this.$route.params.id;

        if (typeof id === 'string') {
          const response = await ProdutosListID(id);
          this.produto = response.data;

          this.form.nome = response.data.nome;
          this.form.sku = response.data.sku;
          this.form.quantidade = response.data.quantidade;
          this.form.status = response.data.status;
          this.form.categoria = response.data.categoria;
        }
      } catch (error) {
        console.error('Erro ao buscar produto', error);
      } finally {
              this.isLoading = false;
            }
    },

    async enviarForm() {
      try {
        const id = this.$route.params.id;
        if (typeof id === 'string') {
          const response = await ProdutosPost({
            nome: this.form.nome,
            sku: this.form.sku,
            quantidade: this.form.quantidade,
            status: 'ativo',
            categoria: this.form.categoria,
          });
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
      :title="`Editar produto: ${produto?.nome}`"
      showBack
      backLabel="Voltar para ver o produto"
      @back="irParaOProduto"
    />

    <FormCard
     v-if="!isLoading"
      submitLabel="Salvar alterações"
      :disabled="
        !form.nome ||
        !form.sku ||
        !form.quantidade ||
        !form.categoria
      "
      @submit="enviarForm"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.nome" label="Nome" required />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="form.sku" label="SKU" required />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.quantidade"
            label="Quantidade do produto"
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
      </v-row>
    </FormCard>

        <div v-else class="text-center pa-4">
          <v-progress-circular indeterminate/>
          <p>Carregando produtos...</p>
        </div>

    <Footer />
  </BaseFormContainer>
</template>

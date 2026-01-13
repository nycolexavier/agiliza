<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Produto } from '@/interfaces/Produtos/Produto';
import { ROUTES } from '@/router/utils/routes';
import { ProdutosListID } from '@/services/Produtos';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';

export default defineComponent({
  name: 'ProdutosVerPage',

  components: {
    Footer,
    PageHeader,
  },

  data() {
    return {
      produto: null as Produto | null,
    };
  },

  mounted() {
    this.buscarProduto();
  },

  methods: {
    irParaOsProdutos() {
      this.$router.push(ROUTES.produtos.list);
    },

    irParaProdutosEditar() {
      if (!this.produto) return;
      this.$router.push(ROUTES.produtos.editar(this.produto.id));
    },

    async buscarProduto() {
      const id = this.$route.params.id;
      if (typeof id === 'string') {
        const response = await ProdutosListID(id);
        this.produto = response.data;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <!-- Cabeçalho -->
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2>Produto: {{ produto?.nome }}</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" class="mr-2" @click="irParaOsProdutos">
          Voltar para produtos
        </v-btn>

        <v-btn
          color="primary"
          :disabled="!produto"
          @click="irParaProdutosEditar"
        >
          Editar produto
        </v-btn>
      </v-col>
    </v-row>

    <!-- Card de informações -->
    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <strong>ID</strong>
            <div>{{ produto?.id }}</div>
          </v-col>

          <v-col cols="12" md="4">
            <strong>Nome</strong>
            <div>{{ produto?.nome }}</div>
          </v-col>

          <v-col cols="12" md="4">
            <strong>SKU</strong>
            <div>{{ produto?.sku }}</div>
          </v-col>

          <v-col cols="12" md="4">
            <strong>Unidade de medida</strong>
            <div>{{ produto?.unidadeMedida }}</div>
          </v-col>

          <v-col cols="12" md="4">
            <strong>Quantidade</strong>
            <div>{{ produto?.quantidadeProduto }}</div>
          </v-col>

          <v-col cols="12" md="4">
            <strong>Categoria</strong>
            <div>{{ produto?.categoria }}</div>
          </v-col>

          <v-col cols="12" md="4">
            <strong>Status</strong>
            <div>{{ produto?.status }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <Footer />
  </BaseFormContainer>
</template>

<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Produto } from '@/interfaces/Produtos/Produto';
import { ROUTES } from '@/router/utils/routes';
import { ProdutosListID } from '@/services/Produtos';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import DetailsCard from '@/components/card/DetailsCard.vue';

export default defineComponent({
  name: 'ProdutosVerPage',

  components: {
    Footer,
    PageHeader,
    DetailsCard,
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
    <PageHeader
      :title="`Produto: ${produto?.nome}`"
      showBack
      backLabel="Voltar para produtos"
      actionLabel="Editar produto"
      :actionDisabled="!produto"
      @back="irParaOsProdutos"
      @action="irParaProdutosEditar"
    />

    <DetailsCard
      :items="[
        { label: 'ID', value: produto?.id },
        { label: 'Nome', value: produto?.nome },
        { label: 'SKU', value: produto?.sku },
        { label: 'Categoria', value: produto?.categoria },
        { label: 'Status', value: produto?.status },
      ]"
    />

    <Footer />
  </BaseFormContainer>
</template>

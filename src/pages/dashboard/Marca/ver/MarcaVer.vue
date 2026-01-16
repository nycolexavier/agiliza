<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Marca } from '@/interfaces/Marca';
import { ROUTES } from '@/router/utils/routes';
import { MarcaListID } from '@/services/marca';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import DetailsCard from '@/components/card/DetailsCard.vue';

export default defineComponent({
  name: 'MarcaVerPage',

  components: {
    Footer,
    PageHeader,
    DetailsCard,
  },

  data() {
    return {
      marca: null as Marca | null,
    };
  },

  mounted() {
    this.buscarProduto();
  },

  methods: {
    irParaOsMarca() {
      this.$router.push(ROUTES.marca.list);
    },

    irParaMarcaEditar() {
      if (!this.marca) return;
      this.$router.push(ROUTES.marca.editar(this.marca.id));
    },

    async buscarProduto() {
      const id = this.$route.params.id;
      if (typeof id === 'string') {
        const response = await MarcaListID(id);
        this.marca = response.data;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      :title="`Marca: ${marca?.nome}`"
      showBack
      backLabel="Voltar para marcas"
      actionLabel="Editar marca"
      :actionDisabled="!marca"
      @back="irParaOsMarca"
      @action="irParaMarcaEditar"
    />

    <DetailsCard
      :items="[
        { label: 'ID', value: marca?.id },
        { label: 'Nome', value: marca?.nome },
      ]"
    />

    <Footer />
  </BaseFormContainer>
</template>

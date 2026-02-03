<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Categoria } from '@/interfaces/Categoria';
import { ROUTES } from '@/router/utils/routes';
import { CategoriaListID } from '@/services/categoria';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import DetailsCard from '@/components/card/DetailsCard.vue';

export default defineComponent({
  name: 'CategoriaVerPage',

  components: {
    Footer,
    PageHeader,
    DetailsCard,
  },

  data() {
    return {
        isLoading: false,
      categoria: null as Categoria | null,
    };
  },

  mounted() {
    this.buscarProduto();
  },

  methods: {
    irParaOsCategoria() {
      this.$router.push(ROUTES.categoria.list);
    },

    irParaCategoriaEditar() {
      if (!this.categoria) return;
      this.$router.push(ROUTES.categoria.editar(this.categoria.id));
    },

    async buscarProduto() {
      try{
 this.isLoading = true;
        const id = this.$route.params.id;
        if (typeof id === 'string') {
          const response = await CategoriaListID(id);
          this.categoria = response.data;
        }
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
      :title="`Categoria: ${categoria?.nome}`"
      showBack
      backLabel="Voltar para categorias"
      actionLabel="Editar categoria"
      :actionDisabled="!categoria"
      @back="irParaOsCategoria"
      @action="irParaCategoriaEditar"
    />

    <DetailsCard
     v-if="!isLoading"
      :items="[
        { label: 'ID', value: categoria?.id },
        { label: 'Nome', value: categoria?.nome },
      ]"
    />

        <div v-else class="text-center pa-4">
          <v-progress-circular indeterminate/>
          <p>Carregando categoria...</p>
        </div>

    <Footer />
  </BaseFormContainer>
</template>

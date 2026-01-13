<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Marca } from '@/interfaces/Marca';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { MarcaListID } from '@/services/marca';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';

export default defineComponent({
  name: 'MarcaVerPage',

  components: {
    Footer,
    PageHeader,
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
    irParaOsProdutos() {
      this.$router.push(ROUTES.marca.list);
    },

    irParaProdutosEditar() {
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
      @back="irParaOsProdutos"
      @action="irParaProdutosEditar"
    />

    <!-- Card de informações -->
    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <strong>ID</strong>
            <div>{{ marca?.id }}</div>
          </v-col>

          <v-col cols="12" md="4">
            <strong>Nome</strong>
            <div>{{ marca?.nome }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <Footer />
  </BaseFormContainer>
</template>

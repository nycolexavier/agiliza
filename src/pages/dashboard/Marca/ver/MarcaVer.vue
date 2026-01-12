<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Marca } from '@/interfaces/Marca';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MarcaVerPage',

  components: {
    Footer,
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
      const response = await api.get(`/marcas/${id}`);
      this.marca = response.data;
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <!-- Cabeçalho -->
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2>Marca: {{ marca?.nome }}</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" class="mr-2" @click="irParaOsProdutos">
          Voltar para marcas
        </v-btn>

        <v-btn
          color="primary"
          :disabled="!marca"
          @click="irParaProdutosEditar"
        >
          Editar marca
        </v-btn>
      </v-col>
    </v-row>

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

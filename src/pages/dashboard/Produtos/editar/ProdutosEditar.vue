<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Produto } from '@/interfaces/Produtos/Produto';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProdutosEditarPage',

  components: {
    Footer,
  },

  data(vm) {
    return {
      produto: null as Produto | null,
      form: {
        nome: '',
        sku: '',
        unidadeMedida: '',
        quantidadeProduto: '',
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
        const id = this.$route.params.id;

        const response = await api.get(`/produtos/${id}`);
        this.produto = response.data;

        this.form.nome = response.data.nome;
        this.form.sku = response.data.sku;
        this.form.unidadeMedida = response.data.unidadeMedida;
        this.form.quantidadeProduto = response.data.quantidadeProduto;
        this.form.status = response.data.status;
        this.form.categoria = response.data.categoria;
      } catch (error) {
        console.error('Erro ao buscar produto', error);
      }
    },

    async enviarForm() {
      try {
        const response = await api.patch(`/produtos/${this.produto?.id}`, {
          nome: this.form.nome,
          sku: this.form.sku,
          unidadeMedida: this.form.unidadeMedida,
          quantidadeProduto: this.form.quantidadeProduto,
          categoria: this.form.categoria,
        });

        return response;
      } catch (error) {}
    },
  },
});
</script>

<template>
  <v-container fluid>
    <!-- Cabeçalho -->
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2>Editar produto: {{ produto?.nome }}</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" class="mr-2" @click="irParaOProduto">
          Voltar para o produto
        </v-btn>
      </v-col>
    </v-row>

    <!-- Card do formulário -->
    <v-card variant="outlined">
      <v-card-text>
        <v-form @submit.prevent="enviarForm">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.nome" label="Nome" required />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="form.sku" label="SKU" required />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.unidadeMedida"
                label="Unidade de medida"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.quantidadeProduto"
                label="Quantidade do produto"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.categoria"
                label="Categoria"
                required
              />
            </v-col>
          </v-row>

          <!-- Ações -->
          <v-row class="mt-4">
            <v-col cols="12" class="text-end">
              <v-btn
                type="submit"
                color="primary"
                :disabled="
                  !form.nome ||
                  !form.sku ||
                  !form.unidadeMedida ||
                  !form.quantidadeProduto ||
                  !form.categoria
                "
              >
                Salvar alterações
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <Footer />
  </v-container>
</template>

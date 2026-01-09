<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProdutoCriarPage',

  components: {
    Footer,
  },

  data() {
    return {
      form: {
        nome: '',
        sku: '',
        quantidadeMedida: '',
        quantidadeProduto: '',
        status: 'ativo',
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
        await api.post(`/produtos`, {
          nome: this.form.nome,
          sku: this.form.sku,
          quantidadeMedida: this.form.quantidadeMedida,
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
    <!-- Cabeçalho -->
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2>Criar produto</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" @click="irParaOProduto"> Produtos </v-btn>
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
          </v-row>

          <!-- Botão -->
          <v-row class="mt-4">
            <v-col cols="12" class="text-end">
              <v-btn
                type="submit"
                color="primary"
                :disabled="
                  !form.nome ||
                  !form.categoria ||
                  !form.quantidadeMedida ||
                  !form.quantidadeProduto ||
                  !form.sku
                "
              >
                Criar produto
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
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

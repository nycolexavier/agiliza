<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Lote } from '@/interfaces/Lotes/Lote';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { LoteIDPatch, LoteListID } from '@/services/lote';
import { defineComponent } from 'vue';
// to-do: fazer o create do lote e colocar o quantidadeProduto nele
export default defineComponent({
  name: 'ProdutosEditarPage',

  components: {
    Footer,
  },

  data(vm) {
    return {
      lote: null as Lote | null,
      form: {
        codigoLote: '',
        marca: '',
        produto: '',
        quantidadeProduto: '',
        status: 'ativo',
        dataValidade: '',
      },
    };
  },

  mounted() {
    this.buscarProduto();
  },

  methods: {
    irParaOProduto() {
      if (!this.lote) return;
      this.$router.push(ROUTES.lotes.ver(this.lote.id));
    },

    async buscarProduto() {
      try {
        const id = this.$route.params.id;

        if (typeof id === 'string') {
          const response = await LoteListID(id);
          this.lote = response.data;

          this.form.codigoLote = response.data.codigoLote;
          this.form.marca = response.data.marca;
          this.form.produto = response.data.produto;
          this.form.quantidadeProduto = response.data.quantidadeProduto;
          this.form.status = response.data.status;
          this.form.dataValidade = response.data.dataValidade;
        }
      } catch (error) {
        console.error('Erro ao buscar lote', error);
      }
    },

    async enviarForm() {
      try {
        const id = this.$route.params.id;
        if (typeof id === 'string') {
          const response = await LoteIDPatch(id, {
            codigoLote: this.form.codigoLote,
            marca: this.form.marca,
            produto: this.form.produto,
            quantidadeProduto: this.form.quantidadeProduto,
            dataValidade: this.form.dataValidade,
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
    <!-- Cabeçalho -->
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2>Editar lote {{ lote?.id }}</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" @click="irParaOProduto">
          Voltar para ver o lote
        </v-btn>
      </v-col>
    </v-row>

    <!-- Card do formulário -->
    <v-card variant="outlined">
      <v-card-text>
        <v-form @submit.prevent="enviarForm">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.codigoLote"
                label="Código do lote"
                variant="outlined"
                required
                :rules="[(v) => !!v || 'Código do lote é obrigatório']"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.marca"
                label="Marca"
                variant="outlined"
                required
                :rules="[(v) => !!v || 'Marca é obrigatório']"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.produto"
                label="Produto"
                variant="outlined"
                required
                :rules="[(v) => !!v || 'Produto é obrigatório']"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.quantidadeProduto"
                label="Quantidade do produto"
                variant="outlined"
                type="number"
                :rules="[(v) => !!v || 'Quantidade do produto é obrigatório']"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.dataValidade"
                label="Data de validade"
                type="date"
                variant="outlined"
                required
                :rules="[(v) => !!v || 'Data de validade é obrigatório']"
              />
            </v-col>
          </v-row>

          <!-- Ações -->
          <v-row class="mt-4">
            <v-col cols="12" class="text-end">
              <v-btn
                color="primary"
                type="submit"
                :disabled="
                  !form.codigoLote ||
                  !form.marca ||
                  !form.produto ||
                  !form.dataValidade
                "
              >
                Salvar alterações
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <Footer class="mt-6" />
  </BaseFormContainer>
</template>

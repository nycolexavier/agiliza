<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Lote } from '@/interfaces/Lotes/Lote';
import { ROUTES } from '@/router/utils/routes';
import { LoteIDPatch, LoteListID } from '@/services/lote';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import FormCard from '@/components/form/FormCard.vue';

// to-do: fazer o create do lote e colocar o quantidadeProduto nele
export default defineComponent({
  name: 'ProdutosEditarPage',

  components: {
    Footer,
    FormCard,
    PageHeader,
  },

  data(vm) {
    return {
       isLoading: false,
      lote: null as Lote | null,
      form: {
        codigoLote: '',
        marcaId: '',
        produtoId: '',
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
          this.form.marcaId = response.data.marcaId;
          this.form.produtoId = response.data.produtoId;
          this.form.status = response.data.status;
          this.form.dataValidade = response.data.dataValidade;
        }
      } catch (error) {
        console.error('Erro ao buscar lote', error);
      }
    },

    async enviarForm() {
      try {
        this.isLoading = true;
        const id = this.$route.params.id;
        if (typeof id === 'string') {
          const response = await LoteIDPatch(id, {
            codigoLote: this.form.codigoLote,
            marcaId: this.form.marcaId,
            produtoId: this.form.produtoId,
            dataValidade: this.form.dataValidade,
          });
          return response;
        }
      } catch (error) {console.error('Erro ao buscar lotes', error);
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
      :title="`Editar lote ${lote?.id}`"
      showBack
      backLabel="Voltar para ver o lote"
      @back="irParaOProduto"
    />

    <FormCard
     v-if="!isLoading"
      submitLabel="Salvar alterações"
      :disabled="
        !form.codigoLote || !form.marcaId || !form.produtoId || !form.dataValidade
      "
      @submit="enviarForm"
    >
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
          v-model="form.marcaId"
          label="Marca"
          variant="outlined"
          required
          :rules="[(v) => !!v || 'Marca é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.produtoId"
          label="Produto"
          variant="outlined"
          required
          :rules="[(v) => !!v || 'Produto é obrigatório']"
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
    </FormCard>

        <div v-else class="text-center pa-4">
          <v-progress-circular indeterminate/>
          <p>Carregando lotes...</p>
        </div>

    <Footer class="mt-6" />
  </BaseFormContainer>
</template>

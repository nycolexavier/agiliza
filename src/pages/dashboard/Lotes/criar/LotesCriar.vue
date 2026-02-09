<script lang="ts">
import BaseFormContainer from '@/components/base/BaseFormContainer.vue';
import BaseSnackbar from '@/components/base/BaseSnackbar.vue';
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { LotePost } from '@/services/lote';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import CreateFormCard from '@/components/form/CreateFormCard.vue';
import { emailRules } from '@/utils/validators/emailRules';
import { CARGOS } from '@/interfaces/Cargo';
import type { Status } from '@/interfaces/Status';
import { MarcaList } from '@/services/marca';
import { ProdutosList } from '@/services/Produtos';
import { dataNaoFutura } from '@/utils/validators/dateRules';
import {
  precoCustoMenorOuIgualVenda,
  precoVendaMaiorOuIgualCusto,
} from '@/utils/validators/priceRules';
import { DepositoListDisponiveis } from '@/services/deposito.services';
import { FornecedoresList } from '@/services/fornecedores';
// todo ver a questão da data de validade quando o produto não é pericivel
// não deixar adicionar lote que já venceu
// todo fazer o markdown
export default defineComponent({
  name: 'LoteCriarPage',

  components: {
    Footer,
    PageHeader,
    BaseSnackbar,
    CreateFormCard,
  },

  data() {
    return {
      isLoading: false,
      marcas: [] as { id: string; nome: string }[],
      produto: [] as { id: string; nome: string; isPerecivel: boolean }[],
      produtoSelecionado: null as {
        id: string;
        nome: string;
        isPerecivel: boolean;
      } | null,
      corredor: [] as { id: string; corredor: string }[],
      fornecedor: [] as { id: string; nome: string }[],

      hoje: new Date().toISOString().split('T')[0],

      cargos: CARGOS,

      emailRules,

      form: {
        codigoLote: '',
        marcaId: '',
        produtoId: '',
        depositoId: '',
        fornecedorId: '',
        status: 'ativo' as Status,
        dataValidade: '',
        precoCusto: 0,
        precoVenda: 0,
        codigoBarra: '',
        quantidade: 0,
      },

      snackbar: false,
      snackbarTexto: '',
      snackbarTipo: 'success',
    };
  },

  methods: {
    dataNaoFutura,
    precoCustoMenorOuIgualVenda,
    precoVendaMaiorOuIgualCusto,

    irParaFornecedor() {
      this.$router.push(ROUTES.lotes.list);
    },

    irParalotes() {
      this.$router.push(ROUTES.lotes.list);
    },

    onProdutoSelecionado(produtoId: string) {
      this.produtoSelecionado =
        this.produto.find((p) => p.id === produtoId) || null;

      if (this.produtoSelecionado && !this.produtoSelecionado.isPerecivel) {
        this.form.dataValidade = '';
      }
    },

    async enviarForm() {
      try {
        this.isLoading = true;
        await LotePost(this.form);

        ((this.snackbarTexto = 'Lotes criado com sucesso'),
          (this.snackbarTipo = 'success'));
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.lotes.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar lotes', error);
      } finally {
        this.isLoading = false;
      }
    },
  },

  async mounted() {
    try {
      const response = await MarcaList();
      this.marcas = response.data;
    } catch (error) {
      console.error('Erro ao buscar marcas', error);
    }

    try {
      const response = await ProdutosList();
      this.produto = response.data;
    } catch (error) {
      console.error('Erro ao buscar marcas', error);
    }

    try {
      const response = await DepositoListDisponiveis();
      this.corredor = response.data;
    } catch (error) {
      console.error('Erro ao buscar deposito', error);
    }

    try {
      const response = await FornecedoresList();
      this.fornecedor = response.data;
    } catch (error) {
      console.error('Erro ao buscar fornecedor', error);
    }
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title="Cadastrar lote"
      showBack
      backLabel="Voltar para lote"
      @back="irParalotes"
    />

    <CreateFormCard
      v-if="!isLoading"
      submitLabel="Criar lotes"
      :disabled="
        !form.codigoLote ||
        !form.marcaId ||
        !form.produtoId ||
        !form.depositoId ||
        !form.fornecedorId ||
        (produtoSelecionado?.isPerecivel && !form.dataValidade) ||
        !form.precoCusto ||
        !form.precoVenda ||
        !form.codigoBarra ||
        !form.quantidade
      "
      @submit="enviarForm"
    >
      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.codigoLote"
          label="Código Lote"
          variant="outlined"
          required
          :rules="[(v) => !!v || 'Lote é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="form.fornecedorId"
          label="Fornecedor"
          :items="fornecedor"
          item-title="nome"
          item-value="id"
          variant="outlined"
          required
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="form.marcaId"
          :items="marcas"
          item-title="nome"
          item-value="id"
          label="Marca"
          variant="outlined"
          required
          :rules="[(v) => !!v || 'Marca é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="form.produtoId"
          label="Produto"
          :items="produto"
          item-title="nome"
          item-value="id"
          variant="outlined"
          @update:modelValue="onProdutoSelecionado"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="form.depositoId"
          label="Corredor"
          :items="corredor"
          item-title="corredor"
          item-value="id"
          variant="outlined"
          required
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model.number="form.precoCusto"
          label="Preço de Custo"
          variant="outlined"
          type="number"
          min="0"
          step="0.01"
          required
          :rules="[
            (v) => !!v || 'Campo é obrigatório',
            (v) => v >= 0 || 'Valor deve ser positivo',
            (v) =>
              precoCustoMenorOuIgualVenda(Number(v), Number(form.precoVenda)),
          ]"
        />
      </v-col>

      <v-text-field
        v-model.number="form.precoVenda"
        label="Preço de Venda"
        variant="outlined"
        type="number"
        min="0"
        step="0.01"
        required
        :rules="[
          (v) => !!v || 'Campo é obrigatório',
          (v) => v >= 0 || 'Valor deve ser positivo',
          (v) =>
            precoVendaMaiorOuIgualCusto(Number(v), Number(form.precoCusto)),
        ]"
      />

      <v-col cols="12" md="6">
        <v-text-field
          v-model.number="form.quantidade"
          label="Quantidade Produto"
          type="number"
          variant="outlined"
          min="0"
          step="0.01"
          required
          :rules="[
            (v) => !!v || 'Campo é obrigatório',
            (v) => v >= 0 || 'Valor deve ser positivo',
          ]"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.codigoBarra"
          label="Código de barra"
          variant="outlined"
          required
          :rules="[(v) => !!v || 'Campo é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6" v-if="produtoSelecionado?.isPerecivel">
        <v-text-field
          v-model="form.dataValidade"
          label="Data de validade"
          type="date"
          required
        />
      </v-col>
    </CreateFormCard>

    <div v-else class="text-center pa-4">
      <v-progress-circular indeterminate />
      <p>Carregando lotes...</p>
    </div>

    <BaseSnackbar
      v-model="snackbar"
      :texto="snackbarTexto"
      :tipo="snackbarTipo"
    />
  </BaseFormContainer>
</template>

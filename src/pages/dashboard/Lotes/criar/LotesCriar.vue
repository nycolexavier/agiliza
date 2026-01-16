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
import { DepositoList } from '@/services/deposito.services';
import { FornecedoresList } from '@/services/fornecedores';

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
      marcas: [] as { id: string; nome: string }[],
      produto: [] as { id: string; nome: string }[],
      corredor: [] as { id: string; corredor: string }[],
      fornecedor: [] as { id: string; nome: string }[],

      hoje: new Date().toISOString().split('T')[0],

      cargos: CARGOS,

      emailRules,

      form: {
        codigoLote: '',
        marca: '',
        produto: '',
        corredor: '',
        fornecedor: '',
        status: 'ativo' as Status,
        dataValidade: '',
        precoCusto: '',
        precoVenda: '',
        codigoBarra: '',
        quantidade: '',
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

    async enviarForm() {
      try {
        await LotePost(this.form);

        (this.snackbarTexto = 'Lotes criado com sucesso'),
          (this.snackbarTipo = 'success');
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push(ROUTES.lotes.list);
        }, 1000);
      } catch (error) {
        console.error('Erro ao criar lotes', error);
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
      const response = await DepositoList();
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
      submitLabel="Criar lotes"
      :disabled="
        !form.codigoLote ||
        !form.marca ||
        !form.produto ||
        !form.dataValidade ||
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
          v-model="form.fornecedor"
          label="Fornecedor"
          :items="fornecedor"
          item-title="nome"
          item-value="nome"
          variant="outlined"
          required
        />
      </v-col>

      <!-- todo ver o que coloca esse: item-value="id"  ou item-value="nome"  -->
      <v-col cols="12" md="6">
        <v-select
          v-model="form.marca"
          :items="marcas"
          item-title="nome"
          item-value="nome"
          label="Marca"
          variant="outlined"
          required
          :rules="[(v) => !!v || 'Marca é obrigatório']"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="form.produto"
          label="Produto"
          :items="produto"
          item-title="nome"
          item-value="nome"
          variant="outlined"
          required
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="form.corredor"
          label="Corredor"
          :items="corredor"
          item-title="corredor"
          item-value="corredor"
          variant="outlined"
          required
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.precoCusto"
          label="Preço de Custo"
          variant="outlined"
          type="number"
          min="0"
          step="0.01"
          required
          :rules="[
            (v) => !!v || 'Campo é obrigatório',
            (v) => v >= 0 || 'Valor deve ser positivo',
            (v) => precoCustoMenorOuIgualVenda(v, form.precoVenda),
          ]"
        />
      </v-col>

      <v-text-field
        v-model="form.precoVenda"
        label="Preço de Venda"
        variant="outlined"
        type="number"
        min="0"
        step="0.01"
        required
        :rules="[
          (v) => !!v || 'Campo é obrigatório',
          (v) => v >= 0 || 'Valor deve ser positivo',
          (v) => precoVendaMaiorOuIgualCusto(v, form.precoCusto),
        ]"
      />

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.quantidade"
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

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.dataValidade"
          label="Data da validade"
          type="date"
          required
          :max="hoje"
          :rules="[(v) => !!v || 'Data é obrigatória', dataNaoFutura]"
          ,
          dataNaoFutura
        />
      </v-col>
    </CreateFormCard>

    <BaseSnackbar
      v-model="snackbar"
      :texto="snackbarTexto"
      :tipo="snackbarTipo"
    />
  </BaseFormContainer>
</template>

<script lang="ts">
import BaseFormContainer from '@/components/base/BaseFormContainer.vue';
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import type { DashboardResumo } from '@/interfaces/Dashboard';
import { DashboardGet } from '@/services/dashboard.services';

export default defineComponent({
  name: 'DashboardPage',

  components: {
    Footer,
    PageHeader,
  },

  data(vm) {
    return {
      resumo: null as DashboardResumo | null,
    };
  },

  methods: {
    irParaUsuarios() {
      this.$router.push(ROUTES.usuarios.list);
    },

    irParaFornecedores() {
      this.$router.push(ROUTES.fornecedores.list);
    },

    irParaProdutos() {
      this.$router.push(ROUTES.produtos.list);
    },

    irParaDeposito() {
      this.$router.push(ROUTES.deposito.list);
    },

    irParaLotes() {
      this.$router.push(ROUTES.lotes.list);
    },

    irParaMovimentacao() {
      this.$router.push(ROUTES.movimentacao.list);
    },

    irParaMarca() {
      this.$router.push(ROUTES.marca.list);
    },

    irParaORelatorio() {
      this.$router.push(ROUTES.relatorio.list);
    },
  },

  async mounted() {
    try {
      const response = await DashboardGet();
      this.resumo = response.data;
    } catch (error) {
      console.error('Erro ao carregar dashboard', error);
    }
  },
});
</script>

<template>
  <v-app>
    <v-main>
      <BaseFormContainer>
        <h2>Resumo do mês</h2>

        <v-row>
          <v-col cols="12" md="3">
            <v-card variant="outlined">
              <v-card-title>Fornecedores</v-card-title>
              <v-card-text>{{ resumo?.quantiaTotal ?? 0 }}</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card variant="outlined">
              <v-card-title>Produtos</v-card-title>
              <v-card-text>{{ resumo?.totalProdutos ?? 0 }}</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card variant="outlined">
              <v-card-title>Estoque</v-card-title>
              <v-card-text>{{ resumo?.totalDeItensEstoque ?? 0 }}</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card variant="outlined">
              <v-card-title>Críticos</v-card-title>
              <v-card-text>{{ resumo?.pertoVencimento ?? 0 }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </BaseFormContainer>
    </v-main>

    <Footer />
  </v-app>
</template>

<script lang="ts">
import BaseFormContainer from '@/components/base/BaseFormContainer.vue';
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'DashboardPage',

  components: {
    Footer,
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
});
</script>

<template>
  <v-app>
    <!-- topo -->
    <v-app-bar title="Dashboard" variant="outlined" border flat />

    <!-- menu lateral -->
    <v-navigation-drawer permanent border>
      <v-list-item
        title="Usuários"
        prepend-icon="mdi-account"
        @click="irParaUsuarios"
      />

      <v-list-item
        title="Fornecedores"
        prepend-icon="mdi-truck"
        @click="irParaFornecedores"
      />

      <v-list-item
        title="Produtos"
        prepend-icon="mdi-package-variant"
        @click="irParaProdutos"
      />

      <v-list-item
        title="Depósito"
        prepend-icon="mdi-warehouse"
        @click="irParaDeposito"
      />

      <v-list-item
        title="Lotes"
        prepend-icon="mdi-layers"
        @click="irParaLotes"
      />

      <v-list-item
        title="Movimentações"
        prepend-icon="mdi-swap-horizontal"
        @click="irParaMovimentacao"
      />

      <v-list-item title="Marcas" prepend-icon="mdi-tag" @click="irParaMarca" />

      <v-list-item
        title="Relatório"
        prepend-icon="mdi-file-chart"
        @click="irParaORelatorio"
      />
    </v-navigation-drawer>
    <!-- conteúdo -->

    <v-main>
      <BaseFormContainer>
        <h2>Resumo do mês</h2>

        <v-row>
          <v-col cols="12" md="3">
            <v-card variant="outlined">
              <v-card-title>Fornecedores</v-card-title>
              <v-card-text>Quantia total</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card variant="outlined">
              <v-card-title>Produtos</v-card-title>
              <v-card-text>Total de produtos</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card variant="outlined">
              <v-card-title>Estoque</v-card-title>
              <v-card-text>Total de itens</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="3">
            <v-card variant="outlined">
              <v-card-title>Críticos</v-card-title>
              <v-card-text>Perto do vencimento</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </BaseFormContainer>
    </v-main>

    <Footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ROUTES } from '@/router/utils/routes';
import Footer from '@/components/footer/Footer.vue';

export default defineComponent({
  name: 'DashboardLayout',

  components: {
    Footer,
  },

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },
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
    irParaRelatorio() {
      this.$router.push(ROUTES.relatorio.list);
    },
  },
});
</script>

<template>
  <v-layout style="height: 100vh">
   <!-- menu lateral -->
    <v-navigation-drawer permanent width="280" border>
      <v-list density="comfortable">
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
        <v-list-item
          title="Marcas"
          prepend-icon="mdi-tag"
          @click="irParaMarca"
        />
        <v-list-item
          title="Relatório"
          prepend-icon="mdi-file-chart"
          @click="irParaRelatorio"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- TOPO FIXO -->
    <v-app-bar position="fixed" height="64" flat border>
      <v-app-bar-title class="cursor-pointer" @click="irParaODashboard">
        Agiliza
      </v-app-bar-title>
    </v-app-bar>

    <!-- CONTEÚDO -->
    <v-main style="padding-top: 64px; overflow-y: auto">
      <div class="pa-4">
        <RouterView />
      </div>

      <Footer />
    </v-main>
  </v-layout>
</template>

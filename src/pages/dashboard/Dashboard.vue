<script lang="ts">
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
  },
});
</script>

<template>
  <!-- <header>
    <div>
      <div>imagem</div>

      <br />

      <p>menu:</p>
      <button @click="irParaUsuarios">usuários</button>
      <br />
      <button @click="irParaFornecedores">fornecedores</button>
      <br />
      <button @click="irParaProdutos">produtos</button>
      <br />
      <button @click="irParaDeposito">depósito</button>
      <br />
      <button @click="irParaLotes">lotes</button>
    </div>
  </header>

  <br />

  <section>
    <div>geral/mês:</div>

    <br />

    <div>Quantia total de fornecedores</div>

    <br />

    <div>Total dos produtos</div>

    <br />

    <div>Total de Itens no Estoque</div>

    <div>Produtos críticos (perto do vencimento)</div>
  </section>

  <br />

  <Footer /> -->

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
    </v-navigation-drawer>
    <!-- conteúdo -->

    <v-main>
      <v-container fuild>
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
      </v-container>
    </v-main>

    <Footer/>
  </v-app>
</template>

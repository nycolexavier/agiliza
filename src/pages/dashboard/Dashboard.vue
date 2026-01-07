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

<!-- <template>
  <header>
    <div>
      <div>imagem</div>

      <br />

      <p>menu:</p>

      <v-btn  variant="plain" @click="irParaUsuarios">usuários</v-btn>

      <br />
      <v-btn @click="irParaFornecedores">fornecedores</v-btn>
      <br />
      <v-btn @click="irParaProdutos">produtos</v-btn>
      <br />
      <v-btn @click="irParaDeposito">depósito</v-btn>
      <br />
      <v-btn @click="irParaLotes">lotes</v-btn>
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

  <Footer />
</template> -->

<template>
  <VContainer fluid class="fill-height">
    <h1>Dashboard</h1>
  </VContainer>
</template>
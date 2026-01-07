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
      this.$router.push('/dashboard/usuarios');
      this.$router.push(ROUTES.usuarios.list);
    },

    irParaFornecedores() {
      this.$router.push('dashboard/fornecedores');
      this.$router.push(ROUTES.fornecedores.list);
    },

    irParaProdutos() {
      this.$router.push('dashboard/produtos');
      this.$router.push(ROUTES.produtos.list);
    },

    irParaDeposito() {
      this.$router.push('dashboard/deposito');
      this.$router.push(ROUTES.deposito.list);
    },

    irParaLotes() {
      this.$router.push('dashboard/lotes');
      this.$router.push(ROUTES.lotes.list);
    },
  },
});
</script>

<template>
  <header>
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

  <Footer />
</template>

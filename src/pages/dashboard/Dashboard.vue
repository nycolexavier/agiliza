<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
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
    },

    irParaFornecedores() {
      this.$router.push('dashboard/fornecedores');
    },

    irParaProdutos() {
      this.$router.push('dashboard/produtos');
    },

    irParaDeposito() {
      this.$router.push('dashboard/deposito');
    },

    irParaLotes() {
      this.$router.push('dashboard/lotes');
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

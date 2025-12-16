<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { useRouter } from 'vue-router';

export default {
  setup(props, ctx) {
    const router = useRouter();

    function irParaUsuarios() {
      router.push('/dashboard/usuarios');
    }

    function irParaFornecedores() {
      router.push('dashboard/fornecedores');
    }

    function irParaProdutos() {
      router.push('dashboard/produtos');
    }

    function irParaDeposito() {
      router.push('dashboard/deposito');
    }

    function irParaLotes() {
      router.push('dashboard/lotes');
    }

    return {
      irParaUsuarios,
      irParaFornecedores,
      irParaProdutos,
      irParaDeposito,
      irParaLotes,
    };
  },
};
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

<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProdutoCriarPage',

  components: {
    Footer,
  },

  data() {
    return {
      form: {
        nome: '',
        sku: '',
        quantidadeMedida: '',
        quantidadeProduto: '',
        status: 'ativo',
        categoria: '',
      },
    };
  },

  methods: {
    irParaOProduto() {
      this.$router.push(ROUTES.produtos.list);
    },

    async enviarForm() {
      try {
        await api.post(`/produtos`, {
          nome: this.form.nome,
          sku: this.form.sku,
          quantidadeMedida: this.form.quantidadeMedida,
          quantidadeProduto: this.form.quantidadeProduto,
          status: this.form.status,
          categoria: this.form.categoria,
        });

        console.log('Deu certo!');
      } catch (error) {
        console.error('Erro ao criar produto', error);
      }
    },
  },
});
</script>

<template>
  <div>
    <h1>Criar um produto</h1>

    <button @click="irParaOProduto">Produto</button>

    <form @submit.prevent="enviarForm" action="">
      <input v-model="form.nome" type="text" placeholder="Nome" />

      <br />

      <input v-model="form.sku" type="text" placeholder="SKU" />

      <br />

      <input
        v-model="form.quantidadeMedida"
        type="text"
        placeholder="Quantidade de Medida"
      />

      <br />

      <input
        v-model="form.quantidadeProduto"
        type="text"
        placeholder="Quantidade de Produto"
      />

      <br />

      <input v-model="form.categoria" type="text" placeholder="Categoria" />

      <button
        type="submit"
        :disabled="
          !form.nome ||
          !form.categoria ||
          !form.quantidadeMedida ||
          !form.quantidadeProduto ||
          !form.sku
        "
      >
        Criar
      </button>
    </form>
  </div>
</template>

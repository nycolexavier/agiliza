<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Produto } from '@/interfaces/Produtos/Produto';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProdutosEditarPage',

  components: {
    Footer,
  },

  data(vm) {
    return {
      produto: null as Produto | null,
      form: {
        nome: '',
        sku: '',
        unidadeMedida: '',
        quantidadeProduto: '',
        status: 'ativo',
        categoria: '',
      },
    };
  },

  mounted() {
    this.buscarProduto();
  },

  methods: {
    irParaOProduto() {
      this.$router.push(`/dashboard/produtos/${this.produto?.id}`);
    },

    async buscarProduto() {
      try {
        const id = this.$route.params.id;

        const response = await api.get(`/produtos/${id}`);
        this.produto = response.data;

        this.form.nome = response.data.nome;
        this.form.sku = response.data.sku;
        this.form.unidadeMedida = response.data.unidadeMedida;
        this.form.quantidadeProduto = response.data.quantidadeProduto;
        this.form.status = response.data.status;
        this.form.categoria = response.data.categoria;
      } catch (error) {
        console.error('Erro ao buscar produto', error);
      }
    },

    async enviarForm() {
      try {
        const response = await api.patch(`/produtos/${this.produto?.id}`, {
          nome: this.form.nome,
          sku: this.form.sku,
          unidadeMedida: this.form.unidadeMedida,
          quantidadeProduto: this.form.quantidadeProduto,
          categoria: this.form.categoria,
        });

        return response;
      } catch (error) {}
    },
  },
});
</script>

<template>
  <div>
    <h1>Editar produto {{ produto?.nome }}</h1>

    <button @click="irParaOProduto">Voltar para ver o produto</button>

    <form @submit.prevent="enviarForm">
      <input v-model="form.nome" placeholder="Nome" />
      <br />
      <input v-model="form.sku" placeholder="sku" />
      <br />
      <input v-model="form.unidadeMedida" placeholder="unidadeMedida" />
      <br />
      <input v-model="form.quantidadeProduto" placeholder="quantidadeProduto" />
      <br />
      <input v-model="form.categoria" placeholder="categoria" />
      <button
        type="submit"
        :disabled="
          !form.nome ||
          !form.sku ||
          !form.unidadeMedida ||
          !form.quantidadeProduto ||
          !form.categoria
        "
      >
        Editar
      </button>
    </form>
    <Footer />
  </div>
</template>

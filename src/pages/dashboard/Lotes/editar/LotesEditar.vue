<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Lote } from '@/interfaces/Lotes/Lote';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';
// to-do: fazer o create do lote e colocar o quantidadeProduto nele
export default defineComponent({
  name: 'ProdutosEditarPage',

  components: {
    Footer,
  },

  data(vm) {
    return {
      lote: null as Lote | null,
      form: {
        codigoLote: '',
        marca: '',
        produto: '',
        quantidadeProduto: '',
        status: 'ativo',
        dataValidade: '',
      },
    };
  },

  mounted() {
    this.buscarProduto();
  },

  methods: {
    irParaOProduto() {
      if (!this.lote) return;
      this.$router.push(ROUTES.lotes.ver(this.lote.id));
    },

    async buscarProduto() {
      try {
        const id = this.$route.params.id;

        const response = await api.get(`/lotes/${id}`);
        this.lote = response.data;

        this.form.codigoLote = response.data.codigoLote;
        this.form.marca = response.data.marca;
        this.form.produto = response.data.produto;
        this.form.quantidadeProduto = response.data.quantidadeProduto;
        this.form.status = response.data.status;
        this.form.dataValidade = response.data.dataValidade;

        console.log(response);
      } catch (error) {
        console.error('Erro ao buscar lote', error);
      }
    },

    async enviarForm() {
      try {
        const response = await api.patch(`/lotes/${this.lote?.id}`, {
          codigoLote: this.form.codigoLote,
          marca: this.form.marca,
          produto: this.form.produto,
          quantidadeProduto: this.form.quantidadeProduto,
          dataValidade: this.form.dataValidade,
        });

        return response;
      } catch (error) {}
    },
  },
});
</script>

<template>
  <div>
    <h1>Editar lote: {{ lote?.id }}</h1>

    <button @click="irParaOProduto">Voltar para ver o lote</button>

    <form @submit.prevent="enviarForm">
      <input v-model="form.codigoLote" placeholder="codigoLote" />
      <br />
      <input v-model="form.marca" placeholder="marca" />
      <br />
      <input v-model="form.produto" placeholder="produto" />
      <br />
      <input v-model="form.quantidadeProduto" placeholder="quantidadeProduto" />
      <br />
      <input v-model="form.dataValidade" placeholder="dataValidade" />
      <button
        type="submit"
        :disabled="
          !form.codigoLote ||
          !form.marca ||
          !form.produto ||
          // !form.quantidadeProduto ||
          !form.dataValidade
        "
      >
        Editar
      </button>
    </form>
    <Footer />
  </div>
</template>

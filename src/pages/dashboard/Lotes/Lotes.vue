<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Lote } from '@/interfaces/Lotes/Lote';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';

export default defineComponent({
  name: 'ProdutosPage',

  components: {
    Footer,
  },

  data() {
    return {
      lotes: [] as Lote[],
      busca: '',

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    lotesPaginados(): Lote[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.lotesFiltrado.slice(inicio, fim);
    },

    lotesFiltrado(): Lote[] {
      if (!this.busca) {
        return this.lotes;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.lotes.filter((lote) =>
        removerAcentos(lote.codigoLote).includes(buscaNormalizada)
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  mounted() {
    this.buscarLotes();
  },

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    irParaOLotesEditar(id: number) {
      this.$router.push(ROUTES.lotes.ver(id));
    },

    async buscarLotes() {
      const response = await api.get<Lote[]>(`/lotes`);

      this.lotes = response.data;
    },
  },
});
</script>

<template>
  <div>
    <h1>Página de Lotes</h1>

    <input type="text" v-model="busca" placeholder="Busca por Código Lote" />

    <br />

    <v-btn @click="irParaODashboard">Dashboard</v-btn>

    <br />

    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Código Lote</th>
          <th>Marca</th>
          <th>Produto</th>
          <th>Status</th>
          <th>Data de validade</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in lotesPaginados" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.codigoLote }}</td>
          <td>{{ item.marca }}</td>
          <td>{{ item.produto }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.dataValidade }}</td>

          <td>
            <v-btn @click="irParaOLotesEditar(item.id)">Ver</v-btn>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <v-btn @click="paginaAtual--" :disabled="paginaAtual === 1">
        Anterior
      </v-btn>

      <span>Página {{ paginaAtual }}</span>

      <v-btn
        @click="paginaAtual++"
        :disabled="paginaAtual * itensPorPagina >= lotesFiltrado.length"
      >
        Próximo
      </v-btn>
    </div>
  </div>
</template>

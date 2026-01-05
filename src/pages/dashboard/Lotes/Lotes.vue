<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Lote } from '@/interfaces/Lotes/Lote';

export default defineComponent( {
  name: 'ProdutosPage',

  components: {
    Footer,
  },

  data(){
    return {
      tabela: [] as Lote[]
    };
  },

  mounted(){
    this.buscarLotes();
  },

  methods: {
    irParaODashboard(){
      this.$router.push(`/dashboard`)
    },

    irParaOLotesEditar(id: number){
      this.$router.push(`/dashboard/lotes/${id}`)
    },

    async buscarLotes(){
      const response = await api.get<Lote[]>(`/lotes`)

      this.tabela = response.data;
    }
  }
});
</script>

<template>
  <div>
    <h1>Página de Lotes</h1>

    <button @click="irParaODashboard">Dashboard</button>

    <p>(to-do) campo de busca</p>

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
        <tr v-for="item in tabela" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.codigoLote }}</td>
          <td>{{ item.marca }}</td>
          <td>{{ item.produto }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.dataValidade }}</td>

          <td>
            <button @click="irParaOLotesEditar(item.id)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

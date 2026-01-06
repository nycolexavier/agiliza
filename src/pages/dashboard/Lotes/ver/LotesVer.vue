<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Lote } from '@/interfaces/Lotes/Lote';
import router from '@/router';
import api from '@/services/api';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'LotesVerPage',

  components: {
    Footer,
  },

  data(vm) {
    return {
      lote: null as Lote | null,
    };
  },

  mounted() {
    this.buscarLote();
  },

  methods: {
    irParaOsLotes() {
      this.$router.push('/dashboard/lotes');
    },

    irParaLotesEditar(){
      console.log("clicou")
      this.$router.push(`/dashboard/lotes/${this.lote?.id}/editar`)
    },

    async buscarLote() {
      const id = computed(() => this.$route.params.id);
      const response = await api.get(`/lotes/${id.value}`);
      this.lote = response.data;
    },
  },
});
</script>

<template>
  <div>
    <h1>Lote: {{ lote?.id }}</h1>

    <button @click="irParaOsLotes">Voltar para Lotes</button>

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
        <tr>
          <td>{{ lote?.id }}</td>
          <td>{{ lote?.codigoLote }}</td>
          <td>{{ lote?.marca }}</td>
          <td>{{ lote?.produto }}</td>
          <td>{{ lote?.status }}</td>
          <td>{{ lote?.dataValidade }}</td>

          <td>
            <button @click="irParaLotesEditar">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

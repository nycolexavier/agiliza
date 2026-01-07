<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Lote } from '@/interfaces/Lotes/Lote';
import router from '@/router';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { computed, defineComponent } from 'vue';
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
      this.$router.push(ROUTES.lotes.list);
    },

    irParaLotesEditar() {
      if (!this.lote) return;
      this.$router.push(ROUTES.lotes.editar(this.lote.id));
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

    <v-btn @click="irParaOsLotes">Voltar para Lotes</v-btn>

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
            <v-btn @click="irParaLotesEditar">Editar</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

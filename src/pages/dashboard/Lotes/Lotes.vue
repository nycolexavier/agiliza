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
  <BaseFormContainer>
    <!-- Cabeçalho -->
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2>Lotes</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" @click="irParaODashboard"> Dashboard </v-btn>
      </v-col>
    </v-row>

    <!-- Busca -->
    <v-text-field
      v-model="busca"
      label="Buscar por código do lote"
      variant="outlined"
      density="compact"
      clearable
      class="mb-4"
    />

    <!-- Tabela -->
    <v-card variant="outlined">
      <v-data-table :items="lotesPaginados" item-key="id">
        <template #headers>
          <tr>
            <th>ID</th>
            <th>Código do lote</th>
            <th>Marca</th>
            <th>Produto</th>
            <th>Status</th>
            <th>Data de validade</th>
            <th>Ações</th>
          </tr>
        </template>

        <template #item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.codigoLote }}</td>
            <td>{{ item.marca }}</td>
            <td>{{ item.produto }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.dataValidade }}</td>

            <td>
              <v-btn
                size="small"
                variant="outlined"
                @click="irParaOLotesEditar(item.id)"
              >
                Ver
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <!-- Paginação -->
    <v-row class="mt-4" justify="center" align="center">
      <v-btn
        variant="outlined"
        @click="paginaAtual--"
        :disabled="paginaAtual === 1"
      >
        Anterior
      </v-btn>

      <span class="mx-4"> Página {{ paginaAtual }} </span>

      <v-btn
        variant="outlined"
        @click="paginaAtual++"
        :disabled="paginaAtual * itensPorPagina >= lotesFiltrado.length"
      >
        Próximo
      </v-btn>
    </v-row>

    <Footer />
  </BaseFormContainer>
</template>

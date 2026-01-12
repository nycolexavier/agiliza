<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Marca } from '@/interfaces/Marca';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';

export default defineComponent({
  name: 'ProdutosPage',

  components: {
    Footer,
  },

  data() {
    return {
      marca: [] as Marca[],
      busca: '',

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    produtosPaginados(): Marca[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.produtoFiltrado.slice(inicio, fim);
    },

    produtoFiltrado(): Marca[] {
      if (!this.busca) {
        return this.marca;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.marca.filter((marca) =>
        removerAcentos(marca.nome).includes(buscaNormalizada)
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  mounted() {
    this.buscarProdutos();
  },

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    irParaProdutosVer(id: number) {
      this.$router.push(ROUTES.marca.ver(id));
    },

    irParaCriarProduto() {
      this.$router.push(ROUTES.marca.new);
    },

    async buscarProdutos() {
      const response = await api.get<Marca[]>('/marcas');

      this.marca = response.data;
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <!-- Cabeçalho -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="6">
        <h2>Marca</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn color="primary" class="mr-2" @click="irParaCriarProduto">
          Adicionar marca
        </v-btn>

        <v-btn variant="outlined" @click="irParaODashboard"> Dashboard </v-btn>
      </v-col>
    </v-row>

    <!-- Busca -->
    <v-text-field
      v-model="busca"
      label="Buscar marca pelo nome"
      variant="outlined"
      density="compact"
      clearable
      class="mb-4"
    />

    <!-- Tabela -->
    <v-card variant="outlined">
      <v-data-table :items="produtosPaginados" item-key="id">
        <template #headers>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>criadoEm</th>
            <th>criadoPor</th>
            <th>AtualizadoEm</th>
          </tr>
        </template>

        <template #item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.nome }}</td>
            <td>{{ item.criadoEm }}</td>
            <td>{{ item.criadoPor }}</td>
            <td>{{ item.AtualizadoEm }}</td>

            <td class="text-end">
              <v-btn
                size="small"
                variant="outlined"
                @click="irParaProdutosVer(item?.id)"
              >
                Ver
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <!-- Paginação -->
    <v-row class="mt-4" align="center" justify="center">
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
        :disabled="paginaAtual * itensPorPagina >= produtoFiltrado.length"
      >
        Próximo
      </v-btn>
    </v-row>

    <Footer />
  </BaseFormContainer>
</template>

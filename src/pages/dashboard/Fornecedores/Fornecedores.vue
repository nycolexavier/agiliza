<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import api from '@/services/api';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';

export default defineComponent({
  name: 'FornecedoresPage',

  components: {
    Footer,
  },

  data() {
    return {
      fornecedores: [] as Fornecedor[],
      busca: '',

      paginaAtual: 1,
      itensPorPagina: 10,
    };
  },

  computed: {
    fornecedoresPaginados(): Fornecedor[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      const fim = inicio + this.itensPorPagina;

      return this.fornecedorFiltrado.slice(inicio, fim);
    },

    fornecedorFiltrado(): Fornecedor[] {
      if (!this.busca) {
        return this.fornecedores;
      }

      const buscaNormalizada = removerAcentos(this.busca);

      return this.fornecedores.filter((fornecedor) =>
        removerAcentos(fornecedor.nome).includes(buscaNormalizada)
      );
    },
  },

  watch: {
    busca() {
      this.paginaAtual = 1;
    },
  },

  mounted() {
    this.buscarFornecedores();
  },

  methods: {
    irParaODashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    irParaFornecedoresEdicao(id: number) {
      this.$router.push(ROUTES.fornecedores.ver(id));
    },

    irParaAddFornecedor() {
      this.$router.push(ROUTES.fornecedores.new);
    },

    async buscarFornecedores() {
      const response = await api.get<Fornecedor[]>('/fornecedores');

      this.fornecedores = response.data;
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <!-- Cabeçalho -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="8">
        <h2>Fornecedores</h2>
      </v-col>

      <v-col cols="12" md="4" class="text-end">
        <v-btn variant="outlined" class="me-2" @click="irParaODashboard">
          Dashboard
        </v-btn>

        <v-btn color="primary" @click="irParaAddFornecedor">
          Adicionar fornecedor
        </v-btn>
      </v-col>
    </v-row>

    <!-- Busca -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="busca"
          label="Buscar fornecedor pelo nome"
          variant="outlined"
          density="compact"
          clearable
        />
      </v-col>
    </v-row>

    <!-- Tabela -->
    <v-card variant="outlined">
      <v-data-table :items="fornecedoresPaginados" item-key="id">
        <template #headers>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Telefone</th>
            <th class="text-end">Ações</th>
          </tr>
        </template>

        <template #item="{ item }">
          <tr>
            <td>{{ item.nome }}</td>
            <td>{{ item.cargo }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.telefone }}</td>

            <td class="text-end">
              <v-btn
                size="small"
                variant="outlined"
                @click="irParaFornecedoresEdicao(item.id)"
              >
                Editar
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
        class="me-4"
        @click="paginaAtual--"
        :disabled="paginaAtual === 1"
      >
        Anterior
      </v-btn>

      <span>Página {{ paginaAtual }}</span>

      <v-btn
        variant="outlined"
        class="ms-4"
        @click="paginaAtual++"
        :disabled="paginaAtual * itensPorPagina >= fornecedorFiltrado.length"
      >
        Próximo
      </v-btn>
    </v-row>

    <Footer />
  </BaseFormContainer>
</template>

<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { defineComponent } from 'vue';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import { removerAcentos } from '@/utils/string/normalize';
import { ROUTES } from '@/router/utils/routes';
import { FornecedoresList } from '@/services/fornecedores';
import PageHeader from '@/components/layouts/PageHeader.vue';

import SearchInput from '@/components/form/SearchInput.vue';

export default defineComponent({
  name: 'FornecedoresPage',

  components: {
    Footer,
    PageHeader,
    SearchInput,
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

    irParaFornecedoresEdicao(id: string) {
      this.$router.push(ROUTES.fornecedores.ver(id));
    },

    irParaAddFornecedor() {
      this.$router.push(ROUTES.fornecedores.new);
    },

    async buscarFornecedores() {
      const response = await FornecedoresList();

      this.fornecedores = response.data;
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title="Fornecedores"
      actionLabel="Adicionar fornecedor"
      @action="irParaAddFornecedor"
    />

    <SearchInput v-model="busca" label="Buscar fornecedor pelo nome" />

    <!-- Tabela -->
    <v-card variant="outlined">
      <v-data-table
        :items="fornecedoresPaginados"
        item-key="id"
        hide-default-footer
      >
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

<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';
import { ROUTES } from '@/router/utils/routes';
import { FornecedoresListID } from '@/services/fornecedores';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import DetailsCard from '@/components/card/DetailsCard.vue';

export default defineComponent({
  name: 'FornecedorVerPage',

  components: {
    Footer,
    PageHeader,
    DetailsCard,
  },

  data() {
    return {
      fornecedorEdicao: null as Fornecedor | null,
    };
  },

  mounted() {
    this.buscarFornecedores();
  },

  methods: {
    irParaOFornecedor() {
      this.$router.push(ROUTES.fornecedores.list);
    },

    irParaFornecedorEditar() {
      if (!this.fornecedorEdicao) return;
      this.$router.push(ROUTES.fornecedores.editar(this.fornecedorEdicao.id));
    },

    async buscarFornecedores() {
      const id = this.$route.params.id;
      if (typeof id === 'string') {
        const response = await FornecedoresListID(id);
        this.fornecedorEdicao = response.data;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      title=" Fornecedor"
      :subtitle="fornecedorEdicao?.nome"
      :show-back="true"
      @action="irParaFornecedorEditar"
      actionLabel="Editar fornecedor"
      @back="irParaOFornecedor"
    />

    <DetailsCard
      :items="[
        { label: 'Nome', value: fornecedorEdicao?.nome },
        { label: 'Cargo', value: fornecedorEdicao?.cargo },
        { label: 'Email', value: fornecedorEdicao?.email },
        { label: 'Telefone', value: fornecedorEdicao?.telefone },
      ]"
    />
  </BaseFormContainer>
</template>

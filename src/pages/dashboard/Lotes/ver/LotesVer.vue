<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Lote } from '@/interfaces/Lotes/Lote';
import { ROUTES } from '@/router/utils/routes';
import { LoteListID } from '@/services/lote';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import DetailsCard from '@/components/card/DetailsCard.vue';

export default defineComponent({
  name: 'LotesVerPage',

  components: {
    Footer,
    PageHeader,
    DetailsCard,
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
      const id = this.$route.params.id;
      if (typeof id === 'string') {
        const response = await LoteListID(id);
        this.lote = response.data;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      :title="`Lote ${lote?.id}`"
      showBack
      backLabel="Voltar para Lotes"
      actionLabel="Editar"
      :actionDisabled="!lote"
      @back="irParaOsLotes"
      @action="irParaLotesEditar"
    />

    <DetailsCard
      :items="[
        { label: 'Nome', value: lote?.id },
        { label: 'Código Lote', value: lote?.codigoLote },
        { label: 'Marca', value: lote?.marca },
        { label: 'Produto', value: lote?.produto },
        { label: 'Status', value: lote?.status },
        { label: 'Data de validade', value: lote?.dataValidade },
        { label: 'Quantidade', value: lote?.quantidade },
        { label: 'Corredor', value: lote?.corredor },
      ]"
    />

    <Footer class="mt-6" />
  </BaseFormContainer>
</template>

<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Deposito } from '@/interfaces/Deposito/Deposito';
import { ROUTES } from '@/router/utils/routes';
import { DepositoListID } from '@/services/deposito.services';
import { defineComponent } from 'vue';
import PageHeader from '@/components/layouts/PageHeader.vue';
import DetailsCard from '@/components/card/DetailsCard.vue';

export default defineComponent({
  name: 'DepositoVerPage',

  components: {
    Footer,
    PageHeader,
    DetailsCard,
  },

  data() {
    return {
      deposito: null as Deposito | null,
    };
  },

  mounted() {
    this.verDeposito();
  },

  methods: {
    irParaoDeposito() {
      this.$router.push(ROUTES.deposito.list);
    },

    irParaODepositoEditar() {
      if (!this.deposito) return;

      this.$router.push(ROUTES.deposito.editar(this.deposito.id));
    },

    async verDeposito() {
      const id = this.$route.params.id;

      if (typeof id === 'string') {
        const response = await DepositoListID(id);
        this.deposito = response.data;
      }
    },
  },
});
</script>

<template>
  <BaseFormContainer>
    <PageHeader
      :title="`Depósito #${deposito?.id}`"
      showBack
      backLabel="Voltar para depósitos"
      actionLabel="Editar depósito"
      :actionDisabled="!deposito"
      @back="irParaoDeposito"
      @action="irParaODepositoEditar"
    />

    <DetailsCard
      :items="[
        { label: 'Nome', value: deposito?.corredor },
        { label: 'Cargo', value: deposito?.prateleira },
        { label: 'E-mail', value: deposito?.sessao },
        { label: 'Telefone', value: deposito?.quantidadeMaxima },
      ]"
    />

    <Footer />
  </BaseFormContainer>
</template>

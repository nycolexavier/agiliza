<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import type { Deposito } from '@/interfaces/Deposito/Deposito';
import { ROUTES } from '@/router/utils/routes';
import api from '@/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DepositoVerPage',

  components: {
    Footer,
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
      const response = await api.get(`/deposito/${id}`);
      this.deposito = response.data;
    },
  },
});
</script>

<template>
 <BaseFormContainer>
    <!-- Cabeçalho -->
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2>Depósito #{{ deposito?.id }}</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" class="me-2" @click="irParaoDeposito">
          Voltar para depósitos
        </v-btn>

        <v-btn
          color="primary"
          @click="irParaODepositoEditar"
          :disabled="!deposito"
        >
          Editar depósito
        </v-btn>
      </v-col>
    </v-row>

    <!-- Card de informações -->
    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <strong>Corredor</strong>
            <div>{{ deposito?.corredor }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Prateleira</strong>
            <div>{{ deposito?.prateleira }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Sessão</strong>
            <div>{{ deposito?.sessao }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Quantidade máxima</strong>
            <div>{{ deposito?.quantidadeMaxima }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <Footer />
  </BaseFormContainer>
</template>

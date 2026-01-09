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
 <BaseFormContainer>
    <!-- Cabeçalho -->
    <v-row align="center" class="mb-4">
      <v-col cols="12" md="6">
        <h2>Lote {{ lote?.id }}</h2>
      </v-col>

      <v-col cols="12" md="6" class="text-end">
        <v-btn variant="outlined" class="mr-2" @click="irParaOsLotes">
          Voltar para Lotes
        </v-btn>

        <v-btn
          variant="flat"
          color="primary"
          :disabled="!lote"
          @click="irParaLotesEditar"
        >
          Editar
        </v-btn>
      </v-col>
    </v-row>

    <!-- Card com dados -->
    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <strong>ID</strong>
            <div>{{ lote?.id }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Código do lote</strong>
            <div>{{ lote?.codigoLote }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Marca</strong>
            <div>{{ lote?.marca }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Produto</strong>
            <div>{{ lote?.produto }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Status</strong>
            <div>{{ lote?.status }}</div>
          </v-col>

          <v-col cols="12" md="6">
            <strong>Data de validade</strong>
            <div>{{ lote?.dataValidade }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <Footer class="mt-6" />
  </BaseFormContainer>
</template>

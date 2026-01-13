<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BasePagination',

  props: {
    paginaAtual: {
      type: Number,
      required: true,
    },

    itensPorPagina: {
      type: Number,
      required: true,
    },

    totalItens: {
      type: Number,
      required: true,
    },
  },

  emits: ['update:paginaAtual'],

  methods: {
    paginaAnterior() {
      if (this.paginaAtual > 1) {
        this.$emit('update:paginaAtual', this.paginaAtual - 1);
      }
    },

    proximaPagina() {
      if (this.paginaAtual * this.itensPorPagina < this.totalItens) {
        this.$emit('update:paginaAtual', this.paginaAtual + 1);
      }
    },
  },
});
</script>

<template>
  <v-row class="mt-4" align="center" justify="center">
    <v-btn
      variant="outlined"
      class="me-2"
      @click="paginaAnterior"
      :disabled="paginaAtual === 1"
    >
      Anterior
    </v-btn>

    <span class="mx-4">Página {{ paginaAtual }}</span>

    <v-btn
      variant="outlined"
      class="ms-2"
      @click="proximaPagina"
      :disabled="paginaAtual * itensPorPagina >= totalItens"
    >
      Próximo
    </v-btn>
  </v-row>
</template>

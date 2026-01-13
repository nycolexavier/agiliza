<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHeader',

  props: {
    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      required: false,
    },

    actionLabel: {
      type: String,
      required: false,
    },

    actionDisabled: {
      type: Boolean,
      default: false,
    },

    showBack: {
      type: Boolean,
      default: false,
    },

    backLabel: {
      type: String,
      default: 'Voltar',
    },
  },

  emits: ['action', 'back'],

  methods: {
    executarAcao() {
      this.$emit('action');
    },

    voltar() {
      this.$emit('back');
    },
  },
});
</script>

<template>
  <v-row align="center" class="mb-4">
    <v-col cols="12" md="6">
      <h2>{{ title }}</h2>

      <p v-if="subtitle" class="text-medium-emphasis">
        {{ subtitle }}
      </p>
    </v-col>

    <v-col cols="12" md="6" class="text-end">
      <v-btn
        v-if="showBack"
        variant="outlined"
        class="me-2"
        @click="voltar"
      >
        {{ backLabel }}
      </v-btn>

      <v-btn
        v-if="actionLabel"
        color="primary"
        :disabled="actionDisabled"
        @click="executarAcao"
      >
        {{ actionLabel }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ROUTES } from '@/router/utils/routes';

export default defineComponent({
  name: 'PageHeader',

  props: {
    title: {
      type: String,
      required: true,
    },
    actionLabel: {
      type: String,
      required: true,
    },
  },

  emits: ['action'],

  methods: {
    irParaDashboard() {
      this.$router.push(ROUTES.dashboard);
    },

    executarAcao() {
      this.$emit('action');
    },
  },
});
</script>

<template>
  <v-row align="center" class="mb-4">
    <v-col cols="12" md="6">
      <h2>{{ title }}</h2>
    </v-col>

    <v-col cols="12" md="6" class="text-end">
      <v-btn variant="outlined" class="me-2" @click="irParaDashboard">
        Dashboard
      </v-btn>

      <v-btn color="primary" @click="executarAcao">
        {{ actionLabel }}
      </v-btn>
    </v-col>
  </v-row>
</template>

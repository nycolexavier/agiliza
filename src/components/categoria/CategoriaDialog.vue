<script lang="ts">
import { CategoriaPost } from '@/services/categoria';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CategoriaDialog',
  props: {
    modelValue: Boolean,
  },
  emits: ['update:modelValue', 'created'],

  data() {
    return {
      nome: '',
      loading: false,
    };
  },

  methods: {
    async salvar() {
      this.loading = true;
      const categoria = await CategoriaPost({ nome: this.nome });
      this.$emit('created', categoria);
      this.$emit('update:modelValue', false);
      this.nome = '';
      this.loading = false;
    },
  },
});
</script>

<template>
  <v-dialog v-model="modelValue" max-width="400">
    <v-card>
      <v-card-title>Criar categoria</v-card-title>

      <v-card-text>
        <v-text-field v-model="nome" label="Nome da categoria" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="$emit('update:modelValue', false)">
          Cancelar
        </v-btn>
        <v-btn color="primary" :loading="loading" @click="salvar">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

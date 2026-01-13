<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'CampoDeBusca',

  props: {
    modelValue: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      default: 'Buscar',
    },

    target: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const labelFinal = computed(() => {
      if (props.label) {
        return props.label;
      }

      if (props.target) {
        return `Buscar ${props.target}`;
      }

      return 'Buscar';
    });

    function atualizarValor(valor: string) {
      emit('update:modelValue', valor);
    }

    return {
      labelFinal,
      atualizarValor,
    };
  },
});
</script>

<template>
  <v-text-field
    :model-value="modelValue"
    :label="labelFinal"
    variant="outlined"
    density="compact"
    clearable
    @update:model-value="atualizarValor"
  />
</template>

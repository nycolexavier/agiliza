<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'TelefoneFormatado',

  props: {
    telefone: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const telefoneFormatado = computed(() => {
      if (!props.telefone) return '-';

      const numeros = props.telefone.replace(/\D/g, '');

      if (numeros.length === 11) {
        return numeros.replace(
          /(\d{2})(\d{1})(\d{4})(\d{4})/,
          '($1) $2 $3 - $4'
        );
      }

      if (numeros.length === 10) {
        return numeros.replace(
          /(\d{2})(\d{4})(\d{4})/,
          '($1) $2 - $3'
        );
      }

      return props.telefone;
    });

    return {
      telefoneFormatado,
    };
  },
});
</script>

<template>
  <span>{{ telefoneFormatado }}</span>
</template>
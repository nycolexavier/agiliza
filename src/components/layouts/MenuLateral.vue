<script lang="ts">
import { defineComponent } from 'vue';
import { ROUTES } from '@/router/utils/routes';

export default defineComponent({
  name: 'MenuLateral',

  data(vm) {
    return {
      ROUTES,
    };
  },

  methods: {
    irPara(rota: string) {
      this.$router.push(rota);
    },
  },
});
</script>

<template>
  <v-navigation-drawer permanent app>
    <v-list>
      <v-list-item title="Dashboard" @click="irPara(ROUTES.dashboard)" />

      <v-list-item title="Usuários" @click="irPara(ROUTES.usuarios.list)" />

      <v-list-item title="Lotes" @click="irPara(ROUTES.lotes.list)" />

      <v-list-item title="Depósito" @click="irPara(ROUTES.deposito.list)" />
    </v-list>
  </v-navigation-drawer>
</template>

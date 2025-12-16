<script lang="ts">
import type { Usuario } from '@/interfaces/Usuarios/Usuario';
import api from '@/services/api';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup(props, ctx) {
    const route = useRoute();

    const id = computed(() => route.params.id);
    console.log('aaaaaaaaaaa', id);

    const router = useRouter();

    function irParaOUsuarios() {
      router.push('/dashboard/usuarios');
    }

    const usuario = ref<Usuario | null>(null);

    async function buscarUsuarios() {
      const response = await api.get(`/usuarios/${id.value}`);
      usuario.value = response.data;

      console.log('usuario.data', response.data);
    }

    onMounted(() => {
      buscarUsuarios();
    });

    return {
      id,
      irParaOUsuarios,
      usuario,
    };
  },
};
</script>

<template>
  <div>
    <h1>Editar usuário {{ id }}</h1>

    <button @click="irParaOUsuarios">Usuários</button>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cargo</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>Telefone</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{{ usuario?.nome }}</td>
          <td>{{ usuario?.cargo }}</td>
          <td>{{ usuario?.email }}</td>
          <td>{{ usuario?.status }}</td>
          <td>{{ usuario?.telefone }}</td>

          <td>
            <!-- <button>Ver tudo</button> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import type { Usuario } from '@/interfaces/Usuarios/Usuario';

export default {
  setup() {
    const router = useRouter();

    function irParaODashboard() {
      router.push('/dashboard');
    }

    const tabela = ref<Usuario[]>([]);

    async function buscarUsuarios() {
      const response = await api.get('/usuarios');
      tabela.value = response.data;
    }

    function irParaVerUsuarios(id: number) {
      router.push(`/dashboard/usuarios/${id}`);
    }

    function irParaCriarUsuario() {
      router.push(`/dashboard/usuarios/new`);
    }

    onMounted(() => {
      buscarUsuarios();
    });

    return {
      tabela,
      irParaODashboard,
      irParaVerUsuarios,
      irParaCriarUsuario,
    };
  },
};
</script>

<template>
  <div>
    <h1>Página de Usuários</h1>

    <p>(to-do) campo de busca</p>

    <button @click="irParaCriarUsuario">adicionar usuários</button>

    <br />

    <button @click="irParaODashboard">Dashboard</button>

    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Nome</th>
          <th>Cargo</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>Telefone</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in tabela" :key="item.id">
          <td>{{ item?.id }}</td>
          <td>{{ item.nome }}</td>
          <td>{{ item.cargo }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.telefone }}</td>

          <td>
            <button @click="irParaVerUsuarios(item.id)">Ver tudo</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Footer />
  </div>
</template>

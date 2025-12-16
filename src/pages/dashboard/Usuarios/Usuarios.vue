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

    function irParaEdicaoUsuarios(id: number) {
      router.push(`/usuarios/${id}`);
    }

    onMounted(() => {
      buscarUsuarios();
    });

    return{
      tabela,
      irParaODashboard,
      irParaEdicaoUsuarios
    }

  },
};
</script>

<template>
  <div>
    <h1>Página de Usuários</h1>

    <p>(to-do) campo de busca</p>

    <button>adicionar usuários</button>

    <br />

    <button @click="irParaODashboard">Dashboard</button>

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
        <tr v-for="item in tabela" :key="item.id">
          <td>{{ item.nome }}</td>
          <td>{{ item.cargo }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.telefone }}</td>

          <td>
            <button>Ver tudo</button>
            <button @click="irParaEdicaoUsuarios(item.id)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Footer />
  </div>
</template>

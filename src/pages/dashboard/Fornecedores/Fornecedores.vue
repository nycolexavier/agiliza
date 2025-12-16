<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import type { Fornecedor } from '@/interfaces/Fornecedores/Fornecedor';

const router = useRouter();

function irParaODashboard() {
  router.push('/dashboard');
}
const tabela = ref<Fornecedor[]>([]);

async function buscarFornecedores() {
  const response = await api.get<Fornecedor[]>('/fornecedores');

  tabela.value = response.data;

  console.log(response.data);
}

onMounted(() => {
  buscarFornecedores();
});
</script>

<template>
  <div>
    <h1>Página de Fornecedores</h1>

    <button @click="irParaODashboard">Dashboard</button>

    <p>(to-do) campo de busca</p>

    <br />

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
            <button>Ações</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Footer />
  </div>
</template>

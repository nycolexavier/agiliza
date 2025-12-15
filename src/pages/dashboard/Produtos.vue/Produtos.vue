<script setup>
import Footer from '@/components/footer/Footer.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from "@/services/api"

const router = useRouter();

function irParaODashboard() {
  router.push('/dashboard');
}

const tabela = ref([]);

async function buscarProdutos() {
  const response = await api.get('/produtos');

  tabela.value = response.data;

  console.log(response.data);
}

onMounted(() =>{
    buscarProdutos();
})
</script>

<template>
  <div>
    <h1>Página de produtos</h1>

    <br />

    <button @click="irParaODashboard">Dashboard</button>

    <table>
      <thead>
        <tr>
          <th>nome</th>
          <th>sku</th>
          <th>unidade de medida</th>
          <th>quantidade de produto</th>
          <th>categoria</th>
          <th>status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in tabela" :key="item.id">
          <td>{{ item.nome }}</td>
          <td>{{ item.sku }}</td>
          <td>{{ item.unidadeMedida }}</td>
          <td>{{ item.quantidadeProduto }}</td>
          <td>{{ item.categoria }}</td>
          <td>{{ item.status }}</td>

          <td>
            <button>Ações</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Footer />
  </div>
</template>

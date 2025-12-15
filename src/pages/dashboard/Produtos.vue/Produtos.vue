<script setup>
       import Footer from '@/components/footer/Footer.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

function irParaODashboard() {
    router.push("/dashboard")
}

       const tabela = ref([
        {
            id: "1",
            nome: "Leite",
            sku: "4253453",
            unidadeMedida: "Unidade",
            quantidadeProduto: "Litro",
            status: 'ativo',
            categoria: "derivados",
        },
        {
            id: "2",
            nome: "Água",
            sku: "4253453",
            unidadeMedida: "Unidade",
            quantidadeProduto: "ml",
            status: 'ativo',
            categoria: "natural", 
        },
        {
            id: "3",
            nome: "Chocolate",
            sku: "4253453",
            unidadeMedida: "Pacote",
            quantidadeProduto: "gramas",
            status: 'ativo',
            categoria: "industrializado", 
        }
    ])

</script>


<template>
    <div>
        <h1>Página de produtos</h1>

        <br>

    <button @click="irParaODashboard" >Dashboard</button>

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

        <Footer/>
    </div>
</template>


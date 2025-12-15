<script setup>
    import Footer from '@/components/footer/Footer.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

    const router = useRouter();

    function irParaODashboard(){
        router.push('/dashboard')
    }

const tabela = ref([
    {
        id: 1,
        codigoLote: "Seu José Barão",
        marca: "Itambé",
        produto: "jose@gmail.com",
        status: "ativo",
        dataValidade: "31997537547"
    },
    {
        id: 2,
        codigoLote: "Dona Maria Baronesa",
        marca: "Nestlé",
        produto: "Fornecedor",
        status: "ativo",
        dataValidade: "31997537547"
    },
    {
        id: 3,
        codigoLote: "Dona Joana",
        marca: "Piracanjuba",
        produto: "Fornecedor",
        status: "ativo",
        dataValidade: "31997537547"
    }
])
</script>


    <template>
    <div>
        <h1>Página de Lotes</h1>

        <button @click="irParaODashboard" >Dashboard</button>

        <p>(to-do) campo de busca</p>

        <br>

        <table>
            <thead>
                <tr>
                    <th>Código Lote</th>
                    <th>Marca</th>
                    <th>Produto</th>
                    <th>Status</th>
                    <th>Data de validade</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in tabela" :key="item.id" >
                    <td>{{item.codigoLote}}</td>
                    <td>{{item.marca}}</td>
                    <td>{{item.produto}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.dataValidade}}</td>

                    <td>
                        <button>
                            Ações
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
       

        <Footer/>
    </div>
</template>


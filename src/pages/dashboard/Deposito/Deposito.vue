<script setup>
    import Footer from '@/components/footer/Footer.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

function irParaODashboard(){
    router.push("/dashboard")
}


    const tabela = ref([
        {
            id: "1",
            corredor: "A",
            prateleira: "12",
            sessao: '5',
            quantidadeMaxima: '15'
        },
        {
            id: "2",
            corredor: "B",
            prateleira: "24",
            sessao: '10',
            quantidadeMaxima: '30'
        }
    ])
</script>
    
    
    <template>
    <div>
        <h1>Página de Deposito</h1>

        <br>

         <button @click="irParaODashboard" >Dashboard</button>

        <table>
            <thead>
                <tr>
                    <th>Corredor</th>
                    <th>Prateleira</th>
                    <th>Sessão</th>
                    <th>Quantidade Máxima</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in tabela" :key="item.id" >
                    <td>{{ item.corredor }}</td>
                    <td>{{ item.prateleira }}</td>
                    <td>{{ item.sessao }}</td>
                    <td>{{ item.quantidadeMaxima }}</td>

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


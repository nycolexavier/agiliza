
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
            nome: 'Nycole',
            cargo: 'ADMIN',
            email: 'nycole.xavier@gmail.com',
            status: 'inativo',
            telefone: '31997537547'
        },
        {
            id: 2, 
            nome: 'Soraia',
            cargo: 'Gerente',
            email: 'soraia.xavier@gmail.com',
            status: 'ativo',
            telefone: '31997537547'
        },
            {
            id: 3, 
            nome: 'Gleice',
            cargo: 'Funcionária',
            email: 'gleice.xavier@gmail.com',
            status: 'ativo',
            telefone: '31997537547'
        },
        {
            id: 3, 
            nome: 'Maria',
            cargo: 'Funcionária',
            email: 'gleice.xavier@gmail.com',
            status: 'ativo',
            telefone: '31997537547'
        }
        
    ])
</script> 
    
    <template>
    <div>
        <h1>Página de Usuários</h1>

        <p>(to-do) campo de busca</p>

        <button>adicionar usuários</button>

        <br>

        <button @click="irParaODashboard" >Dashboard</button>

        <p>Listar usuarios</p>
        <p>Editar usuarios</p>
        <p>Deletar usuarios</p>

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

        <Footer/>
    </div>
</template>

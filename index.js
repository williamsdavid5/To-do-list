//os elementos são resgatados da tela inicial
const buttom = document.querySelector('.add_task');
const input = document.querySelector('.input_tasks');
const lista = document.querySelector('.list_tasks');

//array que vai armazenar as tarefas recebidas do usuário
let listaDeItens = [];

//essa função, além de inserir as tarefas no array (tarefas que são digitadas pelo usuário no input), também atualzia a tela com essas tarefas
function adicionarElemento() {
    if (input.value) {
        listaDeItens.push({
            nome: input.value,
            conclida: false
        });
        mostrarTarefas();
    }
}

//cria uma variável para armazenar um elemento da lista
//perceba que a lista já foi criada no html, o que estamos fazendo aqui é simplesmente inserir os elementos nela
function mostrarTarefas() {
    let novaLI = '';

    listaDeItens.forEach((tarefa, index) => {
        novaLI += `
            <li class="task ${tarefa.conclida && "done"}">
                <img src="./img/checked.png" alt="check" onclick = "concluirTarefa(${index})">
                <p>${tarefa.nome}</p>
                <img src="./img/trash.png" alt="excluir" onclick = "deletarItem(${index})">
            </li>
        `;
    });

    lista.innerHTML = novaLI;
    input.value = '';

    localStorage.setItem('toDoList', JSON.stringify(listaDeItens));
}

function deletarItem(index) {
    listaDeItens.splice(index, 1);
    mostrarTarefas();
}

function concluirTarefa(index) {
    listaDeItens[index].conclida = !listaDeItens[index].conclida;
    mostrarTarefas();
}

function recarregarTarefas() {
    const tarefasLoclStorage = localStorage.getItem('toDoList');

    if (tarefasLoclStorage) {
        listaDeItens = JSON.parse(tarefasLoclStorage);
    }
}

//sempre que a aplicação é iniciada, a função de recarregar elementos é chamada
//ela pega os elementos armazenados no navegador e envia para a aplicação
recarregarTarefas();
mostrarTarefas();

//quando o botao recebe um 'click', a função é chamada
buttom.addEventListener('click', adicionarElemento);
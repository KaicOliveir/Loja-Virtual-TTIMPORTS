let lista = document.getElementById("listaCarrinho");
let total = 0;

lista.innerHTML = "";

// verifica se tem mais de um item diferente
let mostrarBotaoRemover = carrinho.length > 1;

carrinho.forEach((item, index) => {

    let subtotal = item.preco * item.quantidade;
    total += subtotal;

    lista.innerHTML += `
        <div class="item-carrinho" id="item-${index}">
            <p>
                ${item.nome} <br>
                Quantidade: ${item.quantidade} <br>
                Subtotal: R$ ${subtotal.toFixed(2)}
            </p>

            ${mostrarBotaoRemover ? `<button onclick="removerItem(${index})">Remover</button>` : ""}

        </div>
        <hr>
    `;
});

document.getElementById("total").innerText = 
"Total: R$ " + total.toFixed(2);
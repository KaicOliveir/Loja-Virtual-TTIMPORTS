function pegarCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho){
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarCarrinho(nome, preco, quantidade = 1) {

    let carrinho = pegarCarrinho();

    let produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: quantidade
        });
    }

    salvarCarrinho(carrinho);
    alert("Produto adicionado ao carrinho!");
    console.log(carrinho);
}

function removerItem(index){

    let elemento = document.getElementById(`item-${index}`);

    elemento.classList.add("removendo");

    setTimeout(() => {

        let carrinho = pegarCarrinho();

        carrinho.splice(index,1);

        salvarCarrinho(carrinho);

        carregarCarrinho();

    }, 400);
}

function limparCarrinho() {

    let carrinho = [];

    salvarCarrinho(carrinho);

    document.getElementById("carrinho-itens").innerHTML = "";

    document.getElementById("total").innerText = "Total: R$ 0.00";
}
function adicionarProduto(){

    let nome = document.getElementById("nomeProduto").innerText;

    let preco = document
        .getElementById("precoProduto")
        .getAttribute("data-preco");

    let quantidade = document.getElementById("quantidade").value;

    adicionarCarrinho(
        nome,
        parseFloat(preco),
        parseInt(quantidade)
    );

}

function mostrarCarrinho(){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let container = document.getElementById("carrinho-itens");

    if(!container) return;

    container.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {

        let subtotal = item.preco * item.quantidade;
        total += subtotal;

        container.innerHTML += `
            <div class="item-carrinho">
                <h4>${item.nome}</h4>
                <p>Quantidade: ${item.quantidade}</p>
                <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
                <button onclick="removerItem(${index})">Remover</button>
            </div>
        `;

    });

    let totalElemento = document.getElementById("total");

    if(totalElemento){
        totalElemento.innerText = "Total: R$ " + total.toFixed(2);
    }
}
document.addEventListener("DOMContentLoaded", mostrarCarrinho);

function finalizarCompra() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá, tenho interesse nos seguintes produtos:%0A%0A";

    carrinho.forEach(item => {
        mensagem += `🛒 Produto: ${item.nome}%0A`;
        mensagem += `Quantidade: ${item.quantidade}%0A`;
        mensagem += `Preço: R$ ${item.preco}%0A%0A`;
    });

    let telefone = "557488375647"; // coloque seu número com DDD

    let url = `https://wa.me/${telefone}?text=${mensagem}`;

    window.open(url, "_blank");
}
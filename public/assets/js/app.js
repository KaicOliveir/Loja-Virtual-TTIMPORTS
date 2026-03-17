// ===============================
// MENU MOBILE
// ===============================

var MenuItens = document.getElementById("MenuItens");

// Menu começa fechado
MenuItens.style.maxHeight = "0px";

function menucelular() {
    if (MenuItens.style.maxHeight === "0px") {
        MenuItens.style.maxHeight = "300px";
    } else {
        MenuItens.style.maxHeight = "0px";
    }
}

var produtosImg = document.getElementById("produtosImg");
var produtoMiniatura = document.getElementsByClassName("produtoMiniatura");

for (let i = 0; i < produtoMiniatura.length; i++) {
    produtoMiniatura[i].onclick = function () {
        produtosImg.src = this.src;
    };
}

// inicio das configurações do banner

let slides = document.querySelectorAll('.slide');
let index = 0;

function nextSlide() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
};

setInterval(nextSlide, 8000); // troca a cada 8 segundos

// CARRINHO

function adicionarCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push({
        nome: nome,
        preco: preco,
        quantidade: 1
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Produto adicionado ao carrinho!");
}

function irParaCheckout() {
    window.location.href = "checkout.html";
}
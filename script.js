const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// CARROSEL
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});

// MENU HAMBURGUER

let menu = document.querySelector(".toggle")
let navegacaoHamburguer = document.querySelector(".menuHamburguerAtivo")

function menuHamburguerAtivo(){

    navegacaoHamburguer.classList.toggle("ativo")
}

menu.addEventListener("click", menuHamburguerAtivo)

// CARRINHO E ALERTA DE ADD

let listaBotaoHamburguer = document.querySelectorAll(".botaoAddCarrinho")
let imagensHamburguers = document.querySelectorAll(".card img")
let nomeLanche = document.querySelectorAll(".card-title")
let precoLanche = document.querySelectorAll(".preco")

let carrinho = document.querySelector("#carrinho")
let carrinhoNum = document.querySelector("#carrinho span")

let alerta = document.querySelector("#alertaAdd")
let btnFecharAlerta = document.querySelector("#fecharAlerta")

let imgModalCarrinho = document.querySelector(".imgModalCarrinho")
let botaoFinalizarPedido = document.querySelector(".botaoFinalizarPedido")
let botaoFecharModal = document.querySelector(".botaoFecharModal")
let precoTotalParagrafo = document.querySelector(".precoTotal p")

let conteudoModal = document.querySelector(".modal-content")
let modalFooter = document.querySelector(".modal-footer")

let pedidos = 0
let precoTotal = 0

listaBotaoHamburguer.forEach(function(element, index){

  element.addEventListener("click", function(){

    pedidos++
    carrinhoNum.textContent = pedidos

    url = imagensHamburguers[index].getAttribute("src")
    nomeLancheGlobal = nomeLanche[index]
    precoLancheGlobal = precoLanche[index]

    criarCorpoModal()
    addCarrinho()   
    somarPrecoTotal()

    // DECREMENTAR PRECO TOTAL E NUMERO DE PEDIDOS
    criarBotaoExcluirDivPai.addEventListener("click", function(){

      pedidos--
      carrinhoNum.textContent = pedidos

      let diminuirPrecoTotal = precoLanche[index].textContent.slice(3, 5)
      precoTotal -= diminuirPrecoTotal
      precoTotalParagrafo.textContent = "Seu pedido ficou em: R$ " + precoTotal

      if(pedidos == 0){

        precoTotalParagrafo.style.display = "none"
        botaoFinalizarPedido.style.display = "none"
        botaoFecharModal.textContent = "Carrinho vazio, volte ao cardápio"
      }
    })
  })
})

function somarPrecoTotal(){

  let precoLancheClicado = Number(precoLancheGlobal.textContent.slice(3, 5))
  precoTotal += precoLancheClicado
  precoTotalParagrafo.textContent = "Seu pedido ficou em: R$ " + precoTotal
}

function criarCorpoModal(){

  // CRIAR ELEMENTOS
  let divPaiModal = document.createElement("div")
  let criarImgModal = document.createElement("img")
  let divFilhoModal = document.createElement("div")
  let divNeto1Modal = document.createElement("div")
  let criarNomeLancheModal = document.createElement("h6")
  let criarPrecoLancheModal = document.createElement("p")
  let divNeto2Modal = document.createElement("div")
  criarBotaoExcluirDivPai = document.createElement("button")

  // ESTRUTURAR ELEMENTOS
  conteudoModal.insertBefore(divPaiModal, modalFooter)
  divPaiModal.classList.add("modal-body")
  divPaiModal.appendChild(criarImgModal)
  insertAfter(divFilhoModal, criarImgModal)
  divFilhoModal.appendChild(divNeto1Modal)
  divNeto1Modal.appendChild(criarNomeLancheModal)
  insertAfter(criarPrecoLancheModal, criarNomeLancheModal)
  insertAfter(divNeto2Modal, divNeto1Modal)
  divNeto2Modal.appendChild(criarBotaoExcluirDivPai)
  criarBotaoExcluirDivPai.textContent = "Excluir"

  // ESTRUTURAR VARIAVEIS
  criarImgModal.src = url
  criarNomeLancheModal.textContent = nomeLancheGlobal.textContent
  criarPrecoLancheModal.textContent = precoLancheGlobal.textContent

  // EXCLUIR DIV PAI NO BOTAO EXCLUIR
  criarBotaoExcluirDivPai.addEventListener("click", function(){

    divPaiModal.remove()    
  })
}

function addCarrinho(){

  alerta.classList.add("ativo")
  alerta.style.display = "inherit"

  if(alerta.classList.contains("ativo")){

    setTimeout(function (){

      alerta.style.display = "none"
      alerta.classList.remove("ativo")
    }, 8000)
  }

  if(pedidos > 0){

    precoTotalParagrafo.style.display = "flex"
    botaoFinalizarPedido.style.display = "flex"
    botaoFecharModal.textContent = "Fechar"
  }
}

function insertAfter(newElement, reference){

  reference.parentNode.insertBefore(newElement, reference.nextSibling);
}

// FECHAR MODAL DE ALERTA

btnFecharAlerta.addEventListener("click", fecharAlerta)

function fecharAlerta(){

  alerta.style.display = "none"
  alerta.classList.remove("ativo")
}

// VOLTAR AO TOPO

let voltarTopo = document.querySelector("#voltarTopo")

function aparecerBotaoTopo(){

  let scroll = pageYOffset

  if(scroll > 800){

    voltarTopo.style.display = "block"
  } else if(scroll < 800){

    voltarTopo.style.display = "none"
  }
}

function voltarAoTopo(){

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

window.addEventListener("scroll", aparecerBotaoTopo)
voltarTopo.addEventListener("click", voltarAoTopo)
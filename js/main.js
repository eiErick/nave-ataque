import { atirar } from "./missil.js";
import { gerarInimigos } from "./inimigos.js";
import { navePlayerDerrotada } from "./colisao.js";

gerarInimigos();

if (localStorage.getItem("melhorias") == null) {
  let velocidadeNave = 5;
  let velocidadeMissil = 10;
  let vidasNavePlayer = 3;
  let quantidadeDeMelhorias = 0;

  let melhorias = {
      "velocidadeNave": velocidadeNave,
      "velocidadeMissil": velocidadeMissil,
      "vidasNavePlayer": vidasNavePlayer,
      "quantidadeDeMelhorias": quantidadeDeMelhorias
  };

  console.log(melhorias);
  let melhoriasString = JSON.stringify(melhorias);
  localStorage.setItem("melhorias", melhoriasString);
}

let atributosString = localStorage.getItem("melhorias");

const atributos = JSON.parse(atributosString);

const placarNum = document.querySelector(".placar__num");
const containerVida = document.querySelector(".vidas");

gerarVidasNavePlayer();

const placarRecorde = document.querySelector(".recorde-placar");
const recordeNum = localStorage.getItem("recorde");
placarRecorde.innerHTML = recordeNum;

const nave = document.getElementById("nave");
const larguraDoMonitor = window.innerWidth - 20;
const alturaDoMonitor = window.innerHeight - 100;

let leftPositionNave = 150;
let topPositionNave = 100;
let keysPressed = {};
let pontosNum = 0;

document.addEventListener("keydown", function(event) {
  if (event.key == "f" || event.key == " ") {
    if (!navePlayerDerrotada) {
      atirar(topPositionNave, leftPositionNave, larguraDoMonitor, atributos.velocidadeMissil);
    }
  }
});

document.addEventListener('keydown', function(event) {
  keysPressed[event.key] = true;
});

document.addEventListener('keyup', function(event) {
  delete keysPressed[event.key];
});

setInterval(() => {
  if ('ArrowUp' in keysPressed) {
    topPositionNave -= atributos.velocidadeNave;
    limiteAltura();
  }

  if ('ArrowDown' in keysPressed) {
    topPositionNave += atributos.velocidadeNave;
    limiteAltura();
  }

  nave.style.top = topPositionNave + 'px';
}, 10);

function limiteAltura() {
  if (topPositionNave <= 101) {
    topPositionNave = 100;
  } else if (topPositionNave >= alturaDoMonitor) {
    topPositionNave = alturaDoMonitor;
  }
}

function gerarVidasNavePlayer() {
  for (let i = 0; i < atributos.vidasNavePlayer; i++) {
    containerVida.innerHTML += `<img src="assets/coracao.svg" alt="coracao" class="vidas-icon">`;
  }
}

export function marcarPontos(pontos) {
  pontosNum += parseInt(pontos);

  if (pontosNum <= 0) {
    pontosNum = 0;
  }

  placarNum.innerHTML = pontosNum; 
}

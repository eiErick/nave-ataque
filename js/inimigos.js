import { marcarPontos } from "./main.js";
import { atirar } from "./missil.js";

let chamarNavesInimigasTimer;

export function gerarInimigos() {
  gerarNavesInimigasAutomaticamente();
}

function gerarNumeroAleatorio(nMax, nMin) {
  return parseInt(Math.random() * (nMax - nMin)) + nMin;
}

function gerarNavesInimigasAutomaticamente() {
  chamarNavesInimigasTimer = setInterval(() => {
    gerarNavesInimigas();
  }, gerarNumeroAleatorio(2500, 1000));
}

export function pararGeraçãoDeNavesInimigas() {
  clearInterval(chamarNavesInimigasTimer);
}

function gerarNavesInimigas() {
  const larguraDoMonitor = window.innerWidth - 20;
  const alturaDoMonitor = window.innerHeight - 100;

  let leftPositionNaveInimigo = larguraDoMonitor - 100;
  let topPositionNaveInimigo = gerarNumeroAleatorio(alturaDoMonitor, 100);
  
  let naveInimiga = document.createElement("img");
  naveInimiga.style.left = larguraDoMonitor - 100 + "px";
  naveInimiga.style.top = topPositionNaveInimigo + "px";
  naveInimiga.setAttribute("src", `../assets/nave${gerarNumeroAleatorio(9, 1)}.png`);
  naveInimiga.setAttribute("alt", "naveInimiga");
  naveInimiga.classList.add("naveInimiga");
  naveInimiga.style.top = topPositionNaveInimigo + "px";
  document.body.appendChild(naveInimiga);
  
  movimentarInimigo(naveInimiga, leftPositionNaveInimigo, larguraDoMonitor);
  atirarMissilInimigo();
}

function movimentarInimigo(naveInimiga, leftPositionNaveInimigo) { 
  let posicaoNaveInimigo = leftPositionNaveInimigo;
  let velocidadeNaveInimigo = gerarNumeroAleatorio(8, 1);
  
  const timer = setInterval(() => {
    if (naveInimiga.classList == "nave-abatida") {
      clearInterval(timer);
    } else {
      posicaoNaveInimigo -= velocidadeNaveInimigo;

      if (posicaoNaveInimigo <= -120) {
        clearInterval(timer);
        naveInimiga.remove();
        marcarPontos(-5);
      } else {
        naveInimiga.style.left = posicaoNaveInimigo + "px";
      }
    }
    
  }, 10);
}

function atirarMissilInimigo() { 
  const navePlayer = document.querySelector(".nave");
  const navesInimigas = document.querySelectorAll(".naveInimiga");
  
  let timer = setInterval(() => {
    navesInimigas.forEach((nave) => {
      let missilColidiuNavePlayer = parseInt(nave.style.top) <= parseInt(navePlayer.style.top) + 60 && parseInt(nave.style.top) >= parseInt(navePlayer.style.top);

      if (missilColidiuNavePlayer) {
        let missilDaNaveInimiga = true
        atirar(parseInt(nave.style.top), parseInt(nave.style.left + 80), window.innerWidth - 20, gerarNumeroAleatorio(-14, -10), missilDaNaveInimiga);
        clearInterval(timer);
      }
      
    });
  }, 50);
}

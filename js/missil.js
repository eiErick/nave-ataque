import { colisao } from "./colisao.js";

export function atirar(topPositionNave, leftPositionNave, larguraDoMonitor, velocidadeMissil, missilDaNaveInimiga = false) {
    let missil = document.createElement("div");
    missil.style.top = topPositionNave + "px";
    missil.style.left = leftPositionNave + "px";
    missil.classList.add("missil");
  
    document.body.appendChild(missil);
    movimentarMissil(missil, larguraDoMonitor, leftPositionNave, velocidadeMissil, missilDaNaveInimiga);
}

function movimentarMissil(missil, larguraDoMonitor, leftPositionNave, velocidadeMissil, missilDaNaveInimiga) {
    let localMissil = leftPositionNave;
    let navePlayer = document.querySelector(".nave");
    let navesInimigas = document.querySelectorAll(".naveInimiga");
  
    const timer = setInterval(() => {
      localMissil += velocidadeMissil;
  
      if (localMissil >= larguraDoMonitor || localMissil <= 0) {
        clearInterval(timer);
        missil.remove();
        localMissil = leftPositionNave;
      } else {
        missil.style.left = localMissil + "px";

        navesInimigas.forEach((nave) => {
          if (missilDaNaveInimiga) {
            let missilAtigiuNavePlayer = parseInt(navePlayer.style.top) <= parseInt(nave.style.top) + 60 && parseInt(navePlayer.style.top) >= parseInt(nave.style.top) - 60 && localMissil <= 100;

            if (missilAtigiuNavePlayer){
              clearInterval(timer);
              colisao(missil, navePlayer);
            }

          } else if (parseInt(missil.style.top) <= parseInt(nave.style.top) + 60 && parseInt(missil.style.top) >= parseInt(nave.style.top) - 60 && localMissil >= parseInt(nave.style.left)) {
            colisao(missil, nave);
            clearInterval(timer);
          }
        });

      }
    }, 10);
}

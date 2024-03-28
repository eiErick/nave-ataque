import { marcarPontos } from "./main.js";
import { gameover } from "./gameover.js";

let navePlayerDerrotada = false;
let novoRecorde = false;

const recordeMemoria = localStorage.getItem("recorde");
const placarNumStr = document.querySelector(".placar__num");

export function colisao(missil, nave) {
    const vidas = document.querySelectorAll(".vidas-icon");
    let contadorVidas = parseInt(vidas.length);

    if (nave.classList == "naveInimiga") {
        marcarPontos(5);
    }

    if (nave.classList == "nave") {
        while (contadorVidas > 0) {
            vidas[contadorVidas - 1].remove();
            contadorVidas--;
            break;
        }

        if (contadorVidas == 0) {
            nave.remove();
            navePlayerDerrotada = true;
            const placarNum = parseInt(placarNumStr.innerHTML);
            
            if (recordeMemoria == null) {
                localStorage.setItem("recorde", placarNum);
            } else if (placarNum > recordeMemoria) {
                localStorage.setItem("recorde", placarNum);
                novoRecorde = placarNum;
            }
            
            gameover(placarNum);
        }

    } else {
        nave.classList.remove("naveInimiga");
        nave.classList.add("nave-abatida");
        nave.remove();
    }
    
    missil.remove();   
}

export { navePlayerDerrotada, novoRecorde };

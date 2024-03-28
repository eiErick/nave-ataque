const pontosMelhorias = document.querySelector(".quantidade-pontos-melhorias");
const btns = document.querySelectorAll(".btns");
const quantidadeDeMelhoriasDeVelDaNave = document.querySelector(".num-melhorias-velocidade-nave");
const quantidadeDeMelhoriasDeVelDoMissil = document.querySelector(".num-melhorias-velocidade-missil");
const quantidadeDeMelhoriasDeVida = document.querySelector(".num-melhorias-vidas");

let melhorias;

if (localStorage.getItem("melhorias") != null) {
    let melhoriasString = localStorage.getItem("melhorias");
    melhorias = JSON.parse(melhoriasString);
} else {
    let velocidadeNave = 5;
    let velocidadeMissil = 10;
    let vidasNavePlayer = 3;
    let quantidadeDeMelhorias = 0;

    melhorias = {
        "velocidadeNave": velocidadeNave,
        "velocidadeMissil": velocidadeMissil,
        "vidasNavePlayer": vidasNavePlayer,
        "quantidadeDeMelhorias": quantidadeDeMelhorias
    };

    let melhoriasString = JSON.stringify(melhorias);
    localStorage.setItem("melhorias", melhoriasString);
}

const recordeNum = localStorage.getItem("recorde");

let velocidadeNave = melhorias.velocidadeNave;
let velocidadeMissil = melhorias.velocidadeMissil;
let vidasNavePlayer = melhorias.vidasNavePlayer;
let quantidadeDeMelhorias = melhorias.quantidadeDeMelhorias;

quantidadeDeMelhoriasDeVelDaNave.innerHTML = velocidadeNave;
quantidadeDeMelhoriasDeVelDoMissil.innerHTML = velocidadeMissil;
quantidadeDeMelhoriasDeVida.innerHTML = vidasNavePlayer;

let quantidadeDePontosDeMelhorias = gerarPontosMelhorias();

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        let paiBtn = btn.parentNode;
        let classeAvoBtn = paiBtn.parentNode.classList;

        if (classeAvoBtn == "velocidade-nave") {
            if(btn.innerHTML == "+" && quantidadeDePontosDeMelhorias > 0 && velocidadeNave < 15) {
                velocidadeNave++;
                quantidadeDeMelhoriasDeVelDaNave.innerHTML = velocidadeNave;
                adicinarMelhoria();
            } else if (btn.innerHTML == "-" && velocidadeNave > 0) {
                velocidadeNave--;
                quantidadeDeMelhoriasDeVelDaNave.innerHTML = velocidadeNave;
                removerMelhoria();
            }
            
        } else if (classeAvoBtn == "velocidade-missil") {
            if(btn.innerHTML == "+" && quantidadeDePontosDeMelhorias > 0 && velocidadeMissil < 25) {
                velocidadeMissil++;
                quantidadeDeMelhoriasDeVelDoMissil.innerHTML = velocidadeMissil;
                adicinarMelhoria();
            } else if (btn.innerHTML == "-" &&  velocidadeMissil > 0) {
                velocidadeMissil--; 
                quantidadeDeMelhoriasDeVelDoMissil.innerHTML = velocidadeMissil;
                removerMelhoria();
            }

        } else if (classeAvoBtn == "vida") {
            if(btn.innerHTML == "+" && quantidadeDePontosDeMelhorias > 0 && vidasNavePlayer < 7) {
                vidasNavePlayer++;
                quantidadeDeMelhoriasDeVida.innerHTML = vidasNavePlayer;
                adicinarMelhoria();
            } else if (btn.innerHTML == "-" && vidasNavePlayer > 0) {
                vidasNavePlayer--;
                quantidadeDeMelhoriasDeVida.innerHTML = vidasNavePlayer;
                removerMelhoria();
            }
        }
    });
}); 

function gerarPontosMelhorias() {
    let quantidadeDePontosDeMelhorias = parseInt(recordeNum / 50) - parseInt(melhorias.quantidadeDeMelhorias);
    pontosMelhorias.innerHTML = quantidadeDePontosDeMelhorias;
    return quantidadeDePontosDeMelhorias;
}

function adicinarMelhoria() {
    quantidadeDePontosDeMelhorias--;
    quantidadeDeMelhorias++;
    pontosMelhorias.innerHTML = quantidadeDePontosDeMelhorias;
    
    melhorias = {
        "velocidadeNave": velocidadeNave,
        "velocidadeMissil": velocidadeMissil,
        "vidasNavePlayer": vidasNavePlayer,
        "quantidadeDeMelhorias": quantidadeDeMelhorias
    };
    
    let melhoriasString = JSON.stringify(melhorias);
    localStorage.setItem("melhorias", melhoriasString);
}

function removerMelhoria() {
    quantidadeDePontosDeMelhorias++;
    quantidadeDeMelhorias--;
    pontosMelhorias.innerHTML = quantidadeDePontosDeMelhorias;
    
    melhorias = {
        "velocidadeNave": velocidadeNave,
        "velocidadeMissil": velocidadeMissil,
        "vidasNavePlayer": vidasNavePlayer,
        "quantidadeDeMelhorias": quantidadeDeMelhorias
    };
    
    let melhoriasString = JSON.stringify(melhorias);
    localStorage.setItem("melhorias", melhoriasString);
}

import { pararGeraçãoDeNavesInimigas } from "./inimigos.js";
import { novoRecorde } from "./colisao.js";

export function gameover(pontos) {
    pararGeraçãoDeNavesInimigas();

    const div = document.createElement("div");
    const pontosP = document.createElement("p");
    const btnGameOver = document.createElement("button");
    const btnVolarParaHome = document.createElement("button");
    const btnMelhorias = document.createElement("button");

    div.classList.add("box-gameover");

    if (novoRecorde != false) {
        let recordeP = document.createElement("p");
        recordeP.innerHTML = `Novo Recorde!`;
        recordeP.classList.add("pontos-gameover");
        div.appendChild(recordeP);
    }

    pontosP.classList.add("pontos-gameover");
    pontosP.innerHTML = `Você fez ${pontos} pontos`;

    btnGameOver.classList.add("btn-jogar-novamente");
    btnGameOver.innerHTML = "Jogar Novamente";

    btnVolarParaHome.classList.add("btn-voltar-home");
    btnVolarParaHome.innerHTML = "Voltar para Home";

    btnMelhorias.classList.add("btn-loja-melhorias");
    btnMelhorias.innerHTML = "Loja de Melhorias";

    div.appendChild(pontosP);
    div.appendChild(btnGameOver);
    div.appendChild(btnVolarParaHome);
    div.appendChild(btnMelhorias);
    document.body.appendChild(div);

    btnGameOver.addEventListener("click", () => {
        window.location.reload();
    });

    btnVolarParaHome.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    btnMelhorias.addEventListener("click", () => {
        window.location = "loja.html";
    });
}

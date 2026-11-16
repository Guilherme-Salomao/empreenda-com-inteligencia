"use strict";

(() => {
    const botao = document.getElementById("alternar-modo");
    const rotulo = document.getElementById("texto-modo");
    if (!botao || !rotulo) return;

    const chave = "oficina-empreenda-ia:modo-v1";
    let modo = "apresentacao";

    try {
        const salvo = window.localStorage.getItem(chave);
        if (salvo === "apresentacao" || salvo === "atividade") modo = salvo;
    } catch (_) {
        // A interface continua funcionando se o armazenamento estiver bloqueado.
    }

    function aplicarModo() {
        const apresentacao = modo === "apresentacao";
        document.body.classList.toggle("modo-apresentacao", apresentacao);
        document.body.classList.toggle("modo-atividade", !apresentacao);
        rotulo.textContent = apresentacao ? "Modo apresentação" : "Modo atividade";
        botao.setAttribute("aria-pressed", String(apresentacao));
        botao.setAttribute(
            "aria-label",
            apresentacao ? "Alternar para modo atividade" : "Alternar para modo apresentação"
        );
    }

    botao.addEventListener("click", () => {
        modo = modo === "apresentacao" ? "atividade" : "apresentacao";
        aplicarModo();
        try { window.localStorage.setItem(chave, modo); } catch (_) { /* opcional */ }
    });

    aplicarModo();
})();

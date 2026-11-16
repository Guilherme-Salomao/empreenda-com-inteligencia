"use strict";
/* ============================================================
   EMPREENDA COM INTELIGÊNCIA — MÓDULOS.JS VERSÃO 2.5
   01. Módulos | 02. Carregamento | 03. Saltos de slides
   04. Interatividade | 05. Teclado | 06. Âncoras | 07. Erros
   ============================================================ */
(() => {
  // 01. ORDEM DOS SLIDES: a explicação vem ANTES do exercício.
  const caminhos = [
    "modulos/01-abertura.html",
    "modulos/02-empreendedor-ia.html",
    "modulos/03-jornada.html",
    "modulos/03b-o-que-e-agente.html",
    "modulos/04-desafio-publicidade.html",
    "modulos/05-desafio-negocios.html",
    "modulos/06-encerramento.html"
  ];
  const conteudo = document.getElementById("conteudo");
  if (!conteudo) return;
  let slides = [];
  let carregados = false;
  let ultimaTroca = 0;
  const intervalo = 650;
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  // 02. ESTILOS DE CONTROLE: apresentação instantânea, atividade livre.
  const regras = document.createElement("style");
  regras.id = "oficina-slides-navegacao";
  regras.textContent = `
    html:has(body.modo-apresentacao) {
      scroll-snap-type: none !important;
      scroll-behavior: auto !important;
    }
    body.modo-apresentacao #conteudo > section {
      scroll-snap-align: none !important;
    }
    html:has(body.modo-atividade) {
      scroll-snap-type: none !important;
    }
  `;
  document.head.appendChild(regras);

  const apresentando = () => document.body.classList.contains("modo-apresentacao");
  const topo = secao => Math.round(secao.getBoundingClientRect().top + window.scrollY);
  const indexAtual = () => {
    if (!slides.length) return 0;
    // A localização por borda superior impede pular slides com alturas diferentes.
    const y = window.scrollY + Math.min(window.innerHeight * .3, 190);
    let indice = 0;
    for (let i = 0; i < slides.length; i++) {
      if (topo(slides[i]) <= y) indice = i;
    }
    return indice;
  };
  const irPara = (indice) => {
    if (!carregados || indice < 0 || indice >= slides.length) return false;
    window.scrollTo({top: topo(slides[indice]),left:0,behavior:"instant"});
    return true;
  };
  const trocar = (direcao) => {
    const agora = performance.now();
    if (agora - ultimaTroca < intervalo) return;
    if (irPara(indexAtual() + direcao)) ultimaTroca = agora;
  };
  const editavel = elemento => elemento instanceof Element && Boolean(elemento.closest("textarea,input,select,[contenteditable='true']"));
  const modalAberto = () => Boolean(document.querySelector(".pub-ajuda__overlay:not([hidden]),.publicidade__ajuda-overlay:not([hidden])"));
  const interiorRola = (elemento, direcao) => {
    let atual = elemento instanceof Element ? elemento : null;
    while (atual && atual !== document.body) {
      const estilo = getComputedStyle(atual);
      if (["auto","scroll"].includes(estilo.overflowY) && atual.scrollHeight > atual.clientHeight + 2) {
        if (direcao > 0 && atual.scrollTop < atual.scrollHeight - atual.clientHeight - 2) return true;
        if (direcao < 0 && atual.scrollTop > 2) return true;
      }
      atual = atual.parentElement;
    }
    return false;
  };

  // 03. A roda do mouse avança exatamente um slide, sem rolagem lenta.
  window.addEventListener("wheel", evento => {
    if (!carregados || !apresentando() || evento.ctrlKey || !evento.deltaY) return;
    // Uma janela de ajuda deve ser rolada dentro dela, nunca mudar de slide.
    if (modalAberto()) { evento.preventDefault(); return; }
    const direcao = evento.deltaY > 0 ? 1 : -1;
    if (interiorRola(evento.target, direcao)) return;

    // 04. A dobra prática permanece rolável para perguntas e prompt longo.
    const atual = indexAtual();
    const secao = slides[atual];
    const ehDesafio = secao && ["desafio-publicidade","desafio-negocios"].includes(secao.id);
    if (ehDesafio) {
      const inicio = topo(secao);
      const final = inicio + secao.offsetHeight - window.innerHeight;
      const y = window.scrollY;
      const podeRolar = (direcao > 0 && y < final - 3) || (direcao < 0 && y > inicio + 3);
      if (podeRolar) return;
    }
    evento.preventDefault();
    trocar(direcao);
  }, {passive:false});

  // 05. Teclas também passam diretamente à próxima dobra.
  window.addEventListener("keydown", evento => {
    if (!carregados || !apresentando() || modalAberto() || evento.altKey || evento.ctrlKey || evento.metaKey || editavel(evento.target)) return;
    if (evento.target instanceof Element && evento.target.closest("button,a")) return;
    const direcao = ["ArrowDown","PageDown"].includes(evento.key) ? 1 :
      ["ArrowUp","PageUp"].includes(evento.key) ? -1 :
      evento.key === " " ? (evento.shiftKey ? -1 : 1) : 0;
    if (!direcao) return;
    const secao = slides[indexAtual()];
    if (secao && ["desafio-publicidade","desafio-negocios"].includes(secao.id)) {
      const inicio = topo(secao);
      const fim = inicio + secao.offsetHeight - window.innerHeight;
      if ((direcao > 0 && window.scrollY < fim - 3) || (direcao < 0 && window.scrollY > inicio + 3)) return;
    }
    evento.preventDefault();
    trocar(direcao);
  });

  // 06. Âncoras: sem hash abre o primeiro slide.
  function irParaAncora() {
    let destino = null;
    try {if(location.hash && location.hash !== "#") destino = document.getElementById(decodeURIComponent(location.hash.slice(1)));}
    catch (_) { /* hash inválida */ }
    window.scrollTo({top: destino ? topo(destino) : 0,left:0,behavior:"instant"});
    ultimaTroca = 0;
  }
  window.addEventListener("hashchange", () => {if(carregados) irParaAncora();});

  // 07. Carregamento e erros.
  async function carregar(caminho) {
    const resposta = await fetch(caminho,{cache:"no-cache"});
    if (!resposta.ok) throw new Error(`${caminho}: HTTP ${resposta.status}`);
    const html = await resposta.text();
    if (!html.trim()) throw new Error(`Módulo vazio: ${caminho}`);
    return html;
  }
  async function iniciar() {
    conteudo.setAttribute("aria-busy","true");
    try {
      const resultados = await Promise.all(caminhos.map(carregar));
      conteudo.innerHTML = resultados.join("\n");
      slides = Array.from(conteudo.querySelectorAll(":scope > section"));
      carregados = true;
      conteudo.setAttribute("aria-busy","false");
      document.dispatchEvent(new CustomEvent("oficina:modulos-carregados"));
      requestAnimationFrame(() => requestAnimationFrame(irParaAncora));
      console.info(`[Oficina] ${slides.length} dobras carregadas, navegação por slides habilitada.`);
    } catch (erro) {
      carregados = false;
      console.error("[Oficina] Erro ao carregar módulos:",erro);
      conteudo.innerHTML = "";
      const aviso = document.createElement("section");
      aviso.setAttribute("role","alert");
      aviso.style.cssText = "min-height:100vh;display:grid;place-items:center;padding:40px;background:#0b1020;color:#fff";
      aviso.textContent = "Não foi possível carregar a oficina. Verifique o Apache e os arquivos dos módulos.";
      conteudo.appendChild(aviso);
    } finally {conteudo.setAttribute("aria-busy","false");}
  }
  iniciar();
})();

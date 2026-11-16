"use strict";
/* ============================================================
   EMPREENDA COM INTELIGÊNCIA — DESAFIO 01 — VERSÃO 3.0
   01. Perguntas e ajuda
   02. Estilos educativos
   03. Inicialização e explicação de agente
   04. Navegação e ajuda contextual
   05. Prompt completo da agência
   06. Finalização e cópia
   ============================================================ */
(() => {
  // 01. PERGUNTAS, COM EXPLICAÇÕES E EXEMPLOS REAIS
  const perguntas = [
    {chave:"produto", titulo:"O que você deseja divulgar?", ajuda:"Descreva o seu negócio, o que ele vende e quais campanhas deseja criar.", exemplo:"Uma loja de roupas vende coleções e apresenta novidades.", placeholder:"Ex.: loja de roupas unissex que divulga coleções e ofertas", obrigatoria:true,
     explicacao:"Não basta responder 'loja de roupas'. Explique o que vende, para quem e o objetivo da publicidade.", ruim:"Loja de roupas.", bom:"Loja de roupas unissex para pessoas de 15 a 60 anos. Queremos divulgar coleções, ofertas e conteúdos para Instagram e Facebook.", motivo:"A IA passa a conhecer o negócio e o objetivo das campanhas."},
    {chave:"publico", titulo:"Para quem você deseja vender?", ajuda:"Descreva idade, interesses, necessidades e ocasiões de compra.", exemplo:"Uma marmitaria atende trabalhadores; uma loja de roupas atende jovens e adultos.", placeholder:"Ex.: jovens e adultos que procuram conforto e estilo", obrigatoria:false,
     explicacao:"O público influencia linguagem, imagens e assuntos. Pense em quem realmente compra ou usa o produto.", ruim:"Para todo mundo.", bom:"Adolescentes e adultos de 15 a 60 anos, de todos os gêneros, que procuram roupas versáteis para trabalho, lazer e dia a dia.", motivo:"A campanha pode falar de necessidades e ocasiões reais do público."},
    {chave:"diferencial", titulo:"O que torna seu produto especial?", ajuda:"Diga quais características reais merecem destaque, sem prometer o que não pode comprovar.", exemplo:"Variedade de tamanhos; produtos sob encomenda; atendimento personalizado.", placeholder:"Ex.: peças versáteis e opções para diferentes estilos", obrigatoria:false,
     explicacao:"Evite afirmações vagas, como 'somos os melhores'. Descreva características concretas e verdadeiras.", ruim:"Temos os melhores produtos.", bom:"Roupas unissex para diferentes estilos e ocasiões, com sugestões de combinações de looks e variedade de modelos.", motivo:"A IA terá elementos reais para destacar na publicidade."},
    {chave:"promocao", titulo:"Você tem alguma promoção?", ajuda:"Se existir uma oferta, informe as condições reais. Se não houver, pule.", exemplo:"10% na primeira compra, quando confirmado; ou ofertas sazonais ainda sem valores definidos.", placeholder:"Ex.: ofertas em peças selecionadas; valores a confirmar", obrigatoria:false,
     explicacao:"Preços, descontos e prazos são informações comerciais: precisam vir da empresa, nunca da imaginação da IA.", ruim:"Tem promoção.", bom:"Queremos anunciar ofertas de peças selecionadas. Preços, descontos e prazos serão confirmados antes de cada arte.", motivo:"O agente saberá solicitar os dados da oferta antes de divulgar valores."},
    {chave:"estilo", titulo:"Como você quer que a propaganda fale?", ajuda:"Indique se a linguagem será divertida, moderna, profissional, acolhedora ou outra.", exemplo:"Loja jovem: descontraída. Escritório: profissional e objetiva.", placeholder:"Ex.: moderna, criativa e acolhedora", obrigatoria:false,
     explicacao:"O tom de voz faz a propaganda soar coerente com a marca e o público.", ruim:"Uma propaganda bonita.", bom:"Comunicação moderna, criativa, descontraída e acolhedora, simples para pessoas de diferentes idades.", motivo:"A IA saberá como formular títulos, legendas e convites para ação."},
    {chave:"rede", titulo:"Onde você deseja divulgar?", ajuda:"Indique os canais e formatos: feed, Stories, Reels, TV ou materiais impressos.", exemplo:"Instagram e Facebook, com publicações no feed, Stories e vídeos curtos.", placeholder:"Ex.: Instagram e Facebook — feed, Stories e Reels", obrigatoria:false,
     explicacao:"Uma proporção 9:16 serve a Stories e Reels, mas NÃO significa que a imagem deva imitar a interface de um aplicativo.", ruim:"Nas redes sociais.", bom:"Instagram e Facebook; imagens para feed, Stories, Reels e vídeos curtos com lançamentos, looks e ofertas.", motivo:"O agente poderá adaptar formatos, proporções e conteúdos."}
  ];

  // 02. ESTILOS DA EXPLICAÇÃO E DA AJUDA — ISOLADOS NA DOBRA 04
  function instalarEstilos() {
    if (document.getElementById("pub-estilos-v3")) return;
    const style = document.createElement("style");
    style.id = "pub-estilos-v3";
    style.textContent = `
      .pub-pergunta-titulo{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}
      .pub-pergunta-titulo h3{margin:0;flex:1}
      .pub-ajuda__abrir{display:inline-flex;align-items:center;gap:7px;flex-shrink:0;border:1px solid rgba(34,211,238,.45);border-radius:10px;background:rgba(34,211,238,.1);color:#67e8f9;padding:9px 12px;font-weight:700;cursor:pointer}
      .pub-ajuda__overlay{position:fixed;inset:0;z-index:10000;background:rgba(3,7,19,.86);display:grid;place-items:center;padding:18px}
      .pub-ajuda__overlay[hidden]{display:none!important}
      .pub-ajuda__dialogo{width:min(760px,100%);max-height:90dvh;overflow:auto;overscroll-behavior:contain;border:1px solid rgba(130,87,255,.45);border-radius:20px;padding:clamp(20px,3vw,30px);background:#15203d;color:#f8fafc;box-shadow:0 25px 80px #0008}
      .pub-ajuda__dialogo h3{font-size:1.55rem;margin:0 0 12px;color:#fff}
      .pub-ajuda__dialogo p{color:#dce5f5;line-height:1.6}
      .pub-ajuda__categoria{font-size:.78rem;font-weight:850;letter-spacing:.06em;margin:0 0 6px;color:#67e8f9}
      .pub-ajuda__modelo{border-radius:10px;padding:13px 16px;margin:12px 0;background:#101a32;border:1px solid #3a4665}
      .pub-ajuda__modelo.ruim{border-left:4px solid #fb7185}
      .pub-ajuda__modelo.bom{border-left:4px solid #34d399}
      .pub-ajuda__modelo b{color:#fff}
      .pub-ajuda__modelo p{margin:5px 0 0}
      .pub-ajuda__barra{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:10px}
      .pub-ajuda__x{border:1px solid #52617d;background:#263352;color:#fff;border-radius:9px;padding:7px 12px;cursor:pointer}
      .pub-final__passos{padding:12px 16px;margin:0 0 15px;text-align:left;background:rgba(34,211,238,.07);border:1px solid rgba(34,211,238,.2);border-radius:12px;color:#e0eafa}
      .pub-final__passos p{margin:0 0 7px;color:#e0eafa}
      .pub-final__passos p:last-child{margin-bottom:0}
    `;
    document.head.appendChild(style);
  }

  // 03. INICIALIZAÇÃO APÓS O CARREGAMENTO ASSÍNCRONO
  function iniciar() {
    const formulario = document.getElementById("form-publicidade");
    if (!formulario || formulario.dataset.iniciado === "true") return;
    const ids = ["pub-pergunta","pub-ajuda","pub-exemplo","pub-resposta","pub-erro","pub-etapa","pub-percentual","pub-progresso-barra","pub-voltar","pub-pular","pub-proximo","pub-progresso","pub-finalizacao","pub-texto-gerado","pub-copiar","pub-feedback","pub-recomecar"];
    const el = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));
    if (Object.values(el).some(v => !v)) {console.error("[Oficina] HTML da dobra 04 incompleto.");return;}
    formulario.dataset.iniciado = "true";
    instalarEstilos();
    let indice = 0, respostas = {}, promptAtual = "", ajudaAberta = false;

    // O conceito de agentes agora tem uma dobra própria (03b).
    // Aqui mostramos diretamente as perguntas, sem repetir a introdução.
    const progresso = el["pub-progresso"];
    const finalizacao = el["pub-finalizacao"];
    formulario.hidden = false;
    progresso.hidden = false;
    finalizacao.hidden = true;

    // 04. AJUDA DIDÁTICA: resposta vaga x resposta contextualizada.
    const titulo = el["pub-pergunta"];
    const linha = document.createElement("div");
    linha.className = "pub-pergunta-titulo";
    titulo.parentNode.insertBefore(linha, titulo);
    linha.appendChild(titulo);
    const abrir = document.createElement("button");
    abrir.type = "button";
    abrir.className = "pub-ajuda__abrir";
    abrir.innerHTML = '<i class="bi bi-question-circle-fill" aria-hidden="true"></i> Ajuda para responder';
    abrir.setAttribute("aria-haspopup", "dialog");
    linha.appendChild(abrir);
    const overlay = document.createElement("div");
    overlay.className = "pub-ajuda__overlay";
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="pub-ajuda__dialogo" role="dialog" aria-modal="true" aria-labelledby="pub-modal-titulo" tabindex="-1">
        <div class="pub-ajuda__barra"><strong style="color:#67e8f9">COMO RESPONDER MELHOR</strong><button class="pub-ajuda__x" type="button" aria-label="Fechar ajuda">✕</button></div>
        <h3 id="pub-modal-titulo"></h3>
        <p id="pub-modal-explica"></p>
        <div class="pub-ajuda__modelo ruim"><span class="pub-ajuda__categoria">RESPOSTA GENÉRICA</span><p id="pub-modal-ruim"></p></div>
        <div class="pub-ajuda__modelo bom"><span class="pub-ajuda__categoria">RESPOSTA MAIS COMPLETA</span><p id="pub-modal-bom"></p></div>
        <p id="pub-modal-motivo"></p>
        <button class="pub-ajuda__fechar" type="button">Entendi! Vou responder</button>
      </div>`;
    document.body.appendChild(overlay);
    const dialogo = overlay.querySelector(".pub-ajuda__dialogo");
    function fecharAjuda() {overlay.hidden=true;ajudaAberta=false;abrir.focus({preventScroll:true});}
    abrir.addEventListener("click", () => {
      const q = perguntas[indice];
      [["pub-modal-titulo",q.titulo],["pub-modal-explica",q.explicacao],["pub-modal-ruim",q.ruim],["pub-modal-bom",q.bom],["pub-modal-motivo",q.motivo]].forEach(([id,v])=>overlay.querySelector("#"+id).textContent=v);
      overlay.hidden=false;ajudaAberta=true;dialogo.focus({preventScroll:true});
    });
    overlay.querySelector(".pub-ajuda__x").addEventListener("click",fecharAjuda);
    overlay.querySelector(".pub-ajuda__fechar").addEventListener("click",fecharAjuda);
    overlay.addEventListener("click",e=>{if(e.target===overlay)fecharAjuda();});
    overlay.addEventListener("wheel",e=>e.stopPropagation(),{passive:true});
    overlay.addEventListener("keydown",e=>{
      e.stopPropagation();
      if(e.key==="Escape"){e.preventDefault();fecharAjuda();}
      if(e.key==="Tab"){
        const a=overlay.querySelector(".pub-ajuda__x"),b=overlay.querySelector(".pub-ajuda__fechar");
        if(e.shiftKey&&(document.activeElement===a||document.activeElement===dialogo)){e.preventDefault();b.focus();}
        else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();a.focus();}
      }
    });

    function exibirPergunta() {
      const q=perguntas[indice], n=indice+1, pct=Math.round(n/perguntas.length*100);
      el["pub-pergunta"].textContent=q.titulo;
      el["pub-ajuda"].textContent=q.ajuda;
      el["pub-exemplo"].textContent=q.exemplo;
      el["pub-resposta"].placeholder=q.placeholder;
      el["pub-resposta"].value=respostas[q.chave]||"";
      el["pub-resposta"].required=q.obrigatoria;
      el["pub-etapa"].textContent=`Pergunta ${n} de ${perguntas.length}`;
      el["pub-percentual"].textContent=`${pct}%`;
      el["pub-progresso-barra"].style.width=`${pct}%`;
      el["pub-voltar"].disabled=indice===0;
      el["pub-pular"].hidden=q.obrigatoria;
      el["pub-proximo"].textContent=indice===perguntas.length-1?"Gerar instruções do assistente":"Próxima pergunta →";
      el["pub-erro"].hidden=true;
      el["pub-erro"].textContent="";
      overlay.hidden=true;ajudaAberta=false;
    }

    function avancar(pular=false) {
      document.body.classList.add("assistente-publicidade-ativo");
      const q=perguntas[indice], valor=pular?"":el["pub-resposta"].value.trim();
      if(q.obrigatoria&&!valor){el["pub-erro"].textContent="Explique o que deseja divulgar. Pode ser um negócio imaginário.";el["pub-erro"].hidden=false;return;}
      respostas[q.chave]=valor;
      if(indice<perguntas.length-1){indice++;exibirPergunta();el["pub-resposta"].focus({preventScroll:true});}
      else finalizar();
    }

    // 05. PROMPT CONSOLIDADO, VALIDADO NO TESTE MANUAL.
    function montarPrompt() {
      const dado=(chave,padrao)=>respostas[chave]||padrao;
      return `# ASSISTENTE DE PUBLICIDADE — AGÊNCIA CRIATIVA COM IA

## 1. SUA FUNÇÃO
Você é meu assistente de publicidade, com atuação de agência criativa especializada em direção de arte, campanhas, fotografia comercial e conteúdos para redes sociais. Atenda de maneira didática, simples e profissional. Faça uma pergunta de cada vez, exceto ao pedir os dados iniciais do produto. Não repita perguntas já respondidas.

## 2. INFORMAÇÕES DA EMPRESA
Negócio, produtos e objetivos: ${dado("produto","não informado")}
Público-alvo: ${dado("publico","a definir")}
Diferenciais confirmados: ${dado("diferencial","a definir")}
Promoções ou política de ofertas: ${dado("promocao","nenhuma promoção confirmada")}
Tom de comunicação: ${dado("estilo","simples, criativo e acolhedor")}
Canais de divulgação: ${dado("rede","a definir")}

Essas informações são o contexto geral da empresa. Adapte cada campanha ao produto individual e não assuma que qualquer detalhe da empresa já define a identificação do produto.

## 3. PRIMEIRA ETAPA — IDENTIFICAÇÃO OBRIGATÓRIA
ANTES de qualquer publicidade, peça: (1) fotografia real do produto; (2) nome comercial; (3) marca, se houver; (4) modelo/código/referência, se houver. A foto e o nome são obrigatórios para campanhas de produto. Se a atividade for divulgar um serviço sem produto físico, peça uma imagem real apropriada ao serviço, se houver, e confirme como representá-lo. Não crie campanha antes de receber os dados necessários. Nunca deduza marca ou modelo apenas pela foto. Confirme em um resumo e prossiga.

## 4. FIDELIDADE À FOTOGRAFIA
O produto real não pode ser redesenhado, alterado ou substituído. Preserve cores, formatos, proporções, logotipos, estampas, texturas, acabamentos, inscrições, detalhes e identificação comercial. A criatividade deve acontecer no cenário, composição, iluminação ambiental, elementos gráficos e narrativa, não no produto. IA generativa pode alterar detalhes mesmo com instruções em contrário; se a fidelidade for crítica, recomende montar a publicidade usando a foto original sem reconstruir o produto. Nunca declare preservação perfeita sem conferência visual.

## 5. CONHECER A CATEGORIA
Analise a categoria, utilização, público e características confirmadas antes de criar. Escolha um contexto visual específico: calçados podem sugerir movimento; roupas, editorial de moda; alimentos, fotografia gastronômica; computadores, tecnologia ou trabalho; óculos, retratos; ferramentas, ambientes de utilização segura; cosméticos, cuidados; móveis, ambientes internos. Esses são EXEMPLOS, não receitas fixas. Para outras categorias, desenvolva abordagem própria. Não invente benefícios, materiais ou características técnicas.

## 6. OBJETIVO E CONDIÇÕES COMERCIAIS
Pergunte qual o objetivo: nova coleção, apresentação do produto, promoção, conteúdo de redes sociais, data especial ou outro. Em promoções, confirme preço original, preço promocional, desconto e validade SOMENTE quando relevantes. Não invente preços, urgência, escassez de estoque, disponibilidade, condições de entrega, WhatsApp, endereço ou links. Verifique cálculos antes de afirmar descontos.

## 7. FORMATO
Pergunte onde a arte será publicada: Instagram feed 1:1, vertical 4:5, Stories/Reels 9:16, Facebook ou outro. Referências: 1080x1080, 1080x1350 e 1080x1920 px. Se a ferramenta não suportar resolução exata, avise e preserve a proporção. Formato de rede social NÃO significa incluir interface do aplicativo.

## 8. DIREÇÃO CRIATIVA DE AGÊNCIA
Atue como diretor de criação profissional. Adeque cenário, enquadramento, perspectiva, iluminação comercial, cores, tipografia e contexto ao produto. Pessoas podem aparecer quando fizer sentido (corredor para tênis, modelo para roupa, profissional para ferramenta), sem competir com o produto. Não use sempre pedestal, fundo preto, neon, fumaça ou efeitos sem justificativa. Produto como protagonista.

## 9. TRÊS CONCEITOS PARA APROVAÇÃO
Antes de criar a arte apresente três conceitos realmente diferentes e adaptados ao produto: A) Comercial — clareza e destaque do produto; B) Contexto de uso — cenário/pessoa pertinente; C) Criativo e impactante — direção de arte original. Explique brevemente cenário, composição, iluminação e motivo de cada opção. Recomende um e aguarde a escolha do cliente.

## 10. PROPOSTA VISUAL ANTES DE GERAR
Depois da escolha, apresente SOMENTE a identificação do produto, o objetivo, as informações comerciais confirmadas, o título, a frase que aparecerá na imagem e o conceito visual resumido. Prepare o prompt técnico da imagem com foto real, características preservadas, conceito, cenário, tipografia, oferta e proporção. NÃO entregue ainda legenda, hashtags ou convite separado.

## 11. NÃO SIMULE INTERFACES
A arte deve ser uma peça publicitária limpa, pronta para publicar. Não inclua coração de curtir, aviãozinho de enviar, barra de Stories, botões, comentários, molduras de celular ou interface do Instagram/Facebook, salvo quando o cliente pedir explicitamente um mockup.

## 12. AUTORIZAÇÃO E GERAÇÃO DA ARTE
Pergunte: "Gostou da proposta? Posso criar a arte usando a fotografia original?" Aguarde autorização. Depois, se a geração/edição de imagem estiver disponível, gere a composição aprovada com acabamento profissional, texto legível e fidelidade ao produto. Se a ferramenta não estiver disponível, informe e forneça o prompt de imagem; nunca diga que criou o que não criou.

## 13. ENTREGA: IMAGEM PRIMEIRO, TEXTOS DEPOIS
REGRA OBRIGATÓRIA: primeiro apresente a imagem criada. SOMENTE DEPOIS dela mostre, em blocos claramente separados e fáceis de copiar: (1) LEGENDA pronta para Instagram/Facebook; (2) CINCO HASHTAGS; (3) CONVITE PARA AÇÃO com dados efetivamente confirmados. Não coloque referências internas como [cite: ...], notas técnicas, códigos de fonte ou explicações de processo nesses textos destinados ao público. Não invente urgência, estoque limitado, links ou contatos.

## 14. CONFERÊNCIA FINAL
Após imagem e textos, peça que o cliente compare a arte com a foto original e confira: cor, formato, detalhes, marca, modelo, texto, preços, condições, proporção e legibilidade. Não afirme que a imagem está 100% fiel sem verificação. Solicite aprovação final e ofereça alterações.

## 15. PRÓXIMAS CAMPANHAS
Permaneça como assistente nesta conversa. Permita novas legendas, visuais, formatos e campanhas. Para OUTRO produto, solicite NOVA foto, nome e marca/modelo quando existirem; não reutilize características do anterior. Preserve o contexto da empresa até que o usuário peça mudança.

## COMECE AGORA
Apresente-se brevemente e SOLICITE PRIMEIRO: a foto real, o nome comercial, a marca e o modelo/referência, se existirem. Explique que os dados servirão para criar publicidade profissional e preservar o produto. Não crie título, legenda, conceitos ou imagem antes de receber esses dados. Aguarde a resposta.`;
    }

    // 06. FINALIZAÇÃO E CÓPIA
    const final = el["pub-finalizacao"];
    const instrucoes = document.createElement("div");
    instrucoes.className="pub-final__passos";
    instrucoes.innerHTML=`<p><strong>O que você construiu?</strong> Instruções para o ChatGPT atuar como seu assistente de publicidade nesta conversa.</p><p><strong>1.</strong> Copie o texto. <strong>2.</strong> Abra uma nova conversa. <strong>3.</strong> Cole e envie. <strong>4.</strong> Envie a foto e o nome do produto quando o assistente solicitar.</p><p><strong>Fluxo:</strong> foto e identificação → objetivo → conceito criativo → aprovação → imagem → legenda, hashtags e convite para ação.</p>`;
    final.insertBefore(instrucoes, final.querySelector(".publicidade__resultado"));
    function finalizar() {
      promptAtual=montarPrompt();
      el["pub-texto-gerado"].value=promptAtual;
      formulario.hidden=true;
      progresso.hidden=true;
      final.hidden=false;
      el["pub-feedback"].textContent="";
    }
    async function copiar(){
      try {await navigator.clipboard.writeText(promptAtual);el["pub-feedback"].textContent="Instruções copiadas! Abra o ChatGPT, cole e envie.";}
      catch(_){const area=el["pub-texto-gerado"];area.focus({preventScroll:true});area.select();el["pub-feedback"].textContent="Texto selecionado: pressione Ctrl + C para copiar.";}
    }
    formulario.addEventListener("submit",e=>{e.preventDefault();avancar();});
    el["pub-voltar"].addEventListener("click",()=>{if(indice===0)return;respostas[perguntas[indice].chave]=el["pub-resposta"].value.trim();indice--;exibirPergunta();el["pub-resposta"].focus({preventScroll:true});});
    el["pub-pular"].addEventListener("click",()=>avancar(true));
    el["pub-copiar"].addEventListener("click",copiar);
    el["pub-recomecar"].addEventListener("click",()=>{indice=0;respostas={};promptAtual="";final.hidden=true;formulario.hidden=false;progresso.hidden=false;exibirPergunta();el["pub-resposta"].focus({preventScroll:true});});
    console.info("[Oficina] Perguntas e assistente de publicidade preparados.");
  }
  document.addEventListener("oficina:modulos-carregados",iniciar);
  if(document.getElementById("form-publicidade"))iniciar();
})();

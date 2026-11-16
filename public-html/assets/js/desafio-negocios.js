"use strict";
/* ============================================================
   DESAFIO 02 - CONSULTOR INTELIGENTE - VERSÃO 1.0
   01. Dados 02. Cálculos 03. Perguntas 04. Ajuda
   05. Prompt 06. Cópia 07. Eventos
   ============================================================ */
(() => {
  const base = [
    {nome:"Camiseta",preco:60,custo:30,unidades:40},
    {nome:"Calça jeans",preco:150,custo:90,unidades:15},
    {nome:"Bermuda",preco:80,custo:45,unidades:25},
    {nome:"Jaqueta",preco:200,custo:140,unidades:8}
  ];
  const perguntas = [
    {titulo:"Qual é sua principal dúvida sobre as vendas?",explicacao:"Pense no que você gostaria de descobrir para melhorar o negócio.",placeholder:"Ex.: Qual produto contribui mais para o resultado do mês?",obrigatoria:true,
      ajuda:"Uma dúvida específica ajuda o consultor a analisar os dados relevantes, em vez de oferecer conselhos genéricos.",curto:"Quero vender mais.",bom:"Quero descobrir quais peças contribuem mais para o resultado bruto e quais deveriam receber mais atenção nas próximas campanhas."},
    {titulo:"O que você gostaria de melhorar primeiro?",explicacao:"Você pode escolher entre aumentar vendas, reduzir custos ou organizar melhor os produtos.",placeholder:"Ex.: reduzir custos e melhorar o resultado mensal",obrigatoria:false,
      ajuda:"Diga qual melhoria tem prioridade. Assim o consultor pode ordenar as sugestões.",curto:"Melhorar a loja.",bom:"Quero identificar produtos com menor resultado bruto e avaliar ações possíveis, sem inventar descontos ou prometer aumentos de vendas."},
    {titulo:"Existe alguma limitação ou cuidado importante?",explicacao:"Pense em orçamento, estoque, equipe ou algo que você não pode mudar agora. Se não souber, pule.",placeholder:"Ex.: não posso aumentar o orçamento de publicidade",obrigatoria:false,
      ajuda:"Uma boa sugestão precisa respeitar a realidade do negócio. Diga quais recursos estão disponíveis.",curto:"Não sei.",bom:"Tenho pouco orçamento para anúncios, ainda não sei os custos fixos e prefiro ações simples que possam ser testadas durante o próximo mês."}
  ];
  const moeda = n => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n);
  const numero = v => {const n=Number(v);return Number.isFinite(n)&&n>=0?n:0;};
  function iniciar(){
    const secao=document.getElementById("desafio-negocios");
    if(!secao||secao.dataset.iniciado==="true") return;
    const $=id=>secao.querySelector("#"+id);
    const el={tabela:$("neg-tabela"),restaurar:$("neg-restaurar"),receita:$("neg-receita"),custos:$("neg-custos"),resultado:$("neg-resultado"),insight:$("neg-insight"),form:$("neg-form"),etapa:$("neg-etapa"),barra:$("neg-barra"),pergunta:$("neg-pergunta"),explicacao:$("neg-explicacao"),resposta:$("neg-resposta"),erro:$("neg-erro"),voltar:$("neg-voltar"),pular:$("neg-pular"),proximo:$("neg-proximo"),final:$("neg-final"),prompt:$("neg-prompt"),copiar:$("neg-copiar"),feedback:$("neg-feedback"),recomecar:$("neg-recomecar"),abrirAjuda:$("neg-ajuda-abrir"),fundo:$("neg-modal-fundo"),modalTitulo:$("neg-modal-titulo"),modalTexto:$("neg-modal-texto"),modalCurto:$("neg-modal-curto"),modalBom:$("neg-modal-bom"),fecharAjuda:$("neg-modal-fechar"),entendi:$("neg-modal-entendi")};
    if(Object.values(el).some(x=>!x)){console.error("[Oficina] Desafio 02 incompleto.");return;}
    secao.dataset.iniciado="true";
    let atual=0,respostas=["","",""],dados=[],prompt="";
    const linhas=()=>Array.from(el.tabela.tBodies[0].rows);
    const lerDados=()=>linhas().map(row=>({nome:row.querySelector(".negocios__produto").value.trim()||"Produto sem nome",preco:numero(row.querySelector(".negocios__preco").value),custo:numero(row.querySelector(".negocios__custo").value),unidades:Math.floor(numero(row.querySelector(".negocios__unidades").value))}));
    function calcular(){
      dados=lerDados().map(item=>({...item,receita:item.preco*item.unidades,custoTotal:item.custo*item.unidades,resultado:(item.preco-item.custo)*item.unidades}));
      const receita=dados.reduce((s,x)=>s+x.receita,0),custos=dados.reduce((s,x)=>s+x.custoTotal,0),resultado=receita-custos;
      el.receita.textContent=moeda(receita);el.custos.textContent=moeda(custos);el.resultado.textContent=moeda(resultado);
      const lider=[...dados].sort((a,b)=>b.resultado-a.resultado)[0];
      el.insight.textContent=lider?`No cenário atual, ${lider.nome} apresenta a maior contribuição para o resultado bruto (${moeda(lider.resultado)}). Isso não significa necessariamente maior lucro líquido.`:"Preencha os produtos para ver a análise.";
      return {receita,custos,resultado};
    }
    function restaurar(){linhas().forEach((row,i)=>{const item=base[i];row.querySelector(".negocios__produto").value=item.nome;row.querySelector(".negocios__preco").value=item.preco;row.querySelector(".negocios__custo").value=item.custo;row.querySelector(".negocios__unidades").value=item.unidades;});calcular();}
    function exibir(){const q=perguntas[atual];el.etapa.textContent=`Pergunta ${atual+1} de ${perguntas.length}`;el.barra.style.width=`${((atual+1)/perguntas.length)*100}%`;el.pergunta.textContent=q.titulo;el.explicacao.textContent=q.explicacao;el.resposta.placeholder=q.placeholder;el.resposta.value=respostas[atual]||"";el.erro.hidden=true;el.voltar.disabled=atual===0;el.pular.hidden=q.obrigatoria;el.proximo.innerHTML=atual===2?'Preparar meu consultor <i class="bi bi-stars" aria-hidden="true"></i>':'Próxima pergunta <i class="bi bi-arrow-right" aria-hidden="true"></i>';el.form.hidden=false;el.final.hidden=true;}
    function prepararPrompt(){const tot=calcular();const linhasTexto=dados.map(x=>`- ${x.nome}: preço de venda ${moeda(x.preco)}; custo unitário ${moeda(x.custo)}; unidades vendidas ${x.unidades}; receita ${moeda(x.receita)}; custo total ${moeda(x.custoTotal)}; resultado bruto ${moeda(x.resultado)}.`).join("\n");
      return ["VOCÊ SERÁ MEU CONSULTOR INTELIGENTE DE NEGÓCIOS","","Atue como um consultor didático de pequenos negócios. Use linguagem simples e exemplos do cotidiano. Analise apenas os números fornecidos e não invente dados.","","CENÁRIO", "Loja de roupas (dados fictícios de um mês).","", "DADOS DOS PRODUTOS",linhasTexto,"","TOTAIS CALCULADOS",`Receita total: ${moeda(tot.receita)}`,`Custo total dos produtos vendidos: ${moeda(tot.custos)}`,`Resultado bruto: ${moeda(tot.resultado)}`,"","DÚVIDAS E OBJETIVOS",`Principal dúvida: ${respostas[0]||"Quais produtos contribuem mais para o resultado bruto?"}`,`Melhoria desejada: ${respostas[1]||"Não definida"}`,`Limitações: ${respostas[2]||"Não informadas"}`,"","SUA TAREFA", "1. Confira os cálculos de receita, custos e resultado bruto para cada produto e os totais.","2. Explique qual produto mais contribuiu para o resultado bruto do mês e por quê.","3. Identifique diferenças entre volume vendido e contribuição financeira.","4. Proponha TRÊS ações práticas para melhorar o negócio, com benefícios, cuidados e uma forma simples de testar cada ação.","5. Escolha a ação mais viável considerando as limitações informadas e explique o motivo.","6. Faça UMA pergunta por vez quando faltar informação essencial.","","CUIDADOS OBRIGATÓRIOS", "- Resultado bruto = receita de vendas menos custos dos produtos vendidos; não confunda com lucro líquido.","- Custos fixos, tributos, fretes, taxas, devoluções e outras despesas não estão incluídos.","- Não invente valores, estoque, tendências, concorrentes nem garantias de crescimento.","- Não recomende desconto sem considerar seu impacto nos resultados.","- Diferencie fatos calculados de hipóteses e sugestões.","- Não execute ações reais nem publique informações sem minha aprovação.","","COMECE AGORA", "Apresente uma análise curta e clara dos números. Depois mostre três ações em linguagem simples, com a recomendação final. Ao terminar, pergunte qual ação quero experimentar."].join("\n");}
    function avancar(pular=false){const txt=pular?"":el.resposta.value.trim();if(perguntas[atual].obrigatoria&&!txt){el.erro.textContent="Escreva uma dúvida sobre os resultados da loja.";el.erro.hidden=false;el.resposta.focus({preventScroll:true});return;}respostas[atual]=txt;if(atual<perguntas.length-1){atual++;exibir();el.resposta.focus({preventScroll:true});}else{prompt=prepararPrompt();el.prompt.value=prompt;el.form.hidden=true;el.final.hidden=false;el.feedback.textContent="";}}
    function abrirAjuda(){const q=perguntas[atual];el.modalTitulo.textContent=q.titulo;el.modalTexto.textContent=q.ajuda;el.modalCurto.textContent=q.curto;el.modalBom.textContent=q.bom;el.fundo.hidden=false;el.fecharAjuda.focus({preventScroll:true});}
    function fecharAjuda(){el.fundo.hidden=true;el.abrirAjuda.focus({preventScroll:true});}
    el.tabela.addEventListener("input",calcular);el.restaurar.addEventListener("click",restaurar);
    el.form.addEventListener("submit",e=>{e.preventDefault();avancar();});
    el.voltar.addEventListener("click",()=>{if(atual===0)return;respostas[atual]=el.resposta.value.trim();atual--;exibir();el.resposta.focus({preventScroll:true});});
    el.pular.addEventListener("click",()=>avancar(true));
    el.recomecar.addEventListener("click",()=>{atual=0;respostas=["","",""];prompt="";exibir();el.resposta.focus({preventScroll:true});});
    el.copiar.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(prompt);el.feedback.textContent="Instruções copiadas! Abra o ChatGPT e cole em uma nova conversa.";}catch(e){el.prompt.focus({preventScroll:true});el.prompt.select();el.feedback.textContent="Texto selecionado. Pressione Ctrl + C.";}});
    el.abrirAjuda.addEventListener("click",abrirAjuda);el.fecharAjuda.addEventListener("click",fecharAjuda);el.entendi.addEventListener("click",fecharAjuda);el.fundo.addEventListener("click",e=>{if(e.target===el.fundo)fecharAjuda();});
    el.fundo.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault();fecharAjuda();}else if(e.key==="Tab"){const itens=[el.fecharAjuda,el.entendi];if(e.shiftKey&&document.activeElement===itens[0]){e.preventDefault();itens[1].focus();}else if(!e.shiftKey&&document.activeElement===itens[1]){e.preventDefault();itens[0].focus();}}});
    /* O mouse deve rolar a explicação sem passar à dobra seguinte. */
    el.fundo.addEventListener("wheel",e=>e.stopPropagation(),{passive:true});
    restaurar();exibir();console.info("[Oficina] Desafio 02 iniciado.");
  }
  document.addEventListener("oficina:modulos-carregados",iniciar);
  if(document.getElementById("desafio-negocios"))iniciar();
})();

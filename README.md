# Empreenda com Inteligência: Explorando Ferramentas de IA

Plataforma web interativa desenvolvida para a oficina presencial **Empreenda com Inteligência: Explorando Ferramentas de IA**, com foco na aplicação prática da inteligência artificial ao empreendedorismo.

A experiência combina uma apresentação navegável por slides com **dois desafios práticos**: criação de publicidade com IA e análise de dados para tomada de decisões em pequenos negócios.

## Objetivo

Demonstrar, de maneira acessível, como ferramentas de IA podem ajudar empreendedores a organizar ideias, criar materiais publicitários, interpretar dados e avaliar alternativas. A proposta é educativa: as recomendações e os conteúdos gerados devem ser conferidos e aprovados pelo participante.

## Funcionalidades

- **Apresentação interativa:** navegação entre as dobras por roda do mouse, teclado e links internos.
- **Modos de visualização:** apresentação por slides e atividade com rolagem livre.
- **Introdução aos agentes de IA:** comparação entre assistentes orientados por instruções e agentes que utilizam ferramentas.
- **Desafio 01 — Publicidade com IA:** perguntas guiadas, orientações didáticas, exemplos e geração de instruções para usar em uma conversa no ChatGPT.
- **Desafio 02 — Consultor de Negócios:** cenário fictício com produtos, preços, custos, quantidades, indicadores calculados e geração de instruções para análise no ChatGPT.
- **Encerramento:** revisão das aprendizagens e reflexão sobre aplicações práticas.

> **Importante:** o site não cria um agente autônomo, não acessa contas de participantes e não envia informações automaticamente ao ChatGPT. Os prompts são preparados localmente e copiados pelo próprio usuário. O ChatGPT é uma ferramenta externa, sujeita aos seus próprios limites e condições de uso.

## Conteúdo da oficina

| Dobra | Conteúdo |
| --- | --- |
| 01 | Abertura e apresentação da oficina |
| 02 | O empreendedor na era da inteligência artificial |
| 03 | Nossa jornada e os desafios práticos |
| 04 | O que são assistentes e agentes de IA |
| 05 | Desafio 01 — Assistente de publicidade |
| 06 | Desafio 02 — Consultor inteligente de negócios |
| 07 | Encerramento e reflexão |

## Tecnologias

- HTML5, CSS3 e JavaScript (Vanilla JS)
- Bootstrap Icons por CDN
- Módulos HTML carregados via `fetch()`
- `localStorage` para preservar a preferência de modo de visualização
- ChatGPT como ferramenta externa para os exercícios

Não é necessário banco de dados, framework JavaScript ou chave de API para executar o site.

## Estrutura do projeto

```text
oficina-empreenda-ia/
├── public-html/
│   ├── index.html
│   ├── .htaccess
│   ├── modulos/
│   │   ├── 01-abertura.html
│   │   ├── 02-empreendedor-ia.html
│   │   ├── 03-jornada.html
│   │   ├── 03b-o-que-e-agente.html
│   │   ├── 04-desafio-publicidade.html
│   │   ├── 05-desafio-negocios.html
│   │   └── 06-encerramento.html
│   └── assets/
│       ├── css/
│       │   ├── style.css
│       │   └── modulos/
│       ├── js/
│       │   ├── app.js
│       │   ├── modulos.js
│       │   ├── desafio-publicidade.js
│       │   └── desafio-negocios.js
│       └── img/
│           └── avatar-instrutor.png
├── private/              # dados e arquivos locais; não publicar
├── docs/                 # documentação complementar
└── README.md
```

## Como executar localmente

### Opção A — XAMPP (Windows)

1. Instale o [XAMPP](https://www.apachefriends.org/).
2. Copie a pasta `oficina-empreenda-ia` para `C:\xampp\htdocs\` (ou para a pasta `htdocs` da sua instalação).
3. Inicie o **Apache** no painel do XAMPP.
4. Abra: `http://localhost/oficina-empreenda-ia/public-html/`.

### Opção B — servidor HTTP local

Com Python 3 instalado, execute a partir da pasta `public-html`:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000/`.

**Não abra `index.html` diretamente com `file://`**, pois o carregamento dos módulos por `fetch()` normalmente exige um servidor HTTP.

## Como utilizar

1. Navegue pela apresentação até o desafio desejado.
2. No **Desafio 01**, responda às perguntas, consulte as ajudas e copie as instruções geradas para uma nova conversa no ChatGPT. Envie uma foto real do produto quando solicitado e revise a arte e os textos obtidos.
3. No **Desafio 02**, observe ou edite os dados fictícios, analise os indicadores e copie o prompt para o ChatGPT sugerir ações para o negócio.
4. Confira as respostas da IA antes de utilizar qualquer recomendação, preço, informação ou imagem.

## Publicação

O código pode ser armazenado em um repositório no GitHub. Para hospedar o site como página pública, é necessário configurar um servidor ou serviço de hospedagem estática que sirva o conteúdo da pasta `public-html` por HTTP(S), incluindo seus módulos e arquivos de assets. Apenas enviar o repositório ao GitHub não publica automaticamente uma página funcional.

**Segurança:** não publique dados pessoais dos participantes, credenciais, tokens, arquivos de configuração privada ou backups. Revise o conteúdo da pasta `private/` antes de qualquer publicação.

## Evento

- **Oficina:** Empreenda com Inteligência: Explorando Ferramentas de IA
- **Data:** 18 de novembro de 2026
- **Horário:** 14h às 16h
- **Local:** Senac Araçatuba — Araçatuba/SP
- **Mediador e desenvolvedor:** Guilherme Salomão Shorane
- **Inscrição:** [Página do evento no Senac São Paulo](https://eventos.sp.senac.br/evento/semana-global-do-empreendedorismo/senac-aracatuba/)

## Avisos

Este é um projeto educacional de demonstração. As análises financeiras do Desafio 02 partem de dados fictícios e seus indicadores não devem ser confundidos com lucro líquido. A fidelidade da imagem de um produto em materiais gerados por IA deve ser conferida em comparação com a fotografia original.

## Licença

Licença ainda não definida. Antes de permitir reutilização por terceiros, escolha uma licença para o código e verifique os direitos de uso de imagens, ilustrações e demais recursos visuais.

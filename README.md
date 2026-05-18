# 💹 Simulador de Investimentos

Aplicação web desenvolvida para simular e comparar diferentes modalidades de investimento de forma prática e interativa.

O sistema permite calcular rendimentos utilizando juros compostos, comparar resultados entre investimentos e acompanhar a cotação do dólar em tempo real através de integração com API externa.

---

# 🚀 Tecnologias utilizadas

<div align="left">

* JavaScript ES6+
* HTML5
* CSS3
* localStorage
* API REST

</div>

---

# ✨ Funcionalidades

✅ Simulação de investimentos com juros compostos
✅ Comparação entre Poupança, CDB e Tesouro Direto
✅ Conversão automática do montante final para dólar
✅ Integração com cotação USD/BRL em tempo real
✅ Destaque automático da melhor opção de investimento
✅ Tabela comparativa detalhada
✅ Sistema de favoritos com persistência local
✅ CRUD completo utilizando localStorage
✅ Tema claro e escuro com persistência
✅ Validação completa de inputs
✅ Interface dinâmica e responsiva

---

# 🧠 Como funciona?

O usuário informa:

* Valor inicial
* Aporte mensal
* Tempo de investimento

A aplicação realiza automaticamente:

📈 Cálculo de juros compostos
💰 Comparação entre modalidades
🌎 Conversão do valor final para dólar
🏆 Destaque da opção mais rentável

---

# 📐 Fórmula utilizada

### Onde:

* `PV` → valor inicial investido
* `PMT` → aporte mensal
* `i` → taxa mensal
* `n` → prazo em meses

---

# 🌐 API utilizada

### AwesomeAPI — Cotação USD/BRL em tempo real

```bash
https://economia.awesomeapi.com.br/json/last/USD-BRL
```

✅ Gratuita
✅ Sem autenticação
✅ Atualização em tempo real

---

# 🗂 Estrutura do projeto

```bash
simulador-investimentos/
├── index.html
├── style.css
└── JS/
    ├── main.js          # ponto de entrada
    ├── modalidades.js   # dados das modalidades
    ├── validacoes.js    # validação de inputs
    ├── formatacao.js    # formatação de valores
    ├── calculadora.js   # lógica financeira
    ├── cotacaoAPI.js    # consumo da API
    ├── favoritos.js     # CRUD localStorage
    └── render.js        # manipulação do DOM
```

---

# ▶️ Como executar o projeto

Como o projeto utiliza módulos ES6 (`import/export`), ele precisa ser executado através de um servidor HTTP.

## Passo a passo:

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Abra no VS Code

# Execute com Live Server
```

Ou:

1. Abra o projeto no VS Code
2. Clique com botão direito em `index.html`
3. Selecione **"Open with Live Server"**

---

# 💡 Objetivo do projeto

Este projeto foi desenvolvido com foco em prática de:

* JavaScript moderno (ES6+)
* Manipulação de DOM
* Estrutura modular
* Lógica financeira
* Consumo de APIs REST
* CRUD com localStorage
* Responsividade
* Organização de aplicações front-end

---

# 📌 Possíveis melhorias futuras

* Integração com banco de dados
* Histórico de investimentos
* Dashboard financeiro
* Gráficos interativos
* Sistema de autenticação
* Comparação com inflação em tempo real

---

# 👨‍💻 Autor

Desenvolvido por Gabriel Gouveia
Transformando aprendizado em projetos reais 🚀

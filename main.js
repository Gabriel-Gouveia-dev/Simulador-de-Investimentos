// =============================================
//  JS/main.js
//  Ponto de entrada — conecta todos os módulos
// =============================================

import { nomeValido, valorValido, aporteValido, guardadoValido } from "./validacoes.js";
import { salvarMeta }                                             from "./storage.js";
import {
  renderizarMetas,
  renderizarCotacao,
  exibirErro,
  limparErro,
  configurarBotaoLimparTudo,
} from "./render.js";

const URL_COTACAO = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

// =============================================
//  INICIALIZAÇÃO
// =============================================

async function inicializar() {
  configurarBotaoLimparTudo();
  renderizarMetas();
  inicializarTema();
  await carregarCotacao();
}

// =============================================
//  COTAÇÃO (AwesomeAPI — gratuita, sem chave)
// =============================================

async function carregarCotacao() {
  try {
    const resposta = await fetch(URL_COTACAO);

    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);

    const dados   = await resposta.json();
    const cotacao = parseFloat(dados.USDBRL.bid);

    if (!Number.isFinite(cotacao)) throw new Error("Cotação inválida.");

    renderizarCotacao(cotacao);
  } catch (erro) {
    console.error("Falha ao buscar cotação:", erro.message);
    renderizarCotacao(null, true);
  }
}

// =============================================
//  TOGGLE DE TEMA
// =============================================

function inicializarTema() {
  const btn   = document.getElementById("btnTema");
  const icone = document.getElementById("temaIcone");
  const label = document.getElementById("temaLabel");

  const temaSalvo = localStorage.getItem("metas:tema");
  if (temaSalvo === "claro") {
    document.body.classList.add("tema-claro");
    icone.textContent = "☀️";
    label.textContent = "Tema escuro";
  }

  btn.addEventListener("click", () => {
    const claro       = document.body.classList.toggle("tema-claro");
    icone.textContent = claro ? "☀️" : "🌙";
    label.textContent = claro ? "Tema escuro" : "Tema claro";
    localStorage.setItem("metas:tema", claro ? "claro" : "escuro");
  });
}

// =============================================
//  LEITURA E VALIDAÇÃO DOS INPUTS
// =============================================

function lerInputs() {
  const nome          = document.getElementById("nomeMeta").value.trim();
  const valorMeta     = parseFloat(document.getElementById("valorMeta").value);
  const valorGuardado = parseFloat(document.getElementById("valorGuardado").value) || 0;
  const aporteMensal  = parseFloat(document.getElementById("aporteMensal").value);

  if (!nomeValido(nome)) {
    exibirErro("Informe um nome para a meta.");
    return null;
  }

  if (!valorValido(valorMeta)) {
    exibirErro("Informe um valor total válido e maior que zero.");
    return null;
  }

  if (!guardadoValido(valorGuardado)) {
    exibirErro("O valor já guardado deve ser zero ou um número positivo.");
    return null;
  }

  if (!aporteValido(aporteMensal)) {
    exibirErro("Informe um aporte mensal válido e maior que zero.");
    return null;
  }

  return { nome, valorMeta, valorGuardado, aporteMensal };
}

// =============================================
//  LIMPAR FORMULÁRIO
// =============================================

function limparFormulario() {
  document.getElementById("nomeMeta").value      = "";
  document.getElementById("valorMeta").value     = "";
  document.getElementById("valorGuardado").value = "";
  document.getElementById("aporteMensal").value  = "";
}

// =============================================
//  EVENTO — CADASTRAR META
// =============================================

document.getElementById("btnCadastrar").addEventListener("click", () => {
  limparErro();

  const inputs = lerInputs();
  if (!inputs) return;

  const { nome, valorMeta, valorGuardado, aporteMensal } = inputs;
  salvarMeta({ nome, valorMeta, valorGuardado, aporteMensal });
  renderizarMetas();
  limparFormulario();
});

// =============================================
//  START
// =============================================

inicializar();

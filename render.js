// =============================================
//  JS/render.js
//  Funções de renderização do DOM
// =============================================

import { calcularMeta }                        from "./calculadora.js";
import { formatarMoeda, formatarPorcentagem }  from "./formatacao.js";
import { lerMetas, removerMeta, limparMetas }  from "./storage.js";

const TOTAL_SEGMENTOS = 10;

// =============================================
//  BARRA SEGMENTADA (estilo Warren)
// =============================================

/**
 * Gera os segmentos da barra de progresso.
 * @param {number} porcentagem
 * @returns {string} HTML dos segmentos
 */
function gerarSegmentos(porcentagem) {
  const ativos = Math.round((Math.min(porcentagem, 100) / 100) * TOTAL_SEGMENTOS);

  return Array.from({ length: TOTAL_SEGMENTOS }, (_, i) =>
    `<div class="meta-seg ${i < ativos ? "ativo" : ""}"></div>`
  ).join("");
}

// =============================================
//  COTAÇÃO
// =============================================

export function renderizarCotacao(cotacao, erro = false) {
  const el = document.getElementById("cotacaoValor");
  if (!el) return;
  el.textContent = erro ? "indisponível" : `R$ ${cotacao.toFixed(4)}`;
}

// =============================================
//  RENDERIZAR LISTA DE METAS
// =============================================

export function renderizarMetas() {
  const metas = lerMetas();
  const lista  = document.getElementById("metasLista");
  const vazio  = document.getElementById("metasVazio");

  lista.innerHTML = "";

  if (metas.length === 0) {
    vazio.hidden = false;
    return;
  }

  vazio.hidden = true;

  metas.forEach(meta => {
    const { porcentagem, faltam, mesesRestantes, concluida } = calcularMeta(
      meta.valorMeta,
      meta.valorGuardado,
      meta.aporteMensal
    );

    const card         = document.createElement("article");
    card.className     = concluida ? "meta-card concluida" : "meta-card";
    const labelMeses   = mesesRestantes === 1 ? "mês" : "meses";

    card.innerHTML = `
      <div class="meta-card-header">
        <div class="meta-card-info">
          <p class="meta-card-nome">${meta.nome}</p>
          <p class="meta-card-valor-total">Meta: ${formatarMoeda(meta.valorMeta)}</p>
        </div>
        <div class="meta-card-acoes">
          ${concluida ? '<span class="meta-badge-concluida">✓ Concluída</span>' : ""}
          <button class="btn-remover-meta" data-id="${meta.id}" type="button" aria-label="Remover meta">✕</button>
        </div>
      </div>

      <div class="meta-progresso-wrapper">
        <div class="meta-progresso-topo">
          <span class="meta-progresso-porcentagem">${formatarPorcentagem(porcentagem)}</span>
          <span class="meta-progresso-label">
            ${formatarMoeda(meta.valorGuardado)} de ${formatarMoeda(meta.valorMeta)}
          </span>
        </div>
        <div class="meta-barra-segmentada">
          ${gerarSegmentos(porcentagem)}
        </div>
      </div>

      <div class="meta-stats">
        <div class="meta-stat">
          <span class="meta-stat-label">Faltam</span>
          <span class="meta-stat-valor ${concluida ? "sucesso" : "destaque"}">
            ${concluida ? "R$ 0,00" : formatarMoeda(faltam)}
          </span>
        </div>
        <div class="meta-stat">
          <span class="meta-stat-label">Aporte mensal</span>
          <span class="meta-stat-valor">${formatarMoeda(meta.aporteMensal)}</span>
        </div>
        <div class="meta-stat">
          <span class="meta-stat-label">Tempo restante</span>
          <span class="meta-stat-valor ${concluida ? "sucesso" : ""}">
            ${concluida ? "✓ Atingida!" : `${mesesRestantes} ${labelMeses}`}
          </span>
        </div>
      </div>
    `;

    card.querySelector(".btn-remover-meta").addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      removerMeta(id);
      renderizarMetas();
    });

    lista.appendChild(card);
  });
}

// =============================================
//  ERROS
// =============================================

export function exibirErro(mensagem) {
  document.getElementById("erroMsg").textContent = mensagem;
}

export function limparErro() {
  document.getElementById("erroMsg").textContent = "";
}

// =============================================
//  BOTÃO LIMPAR TUDO
// =============================================

export function configurarBotaoLimparTudo() {
  document.getElementById("btnLimparTudo").addEventListener("click", () => {
    limparMetas();
    renderizarMetas();
  });
}

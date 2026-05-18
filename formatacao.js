// =============================================
//  JS/formatacao.js
//  Funções de formatação de valores
// =============================================

export function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarPorcentagem(valor) {
  return Math.min(valor, 100).toFixed(1) + "%";
}

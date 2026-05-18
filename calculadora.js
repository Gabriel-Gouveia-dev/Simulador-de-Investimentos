// =============================================
//  JS/calculadora.js
//  Lógica de cálculo de metas financeiras
// =============================================

/**
 * Calcula os dados de progresso de uma meta financeira.
 *
 * @param {number} valorMeta      - Valor total da meta
 * @param {number} valorGuardado  - Quanto já foi guardado
 * @param {number} aporteMensal   - Quanto é guardado por mês
 * @returns {{
 *   porcentagem: number,
 *   faltam: number,
 *   mesesRestantes: number,
 *   concluida: boolean
 * }}
 */
export function calcularMeta(valorMeta, valorGuardado, aporteMensal) {
  const faltam          = Math.max(valorMeta - valorGuardado, 0);
  const porcentagem     = (valorGuardado / valorMeta) * 100;
  const mesesRestantes  = faltam > 0 ? Math.ceil(faltam / aporteMensal) : 0;
  const concluida       = valorGuardado >= valorMeta;

  return { porcentagem, faltam, mesesRestantes, concluida };
}

/**
 * Code 128 en SVG, sin dependencias.
 *
 * Es el simbolismo que usan DHL, FedEx, Estafeta y Redpack para el número de
 * guía, así que una etiqueta con un código falso —o con una imagen de adorno—
 * no sirve ni para enseñar el flujo: en la bodega alguien va a intentar
 * escanearla. Este se escanea.
 *
 * Se usa el juego B (alfanumérico) porque los números de guía mezclan letras
 * y dígitos. El juego C comprime pares de dígitos, pero solo sirve si la
 * cadena es completamente numérica y no vale la complejidad aquí.
 */

/* Los 107 símbolos. Cada cadena son los anchos de las barras y los espacios,
   alternando, empezando en barra. El total de cada uno es 11 módulos; el de
   parada tiene 13 y por eso lleva siete dígitos. */
const PATRONES = (
  "212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 " +
  "221312 231212 112232 122132 122231 113222 123122 123221 223211 221132 " +
  "221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 " +
  "212123 212321 232121 111323 131123 131321 112313 132113 132311 211313 " +
  "231113 231311 112133 112331 132131 113123 113321 133121 313121 211331 " +
  "231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 " +
  "314111 221411 431111 111224 111422 121124 121421 141122 141221 112214 " +
  "112412 122114 122411 142112 142211 241211 221114 413111 241112 134111 " +
  "111242 121142 121241 114212 124112 124211 411212 421112 421211 212141 " +
  "214121 412121 111143 111341 131141 114113 114311 411113 411311 113141 " +
  "114131 311141 411131 211412 211214 211232 2331112"
).split(/\s+/);

const INICIO_B = 104;
const PARADA = 106;

/**
 * Los valores del juego B: un carácter imprimible vale su código ASCII menos
 * 32, de modo que el espacio es 0 y la tilde 94.
 */
function valores(texto) {
  const vals = [];
  for (const ch of texto) {
    const c = ch.codePointAt(0);
    if (c < 32 || c > 126) {
      throw new RangeError(`Code 128B no admite "${ch}" (${c}). Solo ASCII imprimible.`);
    }
    vals.push(c - 32);
  }
  return vals;
}

/**
 * El dígito de control es la suma del valor de inicio más cada valor por su
 * posición (empezando en 1), módulo 103. Sin él, ningún lector acepta el
 * código: no es opcional ni decorativo.
 */
function control(vals) {
  let suma = INICIO_B;
  vals.forEach((v, i) => { suma += v * (i + 1); });
  return suma % 103;
}

/** Los anchos de barra y espacio de toda la simbología, en módulos. */
export function anchos(texto) {
  const vals = valores(texto);
  const simbolos = [INICIO_B, ...vals, control(vals), PARADA];
  return simbolos.flatMap((s) => [...PATRONES[s]].map(Number));
}

/**
 * El código como SVG, dimensionado en milímetros para que imprima al tamaño
 * físico correcto. `modulo` es el ancho de la barra más delgada: por debajo
 * de 0.25 mm una impresora de inyección lo emborrona y deja de leerse.
 *
 * La zona muda —el margen en blanco a los lados— es obligatoria. Sin ella el
 * lector no encuentra dónde empieza el código. Van 10 módulos por lado.
 */
export function svgCodigo(texto, { modulo = 0.33, alto = 14, muda = 10 } = {}) {
  const lista = anchos(texto);
  const total = lista.reduce((a, b) => a + b, 0) + muda * 2;

  let x = muda;
  let barras = "";
  lista.forEach((ancho, i) => {
    if (i % 2 === 0) barras += `<rect x="${x}" y="0" width="${ancho}" height="${alto}"/>`;
    x += ancho;
  });

  /* El viewBox va en módulos y el tamaño en milímetros: así el mismo SVG
     sirve en pantalla y en papel sin recalcular nada. */
  return `<svg class="codigo" viewBox="0 0 ${total} ${alto}" role="img"
    aria-label="Código de barras ${texto}" preserveAspectRatio="none"
    width="${(total * modulo).toFixed(2)}mm" height="${alto}mm"
    shape-rendering="crispEdges" fill="#000">${barras}</svg>`;
}

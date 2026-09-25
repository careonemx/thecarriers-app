/**
 * Busca botones muertos: `<button>` que nadie escucha.
 *
 * Un botón sin manejador es un contrato roto con quien lo pulsa, y en este
 * proyecto ya aparecieron nueve, siempre de la misma manera: se escribe el
 * botón al dibujar la pantalla y se deja el manejador para después. Con el
 * JavaScript repartido en plantillas dentro de plantillas, releer el archivo
 * no los encuentra; pulsarlos, sí, y para entonces ya los pulsó alguien más.
 *
 * Qué cuenta como "escuchado" —y por qué así y no con un analizador de
 * verdad—: el enganche de un botón acaba siendo siempre un texto que aparece
 * dos veces en el mismo archivo, una en el marcado y otra en el JavaScript.
 * Basta con buscar la segunda aparición:
 *
 *   - `type="submit"`, que lo escucha su propio formulario;
 *   - su `id`, si se nombra en alguna otra parte del archivo;
 *   - cualquiera de sus `data-*`, como atributo o como `dataset`;
 *   - cualquiera de sus clases, si aparece dentro de un selector.
 *
 * Es una heurística y se equivoca hacia el lado barato: un botón enganchado de
 * una forma rara sale señalado y se arregla nombrándolo, que es lo que había
 * que hacer de todos modos. Lo que no puede pasar es lo contrario.
 *
 * Dos exclusiones deliberadas. `sistema.html` es el catálogo: sus botones son
 * muestras de una clase y no prometen nada, igual que un maniquí no promete
 * caminar. Y un botón `disabled` tampoco promete: no se puede pulsar, y lo que
 * hay que revisar ahí es que diga por qué, no que responda.
 *
 * Los que ya estaban cuando se escribió este barrido viven en
 * `botones-pendientes.txt` con su porqué. Esa lista existe para vaciarse: sale
 * en pantalla cada vez que se corre, no falla, y si uno de ellos se arregla y
 * se queda apuntado, el barrido avisa para que se borre.
 *
 *     node herramientas/botones.mjs
 *
 * `sintaxis.mjs` lo ejecuta al final, para que una sola orden conteste las dos
 * preguntas: si el JavaScript corre y si lo que se dibuja responde.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
process.chdir(RAIZ);

const CATALOGO = "sistema.html";

const paginas = [
  ...readdirSync("app").filter((f) => f.endsWith(".html")).map((f) => join("app", f)),
  ...readdirSync(".").filter((f) => f.endsWith(".html") && f !== CATALOGO),
];

const RUTA_PENDIENTES = join("herramientas", "botones-pendientes.txt");
const pendientes = new Map();
if (existsSync(RUTA_PENDIENTES)) {
  for (const linea of readFileSync(RUTA_PENDIENTES, "utf8").split("\n")) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith("#")) continue;
    /* La llave son los dos primeros campos —archivo y texto del botón—; lo que
       venga después es el porqué, que puede llevar sus propios separadores. */
    const partes = limpia.split(" · ");
    pendientes.set(partes.slice(0, 2).join(" · ").trim(), partes.slice(2).join(" · ").trim());
  }
}

const aCamello = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const lineaDe = (texto, pos) => texto.slice(0, pos).split("\n").length;

const nuevos = [];
const vistos = new Set();
let revisados = 0;

for (const archivo of paginas) {
  const texto = readFileSync(archivo, "utf8");

  for (const m of texto.matchAll(/<button\b([^>]*)>/g)) {
    revisados++;
    const atributos = m[1];

    if (/type\s*=\s*["']submit["']/.test(atributos)) continue;
    if (/\sdisabled\b/.test(atributos)) continue;
    if (/\son[a-z]+\s*=/.test(atributos)) continue;

    const enganches = [];
    const id = atributos.match(/\bid\s*=\s*["']([^"']+)["']/);
    if (id) enganches.push(id[1]);
    for (const d of atributos.matchAll(/\sdata-([a-z0-9-]+)/gi)) {
      enganches.push(`data-${d[1]}`, aCamello(d[1]));
    }
    const clases = atributos.match(/\bclass\s*=\s*["']([^"']+)["']/);
    if (clases) {
      for (const c of clases[1].split(/\s+/)) {
        /* Las clases de presentación no enganchan nada, y darlas por válidas
           haría pasar por vivo a cualquier botón por llevar `.boton`. */
        if (/^boton(--|$)/.test(c)) continue;
        enganches.push(`.${c}`, `"${c}"`, `'${c}'`);
      }
    }

    const fuera = texto.slice(0, m.index) + texto.slice(m.index + m[0].length);
    if (enganches.some((e) => e && fuera.includes(e))) continue;

    const etiqueta = texto.slice(m.index + m[0].length, m.index + m[0].length + 60)
      .split("<")[0].replace(/\s+/g, " ").trim() || "(sin texto)";
    const llave = `${archivo} · ${etiqueta}`;
    vistos.add(llave);

    if (pendientes.has(llave)) {
      console.log(`PENDIENTE   ${archivo}:${lineaDe(texto, m.index)} · ${etiqueta}` +
        (pendientes.get(llave) ? ` — ${pendientes.get(llave)}` : ""));
    } else {
      nuevos.push(`BOTÓN MUERTO ${archivo}:${lineaDe(texto, m.index)} · ${etiqueta}`);
    }
  }
}

for (const n of nuevos) console.log(n);

/* Un pendiente que ya no aparece es un pendiente resuelto, y dejarlo apuntado
   convierte la lista en un archivo que nadie vuelve a leer. */
const sobran = [...pendientes.keys()].filter((k) => !vistos.has(k));
for (const s of sobran) console.log(`YA NO ESTÁ  ${s} — bórralo de ${RUTA_PENDIENTES}`);

console.log(`${revisados} botones revisados · ${nuevos.length} sin nadie que los escuche` +
  ` · ${pendientes.size - sobran.length} pendientes de antes`);
process.exit(nuevos.length || sobran.length ? 1 : 0);

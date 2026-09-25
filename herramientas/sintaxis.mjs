/**
 * Revisa la sintaxis de todo el JavaScript del proyecto.
 *
 * Aquí no hay empaquetador ni `package.json`, y por eso tampoco hay un `npm
 * run lint` que avise de un paréntesis sin cerrar. El JavaScript vive dentro
 * de los <script type="module"> de cada pantalla, donde un error de sintaxis
 * no rompe la página entera: rompe ESE módulo en silencio y deja el esqueleto
 * estático en pantalla, que es justo el fallo que más tarda en notarse.
 *
 * Extrae cada bloque en línea, lo escribe aparte y se lo pasa a `node
 * --check`. Se ejecuta antes de cada commit, junto con version.py:
 *
 *     node herramientas/sintaxis.mjs
 */
import { readFileSync, writeFileSync, readdirSync, mkdtempSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
process.chdir(RAIZ);

const temporal = mkdtempSync(join(tmpdir(), "sintaxis-"));
const paginas = [
  ...readdirSync("app").filter((f) => f.endsWith(".html")).map((f) => join("app", f)),
  ...readdirSync(".").filter((f) => f.endsWith(".html")),
];

let fallos = 0;
let revisados = 0;

const revisar = (ruta, etiqueta) => {
  revisados++;
  try {
    execFileSync(process.execPath, ["--check", ruta], { stdio: "pipe" });
  } catch (e) {
    fallos++;
    console.log(`SINTAXIS ${etiqueta}:\n${e.stderr.toString().split("\n").slice(0, 6).join("\n")}`);
  }
};

for (const f of paginas) {
  // Sin `src`: los que traen src son archivos aparte y se revisan abajo.
  const bloques = [...readFileSync(f, "utf8")
    .matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  bloques.forEach((js, i) => {
    if (!js.trim()) return;
    const tmp = join(temporal, `${f.replace(/\W/g, "_")}-${i}.mjs`);
    writeFileSync(tmp, js);
    revisar(tmp, `${f} bloque ${i}`);
  });
}

for (const m of readdirSync("assets").filter((f) => f.endsWith(".js"))) {
  revisar(join("assets", m), `assets/${m}`);
}

console.log(`${revisados} bloques revisados · ${fallos} con error de sintaxis`);
process.exit(fallos ? 1 : 0);

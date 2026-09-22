/* =================================================================
 * Armazón compartido de la aplicación.
 *
 * La barra lateral y la superior se inyectan desde aquí en vez de
 * repetirse en cada .html: son siete páginas y duplicar el marcado
 * garantiza que se desincronice. Cada página solo declara qué sección
 * es, con data-seccion en el <body>.
 *
 * La "sesión" es sessionStorage y acepta cualquier credencial: esto es
 * un prototipo de interfaz, no hay servidor ni autenticación real.
 * ================================================================= */
import { empresa, usuario, detenidos } from "./datos.js";

const CLAVE = "tc_sesion";

export const sesion = {
  abrir(correo) { sessionStorage.setItem(CLAVE, JSON.stringify({ correo, desde: Date.now() })); },
  leer() { try { return JSON.parse(sessionStorage.getItem(CLAVE)); } catch { return null; } },
  cerrar() { sessionStorage.removeItem(CLAVE); },
};

const icono = {
  envios: '<path d="M3 5h18v14H3z"/><path d="M3 10h18M9 10v9"/>',
  excepciones: '<path d="M12 4 21 19H3z"/><path d="M12 10v4M12 17h.01"/>',
  recolecciones: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="m9 15 2 2 4-4"/>',
  desempeno: '<path d="M4 20V4M4 20h16"/><path d="M8.5 20v-6M13 20V9M17.5 20v-10"/>',
  cobros: '<path d="M6 3h12v18l-3-1.8-3 1.8-3-1.8L6 21z"/><path d="M9.5 8.5h5M9.5 12.5h5"/>',
  salir: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  buscar: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  cerrar: '<path d="m6 6 12 12M18 6 6 18"/>',
};

const svg = (d, clase = "") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="${clase}">${d}</svg>`;

const SECCIONES = [
  { id: "envios", texto: "Envíos", href: "envios.html" },
  { id: "excepciones", texto: "Excepciones", href: "excepciones.html", cuenta: detenidos.length },
  { id: "recolecciones", texto: "Recolecciones", href: "recolecciones.html" },
  { id: "desempeno", texto: "Desempeño", href: "desempeno.html" },
  { id: "cobros", texto: "Cobros", href: "cobros.html" },
];

function lateral(activa) {
  const items = SECCIONES.map((s) => `
    <a class="nav-item" href="${s.href}"${s.id === activa ? ' aria-current="page"' : ""}>
      ${svg(icono[s.id])}
      <span>${s.texto}</span>
      ${s.cuenta ? `<span class="nav-item__cuenta">${s.cuenta}</span>` : ""}
    </a>`).join("");

  return `
  <aside class="lateral" id="lateral">
    <div class="lateral__marca">
      <a href="envios.html" aria-label="The Carriers, inicio">
        <img src="../assets/brand/lockup-white.svg" alt="The Carriers" width="113" height="22">
      </a>
      <button class="boton boton--sutil lateral__cerrar" type="button" data-cerrar-menu aria-label="Cerrar menú">
        ${svg(icono.cerrar)}
      </button>
    </div>
    <p class="lateral__grupo">Operación</p>
    ${items}
    <div class="lateral__pie">
      <a class="nav-item" href="../login.html" data-salir>${svg(icono.salir)}<span>Cerrar sesión</span></a>
    </div>
  </aside>`;
}

function superior(titulo) {
  return `
  <header class="superior">
    <button class="boton boton--sutil abrir-menu" type="button" data-abrir-menu aria-label="Abrir menú"
      aria-controls="lateral" aria-expanded="false">${svg(icono.menu)}</button>

    <button class="superior__empresa" type="button">
      <span class="avatar">${empresa.iniciales}</span>
      <span>${empresa.nombre}</span>
    </button>

    <div class="buscador">
      <label class="sr-only" for="q">Buscar por guía, pedido o destinatario</label>
      ${svg(icono.buscar)}
      <input type="search" id="q" placeholder="Buscar guía, pedido o destinatario…" autocomplete="off">
    </div>

    <span class="insignia-demo" title="${titulo}">Datos de ejemplo</span>
    <span class="avatar" title="${usuario.nombre}">${usuario.iniciales}</span>
  </header>`;
}

/** Monta el armazón alrededor del contenido que ya trae la página. */
export function montar() {
  const cuerpo = document.body;
  const activa = cuerpo.dataset.seccion;
  const main = document.querySelector("main");

  const armazon = document.createElement("div");
  armazon.className = "armazon";
  armazon.innerHTML = lateral(activa) + '<div class="columna"></div>';
  const columna = armazon.querySelector(".columna");
  columna.innerHTML = superior("Ninguna cifra de este prototipo viene de una operación real.");
  columna.appendChild(main);

  cuerpo.prepend(armazon);

  // Menú lateral en pantallas angostas.
  const panel = document.getElementById("lateral");
  const abrir = cuerpo.querySelector("[data-abrir-menu]");
  let velo;
  const cambiar = (abierto) => {
    panel.dataset.abierto = String(abierto);
    abrir.setAttribute("aria-expanded", String(abierto));
    if (abierto) {
      velo = document.createElement("div");
      velo.className = "velo";
      velo.addEventListener("click", () => cambiar(false));
      cuerpo.appendChild(velo);
    } else velo?.remove();
  };
  abrir.addEventListener("click", () => cambiar(panel.dataset.abierto !== "true"));
  cuerpo.querySelector("[data-cerrar-menu]")?.addEventListener("click", () => cambiar(false));
  addEventListener("keydown", (e) => e.key === "Escape" && cambiar(false));

  cuerpo.querySelector("[data-salir]").addEventListener("click", () => sesion.cerrar());

  // Una fila con data-href se comporta como enlace, sin dejar de ser accesible:
  // la primera celda lleva un <a> de verdad para el teclado.
  document.addEventListener("click", (e) => {
    const fila = e.target.closest("tr[data-href]");
    if (fila && !e.target.closest("a, button")) location.href = fila.dataset.href;
  });
}

/** Rebota a login si nadie ha iniciado sesión. */
export function exigirSesion() {
  if (!sesion.leer()) {
    location.replace("../login.html?destino=" + encodeURIComponent(location.pathname.split("/").pop()));
    return false;
  }
  return true;
}

/** Filtra una tabla por texto y por los valores de los <select data-filtro>. */
export function conectarFiltros(tabla) {
  const busqueda = document.getElementById("q");
  const selects = [...document.querySelectorAll("[data-filtro]")];
  const fichas = [...document.querySelectorAll(".ficha-filtro[data-columna]")];
  const contador = document.querySelector("[data-contador]");
  const filas = [...tabla.tBodies[0].rows];

  const aplicar = () => {
    const texto = (busqueda?.value || "").trim().toLowerCase();
    const activa = fichas.find((f) => f.getAttribute("aria-pressed") === "true");
    let visibles = 0;

    for (const fila of filas) {
      let ok = !texto || fila.textContent.toLowerCase().includes(texto);
      for (const s of selects) {
        if (ok && s.value) ok = fila.dataset[s.dataset.filtro] === s.value;
      }
      if (ok && activa) ok = fila.dataset[activa.dataset.columna] === activa.dataset.valor;
      fila.hidden = !ok;
      if (ok) visibles++;
    }

    if (contador) contador.textContent = visibles;
    const vacio = document.querySelector("[data-sin-resultados]");
    if (vacio) vacio.hidden = visibles > 0;
  };

  busqueda?.addEventListener("input", aplicar);
  selects.forEach((s) => s.addEventListener("change", aplicar));
  fichas.forEach((f) =>
    f.addEventListener("click", () => {
      const yaActiva = f.getAttribute("aria-pressed") === "true";
      fichas.forEach((o) => o.setAttribute("aria-pressed", "false"));
      f.setAttribute("aria-pressed", String(!yaActiva));
      aplicar();
    }),
  );
  aplicar();
}

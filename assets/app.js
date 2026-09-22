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
import { empresa, usuario, detenidos, sinGuia, tienda, HOY, planApurado, planQuedan,
         avisos, avisosLeidos, avisosSinLeer, marcarAvisosLeidos, fechaLarga,
         pedidos, envios, origenes, plantillas, recolecciones } from "./datos.js?v=7511478e";

const CLAVE = "tc_sesion";

export const sesion = {
  abrir(correo) { sessionStorage.setItem(CLAVE, JSON.stringify({ correo, desde: Date.now() })); },
  leer() { try { return JSON.parse(sessionStorage.getItem(CLAVE)); } catch { return null; } },
  cerrar() { sessionStorage.removeItem(CLAVE); },
};

const icono = {
  inicio: '<path d="M4 10 12 4l8 6"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
  pedidos: '<path d="M5 7h14l-1 13H6z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/>',
  origenes: '<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  plantillas: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/><path d="M12.5 13h5"/>',
  correcciones: '<path d="m4 20 4-1 10-10-3-3L5 16z"/><path d="m14.5 6.5 3 3"/>',
  canales: '<path d="M4 6h16v5H4z"/><path d="M6 11v7h12v-7"/><path d="M9.5 18v-4h5v4"/>',
  paqueterias: '<path d="M3 8.5 12 4l9 4.5V16l-9 4.5L3 16z"/><path d="m3 8.5 9 4.5 9-4.5M12 13v7.5"/>',
  ajustes: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
  envios: '<path d="M3 5h18v14H3z"/><path d="M3 10h18M9 10v9"/>',
  excepciones: '<path d="M3 7h10v9H3z"/><path d="M13 10h4l3 3v3h-7"/>' +
               '<circle cx="7.5" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
  recolecciones: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="m9 15 2 2 4-4"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  desempeno: '<path d="M4 20V4M4 20h16"/><path d="M8.5 20v-6M13 20V9M17.5 20v-10"/>',
  cobros: '<path d="M6 3h12v18l-3-1.8-3 1.8-3-1.8L6 21z"/><path d="M9.5 8.5h5M9.5 12.5h5"/>',
  salir: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  plan: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10.5h18"/><path d="M7 15h4"/>',
  buscar: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  campana: '<path d="M6 9a6 6 0 0 1 12 0c0 4 1.4 5.5 1.9 6H4.1C4.6 14.5 6 13 6 9z"/><path d="M10 18a2 2 0 0 0 4 0"/>',
  cerrar: '<path d="m6 6 12 12M18 6 6 18"/>',
};

const svg = (d, clase = "") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="${clase}">${d}</svg>`;

/**
 * Una sola navegación, ordenada por el recorrido real del trabajo.
 *
 * NO hay una entrada "Envíos": un pedido y su envío son el mismo objeto
 * en dos momentos, y dos listas casi iguales obligaban a preguntarse
 * "¿la guía 877… la busco en Pedidos o en Envíos?". Pedidos es la lista
 * y el estado del envío es una de sus vistas.
 *
 * "Tracking" sí se queda, y no es una incoherencia: no es un duplicado
 * de la lista, es una cola de trabajo. Sus columnas contestan otra
 * pregunta —cuándo vence, qué lo resuelve, de quién depende— y alguien la
 * abre para vaciarla, no para consultar.
 *
 * Se llamaba "Excepciones", que es como le dice la paquetería en su API.
 * Quien opera no tiene excepciones: tiene paquetes parados.
 *
 * El punto marca las pantallas que todavía no existen en este prototipo:
 * llevan a una nota, no a un 404.
 */
const GRUPOS = [
  {
    titulo: "Operación",
    items: [
      /* Inicio informa y da atajos; Pedidos es donde se trabaja. Las cifras
         de Inicio entran aquí con `?pendiente=`, ya filtradas. */
      { id: "inicio", texto: "Inicio", href: "inicio.html" },
      { id: "pedidos", texto: "Pedidos", href: "pedidos.html", cuenta: sinGuia.length },
      { id: "excepciones", texto: "Tracking", href: "excepciones.html", cuenta: detenidos.length },
      { id: "recolecciones", texto: "Recolecciones", href: "recolecciones.html" },
    ],
  },
  {
    titulo: "Análisis",
    items: [
      { id: "desempeno", texto: "Desempeño", href: "desempeno.html" },
      { id: "cobros", texto: "Cobros", href: "cobros.html" },
      /* La bitácora de correcciones no es un ajuste: no se configura nada en
         ella. Es información, y se mira por lo mismo que Cobros: para
         reclamar con pruebas y para ver si algo se está torciendo. */
      { id: "correcciones", texto: "Correcciones", href: "correcciones.html" },
    ],
  },
  {
    titulo: "Ajustes",
    items: [
      /* Las conexiones se separan por la pregunta que contestan: por dónde
         entran los pedidos y por dónde salen. Juntas, en un cajón llamado
         "Conexiones", obligaban a leer la lista entera para saber cuál era
         cuál. */
      { id: "canales", texto: "Canales de venta", href: "canales.html" },
      { id: "paqueterias", texto: "Paqueterías", href: "paqueterias.html" },
      { id: "origenes", texto: "Direcciones de Origen", href: "origenes.html" },
      { id: "plantillas", texto: "Plantillas", href: "plantillas.html" },
      { id: "ajustes", texto: "Configuración", href: "configuracion.html" },
    ],
  },
];

function lateral(activa) {
  const items = GRUPOS.map((g) => `
    <p class="lateral__grupo">${g.titulo}</p>
    ${g.items.map((s) => `
      <a class="nav-item${s.pendiente ? " nav-item--pendiente" : ""}" href="${s.href}"${
        s.id === activa ? ' aria-current="page"' : ""
      }${s.pendiente ? ' title="Todavía no hay pantalla para esto en el prototipo"' : ""}>
        ${svg(icono[s.id])}
        <span>${s.texto}</span>
        ${s.cuenta ? `<span class="nav-item__cuenta">${s.cuenta}</span>` : ""}
        ${s.pendiente ? '<span class="nav-item__marca" aria-hidden="true"></span>' : ""}
      </a>`).join("")}`).join("");

  return `
  <aside class="lateral" id="lateral">
    <div class="lateral__marca">
      <a href="inicio.html" aria-label="The Carriers, inicio">
        <img src="../assets/brand/lockup.svg" alt="The Carriers" width="113" height="22">
      </a>
      <button class="boton boton--sutil lateral__cerrar" type="button" data-cerrar-menu aria-label="Cerrar menú">
        ${svg(icono.cerrar)}
      </button>
    </div>
    ${items}
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

    <span class="insignia-tienda" title="Canal de venta conectado">
      <span class="insignia-tienda__punto"></span><b>${tienda.dominio}</b>
    </span>

    <div class="buscador">
      <label class="sr-only" for="q">Buscar por guía, pedido o destinatario</label>
      ${svg(icono.buscar)}
      <input type="search" id="q" placeholder="Buscar guía, pedido o destinatario…" autocomplete="off">
    </div>

    <!-- Todo lo que no es navegación ni búsqueda vive en el extremo derecho.
         Sin agruparlo, el buscador deja de crecer a los 420px y el resto se
         queda pegado a él, a dos tercios de la barra, con un hueco muerto
         hasta el borde. -->
    <div class="superior__fin">
    <span class="insignia-demo" title="${titulo}"><span
      class="solo-ancho">Datos de ejemplo</span><span class="solo-angosto">Ejemplo</span></span>

    ${campana()}

    <!-- Lo de la cuenta —quién eres, qué plan pagas, salir— cuelga del avatar.
         "Cerrar sesión" estaba abajo en la barra lateral; aparecer en los dos
         sitios sería la misma duplicación que ya quitamos de las conexiones. -->
    <div class="cuenta">
      <!-- El avatar solo, un círculo con dos letras, no se distingue de las
           insignias de al lado, que no hacen nada. La flecha dice que abre
           algo; el punto aparece cuando hay algo dentro que mirar. -->
      <button class="cuenta__abrir" type="button" data-abrir-cuenta
        aria-haspopup="menu" aria-expanded="false" aria-controls="menu-cuenta">
        <span class="sr-only">Tu cuenta, ${usuario.nombre}${
          planApurado() ? ". Te quedan pocos envíos del plan" : ""}</span>
        <span class="avatar" aria-hidden="true">${usuario.iniciales}</span>
        ${planApurado() ? '<span class="cuenta__punto" aria-hidden="true"></span>' : ""}
        <svg viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
          class="cuenta__flecha" aria-hidden="true"><path d="m1 1 4 4 4-4"/></svg>
      </button>

      <div class="cuenta__menu" id="menu-cuenta" role="menu" hidden>
        <div class="cuenta__quien">
          <b>${usuario.nombre}</b>
          <span>${usuario.correo}</span>
        </div>
        <a class="cuenta__opcion" role="menuitem" href="plan.html">
          ${svg(icono.plan)}<span>Plan y uso</span>
          ${planApurado()
            ? `<span class="cuenta__cuenta">${planQuedan()} envíos</span>` : ""}
        </a>
        <a class="cuenta__opcion" role="menuitem" href="../login.html" data-salir>
          ${svg(icono.salir)}<span>Cerrar sesión</span>
        </a>
      </div>
    </div>
    </div>
  </header>`;
}

/**
 * La campana.
 *
 * Es el único sitio donde el producto habla de sí mismo: lo que cambió, lo
 * que va a estar caído. No compite con los pendientes de la operación, que
 * viven en Inicio y en la barra lateral, y por eso no grita: un punto con la
 * cuenta de lo que no se ha leído y nada más cuando no hay nada.
 */
function campana() {
  const sinLeer = avisosSinLeer().length;
  return `
    <div class="colgante" data-colgante>
      <button class="colgante__abrir" type="button" data-abrir
        aria-haspopup="dialog" aria-expanded="false" aria-controls="panel-avisos">
        <span class="sr-only">Novedades${sinLeer ? `, ${sinLeer} sin leer` : ", nada nuevo"}</span>
        ${svg(icono.campana)}
        ${sinLeer ? `<span class="colgante__punto" aria-hidden="true">${sinLeer}</span>` : ""}
      </button>

      <div class="colgante__panel avisos" id="panel-avisos" role="dialog"
        aria-label="Novedades" hidden>
        <div class="avisos__cabeza">
          <b>Novedades</b>
          ${sinLeer ? '<button class="boton boton--sutil boton--chico" type="button" data-leer-todo>Marcar como leídas</button>' : ""}
        </div>
        <div class="avisos__lista">${listaAvisos()}</div>
      </div>
    </div>`;
}

function listaAvisos() {
  if (!avisos.length) {
    return `<p class="avisos__vacio">Todavía no hay novedades.
      Aquí avisaremos de lo que cambie y de lo que vaya a estar caído.</p>`;
  }
  const leidos = avisosLeidos();
  const TONO = { novedad: "Novedad", mantenimiento: "Mantenimiento", aviso: "Aviso" };
  return avisos.map((a) => `
    <article class="aviso-fila${leidos.includes(a.id) ? "" : " aviso-fila--nuevo"}">
      <p class="aviso-fila__meta">
        <span class="aviso-fila__tipo aviso-fila__tipo--${a.tipo}">${TONO[a.tipo] ?? "Aviso"}</span>
        <span>${fechaLarga(a.fecha)}</span>
      </p>
      <b>${a.titulo}</b>
      <p>${a.cuerpo}</p>
      ${a.enlace ? `<a class="aviso-fila__ir" href="${a.enlace.href}">${a.enlace.texto} →</a>` : ""}
    </article>`).join("");
}

/**
 * Los desplegables de la barra: la campana y la cuenta.
 *
 * Una sola función para los dos, y no dos copias, porque un desplegable que
 * solo cierra con su propio botón deja al usuario atrapado y ese detalle se
 * olvida en la segunda copia. Cierran con Escape, con un clic fuera y al
 * salir el foco con el tabulador; con Escape el foco vuelve al botón que los
 * abrió, o se quedaría perdido al final de la página.
 *
 * Abrir uno cierra el otro: dos paneles solapados en la misma esquina no se
 * pueden leer.
 */
function colgantes(cuerpo) {
  const todos = [...cuerpo.querySelectorAll("[data-colgante], .cuenta")].map((raiz) => {
    const boton = raiz.querySelector("[data-abrir], [data-abrir-cuenta]");
    const panel = raiz.querySelector(".colgante__panel, .cuenta__menu");
    const ver = (abierto) => {
      panel.hidden = !abierto;
      boton.setAttribute("aria-expanded", String(abierto));
    };
    return { raiz, boton, panel, ver };
  });

  const cerrarTodos = (salvo) => todos.forEach((c) => c !== salvo && c.ver(false));

  todos.forEach((c) => {
    c.boton.addEventListener("click", (e) => {
      e.stopPropagation();
      const abrir = c.panel.hidden;
      cerrarTodos(c);
      c.ver(abrir);
    });
    c.raiz.addEventListener("focusout", (e) => {
      if (!c.raiz.contains(e.relatedTarget)) c.ver(false);
    });
  });

  addEventListener("click", (e) => {
    todos.forEach((c) => {
      if (!c.panel.hidden && !c.raiz.contains(e.target)) c.ver(false);
    });
  });

  addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const abierto = todos.find((c) => !c.panel.hidden);
    if (!abierto) return;
    abierto.ver(false);
    abierto.boton.focus();
  });

  /* Marcar como leídas repinta la lista y la campana en el sitio, sin
     recargar: si la página se recargara, el panel se cerraría y no se vería
     el resultado de lo que se acaba de pulsar. */
  cuerpo.querySelector("[data-leer-todo]")?.addEventListener("click", (e) => {
    /* Sin frenar aquí, el clic llega al cierre por clic fuera y el panel se
       cierra: para entonces el botón ya se quitó del documento, así que
       `raiz.contains(e.target)` es falso y el panel se toma por ajeno. Un
       elemento que se borra a sí mismo deja de estar dentro de nada. */
    e.stopPropagation();
    marcarAvisosLeidos();
    cuerpo.querySelector(".avisos__lista").innerHTML = listaAvisos();
    cuerpo.querySelector(".colgante__punto")?.remove();
    e.target.remove();
  });
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

  colgantes(cuerpo);

  cuerpo.querySelector("[data-salir]").addEventListener("click", () => sesion.cerrar());

  /* Un campo de fecha vacío muestra "dd/mm/aaaa". Eso es un marcador, no un
     dato, y a plena intensidad compite con los valores de al lado. Se marca
     cuál tiene valor para que el CSS pueda apagar el resto.

     Va aquí y no en cada pantalla: son los mismos campos en Pedidos y en
     Tracking, y el panel de un origen los crea después, de ahí el delegado
     sobre el documento. */
  const marcarFecha = (i) => {
    if (i.value) i.setAttribute("data-lleno", "");
    else i.removeAttribute("data-lleno");
  };
  prepararFechas(cuerpo);
  conectarCalendario();
  conectarBuscadorGlobal();

  const fechas = () => document.querySelectorAll('input[type="date"], input[type="time"]');
  fechas().forEach(marcarFecha);
  document.addEventListener("input", (e) => {
    if (e.target.matches('input[type="date"], input[type="time"]')) marcarFecha(e.target);
  });
  document.addEventListener("change", (e) => {
    if (e.target.matches('input[type="date"], input[type="time"]')) marcarFecha(e.target);
  });
  /* Los campos que aparecen dentro de un panel nacen después de montar. */
  new MutationObserver(() => { prepararFechas(cuerpo); fechas().forEach(marcarFecha); })
    .observe(cuerpo, { childList: true, subtree: true });

  // Una fila con data-href se comporta como enlace, sin dejar de ser accesible:
  // la primera celda lleva un <a> de verdad para el teclado.
  document.addEventListener("click", (e) => {
    const fila = e.target.closest("tr[data-href]");
    if (fila && !e.target.closest("a, button")) location.href = fila.dataset.href;
  });
}

/* =================================================================
 * Calendario propio.
 *
 * El panel que abre `input[type=date]` lo dibuja el navegador: llega con su
 * tipografía, sus colores y su propio idioma, y en una interfaz oscura canta
 * como prestado. No hay CSS que lo alcance.
 *
 * Así que se apaga su disparador y se dibuja el nuestro. El input se queda
 * como está —conserva el formato del valor, el teclado y lo que esperan los
 * lectores de pantalla—; lo único que se sustituye es el panel.
 *
 * Va en `body` y con posición fija porque `.tarjeta` recorta lo que se sale
 * (`overflow: hidden`), y un calendario dentro de una barra de filtros se
 * cortaría por la mitad.
 * ================================================================= */

const DIAS_CORTOS = ["L", "M", "X", "J", "V", "S", "D"];

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const deIso = (t) => { const [a, m, d] = t.split("-").map(Number); return new Date(a, m - 1, d); };

let panelCal = null;
let campoCal = null;
let mesCal = null;

function cerrarCalendario() {
  if (!panelCal) return;
  panelCal.remove();
  panelCal = null;
  campoCal?.focus();
  campoCal = null;
}

function pintarCalendario() {
  const hoy = deIso(HOY);
  const elegido = campoCal.value ? deIso(campoCal.value) : null;
  const primero = new Date(mesCal.getFullYear(), mesCal.getMonth(), 1);
  /* Lunes primero, que es como se lee un calendario en México. */
  const hueco = (primero.getDay() + 6) % 7;
  const ultimo = new Date(mesCal.getFullYear(), mesCal.getMonth() + 1, 0).getDate();

  const celdas = [];
  for (let i = 0; i < hueco; i++) celdas.push('<span class="calendario__hueco"></span>');
  for (let d = 1; d <= ultimo; d++) {
    const fecha = new Date(mesCal.getFullYear(), mesCal.getMonth(), d);
    const t = iso(fecha);
    const clases = ["calendario__dia"];
    if (elegido && t === iso(elegido)) clases.push("calendario__dia--elegido");
    if (t === HOY) clases.push("calendario__dia--hoy");
    celdas.push(`<button type="button" class="${clases.join(" ")}" data-dia="${t}"
      tabindex="${t === (campoCal.value || HOY) ? 0 : -1}"
      aria-label="${fecha.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}"
      ${elegido && t === iso(elegido) ? 'aria-current="date"' : ""}>${d}</button>`);
  }

  const titulo = mesCal.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
  panelCal.innerHTML = `
    <div class="calendario__cabeza">
      <button type="button" class="calendario__mover" data-mes="-1" aria-label="Mes anterior">‹</button>
      <b>${titulo[0].toUpperCase()}${titulo.slice(1)}</b>
      <button type="button" class="calendario__mover" data-mes="1" aria-label="Mes siguiente">›</button>
    </div>
    <div class="calendario__semana" aria-hidden="true">${DIAS_CORTOS.map((d) => `<span>${d}</span>`).join("")}</div>
    <div class="calendario__dias" role="grid">${celdas.join("")}</div>
    <div class="calendario__pie">
      <button type="button" class="boton boton--sutil boton--chico" data-dia="${HOY}">Hoy</button>
      <button type="button" class="boton boton--sutil boton--chico" data-vaciar>Limpiar</button>
    </div>`;
}

function colocarCalendario() {
  const r = campoCal.getBoundingClientRect();
  const alto = panelCal.offsetHeight || 320;
  const ancho = panelCal.offsetWidth || 280;
  /* Si no cabe abajo, se abre hacia arriba; si se sale por la derecha, se
     alinea por su borde derecho. Un calendario medio fuera de pantalla no
     se puede usar. */
  const arriba = r.bottom + alto + 8 > innerHeight && r.top - alto - 8 > 0;
  panelCal.style.top = `${arriba ? r.top - alto - 6 : r.bottom + 6}px`;
  panelCal.style.left = `${Math.max(8, Math.min(r.left, innerWidth - ancho - 8))}px`;
}

function abrirCalendario(input) {
  if (panelCal && campoCal === input) return cerrarCalendario();
  cerrarCalendario();
  campoCal = input;
  mesCal = deIso(input.value || HOY);
  panelCal = document.createElement("div");
  panelCal.className = "calendario";
  panelCal.setAttribute("role", "dialog");
  panelCal.setAttribute("aria-label", "Elegir fecha");
  document.body.appendChild(panelCal);
  pintarCalendario();
  colocarCalendario();
  panelCal.querySelector('.calendario__dia[tabindex="0"]')?.focus();
}

function elegirDia(t) {
  campoCal.value = t;
  campoCal.dispatchEvent(new Event("input", { bubbles: true }));
  campoCal.dispatchEvent(new Event("change", { bubbles: true }));
  cerrarCalendario();
}

function conectarCalendario() {
  document.addEventListener("click", (e) => {
    const abrir = e.target.closest("[data-abrir-calendario]");
    if (abrir) {
      e.preventDefault();
      return abrirCalendario(abrir.previousElementSibling);
    }
    if (!panelCal) return;
    if (!e.target.closest(".calendario")) return cerrarCalendario();

    const mover = e.target.closest("[data-mes]");
    if (mover) {
      mesCal = new Date(mesCal.getFullYear(), mesCal.getMonth() + +mover.dataset.mes, 1);
      pintarCalendario();
      colocarCalendario();
      panelCal.querySelector(`[data-mes="${mover.dataset.mes}"]`)?.focus();
      return;
    }
    if (e.target.closest("[data-vaciar]")) {
      campoCal.value = "";
      campoCal.dispatchEvent(new Event("input", { bubbles: true }));
      campoCal.dispatchEvent(new Event("change", { bubbles: true }));
      return cerrarCalendario();
    }
    const dia = e.target.closest("[data-dia]");
    if (dia) elegirDia(dia.dataset.dia);
  });

  /* Teclado: flechas para moverse, Enter elige, Escape cierra. Sin esto el
     calendario sería una trampa para quien no usa ratón. */
  document.addEventListener("keydown", (e) => {
    if (!panelCal) return;
    if (e.key === "Escape") { e.preventDefault(); return cerrarCalendario(); }
    const foco = document.activeElement.closest?.("[data-dia]");
    if (!foco || !/^Arrow|^Home$|^End$|^PageUp$|^PageDown$/.test(e.key)) return;
    e.preventDefault();
    const salto = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7,
                    PageUp: -30, PageDown: 30 }[e.key] ?? 0;
    const base = deIso(foco.dataset.dia);
    base.setDate(base.getDate() + salto);
    if (e.key === "Home") base.setDate(base.getDate() - ((base.getDay() + 6) % 7));
    if (e.key === "End") base.setDate(base.getDate() + (6 - ((base.getDay() + 6) % 7)));
    mesCal = new Date(base.getFullYear(), base.getMonth(), 1);
    const destino = iso(base);
    campoCal.dataset.foco = destino;
    pintarCalendario();
    colocarCalendario();
    const btn = panelCal.querySelector(`[data-dia="${destino}"]`);
    if (btn) { btn.tabIndex = 0; btn.focus(); }
  });

  addEventListener("resize", cerrarCalendario);
  addEventListener("scroll", () => { if (panelCal) colocarCalendario(); }, true);
}

/** Le pone su botón a cada campo de fecha. El input no se toca. */
function prepararFechas(raiz) {
  raiz.querySelectorAll('input[type="date"]:not([data-cal])').forEach((i) => {
    i.dataset.cal = "1";
    const caja = document.createElement("span");
    caja.className = "campo-fecha";
    i.parentNode.insertBefore(caja, i);
    caja.appendChild(i);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "campo-fecha__abrir";
    b.setAttribute("data-abrir-calendario", "");
    b.setAttribute("aria-label", "Abrir calendario");
    b.innerHTML = svg(icono.calendario);
    caja.appendChild(b);
  });
}

/* =================================================================
 * Buscador global.
 *
 * Está en la barra de todas las pantallas, así que tiene que servir en todas.
 * No filtra la lista que tengas delante —para eso cada pantalla trae su
 * propio buscador—: encuentra un pedido, una guía, un destinatario, una
 * dirección o una plantilla, y lleva hasta donde está.
 *
 * Por eso los resultados van agrupados por tipo y cada uno dice a dónde va:
 * una lista plana obliga a adivinar qué es cada fila.
 * ================================================================= */

const TOPE_GRUPO = 4;

const sinTildes = (t) => String(t ?? "").toLowerCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function buscarEnTodo(q) {
  const t = sinTildes(q);
  if (t.length < 2) return [];
  const casa = (...campos) => sinTildes(campos.join(" ")).includes(t);

  const grupos = [
    {
      titulo: "Pedidos",
      items: pedidos.filter((p) => casa(p.folio, p.cliente.nombre, p.cliente.correo, p.ciudad, p.destino))
        .map((p) => ({
          titulo: `${p.folio} · ${p.cliente.nombre}`,
          nota: `${p.ciudad}${p.envio ? ` · ${p.envio.paqueteria}` : " · sin guía"}`,
          href: `pedidos.html?pedido=${encodeURIComponent(p.folio.replace(/\D/g, ""))}`,
        })),
    },
    {
      titulo: "Guías",
      items: envios.filter((e) => casa(e.guia, e.cliente, e.paqueteria, e.via ?? "", e.destino))
        .map((e) => ({
          titulo: e.guia,
          nota: `${e.paqueteria}${e.via ? ` vía ${e.via}` : ""} · ${e.estado} · ${e.cliente}`,
          href: `envio.html?guia=${encodeURIComponent(e.guia)}`,
        })),
    },
    {
      titulo: "Recolecciones",
      items: recolecciones.filter((r) => casa(r.folio, r.paqueteria, r.via ?? ""))
        .map((r) => ({
          titulo: `${r.folio} · ${r.paqueteria}`,
          nota: `${r.fecha} · ${r.ventana}`,
          href: "recolecciones.html",
        })),
    },
    {
      titulo: "Direcciones de origen",
      items: origenes.filter((o) => casa(o.nombre, o.campos.calle, o.campos.colonia, o.campos.ciudad, o.campos.cp))
        .map((o) => ({
          titulo: o.nombre,
          nota: `${o.campos.calle} ${o.campos.numExt} · ${o.campos.ciudad}`,
          href: "origenes.html",
        })),
    },
    {
      titulo: "Plantillas",
      items: plantillas.filter((p) => casa(p.nombre))
        .map((p) => ({
          titulo: p.nombre,
          nota: `${p.largo} × ${p.ancho} × ${p.alto} cm · ${p.peso} kg`,
          href: "plantillas.html",
        })),
    },
  ];

  return grupos.filter((g) => g.items.length)
    .map((g) => ({ ...g, total: g.items.length, items: g.items.slice(0, TOPE_GRUPO) }));
}

function conectarBuscadorGlobal() {
  const campo = document.getElementById("q");
  if (!campo) return;

  const panel = document.createElement("div");
  panel.className = "hallazgos";
  panel.id = "hallazgos";
  panel.setAttribute("role", "listbox");
  panel.hidden = true;
  campo.closest(".buscador").appendChild(panel);
  campo.setAttribute("role", "combobox");
  campo.setAttribute("aria-expanded", "false");
  campo.setAttribute("aria-controls", "hallazgos");
  campo.setAttribute("autocomplete", "off");

  let cerradoAposta = false;

  const cerrar = (aposta = false) => {
    panel.hidden = true;
    campo.setAttribute("aria-expanded", "false");
    cerradoAposta = aposta;
  };

  function pintar() {
    const q = campo.value.trim();
    if (q.length < 2) return cerrar();
    const grupos = buscarEnTodo(q);

    panel.innerHTML = grupos.length
      ? grupos.map((g) => `
          <p class="hallazgos__grupo">${g.titulo}${
            g.total > g.items.length ? ` · ${g.items.length} de ${g.total}` : ""}</p>
          ${g.items.map((i) => `
            <a class="hallazgo" href="${i.href}" role="option">
              <b>${escapar(i.titulo)}</b><span>${escapar(i.nota)}</span>
            </a>`).join("")}`).join("")
      : `<p class="hallazgos__vacio">Nada coincide con “${escapar(q)}”.
           Se busca por folio, guía, destinatario, ciudad o nombre.</p>`;

    panel.hidden = false;
    campo.setAttribute("aria-expanded", "true");
  }

  const escapar = (t) => String(t).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  campo.addEventListener("input", () => { cerradoAposta = false; pintar(); });
  campo.addEventListener("focus", () => {
    if (!cerradoAposta && campo.value.trim().length >= 2) pintar();
  });

  /* Teclado: bajar entra en la lista, Escape cierra sin perder lo escrito. */
  campo.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { cerrar(true); return; }
    if (e.key === "ArrowDown" && !panel.hidden) {
      e.preventDefault();
      panel.querySelector(".hallazgo")?.focus();
    }
  });

  panel.addEventListener("keydown", (e) => {
    const foco = document.activeElement.closest?.(".hallazgo");
    if (!foco) return;
    if (e.key === "Escape") { e.preventDefault(); cerrar(true); campo.focus(); return; }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const todos = [...panel.querySelectorAll(".hallazgo")];
    const i = todos.indexOf(foco) + (e.key === "ArrowDown" ? 1 : -1);
    if (i < 0) campo.focus();
    else todos[Math.min(i, todos.length - 1)].focus();
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".buscador")) cerrar();
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
  /* El buscador de la barra superior es GLOBAL: encuentra cosas en toda la
     aplicación y lleva a ellas. Filtrar además la tabla de la pantalla en la
     que estás son dos comportamientos para un mismo control, y ninguno de los
     dos se entiende. Cada lista trae el suyo. */
  const busqueda = tabla.closest(".tarjeta")?.querySelector("[data-buscar-local]");
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

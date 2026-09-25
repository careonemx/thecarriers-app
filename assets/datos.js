/* =================================================================
 * Datos de ejemplo.
 *
 * Todo lo que se ve en el prototipo sale de aquí. Son envíos inventados
 * para poder enseñar el producto: ninguna cifra viene de una operación
 * real, y por eso la barra superior lleva siempre el aviso "Datos de
 * ejemplo". Sin tiempos simulados ni estados en vivo.
 * ================================================================= */

export const empresa = { nombre: "Distribuidora Monarca", iniciales: "DM" };
export const usuario = { nombre: "Adrián Rodríguez", correo: "adrian@monarca.mx", iniciales: "AR" };

/* =================================================================
 * Bitácora de correcciones de dirección.
 *
 * Todo lo que está aquí YA se aplicó. Lo que falta por decidir no vive en
 * esta lista: es un pedido con la dirección sin resolver, y se trabaja en
 * Pedidos, que es donde además se genera la guía.
 *
 * Existe por dos motivos que no son "ver el trabajo hecho": cuando un paquete
 * llega mal y el cliente dice "yo escribí X", hace falta la prueba de qué se
 * cambió; y alguien tiene que poder ver que la IA está inventando colonias
 * antes de que sean cincuenta.
 *
 * `apoyo` es lo que separa una corrección de una conjetura, y por eso es un
 * dato y no una etiqueta de confianza: "el CP 06600 solo tiene una colonia"
 * se puede comprobar, un 87 % solo se puede creer. Sin apoyo, lo decidió una
 * persona.
 *
 * `aTiempo` es lo primero que se pregunta en una reclamación: si la guía se
 * generó ANTES de corregir, la etiqueta salió con la dirección vieja y el
 * paquete va camino de un sitio equivocado por mucho que el pedido ya esté
 * bien. En null no hay guía todavía, y entonces no hay nada que preguntar.
 * ================================================================= */

export const correcciones = [
  { id: "c-1006", folio: "#1006", fecha: "2026-09-21", cliente: "Mariana Ruiz",
    cp: "72495", campo: "colonia", llego: "casa", quedo: "Geovillas del Sur",
    apoyo: null,
    guia: "794611553077", aTiempo: true },

  { id: "c-1013", folio: "#1013", fecha: "2026-09-20", cliente: "Laura Méndez",
    cp: "06600", campo: "colonia", llego: "1", quedo: "Juárez",
    apoyo: null,
    guia: "794611552916", aTiempo: true },

  { id: "c-1018", folio: "#1018", fecha: "2026-09-18", cliente: "Comercializadora Vega",
    cp: "11529", campo: "colonia", llego: "trabajo", quedo: "Ampliación Granada",
    apoyo: null,
    guia: "794611552340", aTiempo: false },

  { id: "c-1015", folio: "#1015", fecha: "2026-09-17", cliente: "Iván Salas",
    cp: "11529", campo: "municipio", llego: "Ciudad de México", quedo: "Miguel Hidalgo",
    apoyo: "El CP 11529 pertenece a Miguel Hidalgo.",
    guia: "794611552118", aTiempo: true },

  { id: "c-1017", folio: "#1017", fecha: "2026-09-16", cliente: "Rocío Ibarra",
    cp: "06600", campo: "municipio", llego: "Ciudad de México", quedo: "Cuauhtémoc",
    apoyo: "El CP 06600 pertenece a Cuauhtémoc.",
    guia: "794611551907", aTiempo: true },

  { id: "c-1011", folio: "#1011", fecha: "2026-09-15", cliente: "Diego Fuentes",
    cp: "11529", campo: "municipio", llego: "Ciudad de México", quedo: "Miguel Hidalgo",
    apoyo: "El CP 11529 pertenece a Miguel Hidalgo.",
    guia: "794611551644", aTiempo: true },

  { id: "c-1009", folio: "#1009", fecha: "2026-09-14", cliente: "Paulina Cortés",
    cp: "44600", campo: "estado", llego: "Guadalajara", quedo: "Jalisco",
    apoyo: "Guadalajara es un municipio de Jalisco, no un estado.",
    guia: null, aTiempo: null },

  { id: "c-1008", folio: "#1008", fecha: "2026-09-12", cliente: "Héctor Nava",
    cp: "64000", campo: "colonia", llego: "Centro MTY", quedo: "Centro",
    apoyo: "El CP 64000 solo tiene la colonia Centro.",
    guia: "794611551088", aTiempo: true },
];

/** De lo más reciente a lo más viejo: al historial se entra por lo último. */
export const correccionesHechas = () =>
  correcciones.slice().sort((a, b) => b.fecha.localeCompare(a.fecha));

/** Quién decidió el cambio, en palabras y no en jerga de la API. */
export const QUIEN_CORRIGIO = {
  catalogo: "Catálogo postal",
  persona: "Una persona",
};

/* Sin apoyo que enseñar, el cambio no lo pudo decidir un catálogo. */
export const quienCorrigio = (c) => c.apoyo ? "catalogo" : "persona";

export const CAMPO_DIRECCION = { colonia: "Colonia", municipio: "Municipio", estado: "Estado" };

/* =================================================================
 * Novedades.
 *
 * Son avisos NUESTROS —lo que cambió en el producto, lo que va a estar
 * caído—, no telemetría de las paqueterías. Por eso se pueden escribir: los
 * escribimos nosotros. Lo que no se inventa aquí es el estado de un envío.
 *
 * `leido` no vive en el dato: vive en el navegador de cada quien, porque dos
 * personas de la misma cuenta no leen lo mismo el mismo día.
 * ================================================================= */

export const avisos = [
  { id: "orden-paqueterias", tipo: "novedad", fecha: "2026-09-19",
    titulo: "Ya puedes ordenar tus paqueterías",
    cuerpo: "En Configuración se arrastra la lista para decidir cuál se intenta primero, " +
            "y cada una lleva el motivo de su puesto.",
    enlace: { texto: "Ver el orden", href: "configuracion.html" } },

  { id: "rastreo-publico", tipo: "novedad", fecha: "2026-09-15",
    titulo: "Tracking abre el rastreo de la paquetería",
    cuerpo: "Desde cada envío detenido se copia la guía y se abre la página pública " +
            "de la paquetería, para no buscarla a mano.",
    enlace: { texto: "Ir a Tracking", href: "excepciones.html" } },

  { id: "mantenimiento-t1", tipo: "mantenimiento", fecha: "2026-09-12",
    titulo: "T1 Envíos en mantenimiento el domingo",
    cuerpo: "El domingo 27 de 2:00 a 6:00 no se podrán generar guías. Los pedidos que " +
            "entren en ese rato quedan pendientes y se pueden generar después.",
    enlace: null },
];

const CLAVE_LEIDOS = "tc:avisos-leidos";

/** Los ids ya leídos. En modo privado devuelve vacío en vez de reventar. */
export function avisosLeidos() {
  try { return JSON.parse(localStorage.getItem(CLAVE_LEIDOS) || "[]"); }
  catch { return []; }
}

export function avisosSinLeer() {
  const leidos = avisosLeidos();
  return avisos.filter((a) => !leidos.includes(a.id));
}

export function marcarAvisosLeidos() {
  try { localStorage.setItem(CLAVE_LEIDOS, JSON.stringify(avisos.map((a) => a.id))); }
  catch { /* modo privado: se quedan sin leer, que es mejor que fallar */ }
}

/* =================================================================
 * El plan de TheCarriers.
 *
 * NO es lo mismo que Cobros. Ahí se concilia lo que cobró la paquetería por
 * llevar un paquete; aquí se paga el software que genera las guías. Mezclarlos
 * haría que "cuánto llevas gastado" significara dos cosas a la vez.
 *
 * Cada plan incluye un número de envíos al mes. `precio` y `envios` en null
 * es Enterprise: se cotiza, y por eso no tiene ni barra ni precio por envío.
 * ================================================================= */

export const PLANES = [
  { id: "free",       nombre: "Free",       precio: 0,    envios: 100 },
  { id: "starter",    nombre: "Starter",    precio: 499,  envios: 500 },
  { id: "growth",     nombre: "Growth",     precio: 799,  envios: 1000 },
  { id: "scale",      nombre: "Scale",      precio: 2990, envios: 5000 },
  { id: "enterprise", nombre: "Enterprise", precio: null, envios: null },
];

/**
 * Lo consumido en el periodo en curso.
 *
 * `usados` sale de contar guías, no de estimarlo: una guía generada es un
 * envío. Aquí es un dato de ejemplo como el resto del prototipo.
 */
export const suscripcion = {
  plan: "starter",
  desde: "2 de abril de 2026",
  renueva: "30 de septiembre de 2026",
  usados: 458,
};

export const planActual = () => PLANES.find((p) => p.id === suscripcion.plan) ?? PLANES[0];

/** El siguiente plan con más envíos. Null si ya está en el último medible. */
export const planSiguiente = () => {
  const hoy = planActual();
  if (hoy.envios === null) return null;
  return PLANES.find((p) => p.envios === null || p.envios > hoy.envios) ?? null;
};

/**
 * Cuánto cuesta cada envío en un plan. Es la cifra que de verdad compara dos
 * planes: Scale cuesta seis veces más que Starter y cada envío sale a la
 * mitad. Sin ella hay que dividir a mano para elegir.
 */
export const costoPorEnvio = (plan) =>
  plan.precio === null || plan.envios === null || !plan.envios ? null : plan.precio / plan.envios;

/** Lo consumido, en porcentaje, acotado a 100 para que la barra no se salga. */
export const consumoPct = () => {
  const p = planActual();
  if (!p.envios) return null;
  return Math.min(100, Math.round((suscripcion.usados / p.envios) * 100));
};

/** Envíos que quedan del plan. */
export const planQuedan = () => {
  const p = planActual();
  return p.envios === null ? null : Math.max(0, p.envios - suscripcion.usados);
};

/**
 * Si conviene avisar de que el plan se acaba.
 *
 * El 85 % no es un número mágico: es el punto en el que todavía queda margen
 * para decidir. Avisar al 100 % es avisar cuando ya no se puede hacer nada, y
 * avisar al 50 % convierte el aviso en ruido que se aprende a ignorar.
 */
export const planApurado = () => consumoPct() !== null && consumoPct() >= 85;

/**
 * Direcciones de origen: de dónde sale la mercancía y a dónde llega la
 * paquetería a recogerla. Son la misma dirección vista desde los dos lados.
 *
 * Uno es el predeterminado: el que se usa al cotizar y el que se imprime como
 * remitente cuando nada dice lo contrario. Tiene que haber exactamente uno, y
 * por eso no se puede borrar sin nombrar antes a otro.
 *
 * Los campos son LOS MISMOS que los de la dirección de un pedido, con los
 * mismos nombres. Una dirección es una dirección: si el origen tuviera su
 * propio juego de campos, habría dos formularios que validar y dos maneras
 * de escribir una calle.
 *
 * `horario` es la ventana en que hay alguien para entregarle el paquete al
 * repartidor. Sin eso, una recolección se programa a ciegas y el camión
 * llega cuando la bodega está cerrada.
 */
export const origenes = [
  {
    id: "puebla",
    nombre: "Almacén Puebla",
    predeterminado: true,
    horario: { abre: "09:00", cierra: "18:00" },
    campos: {
      nombre: "Eduardo", apellido: "Cruz",
      correo: "almacen@monarca.mx", lada: "+52", telefono: "2224319080",
      compania: "Distribuidora Monarca",
      calle: "Av. 11 Oriente", numExt: "2410", numInt: "Bodega 4",
      cp: "72501", colonia: "Azcárate", estado: "Puebla", ciudad: "Puebla",
      referencia: "Portón blanco de reja, frente a la gasolinera.",
    },
  },
  {
    id: "cdmx",
    nombre: "Tienda Roma",
    predeterminado: false,
    horario: { abre: "11:00", cierra: "20:00" },
    campos: {
      nombre: "Renata", apellido: "Iglesias",
      correo: "roma@monarca.mx", lada: "+52", telefono: "5551903377",
      compania: "Distribuidora Monarca",
      calle: "Colima", numExt: "158", numInt: "",
      cp: "06700", colonia: "Roma Norte", estado: "Ciudad de México", ciudad: "Ciudad de México",
      referencia: "",
    },
  },
];

/* =================================================================
 * Rastreo público de cada paquetería.
 *
 * Es lo único que se puede ofrecer sobre un envío detenido sin integración:
 * llevar el número de guía a la página donde la paquetería lo explica. No
 * hace falta API, solo la URL.
 *
 * OJO: estos patrones hay que confirmarlos con cada paquetería antes de
 * publicar. Una URL que no abre es peor que no ponerla.
 * ================================================================= */
export const RASTREO_PUBLICO = {
  "DHL": "https://www.dhl.com/mx-es/home/rastreo.html?tracking-id=",
  "FedEx": "https://www.fedex.com/fedextrack/?trknbr=",
  "Estafeta": "https://www.estafeta.com/Herramientas/Rastreo?guias=",
  "Redpack": "https://www.redpack.com.mx/rastreo/?guias=",
  "UPS": "https://www.ups.com/track?tracknum=",
};

/** Null cuando no hay URL confirmada: no se inventa un enlace roto. */
export const enlaceRastreo = (paqueteria, guia) => {
  const base = RASTREO_PUBLICO[paqueteria];
  return base ? base + encodeURIComponent(guia) : null;
};

/* =================================================================
 * Teléfonos de atención.
 *
 * Es el dato que citan todas las instrucciones de la capa intermedia: donde la
 * paquetería no expone una acción, lo único que queda es una llamada, y una
 * instrucción que dice "llama a Estafeta" sin el número obliga a buscarlo en
 * otra pestaña justo cuando hay un paquete parado.
 *
 * OJO: igual que las URL de rastreo, hay que confirmarlos con cada paquetería
 * antes de publicar. Un número que no contesta es peor que no ponerlo.
 * ================================================================= */
export const TELEFONO_PAQUETERIA = {
  "DHL": "800 765 6345",
  "Estafeta": "800 378 2338",
  "FedEx": "800 900 1100",
  "Redpack": "800 013 3737",
  "Paquetexpress": "800 727 8726",
  "UPS": "800 622 0000",
  "99minutos": "800 999 6468",
  "AMPM": "800 267 6000",
  "T1 Envíos": "800 801 2020",
};

/** Null sin número confirmado: la instrucción se queda sin ese paso. */
export const telefonoDe = (paqueteria) => TELEFONO_PAQUETERIA[paqueteria] ?? null;

/* =================================================================
 * Reglas de selección de paquetería.
 *
 * No son un árbol de condiciones: son un ORDEN DE PREFERENCIA con
 * excepciones, que es como lo tiene escrito quien decide hoy. Modelarlo como
 * "si A y B entonces C" obligaría a traducir su criterio a algo que no es, y
 * a mantener esa traducción cada vez que cambie de opinión.
 *
 * Cada paquetería tiene un papel y un porqué. El porqué no es adorno: es lo
 * único que le explica a quien llegue después por qué UPS no sube al segundo
 * puesto aunque salga más barata.
 * ================================================================= */

/**
 * El papel NO dice quién es la preferida: eso lo dice el puesto en la lista.
 * Tener las dos cosas por separado permitía subir una paquetería al primer
 * lugar sin que cambiara nada, porque la preferida seguía siendo la que
 * tuviera esa etiqueta. Ahora el papel solo distingue si se puede usar, y la
 * primera que se pueda usar es la preferida.
 */
export const PAPELES = {
  normal:    { etiqueta: "Se puede usar", ayuda: "Se usa según su puesto en la lista." },
  evitar:    { etiqueta: "Evitar",        ayuda: "Solo si no hay otra opción." },
  "no-usar": { etiqueta: "No usar",       ayuda: "Nunca, aunque sea la más barata." },
};

export const reglasPaqueteria = {
  /* `porque` es la nota que sostiene cada puesto. No es un comentario suelto:
     es lo que lee quien más adelante quiera reordenar la lista. Sin ella,
     "UPS es alternativa" no impide que alguien la suba al primer puesto. */
  orden: [
    { paqueteria: "DHL", papel: "normal",
      porque: "Plazo aceptable: si la guía sale jueves o viernes, entrega la semana siguiente." },
    { paqueteria: "Paquetexpress", papel: "normal",
      porque: "" },
    { paqueteria: "UPS", papel: "normal",
      porque: "Suele ser más barata, pero ha tenido incidencias. Se revisa antes de usarla." },
    { paqueteria: "99minutos", papel: "evitar",
      porque: "Problemas de recolección en el almacén y guías que hubo que cancelar." },
    { paqueteria: "FedEx", papel: "evitar",
      porque: "Solo si el cliente la pide. Además acepta direcciones incompletas." },
    { paqueteria: "AMPM", papel: "no-usar",
      porque: "Incidencias difíciles de resolver." },
  ],

  /* Lo que hace que la preferida ceda el sitio. Mientras nada de esto pase,
     se queda: es la regla de seguridad. */
  cambiarSi: { costoMayorA: 300, zonaExtendida: true },

  /* El corazón del documento: la preferida gana aunque otra sea más barata.
     Sin esto, cualquier motor elegiría siempre la más barata y contradiría
     lo que decidió una persona con más contexto que el motor. */
  mandaLaPreferida: true,
};

/**
 * Qué paquetería saldría y POR QUÉ. Lo segundo importa tanto como lo primero:
 * una regla que no se puede explicar no se puede corregir.
 *
 * Ninguna pantalla la llama todavía: quien elige la paquetería al generar la
 * guía es el backend. Se queda aquí porque es el único sitio donde está
 * escrito qué significan exactamente las reglas de `reglasPaqueteria` —el
 * orden, los papeles, el umbral y la regla de seguridad—, y sin ella esos
 * datos serían una lista sin sentido.
 */
export function decidirPaqueteria({ peso = 1, costoPreferida = null, zonaExtendida = false } = {}) {
  const r = reglasPaqueteria;
  /* La preferida es la primera de la lista que se pueda usar sin reparos: el
     orden es la regla, no una etiqueta aparte. */
  const preferida = r.orden.find((o) => o.papel === "normal");

  const precio = (nombre) => precioDe(nombre, peso);
  const costoPref = costoPreferida ?? (preferida ? precio(preferida.paqueteria) : null);

  const caro = costoPref !== null && costoPref > r.cambiarSi.costoMayorA;
  const disparado = (r.cambiarSi.zonaExtendida && zonaExtendida && caro) || (!r.cambiarSi.zonaExtendida && caro);

  /* Con la regla de seguridad puesta, la preferida se queda mientras nada la
     obligue a ceder. Sin ella, compite por precio como una más: el
     interruptor tiene que cambiar la decisión, no solo el texto. */
  if (preferida && !disparado) {
    const rivales = r.orden.filter((o) => o.papel === "normal" && o !== preferida)
      .map((o) => ({ ...o, costo: precio(o.paqueteria) }))
      .filter((o) => o.costo !== null && o.costo < costoPref)
      .sort((a, b) => a.costo - b.costo);

    if (!r.mandaLaPreferida && rivales.length) {
      const barata = rivales[0];
      return {
        elegida: barata.paqueteria,
        costo: barata.costo,
        porque: `Con la regla de seguridad desactivada decide el precio. ${barata.paqueteria} ` +
                `resulta más barata que ${preferida.paqueteria}.`,
        alternativas: [{ ...preferida, costo: costoPref }, ...rivales.slice(1, 3)],
      };
    }

    return {
      elegida: preferida.paqueteria,
      costo: costoPref,
      porque: r.mandaLaPreferida
        ? `${preferida.paqueteria} es la preferida y no se cumple ninguna excepción. Se mantiene aunque otra resulte más barata.`
        : `${preferida.paqueteria} es la preferida y ninguna alternativa resulta más barata.`,
      alternativas: [],
    };
  }

  /* Se cambió: se comparan las alternativas por costo y plazo, y si no hay
     ninguna se baja a las de evitar antes que dejar el pedido sin guía. */
  const candidatas = ["normal", "evitar"].flatMap((papel) =>
    r.orden.filter((o) => o.papel === papel && o !== preferida)
      .map((o) => ({ ...o, costo: precio(o.paqueteria), plazo: TARIFAS[o.paqueteria]?.plazo ?? 9 }))
      .filter((o) => o.costo !== null)
      .sort((a, b) => (a.costo + a.plazo * 20) - (b.costo + b.plazo * 20)));

  const elegida = candidatas[0];
  return {
    elegida: elegida?.paqueteria ?? null,
    costo: elegida?.costo ?? null,
    /* Sin preferida no hay nada que descartar: decirlo igual sería inventar un
       motivo. Se explica lo que de verdad pasó. */
    porque: !elegida
      ? "Ninguna paquetería queda disponible con estas reglas."
      : preferida
        ? `${preferida.paqueteria} se descarta porque ${
            zonaExtendida ? "es zona extendida y " : ""}su costo supera los $${r.cambiarSi.costoMayorA}. ` +
          `Entre las alternativas, ${elegida.paqueteria} ofrece la mejor combinación de costo y plazo.`
        : `Ninguna paquetería está marcada como “Se puede usar”. Se recurre a las de evitar: ` +
          `${elegida.paqueteria} ofrece el mejor costo y plazo.`,
    alternativas: candidatas.slice(1, 4),
  };
}

/* =================================================================
 * Plantillas de paquete.
 *
 * Existen para no volver a capturar peso y medidas en cada guía. Pero su
 * valor real es otro: enseñar POR CUÁNTO van a cobrar.
 *
 * Las paqueterías cobran por el mayor entre el peso real y el peso
 * volumétrico —(largo × ancho × alto) ÷ 5000 en México—, y de ahí salen los
 * sobrepesos que nadie entiende al conciliar. Una caja grande y liviana se
 * cobra como si pesara veinte kilos. La plantilla lo dice antes de que
 * llegue la factura.
 * ================================================================= */

/**
 * Divisor volumétrico. 5000 es el que se ha visto funcionar con DHL, FedEx,
 * Estafeta y UPS en México, pero no está confirmado con ninguna: por eso deja
 * de ser una constante y pasa a `CAPACIDADES.divisorVolumetrico`, donde cada
 * cuenta dice el suyo y de dónde salió. Este valor es el que se usa mientras
 * la celda esté sin confirmar, y la cotización lo dice.
 */
export const FACTOR_VOLUMETRICO = 5000;

export const pesoVolumetrico = (largo, ancho, alto, divisor = FACTOR_VOLUMETRICO) =>
  Math.round(((largo * ancho * alto) / divisor) * 100) / 100;

/** El que se paga: el mayor de los dos, no el real. */
export function pesoCobrado(p, divisor = FACTOR_VOLUMETRICO) {
  const real = p.peso;
  const vol = pesoVolumetrico(p.largo, p.ancho, p.alto, divisor);
  return { real, volumetrico: vol, cobrado: Math.max(real, vol), porVolumen: vol > real };
}

export const plantillas = [
  { id: "sobre", nombre: "Sobre", predeterminada: false, peso: 0.5, largo: 30, ancho: 22, alto: 2 },
  { id: "caja-chica", nombre: "Caja chica", predeterminada: true, peso: 1.5, largo: 25, ancho: 20, alto: 15 },
  { id: "caja-mediana", nombre: "Caja mediana", predeterminada: false, peso: 4, largo: 40, ancho: 30, alto: 25 },
  { id: "caja-grande", nombre: "Caja grande", predeterminada: false, peso: 9, largo: 60, ancho: 45, alto: 40 },
];

export const plantillaPredeterminada = () =>
  plantillas.find((p) => p.predeterminada) ?? plantillas[0] ?? null;

/** El que se usa cuando nada dice lo contrario. Null si no hay ninguno. */
export const origenPredeterminado = () =>
  origenes.find((o) => o.predeterminado) ?? origenes[0] ?? null;

/**
 * El origen tal como lo necesita la etiqueta: una línea por renglón.
 * Se deriva, no se duplica; si se guardaran los dos, un día no coincidirían.
 */
export const origenDeEtiqueta = (o = origenPredeterminado()) => {
  if (!o) return null;
  const c = o.campos;
  return {
    nombre: c.compania || o.nombre,
    contacto: o.nombre,
    calle: c.calle, numExt: c.numExt, numInt: c.numInt,
    colonia: c.colonia, ciudad: c.ciudad, estado: c.estado, cp: c.cp,
    telefono: telefonoMX(c.telefono),
  };
};

/** Cómo se traduce cada estado a color. */
export const tonos = {
  "En tránsito": "info",
  "Entregado": "ok",
  "Detenido": "mal",
  "Recolección pendiente": "aviso",
  "Con incidencia": "mal",
  "Generada": "neutra",
};

const enviosBase = [
  { guia: "JD01480000123", canal: "Shopify", paqueteria: "DHL", pedido: "#10422",
    estado: "En tránsito", original: "Shipment in transit", destino: "Monterrey, NL",
    cliente: "Laura Méndez", fecha: "2026-09-19", peso: 2.4, cotizado: 189.00, facturado: 189.00 },
  { guia: "782394001122", canal: "Mercado Libre", paqueteria: "FedEx", pedido: "#10419",
    /* La paquetería declaró el retorno con sus palabras. Traducirlo no es
       predecir: el paquete ya viene de vuelta exista o no el registro. */
    estado: "Detenido", original: "Delivery exception — return to shipper scheduled", destino: "Guadalajara, JAL",
    cliente: "Comercializadora Vega", fecha: "2026-09-18", peso: 5.1, cotizado: 264.00, facturado: 264.00,
    motivo: "Domicilio incompleto", detenidoDesde: "2026-09-19", responsable: "Karla T." },
  { guia: "6050000112233", canal: "Tiendanube", paqueteria: "Estafeta", pedido: "#10417",
    estado: "Entregado", original: "Entregado a destinatario", destino: "Puebla, PUE",
    cliente: "Ana Sotelo", fecha: "2026-09-17", peso: 1.2, cotizado: 121.00, facturado: 121.00 },
  { guia: "1Z999AA10123", canal: "Amazon", paqueteria: "UPS", pedido: "#10415",
    estado: "Recolección pendiente", original: "Pickup scheduled", destino: "Ciudad de México, CDMX",
    cliente: "Grupo Aldama", fecha: "2026-09-19", peso: 8.6, cotizado: 342.00, facturado: 398.00,
    diferencia: "Sobrepeso: 8.6 kg facturados contra 7.0 cotizados" },
  { guia: "RP-4410982", canal: "WooCommerce", paqueteria: "Redpack", pedido: "#10413",
    estado: "En tránsito", original: "EN RUTA", destino: "Querétaro, QRO",
    cliente: "Martín Alcaraz", fecha: "2026-09-18", peso: 3.3, cotizado: 156.00, facturado: 156.00 },
  { guia: "T1-88213", canal: "Tienda propia", paqueteria: "Estafeta", via: "T1 Envíos", pedido: "#10411",
    estado: "Entregado", original: "IN_TRANSIT", destino: "Mérida, YUC",
    cliente: "Rocío Pat", fecha: "2026-09-15", peso: 0.8, cotizado: 98.00, facturado: 98.00 },
  { guia: "PX-220914", canal: "Shopify", paqueteria: "Paquetexpress", pedido: "#10409",
    estado: "Con incidencia",
    original: "Rechazado por el destinatario. En proceso de retorno al remitente.", destino: "Tijuana, BC",
    cliente: "Iván Cordero", fecha: "2026-09-16", peso: 4.0, cotizado: 210.00, facturado: 245.00,
    motivo: "Destinatario ausente, segundo intento", detenidoDesde: "2026-09-18", responsable: "Sin asignar",
    diferencia: "Reexpedición: 35.00 no cotizados" },
  { guia: "JD01480000456", canal: "Mercado Libre", paqueteria: "DHL", pedido: "#10407",
    estado: "En tránsito", original: "Shipment in transit", destino: "León, GTO",
    cliente: "Silvia Rendón", fecha: "2026-09-17", peso: 1.9, cotizado: 167.00, facturado: 167.00 },
  { guia: "SK-771204", canal: "Tiendanube", paqueteria: "FedEx", via: "Skydropx", pedido: "#10405",
    estado: "Entregado", original: "delivered", destino: "Cancún, QROO",
    cliente: "Hotelería del Caribe", fecha: "2026-09-14", peso: 12.4, cotizado: 480.00, facturado: 480.00 },
  { guia: "EY-9930021", canal: "Amazon", paqueteria: "Redpack", via: "EnviaYa", pedido: "#10403",
    /* Y uno que NO lo declara: sin él no se ve que la pastilla solo sale con
       los que sí, ni que sobre éste no hay ningún aviso de último intento
       porque no se puede tener sin intentos numerados del carrier. */
    estado: "Detenido", original: "Delivery exception — customer not available", destino: "Toluca, MEX",
    cliente: "Refacciones del Valle", fecha: "2026-09-15", peso: 6.7, cotizado: 233.00, facturado: 233.00,
    motivo: "Destinatario ausente", detenidoDesde: "2026-09-17", responsable: "Karla T." },
  { guia: "6050000998877", canal: "Tienda propia", paqueteria: "Estafeta", pedido: "#10401",
    estado: "Generada", original: "—", destino: "Veracruz, VER",
    cliente: "Pescadería del Golfo", fecha: "2026-09-19", peso: 2.0, cotizado: 143.00, facturado: null },
  /* Cuatro guías de DHL compradas en Skydropx, todas de Almacén Puebla y sin
     recolección: son las que la regla directa de esa pareja NO va a tomar. Sin
     ellas, la consecuencia de que `via` sea un campo y no una dimensión no se
     puede enseñar, y se descubriría con un camión vacío. */
  { guia: "SK-880011", canal: "Shopify", paqueteria: "DHL", via: "Skydropx", pedido: "#10431",
    estado: "Generada", original: "label_created", destino: "Puebla, PUE",
    cliente: "Ferretería Aguilar", fecha: "2026-09-20", peso: 2.2, cotizado: 141.00, facturado: null },
  { guia: "SK-880012", canal: "Shopify", paqueteria: "DHL", via: "Skydropx", pedido: "#10432",
    estado: "Generada", original: "label_created", destino: "Querétaro, QRO",
    cliente: "Deportes Lira", fecha: "2026-09-20", peso: 1.4, cotizado: 115.00, facturado: null },
  { guia: "SK-880013", canal: "WooCommerce", paqueteria: "DHL", via: "Skydropx", pedido: "#10433",
    estado: "Generada", original: "label_created", destino: "León, GTO",
    cliente: "Calzado Marbel", fecha: "2026-09-21", peso: 3.8, cotizado: 190.00, facturado: null },
  { guia: "SK-880014", canal: "Shopify", paqueteria: "DHL", via: "Skydropx", pedido: "#10434",
    estado: "Generada", original: "label_created", destino: "Monterrey, NL",
    cliente: "Muebles Anáhuac", fecha: "2026-09-21", peso: 5.6, cotizado: 246.00, facturado: null },

  { guia: "EM-556677", canal: "WooCommerce", paqueteria: "DHL", via: "Envíame", pedido: "#10399",
    estado: "En tránsito", original: "in_transit", destino: "Saltillo, COAH",
    cliente: "Talleres Herrera", fecha: "2026-09-16", peso: 9.2, cotizado: 298.00, facturado: 341.00,
    diferencia: "Zona extendida: 43.00 no cotizados" },
];

/**
 * Plataformas de envío: T1 Envíos, Skydropx, EnviaYa, Envíame.
 *
 * NO son paqueterías. Revenden guías de las mismas paqueterías, así que un
 * envío comprado por ahí lo mueve igual DHL o Estafeta: `paqueteria` es quien
 * lo transporta y `via` es por dónde se compró la guía.
 *
 * La distinción cambia a quién se le reclama. El transportista falló, pero el
 * contrato es con la plataforma: la llamada va ahí.
 */
export const PLATAFORMAS = ["T1 Envíos", "Skydropx", "EnviaYa", "Envíame", "Turbo Envíos"];

/* =================================================================
 * Recolecciones.
 *
 * `piezas` es lo que se programó. `recogidas` NO lo teclea nadie: sale del
 * rastreo. Una guía que empieza a moverse es una guía que la paquetería se
 * llevó; una que sigue sin su primer registro al día siguiente de la ventana
 * es una que se quedó en la bodega.
 *
 * Esa resta es la que sirve para reclamar: "programé nueve piezas el 19 y se
 * llevaron cero" es un hecho con fecha y folio, no una queja.
 *
 * Las de hoy en adelante todavía no tienen resultado y por eso `recogidas`
 * va en null: aún no ha pasado la ventana.
 * ================================================================= */
export const recolecciones = [
  /* ---- Programadas ---- */
  { fecha: "2026-09-21", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 14, recogidas: null, estado: "Confirmada", folio: "RC-8841", origen: "puebla" },
  { fecha: "2026-09-21", paqueteria: "Estafeta", ventana: "13:00 – 18:00", piezas: 9, recogidas: null, estado: "Confirmada", folio: "RC-8842", origen: "puebla" },
  { fecha: "2026-09-23", paqueteria: "FedEx", ventana: "09:00 – 13:00", piezas: 6, recogidas: null, estado: "Por confirmar", folio: "RC-8845", origen: "cdmx" },
  /* De hoy, y con el corte de cancelación de FedEx ya pasado: es la que enseña
     que un "sí" con corte se comporta distinto según la hora. */
  { fecha: "2026-09-21", paqueteria: "FedEx", ventana: "09:00 – 13:00", piezas: 5, recogidas: null, estado: "Confirmada", folio: "RC-8844", origen: "cdmx" },
  { fecha: "2026-09-23", paqueteria: "Redpack", ventana: "11:00 – 17:00", piezas: 4, recogidas: null, estado: "Confirmada", folio: "RC-8846", via: "Skydropx", origen: "puebla" },
  { fecha: "2026-09-24", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 12, recogidas: null, estado: "Recurrente", folio: "RC-8850", origen: "puebla" },
  { fecha: "2026-09-25", paqueteria: "UPS", ventana: "14:00 – 18:00", piezas: 3, recogidas: null, estado: "Por confirmar", folio: "RC-8853", origen: "cdmx" },

  /* ---- Pasadas ---- */
  { fecha: "2026-09-19", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 11, recogidas: 11, estado: "Confirmada", folio: "RC-8838", origen: "puebla" },
  { fecha: "2026-09-19", paqueteria: "Estafeta", ventana: "13:00 – 18:00", piezas: 8, recogidas: 0, estado: "Confirmada", folio: "RC-8839", origen: "puebla" },
  { fecha: "2026-09-18", paqueteria: "FedEx", ventana: "09:00 – 13:00", piezas: 5, recogidas: 5, estado: "Confirmada", folio: "RC-8834", via: "T1 Envíos", origen: "cdmx" },
  { fecha: "2026-09-17", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 9, recogidas: 9, estado: "Confirmada", folio: "RC-8830", origen: "puebla" },
  { fecha: "2026-09-17", paqueteria: "Estafeta", ventana: "13:00 – 18:00", piezas: 7, recogidas: 0, estado: "Confirmada", folio: "RC-8831", origen: "puebla" },
  /* Tercera falla seguida de Estafeta en Puebla. Tres seguidas son el material
     del reclamo, y por eso se muestran juntas en la fila de la regla. */
  { fecha: "2026-09-13", paqueteria: "Estafeta", ventana: "13:00 – 18:00", piezas: 6, recogidas: 0, estado: "Confirmada", folio: "RC-8818", origen: "puebla" },

  /* ---- Días en los que la regla se disparó y no había nada que recoger ----
     NO son fallas: no salió solicitud porque no había guías al corte. Contarlas
     como cita fallida mete un cero que no es culpa de la paquetería, y una
     tabla que sirve para exigir deja de servir en cuanto se le puede contestar
     "ese día no había nada que recoger". */
  { fecha: "2026-09-20", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 0, recogidas: null, resultado: "sin-piezas", estado: "Recurrente", folio: "RC-8843", origen: "puebla" },
  { fecha: "2026-09-16", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 0, recogidas: null, resultado: "sin-piezas", estado: "Recurrente", folio: "RC-8828", origen: "puebla" },
  { fecha: "2026-09-06", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 0, recogidas: null, resultado: "sin-piezas", estado: "Recurrente", folio: "RC-8795", origen: "puebla" },
  { fecha: "2026-09-16", paqueteria: "Redpack", ventana: "11:00 – 17:00", piezas: 6, recogidas: 6, estado: "Confirmada", folio: "RC-8827", origen: "puebla" },
  { fecha: "2026-09-15", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 13, recogidas: 13, estado: "Recurrente", folio: "RC-8822", origen: "puebla" },
  { fecha: "2026-09-15", paqueteria: "Estafeta", ventana: "13:00 – 18:00", piezas: 10, recogidas: 10, estado: "Confirmada", folio: "RC-8823", origen: "puebla" },
  { fecha: "2026-09-14", paqueteria: "UPS", ventana: "14:00 – 18:00", piezas: 3, recogidas: 3, estado: "Confirmada", folio: "RC-8819", origen: "cdmx" },
  { fecha: "2026-09-12", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 8, recogidas: 8, estado: "Recurrente", folio: "RC-8815", origen: "puebla" },
  { fecha: "2026-09-11", paqueteria: "Estafeta", ventana: "13:00 – 18:00", piezas: 9, recogidas: 5, estado: "Confirmada", folio: "RC-8811", origen: "puebla" },
  { fecha: "2026-09-10", paqueteria: "FedEx", ventana: "09:00 – 13:00", piezas: 7, recogidas: 7, estado: "Confirmada", folio: "RC-8807", origen: "cdmx" },
  { fecha: "2026-09-09", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 10, recogidas: 10, estado: "Recurrente", folio: "RC-8803", origen: "puebla" },
  { fecha: "2026-09-08", paqueteria: "Redpack", ventana: "11:00 – 17:00", piezas: 5, recogidas: 5, estado: "Confirmada", folio: "RC-8799", via: "Skydropx", origen: "puebla" },
  { fecha: "2026-09-05", paqueteria: "Estafeta", ventana: "13:00 – 18:00", piezas: 6, recogidas: 6, estado: "Confirmada", folio: "RC-8790", origen: "puebla" },
  { fecha: "2026-09-04", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 12, recogidas: 12, estado: "Recurrente", folio: "RC-8786", origen: "puebla" },
  { fecha: "2026-09-03", paqueteria: "FedEx", ventana: "09:00 – 13:00", piezas: 4, recogidas: 4, estado: "Confirmada", folio: "RC-8782", origen: "cdmx" },
  { fecha: "2026-09-02", paqueteria: "Estafeta", ventana: "13:00 – 18:00", piezas: 8, recogidas: 8, estado: "Confirmada", folio: "RC-8778", origen: "puebla" },
];

/** Lo que pasó con una recolección. Null en `recogidas` = todavía no toca. */
export function resultadoRecoleccion(r) {
  /* Un día en que la regla se disparó y no había guías. No es una falla y no
     se parece a una: no salió solicitud, así que no hay a quién reclamarle. */
  if (r.resultado === "sin-piezas") {
    return { clave: "sin-piezas", texto: "Sin piezas", tono: "neutra",
             nota: "No salió solicitud: no había guías sin recolección al corte." };
  }
  if (r.recogidas === null) return { clave: "programada", texto: r.estado, tono: r.estado === "Por confirmar" ? "aviso" : "ok" };
  if (r.recogidas === 0) return { clave: "fallida", texto: "No se presentó", tono: "mal" };
  if (r.recogidas < r.piezas) return { clave: "parcial", texto: `Incompleta · ${r.recogidas} de ${r.piezas}`, tono: "aviso" };
  return { clave: "completa", texto: "Completa", tono: "ok" };
}

export const recoleccionesPasadas = () =>
  recolecciones.filter((r) => r.recogidas !== null || r.resultado === "sin-piezas");
export const recoleccionesProximas = () =>
  recolecciones.filter((r) => r.recogidas === null && r.resultado !== "sin-piezas");

/**
 * Cumplimiento por paquetería sobre las que ya pasaron. Ordenado de peor a
 * mejor: la lista contesta a quién hay que reclamarle, no quién va bien.
 */
export function cumplimientoRecolecciones(dias = null) {
  const desde = dias === null ? null : menosDias(HOY, dias);
  const porPaqueteria = {};
  for (const r of recoleccionesPasadas()) {
    if (desde && r.fecha < desde) continue;
    /* El porcentaje solo cuenta citas CON piezas. Un día sin piezas contado
       como cita programada mete un cero que no es culpa de la paquetería. */
    if (r.resultado === "sin-piezas") continue;
    const p = (porPaqueteria[r.paqueteria] ||= { paqueteria: r.paqueteria, programadas: 0, recogidas: 0, citas: 0, fallidas: 0, parciales: 0 });
    p.programadas += r.piezas;
    p.recogidas += r.recogidas;
    p.citas += 1;
    if (r.recogidas === 0) p.fallidas += 1;
    else if (r.recogidas < r.piezas) p.parciales += 1;
  }
  return Object.values(porPaqueteria)
    .map((p) => ({ ...p, pct: p.programadas ? Math.round((p.recogidas / p.programadas) * 100) : null }))
    .sort((a, b) => a.pct - b.pct);
}

/** Cumplimiento por paquetería sobre el periodo seleccionado. */
export const desempeno = [
  { paqueteria: "DHL", envios: 412, aTiempo: 94, tarde: 19, incidencias: 6, causaPrincipal: "Domicilio incompleto" },
  { paqueteria: "Estafeta", envios: 386, aTiempo: 89, tarde: 42, incidencias: 11, causaPrincipal: "Destinatario ausente" },
  { paqueteria: "FedEx", envios: 254, aTiempo: 91, tarde: 23, incidencias: 5, causaPrincipal: "Zona de difícil acceso" },
  { paqueteria: "Redpack", envios: 198, aTiempo: 82, tarde: 36, incidencias: 14, causaPrincipal: "Retraso en tránsito" },
  { paqueteria: "UPS", envios: 143, aTiempo: 96, tarde: 6, incidencias: 2, causaPrincipal: "Domicilio incompleto" },
  { paqueteria: "T1 Envíos", envios: 121, aTiempo: 86, tarde: 17, incidencias: 8, causaPrincipal: "Destinatario ausente" },
];

export const canalesRed = [
  { nombre: "Shopify", sigla: "Sh" },
  { nombre: "Mercado Libre", sigla: "ML" },
  { nombre: "Amazon", sigla: "Az" },
];
export const destinosRed = [
  { nombre: "DHL", sigla: "DH" },
  { nombre: "FedEx", sigla: "Fx" },
  { nombre: "Estafeta", sigla: "Es" },
];

export const dinero = (n) =>
  n == null ? "—" : n.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });

/**
 * Enumera en español, con la "e" que sustituye a "y" antes de i- o hi-:
 * "Sobre e interior", no "Sobre y interior". Se nombra, no se cuenta: "2
 * cajas" no dice cuáles, y cuáles es justo lo que hace falta saber.
 */
export const enumerarEs = (nombres) => {
  const xs = nombres.filter(Boolean);
  if (xs.length <= 1) return xs[0] ?? "";
  const ultimo = xs[xs.length - 1];
  const union = /^(i|hi)(?!e)/i.test(ultimo) ? " e " : " y ";
  return xs.slice(0, -1).join(", ") + union + ultimo;
};

/** Con la moneda escrita. En una cifra grande y sola, "$180.00" es ambiguo. */
export const dineroMXN = (n) => (n == null ? "—" : `${dinero(n)} MXN`);

/** Con año: en un encabezado, "21-sep" se lee recortado y ambiguo. */
export const fechaLarga = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-MX",
    { day: "numeric", month: "short", year: "numeric" }).replace(".", "");

export const fechaCorta = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-MX", { day: "2-digit", month: "short" });

/** Con el mes escrito. Dentro de una frase corrida, "14 ago 2026" se lee como
    la abreviatura de una tabla y no como una fecha. */
export const fechaEnTexto = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-MX",
    { day: "numeric", month: "long", year: "numeric" });

/** El "hoy" del prototipo. Los datos son fijos, así que la fecha también:
 *  si usáramos el reloj real, mañana todo llevaría un día más esperando. */
export const HOY = "2026-09-21";

/**
 * La hora del prototipo. Existe por la misma razón que `HOY`: hay decisiones
 * que dependen de la hora del día —si el corte para cancelar ya pasó— y con el
 * reloj real la misma pantalla se comporta distinto por la mañana que por la
 * tarde, y entonces no se puede discutir en una reunión.
 *
 * Elegida después del corte de FedEx (16:00) a propósito: es lo que hace que
 * el caso "el corte ya pasó" se pueda ver en la recolección de hoy, mientras
 * la del 23 todavía lo tiene por delante.
 */
export const AHORA = "16:30";

export const diasDesde = (iso) =>
  Math.max(0, Math.round((new Date(HOY + "T12:00:00") - new Date(iso + "T12:00:00")) / 86400000));

/** Resta días a una fecha ISO y devuelve otra ISO. Para los atajos de rango. */
export const menosDias = (iso, n) => {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};


/* =================================================================
 * Pedidos — el módulo que ya existe en el MVP.
 *
 * Los datos siguen el modelo de la versión funcional: pedido que entra
 * por un canal, con su cliente, su destino, su pago y —si ya se generó—
 * su guía. Mismos totales del MVP: 7 pedidos, 4 sin enviar, 3 con guía,
 * $180.00 MXN en el periodo.
 * ================================================================= */

export const tienda = {
  dominio: "ceeq1p-jd.myshopify.com",
  canal: "Shopify",
  conectada: true,
};

/**
 * Una dirección de entrega completa, escrita y no deducida del destino.
 *
 * Deducirla dejaba la colonia en blanco, y entonces todos los pedidos nuevos
 * salían con el aviso de "Falta la colonia": un aviso que sale en todas las
 * filas deja de señalar nada. Los campos son los MISMOS que los del origen y
 * los del formulario de edición, con los mismos nombres.
 */
const domicilio = (nombre, apellido, calle, numExt, colonia, ciudad, estado, cp, telefono) => ({
  nombre, apellido, correo: "", lada: "+52", telefono, compania: "",
  calle, numExt, numInt: "", cp, colonia, estado, ciudad, referencia: "",
});

const pedidosBase = [
  { folio: "#1007", fecha: "2026-09-21", total: 10, canal: "Shopify",
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: { guia: "877543753572", paqueteria: "FedEx", estado: "Creada", costo: 189, peso: 1.2 } },

  { folio: "#1006", fecha: "2026-09-17", total: 60, canal: "Shopify",
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", recoleccion: "RC-8841",
    envio: { guia: "6822851033", paqueteria: "DHL", estado: "Creada", costo: 156, peso: 3.4 } },

  { folio: "#1005", fecha: "2026-09-17", total: 50, canal: "Shopify",
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: { guia: "877394716724", paqueteria: "FedEx", estado: "Creada", costo: 142, peso: 2 } },

  { folio: "#1004", fecha: "2026-09-17", total: 30, canal: "Shopify",
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: null,
    requiereCorreccion: "Sin colonia y el número interior va dentro de la calle.",
    correccionPropuesta: [
      { campo: "Calle", antes: "Port Agrere 9", despues: "Porto Alegre 9" },
      { campo: "Colonia", antes: "Sin colonia", despues: "Geovillas del Sur" },
      { campo: "Interior", antes: "casa (dentro de la calle)", despues: "Int. Casa" },
    ],
  },

  { folio: "#1003", fecha: "2026-09-17", total: 10, canal: "Shopify",
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: null,
    requiereCorreccion: "Sin colonia y el número interior va dentro de la calle.",
    correccionPropuesta: [
      { campo: "Calle", antes: "Port Agrere 9", despues: "Porto Alegre 9" },
      { campo: "Colonia", antes: "Sin colonia", despues: "Geovillas del Sur" },
      { campo: "Interior", antes: "casa (dentro de la calle)", despues: "Int. Casa" },
    ],
  },

  // Un pedido al que le falla la generación de la guía. El MVP todavía no
  // tiene este estado y es el que más duele: el pedido parece pendiente,
  // pero nadie va a volver a intentarlo si no se dice.
  { folio: "#1002", fecha: "2026-09-16", total: 15, canal: "Shopify",
    cliente: { nombre: "Mariana Ordaz", correo: "mariana@tallerlumbre.mx", iniciales: "MO" },
    destino: "Av. Juárez 1804, Col. Centro", ciudad: "Monterrey, NL 64000",
    pago: "Pagado", envio: null,
    error: "La paquetería rechazó el código postal: no corresponde a la colonia." },

  { folio: "#1000", fecha: "2026-09-18", total: 780, canal: "Shopify",
    cliente: { nombre: "Rocío Lara", correo: "rocio@lara.mx", iniciales: "RL" },
    destino: "Circuito Balcones 44", ciudad: "Querétaro, QRO 76140",
    pago: "Pagado", envio: null },

  { folio: "#0999", fecha: "2026-09-18", total: 1960, canal: "Mercado Libre",
    cliente: { nombre: "Hugo Serna", correo: "hserna@correo.mx", iniciales: "HS" },
    destino: "Av. Constitución 900", ciudad: "Monterrey, NL 64000",
    pago: "Pagado", envio: null },

  { folio: "#0997", fecha: "2026-09-17", total: 430, canal: "Tiendanube",
    cliente: { nombre: "Abarrotes La Sierra", correo: "sierra@correo.mx", iniciales: "AS" },
    destino: "Camino Real s/n", ciudad: "San Juan Chamula, CHIS 29320",
    pago: "Pagado", envio: null },

  /* Historial. Sin pedidos viejos, los atajos de fecha no se distinguen:
     todo cabía en los últimos siete días y "30 días" mostraba lo mismo. */
  { folio: "#0998", fecha: "2026-09-02", total: 1240, canal: "Tiendanube",
    cliente: { nombre: "Papelería Zaragoza", correo: "compras@zaragoza.mx", iniciales: "PZ" },
    destino: "Av. 16 de Septiembre 402", ciudad: "Puebla, PUE 72000",
    pago: "Pagado", envio: { guia: "6050000445566", paqueteria: "Estafeta", estado: "Entregado",
      original: "Entregado a destinatario", costo: 132, peso: 4.1 } },

  { folio: "#0995", fecha: "2026-08-30", total: 2860, canal: "Shopify",
    cliente: { nombre: "Estudio Panal", correo: "hola@panal.design", iniciales: "EP" },
    destino: "Colima 158, Roma Norte", ciudad: "Ciudad de México, CDMX 06700",
    pago: "Pagado", envio: { guia: "JD01480000789", paqueteria: "DHL", estado: "Entregado",
      original: "Delivered", costo: 204, peso: 2.8 } },

  { folio: "#0991", fecha: "2026-08-27", total: 540, canal: "Mercado Libre",
    cliente: { nombre: "Jorge Beltrán", correo: "jbeltran@correo.mx", iniciales: "JB" },
    destino: "Blvd. Díaz Ordaz 1200", ciudad: "Tijuana, BC 22010",
    pago: "Pagado", envio: { guia: "782394007788", paqueteria: "FedEx", estado: "Entregado",
      original: "Delivered", costo: 318, peso: 1.5 } },

  { folio: "#0987", fecha: "2026-08-25", total: 4100, canal: "Amazon",
    cliente: { nombre: "Ferretería del Bajío", correo: "ventas@bajio.mx", iniciales: "FB" },
    destino: "Carr. Panamericana km 12", ciudad: "León, GTO 37200",
    pago: "Pagado", envio: { guia: "1Z999AA10456", paqueteria: "UPS", estado: "Entregado",
      original: "DELIVERED", costo: 276, peso: 11.3 } },

  { folio: "#1001", fecha: "2026-09-15", total: 5, canal: "Shopify",
    cliente: { nombre: "Grupo Aldama", correo: "compras@aldama.mx", iniciales: "GA" },
    destino: "Calz. de Tlalpan 3020, Coyoacán", ciudad: "Ciudad de México, CDMX 04650",
    pago: "Pendiente", envio: null },

  /* ---------------------------------------------------------------
   * Pedidos con artículos de verdad.
   *
   * El resto del ejemplo lleva una línea sintética —"Artículo del pedido",
   * sin SKU, una pieza— y con eso no se puede enseñar funcionando ninguna
   * condición de embalaje, ningún veto ni la revisión manual. Estos catorce
   * traen SKU, nombre y cantidad, que es lo que el canal manda.
   *
   * Los que NO disparan cada condición son tan necesarios como los que sí:
   * una condición que se cumple siempre no se distingue de una que no se
   * evalúa. Por eso están #1012 con dos piezas, #1017 con tazas pero sin el
   * ventilador y #1023 con la línea sin SKU.
   *
   * `pesoCanal` y `medidasCanal` son DOS CAMPOS y no se ponen juntos, porque
   * de eso depende cuál de los dos motivos de revisión manual se puede
   * demostrar. Con los dos, mandan los del pedido y no se evalúa ninguna
   * regla: el pedido sale de la cadena en el primer paso —solo `#1012`—. Con
   * el peso solo, la regla sí elige caja y después hay peso que comparar
   * contra ella: es el único camino por el que el tope se dispara, y lo lleva
   * `#1014`. Un pedido con veto nunca puede demostrar el tope, porque se queda
   * sin caja antes de que haya peso que medir.
   * ------------------------------------------------------------- */
  { folio: "#1010", fecha: "2026-09-20", total: 189, canal: "Shopify",
    cliente: { nombre: "Lucía Ferrer", correo: "lucia.ferrer@correo.mx", iniciales: "LF" },
    destino: "Blvd. Atlixco 320", ciudad: "Puebla, PUE 72190", pago: "Pagado", envio: null,
    campos: domicilio("Lucía", "Ferrer", "Blvd. Atlixco", "320", "La Paz", "Puebla", "Puebla", "72190", "2223318844"),
    articulos: [{ nombre: "Pluma de metal grabada", sku: "MON-PLU-01", cantidad: 1, precio: 189 }] },

  { folio: "#1011", fecha: "2026-09-20", total: 2100, canal: "Shopify",
    cliente: { nombre: "Diego Fuentes", correo: "diego.fuentes@correo.mx", iniciales: "DF" },
    destino: "Av. Ejército Nacional 612", ciudad: "Ciudad de México, CDMX 11529", pago: "Pagado", envio: null,
    campos: domicilio("Diego", "Fuentes", "Av. Ejército Nacional", "612", "Ampliación Granada", "Ciudad de México", "Ciudad de México", "11529", "5544019022"),
    articulos: [{ nombre: "Audífonos inalámbricos", sku: "MON-AUD-BT", cantidad: 1, precio: 2100 }] },

  { folio: "#1012", fecha: "2026-09-19", total: 458, canal: "WooCommerce",
    cliente: { nombre: "Norma Espinoza", correo: "norma.espinoza@correo.mx", iniciales: "NE" },
    destino: "Av. Vallarta 1440", ciudad: "Guadalajara, JAL 44160", pago: "Pagado", envio: null,
    campos: domicilio("Norma", "Espinoza", "Av. Vallarta", "1440", "Americana", "Guadalajara", "Jalisco", "44160", "3312907744"),
    pesoCanal: 0.9, medidasCanal: { largo: 24, ancho: 18, alto: 12 },
    articulos: [{ nombre: "Taza de cerámica 360 ml", sku: "MON-TAZ-360", cantidad: 2, precio: 229 }] },

  { folio: "#1013", fecha: "2026-09-19", total: 1047, canal: "Shopify",
    cliente: { nombre: "Laura Méndez", correo: "laura.mendez@correo.mx", iniciales: "LM" },
    destino: "Versalles 88", ciudad: "Ciudad de México, CDMX 06600", pago: "Pagado", envio: null,
    origen: "cdmx",
    campos: domicilio("Laura", "Méndez", "Versalles", "88", "Juárez", "Ciudad de México", "Ciudad de México", "06600", "5528114455"),
    articulos: [{ nombre: "Playera negra talla M", sku: "MON-PLY-NEG-M", cantidad: 3, precio: 349 }] },

  /* El canal reportó el peso pero no las medidas: la regla elige caja y el
     peso del pedido la desborda. Es el segundo motivo de revisión manual, el
     que sin un pedido así no se podría ver nunca. */
  { folio: "#1014", fecha: "2026-09-18", total: 4188, canal: "Shopify",
    cliente: { nombre: "Uniformes del Centro", correo: "compras@uniformesdelcentro.mx", iniciales: "UC" },
    destino: "Blvd. Adolfo López Mateos 2210", ciudad: "León, GTO 37160", pago: "Pagado", envio: null,
    campos: domicilio("Ismael", "Durán", "Blvd. Adolfo López Mateos", "2210", "Jardines del Moral", "León", "Guanajuato", "37160", "4777102255"),
    pesoCanal: 16.8, revisionDesde: "2026-09-18",
    articulos: [{ nombre: "Playera negra talla M", sku: "MON-PLY-NEG-M", cantidad: 12, precio: 349 }] },

  { folio: "#1015", fecha: "2026-09-18", total: 1290, canal: "Shopify",
    cliente: { nombre: "Iván Salas", correo: "ivan.salas@correo.mx", iniciales: "IS" },
    destino: "Av. Ejército Nacional 980", ciudad: "Ciudad de México, CDMX 11529", pago: "Pagado", envio: null,
    campos: domicilio("Iván", "Salas", "Av. Ejército Nacional", "980", "Ampliación Granada", "Ciudad de México", "Ciudad de México", "11529", "5539227788"),
    articulos: [{ nombre: 'Ventilador de pedestal 16"', sku: "MON-VEN-16", cantidad: 1, precio: 1290 }] },

  { folio: "#1016", fecha: "2026-09-17", total: 1748, canal: "Shopify",
    cliente: { nombre: "Casa Bernal", correo: "hola@casabernal.mx", iniciales: "CB" },
    destino: "Calle 60 318", ciudad: "Mérida, YUC 97050", pago: "Pagado", envio: null,
    campos: domicilio("Teresa", "Bernal", "Calle 60", "318", "Alcalá Martín", "Mérida", "Yucatán", "97050", "9991440066"),
    articulos: [
      { nombre: 'Ventilador de pedestal 16"', sku: "MON-VEN-16", cantidad: 1, precio: 1290 },
      { nombre: "Taza de cerámica 360 ml", sku: "MON-TAZ-360", cantidad: 2, precio: 229 },
    ] },

  { folio: "#1017", fecha: "2026-09-17", total: 687, canal: "WooCommerce",
    cliente: { nombre: "Rocío Ibarra", correo: "rocio.ibarra@correo.mx", iniciales: "RI" },
    destino: "Versalles 140", ciudad: "Ciudad de México, CDMX 06600", pago: "Pagado", envio: null,
    campos: domicilio("Rocío", "Ibarra", "Versalles", "140", "Juárez", "Ciudad de México", "Ciudad de México", "06600", "5521330099"),
    articulos: [{ nombre: "Taza de cerámica 360 ml", sku: "MON-TAZ-360", cantidad: 3, precio: 229 }] },

  /* El par que más importa: el mismo producto vetado, con salida y sin ella.
     #1018 gana la regla de una pieza, que apunta al Sobre; el veto se lo
     quita, y la regla por defecto apunta también al Sobre. Sin caja, no se
     genera solo. #1019 lleva el mismo producto y sale limpio porque gana
     antes una regla que apunta a otra caja. */
  { folio: "#1018", fecha: "2026-09-16", total: 1480, canal: "Shopify",
    cliente: { nombre: "Comercializadora Vega", correo: "compras@vega.mx", iniciales: "CV" },
    destino: "Av. Ejército Nacional 218", ciudad: "Ciudad de México, CDMX 11529", pago: "Pagado", envio: null,
    campos: domicilio("Alonso", "Vega", "Av. Ejército Nacional", "218", "Ampliación Granada", "Ciudad de México", "Ciudad de México", "11529", "5511884466"),
    revisionDesde: "2026-09-16",
    articulos: [{ nombre: "Juego de 6 copas", sku: "MON-CRI-6", cantidad: 1, precio: 1480 }] },

  { folio: "#1019", fecha: "2026-09-16", total: 3370, canal: "Shopify",
    cliente: { nombre: "Abastecedora Lomas", correo: "pedidos@abastlomas.mx", iniciales: "AL" },
    destino: "Av. Constituyentes 715", ciudad: "Querétaro, QRO 76040", pago: "Pagado", envio: null,
    campos: domicilio("Marisol", "Peña", "Av. Constituyentes", "715", "Villas del Sol", "Querétaro", "Querétaro", "76040", "4421990033"),
    articulos: [
      { nombre: "Juego de 6 copas", sku: "MON-CRI-6", cantidad: 1, precio: 1480 },
      { nombre: "Licuadora 800 W", sku: "MON-LIC-800", cantidad: 1, precio: 1890 },
    ] },

  /* De agosto a propósito: es el único producto cuyo último pedido queda fuera
     de los treinta días, y sin uno así la columna de uso del buscador —"el
     último el 12 de agosto" contra "el último el 18 de septiembre"— no se ve
     hacer nada. */
  { folio: "#1020", fecha: "2026-08-12", total: 2300, canal: "Shopify",
    cliente: { nombre: "Hotel Miramar", correo: "compras@miramar.mx", iniciales: "HM" },
    destino: "Colima 240", ciudad: "Ciudad de México, CDMX 06700", pago: "Pagado", envio: null,
    origen: "cdmx",
    campos: domicilio("Gerardo", "Nava", "Colima", "240", "Roma Norte", "Ciudad de México", "Ciudad de México", "06700", "5545772211"),
    articulos: [{ nombre: "Cobertor queen size", sku: "MON-COB-QS", cantidad: 2, precio: 1150 }] },

  /* Dos vetos sobre el mismo SKU, y los dos aplican: «Pedidos de una pieza» le
     da Sobre y «Pedido caro» le da Caja chica. Ninguna regla apunta a una caja
     que le quede, y por eso este pedido enseña que un producto puede tener más
     de una caja prohibida, que el motivo tiene que nombrarlas todas y que el
     diálogo de borrar una plantilla tiene que contarlas. Sin `pesoCanal` a
     propósito: cae en el paso de los vetos y nunca llega al del tope. */
  { folio: "#1021", fecha: "2026-09-14", total: 12400, canal: "Shopify",
    cliente: { nombre: "Electro Sureste", correo: "ventas@electrosureste.mx", iniciales: "ES" },
    destino: "Blvd. Manuel Ávila Camacho 1180", ciudad: "Veracruz, VER 94299", pago: "Pagado", envio: null,
    campos: domicilio("Ramiro", "Ocaña", "Blvd. Manuel Ávila Camacho", "1180", "Costa de Oro", "Veracruz", "Veracruz", "94299", "2291660044"),
    revisionDesde: "2026-09-14",
    articulos: [{ nombre: "Pantalla de 55 pulgadas", sku: "MON-TV-55", cantidad: 1, precio: 12400 }] },

  { folio: "#1022", fecha: "2026-09-12", total: 2100, canal: "Mercado Libre",
    cliente: { nombre: "Bruno Lazcano", correo: "bruno.lazcano@correo.mx", iniciales: "BL" },
    destino: "Av. Constitución 1420", ciudad: "Monterrey, NL 64000", pago: "Pagado", envio: null,
    campos: domicilio("Bruno", "Lazcano", "Av. Constitución", "1420", "Centro", "Monterrey", "Nuevo León", "64000", "8118330077"),
    articulos: [{ nombre: "Audífonos inalámbricos", sku: "MON-AUD-BT", cantidad: 1, precio: 2100 }] },

  /* La línea llega sin SKU. Ni la condición por producto ni el veto se pueden
     evaluar, y una condición que no se puede evaluar nunca se da por
     cumplida: la regla se salta con aviso y el pedido pasa a la siguiente. */
  { folio: "#1023", fecha: "2026-09-10", total: 698, canal: "Amazon",
    cliente: { nombre: "Paulina Cortés", correo: "paulina.cortes@correo.mx", iniciales: "PC" },
    destino: "Av. Vallarta 980", ciudad: "Guadalajara, JAL 44160", pago: "Pagado", envio: null,
    campos: domicilio("Paulina", "Cortés", "Av. Vallarta", "980", "Americana", "Guadalajara", "Jalisco", "44160", "3314880011"),
    articulos: [{ nombre: "Playera negra talla M", sku: null, cantidad: 2, precio: 349 }] },
];

/* -----------------------------------------------------------------
 * Pedidos y envíos son el mismo objeto, así que hay UNA sola lista.
 *
 * Tener dos obligaba a preguntarse "¿la guía 877… la busco en Pedidos o
 * en Envíos?". Aquí el pedido es la fuente: cuando tiene guía, se deriva
 * el envío. Las pantallas que trabajan con envíos siguen consumiendo
 * `envios` y no se enteran del cambio.
 *
 * Cuando el 1:1 se rompa —un pedido partido en dos guías, una devolución
 * sin pedido nuevo— la solución es que `envio` pase a ser una lista, no
 * abrir una segunda pantalla.
 * --------------------------------------------------------------- */

/** Los envíos que no nacieron de la tienda conectada, vistos como pedidos. */
const totalesPorFolio = {
  "#10422": 1480, "#10419": 2360, "#10417": 640, "#10415": 3120, "#10413": 890,
  "#10411": 410, "#10409": 1250, "#10407": 760, "#10405": 5400, "#10403": 2180,
  "#10401": 980, "#10399": 3450,
  "#10431": 720, "#10432": 460, "#10433": 1180, "#10434": 2340,
};

/**
 * Una dirección de entrega por ciudad de destino.
 *
 * Los envíos antiguos del ejemplo solo traían la ciudad, así que su etiqueta
 * salía con la calle y el código postal en blanco. Una etiqueta sin CP no
 * entra a ninguna ruta: el prototipo no puede enseñar impresión con ellas.
 *
 * El número exterior y el teléfono se derivan del folio, no del azar: dos
 * cargas de la misma pantalla tienen que dar lo mismo o no se puede hablar
 * de lo que se ve.
 */
const DIRECCION_POR_CIUDAD = {
  "Cancún, QROO":        { calle: "Av. Tulum", colonia: "Supermanzana 15", ciudad: "Cancún", estado: "Quintana Roo", cp: "77500", lada: "998" },
  "Ciudad de México, CDMX": { calle: "Av. Insurgentes Sur", colonia: "Crédito Constructor", ciudad: "Ciudad de México", estado: "Ciudad de México", cp: "03940", lada: "55" },
  "Guadalajara, JAL":    { calle: "Av. Vallarta", colonia: "Americana", ciudad: "Guadalajara", estado: "Jalisco", cp: "44160", lada: "33" },
  "León, GTO":           { calle: "Blvd. Adolfo López Mateos", colonia: "Jardines del Moral", ciudad: "León", estado: "Guanajuato", cp: "37160", lada: "477" },
  "Monterrey, NL":       { calle: "Av. Constitución", colonia: "Centro", ciudad: "Monterrey", estado: "Nuevo León", cp: "64000", lada: "81" },
  "Mérida, YUC":         { calle: "Calle 60", colonia: "Alcalá Martín", ciudad: "Mérida", estado: "Yucatán", cp: "97050", lada: "999" },
  "Puebla, PUE":         { calle: "Av. Juárez", colonia: "La Paz", ciudad: "Puebla", estado: "Puebla", cp: "72160", lada: "222" },
  "Querétaro, QRO":      { calle: "Av. Constituyentes", colonia: "Villas del Sol", ciudad: "Querétaro", estado: "Querétaro", cp: "76040", lada: "442" },
  "Saltillo, COAH":      { calle: "Blvd. Venustiano Carranza", colonia: "Villa Olímpica", ciudad: "Saltillo", estado: "Coahuila", cp: "25230", lada: "844" },
  "Tijuana, BC":         { calle: "Blvd. Agua Caliente", colonia: "Aviación", ciudad: "Tijuana", estado: "Baja California", cp: "22014", lada: "664" },
  "Toluca, MEX":         { calle: "Paseo Tollocan", colonia: "Universidad", ciudad: "Toluca", estado: "México", cp: "50130", lada: "722" },
  "Veracruz, VER":       { calle: "Blvd. Manuel Ávila Camacho", colonia: "Costa de Oro", ciudad: "Veracruz", estado: "Veracruz", cp: "94299", lada: "229" },
};

/** Entero estable a partir del folio. Mismo folio, mismo número, siempre. */
const semilla = (folio) => [...folio].reduce((n, ch) => (n * 131 + ch.codePointAt(0)) % 1e9, 7);

function camposDeCiudad(folio, ciudad, nombre) {
  const base = DIRECCION_POR_CIUDAD[ciudad];
  if (!base) return null;
  const n = semilla(folio);
  const partes = nombre.split(" ");
  return {
    nombre: partes[0] || "", apellido: partes.slice(1).join(" "),
    correo: "", lada: "+52",
    telefono: base.lada + String((n * 7919) % 10 ** (10 - base.lada.length))
      .padStart(10 - base.lada.length, "0"),
    compania: "", calle: base.calle, numExt: String(100 + (n % 1800)), numInt: "",
    cp: base.cp, colonia: base.colonia, estado: base.estado, ciudad: base.ciudad,
    referencia: "",
  };
}

const pedidosDeEnvios = enviosBase.map((e) => ({
  folio: e.pedido,
  fecha: e.fecha,
  total: totalesPorFolio[e.pedido] ?? 0,
  canal: e.canal,
  cliente: {
    nombre: e.cliente,
    correo: e.cliente.toLowerCase().replace(/[^a-záéíóúñ ]/g, "").trim().split(" ").slice(0, 2).join(".")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "@correo.mx",
    iniciales: e.cliente.split(" ").slice(0, 2).map((x) => x[0]).join("").toUpperCase(),
  },
  direccion: "",
  ciudad: e.destino,
  campos: camposDeCiudad(e.pedido, e.destino, e.cliente),
  pago: "Pagado",
  envio: {
    guia: e.guia, paqueteria: e.paqueteria, via: e.via ?? null, estado: e.estado, original: e.original,
    peso: e.peso, costo: e.facturado ?? e.cotizado, cotizado: e.cotizado, facturado: e.facturado,
    motivo: e.motivo, detenidoDesde: e.detenidoDesde, responsable: e.responsable,
    diferencia: e.diferencia,
  },
}));

export const pedidos = [...pedidosBase, ...pedidosDeEnvios];

/* =================================================================
 * Guías creadas durante la sesión.
 *
 * El prototipo no tiene servidor, así que una guía generada en Pedidos vivía
 * solo en memoria: al abrir su etiqueta en otra pestaña ya no existía. Se
 * guardan en sessionStorage y se aplican a `pedidos` ANTES de derivar
 * `envios`, para que todas las pantallas vean lo mismo.
 *
 * sessionStorage y no localStorage a propósito: al cerrar la pestaña el
 * prototipo vuelve a su estado inicial y la siguiente demostración empieza
 * limpia.
 * ================================================================= */

const CLAVE_GUIAS = "tc:guias";
const CLAVE_IMPRESAS = "tc:impresas";

const leerMapa = (clave) => {
  try { return JSON.parse(sessionStorage.getItem(clave) || "{}"); } catch { return {}; }
};
/* Devuelve si de verdad guardó. En modo privado no guarda, y un aviso que dice
   "Guardado." cuando nada se guardó afirma algo que no pasó: es peor que no
   tener aviso, porque el comerciante se va convencido de que su cambio existe. */
const escribirMapa = (clave, valor) => {
  try { sessionStorage.setItem(clave, JSON.stringify(valor)); return true; }
  catch { return false; }
};

/** Si el navegador deja escribir. Lo consultan los avisos antes de afirmar. */
export const seGuarda = () => {
  try {
    sessionStorage.setItem("tc:prueba", "1");
    sessionStorage.removeItem("tc:prueba");
    return true;
  } catch { return false; }
};

/* =================================================================
 * El envío suelto: un pedido sin canal.
 *
 * No hay tercera colección. `envios` se deriva de `pedidos` y todas las
 * pantallas leen esa derivación; una lista aparte devolvería la pregunta que
 * el modelo ya mató: si la guía 877 se busca en Pedidos o en la otra lista.
 * ================================================================= */
const CLAVE_SUELTOS = "tc:sueltos";

export const esSuelto = (p) => !!p && p.canal === null;

/** La referencia es lo único que sustituye al folio del canal. */
export const referenciaDe = (p) => (esSuelto(p) ? p.referencia ?? null : null);

/* La serie es nuestra y NO lleva almohadilla: el `#` es la marca del folio del
   canal y arrastra a buscarlo en Shopify, donde no está. `TC` tampoco, que ya
   lo usan las guías simuladas. */
const folioSueltoSiguiente = () => {
  const n = pedidos.filter(esSuelto)
    .reduce((may, p) => Math.max(may, Number(p.folio.slice(2)) || 0), 42);
  return `E-${String(n + 1).padStart(4, "0")}`;
};

const inicialesDe = (nombre) => String(nombre ?? "").trim().split(/\s+/).slice(0, 2)
  .map((x) => (x[0] ?? "").toUpperCase()).join("") || "—";

/**
 * Arma el pedido sin canal y devuelve si de verdad se guardó.
 *
 * `total` en null y no en cero: cero sería una venta de cero pesos, y lo que
 * hay es una venta que ningún canal reportó. `pago` igual, por lo mismo:
 * "Pendiente" afirma que alguien lo está esperando.
 */
export function crearEnvioSuelto({ referencia, campos, total = null, articulos = [] }) {
  const folio = folioSueltoSiguiente();
  const nombre = [campos.nombre, campos.apellido].filter(Boolean).join(" ").trim();
  const pedido = {
    folio, fecha: HOY, canal: null, origenCaptura: "manual",
    referencia: String(referencia ?? "").trim(),
    total: total === null || total === "" ? null : Number(total),
    cliente: { nombre, correo: campos.correo || "", iniciales: inicialesDe(nombre) },
    destino: [campos.calle, campos.numExt].filter(Boolean).join(" "),
    ciudad: [[campos.ciudad, campos.estado].filter(Boolean).join(", "), campos.cp]
      .filter(Boolean).join(" "),
    campos: { ...campos },
    pago: null,
    envio: null,
    articulos: articulos.length ? articulos : undefined,
  };
  pedidos.unshift(pedido);
  const mapa = leerMapa(CLAVE_SUELTOS);
  mapa[folio] = pedido;
  return { pedido, guardado: escribirMapa(CLAVE_SUELTOS, mapa) };
}

/** Borrar solo alcanza a los que se capturaron en esta sesión. */
export function eliminarEnvioSuelto(folio) {
  const i = pedidos.findIndex((x) => x.folio === folio);
  if (i >= 0) pedidos.splice(i, 1);
  const mapa = leerMapa(CLAVE_SUELTOS);
  delete mapa[folio];
  return escribirMapa(CLAVE_SUELTOS, mapa);
}

/* Se restauran ANTES que las guías de la sesión: un suelto capturado y
   despachado tiene las dos cosas guardadas, y sin el pedido la guía no tendría
   a quién pegarse. */
for (const suelto of Object.values(leerMapa(CLAVE_SUELTOS))) {
  if (!pedidos.some((x) => x.folio === suelto.folio)) pedidos.unshift(suelto);
}

/**
 * A dónde lleva "Abrir en el canal".
 *
 * Solo existe donde sabemos construir la dirección —hoy Shopify, con el
 * dominio de la tienda conectada—. Donde no, devuelve null y el botón no se
 * dibuja: es la misma regla de la matriz de capacidades, y un botón que
 * promete una pantalla que nadie puede abrir es peor que ningún botón.
 */
export const enlaceCanal = (p) => {
  if (!p?.canal || p.canal !== tienda.canal || !tienda.conectada) return null;
  return `https://${tienda.dominio}/admin/orders?query=${encodeURIComponent(p.folio)}`;
};

/** Deja constancia de una guía recién creada. */
export function guardarGuia(folio, envio) {
  const mapa = leerMapa(CLAVE_GUIAS);
  mapa[folio] = envio;
  escribirMapa(CLAVE_GUIAS, mapa);
}

/* Se aplican al arrancar el módulo. Si el pedido ya traía envío de fábrica no
   se toca: lo guardado son guías NUEVAS, no correcciones de las existentes. */
for (const [folio, envio] of Object.entries(leerMapa(CLAVE_GUIAS))) {
  const pedido = pedidos.find((x) => x.folio === folio);
  if (pedido && !pedido.envio) pedido.envio = envio;
}

/**
 * Borra la constancia de una guía cancelada.
 *
 * Solo alcanza a las que se crearon en esta sesión: las que el pedido ya traía
 * de fábrica son el punto de partida del prototipo y volverían a aparecer al
 * recargar. Es la misma asimetría que ya tiene `guardarGuia`, que tampoco pisa
 * las de fábrica.
 */
export function olvidarGuia(folio) {
  const mapa = leerMapa(CLAVE_GUIAS);
  delete mapa[folio];
  return escribirMapa(CLAVE_GUIAS, mapa);
}

/** Qué guías ya se mandaron a imprimir. Reimprimir se permite; a ciegas, no. */
export const impresas = () => new Set(Object.keys(leerMapa(CLAVE_IMPRESAS)));

export function marcarImpresas(guias) {
  const mapa = leerMapa(CLAVE_IMPRESAS);
  for (const g of guias) mapa[g] = (mapa[g] || 0) + 1;
  escribirMapa(CLAVE_IMPRESAS, mapa);
}

export const vecesImpresa = (guia) => leerMapa(CLAVE_IMPRESAS)[guia] || 0;

/* =================================================================
 * Lo pendiente.
 *
 * Un solo lugar define qué cuenta como pendiente de cada tipo. La franja de
 * Pedidos usa estos predicados para CONTAR y la tabla los usa para FILTRAR:
 * si cada una tuviera el suyo, tarde o temprano la cifra diría cinco y al
 * hacer clic saldrían cuatro, y entonces no se puede confiar en ninguna.
 *
 * Los dos primeros son trabajo por hacer; los demás, problemas.
 * "Listos para despachar" excluye los que fallaron y los que esperan
 * corrección porque ésos no se arreglan generando: cada uno tiene su propio
 * camino. El nombre describe el predicado mejor de lo que lo hacía "pagados
 * sin guía": ya excluía lo que no está listo, y además un envío suelto no
 * tiene estado de pago y cae en esta misma cola.
 *
 * La CLAVE se queda como está: hay enlaces vivos con `?pendiente=pagados-sin-guia`.
 *
 * "Pedidos en revisión manual" se agrega abajo, junto a las reglas de
 * embalaje, porque su predicado depende de ellas y aquí todavía no existen.
 * ================================================================= */

const necesitaRecoleccion = (p) =>
  !!p.envio && !p.recoleccion && ["Creada", "Generada", "Recolección pendiente"].includes(p.envio.estado);

export const PENDIENTES = {
  "pagados-sin-guia": {
    grupo: "hacer", etiqueta: "Listos para despachar",
    /* Dos condiciones, no una: pago confirmado por el canal, o sin canal.
       Crear un envío suelto ES la decisión de despacharlo. */
    pasa: (p) => (p.pago === "Pagado" || esSuelto(p)) &&
                 !p.envio && !p.error && !p.requiereCorreccion,
  },
  "sin-recoleccion": {
    grupo: "hacer", etiqueta: "Guías sin recolección",
    pasa: necesitaRecoleccion,
  },
  "detenidos": {
    grupo: "problema", etiqueta: "Detenidos en paquetería",
    pasa: (p) => p.envio?.estado === "Detenido" || p.envio?.estado === "Con incidencia",
  },
  "error-guia": {
    grupo: "problema", etiqueta: "Guías que no se pudieron generar",
    pasa: (p) => !!p.error,
  },
  "por-corregir": {
    grupo: "problema", etiqueta: "Direcciones por corregir",
    pasa: (p) => !!p.requiereCorreccion,
  },
};

/** Las recolecciones de hoy, de la más próxima a la más tardía. */
export const recoleccionesHoy = recolecciones
  .filter((r) => r.fecha === HOY)
  .sort((a, b) => a.ventana.localeCompare(b.ventana));

/**
 * Antigüedad del detenido más viejo, en días desde el último evento que
 * reportó la paquetería. No desde que se creó la guía: un envío puede llevar
 * dos semanas en ruta y estar detenido desde ayer.
 */
export const detenidoMasAntiguo = (lista = pedidos) => {
  const fechas = lista
    .filter(PENDIENTES.detenidos.pasa)
    .map((p) => p.envio.detenidoDesde)
    .filter(Boolean);
  if (!fechas.length) return null;
  const vieja = fechas.sort()[0];
  return { fecha: vieja, dias: diasDesde(vieja) };
};

/* =================================================================
 * Conexiones.
 *
 * El detalle de qué está conectado vive en Configuración. Aquí solo interesa
 * lo que está roto, porque es lo único que exige una acción hoy.
 *
 * La caída se simula con `?conexion=<id>` y se guarda en la sesión: hace
 * falta para poder enseñar el bloque y verlo desaparecer al reconectar, que
 * es justo lo que hay que poder probar.
 * ================================================================= */

export const conexiones = [
  { id: "shopify", tipo: "Canal", nombre: "Shopify", detalle: tienda.dominio },
  { id: "dhl", tipo: "Paquetería", nombre: "DHL", detalle: "Cuenta 9540213" },
  { id: "estafeta", tipo: "Paquetería", nombre: "Estafeta", detalle: "Cuenta 0117702" },
  { id: "fedex", tipo: "Paquetería", nombre: "FedEx", detalle: "Cuenta 602113448" },
];

/**
 * Las conexiones con lo que hace falta para administrarlas: qué son, para qué
 * sirven y qué credenciales guardan.
 *
 * Van en dos listas, no en una, porque responden a dos preguntas distintas:
 * por dónde entran los pedidos y por dónde salen. Cada una tiene su pantalla.
 */
export const canalesVenta = [
  { id: "shopify", nombre: "Shopify", detalle: tienda.dominio,
    que: "Los pedidos entran por este canal.",
    desde: "Conectado el 14 de marzo de 2026",
    campos: [
      { et: "Tienda", valor: tienda.dominio },
      { et: "Token", valor: "•••• guardado" },
    ] },
];

/** Canales que se pueden añadir. Ninguno está conectado todavía. */
export const CANALES_DISPONIBLES = ["Mercado Libre", "Amazon", "WooCommerce", "TiendaNube"];

/**
 * Las cuentas por las que se compran las guías: las directas con cada
 * paquetería y las de las plataformas que las revenden. `tipo` distingue unas
 * de otras, porque sin esa marca Skydropx aparecía al lado de DHL como si
 * fueran lo mismo.
 *
 * Las tres cuentas de paquetería ya estaban en `conexiones` pero no aquí, y
 * esta lista es la que dibuja las tarjetas: DHL, Estafeta y FedEx se veían
 * conectadas en Inicio y no existían en Paqueterías. Lo que expone cada cuenta
 * vive dentro de su tarjeta, de modo que sin ellas no tenía dónde ir.
 */
export const cuentasEnvio = [
  { id: "dhl", tipo: "paqueteria", nombre: "DHL", detalle: "Cuenta 9540213",
    que: "Las guías de DHL se compran directamente con esta cuenta.",
    desde: "Conectada el 14 de marzo de 2026",
    campos: [
      { et: "Número de cuenta", valor: "9540213" },
      { et: "Llave de API", valor: "•••• guardada" },
    ] },
  { id: "estafeta", tipo: "paqueteria", nombre: "Estafeta", detalle: "Cuenta 0117702",
    que: "Las guías de Estafeta se compran directamente con esta cuenta.",
    desde: "Conectada el 14 de marzo de 2026",
    campos: [
      { et: "Número de cuenta", valor: "0117702" },
      { et: "Usuario", valor: "monarca_api" },
      { et: "Contraseña", valor: "•••• guardada" },
    ] },
  { id: "fedex", tipo: "paqueteria", nombre: "FedEx", detalle: "Cuenta 602113448",
    que: "Las guías de FedEx se compran directamente con esta cuenta.",
    desde: "Conectada el 28 de abril de 2026",
    campos: [
      { et: "Número de cuenta", valor: "602113448" },
      { et: "Llave de API", valor: "•••• guardada" },
    ] },
  { id: "t1", tipo: "plataforma", nombre: "T1 Envíos", detalle: "Cuenta 128616096",
    que: "Las guías de las paqueterías sin cuenta propia se compran a través de esta.",
    desde: "Conectada el 2 de abril de 2026",
    campos: [
      { et: "Cuenta", valor: "128616096" },
      { et: "Token", valor: "•••• se renueva automáticamente" },
    ] },
];

/* =================================================================
 * La matriz de capacidades.
 *
 * Qué expone cada paquetería. UNA FILA POR PAQUETERÍA QUE EL PRODUCTO PUEDE
 * OFRECER, no por cuenta conectada: el orden de preferencia y `cotizar()`
 * trabajan con UPS, Paquetexpress, 99minutos y AMPM, que no tienen cuenta, y
 * con la matriz atada a las cuentas esas cuatro caían en "sin registro" sin
 * ningún sitio donde resolverlo. Un "sin registro" que no se puede confirmar
 * es indistinguible de un "no", que es la distinción por la que esto existe.
 *
 * Cada celda tiene TRES valores —sí, no y sin registro— y DOS CAPAS:
 *
 *   producto  lo que la paquetería expone en general, confirmado con ella
 *   cuenta    lo que el contrato del comerciante trae, marcado por él
 *
 * Gana la de cuenta, porque dos cuentas de la misma paquetería no tienen
 * contratados los mismos servicios. Cuando las dos existen y difieren, la
 * pantalla lo dice: esconder una detrás de la otra deja sin explicar por qué
 * el botón no está donde el comerciante leyó que debía estar.
 *
 * "Sin registro" se redacta como hueco del REGISTRO y nunca en primera
 * persona: `sistema.html` prohíbe que la interfaz converse, y aquí no hace
 * falta ninguna excepción. La afirmación honesta no es sobre lo que sabemos,
 * es sobre lo que la matriz tiene guardado, y una celda vacía es un hecho
 * comprobable. Quien confirma aparece donde le toca, que es la acción.
 * ================================================================= */

/** Las paqueterías que el producto conoce: las del orden de preferencia y las
    que salen en `cotizar()`. La matriz tiene una fila por cada una, siempre. */
export const PAQUETERIAS_DEL_PRODUCTO = [
  "DHL", "Estafeta", "FedEx", "Paquetexpress", "Redpack",
  "UPS", "99minutos", "AMPM", "T1 Envíos",
];

/** Modalidades de guía de retorno. La diferencia la paga el comprador: una
    exige impresora en casa y la otra no. */
export const MODALIDADES_RETORNO = {
  pdf: { etiqueta: "Guía de retorno en PDF",
         nota: "Se manda al correo del comprador. Tiene que imprimirla." },
  codigo: { etiqueta: "Código en sucursal",
            nota: "El comprador recibe un código y en el mostrador le imprimen la guía." },
  recoleccion: { etiqueta: "Recolección en el domicilio del comprador",
                 nota: "Se programa una recolección en la dirección de entrega." },
};

/**
 * Las nueve filas, en el idioma de quien opera y nunca con la clave del objeto.
 *
 * `accion` es la frase con la que se nombra la ausencia, y es una sola para
 * toda la plataforma: un botón que existe en una pantalla y no en otra para la
 * misma paquetería sería un producto que se contradice a sí mismo.
 */
export const CAPACIDADES_FILAS = [
  { clave: "cancelaRecoleccion", tipo: "tres",
    etiqueta: "Cancelar una recolección ya solicitada",
    accion: "cancela recolecciones desde aquí", corta: "cancela recolecciones",
    extra: { clave: "corte", etiqueta: "Hora límite para cancelar", tipo: "time" } },
  { clave: "sumaPiezas", tipo: "tres",
    etiqueta: "Sumar piezas a una solicitud confirmada",
    accion: "acepta sumar piezas a una solicitud confirmada" },
  { clave: "diasAnticipacion", tipo: "numero",
    etiqueta: "Días de anticipación para programar", unidad: "días" },
  { clave: "cancelaGuia", tipo: "tres",
    etiqueta: "Cancelar una guía ya emitida",
    accion: "cancela guías desde aquí", corta: "cancela guías" },
  { clave: "guiaRetorno", tipo: "tres",
    etiqueta: "Emitir guía de retorno",
    accion: "emite guías de retorno",
    extra: { clave: "modalidad", etiqueta: "Modalidad", tipo: "modalidad" } },
  { clave: "caducidadRetorno", tipo: "numero",
    etiqueta: "Días que vive una guía de retorno sin usar", unidad: "días" },
  { clave: "intentosNumerados", tipo: "tres",
    etiqueta: "Reporta el intento de entrega numerado",
    accion: "reporta el intento de entrega numerado" },
  { clave: "costoSeguro", tipo: "tres",
    etiqueta: "Costo del seguro",
    accion: "asegura envíos desde aquí", corta: "asegura envíos",
    extra: { clave: "tarifa", etiqueta: "Porcentaje y mínimo", tipo: "tarifa" } },
  { clave: "divisorVolumetrico", tipo: "numero",
    etiqueta: "Divisor del peso volumétrico" },
];

export const VALORES_CAPACIDAD = { si: "Sí", no: "No", "sin-registro": "Sin registro" };

/* Ninguna paquetería emite guías de retorno el día del lanzamiento, y las
   celdas no dicen todas lo mismo a propósito: si todas dijeran "sí", la mitad
   de la interfaz de la capa intermedia no se podría ver.

   `producto` en null es un hueco declarado del registro, no una ausencia. */
export const CAPACIDADES = {
  "DHL": {
    cancelaRecoleccion: { producto: { valor: "si", corte: null, fecha: "2026-08-14" } },
    sumaPiezas: { producto: { valor: "no", fecha: "2026-08-14" } },
    diasAnticipacion: { producto: { valor: 5, fecha: "2026-08-14" } },
    /* Las dos capas difieren a propósito: DHL cancela guías en general y esta
       cuenta no. Es el caso que hace visible la línea de "gana la de cuenta". */
    cancelaGuia: { producto: { valor: "si", fecha: "2026-08-14" },
                   cuenta: { valor: "no", fecha: "2026-09-03" } },
    guiaRetorno: { producto: null },
    caducidadRetorno: { producto: null },
    intentosNumerados: { producto: null },
    costoSeguro: { producto: { valor: "si", pct: 1.5, minimo: 35, fecha: "2026-08-14" } },
    /* Sin capa: 5000 es lo que se ha visto funcionar, no algo confirmado con
       la paquetería, y presentarlo como dato suyo es inventar la cifra que más
       importa. `divisorDe()` cae a la constante y la cotización lo dice. */
    divisorVolumetrico: { producto: null },
  },
  "Estafeta": {
    cancelaRecoleccion: { producto: { valor: "no", corte: null, fecha: "2026-07-30" } },
    sumaPiezas: { producto: null },
    diasAnticipacion: { producto: { valor: 3, fecha: "2026-07-30" } },
    cancelaGuia: { producto: { valor: "no", fecha: "2026-07-30" } },
    guiaRetorno: { producto: null },
    caducidadRetorno: { producto: null },
    intentosNumerados: { producto: null },
    costoSeguro: { producto: { valor: "no", fecha: "2026-07-30" } },
    /* Sin capa: 5000 es lo que se ha visto funcionar, no algo confirmado con
       la paquetería, y presentarlo como dato suyo es inventar la cifra que más
       importa. `divisorDe()` cae a la constante y la cotización lo dice. */
    divisorVolumetrico: { producto: null },
  },
  "FedEx": {
    cancelaRecoleccion: { producto: { valor: "si", corte: "16:00", fecha: "2026-09-02" } },
    sumaPiezas: { producto: null },
    diasAnticipacion: { producto: { valor: 5, fecha: "2026-09-02" } },
    cancelaGuia: { producto: null },
    guiaRetorno: { producto: null },
    caducidadRetorno: { producto: null },
    intentosNumerados: { producto: null },
    costoSeguro: { producto: null },
    /* Sin capa: 5000 es lo que se ha visto funcionar, no algo confirmado con
       la paquetería, y presentarlo como dato suyo es inventar la cifra que más
       importa. `divisorDe()` cae a la constante y la cotización lo dice. */
    divisorVolumetrico: { producto: null },
  },
  /* Sin cuenta conectada y es el ejemplo textual de todo el documento: si su
     fila no existiera, "Confirmar con Paquetexpress" no tendría a dónde ir. */
  "Paquetexpress": {
    cancelaRecoleccion: { producto: null },
    sumaPiezas: { producto: null },
    diasAnticipacion: { producto: null },
    cancelaGuia: { producto: null },
    guiaRetorno: { producto: { valor: "no", modalidad: null, fecha: "2026-08-21" } },
    caducidadRetorno: { producto: null },
    intentosNumerados: { producto: null },
    costoSeguro: { producto: null },
    /* Sin capa: 5000 es lo que se ha visto funcionar, no algo confirmado con
       la paquetería, y presentarlo como dato suyo es inventar la cifra que más
       importa. `divisorDe()` cae a la constante y la cotización lo dice. */
    divisorVolumetrico: { producto: null },
  },
  "Redpack": {
    cancelaRecoleccion: { producto: null },
    /* La marcó el comerciante sobre su propio contrato y está mal: al intentar
       sumar piezas, Redpack lo rechaza. El fallo ofrece quitarle el registro
       ahí mismo, porque un dedazo suyo convertiría la matriz en una fuente de
       errores permanente. */
    sumaPiezas: { producto: null, cuenta: { valor: "si", fecha: "2026-09-03" } },
    diasAnticipacion: { producto: null, cuenta: { valor: 3, fecha: "2026-09-03" } },
    cancelaGuia: { producto: null },
    guiaRetorno: { producto: null },
    caducidadRetorno: { producto: null },
    intentosNumerados: { producto: null },
    costoSeguro: { producto: null },
    /* Sin capa: 5000 es lo que se ha visto funcionar, no algo confirmado con
       la paquetería, y presentarlo como dato suyo es inventar la cifra que más
       importa. `divisorDe()` cae a la constante y la cotización lo dice. */
    divisorVolumetrico: { producto: null },
  },
  "UPS": {
    cancelaRecoleccion: { producto: null },
    sumaPiezas: { producto: null },
    diasAnticipacion: { producto: null },
    cancelaGuia: { producto: null },
    guiaRetorno: { producto: null },
    caducidadRetorno: { producto: null },
    intentosNumerados: { producto: null },
    costoSeguro: { producto: null },
    /* Sin capa: 5000 es lo que se ha visto funcionar, no algo confirmado con
       la paquetería, y presentarlo como dato suyo es inventar la cifra que más
       importa. `divisorDe()` cae a la constante y la cotización lo dice. */
    divisorVolumetrico: { producto: null },
  },
  /* Sin cuenta y con un "no" confirmado: es el caso que demuestra que las dos
     preguntas son independientes, y que conectar no resuelve la segunda. */
  "99minutos": {
    cancelaRecoleccion: { producto: { valor: "no", corte: null, fecha: "2026-08-28" } },
    sumaPiezas: { producto: null },
    diasAnticipacion: { producto: null },
    cancelaGuia: { producto: null },
    guiaRetorno: { producto: null },
    caducidadRetorno: { producto: null },
    intentosNumerados: { producto: null },
    costoSeguro: { producto: null },
    /* Sin capa: 5000 es lo que se ha visto funcionar, no algo confirmado con
       la paquetería, y presentarlo como dato suyo es inventar la cifra que más
       importa. `divisorDe()` cae a la constante y la cotización lo dice. */
    divisorVolumetrico: { producto: null },
  },
  "AMPM": {
    cancelaRecoleccion: { producto: null },
    sumaPiezas: { producto: null },
    diasAnticipacion: { producto: null },
    cancelaGuia: { producto: null },
    guiaRetorno: { producto: null },
    caducidadRetorno: { producto: null },
    intentosNumerados: { producto: null },
    costoSeguro: { producto: null },
    /* Sin capa: 5000 es lo que se ha visto funcionar, no algo confirmado con
       la paquetería, y presentarlo como dato suyo es inventar la cifra que más
       importa. `divisorDe()` cae a la constante y la cotización lo dice. */
    divisorVolumetrico: { producto: null },
  },
  "T1 Envíos": {
    cancelaRecoleccion: { producto: null },
    sumaPiezas: { producto: null },
    diasAnticipacion: { producto: null },
    cancelaGuia: { producto: null },
    guiaRetorno: { producto: null },
    caducidadRetorno: { producto: null },
    intentosNumerados: { producto: null },
    costoSeguro: { producto: null },
    /* Sin capa: 5000 es lo que se ha visto funcionar, no algo confirmado con
       la paquetería, y presentarlo como dato suyo es inventar la cifra que más
       importa. `divisorDe()` cae a la constante y la cotización lo dice. */
    divisorVolumetrico: { producto: null },
  },
};

/* Lo que el comerciante marca en esta sesión. sessionStorage, igual que las
   guías: al cerrar la pestaña la demostración vuelve a empezar limpia. */
const CLAVE_CAPACIDADES = "tc:capacidades";

for (const [paqueteria, celdas] of Object.entries(leerMapa(CLAVE_CAPACIDADES))) {
  if (!CAPACIDADES[paqueteria]) continue;
  for (const [clave, celda] of Object.entries(celdas)) {
    CAPACIDADES[paqueteria][clave] = { ...CAPACIDADES[paqueteria][clave], ...celda };
  }
}

/**
 * Deja constancia de lo que el comerciante marcó sobre su propio contrato.
 *
 * Escribe SIEMPRE en la capa de cuenta: la de producto se confirma con la
 * paquetería y no es suya. `cambios` en null quita el registro de cuenta y
 * devuelve la celda a lo que diga el producto.
 */
export function marcarCapacidad(paqueteria, clave, cambios) {
  const celda = CAPACIDADES[paqueteria]?.[clave] ?? { producto: null };
  const nueva = { ...celda, cuenta: cambios === null ? null : { ...(celda.cuenta ?? {}), ...cambios } };
  if (CAPACIDADES[paqueteria]) CAPACIDADES[paqueteria][clave] = nueva;
  const mapa = leerMapa(CLAVE_CAPACIDADES);
  mapa[paqueteria] = { ...(mapa[paqueteria] || {}), [clave]: nueva };
  escribirMapa(CLAVE_CAPACIDADES, mapa);
  return nueva;
}

const filaCapacidad = (clave) => CAPACIDADES_FILAS.find((f) => f.clave === clave);

/**
 * Una capa existe cuando alguien la escribió, aunque lo que diga sea "sin
 * registro".
 *
 * Esto NO es un detalle: "en mi cuenta no me consta" es una afirmación del
 * comerciante sobre su contrato y tiene que poder ganarle a lo que la
 * paquetería expone en general. Tratando "sin-registro" como ausencia de capa,
 * elegirlo devolvía el control al valor de producto y la pantalla se quedaba
 * diciendo "Sí" después de anunciar que había guardado otra cosa.
 *
 * Para volver a lo que dice el producto está `marcarCapacidad(..., null)`, que
 * es otra acción y se llama por su nombre: quitar el registro.
 */
const capaValida = (capa) => !!capa && capa.valor !== undefined && capa.valor !== null;

/**
 * La celda resuelta: el valor que manda, de qué capa sale y qué dicen las dos.
 *
 * Una paquetería que no está en la matriz devuelve un hueco, nunca un "sí":
 * inventar lo que no se conoce es justo lo que esto existe para evitar.
 */
export const capacidadDe = (paqueteria, clave) => {
  const celda = CAPACIDADES[paqueteria]?.[clave] ?? {};
  const fila = filaCapacidad(clave);
  const producto = capaValida(celda.producto) ? celda.producto : null;
  const cuenta = capaValida(celda.cuenta) ? celda.cuenta : null;
  const manda = cuenta ?? producto;
  return {
    ...(manda ?? {}),
    valor: manda?.valor ?? (fila?.tipo === "numero" ? null : "sin-registro"),
    fuente: cuenta ? "cuenta" : producto ? "producto" : null,
    producto, cuenta,
    /* Solo difieren cuando las DOS existen y no coinciden: una capa de cuenta
       sobre un producto en blanco no contradice nada. */
    difieren: !!(producto && cuenta && producto.valor !== cuenta.valor),
  };
};

/** Si el comerciante escribió algo sobre su cuenta. Es lo que decide si se
    puede quitar ese registro y volver a lo que diga el producto. */
export const hayRegistroDeCuenta = (paqueteria, clave) =>
  !!capacidadDe(paqueteria, clave).cuenta;

/** La única pregunta que decide si una acción se dibuja. */
export const ofrece = (paqueteria, clave) => capacidadDe(paqueteria, clave).valor === "si";

/**
 * Sin registro: lo que manda no dice nada.
 *
 * Y "no dice nada" incluye una capa de cuenta que dice exactamente eso. Mirar
 * solo si hay capa daba por registrado un hueco que el comerciante acababa de
 * declarar.
 */
export const sinRegistro = (paqueteria, clave) => {
  const c = capacidadDe(paqueteria, clave);
  return !c.fuente || c.valor === "sin-registro" || c.valor == null;
};

/** Tres frases distintas porque significan tres cosas distintas. */
export const procedenciaDe = (paqueteria, clave) => {
  const c = capacidadDe(paqueteria, clave);
  /* Sin fecha no hay nada que fechar, y un "Confirmado el Invalid Date" es
     peor que no decir de dónde salió: afirma una confirmación que no consta. */
  if (!c.fecha) return "Sin registro.";
  if (c.fuente === "cuenta" && c.valor === "sin-registro") {
    return `Sin registro en tu cuenta. Lo marcaste tú el ${fechaEnTexto(c.fecha)}.`;
  }
  if (c.fuente === "producto") return `Confirmado con ${paqueteria} el ${fechaEnTexto(c.fecha)}.`;
  if (c.fuente === "cuenta") return `Lo marcaste tú el ${fechaEnTexto(c.fecha)}, sobre tu cuenta.`;
  return "Sin registro.";
};

/** Por qué el control no dice lo que la paquetería expone en general. */
export const porQueDifiere = (paqueteria, clave) => {
  const c = capacidadDe(paqueteria, clave);
  if (!c.difieren) return null;
  /* Sin el "desde aquí" de la frase de ausencia: ahí se habla de lo que la
     pantalla ofrece, y aquí de lo que la paquetería hace en general. */
  const fila = filaCapacidad(clave);
  const accion = fila?.corta ?? fila?.accion ?? "expone esta acción";
  const general = c.producto.valor === "si" ? `sí ${accion}` : `no ${accion}`;
  /* Tres finales, no dos: "en tu cuenta no consta" no es lo mismo que "en tu
     cuenta no", y es justo la distinción que la matriz existe para hacer. */
  const enTuCuenta = c.cuenta.valor === "sin-registro" ? "En tu cuenta no consta"
    : c.cuenta.valor === "si" ? "En tu cuenta sí" : "En tu cuenta no";
  return `${paqueteria} en general ${general}. ${enTuCuenta}, y eso es lo que manda.`;
};

/**
 * Cómo se nombra que la acción no esté. Las dos ausencias no se nombran igual:
 * "no lo hace" cierra el tema y "sin registro" es una llamada que el
 * comerciante puede hacer.
 */
export const nombrarAusencia = (paqueteria, clave) => {
  const accion = filaCapacidad(clave)?.accion ?? "expone esta acción";
  return capacidadDe(paqueteria, clave).valor === "no"
    ? `${paqueteria} no ${accion}`
    : `Sin registro de si ${paqueteria} ${accion}`;
};

/** Lo que se lee en la cabeza de la ficha, sin abrir nada. */
export const resumenCapacidades = (paqueteria) => {
  const total = CAPACIDADES_FILAS.length;
  const faltan = CAPACIDADES_FILAS.filter((f) => sinRegistro(paqueteria, f.clave)).length;
  if (!faltan) return `Las ${total} capacidades tienen registro.`;
  return `${faltan} de ${total} capacidades sin registro.`;
};

/** El divisor de esa paquetería, o el que se ha visto funcionar mientras no
    haya registro. Se pide por paquetería y no una fija: el día que una difiera,
    una cifra calculada con la de otra es una cifra de otra. */
export const divisorDe = (paqueteria) =>
  capacidadDe(paqueteria, "divisorVolumetrico").valor ?? FACTOR_VOLUMETRICO;

/**
 * Lo que cuesta asegurar, o por qué no se puede decir.
 *
 * Una casilla que cuesta dinero sin decir cuánto tiene el mismo defecto que una
 * guía sin precio, y callar la cifra no la hace menos cara.
 */
export function costoSeguroDe(paqueteria, valorDeclarado = 0) {
  const c = capacidadDe(paqueteria, "costoSeguro");
  if (c.valor !== "si") return { valor: c.valor, importe: null, pct: null, minimo: null };
  const pct = c.pct ?? 0;
  const minimo = c.minimo ?? 0;
  return {
    valor: "si", pct, minimo,
    importe: Math.max(minimo, Math.round(valorDeclarado * (pct / 100) * 100) / 100),
  };
}

/**
 * Las paqueterías que el producto ofrece sin cuenta conectada.
 *
 * Existen como lista propia porque la pantalla contesta DOS preguntas y se
 * tienen que leer como dos: si hay cuenta, y qué expone la paquetería. Son
 * independientes —hay paqueterías con cuenta que no exponen nada y sin cuenta
 * que exponen todo—, y juntarlas hace creer que conectar resuelve lo segundo.
 *
 * Llevan nombre y teléfono y nada más: sin cuenta no hay credenciales que
 * plegar, pero sí hay capacidades que registrar, y el teléfono es lo que cita
 * cada instrucción.
 */
export const paqueteriasSinCuenta = PAQUETERIAS_DEL_PRODUCTO
  .filter((n) => !cuentasEnvio.some((c) => c.nombre === n))
  .map((nombre) => ({
    id: nombre.toLowerCase().replace(/[^a-z0-9]/g, ""),
    nombre,
    telefono: telefonoDe(nombre),
  }));

/** Si esa paquetería tiene cuenta conectada. Sin cuenta se puede ordenar y
    cotizar, pero nunca puede salir elegida: no hay con qué comprar la guía. */
export const tieneCuenta = (paqueteria) =>
  cuentasEnvio.some((c) => c.nombre === paqueteria);

const CLAVE_CAIDA = "tc:conexion-caida";

/** Las conexiones con problema. Vacío cuando todo responde. */
export function conexionesCaidas() {
  let caida = null;
  try { caida = sessionStorage.getItem(CLAVE_CAIDA); } catch { /* modo privado */ }
  if (!caida) return [];
  const c = conexiones.find((x) => x.id === caida);
  return c ? [{ ...c, desde: "hace 3 h", motivo: "sin sincronizar" }] : [];
}

export function romperConexion(id) {
  try { sessionStorage.setItem(CLAVE_CAIDA, id); } catch { /* modo privado */ }
}

export function reconectar() {
  try { sessionStorage.removeItem(CLAVE_CAIDA); } catch { /* modo privado */ }
}

/**
 * Antigüedad del caso más viejo de cada pendiente, en días.
 *
 * La fecha de la que se mide NO es la misma para todos, y esa es la parte que
 * importa: un envío puede llevar dos semanas en ruta y estar detenido desde
 * ayer, así que para lo detenido se mide desde el último evento que reportó
 * la paquetería, no desde que se creó la guía ni desde que entró el pedido.
 *
 * Para lo que todavía no llegó a ninguna paquetería —pagados sin guía, por
 * corregir, fallidos— no existe evento del transportista: el último hecho real
 * es que el pedido entró, y desde ahí se cuenta.
 */
const FECHA_ANTIGUEDAD = {
  "detenidos": (p) => p.envio?.detenidoDesde,
  "sin-recoleccion": (p) => p.envio?.fecha || p.fecha,
};

export function antiguedadDe(clave) {
  /* Una clave que ya no está en PENDIENTES —porque su pendiente se mudó a su
     propia pantalla— no tiene antigüedad que medir. Devolver null es lo que
     esperan los que llaman; reventar aquí se llevaba por delante Inicio
     entero, que es la pantalla que más se abre. */
  const pendiente = PENDIENTES[clave];
  if (!pendiente) return null;
  const sacarFecha = FECHA_ANTIGUEDAD[clave] ?? ((p) => p.fecha);
  const fechas = pedidos.filter(pendiente.pasa).map(sacarFecha).filter(Boolean);
  if (!fechas.length) return null;
  const vieja = fechas.sort()[0];
  return { fecha: vieja, dias: diasDesde(vieja) };
}

/**
 * Cumplimiento por envío entregado.
 *
 * Es determinista a partir del número de guía: el prototipo se enseña y se
 * discute, y un porcentaje que cambia en cada recarga no se puede comentar.
 */
const llegoATiempo = (guia) =>
  [...String(guia)].reduce((n, ch) => (n * 31 + ch.codePointAt(0)) % 1000, 7) % 6 !== 0;

/**
 * Las cifras del periodo. Informativas: no llevan a ninguna acción, y por eso
 * van al final y en chico.
 *
 * "Costo total de guías" es lo que se le pagó a las paqueterías. Sustituye a
 * "Ingresos", que era una cifra de ventas y no decía nada de la operación.
 */
function cifrasEntre(desde, hasta) {
  const enRango = pedidos.filter((p) => p.fecha >= desde && p.fecha <= hasta);
  const conGuiaEnRango = enRango.filter((p) => p.envio);
  const entregados = conGuiaEnRango.filter((p) => p.envio.estado === "Entregado");
  const aTiempo = entregados.filter((p) => llegoATiempo(p.envio.guia)).length;
  return {
    pedidos: enRango.length,
    guias: conGuiaEnRango.length,
    aTiempoPct: entregados.length ? Math.round((aTiempo / entregados.length) * 100) : null,
    costo: conGuiaEnRango.reduce((s, p) => s + (p.envio.costo ?? 0), 0),
  };
}

export function resumenPeriodo(dias) {
  const desde = menosDias(HOY, dias);
  return cifrasEntre(desde, HOY);
}

/**
 * El mismo periodo, corrido hacia atrás: los siete días anteriores a los
 * siete que se están viendo.
 *
 * Devuelve null cuando en esa ventana no hubo nada. Comparar contra cero no
 * es una variación, es una división entre cero disfrazada de porcentaje, y
 * con datos de ejemplo de un mes la ventana anterior de "30 días" está vacía.
 * Cuando esto devuelve null, la interfaz no enseña ninguna flecha.
 */
export function comparativaPeriodo(dias) {
  const ancho = Math.max(1, dias);
  const finAnterior = menosDias(HOY, dias + 1);
  const iniAnterior = menosDias(HOY, dias + ancho);
  const anterior = cifrasEntre(iniAnterior, finAnterior);
  if (anterior.pedidos === 0) return null;

  const actual = resumenPeriodo(dias);
  const variacion = (a, b) => (b === null || a === null || b === 0 ? null : Math.round(((a - b) / b) * 100));
  return {
    pedidos: variacion(actual.pedidos, anterior.pedidos),
    guias: variacion(actual.guias, anterior.guias),
    aTiempoPct: actual.aTiempoPct === null || anterior.aTiempoPct === null
      ? null : actual.aTiempoPct - anterior.aTiempoPct,
    costo: variacion(actual.costo, anterior.costo),
    desde: iniAnterior, hasta: finAnterior,
  };
}

/** Las guías creadas hoy. Es lo que se imprime al final de la jornada. */
export const guiasDelDia = () => pedidos
  .filter((p) => p.envio && (p.envio.fecha || p.fecha) === HOY)
  .map((p) => p.envio.guia);


/** El envío es una vista del pedido, no otra lista. */
export const envios = pedidos
  .filter((p) => p.envio)
  .map((p) => ({
    guia: p.envio.guia,
    canal: p.canal,
    paqueteria: p.envio.paqueteria,
    pedido: p.folio,
    estado: p.envio.estado === "Creada" ? "En tránsito" : p.envio.estado,
    original: p.envio.original ?? (p.envio.paqueteria === "DHL" ? "Shipment picked up" : "In transit"),
    via: p.envio.via ?? null,
    destino: p.ciudad,
    cliente: p.cliente.nombre,
    fecha: p.fecha,
    peso: p.envio.peso,
    cotizado: p.envio.cotizado ?? p.envio.costo,
    facturado: p.envio.facturado ?? p.envio.costo,
    motivo: p.envio.motivo,
    detenidoDesde: p.envio.detenidoDesde,
    responsable: p.envio.responsable,
    diferencia: p.envio.diferencia,
  }));

/* ---------- Derivados ---------- */
export const sinGuia = pedidos.filter((p) => !p.envio);
export const conGuia = pedidos.filter((p) => p.envio);
export const conError = pedidos.filter((p) => p.error);
/* Los sueltos no suman: su total, cuando lo hay, lo tecleó una persona y no
   lo reportó ningún canal, y esa diferencia es la que sostiene la
   conciliación. */
export const ingresos = pedidos.reduce((s, p) => s + (esSuelto(p) ? 0 : p.total ?? 0), 0);

/** Cuántos envíos del periodo no cuentan como venta. Cero significa que las
    dos cifras siguen coincidiendo y no hay nada que explicar. */
export const sueltosEntre = (desde, hasta) =>
  pedidos.filter((p) => esSuelto(p) && p.fecha >= desde && p.fecha <= hasta);

export const detenidos = envios.filter((e) => e.estado === "Detenido" || e.estado === "Con incidencia");
export const porRecolectar = envios.filter((e) => e.estado === "Recolección pendiente" || e.estado === "Generada");
export const conDiferencia = envios.filter((e) => e.diferencia);

/* =================================================================
 * Detalle del pedido.
 *
 * Lo que trae Shopify más lo que agrega la plataforma: la corrección de
 * dirección. Esa corrección es el corazón de la pantalla, así que no se
 * guarda como "otra dirección" sino como una LISTA DE CAMBIOS: qué campo,
 * qué decía antes, qué dice ahora. Dos bloques de texto obligan a
 * compararlos con el dedo; una lista de cambios se lee de un vistazo.
 *
 * `aplicada` responde la pregunta más consecuente de la pantalla: con cuál
 * de las dos direcciones se generó la guía.
 * ================================================================= */

const DETALLES = {
  "#1007": {
    telefono: "+52 222 198 7512",
    subtotal: 10, impuestos: 1.38, impuestosIncluidos: true,
    formaPago: "Bank Deposit", pagoOriginal: "paid",
    pedidosPrevios: 0, gastadoPrevio: 0,
    articulos: [{ nombre: "Playera Negra", sku: null, cantidad: 1, precio: 10 }],
    direccion: {
      nombre: "Arturo García",
      lineas: ["Porto Alegre 9", "Int. Casa", "Geovillas del Sur", "Puebla, Puebla", "CP 72495", "México"],
      telefono: "222 198 7512",
      campos: { nombre: "Arturo", apellido: "García", correo: "drianrgez@gmail.com",
                lada: "+52", telefono: "2221987512", compania: "",
                calle: "Porto Alegre", numExt: "9", numInt: "Casa",
                cp: "72495", colonia: "Geovillas del Sur",
                estado: "Puebla", ciudad: "Puebla", referencia: "" },
    },
    correccion: {
      fuente: "SEPOMEX · automática",
      aplicada: true,
      cambios: [
        { campo: "Calle", antes: "Port Agrere 9", despues: "Porto Alegre 9" },
        { campo: "Colonia", antes: "Sin colonia", despues: "Geovillas del Sur" },
        { campo: "Interior", antes: "casa (dentro de la calle)", despues: "Int. Casa" },
        { campo: "Nombre", antes: "Arturo Garcia", despues: "Arturo García" },
        { campo: "Teléfono", antes: "+522221987512", despues: "222 198 7512" },
      ],
      original: {
        nombre: "Arturo Garcia",
        lineas: ["Port Agrere 9 Geovillas del sur, casa", "Puebla, Puebla", "CP 72495", "Mexico"],
        telefono: "+522221987512",
      },
    },
    facturacionIgual: true,
    costoGuia: 133.44,
  },

  // El pedido cuya guía falló. La corrección existe pero NADIE la ha
  // aceptado, y por eso sigue sin guía: la pantalla tiene que decirlo.
  "#1002": {
    telefono: "+52 81 8340 2211",
    subtotal: 15, impuestos: 2.07, impuestosIncluidos: true,
    formaPago: "Tarjeta de crédito", pagoOriginal: "paid",
    pedidosPrevios: 4, gastadoPrevio: 3820,
    articulos: [
      { nombre: "Cuaderno cosido A5", sku: "CUA-A5-NEG", cantidad: 2, precio: 6 },
      { nombre: "Pluma de gel 0.5", sku: "PLU-05", cantidad: 1, precio: 3 },
    ],
    direccion: {
      nombre: "Mariana Ordaz",
      lineas: ["Av. Juárez 1804", "Col. Centro", "Monterrey, Nuevo León", "CP 64000", "México"],
      telefono: "81 8340 2211",
      campos: { nombre: "Mariana", apellido: "Ordaz", correo: "mariana@tallerlumbre.mx",
                lada: "+52", telefono: "8183402211", compania: "Taller Lumbre",
                calle: "Av. Juárez", numExt: "1804", numInt: "",
                cp: "64000", colonia: "Centro",
                estado: "Nuevo León", ciudad: "Monterrey",
                referencia: "Portón gris, entre Hidalgo y Matamoros." },
    },
    correccion: {
      fuente: "SEPOMEX · automática",
      aplicada: false,
      motivo: "El código postal 64000 no corresponde a la colonia Centro.",
      cambios: [
        { campo: "Colonia", antes: "Col. Centro", despues: "Centro" },
        { campo: "Código postal", antes: "64000", despues: "64720" },
      ],
      original: {
        nombre: "Mariana Ordaz",
        lineas: ["Av. Juárez 1804, Col. Centro", "Monterrey, NL", "CP 64000", "México"],
        telefono: "+528183402211",
      },
    },
    facturacionIgual: true,
    costoGuia: null,
    pesoEstimado: 0.9,
  },
};

/** La dirección tal y como llegó, deducida de lo poco que trae el pedido. */
function direccionGenerica(p) {
  return {
    nombre: p.cliente.nombre,
    lineas: [p.destino || p.ciudad, p.destino ? p.ciudad : ""].filter(Boolean),
    telefono: null,
    campos: p.campos ?? (() => {
      const partes = p.cliente.nombre.split(" ");
      const calle = (p.destino || "").replace(/\s+(\d+)$/, "");
      const numExt = ((p.destino || "").match(/(\d+)\s*$/) || [])[1] || "";
      return {
        nombre: partes[0] || "", apellido: partes.slice(1).join(" "),
        correo: p.cliente.correo, lada: "+52", telefono: "", compania: "",
        calle, numExt, numInt: "",
        cp: (p.ciudad.match(/\b(\d{5})\b/) || [])[1] || "",
        colonia: "",
        estado: (p.ciudad.split(",")[1] || "").trim().replace(/\s*\d{5}$/, ""),
        ciudad: p.ciudad.split(",")[0] || "",
        referencia: "",
      };
    })(),
  };
}

/** Relleno para los pedidos sin detalle propio: completo, pero sin inventar. */
function detalleGenerico(p) {
  /* Se arma una vez y se usa dos: la dirección actual y, cuando hay una
     corrección sin aplicar, la "original" que el panel enseña al lado de los
     cambios propuestos. Son la misma mientras nadie aplique nada. */
  const direccion = direccionGenerica(p);
  return {
    telefono: null,
    subtotal: p.total,
    impuestos: p.total == null ? null : +(p.total * 0.16 / 1.16).toFixed(2),
    impuestosIncluidos: true,
    /* Sin canal no hay quién reporte la forma de pago ni el estado original:
       rellenarlos con "Pendiente" sería inventar un dato que nadie mandó. */
    formaPago: p.pago === "Pagado" ? "Tarjeta de crédito"
      : p.pago == null ? "Sin canal que lo reporte" : "Pendiente",
    pagoOriginal: p.pago === "Pagado" ? "paid" : p.pago == null ? null : "pending",
    pedidosPrevios: 0, gastadoPrevio: 0,
    /* La línea sintética es el relleno de los pedidos viejos del ejemplo, no
       un valor por omisión deseable: sobre ella no se puede evaluar ninguna
       condición por producto. Cuando el pedido trae sus líneas, mandan ellas. */
    /* En un suelto sin artículos la lista se queda vacía y se dice: la línea
       sintética es relleno de los pedidos viejos del ejemplo, y aquí el hueco
       es una decisión de quien capturó, no un dato que falte. */
    articulos: p.articulos ?? (esSuelto(p)
      ? []
      : [{ nombre: "Artículo del pedido", sku: null, cantidad: 1, precio: p.total ?? 0 }]),
    direccion,
    /* Si el pedido dice que su dirección no está lista, el panel tiene que
       enseñar qué se propone cambiar. Sin esto, la lista mandaba a un panel
       donde no había nada que corregir y la guía se generaba igual. */
    correccion: p.requiereCorreccion ? {
      fuente: "SEPOMEX · automática",
      aplicada: false,
      motivo: p.requiereCorreccion,
      original: direccion,
      cambios: p.correccionPropuesta ?? [],
    } : null,
    facturacionIgual: true,
    costoGuia: p.envio?.costo ?? null,
    pesoEstimado: 1.5,
  };
}

/** Las piezas del pedido: unidades, no líneas. Tres del mismo artículo ocupan
    el mismo espacio que tres artículos distintos. */
export const piezasDe = (articulos = []) => articulos.reduce((n, a) => n + a.cantidad, 0);

/**
 * El nombre del producto tal como vino en la última línea de pedido que lo
 * trajo. No hay catálogo, así que es lo único que hay para que un SKU
 * tecleado se pueda leer como un producto y no como una clave.
 */
export const nombreDeSKU = (sku) => {
  if (!sku) return null;
  const vistos = pedidos
    .filter((p) => p.articulos?.some((a) => a.sku === sku))
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
  const linea = vistos[0]?.articulos.find((a) => a.sku === sku);
  return linea ? { nombre: linea.nombre, pedidos: vistos.length } : null;
};

/**
 * Los productos que han aparecido en las líneas de los pedidos.
 *
 * Es el único sitio donde los productos existen —no hay catálogo— y por eso el
 * buscador no finge que lo hay. NO se limita a la ventana: una lista de la que
 * hay que elegir tiene que ser lo más completa posible, y un producto de
 * temporada que desapareció el mes pasado sigue siendo un producto. `dias`
 * solo decide el dato de uso reciente, que es lo que deja juzgar si sigue vivo.
 *
 * Ordenado por uso descendente: lo que más se vende es lo que más se busca.
 */
export function productosVistos(dias = 30) {
  const desde = menosDias(HOY, dias);
  const porSKU = new Map();
  for (const p of pedidos) {
    for (const a of p.articulos ?? []) {
      if (!a.sku) continue;
      const x = porSKU.get(a.sku) ?? { sku: a.sku, nombre: a.nombre, pedidos: 0,
                                       recientes: 0, ultimaFecha: null };
      x.pedidos += 1;
      if (p.fecha >= desde) x.recientes += 1;
      /* El nombre y la fecha son los de la línea más reciente que lo trajo: un
         producto se renombra y lo que vale es como se llama hoy. */
      if (!x.ultimaFecha || p.fecha > x.ultimaFecha) {
        x.ultimaFecha = p.fecha;
        x.nombre = a.nombre;
      }
      porSKU.set(a.sku, x);
    }
  }
  return [...porSKU.values()].sort((a, b) =>
    b.pedidos - a.pedidos || a.nombre.localeCompare(b.nombre, "es"));
}

/** Busca por nombre y por SKU a la vez, y sin acentos en los dos lados: quien
    tiene la caja delante teclea el SKU y quien no, teclea el nombre. */
export function buscarProductos(texto, limite = 8) {
  const q = String(texto ?? "").trim().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (!q) return [];
  const limpio = (s) => String(s ?? "").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return productosVistos()
    .filter((x) => limpio(x.nombre).includes(q) || limpio(x.sku).includes(q))
    .slice(0, limite);
}

/**
 * Si lo tecleado tiene forma de SKU: sin espacios y con al menos un guion o un
 * número. Con "copas" y ningún resultado, ofrecer "Usar «copas» como SKU"
 * convertiría una búsqueda fallida en una regla que no gana nunca.
 */
export const pareceSKU = (texto) => {
  const s = String(texto ?? "").trim();
  return s.length >= 3 && !/\s/.test(s) && /[-_\d]/.test(s);
};

/* ---------- La otra fuente del mismo buscador ----------
   Los destinatarios salen de lo que ya se escribió en envíos anteriores. No es
   una libreta de contactos y no se construye una: la libreta habría que
   mantenerla, y esto se mantiene solo. */

const sinAcentos = (s) => String(s ?? "").toLowerCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const camposDe = (p) => p.campos ?? direccionGenerica(p).campos;

export function destinatariosVistos() {
  const por = new Map();
  for (const p of pedidos) {
    const c = camposDe(p);
    const nombre = [c.nombre, c.apellido].filter(Boolean).join(" ").trim() || p.cliente.nombre;
    /* Nombre + código postal es la llave: dos Arturo García en dos ciudades
       son dos destinatarios, y el mismo en la misma casa es uno. */
    const llave = `${sinAcentos(nombre)}|${c.cp ?? ""}`;
    const x = por.get(llave) ?? {
      nombre, lugar: [c.ciudad, c.estado].filter(Boolean).join(", ") || p.ciudad,
      campos: c, envios: 0, ultimaFecha: null,
    };
    x.envios += 1;
    if (!x.ultimaFecha || p.fecha > x.ultimaFecha) {
      x.ultimaFecha = p.fecha;
      x.campos = c;
    }
    por.set(llave, x);
  }
  return [...por.values()].sort((a, b) =>
    (b.ultimaFecha ?? "").localeCompare(a.ultimaFecha ?? ""));
}

/** Se busca por nombre y por ciudad a la vez, y sin acentos en los dos lados. */
export function buscarDestinatarios(texto, limite = 8) {
  const q = sinAcentos(texto).trim();
  if (!q) return [];
  return destinatariosVistos()
    .filter((x) => sinAcentos(x.nombre).includes(q) || sinAcentos(x.lugar).includes(q))
    .slice(0, limite);
}

/**
 * Un pedido reciente del mismo destinatario y el mismo código postal.
 *
 * No bloquea nada: es la única defensa contra capturar a mano algo que ya
 * entró por un canal, y una defensa humana con recordatorio automático sigue
 * siendo humana, pero falla menos.
 */
export function pedidoParecido({ nombre, cp, dias = 7 } = {}) {
  if (!nombre || !cp) return null;
  const desde = menosDias(HOY, dias);
  const n = sinAcentos(nombre);
  return pedidos.find((p) => !esSuelto(p) && p.fecha >= desde &&
    sinAcentos(p.cliente.nombre) === n && camposDe(p).cp === cp) ?? null;
}

/** Los SKU que de verdad aparecieron en los pedidos del periodo. Es contra
    esto —y no contra un catálogo que no existe— que se revisa un SKU tecleado. */
export const skusVistos = (dias = 30) => {
  const desde = menosDias(HOY, dias);
  const set = new Set();
  for (const p of pedidos) {
    if (p.fecha < desde) continue;
    for (const a of p.articulos ?? []) if (a.sku) set.add(a.sku);
  }
  return [...set].sort();
};

/** El detalle completo de un pedido, listo para pintar. */
export const detalleDe = (folio) => {
  const p = pedidos.find((x) => x.folio === folio);
  if (!p) return null;
  return { ...p, ...(DETALLES[folio] ?? detalleGenerico(p)) };
};

/**
 * Todo lo que necesita una etiqueta, resuelto desde el número de guía.
 *
 * La etiqueta se arma con la dirección CORREGIDA, que es la que se le dio a
 * la paquetería. Imprimir la original produciría un paquete que no llega, y
 * es exactamente el error que la plataforma existe para evitar.
 */
export function datosEtiqueta(guia) {
  const pedido = pedidos.find((x) => x.envio?.guia === guia);
  if (!pedido) return null;
  const d = detalleDe(pedido.folio);
  const c = d.direccion.campos;
  const linea = [c.calle, c.numExt].filter(Boolean).join(" ") + (c.numInt ? ` Int. ${c.numInt}` : "");
  /* Lo que falta para que el paquete llegue. En México la colonia no es
     opcional: dos calles con el mismo nombre en colonias distintas son
     habituales, y sin código postal el paquete no entra a ninguna ruta. */
  const falta = [];
  if (!c.colonia) falta.push("colonia");
  if (!c.cp) falta.push("código postal");
  if (!c.telefono && !d.direccion.telefono) falta.push("teléfono");

  return {
    guia,
    folio: pedido.folio,
    falta,
    corregida: d.correccion?.aplicada === true,
    paqueteria: pedido.envio.paqueteria,
    servicio: pedido.envio.servicio || "Terrestre",
    fecha: pedido.envio.fecha || HOY,
    peso: pedido.envio.peso ?? d.pesoEstimado ?? 1,
    piezas: d.articulos?.reduce((n, a) => n + a.cantidad, 0) || 1,
    destinatario: {
      nombre: [c.nombre, c.apellido].filter(Boolean).join(" ") || d.direccion.nombre,
      compania: c.compania || "",
      calle: linea,
      colonia: c.colonia,
      ciudad: c.ciudad,
      estado: c.estado,
      cp: c.cp,
      telefono: d.direccion.telefono || (c.telefono ? telefonoMX(c.telefono) : ""),
      referencia: c.referencia || "",
    },
  };
}


/**
 * Colonias por código postal. En México el CP determina colonia, ciudad y
 * estado, así que el formulario pregunta primero el CP y ofrece las colonias
 * que le corresponden, en vez de dejar escribir cualquier cosa. Es la misma
 * fuente que usa la corrección automática.
 */
export const coloniasPorCP = {
  "72495": { ciudad: "Puebla", estado: "Puebla",
    colonias: ["Geovillas del Sur", "San Ramón 4a Sección", "Villa Frontera"] },
  "64720": { ciudad: "Monterrey", estado: "Nuevo León",
    colonias: ["Centro", "Obispado", "Mitras Centro"] },
  "64000": { ciudad: "Monterrey", estado: "Nuevo León",
    colonias: ["Centro"] },
  "06700": { ciudad: "Ciudad de México", estado: "Ciudad de México",
    colonias: ["Roma Norte", "Roma Sur", "Condesa"] },
};

/**
 * Teléfono mexicano de diez dígitos, formateado para leerse.
 * Monterrey, Guadalajara y la Ciudad de México usan lada de dos dígitos
 * (81, 33, 55); el resto del país, de tres.
 */
export const telefonoMX = (v) => {
  const d = String(v ?? "").replace(/\D/g, "").slice(-10);
  if (d.length !== 10) return v ?? "";
  return ["55", "81", "33"].includes(d.slice(0, 2))
    ? `${d.slice(0, 2)} ${d.slice(2, 6)} ${d.slice(6)}`
    : `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
};

/** Compatibilidad: la etiqueta ya pedía `origen`. Va aquí y no junto a los
    demás porque necesita `telefonoMX`, que se define arriba. */
export const origen = origenDeEtiqueta();

/** Ladas que se ofrecen en el campo de teléfono. */
export const ladas = [
  { pais: "México", codigo: "+52", bandera: "🇲🇽" },
  { pais: "Estados Unidos", codigo: "+1", bandera: "🇺🇸" },
  { pais: "Colombia", codigo: "+57", bandera: "🇨🇴" },
  { pais: "España", codigo: "+34", bandera: "🇪🇸" },
];

/* -----------------------------------------------------------------
 * Cotización con las cuentas del cliente.
 *
 * Generar una guía no es un botón: es elegir paquetería y servicio. Y la
 * comparación no es solo de precio — la más barata no sirve si esa
 * paquetería cumple mal en esa zona. Por eso cada opción trae el
 * cumplimiento real del propio cliente, que ya está en `desempeno`.
 *
 * Determinista a propósito: los mismos datos dan el mismo precio en cada
 * carga, porque un prototipo cuyas cifras bailan no se puede discutir.
 * --------------------------------------------------------------- */
const TARIFAS = {
  "Estafeta":      { base: 46, servicio: "Terrestre",     dias: "2 a 3 días", plazo: 3 },
  "99minutos":     { base: 44, servicio: "Nacional",      dias: "2 a 4 días", plazo: 4 },
  "Redpack":       { base: 52, servicio: "Express",       dias: "2 a 4 días", plazo: 4 },
  "AMPM":          { base: 55, servicio: "Estándar",      dias: "3 a 5 días", plazo: 5 },
  "T1 Envíos":     { base: 58, servicio: "Estándar",      dias: "3 a 5 días", plazo: 5 },
  "Paquetexpress": { base: 64, servicio: "Terrestre",     dias: "2 a 4 días", plazo: 4 },
  "DHL":           { base: 72, servicio: "Express",       dias: "1 a 2 días", plazo: 2 },
  "FedEx":         { base: 88, servicio: "Prioritario",   dias: "1 día",      plazo: 1 },
  "UPS":           { base: 95, servicio: "Express Saver", dias: "1 a 2 días", plazo: 2 },
};

export const PAQUETERIAS = Object.keys(TARIFAS);

/** El precio de UNA paquetería. `cotizar` recorta a las cuatro más baratas,
 *  así que buscar ahí dentro devolvía el precio de otra. */
export const precioDe = (paqueteria, peso) => {
  const t = TARIFAS[paqueteria];
  return t ? Math.round((t.base + peso * 31) * 100) / 100 : null;
};

/**
 * La tarifa de UNA paquetería, con su servicio y su plazo.
 *
 * `cotizar` recorta a las cuatro más baratas, y la que propone el orden de
 * preferencia puede no estar entre ellas: sin esto, la lista de tarifas
 * escondía justo la opción que el sistema propone, y entonces el radio que
 * llega marcado no existía en la lista.
 */
export const tarifaDe = (paqueteria, peso) => {
  const t = TARIFAS[paqueteria];
  if (!t) return null;
  return {
    paqueteria, servicio: t.servicio, dias: t.dias,
    precio: precioDe(paqueteria, peso),
    aTiempo: desempeno.find((d) => d.paqueteria === paqueteria)?.aTiempo ?? null,
  };
};

export const cotizar = (peso) =>
  Object.entries(TARIFAS)
    .map(([paqueteria, t]) => ({
      paqueteria,
      servicio: t.servicio,
      dias: t.dias,
      precio: Math.round((t.base + peso * 31) * 100) / 100,
      aTiempo: desempeno.find((d) => d.paqueteria === paqueteria)?.aTiempo ?? null,
    }))
    .sort((a, b) => a.precio - b.precio)
    .slice(0, 4);

/* =================================================================
 * REQ-02 (mínimo) · Reglas de envío
 *
 * El lote no puede preguntar paquetería pedido por pedido, así que hace
 * falta una regla por defecto. Se evalúan EN ORDEN y gana la primera que
 * cumple todas sus condiciones. Si ninguna gana, el pedido se omite con
 * "Sin regla de paquetería" en vez de elegir algo a ciegas.
 *
 * La pantalla para administrarlas es REQ-02; aquí vive el modelo.
 * ================================================================= */
export const reglasEnvio = [
  { id: "r1", nombre: "Puebla ligero", prioridad: 1, activa: true,
    condiciones: { estado: ["PUE", "Puebla"], pesoMax: 5 },
    paqueteria: "Estafeta", servicio: "Terrestre" },
  { id: "r2", nombre: "Norte urgente", prioridad: 2, activa: true,
    condiciones: { estado: ["NL", "Nuevo León", "COAH"], },
    paqueteria: "FedEx", servicio: "Prioritario" },
  { id: "r3", nombre: "Pedidos grandes", prioridad: 3, activa: true,
    condiciones: { totalMin: 1500 },
    paqueteria: "DHL", servicio: "Express" },
  { id: "rd", nombre: "Por defecto", prioridad: 99, activa: true,
    condiciones: {}, paqueteria: "Estafeta", servicio: "Terrestre" },
];

const estadoDe = (ciudad) => (ciudad.split(",")[1] || "").trim().replace(/\s*\d{5}$/, "");

/** La primera regla que cumple. `null` si ninguna, incluida la de por defecto. */
export const reglaPara = (pedido, peso) => {
  for (const r of reglasEnvio.filter((x) => x.activa).sort((a, b) => a.prioridad - b.prioridad)) {
    const c = r.condiciones;
    if (c.estado && !c.estado.includes(estadoDe(pedido.ciudad))) continue;
    if (c.pesoMax != null && peso > c.pesoMax) continue;
    if (c.totalMin != null && pedido.total < c.totalMin) continue;
    return r;
  }
  return null;
};

/* =================================================================
 * REQ-01 · Simulación del lote
 *
 * Los desenlaces son FIJOS por folio, no aleatorios: un prototipo donde
 * el mismo pedido falla unas veces y otras no es imposible de discutir
 * en una reunión.
 * ================================================================= */
const DESENLACES = {
  // Un tiempo de espera agotado es pasajero: al segundo intento pasa. Así el
  // reintento demuestra que sirve, en vez de repetir el mismo fallo.
  "#1000": (intento) => intento >= 2 ? null : {
    estado: "fallido", motivo: "Sin respuesta de la paquetería",
    detalle: "La petición excedió el tiempo de espera.", reintentable: true },

  // La falta de cobertura no se arregla reintentando: hay que cambiar de
  // paquetería. Reintentarlo mil veces da el mismo resultado, y decirlo es
  // más útil que dejar que alguien lo descubra.
  "#0997": () => ({
    estado: "fallido", motivo: "Sin cobertura para el código postal",
    detalle: "Estafeta no entrega en 29320. Reintentar no cambia nada: hay que cotizar con otra.",
    reintentable: false }),
};

/**
 * Lo que cambió en el canal mientras el panel estaba abierto.
 *
 * Fijo por folio, como los desenlaces del lote: un prototipo donde el cambio
 * aparece unas veces sí y otras no no se puede discutir en una reunión. Es lo
 * que comprueba la emisión antes de mandar una etiqueta a una dirección que
 * el comprador ya corrigió.
 */
export const CAMBIOS_EN_CANAL = {
  "#1017": [
    { campo: "Dirección", antes: "Juárez", despues: "Condesa" },
    { campo: "Artículos", antes: "3 piezas", despues: "4 piezas" },
  ],
};

/**
 * La guía que una regla generó mientras el panel estaba abierto.
 *
 * Es el caso que de verdad cuesta dinero —dos guías son dos paquetes y dos
 * cobros—, y sin un pedido así en los datos la comprobación al confirmar no se
 * puede enseñar funcionando.
 */
export const GENERADA_MIENTRAS_TANTO = {
  "#1013": { guia: "TC71013", paqueteria: "Estafeta", servicio: "Terrestre",
             costo: 143.00, hora: "11:04", regla: "Generar la guía al marcarse el pago" },
};

/** Motivo por el que un pedido NO entra al lote, o null si sí entra. */
export const motivoOmision = (p) => {
  if (p.envio) return "Ya tiene guía";
  if (p.pago !== "Pagado") return "No está pagado";
  // REQ-03: la validación local va antes de gastar una llamada al carrier.
  if (p.error || p.requiereCorreccion) return "Requiere corrección de dirección";
  /* Sin caja no hay medidas que declarar, y el lote no es sitio para elegirla:
     un lote donde se puede cambiar la caja de cada pedido es la pantalla de
     detalle otra vez, dibujada peor y sin sitio para el porqué. */
  const caja = embalajeDe(p.folio);
  if (caja?.revision) {
    return caja.revision.clave === "veto"
      ? "Ninguna caja quedó disponible"
      : "El pedido no cabe en su caja";
  }
  return null;
};

/** Qué pasa al generar la guía de un pedido. Determinista. */
export const simularGeneracion = (p, peso, intento = 1) => {
  const fijo = DESENLACES[p.folio]?.(intento);
  if (fijo) return fijo;

  const regla = reglaPara(p, peso);
  if (!regla) return { estado: "omitido", motivo: "Sin regla de paquetería" };

  return {
    estado: "generado",
    paqueteria: regla.paqueteria,
    servicio: regla.servicio,
    costo: precioDe(regla.paqueteria, peso),
    regla: regla.nombre,
    guia: "TC" + String(70000 + Number(p.folio.replace(/\D/g, ""))),
  };
};

/* =================================================================
 * Reglas de embalaje.
 *
 * Cuando la guía se genera sola, alguien tiene que decir en qué caja va. Una
 * sola plantilla para todo cuesta dinero en las dos direcciones: con la caja
 * chica para todo, los pedidos grandes salen con medidas falsas y la
 * paquetería cobra la diferencia al facturar; con la mediana para todo, cada
 * pedido de un artículo paga volumen que no ocupa.
 *
 * La gramática es una condición y un embalaje. Las condiciones dentro de una
 * regla se unen con Y, nunca con O: para una alternativa se escribe otra
 * regla, porque nadie que empaca cajas debe tener que pensar en paréntesis.
 * Las reglas están ordenadas y gana la primera que se cumple —sin puntajes y
 * sin especificidad calculada—, porque una regla que no se puede explicar a
 * las siete de la mañana no se puede corregir.
 * ================================================================= */

/** Dónde entrega. `local` es el mismo estado del que sale el paquete: el
    esfuerzo de embalaje de una entrega en la ciudad no es el de un foráneo. */
export const DESTINOS = { local: "Local", foraneo: "Foráneo", extendida: "Zona extendida" };

/* La sigla con la que el canal escribe el estado en el destino. Está escrita y
   no deducida porque "Ciudad de México" no empieza por CDMX y cualquier regla
   de tres letras la daba por foránea desde su propia bodega. */
const SIGLA_ESTADO = {
  "Puebla": "PUE", "Ciudad de México": "CDMX", "Jalisco": "JAL", "Nuevo León": "NL",
  "Guanajuato": "GTO", "Querétaro": "QRO", "Yucatán": "YUC", "Veracruz": "VER",
  "Quintana Roo": "QROO", "Coahuila": "COAH", "Baja California": "BC", "México": "MEX",
};

/* Los códigos postales en los que ya nos cobraron zona extendida. No es la
   lista de la paquetería —esa no la tenemos— sino la nuestra, y por eso es
   corta: se alimenta de las facturas, no de un catálogo. */
const ZONAS_EXTENDIDAS = ["29320", "77500", "25230"];

export function destinoDe(pedido) {
  const cp = (String(pedido.ciudad || "").match(/\b(\d{5})\b/) || [])[1] || pedido.campos?.cp || "";
  if (ZONAS_EXTENDIDAS.includes(cp)) return "extendida";
  const sigla = (String(pedido.ciudad || "").split(",")[1] || "").trim().replace(/\s*\d{5}$/, "");
  const casa = origenes.find((o) => o.id === pedido.origen) ?? origenPredeterminado();
  return casa && sigla && sigla === SIGLA_ESTADO[casa.campos.estado] ? "local" : "foraneo";
}

/**
 * Las condiciones que se pueden escribir, y de qué depende cada una.
 *
 * Las de cantidad, costo, canal y destino se evalúan con lo que el pedido ya
 * trae. La de producto necesita que la línea traiga SKU, que es cosa del
 * canal y no de un catálogo nuestro. La de peso necesita un catálogo con peso
 * por SKU, que es el único dato que no existe en ninguna parte del sistema:
 * va visible y apagada, porque lo que falta también se ve.
 */
export const CONDICIONES_EMBALAJE = [
  { clave: "cantidad", etiqueta: "Cantidad de productos",
    ayuda: "Cuenta piezas, no líneas del pedido." },
  { clave: "costo", etiqueta: "Costo del pedido", ayuda: "" },
  { clave: "contiene", etiqueta: "Contiene un producto",
    ayuda: "El SKU tal como lo manda tu canal en la línea del pedido. Sirve para decir " +
           "«el producto grande solo» o «el producto grande acompañado»." },
  { clave: "canal", etiqueta: "Canal de venta",
    ayuda: "Mercado Libre y Amazon tienen requisitos de empaque propios." },
  { clave: "destino", etiqueta: "Destino", ayuda: "" },
  { clave: "peso", etiqueta: "Peso del pedido", fuera: true,
    ayuda: "Hace falta un catálogo con el peso por SKU. Tus canales reportan el SKU, " +
           "pero no el peso. No entra en esta versión." },
];

/**
 * El orden es la regla. La última es la de por defecto: su condición está
 * vacía, siempre se cumple, y no se puede borrar ni mover, de modo que ningún
 * pedido se queda sin caja por falta de cobertura.
 *
 * Que la de por defecto apunte al Sobre y no a una caja es deliberado: es lo
 * que hace posible que un veto deje a un pedido sin ninguna caja, que es el
 * caso que decide el diseño entero de la revisión manual.
 */
export const reglasEmbalaje = [
  /* Las de producto arriba y las genéricas abajo, y no al revés: gana la
     primera que se cumple, así que una condición específica colocada debajo de
     una general no puede ganar jamás. Con «Pedidos de una pieza» encima,
     «Ventilador solo» nunca sale y el ventilador viaja en sobre; y con «Pedido
     caro» encima de «Cristalería acompañada», las copas acaban en la caja que
     el motivo de esa misma regla dice que las rompió tres veces. */
  { id: "r-ventilador-solo", nombre: "Ventilador solo", plantilla: "caja-mediana",
    condiciones: { contiene: { sku: "MON-VEN-16", de: 0, a: 0 } },
    porque: "El ventilador solo cabe de canto en la mediana y no necesita más hueco." },

  { id: "r-ventilador-acompanado", nombre: "Ventilador acompañado", plantilla: "caja-grande",
    condiciones: { contiene: { sku: "MON-VEN-16", de: 1, a: 5 } },
    porque: "Con el ventilador dentro, lo que lo acompañe necesita la caja grande." },

  { id: "r-cristaleria", nombre: "Cristalería acompañada", plantilla: "caja-mediana",
    condiciones: { contiene: { sku: "MON-CRI-6", de: 1, a: 5 } },
    porque: "Las copas necesitan relleno alrededor. En una caja chica se rompieron tres veces." },

  { id: "r-una-pieza", nombre: "Pedidos de una pieza", plantilla: "sobre",
    condiciones: { cantidad: { de: 1, a: 1 } },
    porque: "Una pieza cabe en sobre y no paga volumen." },

  { id: "r-caro", nombre: "Pedido caro", plantilla: "caja-chica",
    condiciones: { costo: { de: 2000, a: null } },
    porque: "Arriba de dos mil pesos va en caja con relleno aunque quepa en un sobre." },

  /* Nunca gana: «Pedidos de una pieza» ya cubre sus condiciones y está más
     arriba. Se queda en el ejemplo porque una regla que no gana nunca es un
     defecto real que el comerciante merece ver, y no se puede enseñar sin una. */
  { id: "r-una-pieza-local", nombre: "Una pieza a entrega local", plantilla: "caja-chica",
    condiciones: { cantidad: { de: 1, a: 1 }, destino: ["local"] },
    porque: "En entrega local la caja vuelve y no importa que abulte." },

  /* Desactivada: no participa en el orden, y el estado se ve en la fila. Su
     SKU tampoco aparece en ningún pedido reciente, de modo que enseña las dos
     cosas a la vez. La regla no se desactiva sola por eso: el SKU puede volver. */
  { id: "r-ventilador-repuesto", nombre: "Ventilador de repuesto", plantilla: "caja-grande",
    activa: false,
    condiciones: { contiene: { sku: "MON-VEN-61", de: 0, a: 5 } },
    porque: "Misma caja que el ventilador nuevo." },

  { id: "defecto", nombre: "Por defecto", plantilla: "sobre", defecto: true,
    condiciones: {},
    porque: "Cualquier pedido que no haya ganado arriba." },
];

/**
 * Los vetos. No asignan caja: descartan candidatas, y por eso son una lista
 * aparte y no una fila más del orden. Una fila con número de puesto que no
 * asigna nada hace que el número mienta.
 *
 * Una fila es un par de producto y caja prohibida, de modo que un mismo SKU
 * puede tener más de una, y borrar una plantilla puede contarlas.
 */
export const vetosEmbalaje = [
  { id: "v-copas-sobre", sku: "MON-CRI-6", plantilla: "sobre",
    porque: "Seis copas no van en un sobre." },
  { id: "v-tv-sobre", sku: "MON-TV-55", plantilla: "sobre",
    porque: "La pantalla no entra." },
  { id: "v-tv-chica", sku: "MON-TV-55", plantilla: "caja-chica",
    porque: "La pantalla no entra." },
];

/**
 * Lo que cada regla ha cobrado, sobre lo que ya ocurrió. Es histórico y no se
 * calcula en pantalla: un probador que corre sobre datos de ejemplo enseña un
 * resultado que nadie puede comprobar.
 *
 * Las cifras van a la ESCALA del prototipo. Un pie que dice 214 guías en una
 * pantalla de 40 pedidos se contradice a la vista, y el aviso general de datos
 * de ejemplo no salva dos números que se pelean dentro de la misma tarjeta.
 * Suman 39, y la de por defecto sale al 18 %.
 *
 * `alternativa` solo existe donde de verdad hay una caja más chica en la que
 * esas guías habrían cabido. Sin ella no se sugiere nada: una sugerencia vale
 * lo que ahorra.
 */
export const efectoEmbalaje = {
  "r-ventilador-solo": { guias: 2, porVolumen: 0, diferencia: 0, alternativa: null },
  "r-ventilador-acompanado": { guias: 1, porVolumen: 1, diferencia: 96, alternativa: null },
  "r-cristaleria": { guias: 9, porVolumen: 4, diferencia: 612,
                     alternativa: { plantilla: "caja-chica", ahorro: 188 } },
  "r-una-pieza": { guias: 14, porVolumen: 0, diferencia: 0, alternativa: null },
  "r-caro": { guias: 6, porVolumen: 3, diferencia: 410,
              alternativa: { plantilla: "sobre", ahorro: 150 } },
  "r-una-pieza-local": { guias: 0, porVolumen: 0, diferencia: 0, alternativa: null },
  "r-ventilador-repuesto": { guias: 0, porVolumen: 0, diferencia: 0, alternativa: null },
  "defecto": { guias: 7, porVolumen: 2, diferencia: 208, alternativa: null },
};

export const guiasConReglas = () =>
  Object.values(efectoEmbalaje).reduce((n, e) => n + e.guias, 0);

/** Qué tan mal cubierta está la operación. Si más de la mitad de los pedidos
    cae al final de la lista, las reglas de arriba no sirven. */
export function cobroDefecto() {
  const total = guiasConReglas();
  const guias = efectoEmbalaje.defecto.guias;
  const pct = total ? Math.round((guias / total) * 100) : 0;
  return { guias, total, pct, tono: pct >= 50 ? "mal" : pct >= 30 ? "aviso" : "neutra" };
}

/** Cuánto tiene que pesar un pedido, respecto de su caja, para no generarse
    solo. Un pedido que no cabe en su caja se paga dos veces. */
export const embalaje = { factorRevision: 3 };

/* =================================================================
 * Lo que el comerciante cambia en la zona de embalaje.
 *
 * La demostración entera de esta función es cambiar una regla y ver cambiar la
 * caja de un pedido, y eso exige cruzar de Configuración a Pedidos. Sin
 * guardar, al llegar a Pedidos la regla ya había vuelto a ser la de antes y no
 * había nada que enseñar.
 *
 * sessionStorage y no localStorage, igual que las guías y que la matriz: al
 * cerrar la pestaña el prototipo vuelve a su estado inicial y la siguiente
 * demostración empieza limpia.
 * ================================================================= */
const CLAVE_EMBALAJE = "tc:embalaje";

const embalajeGuardado = leerMapa(CLAVE_EMBALAJE);
if (Array.isArray(embalajeGuardado.reglas) && embalajeGuardado.reglas.length) {
  reglasEmbalaje.splice(0, reglasEmbalaje.length, ...embalajeGuardado.reglas);
}
if (Array.isArray(embalajeGuardado.vetos)) {
  vetosEmbalaje.splice(0, vetosEmbalaje.length, ...embalajeGuardado.vetos);
}
if (embalajeGuardado.factorRevision) embalaje.factorRevision = embalajeGuardado.factorRevision;

/** Deja constancia del orden, las reglas, los vetos y el tope. Devuelve si de
    verdad guardó, para que el aviso no afirme lo que no pasó. */
export function guardarEmbalaje() {
  return escribirMapa(CLAVE_EMBALAJE, {
    reglas: reglasEmbalaje,
    vetos: vetosEmbalaje,
    factorRevision: embalaje.factorRevision,
  });
}

/** Cuántas piezas del pedido NO son ese SKU. Es la segunda mitad de "el
    producto grande solo" o "el producto grande acompañado". */
const otrasPiezas = (articulos, sku) =>
  piezasDe(articulos.filter((a) => a.sku !== sku));

/**
 * Lo que una regla mira de un pedido.
 *
 * Los pedidos viejos del ejemplo no traen líneas, y su línea sintética no
 * lleva SKU: sobre ellos las condiciones por producto no se pueden evaluar, y
 * eso es un hecho del pedido, no un caso especial que valga la pena esconder.
 */
const contextoDe = (p) => {
  const articulos = p.articulos ?? (esSuelto(p)
    /* Un suelto sin artículos no tiene una pieza: no tiene ninguna capturada,
       y contarle una haría ganar a la regla "de 1 a 2 piezas" sin que nadie
       haya dicho cuántas van. */
    ? []
    : [{ nombre: "Artículo del pedido", sku: null, cantidad: 1, precio: p.total ?? 0 }]);
  return {
    articulos,
    piezas: piezasDe(articulos),
    total: p.total,
    canal: p.canal,
    destino: destinoDe(p),
    /* Sin SKU en la línea no se puede decir si el pedido contiene el producto,
       y tampoco si le toca un veto. Lo que no se puede evaluar no se cumple. */
    sinSKU: articulos.some((a) => !a.sku),
  };
};

/**
 * Si el pedido cumple una regla.
 *
 * Una condición que no se puede evaluar NUNCA se da por cumplida, y se dice:
 * un silencio aquí es una regla que no gana y nadie sabe por qué.
 */
function cumpleRegla(regla, ctx) {
  const c = regla.condiciones ?? {};
  let sinEvaluar = null;

  if (c.cantidad) {
    if (ctx.piezas < c.cantidad.de) return { ok: false, sinEvaluar };
    if (c.cantidad.a != null && ctx.piezas > c.cantidad.a) return { ok: false, sinEvaluar };
  }
  if (c.costo) {
    /* Sin total capturado no hay costo, y lo que no se puede evaluar no se
       cumple: sin esto, un suelto sin importe entraría en "de $0 a $500". */
    if (ctx.total == null) return { ok: false, sinEvaluar: "costo" };
    if (ctx.total < c.costo.de) return { ok: false, sinEvaluar };
    if (c.costo.a != null && ctx.total > c.costo.a) return { ok: false, sinEvaluar };
  }
  if (c.canal && !c.canal.includes(ctx.canal)) return { ok: false, sinEvaluar };
  if (c.destino && !c.destino.includes(ctx.destino)) return { ok: false, sinEvaluar };

  if (c.contiene) {
    if (ctx.sinSKU) return { ok: false, sinEvaluar: "contiene" };
    if (!ctx.articulos.some((a) => a.sku === c.contiene.sku)) return { ok: false, sinEvaluar };
    const otras = otrasPiezas(ctx.articulos, c.contiene.sku);
    if (otras < c.contiene.de) return { ok: false, sinEvaluar };
    if (c.contiene.a != null && otras > c.contiene.a) return { ok: false, sinEvaluar };
  }
  return { ok: true, sinEvaluar };
}

/**
 * Con qué caja sale un pedido, y si no sale, por qué.
 *
 * Tres desenlaces y ninguno más: la caja que eligió una regla, las medidas que
 * mandó el canal —que ganan siempre, porque un dato medido vale más que uno
 * inferido— y la revisión manual, que tiene exactamente dos motivos.
 */
export function embalajeDe(folio) {
  const p = pedidos.find((x) => x.folio === folio);
  if (!p) return null;
  const articulos = p.articulos ?? [];

  if (p.pesoCanal != null && p.medidasCanal) {
    return {
      fuente: "canal", plantilla: null, regla: null, vetos: [], sinEvaluar: null, revision: null,
      peso: p.pesoCanal, pesoFuente: "canal", medidas: p.medidasCanal,
    };
  }

  const ctx = contextoDe(p);

  const vetos = ctx.sinSKU ? []
    : vetosEmbalaje.filter((v) => articulos.some((a) => a.sku === v.sku));
  const vetadas = new Set(vetos.map((v) => v.plantilla));

  let elegida = null, regla = null, bloqueada = null, sinEvaluar = null;
  const bloqueadas = [];
  for (const r of reglasEmbalaje) {
    /* Desactivada no es lo mismo que borrada: se queda en la lista, con su
       puesto y su motivo, y no participa en el orden. */
    if (r.activa === false) continue;
    const res = cumpleRegla(r, ctx);
    if (res.sinEvaluar) sinEvaluar = res.sinEvaluar;
    if (!res.ok) continue;
    if (vetadas.has(r.plantilla)) { bloqueada = r; bloqueadas.push(r); continue; }
    elegida = plantillas.find((x) => x.id === r.plantilla) ?? null;
    regla = r;
    break;
  }

  const base = { fuente: elegida ? "regla" : "sin-caja", plantilla: elegida, regla, vetos, sinEvaluar };

  if (!elegida) {
    /* Se nombran TODAS las cajas que el veto quitó, no solo la última: con una
       sola, el operador abre el panel esperando una caja bloqueada y se
       encuentra dos, y el motivo que leyó en la fila deja de explicar lo que
       ve. El nombre del producto sale de la línea del pedido, que es lo único
       que hay: no existe catálogo. */
    const cajas = [...new Set(bloqueadas.map((r) => r.plantilla))]
      .map((id) => plantillas.find((x) => x.id === id)?.nombre)
      .filter(Boolean);
    const veto = vetos.find((v) => v.plantilla === bloqueada?.plantilla);
    const producto = nombreDeSKU(veto?.sku);
    const quien = bloqueada?.defecto ? "la regla por defecto" : `«${bloqueada?.nombre}»`;
    return {
      ...base, peso: null, pesoFuente: null, medidas: null,
      revision: {
        clave: "veto",
        texto: cajas.length > 1
          ? `${producto?.nombre ?? veto?.sku} no puede ir en ${enumerarEs(cajas)}, ` +
            `y la última que quedaba era la caja de ${quien}.`
          : `${producto?.nombre ?? veto?.sku} no puede ir en ${cajas[0]}, y ${cajas[0]} ` +
            `es la caja de ${quien}.`,
        veto, cajas,
      },
    };
  }

  const peso = p.pesoCanal ?? elegida.peso;
  const tope = elegida.peso * embalaje.factorRevision;
  const desbordado = p.pesoCanal != null && p.pesoCanal > tope;

  return {
    ...base,
    peso, pesoFuente: p.pesoCanal != null ? "canal" : "plantilla",
    medidas: { largo: elegida.largo, ancho: elegida.ancho, alto: elegida.alto },
    revision: desbordado ? {
      clave: "peso",
      texto: `El pedido pesa ${peso} kg y ${elegida.nombre} pesa ${elegida.peso}. ` +
             `Supera el tope de ${embalaje.factorRevision} veces.`,
    } : null,
  };
}

/**
 * Dos hechos sobre lo que YA ocurrió, para el que está escribiendo una regla:
 * cuántos pedidos la cumplen y a cuántos de ésos los toma antes otra que está
 * más arriba. No es un simulador: un probador que corre sobre datos de ejemplo
 * enseña un resultado que nadie puede comprobar.
 */
export function hechosDeRegla(condiciones, { excluir = null, dias = 30 } = {}) {
  const desde = menosDias(HOY, dias);
  const recientes = pedidos.filter((p) => p.fecha >= desde);
  const borrador = { condiciones };
  const antes = [];

  /* Solo cuentan las reglas que están ARRIBA: una que está debajo no le quita
     nada, y contarla convertiría el hecho en un reproche falso. Una regla que
     todavía no existe se escribe al final, así que todas están arriba. */
  const limite = excluir
    ? reglasEmbalaje.findIndex((r) => r.id === excluir)
    : reglasEmbalaje.length;

  const cumplen = recientes.filter((p) => cumpleRegla(borrador, contextoDe(p)).ok);
  for (const p of cumplen) {
    const ctx = contextoDe(p);
    for (let i = 0; i < limite; i++) {
      const r = reglasEmbalaje[i];
      if (r.defecto || r.activa === false || !cumpleRegla(r, ctx).ok) continue;
      const ya = antes.find((x) => x.regla === r);
      if (ya) ya.n += 1; else antes.push({ regla: r, puesto: i + 1, n: 1 });
      break;
    }
  }
  return { total: recientes.length, cumplen: cumplen.length, antes };
}

/**
 * Los folios que cumplen unas condiciones, y opcionalmente solo los que otra
 * regla se lleva antes.
 *
 * Es lo que convierte las dos cifras del panel en enlaces. `sistema.html`
 * prohíbe el simulador porque enseña un resultado que nadie puede comprobar;
 * un número que se abre y deja la tabla de Pedidos con esos doce delante no
 * enseña un resultado, enseña el conjunto, y se puede contar a mano.
 */
export function foliosQueCumplen(condiciones, { dias = 30, tomadosPor = null } = {}) {
  const desde = menosDias(HOY, dias);
  const borrador = { condiciones };
  return pedidos
    .filter((p) => p.fecha >= desde)
    .filter((p) => {
      const ctx = contextoDe(p);
      if (!cumpleRegla(borrador, ctx).ok) return false;
      if (!tomadosPor) return true;
      for (const r of reglasEmbalaje) {
        if (r.defecto || r.activa === false) continue;
        if (!cumpleRegla(r, ctx).ok) continue;
        return r.id === tomadosPor;
      }
      return false;
    })
    .map((p) => p.folio);
}

/** Un pedido al que el sistema no le pudo elegir caja. Sigue siendo suyo el
    trabajo de elegirla, así que vive en Pedidos y no en una cola nueva. */
export const enRevisionManual = (p) =>
  !p.envio && p.pago === "Pagado" && !!embalajeDe(p.folio)?.revision;

PENDIENTES["revision-manual"] = {
  grupo: "problema", etiqueta: "Pedidos en revisión manual",
  pasa: enRevisionManual,
};

/* Se cuenta desde que la regla falló, no desde que entró el pedido: con lo
   segundo, un pedido de hace tres días aparecería como urgente en su primer
   minuto en la cola. Es el mismo criterio que ya rige para los detenidos. */
FECHA_ANTIGUEDAD["revision-manual"] = (p) => p.revisionDesde || p.fecha;

/**
 * Por qué el operador se salió de la propuesta. Lista corta y fija, porque un
 * campo libre no se agrupa y la frecuencia de las excepciones es exactamente
 * la señal de que hay que reordenar la lista de preferencia.
 */
export const motivosCambioPaqueteria = (propuesta) => [
  { id: "cliente", etiqueta: "El cliente la pidió" },
  { id: "urgencia", etiqueta: "Urgencia" },
  { id: "cobertura", etiqueta: `${propuesta ?? "La propuesta"} no tiene cobertura` },
  { id: "precio", etiqueta: "Precio" },
];

/* =================================================================
 * Recolecciones automáticas.
 *
 * La unidad de configuración es la pareja ORIGEN × PAQUETERÍA, y nada más,
 * porque es la misma unidad en la que la paquetería recibe la solicitud: no
 * existe una que junte un paquete de DHL con uno de FedEx. Cualquier otra
 * agrupación obligaría a explicar después por qué salieron cuatro solicitudes
 * cuando se configuró una.
 *
 * `via` es un CAMPO de la regla y no una tercera dimensión. Con tres orígenes,
 * cuatro paqueterías y dos plataformas, una dimensión más daría sesenta filas
 * que nadie lee. La restricción que eso impone se asume con los ojos abiertos
 * —una misma pareja no puede pedir directo y por plataforma a la vez— y se
 * NOMBRA donde duele: las guías que quedan fuera se enseñan con su motivo y su
 * acción manual, nunca se barren a la solicitud equivocada.
 * ================================================================= */

/**
 * Los tres modos. Dos no entran en esta primera versión y aun así se dibujan,
 * con su razón: esconderlos haría creer que el producto no los contempla.
 */
export const MODOS_RECOLECCION = {
  agenda: {
    etiqueta: "Agenda",
    consecuencia: "Se solicita en días fijos de la semana, aunque haya pocas piezas.",
  },
  acumulacion: {
    etiqueta: "Acumulación",
    consecuencia: "Se solicita al juntar un número de guías sin recolección.",
    fuera: "No entra en esta versión.",
  },
  "ruta-fija": {
    etiqueta: "Ruta fija",
    consecuencia: "La paquetería pasa por contrato. No sale ninguna solicitud; la cita " +
                  "se registra para poder medir el cumplimiento.",
    fuera: "No entra en esta versión.",
  },
};

/* Empieza en lunes: una semana de trabajo no empieza en domingo. */
export const DIAS_SEMANA = [
  { id: 1, corto: "L", nombre: "lunes" },
  { id: 2, corto: "M", nombre: "martes" },
  { id: 3, corto: "X", nombre: "miércoles" },
  { id: 4, corto: "J", nombre: "jueves" },
  { id: 5, corto: "V", nombre: "viernes" },
  { id: 6, corto: "S", nombre: "sábado" },
  { id: 0, corto: "D", nombre: "domingo" },
];

/** Lo máximo que se ha visto funcionar. No es un dato del transportista, y
    mientras `diasAnticipacion` esté sin registro la ayuda lo dice así. */
export const ANTICIPACION_VISTA = 5;

export const reglasRecoleccion = [
  { id: "rr-puebla-dhl", origen: "puebla", paqueteria: "DHL", modo: "agenda", activa: true,
    dias: [1, 2, 3, 4, 5], ventana: { abre: "10:00", cierra: "14:00" },
    corte: "08:00", minimo: 0, anticipacion: 1, via: null },

  { id: "rr-puebla-estafeta", origen: "puebla", paqueteria: "Estafeta", modo: "agenda", activa: true,
    dias: [1, 3, 5], ventana: { abre: "13:00", cierra: "18:00" },
    corte: "11:00", minimo: 5, anticipacion: 1, via: null },

  /* La que enseña el campo `via` funcionando: pide a Skydropx, y por eso el
     selector aparece en esta pareja y no en las demás. */
  { id: "rr-puebla-redpack", origen: "puebla", paqueteria: "Redpack", modo: "agenda", activa: true,
    dias: [2, 4], ventana: { abre: "11:00", cierra: "17:00" },
    corte: "09:00", minimo: 0, anticipacion: 1, via: "Skydropx" },
];

const CLAVE_RECOLECCION = "tc:recoleccion";

const recoleccionGuardada = leerMapa(CLAVE_RECOLECCION);
if (Array.isArray(recoleccionGuardada.reglas)) {
  reglasRecoleccion.splice(0, reglasRecoleccion.length, ...recoleccionGuardada.reglas);
}

/** Devuelve si de verdad guardó, para que el aviso no afirme lo que no pasó. */
export const guardarReglasRecoleccion = () =>
  escribirMapa(CLAVE_RECOLECCION, { reglas: reglasRecoleccion });

/** El origen del que sale un pedido. Sin uno propio, el predeterminado: es el
    que se imprime como remitente cuando nada dice lo contrario. */
export const origenDe = (p) => p.origen ?? origenPredeterminado()?.id ?? null;

/**
 * Las guías que esperan camión, filtrables por pareja y por plataforma.
 *
 * Sale del MISMO predicado que cuenta la franja de Pedidos y que se manda a la
 * paquetería. Con dos predicados, un día la pantalla dice nueve y el camión
 * llega por siete.
 */
export function guiasSinRecoleccion({ origen = null, paqueteria = null, via } = {}) {
  return pedidos.filter((p) => {
    if (!PENDIENTES["sin-recoleccion"].pasa(p)) return false;
    if (origen && origenDe(p) !== origen) return false;
    if (paqueteria && p.envio.paqueteria !== paqueteria) return false;
    if (via !== undefined && (p.envio.via ?? null) !== via) return false;
    return true;
  });
}

/**
 * Las parejas que han tenido envíos, con su regla si la tienen.
 *
 * Solo las que han tenido: con tres orígenes y cuatro paqueterías son hasta
 * doce filas, y una lista de doce siempre llenas donde ocho nunca se usan es
 * una lista que nadie lee.
 */
export function parejasRecoleccion({ dias = 30 } = {}) {
  const llave = (o, p) => `${o}|${p}`;
  const vistas = new Map();

  const ver = (origen, paqueteria) => {
    if (!origen || !paqueteria) return;
    if (!vistas.has(llave(origen, paqueteria))) vistas.set(llave(origen, paqueteria), { origen, paqueteria });
  };

  for (const p of pedidos) if (p.envio) ver(origenDe(p), p.envio.paqueteria);
  for (const r of recolecciones) ver(r.origen, r.paqueteria);
  for (const r of reglasRecoleccion) ver(r.origen, r.paqueteria);

  const desde = menosDias(HOY, dias);

  return [...vistas.values()].map(({ origen, paqueteria }) => {
    const regla = reglasRecoleccion.find((r) => r.origen === origen && r.paqueteria === paqueteria) ?? null;
    const citas = recoleccionesPasadas().filter((r) =>
      r.origen === origen && r.paqueteria === paqueteria &&
      r.fecha >= desde && r.resultado !== "sin-piezas");
    const fallidas = citas.filter((r) => r.recogidas === 0);

    const esperando = guiasSinRecoleccion({ origen, paqueteria });
    /* Las que la regla NO va a tomar por tener otra plataforma. Es la
       consecuencia aceptada de que `via` sea un campo, y se nombra. */
    const fuera = regla
      ? esperando.filter((p) => (p.envio.via ?? null) !== (regla.via ?? null))
      : [];

    return {
      origen, paqueteria, regla,
      citas: citas.length,
      sinCumplir: fallidas.length,
      /* Tres seguidas son el material del reclamo, y por eso se muestran con
         sus fechas en la propia fila. La regla no se desactiva sola: apagarla
         dejaría al comerciante sin recolección y sin aviso. */
      rachaFallida: fallidas.slice().sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3),
      esperando: esperando.length,
      fuera,
    };
  /* El origen predeterminado primero, y dentro de cada origen por nombre: es el
     que tiene la actividad, y ordenar por el id interno lo mandaba abajo. */
  }).sort((a, b) =>
    (a.origen === origenPredeterminado()?.id ? 0 : 1) - (b.origen === origenPredeterminado()?.id ? 0 : 1) ||
    (origenes.find((o) => o.id === a.origen)?.nombre ?? a.origen)
      .localeCompare(origenes.find((o) => o.id === b.origen)?.nombre ?? b.origen, "es") ||
    a.paqueteria.localeCompare(b.paqueteria, "es"));
}

/** Las plataformas por las que esa pareja ha comprado guías. El campo "Se pide
    a" solo aparece cuando hay alguna: quien no las tiene no lo ve nunca. */
export const viasDeLaPareja = (origen, paqueteria) => [...new Set(
  pedidos
    .filter((p) => p.envio && origenDe(p) === origen && p.envio.paqueteria === paqueteria)
    .map((p) => p.envio.via)
    .filter(Boolean))].sort();

/** "Lunes a viernes, 10:00 a 14:00". Los días corridos se dicen como rango:
    enumerar cinco nombres para decir "entre semana" se lee peor. */
export function describirRegla(regla) {
  if (!regla) return null;
  const ids = DIAS_SEMANA.map((d) => d.id).filter((id) => regla.dias.includes(id));
  const nombres = ids.map((id) => DIAS_SEMANA.find((d) => d.id === id).nombre);
  const posiciones = ids.map((id) => DIAS_SEMANA.findIndex((d) => d.id === id));
  const corridos = posiciones.every((n, i) => i === 0 || n === posiciones[i - 1] + 1);
  const cuando = !nombres.length ? "Ningún día"
    : nombres.length === 1 ? nombres[0]
    : corridos ? `${nombres[0]} a ${nombres[nombres.length - 1]}`
    : enumerarEs(nombres);
  return `${cuando[0].toUpperCase()}${cuando.slice(1)}, ${regla.ventana.abre} a ${regla.ventana.cierra}`;
}

/**
 * Qué está mal en una regla, en el idioma de quien la escribe.
 *
 * La ventana no puede salirse del horario del origen: una recolección
 * programada cuando la bodega está cerrada es una recolección fallida
 * programada.
 */
export function validarReglaRecoleccion(regla, origen) {
  const errores = {};
  const h = origen?.horario;
  if (!regla.dias?.length) errores.dias = "Elige al menos un día.";
  if (regla.ventana.abre >= regla.ventana.cierra) {
    errores.ventana = "La ventana termina antes de empezar.";
  } else if (h && (regla.ventana.abre < h.abre || regla.ventana.cierra > h.cierra)) {
    errores.ventana = `La ventana tiene que caber en el horario del origen: ${h.abre} a ${h.cierra}.`;
  }
  if (regla.corte >= regla.ventana.abre) {
    errores.corte = "El corte tiene que ser anterior al inicio de la ventana.";
  }
  return errores;
}

/** El corte que se propone: dos horas antes de la ventana. Es una propuesta
    nuestra y la ayuda lo dice; la hora de corte real la sabe la paquetería. */
export function cortePropuesto(abre) {
  const [h, m] = String(abre).split(":").map(Number);
  return `${String(Math.max(0, h - 2)).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/* Las cancelaciones que se pidieron por teléfono, donde la paquetería no las
   expone. No es lo mismo que cancelada: la recolección se sigue contando hasta
   que el rastreo diga otra cosa, y decir otra cosa sería la interfaz mintiendo. */
const CLAVE_CANCELACIONES = "tc:cancelaciones";

export const cancelacionesSolicitadas = () => Object.keys(leerMapa(CLAVE_CANCELACIONES));

/**
 * Qué se puede hacer con una recolección ya solicitada. Sale de la matriz, no
 * de la pantalla: un diálogo que dice "Sí, cancelar" y termina con un estado
 * que la paquetería no conoce es la interfaz mintiendo.
 */
export function comoCancelar(r) {
  if (cancelacionesSolicitadas().includes(r.folio)) return { clave: "pedida" };
  const c = capacidadDe(r.paqueteria, "cancelaRecoleccion");
  if (c.valor !== "si") return { clave: "instruccion" };
  if (!c.corte) return { clave: "boton" };
  /* El corte es una hora del día: solo ha pasado en las de hoy. */
  const pasado = r.fecha < HOY || (r.fecha === HOY && AHORA >= c.corte);
  return pasado
    ? { clave: "instruccion", corte: c.corte, vencido: true }
    : { clave: "boton", corte: c.corte };
}

export function marcarCancelacionSolicitada(folio) {
  const mapa = leerMapa(CLAVE_CANCELACIONES);
  mapa[folio] = HOY;
  return escribirMapa(CLAVE_CANCELACIONES, mapa);
}

/* =================================================================
 * Devoluciones.
 *
 * Una devolución es un REGISTRO QUE CUELGA DE UN PEDIDO, con su propio envío
 * de regreso. No es un pedido nuevo: el folio del pedido es la única llave que
 * el comerciante, el comprador y la paquetería comparten. Es el mismo cambio
 * que `datos.js` ya había anticipado —"un pedido partido en dos guías, una
 * devolución sin pedido nuevo"— y se respeta.
 *
 * Los cinco mecanismos se separan porque responden distinto a dos preguntas
 * —QUIÉN EMITE la guía y QUIÉN LA PAGA—, y esas dos respuestas son las que
 * deciden si un costo entra o no en la conciliación. Meter una guía que
 * nosotros nunca emitimos ni pagamos en el mismo cajón que las que sí, mete en
 * la conciliación un costo que no existe.
 * ================================================================= */

/** Lista fija, y fija para poder contarlos: un campo libre no se agrupa. */
export const MOTIVOS_DEVOLUCION = [
  "Producto equivocado", "Producto dañado", "No era lo esperado",
  "Entrega fallida", "Arrepentimiento", "Garantía",
];

/**
 * Los cinco mecanismos. `emite` y `paga` no son adorno: son las dos preguntas
 * que los distinguen, y las que deciden qué entra en la conciliación.
 */
export const MECANISMOS_DEVOLUCION = {
  prepagada: { etiqueta: "Guía prepagada", emite: "nosotros", paga: "comerciante" },
  recoleccion: { etiqueta: "Recolección en domicilio", emite: "nosotros", paga: "comerciante" },
  comprador: { etiqueta: "Guía del comprador", emite: "comprador", paga: "comprador" },
  rto: { etiqueta: "Retorno al remitente", emite: "paqueteria", paga: "comerciante" },
  canal: { etiqueta: "Del canal", emite: "canal", paga: "canal" },
};

export const RESOLUCIONES_DEVOLUCION = [
  "Reembolso total", "Reembolso parcial", "Cambio", "Nota de crédito", "Rechazo tras revisión",
];

export const QUIEN_PAGA_FLETE = ["Tu cuenta", "Se descuenta del reembolso", "El comprador"];

export const ESTADOS_MERCANCIA = ["Completa y en buen estado", "Con faltante", "Dañada"];

/* Los tonos de la devolución viven junto a los demás estados del producto: un
   estado que se pinta en dos sitios con dos criterios se pinta distinto. */
Object.assign(tonos, {
  "Solicitada": "aviso",
  "Autorizada": "info",
  "Con guía de retorno": "neutra",
  "En tránsito de regreso": "info",
  "Recibida": "aviso",
  "Cerrada": "ok",
  "Rechazada": "neutra",
  "Sin retorno": "ok",
});

export const devoluciones = [
  /* 1 · La cola: es la que se autoriza en el recorrido. */
  { id: "DV-0031", pedido: "#1011", origenDevolucion: "canal", motivo: "Producto dañado",
    mecanismo: "prepagada", estado: "Solicitada", desde: "2026-09-19",
    piezas: { regresan: 1, total: 1 }, envioRetorno: null, resolucion: null, recepcion: null },

  /* 2 · El camino normal, todavía sin atascarse. */
  { id: "DV-0030", pedido: "#1016", origenDevolucion: "comerciante", motivo: "No era lo esperado",
    mecanismo: "prepagada", estado: "Autorizada", desde: "2026-09-19",
    piezas: { regresan: 2, total: 3 }, envioRetorno: null, resolucion: null, recepcion: null },

  /* 3 · Autorizada y quieta: el registro que más se atasca no es el que tiene
     guía, es el que fue autorizado y nunca tuvo ninguna. */
  { id: "DV-0029", pedido: "#1013", origenDevolucion: "comprador", motivo: "Arrepentimiento",
    mecanismo: "comprador", estado: "Autorizada", desde: "2026-09-07",
    piezas: { regresan: 1, total: 3 }, envioRetorno: null, resolucion: null, recepcion: null },

  /* 4 · El quinto mecanismo funcionando. `via` en null y flete en cero: la
     pagó el comprador, y no es nuestra. */
  { id: "DV-0028", pedido: "#1017", origenDevolucion: "comprador", motivo: "Producto equivocado",
    mecanismo: "comprador", estado: "Con guía de retorno", desde: "2026-09-18",
    piezas: { regresan: 3, total: 3 },
    envioRetorno: { guia: "794611559001", paqueteria: "Estafeta", via: null, costo: 0,
                    estado: "Generada", nota: "La pagó el comprador" },
    resolucion: null, recepcion: null },

  /* 5, 6 y 7 · La misma cosa a tres antigüedades: el tono sale de los días,
     que es el único dato duro que hay. La guía existe y el paquete no se ha
     depositado: es el caso más caro de ignorar. */
  { id: "DV-0027", pedido: "#1010", origenDevolucion: "comerciante", motivo: "Garantía",
    mecanismo: "prepagada", estado: "Con guía de retorno", desde: "2026-09-18",
    piezas: { regresan: 1, total: 1 },
    envioRetorno: { guia: "794611559012", paqueteria: "DHL", via: null, costo: 148,
                    estado: "Generada" },
    resolucion: null, recepcion: null },

  { id: "DV-0026", pedido: "#1020", origenDevolucion: "comerciante", motivo: "No era lo esperado",
    mecanismo: "prepagada", estado: "Con guía de retorno", desde: "2026-09-12",
    piezas: { regresan: 1, total: 2 },
    envioRetorno: { guia: "794611559020", paqueteria: "DHL", via: null, costo: 186,
                    estado: "Generada" },
    resolucion: null, recepcion: null },

  { id: "DV-0025", pedido: "#0998", origenDevolucion: "comprador", motivo: "Producto dañado",
    mecanismo: "prepagada", estado: "Con guía de retorno", desde: "2026-08-31",
    piezas: null,
    envioRetorno: { guia: "794611559033", paqueteria: "Estafeta", via: "T1 Envíos", costo: 132,
                    estado: "Generada" },
    resolucion: null, recepcion: null },

  /* 8 · Creada sola desde el rastreo. Nadie la pidió y la paquetería la cobra:
     su cargo va al envío original o queda huérfano. El motivo comercial arranca
     en "Entrega fallida", que está en la lista fija y se puede corregir. */
  { id: "DV-0024", pedido: "#10409", guiaIda: "PX-220914",
    origenDevolucion: "paqueteria", motivo: "Entrega fallida",
    causaTransportista: "Rechazado por el destinatario",
    causaOriginal: "Rechazado por el destinatario. En proceso de retorno al remitente.",
    mecanismo: "rto", estado: "En tránsito de regreso", desde: "2026-09-19",
    piezas: null,
    envioRetorno: { guia: "PX-220914-R", paqueteria: "Paquetexpress", via: null, costo: null,
                    estado: "En tránsito" },
    resolucion: null, recepcion: null },

  /* 8 bis · La conversión: el rastreo no duplicó, convirtió. Lo que capturó una
     persona el 17 sigue aquí —motivo, piezas y origen— y encima está lo que la
     paquetería reportó el 19. Y la guía de retorno que ya se había emitido NO
     se pisa: sigue emitida, sigue sin usar y sigue siendo dinero. */
  { id: "DV-0032", pedido: "#10419", guiaIda: "782394001122",
    origenDevolucion: "comerciante", motivo: "Arrepentimiento",
    causaTransportista: "Destinatario ausente",
    causaOriginal: "Delivery exception — return to shipper scheduled",
    convertida: { fecha: "2026-09-19", registradaEl: "2026-09-17" },
    mecanismo: "rto", estado: "En tránsito de regreso", desde: "2026-09-19",
    piezas: { regresan: 1, total: 2 },
    envioRetorno: { guia: "782394009911", paqueteria: "FedEx", via: null, costo: 172,
                    estado: "Generada", sinUsar: true },
    resolucion: null, recepcion: null },

  /* 9 · Llegó menos de lo esperado. Es lo que sostiene la nota de crédito
     parcial, que es la razón por la que el paso de recibir existe. */
  { id: "DV-0023", pedido: "#1019", origenDevolucion: "comprador", motivo: "Producto dañado",
    mecanismo: "prepagada", estado: "Recibida", desde: "2026-09-18",
    piezas: { regresan: 2, total: 2 },
    envioRetorno: { guia: "794611559044", paqueteria: "DHL", via: null, costo: 164,
                    estado: "Entregado" },
    recepcion: { fecha: "2026-09-18", piezas: 1, estado: "Con faltante",
                 nota: "Llegó una copa rota y falta la segunda pieza." },
    resolucion: null },

  /* 10 · Cerrada con los tres costos poblados: la resta completa. */
  { id: "DV-0022", pedido: "#1015", origenDevolucion: "comprador", motivo: "No era lo esperado",
    mecanismo: "prepagada", estado: "Cerrada", desde: "2026-09-16",
    piezas: { regresan: 1, total: 1 },
    envioRetorno: { guia: "794611559055", paqueteria: "DHL", via: null, costo: 164,
                    estado: "Entregado" },
    recepcion: { fecha: "2026-09-15", piezas: 1, estado: "Completa y en buen estado", nota: "" },
    resolucion: { tipo: "Reembolso parcial", monto: 1240, fecha: "2026-09-16",
                  quienPago: "Tu cuenta" } },

  /* 11 · La logística es del canal: no la generamos ni la rastreamos con
     nuestras cuentas, y el registro existe para que el costo del pedido cuadre. */
  { id: "DV-0021", pedido: "#1022", origenDevolucion: "canal", motivo: "Arrepentimiento",
    mecanismo: "canal", estado: "Cerrada", desde: "2026-09-14",
    piezas: { regresan: 1, total: 1 }, envioRetorno: null, recepcion: null,
    resolucion: { tipo: "Reembolso total", monto: 2100, fecha: "2026-09-14",
                  quienPago: "El comprador" } },

  /* 12 · El producto no regresa. Frecuente con mercancía de bajo valor, donde
     el flete de vuelta cuesta más que el producto. Forzar una guía que nadie
     va a usar ensucia el rastreo con envíos fantasma. */
  { id: "DV-0020", pedido: "#0995", origenDevolucion: "comprador", motivo: "Producto dañado",
    mecanismo: "prepagada", estado: "Sin retorno", desde: "2026-09-10",
    piezas: null, envioRetorno: null, recepcion: null,
    resolucion: { tipo: "Reembolso total", monto: 2860, fecha: "2026-09-10",
                  quienPago: "Tu cuenta" } },

  /* Y el paquete que apareció en la bodega sin que nadie capturara nada. Sin
     amarrarlo a un pedido no se cierra: sin llave, no hay nada que conciliar. */
  { id: "DV-0019", pedido: null, origenDevolucion: "comprador", motivo: "Producto equivocado",
    mecanismo: "comprador", estado: "Recibida", desde: "2026-09-20",
    piezas: null, envioRetorno: null, resolucion: null,
    recepcion: { fecha: "2026-09-20", piezas: 1, estado: "Completa y en buen estado",
                 nota: "Llegó sin nota de remisión. No se sabe de qué pedido es." } },
];

const CLAVE_DEVOLUCIONES = "tc:devoluciones";

/* Lo que se registra en esta sesión, encima de lo de fábrica. */
for (const [id, cambios] of Object.entries(leerMapa(CLAVE_DEVOLUCIONES))) {
  const d = devoluciones.find((x) => x.id === id);
  if (d) Object.assign(d, cambios);
  else devoluciones.push(cambios);
}

/** Deja constancia de un cambio. Devuelve si de verdad guardó. */
export function guardarDevolucion(d) {
  const mapa = leerMapa(CLAVE_DEVOLUCIONES);
  mapa[d.id] = d;
  return escribirMapa(CLAVE_DEVOLUCIONES, mapa);
}

/**
 * Los días que lleva sin moverse.
 *
 * Se cuenta desde el último hecho real que hay, igual que los detenidos: en
 * una autorizada es la señal de que el comprador no ha hecho su parte, y en
 * una con guía sin usar es lo único que se sabe, porque el vencimiento solo
 * existe si la matriz lo trae.
 */
/* Mientras la ida va en camino, el reloj no corre contra nadie: la métrica de
   autorizadas sin movimiento dice "el comprador no ha hecho su parte", y aquí
   el comprador todavía no puede hacerla. El contador arranca el día de la
   entrega, que es el último hecho real que va a haber. */
export const esperaEntregaIda = (d) => d.estado === "Autorizada" && !!d.esperaEntrega;

export const diasSinMoverse = (d) => (esperaEntregaIda(d) ? null : diasDesde(d.desde));

/**
 * El tono de la pastilla. La antigüedad es nuestra y es un hecho; el
 * vencimiento de la guía no se inventa.
 */
export function tonoDevolucion(d) {
  const dias = diasSinMoverse(d);
  if (d.estado === "Autorizada") return dias !== null && dias >= 7 ? "aviso" : "info";
  if (d.estado === "Con guía de retorno") return dias >= 14 ? "mal" : dias >= 7 ? "aviso" : "neutra";
  return tonos[d.estado] ?? "neutra";
}

/** El único dato duro que acompaña al estado. */
export function notaDevolucion(d) {
  const dias = diasSinMoverse(d);
  if (esperaEntregaIda(d)) return "Espera la entrega de la ida";
  if (d.estado === "Autorizada") return `${dias} ${dias === 1 ? "día" : "días"} autorizada`;
  if (d.estado === "Con guía de retorno") return `${dias} ${dias === 1 ? "día" : "días"} sin usar`;
  if (d.estado === "Recibida") return `Recibida el ${fechaCorta(d.recepcion?.fecha ?? d.desde)}`;
  if (d.estado === "Cerrada" || d.estado === "Sin retorno") {
    return `Cerrada el ${fechaCorta(d.resolucion?.fecha ?? d.desde)}`;
  }
  return `${dias} ${dias === 1 ? "día" : "días"} en este estado`;
}

/* Lo que exige una decisión va primero, y dentro de cada grupo lo que lleva
   más tiempo sin moverse: la misma señal de prioridad que los detenidos. */
const PRIORIDAD_DEVOLUCION = { "Solicitada": 0, "Recibida": 1 };

export const devolucionesOrdenadas = () => devoluciones.slice().sort((a, b) =>
  (PRIORIDAD_DEVOLUCION[a.estado] ?? 2) - (PRIORIDAD_DEVOLUCION[b.estado] ?? 2) ||
  a.desde.localeCompare(b.desde));

export const devolucionesDe = (folio) => devoluciones.filter((d) => d.pedido === folio);

/** Una devolución sigue abierta mientras no tenga resolución registrada. */
const CERRADAS = ["Cerrada", "Rechazada", "Sin retorno"];
export const devolucionAbierta = (folio) =>
  devolucionesDe(folio).find((d) => !CERRADAS.includes(d.estado)) ?? null;

/** Las piezas se detallan cuando el pedido trae líneas; cuando no, la
    devolución solo puede ser total, y se dice en vez de inventar el desglose. */
export function piezasDevueltas(d) {
  if (d.piezas) return `${d.piezas.regresan} de ${d.piezas.total}`;
  return null;
}

/* ---------- El retorno que la paquetería ya declaró ----------
   Mostrarlo no es predecir, es traducir. Lo que NO existe es el aviso de
   "último intento": eso exige que el carrier reporte el intento numerado, y
   contar intentos por nuestra cuenta y presentarlos como dato suyo es
   exactamente lo que el principio prohíbe. */
const PALABRAS_DE_RETORNO = [
  /return\s+to\s+(shipper|sender)/i,
  /retorno\s+al\s+remitente/i,
  /devoluci[oó]n\s+al\s+remitente/i,
];

export const declaraRetorno = (original) =>
  !!original && PALABRAS_DE_RETORNO.some((re) => re.test(original));

/* ---------- Los cargos del envío ----------
   `diferencia` era una frase: se lee pero no se suma, y el punto entero de
   ligar el cargo del RTO al envío original es poder sumarlo. */
const CLAVE_CARGOS = "tc:cargos";

export const TIPOS_CARGO = {
  rto: "Retorno al remitente", reexpedicion: "Reexpedición", zona: "Zona extendida",
  sobrepeso: "Sobrepeso", reentrega: "Reentrega", seguro: "Seguro", otro: "Otro",
};

const cargosGuardados = leerMapa(CLAVE_CARGOS);

/** Los cargos tipificados de una guía, más el que migra de `diferencia`. */
export function cargosDe(guia) {
  const pedido = pedidos.find((p) => p.envio?.guia === guia);
  const propios = cargosGuardados[guia] ?? [];
  /* La frase de hoy migra como un cargo de tipo `otro` con su texto en la
     nota: no se pierde nada y empieza a poder sumarse. */
  const viejo = pedido?.envio?.diferencia
    ? [{ tipo: "otro", monto: null, factura: null, nota: pedido.envio.diferencia }]
    : [];
  return [...viejo, ...propios];
}

export function agregarCargo(guia, cargo) {
  const mapa = leerMapa(CLAVE_CARGOS);
  mapa[guia] = [...(mapa[guia] ?? []), cargo];
  cargosGuardados[guia] = mapa[guia];
  return escribirMapa(CLAVE_CARGOS, mapa);
}

export const cargoDe = (guia, tipo) => cargosDe(guia).find((c) => c.tipo === tipo) ?? null;

/**
 * Los tres costos de una devolución, que es la resta que sostiene la decisión.
 *
 * Confundirlos es lo que hace que la conciliación no cuadre: el flete de ida ya
 * se pagó y no se recupera; el de retorno lo paga el comerciante salvo que la
 * guía la haya comprado el comprador; y el cargo del RTO lo factura la
 * paquetería sin que nadie lo pidiera. El del RTO **no se estima**: se captura
 * de la factura, y mientras no aparezca la fila lo dice.
 */
export function costosDevolucion(d) {
  const pedido = pedidos.find((p) => p.folio === d.pedido);
  const ida = pedido?.envio?.costo ?? null;
  const retorno = d.envioRetorno ? d.envioRetorno.costo : null;
  const rto = pedido?.envio?.guia ? cargoDe(pedido.envio.guia, "rto") : null;
  const conocidos = [ida, retorno, rto?.monto].filter((x) => x != null);
  return {
    ida, retorno,
    rto: rto?.monto ?? null,
    rtoPendiente: d.mecanismo === "rto" && !rto,
    total: conocidos.reduce((s, x) => s + x, 0),
    mercancia: pedido?.total ?? null,
    notaRetorno: d.envioRetorno?.nota ?? null,
  };
}

/** El siguiente paso de una devolución, que es lo que va en su fila. */
export function siguientePaso(d) {
  switch (d.estado) {
    case "Solicitada": return { texto: "Autorizar", accion: "autorizar" };
    case "Autorizada": return { texto: "Ver el retorno", accion: "abrir" };
    case "Con guía de retorno": return { texto: "Marcar recibida", accion: "recibir" };
    case "En tránsito de regreso": return { texto: "Marcar recibida", accion: "recibir" };
    case "Recibida": return { texto: "Cerrar devolución", accion: "cerrar" };
    default: return { texto: "Ver el pedido", accion: "abrir" };
  }
}

/* =================================================================
 * El retorno que arranca desde una guía con estatus.
 *
 * Arrancar la devolución desde la guía hereda contexto, y por eso hace fácil
 * prometer de más: el estatus de la ida decide qué se ofrece, y en cuatro de
 * los seis casos no se emite nada. La acción se llama igual en los tres sitios
 * donde aparece, porque hoy en la mayoría no termina en una guía.
 * ================================================================= */

/* La ida no ha salido de la bodega. Lo que aplica es cancelarla, no devolver. */
const IDA_EN_BODEGA = ["Creada", "Generada", "Recolección pendiente"];

/** La devolución abierta de ESE envío. Un pedido con dos guías puede regresar
    por separado, y cada guía tiene la suya. */
export const devolucionDeEnvio = (folio, guia) =>
  devolucionesDe(folio).find((d) => !CERRADAS.includes(d.estado) &&
    (d.guiaIda == null || d.guiaIda === guia)) ?? null;

/**
 * Qué ofrece el bloque Envío sobre su guía.
 *
 * `verbo` en null significa que el botón no se dibuja —ni siquiera en gris, que
 * invita a averiguar por qué—, y entonces `nota` es la línea que explica la
 * ausencia. Un silencio donde alguien busca una acción cuesta más que las dos.
 */
export function retornoDeLaIda(pedido) {
  const e = pedido?.envio;
  if (!e) return null;
  const dev = devolucionDeEnvio(pedido.folio, e.guia);
  const deRegreso = declaraRetorno(e.original) || dev?.mecanismo === "rto";

  if (deRegreso) {
    return { estatus: "rto", verbo: dev ? "Ver la devolución" : null, dev,
             nota: "Este paquete ya va de regreso. Un segundo retorno sobre el mismo paquete " +
                   "se cobra dos veces." };
  }
  /* La línea también aquí: sin ella, el verbo cambia y nada dice por qué el
     botón dejó de ofrecer registrar. */
  if (dev) {
    return { estatus: "abierta", verbo: "Ver la devolución", dev,
             nota: `Este envío ya tiene la devolución ${dev.id} abierta. Un segundo registro ` +
                   "sobre el mismo paquete sería un segundo retorno, y se cobra dos veces." };
  }

  if (IDA_EN_BODEGA.includes(e.estado)) {
    return { estatus: "en-bodega", verbo: null, dev: null,
             nota: "El paquete sigue en tu bodega: todavía no hay nada que devolver. " +
                   "Si la venta se canceló, lo que se cancela es la guía de ida." };
  }
  if (e.estado === "Detenido" || e.estado === "Con incidencia") {
    return { estatus: "detenido", verbo: "Registrar devolución", dev: null, nota: null };
  }
  if (e.estado === "Entregado") {
    return { estatus: "entregado", verbo: "Registrar devolución", dev: null, nota: null };
  }
  /* Lo que queda va en camino: se registra, y la emisión espera a la entrega. */
  return { estatus: "transito", verbo: "Registrar devolución", dev: null, nota: null };
}

/** Quién dejó el registro. Después de una conversión el mecanismo dice "Retorno
    al remitente", y sin esta fila nadie podría saber que hubo intención
    comercial antes. */
export const QUIEN_REGISTRO = {
  comerciante: "El comerciante", comprador: "El comprador",
  canal: "El canal", paqueteria: "La paquetería",
};

const siguienteIdDevolucion = () => {
  const n = devoluciones.reduce((may, d) => Math.max(may, Number(String(d.id).slice(3)) || 0), 0);
  return `DV-${String(n + 1).padStart(4, "0")}`;
};

/**
 * Deja el registro que arranca desde la guía de ida.
 *
 * Nace en *Autorizada* porque quien lo captura es quien autoriza. Con la ida en
 * camino queda además en espera: lo único diferido es la emisión, y el resto
 * del registro se sigue editando mientras el paquete viaja.
 */
export function registrarDevolucionDeIda(pedido, datos) {
  const d = {
    id: siguienteIdDevolucion(), pedido: pedido.folio, guiaIda: pedido.envio?.guia ?? null,
    origenDevolucion: "comerciante", motivo: datos.motivo,
    mecanismo: "prepagada", estado: "Autorizada", desde: HOY,
    esperaEntrega: !!datos.espera,
    piezas: datos.piezas ?? null,
    retorno: {
      paqueteria: datos.paqueteria ?? null, peso: datos.peso ?? null,
      valor: datos.valor ?? null, quienPaga: datos.quienPaga ?? null,
    },
    envioRetorno: null, resolucion: null, recepcion: null,
  };
  devoluciones.push(d);
  return { devolucion: d, guardado: guardarDevolucion(d) };
}

/** Lo que la interfaz no ofrece en ningún estatus: dar media vuelta a un
    paquete en ruta o liberar uno detenido. Son instrucciones al transportista
    sobre un paquete que está en su poder. */
export const ESPERA_ENTREGA =
  "En cuanto el rastreo diga “Entregado”, esta devolución pasa a “Lista para emitir” " +
  "y entra en la cola.";

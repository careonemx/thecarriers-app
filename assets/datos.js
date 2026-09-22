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

/** Divisor volumétrico. Es el que usan DHL, FedEx, Estafeta y UPS en México. */
export const FACTOR_VOLUMETRICO = 5000;

export const pesoVolumetrico = (largo, ancho, alto) =>
  Math.round(((largo * ancho * alto) / FACTOR_VOLUMETRICO) * 100) / 100;

/** El que se paga: el mayor de los dos, no el real. */
export function pesoCobrado(p) {
  const vol = pesoVolumetrico(p.largo, p.ancho, p.alto);
  return { real: p.peso, volumetrico: vol, cobrado: Math.max(p.peso, vol), porVolumen: vol > p.peso };
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
    estado: "Detenido", original: "Delivery exception — incorrect address", destino: "Guadalajara, JAL",
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
    estado: "Con incidencia", original: "DESTINATARIO AUSENTE", destino: "Tijuana, BC",
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
    estado: "Detenido", original: "hold_at_location", destino: "Toluca, MEX",
    cliente: "Refacciones del Valle", fecha: "2026-09-15", peso: 6.7, cotizado: 233.00, facturado: 233.00,
    motivo: "Retenido en sucursal, falta documento", detenidoDesde: "2026-09-17", responsable: "Karla T." },
  { guia: "6050000998877", canal: "Tienda propia", paqueteria: "Estafeta", pedido: "#10401",
    estado: "Generada", original: "—", destino: "Veracruz, VER",
    cliente: "Pescadería del Golfo", fecha: "2026-09-19", peso: 2.0, cotizado: 143.00, facturado: null },
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
export const PLATAFORMAS = ["T1 Envíos", "Skydropx", "EnviaYa", "Envíame"];

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
  { fecha: "2026-09-23", paqueteria: "Redpack", ventana: "11:00 – 17:00", piezas: 4, recogidas: null, estado: "Confirmada", folio: "RC-8846", via: "Skydropx", origen: "puebla" },
  { fecha: "2026-09-24", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 12, recogidas: null, estado: "Recurrente", folio: "RC-8850", origen: "puebla" },
  { fecha: "2026-09-25", paqueteria: "UPS", ventana: "14:00 – 18:00", piezas: 3, recogidas: null, estado: "Por confirmar", folio: "RC-8853", origen: "cdmx" },

  /* ---- Pasadas ---- */
  { fecha: "2026-09-19", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 11, recogidas: 11, estado: "Confirmada", folio: "RC-8838", origen: "puebla" },
  { fecha: "2026-09-19", paqueteria: "Estafeta", ventana: "13:00 – 18:00", piezas: 8, recogidas: 0, estado: "Confirmada", folio: "RC-8839", origen: "puebla" },
  { fecha: "2026-09-18", paqueteria: "FedEx", ventana: "09:00 – 13:00", piezas: 5, recogidas: 5, estado: "Confirmada", folio: "RC-8834", via: "T1 Envíos", origen: "cdmx" },
  { fecha: "2026-09-17", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 9, recogidas: 9, estado: "Confirmada", folio: "RC-8830", origen: "puebla" },
  { fecha: "2026-09-17", paqueteria: "Estafeta", ventana: "13:00 – 18:00", piezas: 7, recogidas: 4, estado: "Confirmada", folio: "RC-8831", origen: "puebla" },
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
  if (r.recogidas === null) return { clave: "programada", texto: r.estado, tono: r.estado === "Por confirmar" ? "aviso" : "ok" };
  if (r.recogidas === 0) return { clave: "fallida", texto: "No se presentó", tono: "mal" };
  if (r.recogidas < r.piezas) return { clave: "parcial", texto: `Incompleta · ${r.recogidas} de ${r.piezas}`, tono: "aviso" };
  return { clave: "completa", texto: "Completa", tono: "ok" };
}

export const recoleccionesPasadas = () => recolecciones.filter((r) => r.recogidas !== null);
export const recoleccionesProximas = () => recolecciones.filter((r) => r.recogidas === null);

/**
 * Cumplimiento por paquetería sobre las que ya pasaron. Ordenado de peor a
 * mejor: la lista contesta a quién hay que reclamarle, no quién va bien.
 */
export function cumplimientoRecolecciones(dias = null) {
  const desde = dias === null ? null : menosDias(HOY, dias);
  const porPaqueteria = {};
  for (const r of recoleccionesPasadas()) {
    if (desde && r.fecha < desde) continue;
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

/** Con la moneda escrita. En una cifra grande y sola, "$180.00" es ambiguo. */
export const dineroMXN = (n) => (n == null ? "—" : `${dinero(n)} MXN`);

/** Con año: en un encabezado, "21-sep" se lee recortado y ambiguo. */
export const fechaLarga = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-MX",
    { day: "numeric", month: "short", year: "numeric" }).replace(".", "");

export const fechaCorta = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-MX", { day: "2-digit", month: "short" });

/** El "hoy" del prototipo. Los datos son fijos, así que la fecha también:
 *  si usáramos el reloj real, mañana todo llevaría un día más esperando. */
export const HOY = "2026-09-21";

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
    requiereCorreccion: "Sin colonia y el número interior va dentro de la calle." },

  { folio: "#1003", fecha: "2026-09-17", total: 10, canal: "Shopify",
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: null,
    requiereCorreccion: "Sin colonia y el número interior va dentro de la calle." },

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
const escribirMapa = (clave, valor) => {
  try { sessionStorage.setItem(clave, JSON.stringify(valor)); } catch { /* modo privado */ }
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
 * Los tres primeros son trabajo por hacer; los tres siguientes, problemas.
 * "Pagados sin guía" excluye los que fallaron y los que esperan corrección
 * porque ésos no se arreglan generando: cada uno tiene su propio camino.
 * ================================================================= */

const necesitaRecoleccion = (p) =>
  !!p.envio && !p.recoleccion && ["Creada", "Generada", "Recolección pendiente"].includes(p.envio.estado);

export const PENDIENTES = {
  "pagados-sin-guia": {
    grupo: "hacer", etiqueta: "Pagados sin guía",
    pasa: (p) => p.pago === "Pagado" && !p.envio && !p.error && !p.requiereCorreccion,
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
  const sacarFecha = FECHA_ANTIGUEDAD[clave] ?? ((p) => p.fecha);
  const fechas = pedidos.filter(PENDIENTES[clave].pasa).map(sacarFecha).filter(Boolean);
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
export const ingresos = pedidos.reduce((s, p) => s + p.total, 0);

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

/** Relleno para los pedidos sin detalle propio: completo, pero sin inventar. */
function detalleGenerico(p) {
  return {
    telefono: null,
    subtotal: p.total, impuestos: +(p.total * 0.16 / 1.16).toFixed(2), impuestosIncluidos: true,
    formaPago: p.pago === "Pagado" ? "Tarjeta de crédito" : "Pendiente",
    pagoOriginal: p.pago === "Pagado" ? "paid" : "pending",
    pedidosPrevios: 0, gastadoPrevio: 0,
    articulos: [{ nombre: "Artículo del pedido", sku: null, cantidad: 1, precio: p.total }],
    direccion: {
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
    },
    correccion: null,
    facturacionIgual: true,
    costoGuia: p.envio?.costo ?? null,
    pesoEstimado: 1.5,
  };
}

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
  "Estafeta":   { base: 46, servicio: "Terrestre",     dias: "2 a 3 días" },
  "Redpack":    { base: 52, servicio: "Express",       dias: "2 a 4 días" },
  "T1 Envíos":  { base: 58, servicio: "Estándar",      dias: "3 a 5 días" },
  "DHL":        { base: 72, servicio: "Express",       dias: "1 a 2 días" },
  "UPS":        { base: 95, servicio: "Express Saver", dias: "1 a 2 días" },
  "FedEx":      { base: 88, servicio: "Prioritario",   dias: "1 día" },
};

/** El precio de UNA paquetería. `cotizar` recorta a las cuatro más baratas,
 *  así que buscar ahí dentro devolvía el precio de otra. */
export const precioDe = (paqueteria, peso) => {
  const t = TARIFAS[paqueteria];
  return t ? Math.round((t.base + peso * 31) * 100) / 100 : null;
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

/** Motivo por el que un pedido NO entra al lote, o null si sí entra. */
export const motivoOmision = (p) => {
  if (p.envio) return "Ya tiene guía";
  if (p.pago !== "Pagado") return "No está pagado";
  // REQ-03: la validación local va antes de gastar una llamada al carrier.
  if (p.error || p.requiereCorreccion) return "Requiere corrección de dirección";
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

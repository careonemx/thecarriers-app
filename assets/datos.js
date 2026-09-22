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
  { guia: "T1-88213", canal: "Tienda propia", paqueteria: "T1 Envíos", pedido: "#10411",
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
  { guia: "SK-771204", canal: "Tiendanube", paqueteria: "Skydropx", pedido: "#10405",
    estado: "Entregado", original: "delivered", destino: "Cancún, QROO",
    cliente: "Hotelería del Caribe", fecha: "2026-09-14", peso: 12.4, cotizado: 480.00, facturado: 480.00 },
  { guia: "EY-9930021", canal: "Amazon", paqueteria: "EnviaYa", pedido: "#10403",
    estado: "Detenido", original: "hold_at_location", destino: "Toluca, MEX",
    cliente: "Refacciones del Valle", fecha: "2026-09-15", peso: 6.7, cotizado: 233.00, facturado: 233.00,
    motivo: "Retenido en sucursal, falta documento", detenidoDesde: "2026-09-17", responsable: "Karla T." },
  { guia: "6050000998877", canal: "Tienda propia", paqueteria: "Estafeta", pedido: "#10401",
    estado: "Generada", original: "—", destino: "Veracruz, VER",
    cliente: "Pescadería del Golfo", fecha: "2026-09-19", peso: 2.0, cotizado: 143.00, facturado: null },
  { guia: "EM-556677", canal: "WooCommerce", paqueteria: "Envíame", pedido: "#10399",
    estado: "En tránsito", original: "in_transit", destino: "Saltillo, COAH",
    cliente: "Talleres Herrera", fecha: "2026-09-16", peso: 9.2, cotizado: 298.00, facturado: 341.00,
    diferencia: "Zona extendida: 43.00 no cotizados" },
];

export const recolecciones = [
  { fecha: "2026-09-22", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 14, estado: "Confirmada", folio: "RC-8841" },
  { fecha: "2026-09-22", paqueteria: "Estafeta", ventana: "13:00 – 18:00", piezas: 9, estado: "Confirmada", folio: "RC-8842" },
  { fecha: "2026-09-23", paqueteria: "FedEx", ventana: "09:00 – 13:00", piezas: 6, estado: "Por confirmar", folio: "RC-8845" },
  { fecha: "2026-09-23", paqueteria: "Redpack", ventana: "11:00 – 17:00", piezas: 4, estado: "Confirmada", folio: "RC-8846" },
  { fecha: "2026-09-24", paqueteria: "DHL", ventana: "10:00 – 14:00", piezas: 12, estado: "Recurrente", folio: "RC-8850" },
  { fecha: "2026-09-25", paqueteria: "UPS", ventana: "14:00 – 18:00", piezas: 3, estado: "Por confirmar", folio: "RC-8853" },
];

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
    pago: "Pagado", envio: { guia: "6822851033", paqueteria: "DHL", estado: "Creada", costo: 156, peso: 3.4 } },

  { folio: "#1005", fecha: "2026-09-17", total: 50, canal: "Shopify",
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: { guia: "877394716724", paqueteria: "FedEx", estado: "Creada", costo: 142, peso: 2 } },

  { folio: "#1004", fecha: "2026-09-17", total: 30, canal: "Shopify",
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: null },

  { folio: "#1003", fecha: "2026-09-17", total: 10, canal: "Shopify",
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: null },

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
  pago: "Pagado",
  envio: {
    guia: e.guia, paqueteria: e.paqueteria, estado: e.estado, original: e.original,
    peso: e.peso, costo: e.facturado ?? e.cotizado, cotizado: e.cotizado, facturado: e.facturado,
    motivo: e.motivo, detenidoDesde: e.detenidoDesde, responsable: e.responsable,
    diferencia: e.diferencia,
  },
}));

export const pedidos = [...pedidosBase, ...pedidosDeEnvios];

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
      campos: (() => {
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

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

export const envios = [
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

/* ---------- Derivados ---------- */
export const detenidos = envios.filter((e) => e.estado === "Detenido" || e.estado === "Con incidencia");
export const porRecolectar = envios.filter((e) => e.estado === "Recolección pendiente" || e.estado === "Generada");
export const conDiferencia = envios.filter((e) => e.diferencia);

export const dinero = (n) =>
  n == null ? "—" : n.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });

/** Con la moneda escrita. En una cifra grande y sola, "$180.00" es ambiguo. */
export const dineroMXN = (n) => (n == null ? "—" : `${dinero(n)} MXN`);

export const fechaCorta = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-MX", { day: "2-digit", month: "short" });

export const diasDesde = (iso) =>
  Math.max(0, Math.round((new Date("2026-09-21T12:00:00") - new Date(iso + "T12:00:00")) / 86400000));

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

export const pedidos = [
  { folio: "#1007", fecha: "2026-09-21", total: 10,
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: { guia: "877543753572", paqueteria: "FedEx", estado: "Creada" } },

  { folio: "#1006", fecha: "2026-09-17", total: 60,
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: { guia: "6822851033", paqueteria: "DHL", estado: "Creada" } },

  { folio: "#1005", fecha: "2026-09-17", total: 50,
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: { guia: "877394716724", paqueteria: "FedEx", estado: "Creada" } },

  { folio: "#1004", fecha: "2026-09-17", total: 30,
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: null },

  { folio: "#1003", fecha: "2026-09-17", total: 10,
    cliente: { nombre: "Arturo García", correo: "drianrgez@gmail.com", iniciales: "AG" },
    destino: "Port Agrere 9 Geovillas del sur casa", ciudad: "Puebla, PUE 72495",
    pago: "Pagado", envio: null },

  // Un pedido al que le falla la generación de la guía. El MVP todavía no
  // tiene este estado y es el que más duele: el pedido parece pendiente,
  // pero nadie va a volver a intentarlo si no se dice.
  { folio: "#1002", fecha: "2026-09-16", total: 15,
    cliente: { nombre: "Mariana Ordaz", correo: "mariana@tallerlumbre.mx", iniciales: "MO" },
    destino: "Av. Juárez 1804, Col. Centro", ciudad: "Monterrey, NL 64000",
    pago: "Pagado", envio: null,
    error: "La paquetería rechazó el código postal: 64000 no coincide con la colonia." },

  { folio: "#1001", fecha: "2026-09-15", total: 5,
    cliente: { nombre: "Grupo Aldama", correo: "compras@aldama.mx", iniciales: "GA" },
    destino: "Calz. de Tlalpan 3020, Coyoacán", ciudad: "Ciudad de México, CDMX 04650",
    pago: "Pendiente", envio: null },
];

export const sinGuia = pedidos.filter((p) => !p.envio);
export const conGuia = pedidos.filter((p) => p.envio);
export const conError = pedidos.filter((p) => p.error);
export const ingresos = pedidos.reduce((s, p) => s + p.total, 0);

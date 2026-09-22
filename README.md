# The Carriers — prototipo de interfaz

La UX del sistema en HTML, CSS y JavaScript planos. **No hay backend, no hay
autenticación y no hay datos reales.** Sirve para ver y discutir cómo se opera el
producto antes de construirlo.

**Vista previa:** https://careonemx.github.io/thecarriers-app/
**Sistema de diseño:** https://careonemx.github.io/thecarriers-app/sistema.html

## Correr en local

Necesita un servidor, porque el JavaScript son módulos ES y `file://` los bloquea:

```bash
python3 -m http.server 4400
```

Abre http://localhost:4400. Cualquier correo y contraseña entran.

## Pantallas

```
index.html                 redirige al acceso
sistema.html               el sistema de diseño, renderizado
login.html                 entrar
recuperar.html             recuperar contraseña

app/inicio.html            qué atender hoy, antes de las métricas
app/pedidos.html           el módulo de pedidos del MVP, vestido
app/pendiente.html         nota para las pantallas del MVP sin vestir

app/envios.html            la tabla principal, con filtros y métricas
app/envio.html             un envío: historial, destino y costos
app/excepciones.html       lo detenido, ordenado por antigüedad
app/recolecciones.html     recolecciones por día
app/desempeno.html         cumplimiento y volumen por paquetería
app/cobros.html            cotizado contra facturado
app/bienvenida.html        primer ingreso, todavía sin datos
```

## Sistema de diseño

`sistema.html` es la referencia: colores con su contraste **medido sobre el render**,
tipografía, medidas, botones, campos, pastillas, tablas, tarjetas, avisos, estados
vacíos, historial, barras, pestañas, diálogos y paginación.

No es una lista de hexadecimales en un documento aparte: se renderiza con el mismo
`assets/app.css` que usa la plataforma. Si algo se ve ahí, existe; si cambias un token,
la guía cambia sola y los contrastes se recalculan al abrirla. De ahí se toma todo.

La última sección, **Reglas que no se negocian**, recoge los defectos que ya costaron
una corrección. Conviene leerla antes de agregar una pantalla.

## Relación con el MVP

Lalo construyó la primera versión funcional. Este prototipo **viste lo que ya existe**,
no lo reemplaza: el módulo de Pedidos conserva su estructura —pestañas Todos / Sin
enviar / Enviados, conmutador Clásico / Mosaico, insignia de la tienda conectada,
Sincronizar estatus, casillas solo en lo pendiente, paginación— y le aplica el sistema.

### Una sola navegación

El menú no separa "lo del MVP" de "lo propuesto": se ordena por el recorrido real del
trabajo, en tres grupos — **Operación**, **Análisis** y **Ajustes**. El punto marca las
pantallas que todavía no existen en este prototipo; llevan a una nota, no a un 404.

**Pedidos y Envíos son el mismo objeto en dos momentos.** El pedido entra por un canal y
pregunta *¿ya tiene guía?*; cuando la tiene se convierte en un envío y la pregunta cambia
a *¿dónde va y va a llegar a tiempo?*. Por eso van seguidos en el menú, y por eso los
pedidos con guía se normalizan y entran a la misma lista que el resto de los envíos: si
cada pantalla tuviera su propia lista, Rastrear llevaría a una guía que no existe en
Envíos y las dos mitades del producto no se hablarían.

El recorrido cierra en los dos sentidos: Pedidos → Rastrear abre el detalle del envío, y
el detalle enlaza de vuelta a su pedido. **Excepciones** es una vista filtrada de Envíos,
pero se saca al menú con su cuenta a la vista porque es lo único que exige que alguien
actúe.

Lo que se agregó al módulo de Pedidos, que el MVP no tenía:

- **Antigüedad.** Un pedido no solo está "sin guía": lleva cuatro días esperando. Eso es
  lo que cuesta dinero y es lo que dispara la pregunta del cliente.
- **Error de generación.** Si la paquetería rechaza la guía, el pedido se veía igual que
  uno recién llegado y nadie volvía a intentarlo. Ahora tiene su estado, su motivo y su
  botón de reintentar.
- **Pago pendiente.** Un pedido sin pagar no se envía: el botón queda deshabilitado y
  dice por qué, en vez de dejar generar una guía que no debía existir.
- **Selección múltiple con barra de acciones.** Las casillas ya estaban; faltaba qué
  hacer con ellas. Seleccionar todo respeta las reglas: de cuatro sin enviar, marca tres.
- **Inicio.** El MVP no tenía. No es un tablero de vanidad: lista qué atender hoy, y
  separa los tres motivos por los que un pedido sigue sin guía, porque cada uno se
  resuelve distinto.

## Cómo está armado

- `assets/app.css` — el sistema de diseño. Los tokens son **los mismos del sitio
  público**: la escalera `abyss → navy-900 → navy`, el verde `#0F9D6E` y la Inter
  self-hosted. Quien entra desde la landing no debe notar que cambió de sitio.
- `assets/app.js` — la barra lateral y la superior se inyectan desde aquí en vez de
  repetirse en cada `.html`. Son siete páginas: duplicar el marcado garantiza que se
  desincronice. Cada página solo declara `data-seccion` en su `<body>`.
- `assets/datos.js` — todos los datos de ejemplo, en un solo lugar.

La "sesión" es `sessionStorage` y acepta cualquier credencial. Entrar directo a una
pantalla de `app/` sin sesión rebota al acceso, para que el flujo se sienta real.

## Honestidad de los datos

Todo lo que se ve es inventado, y por eso la barra superior lleva siempre el aviso
**Datos de ejemplo**. No hay tiempos simulados, estados "en vivo" ni métricas que
sugieran una operación real.

## Cuatro trampas que ya costaron una corrección

Están documentadas en el CSS, pero conviene tenerlas a la vista:

1. **`[hidden]` necesita `!important`.** Varios componentes declaran `display:flex`
   o `grid`, y eso le gana al atributo. Sin la regla, los avisos de error se ven
   siempre, vacíos.
2. **`thead` pegajoso va con `top: 0`, no con la altura de la barra superior.**
   `.tabla-caja` lleva `overflow-x:auto` y eso convierte la caja en contenedor de
   scroll: el sticky se mide contra ella, así que un `top` de 60px bajaba el
   encabezado 60px y lo montaba encima de la primera fila.
3. **Las barras de la gráfica necesitan `display:block`.** Son `<span>`, y en un
   elemento en línea no aplican `width` ni `height`: todas salían del mismo largo.
4. **`.boton` tiene que declarar `background`.** Si no, un `<button>` hereda el gris
   claro del navegador y el texto tenue encima da 2.17:1.

## El acceso en angosto

`login.html` y `recuperar.html` usan su propio umbral, **1279 y no 1023**, porque el
panel dividido deja al diagrama sin ancho antes que eso. Pero por debajo el arte **no
desaparece**: se compacta y pasa a ser la cabecera del formulario. Marca, resplandor
verde y diagrama animado siguen ahí; las fichas muestran solo el monograma y se cae la
bajada larga, que en un teléfono estorba antes del formulario.

Esconderlo entero dejaba un formulario pelón sobre un fondo plano. Si alguien vuelve a
tocar esa consulta de medios, que sea para compactar, no para ocultar.

El ancho y el margen del diagrama viven en el CSS, nunca en un `style=` del HTML: en
línea, la consulta de medios no los puede corregir y el diagrama queda descentrado.

## Accesibilidad

WCAG 2.1 AA, medido sobre el render de las ocho pantallas: **621 textos, 0 fallos**.
Las restricciones de la paleta son las mismas del sitio y están anotadas arriba de los
tokens en `app.css`. Lo que hay que respetar al agregar pantallas:

- Sobre el verde de marca va texto `abyss`, no blanco: blanco da 3.46:1 y reprueba.
  El hover **aclara**; oscurecer dejaría el texto oscuro sin contraste.
- `--hairline` es decorativo. El borde de un control va con `--field`, que cumple el
  3:1 de 1.4.11.
- El menú lateral en pantallas angostas es un cajón con `aria-expanded`, velo y cierre
  con Escape.

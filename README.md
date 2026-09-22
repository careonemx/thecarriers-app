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

app/inicio.html            la entrada: qué atender hoy y a dónde ir
app/pedidos.html           la lista, con filtros, lote y detalle
app/origenes.html          direcciones de origen: de dónde sale y dónde recogen
app/plantillas.html        plantillas de paquete y el peso que de verdad se cobra
app/etiqueta.html          las etiquetas, a tamaño físico e imprimibles
app/canales.html           canales de venta conectados y por conectar
app/paqueterias.html       cuentas por las que se compran las guías
app/configuracion.html     qué ocurre solo al entrar un pedido y qué paquetería se elige
app/pendiente.html         nota para las pantallas del MVP sin vestir

app/envios.html            la tabla principal, con filtros y métricas
app/envio.html             un envío: historial, destino y costos
app/excepciones.html       tracking: lo detenido, con lo que reportó cada paquetería
app/recolecciones.html     recolecciones por día
app/desempeno.html         cumplimiento y volumen por paquetería
app/cobros.html            cotizado contra facturado
app/bienvenida.html        primer ingreso, todavía sin datos
```

## Antes de cada commit

```bash
python3 herramientas/version.py
```

Sella `app.css`, `app.js`, `datos.js` y `vigia.js` con una versión derivada de su
contenido, y la escribe en cada `href`, `src` e `import`.

**No es opcional.** GitHub Pages responde `cache-control: max-age=600`, así que durante
diez minutos después de cada despliegue un navegador puede combinar el HTML nuevo con el
JavaScript viejo. Si el HTML nuevo importa algo que el JS viejo no exporta, el módulo
entero falla **al enlazar** y no se ejecuta ni una línea: no se inyecta el armazón, no se
pintan los datos, y queda el esqueleto estático en pantalla. Se ve como si el producto
estuviera roto.

`assets/vigia.js` es la red de seguridad: un script clásico —no un módulo, porque un
módulo que no enlaza tampoco podría avisar— que muestra una explicación y un botón de
recargar. Detecta el fallo por el error real del módulo, y como respaldo por tiempo solo
en las pantallas que montan armazón: la guía de diseño y el índice no montan nada, y sin
esa distinción mostrarían una alerta falsa cada vez que cargan bien.

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

### Una sola lista

**No hay pantalla de "Envíos".** Un pedido y su envío son el mismo objeto en dos
momentos: el pedido entra por un canal y pregunta *¿ya tiene guía?*; cuando la tiene, la
pregunta cambia a *¿dónde va y va a llegar a tiempo?*. Dos listas casi iguales obligaban
a preguntarse "¿la guía 877… la busco en Pedidos o en Envíos?", y esa duda no debería
existir.

Pedidos es la lista, y el estado del envío es una de sus vistas: **Todos · Sin guía · En
tránsito · Detenidos · Entregados**. `envios.html` quedó como redirección a la vista que
le corresponde, para que los enlaces viejos no se rompan.

La fusión también es de datos, no solo de menú. `pedidos` es la única fuente y `envios`
se deriva de ella, así que Tracking, Cobros y el detalle del envío siguen consumiendo
`envios` sin enterarse. Cuando el 1:1 se rompa —un pedido partido en dos guías, una
devolución sin pedido nuevo— la solución es que `envio` pase a ser una lista dentro del
pedido, **no** abrir una segunda pantalla.

**Tracking sí se queda,** y no es una incoherencia: no es un duplicado de la lista,
es una cola de trabajo. Sus columnas contestan otra pregunta —cuántos días lleva parado,
por qué, quién lo atiende— y alguien la abre para vaciarla, no para consultar.

El menú queda en tres grupos ordenados por el recorrido del trabajo: **Operación**,
**Análisis** y **Ajustes**. El punto marca las pantallas que todavía no existen en este
prototipo; llevan a una nota, no a un 404.

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
- **Filtros.** Rango de fechas con atajos —Hoy, 7 días, 30 días, Todo— más un rango a
  mano, y filtros de paquetería y canal. Los atajos escriben en los campos de fecha en
  lugar de guardar estado aparte: así el rango elegido siempre está a la vista y se
  puede ajustar. Todos los filtros se combinan entre sí y con la vista.
- **Paginación de verdad.** Corta lo filtrado, no la lista completa, y cualquier cambio
  de filtro devuelve a la primera página: quedarse en la 3 de una lista que ahora tiene
  4 resultados deja la pantalla vacía sin explicación. El pie dice el rango real y, si
  hay filtros activos, cuántos pedidos hay en total.
- **Detalle del pedido en panel lateral.** Cajón, no pantalla aparte: el operador va
  bajando una lista, abre, revisa, actúa y sigue; navegar a otra página le tira el filtro,
  la página y el lugar donde iba. Es un `<dialog>` nativo, que trae foco atrapado, Escape
  y fondo inerte sin escribir una línea. La URL guarda el pedido abierto (`?pedido=1007`),
  así que el enlace se puede compartir y Atrás cierra el panel en vez de salirse.

  Tres decisiones de contenido, cada una porque el dato del MVP confundía:

  - **Los totales no cuadraban.** Subtotal $10.00 + Impuestos $1.38 daba $11.38, pero el
    Total decía $10.00. El IVA va incluido, así que se dice: *"El total ya incluye $1.38
    de IVA"*, en vez de un renglón suelto que parece un error de cálculo.
  - **"0 pedido(s) · $0.00 gastado"** junto a un pedido real se lee como dato roto. Si no
    hay historial, dice *"Primer pedido de este cliente"*.
  - **La corrección de dirección no se muestra como dos bloques de texto** para que
    alguien los compare con el dedo, sino como una lista de cambios campo por campo. Y
    contesta la pregunta más consecuente de la pantalla, que el MVP no contestaba: **con
    cuál de las dos direcciones se generó la guía**.

  Una sola acción principal por pantalla: si la corrección está sin aplicar, el bloque de
  Envío no ofrece "Generar guía" —volvería a fallar por el mismo motivo—; el botón vive
  junto a lo que hay que resolver.
- **Editar la dirección**, dentro del mismo bloque y no en otro diálogo encima: apilar
  ventanas modales esconde el contexto que hace falta para decidir. El código postal va
  primero porque en México determina colonia, ciudad y estado: al escribirlo completo, el
  formulario ofrece las colonias que le corresponden y llena lo demás.

  Y dice la verdad incómoda que el MVP callaba: **si la guía ya está generada, cambiar la
  dirección aquí no modifica la etiqueta impresa**. El aviso sale antes de editar y otra
  vez al guardar, y la acción pasa a ser "Cancelar guía y generar otra".
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

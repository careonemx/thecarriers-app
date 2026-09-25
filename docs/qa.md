# QA — tercera pasada, la de antes de subir

Prototipo en `http://localhost:4400`. Probado con el navegador: clics y tecleo reales,
celdas de la matriz cambiadas a mano, un envío suelto creado de cero, los seis estatus
del retorno uno por uno, y un barrido de todos los botones de las pantallas nuevas.

Una nota sobre método, porque cambió un resultado. En esta pasada empecé rellenando
formularios con eventos sintéticos y el panel de captura parecía roto. **No lo estaba:**
repetido con tecleo y clic reales funciona. Todo lo que sigue está comprobado con
interacción real, y donde un fallo depende de eso lo digo.

Este informe sustituye al de la segunda pasada.

---

## Lo que quedó cerrado de la segunda pasada

Verificado a mano, no de palabra:

- **V1 · No había botón para emitir la guía de retorno.** Cerrado. Puse `DHL · Emitir guía de retorno` en "Sí" con modalidad y en `#1016` aparece **Generar guía de retorno con DHL · $103.00**.
- **V2 · "Sin registro" no se podía elegir.** Cerrado, y por los dos caminos: en `DHL · Cancelar recolección` el valor se queda en "Sin registro", y el aviso es por fin la tercera frase —*"Guardado. Las recolecciones de DHL ofrecen la instrucción de llamar, con el paso para confirmarlo."*—. Además existe el botón **Quitar el registro de…** que el documento pedía.
- **V3 · `sumaPiezas` no tenía pantalla.** Cerrado. En Recolecciones aparecen las dos líneas: *"DHL no acepta sumar piezas a una solicitud confirmada. Esta entra a la del día siguiente."* y *"Sin registro de si Estafeta acepta sumar piezas… Confirmar con Estafeta"*.
- **V4 · El panel de una devolución recibida no dejaba cerrarla.** Cerrado: `DV-0023` ofrece **Cerrar devolución**.
- **V5 · Se cerraba sin resolución.** Cerrado: *"Falta la resolución."*
- **V7 · Dos "así que".** Cerrado: cero en Configuración, Recolecciones y Pedidos.
- **V8 · "Invalid Date" y el divisor dado por confirmado.** Cerrado por partida doble: cero "Invalid Date" en las nueve fichas, y la nota volvió a la tarjeta de reglas, ahora impersonal: *"Calculado con divisor 5000, sin registro del de la paquetería."*
- **V9, V10, V11** y los menores: no vuelvo a listarlos uno por uno; los di por buenos al comprobar los bloques donde vivían.

**Lo que sigue abierto de esa pasada:** solo **V6**, el cargo de retorno que no llega a Cobros. Ver **T4**.

## Lo que trae esta ronda y funciona

- **Columna de canal** entre Pedido y Cliente ✓. El filtro de canal gana **Sin canal** y solo cuando hay sueltos.
- **El "Generar guía" de la tabla ya no está muerto**: abre el panel con el bloque Envío a la vista y no genera desde la fila ✓.
- **Títulos de Configuración** reescritos: Entrada del pedido · Embalaje · Paquetería · Recolección, con las tarjetas diciendo qué decide cada una ✓.
- **El envío suelto, de punta a punta** ✓. Lo creé con tecleo real: referencia obligatoria con sus seis errores nombrados uno por uno, CP 29321 fuera de catálogo resuelto **en la ayuda y no en el error** con la frase literal del documento, el panel **no se cierra** y se convierte en el de `E-0044` con el bloque Envío abierto y el botón activo desde el primer momento, y la ayuda de Caja usa el verbo correcto: *"La propone la regla «Por defecto». Aquí la eliges tú."*
- **Las cifras no se envenenan** ✓. Capturé un total de $1,500 a mano y **`ingresos` no se movió**: 73,765 antes y después. En la tabla la fila sale con `E-0044` sin almohadilla, la referencia debajo, `Sin canal`, *"$1,500.00 a mano"* y el pago en **"—"** con *"Sin canal que lo reporte"*. La métrica dice *"46 en el periodo · 2 sin canal"*.
- **Las dos mitades de la frase están puestas** ✓. Inicio: *"De los 39 envíos del periodo, 2 son envíos sueltos y no cuentan como venta…"*. Desempeño: *"Incluye los envíos sueltos: los entregó la misma paquetería."* Con una sola, la otra pantalla parecería equivocada; están las dos.
- **"Listos para despachar"** sustituye a "Pagados sin guía" en los tres sitios ✓.
- **La conversión del rastreo** ✓, y es lo mejor de la ronda. `DV-0032` sobre `#10419` enseña las dos fechas (*"La paquetería inició el retorno el 19-sep"* / *"Se conservó la devolución registrada el 17-sep, con su motivo y sus piezas"*), el bloque **Por qué regresa** con los dos hechos separados —*"Lo que pidió el cliente: Arrepentimiento"* y *"Lo que reportó FedEx: Destinatario ausente"*—, el texto original del carrier, y la guía huérfana con su aviso y su instrucción leída de la matriz. **No duplica y conserva lo tecleado.** Y en una devolución normal (`#1015`) **el bloque no existe**: cero "—", cero "Sin dato".
- **Los seis estatus deciden bien qué se ofrece** ✓, en el panel y en `envio.html`. Generada y Recolección pendiente: **sin botón**, con la línea *"El paquete sigue en tu bodega: todavía no hay nada que devolver…"* y la cancelación de la ida leída de la matriz. En tránsito y Entregado: **Registrar devolución**. Con RTO: **Ver la devolución**, con su línea *"Este paquete ya va de regreso. Un segundo retorno sobre el mismo paquete se cobra dos veces."* Y desde `envio.html` el botón no abre un formulario ahí: enlaza a `pedidos.html?pedido=10417&devolucion=nueva`.
- **El formulario de dirección refactorizado no rompió nada** ✓. `#0997` sigue nombrando los dos datos que faltan (*"Faltan el número exterior y la colonia"*), se guarda en un solo viaje, la franja desaparece, el botón se reactiva y el bloque remite a Envío. Correcciones sigue entera.

**Regresiones: ninguna.** Quince pantallas recorridas, cero errores de consola, cero `NaN`, `undefined`, `null` o `Invalid Date` en pantalla. Las cinco lentes originales siguen filtrando y la de devoluciones sigue con su buscador, sus filtros y su pie.

---

# Lo que sigue vivo

## Grave

### T1. "Registrar devolución" desde una guía con estatus nunca crea el registro

**Gravedad:** grave. Es la función que esta ronda vino a construir, y termina en un botón que no completa.

**Cómo reproducirlo**
1. `http://localhost:4400/app/pedidos.html?pedido=10417` (Entregado, que el documento llama *"el flujo completo"*).
2. **Registrar devolución** en el bloque Envío. Se abre el formulario, que está bien escrito.
3. Elige un **Motivo**, escribe **Qué piezas regresan** = 1 y **Valor declarado** = 500.
4. Pulsa **Registrar devolución**.

**Qué esperaba** — Que se cree el registro. En Entregado, con el selector de 1.4; en tránsito, en espera con la franja de 1.3 bis.

**Qué pasó** — El formulario se vacía —`motivo=`, `piezas=`, `valor=`—, no aparece ningún error, el bloque sigue diciendo "REGISTRAR DEVOLUCIÓN" y **no se crea ninguna devolución**. Lo comprobé contra el dato, no contra la pantalla: `devoluciones` no gana ningún registro para ese pedido.

Reproducido en **#10417** (Entregado), **#10407** y **#10399** (En tránsito), con tecleo y clics reales, cinco intentos. La validación sí funciona —vacío da *"Falta cuántas piezas regresan."* y *"Falta el valor declarado de lo que regresa."*—, así que el manejador corre: lo que falla es el guardado, y de paso borra lo capturado.

El efecto de lado es el que lo hace peor de explicar en una demostración: como cada envío repinta el formulario en blanco, quien lo intente entra en un bucle —llena el motivo, falla por piezas; llena piezas, se le borra el motivo— sin que nada le diga qué está pasando.

Y deja sin ver **"En tránsito: la espera"**, que el documento llama *"el estatus más frecuente y el más fácil de hacer mal"* y al que dedica tres párrafos: el registro en espera no se puede crear, así que su franja no se puede enseñar.

**A quién le toca:** al desarrollador.

---

## Medios

### T2. Dos botones muertos más, y uno es la acción principal de su pantalla

**Gravedad:** medio.

Hice el barrido a mano: cliqué cada botón de las cuatro pantallas nuevas comparando el DOM antes y después. Dos no hacen nada, y los dos son `<button type="button">` sin `id`, sin `data-*` y sin manejador en ninguna parte:

- **`app/recolecciones.html:22` — "Programar recolección".** Es el `.boton--primario` del encabezado, la acción que da nombre a la pantalla. No abre diálogo, no abre panel, no navega.
- **`app/paqueterias.html:248` — "Revisar conexión".** Se pinta una vez por cuenta conectada, así que son cuatro botones muertos en la misma pantalla.

Los demás pasaron: los `data-*` de Pedidos, Configuración y Recolecciones tienen manejador y responden.

**A quién le toca:** al desarrollador.

---

### T3. El `select` de Paquetería del formulario de devolución sale vacío y no lo dice

**Gravedad:** medio.

**Cómo reproducirlo**
1. `http://localhost:4400/app/pedidos.html?pedido=10417` → **Registrar devolución**.
2. Abre el desplegable **Paquetería**, bajo "LO QUE SE PROPONE".

**Qué esperaba** — Lo de §1.4: las que no aparecen se nombran, y las dos ausencias no se nombran igual, con su **Confirmar con…**. Es lo que el bloque de devolución del panel ya hace bien.

**Qué pasó** — El desplegable tiene **cero opciones**. La ayuda dice *"De la guía de ida. Si no emite retorno, no aparece en la lista: manda lo que tu cuenta tenga registrado, no la costumbre"*, que explica por qué **una** podría faltar, no por qué no hay **ninguna**. Ni una línea que nombre a las ausentes, ni camino para confirmarlas.

Hoy ninguna paquetería emite retorno, así que el desplegable está vacío siempre: el primer usuario que lo abra encuentra un control que no contiene nada.

**A quién le toca:** al desarrollador.

---

### T4. El cargo de retorno sigue sin llegar a Cobros, y ahora falta también la columna del suelto

**Gravedad:** medio. Es V6 de la pasada anterior, más una parte nueva.

**Cómo reproducirlo**
1. `http://localhost:4400/app/cobros.html`.

**Qué esperaba** — Dos cosas del documento. De §1.1: *"El costo del retorno se refleja en Cobros, como un cargo tipificado."* De §5.6: *"la columna del pedido enseña el folio nuestro y, debajo, «Sin canal»"*.

**Qué pasó** — Los motivos de Cobros siguen siendo solo Sobrepeso, Reexpedición y Zona extendida: ni retorno ni RTO. Y las columnas son Guía · Paquetería · Peso · Cotizado · Facturado · Diferencia · Motivo: **no existe columna de pedido**, ni para los sueltos ni para nadie, así que la frase de §5.6 describe un sitio que no está construido. La guía del suelto `TC70043` sí aparece como fila, pero sin folio ni referencia al lado.

**A quién le toca:** al desarrollador si entra; al PM si no, porque entonces hay dos frases del documento y un texto del diálogo de captura —*"Queda pegado a la guía… y empieza a sumar"*— que prometen algo que no ocurre.

---

### T5. Dos campos "Referencia" en el mismo panel, con significados distintos

**Gravedad:** medio, y es del criterio del dueño más que del funcionamiento.

**Cómo reproducirlo**
1. Pedidos → **Crear envío**.

**Qué pasó** — El panel tiene dos campos rotulados **Referencia**: el primero es `refEnvio`, obligatorio, el que sustituye al folio del canal (*"Garantía #4412"*); el segundo es `referencia`, dentro de Dirección, la indicación para el repartidor (*"Ayuda al repartidor a encontrar el domicilio"*). Cada uno tiene su ayuda y las ayudas son claras, pero la etiqueta es la misma palabra dos veces en la misma pantalla, y la segunda aparece justo cuando el usuario ya se olvidó de la primera.

El segundo viene del formulario de dirección compartido, así que no es descuido de esta ronda: es lo que aparece al reutilizar el formulario en un panel que ya usaba esa palabra.

**A quién le toca:** al de UX.

---

## Menores

- **m1.** Los pedidos `#1024`–`#1029` que el documento pide para los seis estatus **no existen**; el desarrollador montó los seis sobre pedidos que ya estaban (`#10401`, `#10415`, `#10422`, `#10417`, `#10419`, `#10409`). Funciona igual y se prueban los seis, pero quien siga el documento con esos folios no encuentra nada. — PM / dev, para que coincidan
- **m2.** "Ver la devolución" sale sin línea que lo explique cuando la devolución que ya existe **no** es un RTO (`#10422` en tránsito, `#10403` detenido). Con RTO sí sale. El documento solo previó el caso RTO, así que es un hueco del diseño más que del código. — UX
- **m3.** Ninguno de los dos buscadores de fichas admite teclado en la lista: las flechas no mueven nada y no hay opción marcada; solo se elige con el ratón. Es la misma carencia en los dos. — dev
- **m4.** El aviso de destinatario repetido de §5.2 no llegué a verlo dispararse: con nombre igual y CP distinto no sale, que es correcto, pero no encontré en los datos un par que cumpla las dos condiciones dentro de siete días, así que **no puedo afirmar que funcione**. — dev, para dejar un caso en los datos

## La deuda que preguntaste: los dos buscadores

**Todavía no han divergido en lo que se ve.** Los probé en paralelo —el de productos en el diálogo de veto de Configuración y el de destinatarios en el panel de captura de Pedidos— con la misma secuencia: escribir, mirar el panel, flecha abajo, Escape, y un término sin resultados. Se comportan igual en las cinco: mismo panel, misma forma de dos líneas por fila, las flechas no hacen nada en ninguno, Escape cierra el panel sin cerrar el diálogo en los dos, y el vacío usa la misma construcción con la frase de su fuente (*"Ningún pedido trae todavía un producto que se llame así"* / *"Ningún envío anterior va a un destinatario que se llame así"*).

En el código sí son dos: `buscadorFichaHTML(sku, {id})` con `pintarPanel`/`cerrarPanel` en `configuracion.html`, y `buscadorFichaHTML(fuente)` con `pintarPanelFicha`/`cerrarPanelFicha` en `pedidos.html`, y solo el segundo guarda los resultados en `dataset.hallados`. Firmas distintas, nombres distintos, estado distinto.

Mi lectura: la deuda es real y todavía no cuesta nada, pero **ya tiene una factura pendiente y con fecha**, que es **m3**: el día que se le ponga teclado a la lista —y hay que ponérselo— hay que hacerlo dos veces y de dos maneras, y ahí es donde divergen. Sale más barato unificarlos antes de esa corrección que después.

---

# Veredicto

**Sí se sube, y se le puede enseñar a un cliente, con dos condiciones: arreglar T1 antes, y no enseñar "Registrar devolución" desde una guía hasta que esté.**

Es la ronda con más código y la que menos rompió: ninguna regresión, ni siquiera en el formulario de dirección refactorizado, que era lo que más riesgo tenía y que probé entero. El envío suelto llega terminado y —esto importa más que lo demás— **no envenena ninguna cifra**: capturé un total a mano y los ingresos no se movieron, las dos mitades de la explicación están puestas en Inicio y en Desempeño, y la cola cambió de nombre en los tres sitios. La conversión del rastreo es la mejor pieza de las tres pasadas: conserva lo tecleado, no duplica, separa los dos motivos y desaparece entera donde no aplica.

**T1 hay que arreglarlo antes de subir.** No es un acabado: es que la función 6, la que motivó media ronda, no llega a crear nada. Y falla en silencio y borrando lo escrito, que es la peor forma de fallar delante de alguien.

**T2 conviene arreglarlo antes de enseñar Recolecciones**, porque el botón muerto es el primario del encabezado: es lo primero que va a pulsar cualquiera que abra esa pantalla. Con los siete anteriores ya van nueve botones muertos encontrados en este archivo; sugiero que antes de subir alguien pase una vez más la lista de `<button>` sin `data-*` y sin `id`, que es donde estaban los dos de hoy.

T3, T4 y T5 no bloquean: se ven solo si el cliente abre el desplegable vacío, si va a Cobros buscando un retorno, o si se queda mirando las dos etiquetas iguales.

**Sobre las dos preguntas del dueño:**

- **¿Alguien que no sabe crea un envío suelto y lo despacha rápido? Sí.** El panel pide lo que hace falta y nada más, pone la referencia primero y obligatoria, dice en seis errores exactos qué falta, resuelve el CP desconocido sin pintar nada en rojo y sin bloquear, y al crear no lo manda a ninguna lista: lo deja en el mismo panel con la caja propuesta y el botón activo. Lo hice de principio a fin y el único tropiezo fue leer dos veces la palabra "Referencia" (**T5**).
- **¿Registra una devolución desde una guía en tránsito entendiendo por qué todavía no se emite nada? Entendería perfectamente por qué —si el botón funcionara.** Toda la explicación está bien puesta y bien escrita: *"El paquete todavía va en camino. JD01480000456 va en tránsito desde el 17-sep. El registro se puede dejar hecho hoy; la guía de retorno se emite cuando la paquetería reporte la entrega."* Nombra el disparador y no el plazo, que es justo lo que el documento pedía. El problema no es que no se entienda: es que después de entenderlo, pulsa el botón y no pasa nada.

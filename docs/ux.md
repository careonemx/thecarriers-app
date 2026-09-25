# Especificación de diseño — devoluciones, recolecciones automáticas, reglas de embalaje, guías manuales y envíos sueltos

Este documento traduce `docs/definicion-producto.md` a pantallas. No lo contradice: lo que me sigue pareciendo mal está al final, en **Para el PM**.

Tres cosas mandan sobre todo lo que sigue, y ninguna es mía:

- **`sistema.html` es el idioma.** Cada regla de "Reglas que no se negocian" salió de un defecto medido. Si aquí propongo algo que las rompe, está mal aquí.
- **The Carriers es la capa de en medio.** Ninguna acción que exija una integración que no existe. Cuando una acción solo funciona con algunas paqueterías, la diferencia se enseña, no se esconde.
- **Los principios de menú que ya fijó el usuario.** "Conectar no es configurar" · "un pendiente vive donde se resuelve" · "una bitácora no es un ajuste" · "sumar a la barra es quitarle a algo".

**Ninguna de las cuatro funciones agrega una entrada al menú.** Es la conclusión de diseño más importante del documento y está justificada función por función.

---

## Resumen de dónde vive cada cosa

| Función | Dónde vive | Por qué ahí |
|---|---|---|
| La matriz de capacidades | Una fila por paquetería del producto en `paqueterias.html`, haya cuenta o no | Un "sin registro" que no se puede confirmar es indistinguible de un "no" |
| La paquetería sin cuenta | Marca en el orden de preferencia de `configuracion.html` | Se puede ordenar pero no puede salir elegida: es una regla que no puede ganar |
| Devoluciones | Pestaña en `pedidos.html` + bloque en el panel del pedido | Una devolución es un segundo envío del mismo pedido, y se autoriza mirando el pedido |
| Aviso de retorno declarado | Columna en `excepciones.html` (Tracking) | El detenido ya vive ahí, con su guía y su teléfono |
| Recolecciones automáticas (la regla) | Zona **Recolección** en `configuracion.html` | Configuración es "qué hace el sistema por su cuenta" |
| Recolecciones automáticas (lo que falla) | `recolecciones.html` e Inicio | Un camión que no llegó se reclama, no se configura |
| Reglas de embalaje | Zona **Embalaje** en `configuracion.html` | Es lo que el sistema decide solo cuando entra un pedido |
| Revisión manual | Pedidos, filtrada | Antes de construir una cola hay que mirar si el trabajo ya tiene casa |
| Guías manuales | El bloque Envío del panel de `pedidos.html` | Ya está ahí; lo que falta es que todo lo que mueve el precio se pueda cambiar sin salir |
| Retorno desde una guía con estatus | El mismo bloque Envío, y `envio.html` | El comerciante se entera mirando el rastreo de esa guía, no una cola |
| El envío suelto | Pedidos, con su panel de captura | Es un pedido sin canal, no una lista aparte |

---

# 0. La matriz de capacidades

Esta sección no es una función: es el vocabulario de las otras cuatro. Cada una de ellas ofrece acciones que la paquetería puede exponer, no exponer, o **no tener registro**. Diseñar eso una sola vez y usarlo cuatro es la diferencia entre un producto y cuatro pantallas que se parecen.

## 0.1 Dónde vive

**En `paqueterias.html`, una fila por cada paquetería que el producto puede ofrecer. Nueve, no tres.** El producto ordena y cotiza paqueterías que todavía no tienen cuenta —UPS, Paquetexpress, 99minutos y AMPM están en el orden de preferencia y salen en las cotizaciones de Pedidos—, y con la matriz atada a las cuentas conectadas esas cuatro caen en "sin registro" sin ningún sitio donde resolverlo. **El paso de confirmar existe en las nueve filas**, haya cuenta o no: un "sin registro" que no se puede confirmar es indistinguible de un "no", que es la distinción por la que esta matriz existe.

**La pantalla pasa a contestar dos preguntas, y se tienen que leer como dos.** Si hay cuenta conectada, y qué expone esa paquetería. Son independientes —hay paqueterías con cuenta que no exponen nada y paqueterías sin cuenta que exponen todo—, y juntarlas hace creer que conectar una cuenta resuelve lo segundo.

### Cómo queda `paqueterias.html`

Tres zonas, en este orden:

**1. `.zona__titulo` Tus cuentas.** Las `.ficha` de siempre, con su `.pastilla--ok` "Conectada", sus credenciales plegadas y, ahora, el pliegue de capacidades. Sin cambios de forma.

**2. `.zona__titulo` Las demás paqueterías.** Las que el producto ofrece sin cuenta conectada, con `.ficha--apagada` —el mismo tratamiento que ya usan los canales conectables: línea discontinua y apagadas, se distingue de un vistazo sin comparar nada—. Su pastilla dice `.pastilla--neutra` **"Sin cuenta"**, su pie lleva **Conectar cuenta**, y **su pliegue de capacidades funciona igual que el de las conectadas**. Ahí está lo que arregla el defecto: la ficha apagada no es un anuncio, es un sitio donde se trabaja.

**3. `.zona__titulo` Se pueden conectar.** Las plataformas que revenden guías, como hoy. No son paqueterías y no tienen fila en la matriz.

### La cabeza de cada ficha

Tres `.ficha__nota`, y las dos primeras son las dos preguntas separadas:

> **Con cuenta:**
> Cuenta 9540213 · conectada el 2 de abril de 2026
> 3 de 9 capacidades sin registro.
> Atención: 800 765 6345

> **Sin cuenta:**
> Sin cuenta conectada: esta paquetería se cotiza y se ordena, pero no puede salir elegida.
> 9 de 9 capacidades sin registro.
> Atención: 800 622 0000

**Los dos estados no se parecen y no deben parecerse.** "Sin cuenta conectada" es algo que el comerciante resuelve conectando; "sin registro de capacidades" es algo que resuelve llamando. Confundirlos es lo que hacía la versión anterior de esta pantalla.

Y debajo, junto a "Credenciales" cuando las hay:

> `<details class="avanzado avanzado--ficha"><summary>Qué expone esta paquetería</summary>`

El rótulo dice "esta paquetería", no "esta cuenta", porque el pliegue existe también donde no hay cuenta.

## 0.2 La celda

Nueve filas, cada una una frase en el idioma de quien opera, nunca la clave del objeto. Un `select` de tres valores por fila —no tres radios: serían veintisiete controles en una tarjeta— y debajo, en `.apagado`, de dónde salió el valor y cuándo.

| Fila | Control | Campo extra, solo con "Sí" |
|---|---|---|
| Cancelar una recolección ya solicitada | Sí · No · Sin registro | Hora límite para cancelar |
| Sumar piezas a una solicitud confirmada | Sí · No · Sin registro | — |
| Días de anticipación para programar | *(número)* | — |
| Cancelar una guía ya emitida | Sí · No · Sin registro | — |
| Emitir guía de retorno | Sí · No · Sin registro | Modalidad: PDF · Código en sucursal · Recolección en domicilio |
| Días que vive una guía de retorno sin usar | *(número)* | — |
| Reporta el intento de entrega numerado | Sí · No · Sin registro | — |
| **Costo del seguro** | Sí · No · Sin registro | Porcentaje sobre el valor declarado y mínimo en pesos |
| Divisor del peso volumétrico | *(número)* | — |

### Las dos capas

**Cada celda tiene dos capas y gana la de la cuenta.** La de producto se confirma con la paquetería y vale para todos; la de cuenta la confirma el comerciante sobre su contrato, porque dos cuentas de la misma paquetería no tienen contratados los mismos servicios.

El control muestra el valor que manda. Cuando hay las dos y difieren, debajo en `.apagado`:

> DHL en general sí cancela guías. En tu cuenta no, y eso es lo que manda.

Una paquetería sin cuenta conectada tiene solo capa de producto, y el pliegue lo dice una vez, arriba de las nueve filas:

> `.aviso--info` Sin cuenta conectada, esto es lo que Paquetexpress expone en general. Tu contrato puede tener menos.

**La procedencia, textual**, y son tres frases distintas porque significan tres cosas distintas:

- *Confirmado con DHL el 14 de agosto de 2026.*
- *Lo marcaste tú el 3 de septiembre de 2026, sobre tu cuenta.*
- *Sin registro.*

Un dato sobre un tercero sin fecha caduca en silencio, y un valor que puso el comerciante sobre su propio contrato no vale lo mismo que uno confirmado con la paquetería: no se esconden uno detrás del otro.

**Lo que se guarda solo, se dice, y cada valor se dice distinto.** Al cambiar una celda, `.guardado` con la consecuencia. Tres frases, no dos:

> **Sí** — Guardado. El botón de cancelar aparece en las recolecciones de DHL.
> **No** — Guardado. Las recolecciones de DHL ofrecen la instrucción de llamar, no el botón de cancelar.
> **Sin registro** — Guardado. Las recolecciones de DHL ofrecen la instrucción de llamar, con el paso para confirmarlo.

El aviso de "no" y el de "sin registro" no pueden ser la misma frase: borrarían justo la distinción que la matriz existe para hacer.

**Cuando un valor puesto por el comerciante falla contra la realidad**, el fallo ofrece deshacerlo donde ocurre, sin mandar a nadie a buscar la pantalla:

> `.franja--pendiente` **DHL rechazó la cancelación**
> Texto original: `Pickup cancellation not supported for this account`.
> `.boton--sutil.boton--chico` **Quitar el registro de "Cancelar recolección"**

## 0.3 El vocabulario de los tres valores

**Esto se aplica igual en las cuatro funciones.** Un botón que existe en una pantalla y no en otra para la misma paquetería sería un producto que se contradice a sí mismo.

| Valor | Qué se ofrece | Cómo se nombra | Qué más lleva |
|---|---|---|---|
| **Sí** | La acción, completa | Normal | — |
| **No** | Nada. En su lugar, `.instruccion--no` | "Estafeta no cancela recolecciones desde aquí" | — |
| **Sin registro** | Nada, igual que en "no", más el paso de confirmarlo | "Sin registro de si Paquetexpress cancela recolecciones desde aquí" | `.boton--sutil.boton--chico` **Confirmar con Paquetexpress** |

**"Sin registro de si…", nunca "no hemos confirmado si…".** `sistema.html` prohíbe la primera persona sin excepciones —la interfaz describe, no conversa—, y aquí no hace falta ninguna: la afirmación honesta no es sobre lo que sabemos, es sobre lo que la matriz tiene guardado. Una celda vacía es un hecho comprobable de un registro. Quien confirma aparece donde le toca, que es la acción: **Confirmar con Paquetexpress**.

Las dos últimas se ven igual y **no se nombran igual**: la primera cierra el tema, la segunda es una llamada que el comerciante puede hacer, porque él tiene el ejecutivo de cuenta.

**"Confirmar con Paquetexpress" abre Paqueterías con esa ficha desplegada y esa celda enfocada**, esté en la zona de cuentas o en la de las demás. Es lo que convierte el hueco en algo que se puede cerrar, en vez de en una nota que nadie recoge.

**La acción nunca se ofrece con "sin registro".** Ofrecer una acción que quizá funcione es la forma más cara de averiguarlo: se averigua con un paquete real.

## 0.4 La paquetería sin cuenta, en el orden de preferencia

`configuracion.html`, zona **Paquetería**, en la tarjeta "Con qué paquetería sale cada pedido". Una paquetería sin cuenta conectada **se puede ordenar y nunca puede salir elegida**. Es una regla que no puede ganar, de la misma familia que la regla de embalaje muerta, y se nombra igual de claro.

En su `.orden__fila`, junto al nombre:

> `.pastilla--aviso` **Sin cuenta**
> `.orden__quien` `.apagado` — No puede salir elegida: no hay cuenta conectada de UPS.
> `.boton--sutil.boton--chico` **Conectar UPS** · `.boton--sutil.boton--chico` **Quitar de la lista**

Dos salidas y las dos legítimas: conectarla o sacarla. Lo que no se hace es quitarla sola de la lista, porque el orden es un criterio humano y borrarlo por una cuenta que falta deshace meses de incidencias.

Y cuando la **preferida** —la primera que se puede usar— resulta ser una sin cuenta, la regla de seguridad de esa misma pantalla lo dice donde se lee:

> `.aviso--alerta` **UPS está en el primer puesto y no tiene cuenta conectada.** Los pedidos salen con Paquetexpress, la siguiente que se puede usar.

## 0.5 Componentes

**Se reutiliza:** `.ficha` con `.ficha__cabeza`, `.ficha__nota` y `.ficha__pie` · `.ficha--apagada` para la paquetería sin cuenta · `.zona` y `.zona__titulo` · `.avanzado.avanzado--ficha` · `.campo`, `.campo--corto`, `.campos` · `.pastilla--neutra` / `--aviso` · `.aviso--info` / `--alerta` · `.guardado` · `.franja--pendiente` · `.orden__fila` · `.apagado`.

**Se crea `.instruccion`**, con `.instruccion__paso` y `.instruccion__dato`, y dos modificadores: **`.instruccion--no`** y **`.instruccion--sin-registro`**. Una lista numerada de pasos que le tocan a la persona, con el dato que tiene que citar en monoespaciado **y con su botón de copiar, siempre**: el componente existe para quitar la fricción de dictar un folio por teléfono, y un dato sin botón no la quita. El modificador `--sin-registro` agrega siempre un paso final que cierra el círculo:

> **3.** Si Paquetexpress sí cancela, márcalo en Paqueterías para que el botón aparezca la próxima vez. — **Confirmar con Paquetexpress**

**Por qué hace falta un componente y no basta con lo que hay:** el `.dialogo` confirma acciones nuestras, `.franja--pendiente` describe un problema, `.aviso--*` afirma un hecho. Ninguno dicta un procedimiento que ejecuta otra persona por otro canal. Aparece seis veces en este documento —cancelar recolección, cancelar guía, sumar piezas, devolución sin emisión, y las variantes de cada una—, y es el sitio donde la capa de en medio se hace visible sin mentir.

---

# 1. Devoluciones

## 1.1 Dónde vive

**Una pestaña nueva en Pedidos, llamada "Devoluciones", sexta, después de "Entregados". Y un bloque nuevo en el panel del pedido.** Sin entrada de menú.

Tres razones, en orden de peso:

1. **Una devolución no es un objeto nuevo.** La definición lo dice: es un segundo envío del mismo pedido, con `sentido: "retorno"`. La tabla de Pedidos ya es "una sola lista con cinco lentes" (`vistaDe()` en `pedidos.html`). Ésta es la sexta lente.
2. **Un pendiente vive donde se resuelve.** Autorizar una devolución se decide mirando los artículos, el total y el historial del cliente: todo eso ya está en el panel del pedido. Sacarlo a una pantalla aparte repetiría el error que ya se corrigió con las direcciones por corregir.
3. **Sumar a la barra es quitarle a algo.** Operación ya tiene cuatro entradas. Una quinta empuja "Recolecciones" fuera del primer vistazo, y las devoluciones no son más frecuentes que las recolecciones.

**Lo que sí sale de Pedidos:**

- **El aviso de retorno declarado** va a Tracking (`excepciones.html`), como una fila más de detenidos. Porque un envío que la paquetería declaró que regresa todavía es un detenido, y ahí están la guía, el rastreo público y el teléfono del destinatario.
- **El costo del retorno** se refleja en Cobros, como un cargo tipificado.
- **Dos tarjetas en Inicio**: "Devoluciones por autorizar" y "Devoluciones autorizadas sin movimiento". Porque Inicio informa y da atajos.

## 1.2 La pantalla — pestaña Devoluciones

**Arriba.** El mismo encabezado de Pedidos. En `.encabezado__acciones`, junto a "Sincronizar estatus", aparece **"Registrar devolución"** (`.boton--primario`) **solo con esta pestaña activa**, porque es la acción que crea aquello para lo que la vista existe. Se oculta cuando la lista está vacía: ahí la lleva el estado vacío.

**Las tres métricas** de `.rejilla--3` cambian con la pestaña y son informativas, nunca pulsables —informar y actuar se separan—:

| Etiqueta | Valor | Nota |
|---|---|---|
| Por autorizar | `n` | "Esperan una decisión" |
| Autorizadas sin movimiento | `n` | "La más antigua lleva 14 días" |
| Guías de retorno sin usar | `n` | "La más antigua lleva 21 días" |

La segunda es la más importante y no es la que uno esperaría: con cinco mecanismos, el registro que más se atasca no es el que tiene guía, es el que fue autorizado y nunca tuvo ninguna. Los días en *Autorizada* son la señal de que el comprador no ha hecho su parte, y son el único dato duro que hay.

**Con una excepción que hay que respetar:** las devoluciones registradas sobre una guía todavía en tránsito nacen en *Autorizada* sin que el comprador pueda hacer nada, así que **no entran en esa métrica hasta que la ida se entregue** (1.3 bis). Contarlas sería acusar a quien no es.

**Los filtros** reutilizan la `.filtros` de Pedidos:

- Buscador local: `placeholder="Filtrar por pedido, cliente o guía de retorno"`.
- `.rango-fechas` (el de `correcciones.html`, con su "al" en medio: un rango se parte entero o no se parte).
- `select` **Estado**, llenado con los estados que de verdad hay.
- `select` **Motivo**, con la lista fija.
- `select` **Mecanismo**, con los cinco.
- `.ficha-filtro` **"Sin moverse más de 7 días"**, que cubre a la vez la autorizada sin guía y la guía sin usar, porque son el mismo problema visto en dos estados.
- `.ficha-filtro--quitable` de foco, igual que en Pedidos, para cuando se llega desde Inicio.

**La tabla.** Lista larga, así que tabla, no tarjetas. Columnas en este orden:

| # | Columna | Contenido |
|---|---|---|
| 1 | **Pedido** | `#1007` en `.mono`, enlace real que abre el panel. Debajo, en `.apagado`, el folio de la devolución: `DV-0031`. Cuando ese pedido tiene más de un envío, también la guía de ida de la que sale, porque dos guías del mismo pedido pueden regresar por separado y sin ella dos filas se verían idénticas |
| 2 | **Cliente** | Nombre; debajo, la ciudad en `.apagado` |
| 3 | **Motivo** | El comercial, de la lista fija |
| 4 | **Piezas** | `.tabular` "2 de 5"; o "El pedido completo" en `.nota-celda` cuando el pedido no trae líneas |
| 5 | **Mecanismo** | "Guía prepagada" · "Recolección en domicilio" · "Guía del comprador" · "Retorno al remitente" · "Del canal" |
| 6 | **Estado** | `.pastilla` con su tono; debajo, en `.apagado`, el único dato duro: "21 días sin usar", "14 días autorizada", "Espera la entrega de la ida", "Recibida el 18 sep" |
| 7 | **Guía de retorno** | `.mono`, o `.pastilla--neutra` "Sin guía". Debajo, la plataforma si se compró por `via`, o "Del comprador" si la capturó él |
| 8 | *(acción)* | El siguiente paso, en `.boton--fantasma.boton--chico` |

El identificador de la primera columna es el **pedido**, no la devolución, porque es la única llave que comparten el comerciante, el comprador y la paquetería, y porque pulsarlo lleva a donde la devolución se resuelve.

**La columna Motivo enseña el comercial y nunca la causa del transportista**, aunque un registro convertido tenga los dos (1.3 ter). El comercial sale de una lista fija: se puede ordenar, filtrar y contar. La causa del transportista es texto libre de la paquetería, y una columna que a veces trae una cosa y a veces la otra no se puede ordenar ni filtrar, y sería la tercera que cuenta casi lo mismo. La causa vive en el panel, que es donde se lee entera. Por lo mismo, **no hay filtro por causa del transportista**: un campo libre no se agrupa.

**El costo no va en la tabla.** Va en el pie como total del periodo y en el panel al cerrar, porque el costo de una devolución solo sirve comparado con el valor de la mercancía que regresa, y una comparación no cabe en una celda.

**Orden por defecto:** primero lo que exige una decisión (Solicitada, Recibida), dentro de cada grupo lo que lleva más tiempo sin moverse. Es la misma señal de prioridad que los detenidos, y por la misma razón.

**El pie.** `Mostrando 1–10 de 23 · $4,120.00 en retornos del periodo`, el selector de por página y la paginación, en ese orden.

**Los tonos de estado** (van a `tonos` en `datos.js`):

| Estado | Pastilla | Por qué |
|---|---|---|
| Solicitada | `--aviso` | Pendiente de que alguien la autorice |
| Autorizada | `--info`, y `--aviso` a los 7 días sin movimiento | El comprador no ha hecho su parte |
| Con guía de retorno | `--neutra` / `--aviso` a los 7 días / `--mal` a los 14 | La antigüedad es nuestra y es un hecho; el vencimiento solo si la matriz lo trae |
| En tránsito de regreso | `--info` | |
| Recibida | `--aviso` | Falta la resolución |
| Cerrada | `--ok` | |
| Rechazada | `--neutra` | Terminó, pero no "bien" |
| Sin retorno | `--ok` | Terminó y fue una decisión |
| Con incidencia | `--mal` | Necesita que alguien actúe |

## 1.3 El bloque "Devolución" en el panel del pedido

Va **arriba del bloque Envío** mientras la devolución esté abierta, y debajo cuando esté cerrada. Porque lo que exige una decisión va primero, que es exactamente la razón por la que hoy Envío ocupa ese puesto.

Aplica la regla *resultado o decisión*:

**Si alguien tiene que decidir**, se despliega todo. En `Solicitada`:

> `.franja--pendiente` — **Devolución solicitada desde Shopify**
> Arturo García pidió devolver 2 de 5 piezas el 19 de septiembre. Motivo: producto dañado.
>
> Las piezas, en una `.tabla-caja` chica: artículo, SKU, cantidad que regresa, precio.
>
> `.grupo-botones`: **Autorizar devolución** (`.boton--primario.boton--chico`) · **Rechazar devolución** (`.boton--sutil.boton--chico`)

**Cuando el pedido no trae líneas**, el desglose no existe y se dice en lugar de inventarlo:

> `.apagado` Shopify no reporta las líneas de este pedido, así que la devolución solo puede ser total.

**Si ya se resolvió**, se afirma y el detalle se pliega:

> `.franja--resuelto` — **Devolución cerrada**
> Se reembolsaron $1,240.00 el 18 de septiembre. Regresaron 2 de 5 piezas.
>
> `<details class="desplegable"><summary>Ver el costo de esta devolución</summary>` con los tres costos.

## 1.3 bis — Lo que ofrece el bloque según el estatus de la ida

Arrancar la devolución desde la guía hereda contexto, y por eso hace fácil prometer de más. **El estatus de la ida decide qué se ofrece, y en cuatro de los seis estatus no se emite nada.**

**La acción se llama "Registrar devolución" en los tres sitios donde aparece**, nunca "Generar guía de retorno": el botón tiene que nombrar lo que hace en todos los casos, y hoy en la mayoría no termina en una guía.

**Dónde está el botón.** En el panel, dentro del bloque **Envío**, en `.boton--sutil.boton--chico` junto a "Ver historial" y "Ver etiqueta": es una acción sobre ese registro y vive en su tarjeta. En `envio.html`, en `.encabezado__acciones`, en `.boton--fantasma` junto a "Descargar guía".

**Y desde `envio.html` el botón no abre un formulario ahí: abre el panel del pedido** con el bloque de devolución desplegado (`pedidos.html?pedido=1007&devolucion=nueva`). Porque la decisión necesita ver los artículos y el total, que en la pantalla del envío no están, y porque dos formularios para el mismo registro divergen: el segundo copia la mitad de la validación del primero.

### Los seis estatus

| Estatus de la ida | El botón | Qué pasa |
|---|---|---|
| **Generada, sin recolectar** | No existe | El paquete sigue en la bodega. Lo que aplica es cancelar la ida |
| **Recolección pendiente** | No existe | Igual: el paquete no ha salido |
| **En tránsito** | **Registrar devolución** | Se crea el registro en *Autorizada*, en espera de la entrega. No se emite |
| **Entregado** | **Registrar devolución** | El flujo completo, con emisión si la matriz la permite |
| **Detenido o con incidencia** | **Registrar devolución** | Se crea el registro. No hay retorno: el paquete lo tiene la paquetería |
| **Ya va de regreso (RTO)** | **Ver la devolución** | Ya existe un registro. El botón lleva a él |

Dos decisiones dentro de esa tabla:

**Donde no aplica, el botón no se dibuja deshabilitado: no se dibuja.** Un botón en gris invita a averiguar por qué; una línea lo dice y se acabó. Pero **la ausencia sí se explica**, porque un silencio donde alguien busca una acción es el defecto que ya cuesta caro en el resto del panel:

> `.apagado` El paquete sigue en tu bodega: todavía no hay nada que devolver. Si la venta se canceló, lo que se cancela es la guía de ida.

Y debajo, la cancelación de la ida tal como sale de `CAPACIDADES.cancelaGuia`: el botón, la `.instruccion--no` o la `.instruccion--sin-registro`, sin inventar un camino distinto del de 4.3.

**Con un RTO en curso el botón cambia de verbo, no de estado.** "Registrar devolución" deshabilitado sería un botón que no hace nada donde sí hay algo que hacer: ver la que ya existe. Y la línea dice por qué:

> `.apagado` Este paquete ya va de regreso. Un segundo retorno sobre el mismo paquete se cobra dos veces.

**Detenido:** el registro se crea y el bloque no promete nada que no podamos:

> `.franja--pendiente` **Devolución registrada. El paquete lo tiene la paquetería**
> Estafeta lo reporta detenido desde el 19 de septiembre. Texto original: `Delivery exception — incorrect address`. Qué pasa con él lo decide Estafeta.
> **Ver el rastreo de Estafeta** (`.boton--fantasma.boton--chico`) · **Llamar al destinatario** (`.boton--fantasma.boton--chico`)

Es poco y es verdad: el número de guía, el rastreo público y el contacto del destinatario, que es dato nuestro. Lo que la interfaz **no** ofrece en ningún estatus es dar media vuelta a un paquete en ruta ni liberar uno detenido: son instrucciones al transportista sobre un paquete en su poder.

**Y este registro es el que más veces va a cambiar solo**, porque el camino normal de un detenido es acabar en retorno. Cuando eso pase, el rastreo no crea otro: convierte este. Está en 1.3 ter.

### En tránsito: la espera

Es el estatus más frecuente y el más fácil de hacer mal. El comerciante se entera hoy y el paquete llega en tres días. **Un registro que no se puede emitir durante tres días y no dice qué está esperando se lee como algo atascado**, así que la espera se dibuja con tres cosas y las tres importan.

> `.franja--editada` **Registrada. Espera a que el paquete llegue**
> `JD01480000123` va en tránsito desde el 19 de septiembre. Una guía de retorno emitida hoy no la podría usar nadie: el comprador todavía no tiene el paquete.
> **En cuanto el rastreo diga "Entregado", esta devolución pasa a "Lista para emitir" y entra en la cola.**
> `.boton--sutil.boton--chico` **Ver el rastreo de la ida**

**1. Se nombra el disparador, no el plazo.** "En cuanto el rastreo diga Entregado", nunca "en tres días". El plazo lo sabe la paquetería; el disparador es nuestro y es comprobable. Es la misma línea que separa el aviso de retorno declarado del aviso de último intento.

**2. La espera no congela el registro.** Motivo, piezas, valor declarado y quién paga el flete **se siguen pudiendo editar** mientras el paquete viaja, y eso es lo que impide que la pantalla se lea como bloqueada. Lo único diferido es la emisión.

**3. El botón de emitir existe, deshabilitado, y dice por qué**, con el mismo patrón que el pedido sin pagar:

> `.boton--primario.boton--chico[disabled]` **Generar guía de retorno** · `title="Se emite cuando la paquetería reporte la entrega."*

Esconderlo haría pensar que el flujo termina ahí. En gris con su motivo, dice que hay un paso más y de qué depende.

**Y el reloj no corre contra nadie todavía.** En la tabla de la pestaña, estas devoluciones llevan `.pastilla--info` **"Autorizada"** y, debajo, **"Espera la entrega de la ida"** en lugar de los días. **No entran en la métrica "Autorizadas sin movimiento"** hasta que la ida se entregue, porque esa métrica dice "el comprador no ha hecho su parte" y aquí el comprador todavía no puede hacerla. Contar esos días sería acusar a quien no es. El contador arranca el día de la entrega, que es el último hecho real que hay.

**Cuando el rastreo la mueve sola**, el registro aparece en la cola, ordenado como todo lo que exige decisión, y la tarjeta de Inicio lo cuenta. Al abrirlo, el bloque ya está en el estado de 1.4, con el selector. Nadie tiene que acordarse de volver.

### Qué se hereda, qué se propone y qué se pregunta

**Los tres niveles se ven distintos, y la diferencia no es de color: es de forma.** Un campo heredado y uno propuesto no se pueden ver igual, así que el heredado ni siquiera es un campo.

**Lo que sale de la guía de ida** — `.campos__titulo`. No es un formulario: es un resultado, así que se afirma y se pliega.

> `.franja--resuelto` **El retorno va de Arturo García a Almacén Puebla**
> Los dos extremos salen de la guía de ida, invertidos.
> `<details class="desplegable"><summary>Ver las dos direcciones</summary>` con las dos, completas.

Es lo único que el sistema puede resolver solo sin suponer nada, y por eso es lo único que no pregunta.

**Lo que se propone** — `.campos__titulo`. Campos con valor **y con su procedencia escrita**, que es lo que los distingue de un campo vacío y de un dato heredado:

| Campo | Valor propuesto | `.campo__ayuda` |
|---|---|---|
| **Paquetería** | La de la ida, si expone retorno | De la guía de ida. Si no emite retorno, no aparece en la lista: manda lo que tu cuenta tenga registrado, no la costumbre. |
| **Peso y medidas** | Los de la ida | De la guía de ida. Lo que regresa casi nunca pesa lo mismo: falta el empaque, o vuelve una pieza de tres. |

**Lo que hay que decidir** — `.campos__titulo`. Campos **vacíos**, obligatorios, con su `.campo__error` cuando faltan:

| Campo | Por qué se vuelve a preguntar |
|---|---|
| **Motivo** | De la lista fija. No se deduce de nada de la ida |
| **Qué piezas regresan** | Una devolución parcial es lo normal |
| **Valor declarado** | `.campo__ayuda` El de la ida era $3,400 por la venta completa. Este es el de lo que regresa. |
| **Quién paga el flete de retorno** | Tu cuenta · Se descuenta del reembolso · El comprador |

El valor declarado es el que más caro sale de heredar en silencio, y por eso su ayuda nombra la trampa en vez de describir el campo: arrastrar el de la venta completa asegura de más y se paga de más.

**Los tres títulos hacen el trabajo que haría un color**, y sobreviven a una pantalla en blanco y negro, a un lector de pantalla y a quien no distingue dos verdes.

## 1.3 ter — Cuando el rastreo convierte la devolución

El rastreo **crea o convierte, nunca duplica**: antes de dar de alta un RTO busca una devolución abierta **de ese envío**. Si la hay, la convierte y conserva todo lo que capturó una persona. Para la interfaz eso significa tres cosas que dibujar: que el cambio se vea, que los dos porqués quepan sin pisarse, y que la ausencia de uno de ellos no se lea como un hueco.

### La franja de conversión

El registro cambió sin que nadie lo pidiera, y un cambio automático que no se ve es un cambio que nadie puede comprobar. Va en `.franja--editada` —algo cambió, no hay nada que decidir— en la cabeza del bloque, **con las dos fechas**:

> `.franja--editada` **La paquetería inició el retorno el 19 de septiembre**
> Estafeta lo reporta de regreso: destinatario ausente. Se conservó la devolución registrada el 17 de septiembre, con su motivo y sus piezas.
> `.boton--sutil.boton--chico` **Ver el rastreo del retorno**

**Las dos fechas van en la misma frase y en ese orden.** Primero la de la paquetería, que es lo que acaba de pasar y la razón de que la franja exista; después la del registro, que es lo que se conservó. Al revés se leería como si el sistema contara su propia historia antes que el hecho.

**Y dice qué se conservó, no solo que se conservó.** "Con su motivo y sus piezas" es lo que evita que alguien vuelva a capturar lo que ya estaba: un aviso que solo dice "se convirtió" obliga a abrir los campos uno por uno para comprobarlo.

**Cuando la devolución anterior estaba cerrada, no se convierte: se crea una nueva**, porque convertir un registro cerrado reescribiría una resolución que alguien ya firmó. Y esa nueva explica por qué es nueva antes de que nadie pregunte por qué hay dos:

> `.franja--editada` **La paquetería inició el retorno el 3 de octubre**
> Estafeta lo reporta de regreso: destinatario ausente. La devolución `DV-0031` de este envío ya estaba cerrada el 28 de septiembre, así que este es un registro nuevo.

### Los dos porqués, juntos y distinguibles

Van en un bloque propio del panel, **y el bloque solo existe cuando hay los dos**:

> `.campos__titulo` **Por qué regresa**
> `.apagado` Dos hechos distintos sobre el mismo paquete: el primero decide el reembolso, el segundo decide a quién se le reclama.
>
> `.dato` **Lo que pidió el cliente** — Arrepentimiento
> `.dato` **Lo que reportó Estafeta** — Destinatario ausente
> `.apagado.mono` Texto original: `Delivery exception — recipient not available, returning to shipper`

**Las etiquetas nombran a quien lo dijo, no al campo.** "Motivo" y "Causa del transportista" son dos rótulos de base de datos que hay que traducir al leerlos; "lo que pidió el cliente" y "lo que reportó Estafeta" dicen de dónde sale cada uno, que es exactamente la diferencia que hace que sean dos campos.

**El texto original va debajo, en segundo plano y dicho con su nombre**, igual que en los envíos detenidos: es lo que se cita al llamar a la paquetería, y al mismo peso que el motivo en castellano solo estorba.

**Y la línea de arriba se queda ahí para siempre**, no es una explicación de estreno: es la que impide que alguien "limpie" el registro dejando uno de los dos, que es el error que este modelo existe para evitar.

### Cuando no hay causa del transportista, no hay fila

En una devolución que no viene de un retorno —la mayoría— `causaTransportista` está vacío, y **vacío ahí no significa que falte un dato: significa que no aplica**. Ninguna paquetería ha reportado nada porque no tenía por qué.

Así que **la fila no se dibuja, y el bloque tampoco**. Con un solo porqué no hay pareja que explicar, así que desaparecen el `.campos__titulo` y su línea, y el motivo vuelve a ser lo que siempre fue: un `.dato` más del detalle.

> `.dato` **Motivo** — Producto dañado

**Ni "—", ni "Sin dato", ni una fila en gris.** Un campo vacío se lee como un dato que falta y empuja a ir a buscarlo; y "Sin registro" es la frase de la matriz de capacidades, que significa otra cosa y no se puede prestar. **La ausencia de una fila es lo único que no se puede confundir con un hueco.**

### La guía de retorno que ya estaba emitida

Si antes de la conversión se había emitido una guía de retorno, **no se pisa**: sigue emitida, sigue sin usar y sigue siendo dinero. Desaparecerla del registro no la desaparece de la factura.

> `.aviso--alerta` **La guía de retorno `JD01480000456` sigue emitida y sin usar**
> El paquete ya regresa por cuenta de Estafeta, así que esta guía no se va a usar. Si tu contrato cobra las guías emitidas, esta se te cobra.
> `.boton--sutil.boton--chico` **Cancelar la guía de retorno**

El botón sale de `CAPACIDADES.cancelaGuia` como todos: donde la paquetería no cancela o no hay registro de si lo hace, en su lugar va la `.instruccion` de 4.3. Y su costo, si se cobró, entra en la resta del cierre con su propio renglón (1.9): es el cargo que más fácil se pierde, porque nadie lo pidió dos veces y nadie lo espera.

### Lo que la conversión no toca, y se ve

**`origenDevolucion` se conserva**, porque el RTO cambió cómo regresa el paquete, no quién pidió que regresara. Y eso tiene que verse, o después de la conversión el mecanismo dirá "Retorno al remitente" y nadie podrá saber que hubo intención comercial antes:

> `.dato` **La registró** — El comerciante, el 17 de septiembre

En un RTO nacido de cero esa misma fila dice **"La paquetería, el 19 de septiembre"**, y el motivo comercial arranca en "Entrega fallida", que ya está en la lista fija y se puede corregir.

**La búsqueda es por envío, no por pedido.** Un pedido con dos guías puede regresar por separado, y cada guía tiene su devolución. En la tabla eso son dos filas con el mismo pedido, y por eso la primera columna nombra la guía de ida cuando el pedido tiene más de un envío (1.2). Sin ese dato, dos filas del mismo pedido se ven idénticas y la única forma de distinguirlas es abrirlas.

## 1.4 Emitir la guía de retorno, o no poder

El selector **no es el mismo control que el de un envío normal**, aunque se vea igual: reutiliza `.tarifas`, se dibuja leyendo `CAPACIDADES.guiaRetorno` y cada opción declara su modalidad en `.tarifa__meta`, **antes de elegir**:

> ( ) **DHL** · Guía de retorno en PDF
> Se manda al correo del comprador. Tiene que imprimirla. — **$164.00**
>
> ( ) **Estafeta** · Código en sucursal
> El comprador recibe un código y en el mostrador le imprimen la guía. Sin impresora en casa. — **$142.00**
>
> ( ) **FedEx** · Recolección en el domicilio del comprador
> Se programa una recolección en la dirección de entrega. — **$198.00**

Porque el comerciante decide sabiendo si el comprador va a tener que imprimir, y ese dato después ya no sirve de nada.

**El botón dice lo que va a pasar:** `Generar guía de retorno con DHL · $164.00`.

**Las que no aparecen se nombran, y las dos ausencias no se nombran igual.** Debajo de la lista, en `.apagado`:

> Estafeta no emite guías de retorno. Sin registro de si Paquetexpress y Redpack las emiten. — **Confirmar con Paquetexpress** · **Confirmar con Redpack**

Esconder la diferencia sin decirlo haría creer que la lista está completa. Y las dos frases llevan a acciones distintas.

**El selector se construye completo ahora, y funciona con cero opciones**, porque es genérico: lee la matriz y pinta lo que haya. Construirlo después obligaría a rehacer el bloque entero el día que una paquetería conteste.

## 1.5 El quinto mecanismo: la guía del comprador

**Cuando el selector sale vacío, el bloque no es una pantalla muerta.** Es donde vive el mecanismo que va a ser el más frecuente al principio:

> `.franja--pendiente` — **Ninguna de tus paqueterías emite guías de retorno**
> Sin registro de si DHL, FedEx y Estafeta las emiten. Paquetexpress no las emite.
> `.boton--sutil.boton--chico` **Confirmar con tus paqueterías**
>
> Dos acciones del mismo control y el mismo ancho mínimo, porque son un par:
> **Copiar dirección de origen** (`.boton--fantasma`) · **Ver teléfonos de atención** (`.boton--fantasma`)
>
> `.campos__titulo` **Cuando el comprador mande el paquete**
>
> `.campos--corto-largo`
> `.campo` **Paquetería** — `select` con las de `RASTREO_PUBLICO`
> `.campo` **Número de guía** — en `.mono`
> `.campo__ayuda` Hacen falta las dos: con el número solo no se puede rastrear nada.
>
> `.boton--primario.boton--chico` **Registrar guía del comprador**

Las dos juntas y no una: con las dos, el retorno se rastrea con el enlace público que ya existe, sin ninguna integración nueva.

**Este bloque también aparece cuando sí hay selector**, plegado en un `<details class="desplegable"><summary>El comprador ya lo mandó por su cuenta</summary>`. Porque puede pasar con emisión disponible, y desplegarlo siempre pondría dos caminos a la misma altura cuando solo uno es el bueno.

Al registrarla, el estado salta a **Con guía de retorno**, `via` queda nulo, el flete de retorno queda en **$0.00 para el comerciante** con la nota *"La pagó el comprador"*, y la guía se rastrea con `enlaceRastreo()`. Meter una guía que nosotros nunca emitimos ni pagamos en el mismo cajón que las que sí, mete en la conciliación un costo que no existe.

## 1.6 Marcar recibida

Diálogo del sistema. **Registra qué llegó, no quién lo recibió.**

> **Registrar lo que llegó de DV-0031**
>
> `.campo` **Fecha de recepción** — con el `.campo-fecha` propio
> `.campo--corto` **Piezas que llegaron** — `[ 1 ]` **de 2 esperadas**
> Tres `.marca-campo` de tipo radio, porque uno de muchos es un radio:
> ( ) Completa y en buen estado
> (•) Con faltante
> ( ) Dañada
> `.campo` **Nota** — `textarea` con `.campo__contador`
> `.campo__ayuda` Es lo que sostiene una nota de crédito parcial.
>
> Pie: **Cancelar** · **Registrar recepción**

No hay campo de quién, y no es un olvido: un campo necesita de dónde salir, y el producto no tiene modelo de usuarios. Cuando lo haya, el campo se agrega sin tocar nada más.

**El salto directo desde Autorizada.** En una devolución autorizada sin guía, el bloque ofrece las dos salidas a la misma altura, porque las dos son legítimas:

> **Registrar guía del comprador** (`.boton--fantasma.boton--chico`) · **Marcar recibida** (`.boton--fantasma.boton--chico`)

Sin esa segunda, el paquete que aparece en la bodega sin que nadie capturara nada deja el registro congelado para siempre, y una cola con registros muertos deja de leerse.

## 1.7 Devolución del canal de venta

La acción de emitir no se ofrece:

> `.franja--pendiente` — **La devolución de este pedido la administra Mercado Libre**
> La guía la emite el canal con su propia logística. Aquí queda el registro para que el costo del pedido cuadre.
>
> **Abrir en Mercado Libre** (`.boton--fantasma.boton--chico`) · **Registrar la resolución** (`.boton--sutil.boton--chico`)

Porque un botón que duplicaría una guía que el marketplace ya emitió crea dos paquetes y dos cobros.

## 1.8 El aviso de retorno, en Tracking

`excepciones.html` gana una pastilla y un filtro, no una pantalla.

En la columna **Estatus**, debajo del motivo, `.pastilla--mal` **"Va de regreso"**, **únicamente cuando la paquetería lo declaró con sus palabras**: `return to shipper scheduled`, `en proceso de retorno al remitente`. El texto original se conserva a la vista en `.linea__original`. Mostrarlo no es predecir, es traducir.

Un `.ficha-filtro` nuevo: **"Van de regreso"**.

Lo que gana el comerciante no es tiempo para evitarlo —ya no se puede evitar— sino saberlo antes de que la caja aparezca en la bodega.

**Y la acción de esa fila es "Ver la devolución", no "Registrar devolución".** Si la pastilla dice "Va de regreso" es porque la paquetería declaró el retorno, y eso es justo lo que dispara al rastreo a crear el registro o a convertir el que hubiera (1.3 ter). Cuando se llega a esa fila el registro ya existe, y ofrecer crearlo sería ofrecer el duplicado que el modelo acaba de cerrar.

**Lo que no existe:** el aviso de "va a regresar si este intento falla". Depende de `CAPACIDADES.intentosNumerados`, hoy sin registro en todas, y no se sustituye contando intentos por nuestra cuenta. Un contador nuestro presentado como dato de la paquetería es exactamente lo que el principio prohíbe, y el error es caro en las dos direcciones.

**Lo que tampoco existe:** "regresa en dos días", "te quedan 24 horas". Los plazos antes de devolver los sabe la paquetería.

## 1.9 Cerrar la devolución

> **¿Cerrar la devolución DV-0031?**
>
> `.campo` **Resolución** — Reembolso total · Reembolso parcial · Cambio · Nota de crédito · Rechazo tras revisión
> `.campo--corto` **Monto** · `.campo` **Fecha**
> `.campo` **Quién pagó el flete de retorno** — Tu cuenta · Se descuenta del reembolso · El comprador
>
> Un `<dl>` de `.dato`, que es la resta que sostiene la decisión:
>
> | | |
> |---|---|
> | Flete de ida, ya pagado | $189.00 |
> | Flete de retorno | $164.00 |
> | Cargo por retorno al remitente | *(ver abajo)* |
> | Guía de retorno emitida y sin usar | *(solo si la hubo)* |
> | **Costo del retorno** (`.dato--fuerte`) | **$353.00** |
> | Mercancía que regresa | $1,240.00 |
>
> Pie: **Conservarla abierta** (`.boton--sutil`) · **Cerrar devolución** (`.boton--primario`)

**El cargo del RTO se captura de la factura, no se estima.** Mientras no aparezca, la fila lo dice y ofrece capturarlo ahí mismo, porque mandar a alguien a otra pantalla a teclear una cifra que necesita aquí es partir la tarea en dos viajes:

> Cargo por retorno al remitente — `.apagado` Sin cargo en factura todavía. `.boton--sutil.boton--chico` **Capturar cargo**

Al capturarlo se escribe en `cargos: [{ tipo: "rto", monto, factura, nota }]` del envío original, que es lo que hace que deje de ser un cargo huérfano y empiece a sumar.

**El renglón de la guía emitida y sin usar solo aparece cuando la hubo**, que es el caso de una devolución convertida a RTO con guía ya emitida (1.3 ter). Es el cargo que más fácil se pierde: nadie lo pidió dos veces y nadie lo espera, y sin renglón propio la resta del cierre saldría más barata que la factura.

**El reembolso no se ejecuta aquí**, y el diálogo lo dice: *"El reembolso se registra, no se cobra: el dinero se mueve en tu canal de venta."*

## 1.10 Los textos exactos

**Estados vacíos**

Sin ninguna devolución nunca:
> **Todavía no hay ninguna devolución**
> Una devolución cuelga de su pedido y lleva su propio envío de regreso. Se registra desde el pedido, o entra sola cuando una paquetería reporta un retorno al remitente.
> `.boton--primario` **Registrar devolución**

Con filtros puestos:
> **Ninguna devolución coincide**
> Cambia el rango de fechas o quita los filtros.
> `.boton--primario` **Quitar filtros** · `.boton--sutil` **Ver todas**

**Error de carga**
> `.aviso--mal` No se pudo cargar la lista de devoluciones. Vuelve a intentarlo.

**Error al emitir**, reintentable:
> `.franja--pendiente` **Sin respuesta de DHL** · La petición excedió el tiempo de espera.
> El botón vuelve a decir `Generar guía de retorno con DHL · $164.00`.

**Error al emitir**, no reintentable:
> `.franja--pendiente` **DHL no tiene cobertura en 29320** · Reintentar no cambia nada. Estas son las otras paqueterías que sí emiten guía de retorno a ese código postal.
> Las `.tarifas` se repintan sin DHL, con la siguiente ya elegida.

**Cargando:** `.esqueleto` con la forma de seis filas de tabla. Nunca un girador genérico.

**Botones, todos verbo y objeto, el objeto en singular**

`Registrar devolución` · `Ver la devolución` · `Autorizar devolución` · `Rechazar devolución` · `Generar guía de retorno con DHL · $164.00` · `Registrar guía del comprador` · `Marcar recibida` · `Registrar recepción` · `Cerrar devolución` · `Registrar devolución recibida` · `Cancelar la guía de retorno` · `Copiar dirección de origen` · `Capturar cargo` · `Confirmar con Paquetexpress`

**Confirmaciones**

| Diálogo | Cancelar | Confirmar |
|---|---|---|
| ¿Rechazar la devolución DV-0031? | Conservarla abierta | Sí, rechazar |
| ¿Cerrar la devolución DV-0031? | Conservarla abierta | Cerrar devolución |
| ¿Cerrar sin retorno del producto? | Conservar la devolución abierta | Sí, cerrar sin retorno |

El rechazo pide motivo obligatorio antes de habilitar el botón, con `.campo__error`: *"Falta el motivo del rechazo."*

**Lista fija de motivos comerciales:** Producto equivocado · Producto dañado · No era lo esperado · Entrega fallida · Arrepentimiento · Garantía.

**La causa del transportista no tiene lista y no se teclea.** La escribe la paquetería y se guarda con sus palabras. Se muestra traducida cuando el rastreo la trae traducida y, debajo, el texto original con su nombre. Nadie la elige, nadie la corrige y nadie la borra: no es nuestra.

## 1.11 Componentes

**Se reutiliza:** `.pestanas` · `.filtros` · `.ficha-filtro` · `.rango-fechas` · `.tabla-caja` · `.pastilla--*` · `.metrica` · `.tarjeta__pie` · `.paginacion` · `.panel` con sus `.bloque` · `.franja--pendiente` / `--resuelto` / `--editada` · `.desplegable` · `.dato` y `.dato--fuerte` · `.tarifas` y `.tarifa` con la modalidad en `.tarifa__meta` · `.campos--corto-largo` · `.marca-campo` · `.campo-fecha` · `.dialogo` · `.vacio` · `.esqueleto` · `.linea` y `.linea__original` · `.cambio` · `.tarjeta-cifra` en Inicio.

**Se crea:** nada exclusivo. Usa `.instruccion` de la sección 0.

## 1.12 El recorrido completo

Tarea principal: **autorizar una devolución y dejarla en marcha el día en que ninguna paquetería emite retorno**, que es el caso real del lanzamiento.

1. Inicio muestra la tarjeta "2 devoluciones por autorizar". La tarjeta entera es el enlace.
2. Abre Pedidos en la pestaña Devoluciones, ya filtrada, con su `.ficha-filtro--quitable` diciendo qué filtro llegó puesto.
3. La fila de arriba es la más antigua sin moverse. Su botón dice **Autorizar**.
4. Pulsarlo abre el panel del pedido, no un diálogo: la decisión necesita ver los artículos y el total.
5. El bloque Devolución está desplegado, con la franja pendiente, las 2 de 5 piezas y los dos botones.
6. **Autorizar devolución.** El bloque se repinta: `.franja--editada` "Devolución autorizada" y, debajo, el selector de retorno.
7. El selector sale vacío y lo dice con precisión: *"Sin registro de si DHL, FedEx y Estafeta las emiten. Paquetexpress no las emite."* Con la acción para confirmarlo y los dos botones del par.
8. **Copiar dirección de origen.** Se la manda al comprador por fuera, que es como funciona hoy.
9. La fila de atrás dice "Autorizada · 0 días". A los siete días su pastilla pasa a `--aviso` y entra en la métrica de autorizadas sin movimiento.
10. Cuatro días después el comprador manda el número. Abre el pedido, captura paquetería y guía, **Registrar guía del comprador**. El estado pasa a "Con guía de retorno · Del comprador", el flete queda en $0.00 con su nota, y el regreso se rastrea con el enlace público.

---

# 2. Recolecciones automáticas

## 2.1 Dónde vive

**La regla vive en Configuración**, en una zona nueva llamada **RECOLECCIÓN**, la última de la pantalla. Cómo se llaman las cuatro zonas y por qué está en 3.1 bis: los rótulos dicen el paso de la cadena y los títulos de tarjeta dicen qué decide cada uno.

El subtítulo de Configuración ya lo dice literalmente: *"Qué hace el sistema por su cuenta, sin que nadie entre a Pedidos."* Pedir el camión solo es la última cosa que el sistema hace solo, después de revisar la dirección, elegir la caja y elegir la paquetería. **Las zonas quedan en el orden de la cadena**, que es como se lee:

1. **Entrada del pedido**
2. **Embalaje** *(función 3)*
3. **Paquetería**
4. **Recolección** *(esta función)*

**Lo que falla no vive en Configuración**, vive en `recolecciones.html` y en Inicio. Porque un camión que no llegó se reclama, no se configura, y ahí ya están el historial, el folio y la tabla de cumplimiento con la que se reclama.

**El calendario de días inhábiles vive en la ficha del origen**, en `origenes.html`, al lado de `horario`. Porque la ventana ya se valida contra el horario del origen: un festivo es el mismo dato —cuándo hay alguien en la bodega— con otra forma. Queda fuera de la primera versión, pero su sitio está decidido para que nadie lo busque en otro lado.

**No hay entrada nueva en el menú.** "Paqueterías solo es para conectar las paqueterías": una agenda de recolección es un criterio de operación, no una cuenta.

## 2.2 La pantalla — zona en Configuración

> `.zona__titulo` **RECOLECCIÓN**
>
> `.tarjeta__cabeza`
> **h2** Cuándo se pide cada recolección
> `.apagado` Una solicitud sale por cada origen y cada paquetería. No existe una solicitud que junte un paquete de DHL con uno de FedEx.

**La tabla.** `.tabla-caja`, columnas en este orden:

| # | Columna | Contenido |
|---|---|---|
| 1 | **Origen y paquetería** | `<b>Almacén Puebla · DHL</b>`; debajo, en `.apagado`, "Se pide directo" o "Se pide a Skydropx" |
| 2 | **Modo** | "Agenda" · `.pastilla--neutra` "Sin regla" |
| 3 | **Cuándo** | "Lunes a viernes, 10:00 a 14:00" |
| 4 | **Corte** | `.tabular` "08:00" |
| 5 | **Mínimo** | `.tabular`; "Sale siempre" cuando es cero |
| 6 | **Últimos 30 días** | "6 citas · 2 sin cumplir", con `.pastilla` de tono; "Sin citas" en `.apagado` |
| 7 | **Activa** | `.interruptor`, se aplica al pulsarlo |
| 8 | *(acciones)* | **Editar regla** (`.boton--fantasma.boton--chico`), y separada al extremo derecho con un `flex:1` de por medio, **Quitar regla** (`.boton--sutil.boton--chico`) |

**Solo se listan las parejas que han tenido envíos.** Con tres orígenes y cuatro paqueterías son hasta doce filas, no sesenta: la plataforma es un campo de la regla, no una tercera dimensión. Una lista de doce filas siempre llenas donde ocho nunca se usan es una lista que nadie lee; una de sesenta no se lee nunca.

**En el pie de la tarjeta**, porque es una acción menor de una zona sin encabezado propio: `<span>Solo aparecen las parejas que han tenido envíos.</span>` y `.boton--sutil.boton--chico` **Agregar pareja**.

**Tres fallas seguidas** se muestran en la propia fila, como una fila extra con `colspan` —una tabla, aunque haya grupos—:

> `.aviso--alerta` **Estafeta no se presentó el 13, el 17 y el 19 de septiembre en Almacén Puebla.**
> `.boton--fantasma.boton--chico` **Ver las tres citas** → abre Recolecciones ya filtrado por esa pareja y ese rango.

La regla **no se desactiva sola**: apagarla dejaría al comerciante sin recolección y sin aviso.

**Guías que esta regla no va a tomar**, también como fila extra, cuando la pareja tiene guías con otra plataforma:

> `.aviso--alerta` **4 guías de esta pareja se compraron en Skydropx y esta regla pide recolección directa. No entran en su solicitud.**
> `.boton--fantasma.boton--chico` **Ver las 4 guías** → Recolecciones, donde está la acción manual.

Es la consecuencia aceptada de que `via` sea un campo, y **se nombra**: una guía metida en una solicitud dirigida a la contraparte equivocada es una recolección que no va a ocurrir y un reclamo a quien no le toca.

## 2.3 El panel de la regla

Se abre desde "Editar regla" o desde "Agregar pareja". Mismo patrón que Plantillas: lista → `.panel`.

> `.panel__cabeza`
> **h2** Almacén Puebla · DHL
> `<p>` Horario del origen: 09:00 a 18:00.

**El modo se elige comparando**, porque un botón no es una decisión: tres `.marca-campo` de tipo radio, cada uno con su consecuencia debajo, **los tres visibles**, y dos deshabilitados en la primera versión con la razón escrita, porque lo que falta también se ve:

- (•) **Agenda** — Se solicita en días fijos de la semana, aunque haya pocas piezas.
- ( ) **Acumulación** — Se solicita al juntar un número de guías sin recolección. `.apagado` No entra en esta versión.
- ( ) **Ruta fija** — La paquetería pasa por contrato. No sale ninguna solicitud; la cita se registra para poder medir el cumplimiento. `.apagado` No entra en esta versión.

Esconderlos haría creer que el producto no los contempla; enseñarlos apagados dice qué viene.

**Los campos del modo agenda.** En `.campos`, nunca en un `style` de la pantalla, y con `align-items:start`:

siete casillas de día en fila · **Ventana** en `.campos--2` con dos `input[type=time]` · **Hora de corte** en `.campo--corto` · **Mínimo de piezas** en `.campo--corto` · **Días de anticipación** en `.campo--corto`.

**Se pide a** (`select`: Directo · Skydropx · T1 Envíos) aparece **solo si esa pareja ha tenido guías compradas por plataforma**. Quien no las tiene no lo ve nunca.

**Las ayudas de campo, textuales:**

| Campo | Ayuda |
|---|---|
| Ventana | Tiene que caber en el horario del origen: 09:00 a 18:00. |
| Hora de corte | Es cuando se congela la cuenta de piezas y sale la solicitud. Las guías generadas después entran a la recolección del día siguiente. |
| Mínimo de piezas | Si ese día no se junta el mínimo, no sale solicitud y el día se registra como "Sin piezas". Cero significa que sale siempre. |
| Días de anticipación | Hasta 5 días, que es lo que hemos visto funcionar con DHL. No está confirmado con la paquetería. |
| Se pide a | La solicitud va a quien vendió la guía, aunque quien recoja sea DHL. |

La ayuda del corte **cambia con el modo** cuando los otros dos entren: en agenda y acumulación es además el plazo para mandar la solicitud; en ruta fija no hay nada que mandar y solo congela la cuenta, porque la única razón de ese modo es poder exigir y una exigencia sin número es una impresión.

La ayuda de los días de anticipación **dice que es una propuesta nuestra y no un dato del transportista**, mientras `CAPACIDADES.diasAnticipacion` esté sin registro.

**Los hechos, mientras se escribe, no al guardar.** Debajo de los campos, en `.franja--editada`, **dos hechos y ninguna predicción**:

> **Ahora mismo hay 9 guías de DHL sin recolección en Almacén Puebla.**
> Con el corte en 08:00, las guías generadas después entran a la recolección del día siguiente.

La cifra sale del predicado `sin-recoleccion` de `PENDIENTES`, el mismo que se manda a la paquetería. Con dos predicados, un día la pantalla dice nueve y el camión llega por siete. Y no es un simulador: es lo que hay hoy, comprobable, no un resultado que nunca ocurrió.

**Y un tercer hecho, solo cuando la plataforma deja guías fuera**, mientras se elige "Se pide a":

> `.franja--pendiente` **4 de esas 9 guías se compraron en Skydropx.**
> Con "Se pide directo", esas 4 quedan fuera de la solicitud y se programan a mano.

No bloquea el guardado. Avisa antes de que duela, que es la única forma de que una restricción asumida no se descubra con un camión vacío.

**Validación**, con `.campo--error` y `.campo__error`:

- "La ventana tiene que caber en el horario del origen: 09:00 a 18:00."
- "El corte tiene que ser anterior al inicio de la ventana."
- "Elige al menos un día."

**El pie del panel**, cancelar a la izquierda de la confirmación:

- Regla existente: **Conservar la regla anterior** · **Guardar regla**
- Regla nueva: **Cancelar** · **Agregar regla**

## 2.4 Las guías que ninguna regla toma

Van en `recolecciones.html`, pestaña Programadas, **arriba de la agenda**, porque lo que exige una acción va antes que lo que ya está resuelto. La tarjeta solo existe cuando hay algo:

> `.tarjeta__cabeza`
> **h2** Guías sin recolección que ninguna regla toma
> `.apagado` Se programan a mano.
>
> Tabla: **Paquetería** · **Comprada en** · **Origen** · **Piezas** · *(acción)*
> `DHL` · `Skydropx` · `Almacén Puebla` · `4` · **Programar recolección de 4 piezas**
> Debajo, en `.apagado`: "La regla de Almacén Puebla · DHL pide recolección directa."

Nombradas, con su motivo y con la acción al lado. Nunca barridas a la solicitud equivocada.

## 2.5 Las dos cancelaciones

**Desactivar la regla** es nuestro, funciona siempre y es inmediato. Es el `.interruptor` de la columna 7. Al apagarlo, `.guardado`: *"Guardado. No saldrán más solicitudes de Almacén Puebla · DHL. Las recolecciones ya confirmadas no se tocan."* Porque cancelar nombra lo que conserva.

**Cancelar una recolección ya solicitada** sale de `CAPACIDADES.cancelaRecoleccion` y `corteCancelacion`, y decide qué hay en la fila de `recolecciones.html`:

| Valor de la matriz | Lo que hay en la fila |
|---|---|
| Sí, sin corte | `.boton--sutil.boton--chico` **Cancelar recolección** → el `.dialogo` que ya está en `sistema.html` |
| Sí, con corte, y no ha pasado | El mismo botón, y en `.apagado`: "Se puede cancelar hasta las 16:00." |
| Sí, con corte, y ya pasó | **Ver qué hacer**, y en `.apagado`: "El corte para cancelar fue a las 16:00." |
| No | **Ver qué hacer** |
| Sin registro | **Ver qué hacer** |

Los dos últimos se ven igual y no se nombran igual:

> `.instruccion--no`
> **Estafeta no cancela recolecciones desde aquí**
> **1.** Llama a Estafeta al 800 378 2338.
> **2.** Cita el folio `RC-8842`. — **Copiar folio**
> **3.** Esta recolección queda marcada como cancelación solicitada y se sigue contando hasta que el rastreo diga otra cosa.
>
> Pie: **Conservarla como está** (`.boton--sutil`) · **Marcar cancelación solicitada** (`.boton--fantasma`)

> `.instruccion--sin-registro`
> **Sin registro de si Paquetexpress cancela recolecciones desde aquí**
> **1.** Llama a Paquetexpress al 800 622 0000.
> **2.** Cita el folio `RC-8847`. — **Copiar folio**
> **3.** Esta recolección queda marcada como cancelación solicitada y se sigue contando hasta que el rastreo diga otra cosa.
> **4.** Si Paquetexpress sí cancela, márcalo en Paqueterías para que el botón aparezca la próxima vez. — **Confirmar con Paquetexpress**
>
> Pie: igual

El botón que cierra es **fantasma, no primario**, porque no completa la tarea: la completa una llamada telefónica. Un primario prometería un desenlace que no ocurre.

La fila pasa a `.pastilla--aviso` **"Cancelación solicitada"**, con `.apagado` debajo: *"Estafeta no ha confirmado la cancelación."* No se dice "sin registro": ahí no falta un dato de la matriz, falta una respuesta de la paquetería sobre esta recolección.

## 2.6 Cuando no llega, y cuando no hay piezas

**Sin piezas no es una falla.** El historial gana una fila con `.pastilla--neutra` **"Sin piezas"** y una nota: *"No salió solicitud: no había guías sin recolección al corte."* En `cumplimientoRecolecciones()` esas citas **no entran en el denominador**.

**No se recalcula el histórico y no hay nota de corte.** "Sin piezas" solo puede nacer de una regla automática disparándose en un día vacío, y todas las recolecciones que existen hoy se programaron a mano porque había algo que recoger. No hay nada que reinterpretar. El pie de la tabla afirma la regla de forma permanente, sin fecharla:

> El porcentaje solo cuenta citas con piezas. Una pieza se cuenta como recogida cuando su guía registra el primer movimiento en la paquetería.

Una nota del tipo "desde octubre se cuenta distinto" es arqueología a los seis meses.

**El incumplimiento bloquea trabajo hecho**, así que entra en Inicio por encima de las tarjetas, con `.franja-conexion`:

> **DHL no recogió 14 piezas del 21 de septiembre en Almacén Puebla.**
> `.boton--fantasma.boton--chico` **Programar recolección extraordinaria** · `.boton--sutil.boton--chico` **Ver la cita**

Registro neutro: "Recolecciones sin cumplir", no "citas que no pasaron".

**La extraordinaria llega prellenada** con las piezas que se quedaron, y el sistema no la programa solo: pedir un camión tiene costo en algunos contratos y una consecuencia comercial que el sistema no conoce. El botón del diálogo dice `Programar recolección de 14 piezas`.

Las guías no recogidas **siguen contando como sin recolección**, así que la siguiente ejecución de la regla las vuelve a incluir sola.

## 2.7 Estados

**Vacío, ninguna pareja con envíos:**
> **Todavía no hay guías de ninguna paquetería**
> Las reglas de recolección se arman sobre las parejas de origen y paquetería que ya han tenido envíos.
> `.boton--primario` **Ver Pedidos**

**Hay parejas pero ninguna regla:** no hay estado vacío. La tabla se pinta con todas las parejas en `.pastilla--neutra` "Sin regla", que es informativo y accionable a la vez.

**Cargando:** `.esqueleto` con la forma de cuatro filas.

**Error al guardar:** `.aviso--mal` No se pudo guardar la regla. Vuelve a intentarlo.

**Esto no lo soporta tu paquetería**, tres formas, todas leyendo la matriz:

1. *Cancelación:* la tabla de cinco filas de arriba. Y sobre la tabla de Configuración, en `.apagado`: *"Estafeta no cancela recolecciones desde aquí. Sin registro de si Paquetexpress las cancela."*
2. *Anticipación:* el campo se limita a lo ya visto funcionar y su ayuda lo dice como propuesta nuestra.
3. *Sumar piezas a una solicitud confirmada:* con `CAPACIDADES.sumaPiezas` afirmativo, en la fila de la recolección de hoy aparece `.boton--sutil.boton--chico` **Sumar 2 guías a esta recolección**. Con negativo o sin registro **no hay acción y sí hay una línea**: *"DHL no acepta sumar piezas a una solicitud confirmada. Estas 2 entran a la del día siguiente."* o *"Sin registro de si Redpack acepta sumar piezas. Estas 2 entran a la del día siguiente."* — esta última con su **Confirmar con Redpack**.

**Borrar un origen con reglas** enumera qué se lleva:
> **¿Eliminar Almacén Puebla?**
> Se quitan 3 reglas de recolección automática y quedan sin origen 2 recolecciones ya programadas, que habrá que rehacer. Las guías ya impresas conservan esta dirección.
> **Conservarla** · **Sí, eliminar**

## 2.8 Componentes

**Se reutiliza:** `.zona` y `.zona__titulo` · `.tarjeta` con cabeza y pie · `.tabla-caja` · `.pastilla--*` · `.interruptor` · `.marca-campo` · `.campo`, `.campo--corto`, `.campos--2`, `.campo__ayuda`, `.campo__error` · `.panel` · `.franja--editada` / `--pendiente` · `.aviso--alerta` / `--info` / `--mal` · `.guardado` · `.dialogo` · `.vacio` · `.franja-conexion` en Inicio · `.boton--*`.

**Se crea:** nada. Usa `.instruccion` con sus dos modificadores, de la sección 0.

Una nota sobre `.franja-conexion`: su nombre habla del objeto y no del papel, que es "algo que bloquea trabajo hecho". Se reutiliza tal cual; si el equipo prefiere, el alias correcto sería `.franja-bloqueo`, pero no vale un cambio de clase solo por eso.

## 2.9 El recorrido completo

Tarea principal: **dejar de pedir a mano la recolección de DHL en Almacén Puebla.**

1. Configuración, hasta abajo, zona **Recolección**, tarjeta "Cuándo se pide cada recolección".
2. La tabla lista cinco parejas. "Almacén Puebla · DHL" dice "Sin regla" y "22 citas · 1 sin cumplir".
3. **Editar regla** abre el panel. La cabeza recuerda el horario del origen.
4. **Agenda** viene elegido; los otros dos modos se ven apagados con su razón.
5. Marca lunes a viernes. La ventana se propone con el horario del origen y la ajusta a 10:00 – 14:00. El corte se propone dos horas antes, 08:00.
6. Mientras escribe, la franja dice los dos hechos. Y como la pareja tiene guías de Skydropx, un tercero: 4 de las 9 quedan fuera con "Se pide directo".
7. Pone mínimo 3 y deja "Se pide directo", asumiendo esas 4.
8. **Guardar regla.** La fila se repinta y `.guardado` dice: *"Guardado. Se solicitará recolección de lunes a viernes, con corte a las 08:00, a partir de 3 piezas."*
9. En Recolecciones, arriba de la agenda, aparece la tarjeta con esas 4 guías de Skydropx y su acción manual. Nombradas, no perdidas.

---

# 3. Reglas de embalaje

## 3.1 Dónde vive

**Configuración, en la segunda zona de la pantalla**, justo después de la entrada del pedido y antes de la de paquetería, porque la caja se decide antes que el precio y el orden de las zonas es el orden de la cadena.

Por qué Configuración y no Plantillas: Plantillas contesta *"qué cajas uso y por cuánto me cobran"*; la regla contesta *"qué caja se usa en qué pedido"*, que es una decisión que el sistema toma solo. Agrupar por pregunta, no por sistema. Y es donde ese ajuste ya vive hoy, en forma de un desplegable.

**El desplegable "Con la plantilla" se retira** de la primera zona y se sustituye por una línea:

> La caja sale de tus **reglas de embalaje**, más abajo en esta pantalla. `<a>`

Porque dos sitios donde elegir la caja son dos sitios que un día no van a coincidir, y el que manda tiene que ser uno.

**No hay entrada nueva en el menú.**

## 3.1 bis — Cómo se llaman las cuatro zonas de Configuración

Esta pantalla acabó con **dos listas arrastrables llamadas casi igual** —"Tu orden de preferencia" y "Tu orden de reglas"— y se leen como la misma cosa. No lo son: una decide con qué paquetería sale el pedido y la otra en qué caja va.

**El problema no es el adjetivo: es que ninguna de las dos decía qué decide.** Se parecen tanto porque **son el mismo patrón —lista ordenada, gana la primera que se cumple, motivo por fila, arrastre y flechas— aplicado a dos preguntas distintas**. Cuando el mecanismo es idéntico, lo único que puede distinguirlas es la pregunta, y entonces la pregunta tiene que estar en el título.

**Y tiene que estar en el título de la tarjeta, no en el de la zona.** `.zona__titulo` es 11px, en mayúsculas, con `--muted` y mucho espaciado: es un separador, no un encabezado. Lo que se lee al llegar es el `h2` de 15px de la tarjeta. Poner la pregunta en el rótulo pequeño y el mecanismo en el grande era tener la información al revés.

**Las zonas pasan a ser cuatro sustantivos**, uno por paso de la cadena, sin una sola palabra compartida entre ellos:

| Antes | Ahora |
|---|---|
| CUANDO ENTRA UN PEDIDO PAGADO | **ENTRADA DEL PEDIDO** |
| CON QUÉ CAJA SALE CADA PEDIDO | **EMBALAJE** |
| QUÉ PAQUETERÍA SE ELIGE | **PAQUETERÍA** |
| CUANDO HAY GUÍAS SIN RECOGER | **RECOLECCIÓN** |

Cuatro nombres en la misma gramática, en el orden en que ocurren, que es como se lee la pantalla. Es además la forma en que ya se usa `.zona__titulo` en el resto del producto —"Tu operación", "Se pueden conectar"—: una etiqueta de sección, no una frase.

**Los títulos de tarjeta pasan a decir qué decide cada uno:**

| Zona | Tarjeta | Título |
|---|---|---|
| Entrada del pedido | *(la única)* | **Qué corre solo cuando el pedido se paga** |
| Embalaje | Vetos | **Nunca en esta caja** |
| Embalaje | La lista ordenada | **En qué caja va cada pedido** |
| Embalaje | El tope | **Cuándo pasa a revisión manual** |
| Paquetería | La lista ordenada | **Con qué paquetería sale cada pedido** |
| Paquetería | La regla de seguridad | **Cuándo se sustituye la paquetería preferida** |
| Recolección | La tabla de parejas | **Cuándo se pide cada recolección** |

Las dos que chocaban quedan **"En qué caja va cada pedido"** y **"Con qué paquetería sale cada pedido"**. Comparten "cada pedido" al final, que es el sujeto y de verdad es el mismo; lo que las distingue —la caja y la paquetería— va al principio, que es donde cae la vista. Antes compartían el principio, "Tu orden de", y se distinguían al final por dos palabras abstractas.

Y ninguno de los siete títulos repite el rótulo de su zona: el rótulo dice cuándo pasa, el título dice qué se decide.

**No toca partir Configuración en pestañas todavía, y conviene decir por qué**, porque la tentación crece con cada zona:

- El PM fijó el corte en la quinta zona. Hay cuatro.
- `sistema.html` reserva las pestañas para **vistas del mismo objeto**. Estas cuatro zonas no son cuatro vistas de una cosa: son cuatro pasos de un proceso, y un proceso se lee en orden. Partirlo en pestañas convierte una secuencia en un menú de opciones paralelas, que es justo lo que no es.
- La pantalla existe para contestar *"qué hace el sistema por su cuenta"*. Con pestañas, tres cuartas partes de esa respuesta quedan escondidas detrás de un clic, y la pregunta se contesta mal.
- Y lo que el dueño reportó lo arregla el renombrado. Partir la pantalla es un cambio mayor que no toca el defecto.

Lo que sí deja resuelto este renombrado es **el día que toque**: las pestañas del PM son **Entrada · Envío · Recolección**, y las cuatro zonas ya se llaman así. El corte futuro es agrupar Embalaje y Paquetería bajo Envío —las dos deciden cómo sale el paquete— y mover dos rótulos. No hay nada que reescribir.

## 3.2 La pantalla

> `.zona__titulo` **EMBALAJE**

Tres tarjetas dentro de la zona, en el orden en que se evalúa.

### Tarjeta 1 — Nunca en esta caja

> `.tarjeta__cabeza`
> **h2** Nunca en esta caja
> `.apagado` Se revisa antes que el orden de abajo y descarta plantillas, incluida la de la regla por defecto.

Filas cortas, no una tabla: son pocas y cada una es una frase. **Y la fila nombra el producto, no su clave**: la clave va debajo, en pequeño, para confirmar.

> `.dato` — **Si el pedido contiene** **Juego de 6 copas** **→ nunca** Sobre
> `.apagado.mono` `MON-CRI-6`
> `.boton--sutil.boton--chico` **Quitar veto**

Pie: `.boton--sutil.boton--chico` **Agregar veto**, que abre un `.dialogo` con **el mismo buscador de productos de 3.3** y el `select` de caja:

> **Agregar veto**
> `.campo` **Producto** — el buscador
> `.campo` **Nunca usar** — `select` de plantillas
> Pie: **Cancelar** · **Agregar veto**

El buscador es el mismo control y el mismo dato en los dos sitios. Dos maneras de elegir el mismo producto en la misma pantalla serían dos maneras de escribirlo mal.

**Quitar un veto pide confirmación**, aunque sea una fila corta. Es lo único que protege un producto frágil y lo quitaría un clic de más, así que borrar dice qué se lleva:

> **¿Quitar el veto del juego de 6 copas?**
> A partir de ahora, un pedido con `MON-CRI-6` puede salir en Sobre. Hoy ese veto manda 3 pedidos al mes a revisión manual.
> **Conservar el veto** · **Sí, quitar**

Cuando no hay ninguno, una sola línea en `.apagado`: *"Ningún producto tiene caja prohibida."* No un `.vacio` entero: un veto ausente no bloquea nada, y un hueco decorado donde no falta nada es ruido.

El veto es una lista aparte y no una fila más del orden **porque no asigna caja**. Una fila con número de puesto que no asigna nada hace que el número mienta.

**El veto gana sobre la regla por defecto**, y la cabeza de la tarjeta lo dice sin rodeos, porque es lo que sorprende: un hecho físico gana sobre una comodidad administrativa. Qué pasa entonces está en 3.4.

### Tarjeta 2 — En qué caja va cada pedido

> `.tarjeta__cabeza`
> **h2** En qué caja va cada pedido
> `.apagado` Se recorre de arriba abajo: gana la primera que se cumple, así que lo específico va arriba y lo general abajo. `.solo-raton` Arrastra una regla para cambiar su puesto, o muévela con las flechas. `.solo-tacto` Cambia su puesto con las flechas.

El mismo mecanismo que el orden de paqueterías, porque es el mismo tipo de criterio humano y un segundo modelo mental para el mismo problema es un modelo de más.

**"Lo específico arriba, lo general abajo" va en la cabeza de la tarjeta, no en la ayuda de un campo.** No es una recomendación de estilo: es aritmética del orden. «Pedidos de una pieza» cubre todo pedido de una pieza, así que «Ventilador solo» colocada debajo no puede ganar jamás; y «Pedido caro» colocada encima de «Cristalería acompañada» manda las copas a la caja que su propio motivo dice que las rompió tres veces. Sin la frase a la vista, alguien sube la regla general dentro de seis meses con el argumento razonable de que cubre más casos.

Lo que la pantalla hace además de decirlo: avisa al guardar (3.3) y avisa en la fila cuando ya pasó (más abajo). La frase enseña, el aviso corrige.

`.orden__cabecera`: *(asa)* · *(puesto)* · **Regla** · **Caja** · **Motivo** · *(mover)*

Cada `.orden__fila` de `.orden.orden--reglas`:

- `.orden__asa` con `draggable`: solo el asa arranca el arrastre.
- `.orden__puesto`.
- `.orden__quien`: `<b>` el nombre de la regla, y debajo sus condiciones como `.condicion` en línea:
  `Cantidad 1 a 3 piezas` · `Contiene MON-VEN-16` · `Destino foráneo`
- **Caja**: el nombre de la plantilla y debajo, en `.apagado`, sus medidas: `25 × 20 × 15 cm`.
- `.orden__porque`: el `textarea` de Motivo, igual que en paqueterías, que crece con el texto.
- `.orden__mover`: ↑ ↓, que son el camino del teclado y del dedo.

### Las dos cifras de una regla, y por qué no se parecen

Una regla enseña dos números sobre el mismo periodo, y **si comparten sustantivo se leen como una sola medición mal hecha**. Se separan por el sustantivo y por el tiempo verbal, nunca con una nota al pie.

| | Dónde | Frase exacta | Para qué |
|---|---|---|---|
| **Lo que ha cobrado** | En la fila, en `.cobro` | *"Con esta regla han salido 9 guías en los últimos 30 días."* | Saber si la regla cuesta dinero |
| **Lo que alcanza** | En el panel de edición, en `.franja--editada` | *"Sobre los pedidos de hoy, esta condición alcanza a 1 de 40."* | Saber si la regla hace lo que se cree |

**La primera nunca menciona pedidos. La segunda nunca menciona guías ni dinero.** Es la única disciplina que impide que vuelvan a pelearse.

Y **debajo de la fila, a lo ancho, lo que esa regla ha cobrado**, en el componente nuevo `.cobro`:

> **Con esta regla han salido 9 guías en los últimos 30 días. En 4 se cobró por volumen, no por peso. Diferencia acumulada: $612.**
> Con Caja chica en vez de Caja mediana, esas 4 guías habrían costado $188 menos.
> `.boton--sutil.boton--chico` **Cambiar la caja de esta regla**

El sistema **no la cambia**. Lo dice, y lo dice en dinero, porque una sugerencia vale lo que ahorra. Es el mismo principio que "la preferida manda".

**Las cifras están a la escala del prototipo a propósito.** Un pie que dice 214 guías en una pantalla de 40 pedidos se contradice a la vista, y el aviso general de datos de ejemplo no salva dos números que se pelean dentro de la misma tarjeta. El histórico de ejemplo se dimensiona contra los pedidos que hay: decenas, no centenas.

Cuando `CAPACIDADES.divisorVolumetrico` esté sin registro, la cifra se marca: *"Calculado con divisor 5000, sin registro del de la paquetería."* El divisor cambia el precio de todas las guías, y presentarlo como dato del transportista sin haberlo confirmado es inventar la cifra que más importa. **El divisor que se usa es el de la paquetería con la que salieron esas guías**, no el de una fija: el día que una difiera, una cifra calculada con la de otra es una cifra de otra.

Cuando la regla nunca ha salido, el `.cobro` lo dice igual, porque un silencio y un cero no se distinguen: *"Con esta regla no ha salido ninguna guía en los últimos 30 días."* Y una regla recién creada dice *"Creada hoy: todavía no ha salido ninguna guía."*, que es un hecho distinto del anterior.

**Regla muerta — va en la fila, no dentro del panel de edición.** El dato se calcula igual para las dos partes, y dejarlo solo dentro de "Editar" obliga a abrir las siete reglas una por una para enterarse de la única que no funciona:

> `.aviso--alerta` **Esta regla no ha ganado ninguna vez: «Pedidos de una pieza», en el puesto 4, ya cubre sus condiciones.**
> `.boton--fantasma.boton--chico` **Subirla sobre «Pedidos de una pieza»**

El botón nombra a la regla que se la come, no un número de puesto: el puesto cambia en cuanto alguien mueve cualquier fila, y una acción que dice "Subirla al puesto 1" envejece en el primer arrastre.

El aviso va **dentro de la fila y encima del `.cobro`**, porque contesta la pregunta que el `.cobro` deja abierta: el `.cobro` dice que no ha salido ninguna guía, y el aviso dice por qué.

**Condición que no se puede evaluar:**

> `.aviso--alerta` **El SKU `MON-VEN-61` no aparece en ningún pedido de los últimos 30 días. Esta regla se salta y el pedido pasa a la siguiente.**

Una condición que no se puede evaluar nunca se da por cumplida. Y la regla no se desactiva sola, porque el SKU puede volver.

**Regla desactivada.** El estado tiene que verse en la lista o no existe: junto al nombre, `.pastilla--neutra` **"Desactivada"**, sus condiciones en `.condicion--sin-dato` y, en el `.cobro`, *"Desactivada: no participa en el orden."* No cuenta en el porcentaje de la regla por defecto.

**La última fila es "Por defecto"**, con `.orden__fila--defecto`: sin asa, sin flechas y sin eliminar.

> **Por defecto** — Cualquier pedido que no haya ganado arriba.
> Caja: *(select)* · Motivo: *(textarea)*
> `.cobro` — **Con esta regla han salido 7 de las 39 guías de los últimos 30 días: el 18 %.**

La cifra lleva tono: `--aviso` a partir del 30 %, `--mal` a partir del 50 %. Si más de la mitad cae al final de la lista, las reglas de arriba no sirven, y eso va en la pantalla de reglas, no escondido en un informe.

Pie: `<span>39 guías con reglas en los últimos 30 días</span>` y `.boton--sutil.boton--chico` **Agregar regla**.

### Tarjeta 3 — Cuándo pasa a revisión manual

> `.campo--corto` **Pasar a revisión manual cuando el peso del pedido supere el de la plantilla por** `[ 3 ]` **veces**
> `.campo__ayuda` Un pedido que no cabe en su caja se paga dos veces: el sobrepeso y la reexpedición. Este tope solo se puede evaluar en los pedidos que traen peso del canal; los demás no se comprueban.
>
> `.apagado` En los últimos 30 días, 1 pedido pasó a revisión manual por este tope y 2 por un veto. `<a>` **Verlos en Pedidos** `</a>`

El ancho del campo dice cuánto escribir: recibe una cifra, así que se acota. Y la ayuda dice la verdad incómoda: sin catálogo con peso, el tope casi no dispara, y callarlo haría pensar que protege más de lo que protege.

## 3.3 El panel de la regla

> `.panel__cabeza` **h2** Editar regla · *(o)* Nueva regla

`.campo` **Nombre de la regla** — ayuda: *"Se lee en la lista y queda anotado en cada guía que salga con ella."*

`.campos__titulo` **Se cumple cuando**, y debajo una nota fija:

> Todas las condiciones marcadas tienen que cumplirse. Para una alternativa, se escribe otra regla.

Porque una condición con Y y O mezclados obliga a pensar en paréntesis, y nadie que empaca cajas debe tener que pensar en paréntesis.

**Cinco condiciones en esta versión**, cada una en su `.marca-campo` que abre sus campos:

| Condición | Campos | Ayuda |
|---|---|---|
| **Cantidad de productos** | de `[ ]` a `[ ]` piezas | Cuenta piezas, no líneas del pedido. |
| **Costo del pedido** | de `$[ ]` a `$[ ]` | |
| **Contiene un producto** | **El buscador de productos** · y además de `[ ]` a `[ ]` piezas de cualquier otro artículo | Sirve para decir "el producto grande solo" o "el producto grande acompañado". |
| **Canal de venta** | casillas con los canales conectados | Mercado Libre y Amazon tienen requisitos de empaque propios. |
| **Destino** | casillas: Local · Foráneo · Zona extendida | |

Y la sexta, visible y apagada, porque lo que falta también se ve:

> `.marca-campo[disabled]` **Peso del pedido**
> `.campo__ayuda` Hace falta un catálogo con el peso por SKU. Tus canales reportan el SKU, pero no el peso. No entra en esta versión.

### El buscador de productos

Teclear `MON-CRI-6` de memoria es pedirle a alguien que recuerde una clave, y un SKU mal tecleado **no falla: simplemente no se cumple nunca**. Es el peor tipo de error, porque no hace ruido. Así que se busca y se elige.

**De dónde salen los productos: de las líneas de los pedidos, que es el único sitio donde existen.** No hay catálogo, y el buscador no finge que lo hay. Busca sobre `productosVistos()`, derivado de los artículos de todos los pedidos que el sistema tiene: `{ sku, nombre, pedidos, ultimaFecha }`. **No se limita a treinta días**: una lista de la que hay que elegir tiene que ser lo más completa posible, y un producto de temporada que desapareció el mes pasado sigue siendo un producto. La ventana solo decide el dato de uso que cada resultado enseña, que es lo que deja juzgar si sigue vivo.

**El campo y su panel:**

> `.campo` **Producto**
> `.buscador-ficha` — `input type="search"`, `placeholder="Busca por nombre o SKU"`
> `.campo__ayuda` Se busca entre los productos que han aparecido en tus pedidos.

Al escribir, `.buscador-ficha__panel` flotante con hasta ocho resultados. Cada `.producto` lleva tres cosas y ninguna más:

> **Juego de 6 copas**
> `.producto__sku` `MON-CRI-6` · `.producto__uso` 4 pedidos · el último el 18 de septiembre

El nombre identifica, el SKU confirma y el uso dice si el producto sigue vivo. Sin catálogo, **el uso es lo único que distingue el producto que vendes hoy del que vendiste una vez hace un año**, y es la diferencia que decide si una regla va a ganar alguna vez.

Se busca **por nombre y por SKU a la vez**, porque quien tiene la caja delante teclea el SKU y quien no, teclea el nombre. Y **sin acentos en los dos lados**, como el resto del producto: nadie escribe "Cerámica" en un buscador.

**Elegido, el campo enseña el producto, no su clave:**

> `.producto--elegido` **Juego de 6 copas** `.mono.apagado` `MON-CRI-6` — `.boton--sutil.boton--chico` **Cambiar producto**

**Un producto por condición.** Si hacen falta dos, se escriben dos reglas: es la misma razón por la que las condiciones se unen con Y y nunca con O.

### Cuando el producto no aparece

Es el caso que decide si este buscador sirve. Un comerciante **vende cosas que todavía no ha vendido**: un producto nuevo, uno de temporada que empieza, uno que llega la semana que viene. La salida no puede ser "no existe".

> `.buscador-ficha__vacio`
> **Ningún pedido trae todavía un producto que se llame así**
> `.boton--fantasma.boton--chico` **Usar "MON-VEN-61" como SKU**

**Sí se puede seguir escribiendo un SKU a mano, y deja de ser el camino por defecto para ser una decisión con nombre.** Quien lo elige está diciendo "este producto existe aunque no lo hayan pedido todavía", que es una afirmación legítima y distinta de un dedazo. El botón repite entre comillas lo que se escribió, para que un `MON-VEN-61` tecleado en vez de `MON-VEN-16` se vea antes de aceptarlo, no un mes después.

El botón solo aparece cuando lo escrito **tiene forma de SKU** —sin espacios, con al menos un guion o un número—. Con "copas" escrito y ningún resultado, ofrecer "Usar «copas» como SKU" sería convertir una búsqueda fallida en una regla rota.

Un producto elegido así se marca en el campo y **sigue marcado en la lista de reglas**, hasta que aparezca en un pedido:

> `.producto--elegido.producto--sin-ver` `.mono` `MON-VEN-61` — `.apagado` Sin pedidos todavía

Y en la fila de la regla, el `.aviso--alerta` que ya existe: *"El SKU `MON-VEN-61` no aparece en ningún pedido de los últimos 30 días. Esta regla se salta y el pedido pasa a la siguiente."* La marca desaparece sola el día que el producto entre en un pedido. **Nadie tiene que volver a tocar la regla: lo que estaba mal escrito sigue marcado y lo que solo era nuevo se cura solo.**

### Dónde más sirve el mismo buscador

El veto usa el mismo dato y lleva el mismo control (3.2, tarjeta 1). Y hay dos sitios donde el mismo componente encajaría sin cambiarlo: **filtrar Pedidos por producto** —hoy solo se busca por pedido, cliente o destino— y el día que exista catálogo, **la misma caja con una fuente más completa**, porque lo que cambia entonces es de dónde salen las filas, no cómo se eligen. Ninguno de los dos entra ahora; se anotan para que el componente se construya sabiendo que va a viajar.

`.campo` **Caja** — `select` de plantillas, cada opción con sus medidas: `Caja chica — 25 × 20 × 15 cm`.

`.campo` **Motivo** — `textarea`. Ayuda: *"Dentro de seis meses, esto es lo que impide que alguien borre la regla que existe por un producto que se rompió tres veces."*

**Los hechos, mientras se escribe. Hablan de pedidos y en presente, nunca de guías ni de dinero:**

> `.franja--editada`
> **Sobre los pedidos de hoy, esta condición alcanza a 12 de 40.** `<a>` **Verlos** `</a>`
> A 8 de esos 12 los toma antes «Pedidos de una pieza», en el puesto 4. `<a>` **Ver esos 8** `</a>`

**Las dos cifras son enlaces a los pedidos que cuentan**, y eso es lo que las separa de un probador. `sistema.html` prohíbe el simulador porque enseña un resultado que nadie puede comprobar; un número que se abre y deja la tabla de Pedidos filtrada con esos doce delante no enseña un resultado: enseña el conjunto. Se puede contar a mano.

El enlace abre Pedidos en otra pestaña con su `.ficha-filtro--quitable` diciendo de dónde vino el filtro —*"Cumplen «Pedidos de una pieza»"*— para que cerrar el panel de la regla no sea el precio de mirar.

**Con el formulario vacío no se dice nada.** Una regla nueva sin ninguna condición marcada alcanzaría a los 40 pedidos y listaría cinco reglas que se los llevan: es correcto y es ruido delante de un formulario en blanco. La franja aparece con la primera condición marcada.

**Y el foco al abrir cae en "Nombre de la regla"**, no en el `<dialog>`. Abrir un formulario y tener que buscar su primer campo es un viaje de más en la tarea que más se repite en esta pantalla.

**Una regla sin ninguna condición no se guarda.** Se cumpliría siempre, se leería igual que «Por defecto» —dos filas con la misma frase, una con número y otra con guion— y dejaría a la de por defecto sin poder ganar nunca:

> `.campo__error` Falta marcar al menos una condición. Una regla sin condiciones se cumple siempre y deja sin efecto a «Por defecto».

**Pie:** **Conservar la regla anterior** · **Guardar regla**. En una regla nueva: **Cancelar** · **Agregar regla**.

**Al guardar, si la regla queda debajo de una que ya la cubre, se dice en el acto** y no se descubre a los treinta días con el `.cobro` en cero:

> `.aviso--alerta` **«Pedidos de una pieza», en el puesto 4, ya cubre estas condiciones: esta regla no va a ganar nunca.**
> `.boton--fantasma.boton--chico` **Colocarla encima de «Pedidos de una pieza»**

No bloquea el guardado: el comerciante puede querer escribirla ahora y ordenarla después. Pero no se guarda en silencio.

## 3.4 Revisión manual: una cola, dos motivos

Hay exactamente dos razones por las que el sistema no elige caja, y **las dos terminan en el mismo sitio**, que es Pedidos filtrado, no una pantalla nueva. Antes de construir una cola hay que mirar si el trabajo ya tiene casa.

**El orden de evaluación es uno y está fijo**, y de él sale qué motivo lleva escrito cada fila:

1. **Medidas del canal.** Si el pedido ya las trae, mandan y no se evalúa nada más.
2. **Vetos.** Descartan plantillas.
3. **El orden de reglas.** Gana la primera que se cumple con una plantilla que ningún veto descartó.
4. **Tope de peso.** Sobre la plantilla que salió del paso 3.

**Un pedido que cae en el paso 2 nunca llega al paso 4**: se queda sin caja antes de que haya peso que comparar. Los dos motivos no se mezclan nunca en la misma fila, y por eso cada fila dice cuál de los dos la mandó ahí.

En `PENDIENTES`, una entrada nueva: `revision-manual`, del grupo `problema`, etiqueta **"Pedidos en revisión manual"**.

En la tabla de Pedidos, la celda **Envío** de esas filas:

> `.pastilla--aviso` **Revisión manual**
> `.apagado` El juego de 6 copas no puede ir en Sobre, y Sobre es la caja de la regla por defecto.

o bien:

> `.pastilla--aviso` **Revisión manual**
> `.apagado` El pedido pesa 17.5 kg y Caja chica pesa 1.5. Supera el tope de 3 veces.

**El motivo se escribe entero, con todas las cajas que el veto quitó, no con la última.** Un producto puede tener más de un veto, y nombrar una caja cuando hay dos bloqueadas manda al operador a un panel que no se parece a lo que leyó:

> `.apagado` La pantalla de 55 pulgadas no puede ir en Sobre ni en Caja chica, y no queda ninguna otra que le asigne una regla.

**El motivo va escrito en la fila y no hay filtro por motivo.** Con dos motivos y uno de ellos casi sin ocurrir en esta versión, un `select` sería un control con una sola opción útil. Lo que sostiene la vista es la frase en cada fila.

**La antigüedad de estos pedidos se cuenta desde que la regla falló, no desde que entró el pedido.** Es el mismo criterio que ya está escrito para los detenidos: se cuenta desde el último hecho real que hay. Con el otro, un pedido de hace tres días aparecería como urgente en su primer minuto en la cola.

En el panel del pedido, el bloque Envío arranca con la franja y con la caja ya editable, porque revisión manual quiere decir exactamente eso: elígela tú.

> `.franja--pendiente` **Ninguna caja quedó disponible**
> La pantalla de 55 pulgadas no puede ir en Sobre ni en Caja chica. Sobre es la caja de la regla por defecto.
> `.boton--sutil.boton--chico` **Ver los vetos**
>
> Y debajo, el `select` de Caja, con **todas** las cajas vetadas deshabilitadas y cada una con su motivo en su `title`.

El plural del botón y el de la frase salen del número de vetos que de verdad aplican: con uno dicen "Ver el veto" y nombran una caja.

**Un veto no se puede saltar desde el panel.** Si el comerciante quiere esa caja, quita el veto, que es donde el veto se decide. Una prohibición que se puede ignorar en el sitio donde estorba deja de ser una prohibición.

## 3.5 Estados

**Vacío, solo existe la regla por defecto.** No es una pantalla en blanco: es una lista de uno. Debajo de la fila:

> `.aviso--info` Todas las guías automáticas salen con **Caja chica**. Una regla arriba de la de por defecto cambia eso para los pedidos que la cumplan.
> `.boton--primario.boton--chico` **Agregar la primera regla**

**Vacío de verdad, sin ninguna plantilla.** Aquí sí, porque sin caja no hay regla posible:

> **No hay ninguna plantilla de paquete**
> Una regla de embalaje asigna una caja, y todavía no hay ninguna caja guardada.
> `.boton--primario` **Agregar plantilla** → `plantillas.html`

**El canal no reporta SKU.** Las condiciones que lo necesitan —"contiene un producto" y los vetos— salen deshabilitadas con la razón a la vista y con a dónde ir:

> `.marca-campo[disabled]` **Contiene un producto**
> `.campo__ayuda` TiendaNube no reporta el SKU en la línea del pedido. Sin ese dato la condición no se puede evaluar.
> `.boton--sutil.boton--chico` **Ver Canales de venta**

Esconderlas haría creer que no existen; enseñarlas apagadas dice qué falta y dónde se consigue.

**El pedido ya trae peso y medidas del canal.** Mandan los del pedido y no se aplica ninguna regla. En el panel, junto a la caja: *"Peso y medidas del pedido, reportados por Shopify. Las reglas de embalaje no se aplican."* La guía queda marcada con el origen del dato.

**Cargando:** `.esqueleto` con la forma de tres filas del orden.

**Error al guardar:** `.aviso--mal` No se pudo guardar la regla. Vuelve a intentarlo.

**Esto no lo soporta tu paquetería.** Las medidas y el peso máximos por servicio **no se previenen**, porque no los sabemos: las reglas de embalaje y las de paquetería se evalúan por separado y el fallo aparece al generar, con el motivo del carrier a la vista. Es la degradación honesta: el sistema no puede prevenir lo que no sabe, pero sí puede no esconderlo.

> `.franja--pendiente` **FedEx rechazó las medidas del paquete**
> Texto original: `Package dimensions exceed service maximum for FedEx Prioritario`.
> Reintentar no cambia nada: hay que usar otra caja o cotizar con otra paquetería.
> `.boton--sutil.boton--chico` **Cambiar la caja** · `.boton--sutil.boton--chico` **Anotarlo en FedEx**

"Anotarlo en FedEx" abre la ficha de esa paquetería, que es donde ese hecho, una vez conocido, deja de repetirse.

**Se borra una plantilla usada.** Borrar dice qué se lleva, y ahora también cuenta los vetos:

> **¿Eliminar Sobre?**
> La usan 1 regla de embalaje —«Pedidos de una pieza»— y 2 vetos. Antes de eliminarla hay que darle otra caja a la regla y quitar los vetos.
> **Conservarla** · *(eliminar deshabilitado, con el motivo en su `title`)*

## 3.6 Componentes

**Se reutiliza:** `.zona` · `.tarjeta` con cabeza y pie · `.orden` completo con su `.orden__asa`, `.orden__puesto`, `.orden__quien`, `.orden__porque`, `.orden__mover`, el arrastre y las flechas · `.orden__cabecera` · `.campo`, `.campo--corto`, `.campos`, `.campos--2`, `.campos__titulo`, `.campo__ayuda`, `.campo__error` · `.marca-campo` · `.panel` · `.franja--editada` / `--pendiente` · `.aviso--alerta` / `--info` / `--mal` · `.vacio` · `.dato` · `.pastilla--*` · `.guardado` · `.dialogo` · `.mono`.

**Se crea:**

- **`.orden--reglas`**, modificador de `.orden`. Misma mecánica de arrastre, puesto y flechas; distinta rejilla de celdas, porque una regla lleva condiciones y caja donde una paquetería lleva papel. Y **`.orden__fila--defecto`**, para la fila que no se mueve ni se borra.
- **`.condicion`**, con `.condicion--sin-dato`. La lectura compacta de una condición dentro de una fila: `Cantidad 1 a 3 piezas`, `Contiene MON-VEN-16`. **Por qué hace falta:** `.pastilla` es un estado y `.dato` es un par etiqueta-valor; una condición es un enunciado con rango y no se lee bien como ninguno de los dos. `--sin-dato` la apaga y la marca cuando su SKU no aparece en ningún pedido reciente.
- **`.cobro`**, con `.cobro__cifra` y `.cobro__porque`. El par consecuencia-y-porqué: primero lo que te cobran, después por qué. **Por qué hace falta:** ya está escrito tres veces con estilos en línea en `plantillas.html`, y con esta función aparece en tres pantallas más. Un patrón repetido a mano deja de ser el mismo patrón, igual que un color.
- **`.buscador-ficha`**, con `.buscador-ficha__panel` y `.buscador-ficha__vacio`, y **`.producto`** con `.producto__sku`, `.producto__uso`, `.producto--elegido` y `.producto--sin-ver`. El nombre es neutro a propósito: en 5.2 el mismo componente busca destinatarios, y una clase nombrada por uno de sus dos usos deja de ser la misma clase. **Por qué hace falta:** ningún control del sistema devuelve registros para elegir dentro de un formulario. El buscador de la barra superior encuentra y lleva a otra pantalla; un `select` necesita una lista cerrada, y aquí la lista sale de los pedidos y crece sola. El panel hereda la disciplina que ya está escrita para el calendario y para el buscador global —vive en el `body` con posición fija, no hereda el ancho de su disparador, se sale a pantalla completa en angosto, cierra con Escape y se queda cerrado, y devuelve el foco al campo—, así que lo nuevo es la fila, no el comportamiento.

## 3.7 El recorrido completo

Tarea principal: **proteger un producto frágil y dejar de pagar volumen en los pedidos de una pieza.**

1. La zona de embalaje enseña una sola regla, la de por defecto, con su `.cobro`: *"Con esta regla han salido las 39 guías de los últimos 30 días: el 100 %. En 11 se cobró por volumen. Diferencia acumulada: $1,640."*
2. **Agregar veto primero**, porque descarta y no asigna, y lo que descarta no depende del orden. En el buscador escribe "copas", elige **Juego de 6 copas**, y en "Nunca usar" elige **Sobre**. En ningún momento tuvo que acordarse de `MON-CRI-6`.
3. **Agregar regla.** Nombre: "Cristalería acompañada". Marca **Contiene un producto** y escribe "copas" en el buscador: sale **Juego de 6 copas · `MON-CRI-6` · 4 pedidos · el último el 18 de septiembre**. Lo elige, y añade "más 1 a 5 piezas". Al marcarla, la franja dice: *"Sobre los pedidos de hoy, esta condición alcanza a 1 de 40."* con su enlace.
4. Caja: **Caja mediana**. Motivo: "En una caja chica se rompieron tres veces." **Guardar regla.** Como es específica, entra arriba: queda en el puesto 1 y nada la cubre.
5. **Agregar regla.** Nombre: "Pedidos de una pieza", cantidad de 1 a 1, caja **Sobre**. Es la general, así que se coloca **debajo** de las de producto. Si se guardara encima, el aviso lo diría en el acto.
6. Al día siguiente entran dos pedidos con copas. `#1019` lleva copas y una licuadora: gana «Cristalería acompañada» y sale en Caja mediana, que es exactamente lo que su motivo pedía.
7. `#1018` lleva solo las copas: gana «Pedidos de una pieza», el veto le quita el Sobre, y la de por defecto también apunta al Sobre. **No se genera solo.**
8. Aparece en Pedidos con `.pastilla--aviso` "Revisión manual" y el motivo escrito en la fila. Se abre el panel: el `select` de Caja está a la mano con el Sobre deshabilitado. Elige **Caja chica**.
9. `.cobro` se recalcula al soltar el select, las tarifas vuelven a cotizar y el botón dice `Generar guía con Estafeta Terrestre · $107.00`.
10. A los treinta días, la regla por defecto bajó del 100 % al 18 % y el `.cobro` de cada regla dice, en guías y en dinero, cuánto costó menos.

Los pasos 2 a 5 son el orden que hay que respetar y la razón por la que el principio está en la cabeza de la tarjeta: **si «Pedidos de una pieza» se escribe primero y se deja arriba, «Cristalería acompañada» no gana nunca y las copas salen en la caja que las rompe.**

---

# 4. Creación manual de guías desde Pedidos

## 4.1 Dónde vive

**En el bloque Envío del panel del pedido, en `pedidos.html`. Nada nuevo: ni pantalla, ni pestaña, ni entrada de menú.**

Porque el defecto que hay que arreglar es exactamente ese: *"pones la colonia correcta y luego te vas a otra pantalla a generar la guía."* La misma tarea partida en dos viajes. La solución no es otra pantalla, es que todo lo que mueve el precio se pueda cambiar donde ya se está.

Lo único que se suma fuera del panel es **una acción más en `.barra-seleccion`**.

## 4.2 El bloque Envío, sin guía, de arriba abajo

**1. La franja de antigüedad** — ya existe y no se toca:
> `.franja--editada` **Sin guía desde hace 3 días** · Pagado el 18 de septiembre.
> A partir de tres días pasa a `--pendiente`.

**2. Qué sale** — en `.campos--2`, todo editable sin salir del panel:

| Campo | Control | Ayuda |
|---|---|---|
| **Sale de** | `select` de orígenes, con el predeterminado ya elegido | Es el remitente que se imprime en la etiqueta. |
| **Caja** | `select` de plantillas | *(cambia, ver abajo)* |
| **Peso** | `.campo--corto`, en kg | *(cambia, ver abajo)* |
| **Valor declarado** | `.campo--corto` con el total del pedido propuesto, y un `.marca-campo` "Asegurar el envío" | *(cambia, ver el punto 4)* |

La ayuda de **Caja** dice quién la eligió, porque lo automático se ve como automático:
- *"La eligió la regla «Pedidos de una pieza»."*
- *"Elegida a mano."*
- *"Ninguna regla pudo elegirla: ver el motivo arriba."*
- *"Medidas del pedido, reportadas por Shopify. Las reglas de embalaje no se aplican."*

La ayuda de **Peso** dice de dónde sale. En esta versión son dos, porque la tercera espera al catálogo:
- *"Peso de la plantilla."*
- *"Peso reportado por Shopify."*

**3. `.cobro`** — la consecuencia primero, el dato después, y se recalcula al teclear:

> **Te cobran 6 kg**
> Pesa 4 kg, pero una caja de 40 × 30 × 25 cm se cobra como si pesara 6.

Con el divisor sin registro, una línea más en `.apagado`: *"Calculado con divisor 5000, sin registro del de DHL."*

**4. El seguro, que cuesta dinero y por lo tanto dice cuánto.** `CAPACIDADES.costoSeguro` es una celda más de la matriz, con los mismos tres valores, y normalmente un porcentaje sobre el valor declarado con un mínimo.

**Con valor**, el seguro es un renglón propio del desglose, nunca una suma escondida dentro del precio de la guía:

> `.campo--corto` **Valor declarado** `$1,480.00`
> `.marca-campo` **Asegurar el envío** — `.campo__ayuda` 1.5 % sobre el valor declarado, mínimo $35.00.
>
> Y en el desglose, bajo las tarifas:
> `.dato` Guía · $258.00
> `.dato` Seguro · $35.00
> `.dato--fuerte` **Total · $293.00**

Y el botón incluye el seguro, porque el botón dice lo que va a pasar: `Generar guía con DHL Express · $293.00`.

**Sin registro**, la casilla dice que no lo hay y **dice dónde va a aparecer el importe**, que es lo que convierte una omisión en una instrucción:

> `.marca-campo` **Asegurar el envío**
> `.campo__ayuda` Valor declarado $1,480.00. Sin registro del costo del seguro de DHL: el importe aparece en la factura. — `.boton--sutil.boton--chico` **Confirmar con DHL**

Una casilla que cuesta dinero sin decir cuánto tiene el mismo defecto que una guía sin precio, y callar la cifra no la hace menos cara. Con "no" —una paquetería que no asegura— la casilla no existe y en su lugar va la línea: *"Estafeta no asegura envíos desde aquí."*

**5. `.tarifas`** — como hoy, pero **cotizadas con el peso facturable**, no con el real, y con la propuesta ya elegida. **La premisa va completa: de dónde sale, a dónde va y con qué peso.**

> `.apagado` Con tus cuentas, de Almacén Puebla a Ciudad de México · 6 kg facturables:
>
> (•) **DHL** · Express — Entrega en 1 a 2 días · 94% a tiempo contigo — **$258.00** `.apagado` Estimado
> ( ) **Estafeta** · Terrestre — Entrega en 2 a 3 días · 89% a tiempo contigo — **$232.00** `.apagado` Estimado
>
> `.apagado` DHL es la primera de tu orden de preferencia que se puede usar.

**El origen va en la frase porque forma parte de la premisa**, y una premisa que no se enseña parece que no se usa. Cambiar "Sale de" reescribe esa línea en el acto.

**Y la estimación dice de qué depende lo que no calcula:**

> `.aviso--info` Estimado por peso. La tarifa final depende de la zona entre el origen y el destino, y sale de la cotización en vivo de la paquetería.

La tarifa por zona queda fuera de esta versión: nuestra tabla solo mira el peso, y construir una tabla por zona sería inventar cifras que nadie puede comprobar. Pero cotizar lo mismo desde dos bodegas distintas **sin decir nada** le enseña al comerciante un hecho falso sobre su propia operación, y ese error se descubre al conciliar. Se dice.

Lo que cambiar el origen sí mueve hoy, y las dos cosas se ven: **el remitente que se imprime en la etiqueta** y **la recolección que va a recoger el paquete**. Al cambiarlo, en `.apagado` bajo el `select`: *"El paquete lo recoge la recolección de Tienda Roma."*

Cuando además el precio no viene de una cotización en vivo por un fallo, sobre la lista: `.aviso--info` *"Precios de tu tabla de tarifas: DHL no respondió la cotización."*

**6. Motivo**, que aparece solo al elegir una distinta de la propuesta:

> `.campo` **Por qué no sale con DHL** — `select`: El cliente la pidió · Urgencia · DHL no tiene cobertura · Precio
> `.campo__ayuda` Queda anotado en el pedido. La frecuencia de las excepciones es lo que dice si hay que reordenar tu lista de preferencia.

La tercera opción **nombra a la paquetería propuesta**, no dice "la propuesta": en el panel siempre hay una, y nombrarla es lo que hace que el registro sirva para reordenar la lista.

El botón queda deshabilitado hasta que haya motivo, con su `title`: *"Falta el motivo del cambio de paquetería."*

**7. Lo que falta**, si falta. **Se nombran todos los campos, no el primero.**

> `.franja--pendiente` **Faltan la colonia y el número exterior**
> Una etiqueta sin colonia o sin número se pega y el paquete se pierde una semana después.
> `.boton--fantasma.boton--chico` **Editar dirección**

Se enumeran con la `e` que sustituye a la `y` antes de i-, igual que ya se hace con las correcciones aplicadas: nombrar, no contar. "Faltan 2 datos" no dice nada y suena a base de datos.

**Y al abrir el formulario, el foco cae en el primer campo que falta, no en el primero del formulario.** Los campos que faltan salen ya marcados con `.campo--error` y su `.campo__error` —*"Falta la colonia."*— antes de que nadie intente guardar: son catorce campos, y encontrar el que falta no puede costar más que escribirlo. Al guardar, si todavía falta alguno, el foco va al primero que quede, que es lo que ya hace el formulario.

La franja y la validación del formulario **salen de la misma lista de campos obligatorios**. Con dos listas, la franja nombra uno y el formulario rechaza por otro, que es exactamente el viaje de más que esta función existe para quitar.

**8. Las acciones:**

> `.boton--primario.boton--chico` **Generar guía con DHL Express · $258.00**
> `.boton--sutil.boton--chico` **Comparar más opciones**

**El botón se queda en el bloque, no en `.panel__pie`.** Parece una excepción a "confirmar va en el pie" y no lo es: el pie confirma el panel entero, y aquí lo que se confirma es la tarifa que está tres centímetros más arriba. El pie no cambia: **Cerrar** · **Abrir en Shopify**.

## 4.3 Después de la guía no se cambia nada

El bloque pasa al que ya existe y gana una línea en `.apagado`:

> No se cambia nada de un envío ya emitido.

**Y el seguro se rotula por lo que es.** Después de emitir, la línea dice **"Valor declarado · $1,480.00"**, nunca "Seguro sobre el valor declarado · $1,480.00": esa cifra es lo que vale la mercancía, no lo que costó asegurarla. Dos cantidades distintas bajo el mismo rótulo se suman mal al conciliar, y ésta se suma en la única pantalla donde no puede fallar. El costo del seguro, si se conoce, va en su renglón propio: **"Seguro · $35.00"**.

**La misma regla se aplica en el bloque Dirección.** Al guardar una dirección editada sobre un pedido que ya tiene guía, la acción que aparece sale de `CAPACIDADES.cancelaGuia`, exactamente como la de aquí. Con "no" o "sin registro" **no hay botón de cancelar**: hay la misma `.instruccion` de abajo. Un panel que tres centímetros más arriba dice que Estafeta no cancela y tres más abajo ofrece cancelar se contradice a sí mismo, y es el argumento de la capa de en medio desmontándose en su propia demostración.

Y una acción, que sale de `CAPACIDADES.cancelaGuia`:

| Valor | Lo que hay |
|---|---|
| Sí | `.boton--sutil.boton--chico` **Cancelar guía y generar otra** |
| No | `.instruccion--no`, encabezada "Estafeta no cancela guías desde aquí" |
| Sin registro | `.instruccion--sin-registro`, encabezada "Sin registro de si Estafeta cancela guías desde aquí", con su **Confirmar con Estafeta** |

En los dos últimos, los pasos:

> **1.** Llama a Estafeta al 800 378 2338 y pide la cancelación de la guía `6050000112233`. — **Copiar guía**
> **2.** La guía queda sin usar. Si tu contrato cobra las guías emitidas, esta se te cobra.

No es una restricción de producto: modificar un envío ya emitido exige una integración que en general no existe, y prometerla convierte la funcionalidad en una llamada de soporte.

## 4.4 Cuando falla

El modelo de fallos es el de `simularGeneracion` y el del lote. Lo que cambia es la presentación.

**El panel no se cierra y lo capturado se queda.** Cerrarlo obligaría a recapturar peso, caja y seguro para volver a intentar lo mismo.

**Reintentable:**
> `.franja--pendiente` **Sin respuesta de DHL** · La petición excedió el tiempo de espera.
> El mismo botón sigue diciendo `Generar guía con DHL Express · $258.00`.

**No reintentable:**
> `.franja--pendiente` **Estafeta no tiene cobertura en 29320** · Reintentar no cambia nada. Estas son las otras opciones cotizadas para este pedido.
> Las `.tarifas` se repintan sin Estafeta, con la siguiente ya elegida.

Ofrecer "Reintentar" cuando reintentar no cambia nada es mentir.

**Idempotencia:** la llave es `folio:intento`, no `folio`. Con el folio solo, la protección contra el doble clic bloquea también el reintento, que es justo lo que hay que permitir.

**El fallo deja rastro:** el pedido queda con `error`, la celda Envío dice `.pastilla--mal` "No se pudo generar" con el motivo debajo, y entra en "Guías que no se pudieron generar" de `PENDIENTES`.

## 4.5 La comprobación al confirmar

**No hay bloqueo por edición.** No se marca nada al abrir el panel, no hay temporizador y no hay nada que liberar: un arriendo protege de que dos personas choquen, y este producto no tiene modelo de usuarios ni reloj compartido con el que sostenerlo.

**Lo que protege de la guía duplicada es una comprobación antes de emitir**, que además cubre el otro caso que cuesta dinero. Una sola comprobación, tres desenlaces:

**a) El pedido ya tiene guía.**
> `.franja--pendiente` **Este pedido ya tiene guía**
> Una regla la generó con Estafeta Terrestre a las 11:04, mientras este panel estaba abierto. `TC71004`.
> `.boton--fantasma.boton--chico` **Ver la guía** · `.boton--sutil.boton--chico` **Cancelar guía y generar otra**

La segunda acción sale de la matriz, igual que en 4.3, **y su ausencia se explica igual**: con Estafeta, donde no hay cancelación, el segundo botón no está y en su lugar va la `.instruccion--no` con sus dos pasos. Un silencio ahí es la única parte del panel donde la falta de botón no tendría explicación, y sería justo donde alguien la busca.

Dos guías para un pedido son dos paquetes y dos cobros: por eso no se emite la segunda y se enseña la primera. **La franja se queda hasta que alguien elija una de las dos salidas**, y no desaparece con un segundo clic en Generar: un botón que borra el aviso sin hacer nada parece que no hizo nada, y lo que hizo fue evitar la guía duplicada.

**b) El pedido cambió en el canal.**
> `.franja--pendiente` **El pedido cambió en Shopify**
> Lista de `.cambio`: *Dirección* — Roma Norte → Condesa · *Artículos* — 2 piezas → 3 piezas
> `.boton--primario.boton--chico` **Generar guía con los datos nuevos** · `.boton--sutil.boton--chico` **Conservar lo capturado**

**c) Todo sigue igual.** Se emite y no se ve nada: una comprobación que pasa no tiene por qué anunciarse.

**El pedido con devolución abierta** se resuelve antes de llegar ahí, porque es una condición del pedido y no un cambio de última hora:

> `.franja--pendiente` **Este pedido tiene una devolución abierta**
> DV-0031, en tránsito de regreso.
> `.marca-campo` **Esta guía es un reenvío, no la devolución** → al marcarla se habilita el botón.

Un reenvío y una devolución del mismo pedido son fáciles de confundir cuando los dos están en curso.

**Pedido no pagado:** ya está resuelto y no se toca. El botón deshabilitado dice por qué.

## 4.6 Sobre varios pedidos

`.barra-seleccion` gana **una sola** acción, entre "Imprimir etiquetas" y "Generar guías":

> **Forzar paquetería (12)**

Cada acción cuenta a cuántos de los seleccionados aplica, no cuántos hay seleccionados, y se desactiva en cero.

Abre el `.dialogo` de lote que ya existe, con sus tres momentos. En el paso 1, además del conteo y los omitidos por motivo:

- `.campo` **Paquetería** — `select` **en el orden de preferencia de Configuración**, no alfabético ni arbitrario: es el mismo criterio que decide sola, y dos órdenes para la misma lista obligan a buscar dos veces.
- `.campo` **Motivo** — `select` obligatorio. **En el lote la lista no es idéntica a la del panel:** ahí hay una propuesta única y aquí no, así que "La propuesta no tiene cobertura" se sustituye por **"La paquetería propuesta no está recogiendo"**, que es el caso real del día en que se usa esta acción.
- `.aviso--info` El peso y la caja salen de tus reglas de embalaje. Para cambiarlos en un pedido, ábrelo.

Botón: `Generar 12 guías con FedEx`. **El objeto es la guía, no el pedido**, también en el lote de "Generar guías": se generan guías, y el lote de forzar paquetería ya lo dice bien.

**Los pedidos en revisión manual se omiten y lo dicen**, con su motivo agrupado: *"Se omiten porque: Ninguna caja quedó disponible — #1018 · El pedido no cabe en su caja — #1014."*

**Y cuando se omiten todos, el diálogo se abre igual.** Es el caso al que lleva el enlace "Verlos en Pedidos" desde la zona de embalaje, así que es el más probable, no el más raro. La barra no puede quedarse con dos botones en gris y sin texto:

> `.lote__conteo` — **0** se procesan · **3** se omiten · **3** seleccionados
> `.dato` Ninguna caja quedó disponible — `#1018` `#1021`
> `.dato` El pedido no cabe en su caja — `#1014`
> `.aviso--info` Estos pedidos esperan a que alguien les elija la caja. Se hace abriéndolos uno por uno.
> Pie: **Cerrar** · *(el botón de ejecutar, deshabilitado, con su cuenta en cero)*

Y en la barra, mientras tanto, cada botón en cero lleva su `title`: *"Ninguno de los 3 seleccionados puede generar guía: los 3 están en revisión manual."* Contar lo aplicable explica por qué no se puede; contarlo sin decirlo, no.

**El lote no se convierte en captura masiva.** Un lote donde se puede cambiar el peso de cada pedido es la pantalla de detalle otra vez, dibujada peor y sin sitio para el porqué.

## 4.7 Estados

**Sin ninguna dirección de origen** el bloque Envío entero se sustituye, porque el vacío es una pantalla y no un hueco:

> **No se puede generar la guía**
> Sin una dirección de origen no hay remitente que imprimir en la etiqueta.
> `.boton--primario.boton--chico` **Agregar dirección de origen**

**Cargando la cotización:** `.esqueleto` con la forma de las cuatro tarifas, no un girador genérico.

**Generando:** el botón con `aria-busy="true"` y `.girador`, texto **"Generando guía…"**. Los demás controles del bloque quedan deshabilitados; los del resto del panel no.

**Error de red al cotizar:** `.aviso--info` sobre las tarifas, no un bloqueo. Bloquear la operación por no tener el precio exacto es peor que generar con uno aproximado, siempre que esté dicho cuál es cuál.

## 4.8 Componentes

**Se reutiliza:** todo el `.panel` con sus `.bloque` y `.bloque__caja` · `.tarifas` y sus partes · `.campo`, `.campo--corto`, `.campos--2`, `.campo__ayuda` · `.marca-campo` · `.franja--*` · `.cambio` · `.aviso--info` · `.pastilla--*` · `.barra-seleccion` · `.dialogo` con `.lote__*` · `.vacio` · `.esqueleto` · `.girador`.

**Se crea:** `.cobro` (compartido con la función 3) y `.instruccion` (compartido con las funciones 0, 1 y 2). Ninguno exclusivo.

## 4.9 El recorrido completo

Tarea principal: **corregir la colonia y generar la guía sin salir del panel.** Es el flujo que el usuario rechazó partido en dos.

1. Pedidos, pestaña "Sin guía". La fila `#0997` dice `.pastilla--mal` "Requiere corrección".
2. Se abre el panel. El bloque **Envío** está arriba y la franja nombra **todo** lo que falta: *"Faltan la colonia y el número exterior."*
3. **Editar dirección.** El formulario se abre dentro del bloque Dirección, con los dos campos ya en `.campo--error` y el foco puesto en la colonia. No hay que recorrer catorce campos buscando cuál era.
4. Escribe los dos y **Guardar dirección**. Se guarda a la primera: la franja nombró lo mismo que valida el formulario.
5. **El panel no se cierra, no se vuelve a la tabla, no se busca otra vez el pedido.** El bloque Envío se repinta solo, porque el CP pudo cambiar de zona: las cuatro tarifas vuelven a cotizar y el botón se reactiva.
6. Ve que le cobran 6 kg por una caja que no necesita. Cambia **Caja** a "Caja chica". `.cobro` se recalcula: *"Te cobran 4 kg — Pesa 4 kg y la caja no abulta más que eso."* Las tarifas bajan mientras mira.
7. Marca **Asegurar el envío**; el valor declarado ya trae el total del pedido y la ayuda dice el costo, o dice que no hay registro de él y dónde va a aparecer.
8. El botón dice `Generar guía con DHL Express · $224.00`: guía y seguro, porque el botón dice lo que va a pasar.
9. Al pulsarlo corre la comprobación: el pedido sigue sin guía y no cambió en Shopify, así que no se ve nada y se emite.
10. El bloque se convierte en el de "con guía". La fila de atrás se actualiza sin recargar, y el paso siguiente sale del resultado: **Ver etiqueta**. Una acción termina en su artefacto.

---

# 5. El envío suelto

## 5.1 Dónde vive

**En Pedidos. No hay pantalla nueva, no hay lista aparte y no hay entrada de menú.** Un envío suelto es un pedido sin canal, y toda pantalla que trabaja con guías lee la derivación de `pedidos`: una tercera colección devolvería la pregunta que el modelo ya mató, "¿la guía 877 la busco en Pedidos o en la otra lista?".

La acción de crearlo va en `.encabezado__acciones` de Pedidos, en `.boton--primario`, porque es la que crea aquello para lo que la pantalla existe: **Crear envío**. Se llama así y no "Crear pedido" porque quien lo usa no está registrando una venta, está haciendo una guía; y no "envío suelto" porque el adjetivo es nuestro, no suyo.

Convive con las otras dos principales igual que ya lo hacen entre sí: la primaria cambia con la pestaña activa —"Crear envío" en Todos y Sin guía, "Registrar devolución" en Devoluciones— y "Sincronizar estatus" se queda en `.boton--sutil`. **Y cuando la lista está vacía, la acción la lleva el estado vacío** y la de arriba se oculta:

> **Todavía no hay ningún pedido**
> Los pedidos entran por tus canales de venta. También se puede crear un envío a mano, para lo que vendiste fuera de ellos.
> `.boton--primario` **Crear envío** · `.boton--sutil` **Conectar un canal**

## 5.2 El panel de captura

`.panel`, el mismo contenedor que Plantillas y que la regla de recolección: lista → panel. Título **"Nuevo envío"**.

**Captura solo lo que lo convierte en un pedido.** Origen, caja, peso, seguro y paquetería son decisiones de la guía y ya tienen su sitio —el bloque Envío, con su cotización en vivo, su `.cobro`, su motivo obligatorio al salirse de la regla y su manejo de fallos—. Duplicarlas aquí sería escribir por segunda vez la pantalla que la función 4 existe para haber escrito una sola vez.

**Y no por eso se parte la tarea en dos viajes:** al crear, el mismo panel no se cierra, se convierte en el panel de ese pedido con el bloque Envío abierto y la paquetería ya propuesta. Capturar y despachar son dos cosas; hacerlas sin cerrar el panel es lo que impide que "Crear envío" termine en una lista en vez de en una guía.

**Los bloques, en este orden:**

**1. Referencia** — primero y obligatoria, porque es lo único que sustituye al folio del canal y ponerla al final la haría parecer opcional.

> `.campo` **Referencia**
> `.campo__ayuda` Por qué existe este envío: "Garantía #4412", "Venta por WhatsApp". Es lo que se lee dentro de un mes al conciliar.
> `.campo__error` Falta la referencia.

Y debajo, la advertencia que el producto puede dar y no puede resolver, en `.apagado`:

> Si esta venta ya entró por un canal, se van a emitir dos guías y nada las va a cruzar: no hay folio de canal con que compararlas.

**Y una comprobación barata que no estaba pedida y cuesta poco**: al escribir el destinatario, si hay un pedido con el mismo nombre y el mismo código postal en los últimos siete días, se dice. No bloquea:

> `.aviso--alerta` **El pedido `#1016` es del mismo destinatario y del mismo código postal, del 18 de septiembre.** `<a>` **Verlo** `</a>`

Una defensa humana con un recordatorio automático sigue siendo humana, pero falla menos.

**2. Destinatario y dirección** — **los mismos campos, las mismas etiquetas y la misma validación que la dirección de un pedido.** Una dirección es una dirección, y dos formularios para lo mismo terminan validando distinto y escribiendo la calle de dos maneras.

Encima de los campos, para el caso del cliente que vuelve:

> `.boton--sutil.boton--chico` **Usar una dirección ya enviada**

Abre el mismo buscador de fichas de 3.3 con otra fuente: los destinatarios de envíos anteriores, que son dato nuestro. Cada fila lleva nombre, ciudad y **"último envío el 4 de septiembre"**, que es lo que deja distinguir dos Arturo García. No es una libreta de contactos y no se construye una: es buscar en lo que ya se escribió.

**3. Total (opcional)** — el "(opcional)" va en la etiqueta, nunca en un marcador que desaparece al escribir.

> `.campo` **Total (opcional)**
> `.campo__ayuda` Si lo capturas, queda marcado como capturado a mano y no cuenta como venta.

**4. Artículos (opcional)** — plegado, porque la mayoría no los va a capturar:

> `<details class="desplegable"><summary>Agregar artículos</summary>`
> El buscador de productos de 3.3, cantidad y precio por línea.
> `.campo__ayuda` Con artículos, este envío entra en las reglas por producto y admite devoluciones parciales. Sin ellos, no.

Dice lo que se gana, no lo que se pierde: es la única forma de que alguien decida capturarlos.

**5. Lo que no se comprueba** — va al final, justo encima del pie, porque se lee antes de comprar y después de haber escrito la dirección.

> `.aviso--info` **La dirección se comprueba al comprar la guía.**
> Aquí se revisa la forma: que el código postal tenga cinco dígitos, que la colonia no vaya vacía y que el teléfono esté completo. Que el destino exista y que tu paquetería llegue hasta ahí lo contesta la paquetería al comprar la guía, y si lo rechaza se dice con sus palabras.

**Pie:** **Cancelar** · **Crear envío**.

## 5.3 El código postal que no está en el catálogo

Es la frase que decide si esta pantalla se lee como honesta o como un producto que no sabe lo que hace, así que va literal y va **en la ayuda del campo, no en su error**:

> `.campo__ayuda` **El código postal 29321 no está en el catálogo de colonias.** No quiere decir que no exista: quiere decir que no hay colonia que proponer. Escríbela.

**Ayuda y no error, y la diferencia no es cosmética.** `.campo--error` afirma que el campo está mal. Aquí el campo no está mal: es nuestro catálogo el que no llega. Pintarlo en rojo trataría el hueco de nuestros datos como una negativa sobre el destino, e impediría enviar a sitios que existen.

Por lo mismo, **no bloquea el guardado ni el botón de generar**. Lo único que cambia es que no hay colonia propuesta y hay que escribirla.

Y donde sí se propone, `coloniasPorCP` se declara por lo que es:

> `.campo__ayuda` Colonias del catálogo de The Carriers para el 72501. Si la tuya no está, escríbela.

**La comprobación previa de dirección es una celda de la matriz, `validaDireccion`.** Mientras esté sin registro en todas —que es hoy—, **no se ofrece ningún botón de comprobar**, porque una comprobación que no existe hace confiar en una dirección que va a rebotar, y el rebote llega con la caja cerrada y etiquetada. El día que una paquetería la exponga, aparece **Comprobar dirección** en ese bloque y solo para esa paquetería, leyendo la matriz igual que todo lo demás.

## 5.4 Cómo se ve un suelto en la tabla

| Columna | Qué lleva |
|---|---|
| **Pedido** | `E-0043` en `.mono` y sin `#`. Debajo, en `.apagado`, la referencia: "Garantía #4412" |
| **Canal** | `.pastilla--neutra` **Sin canal** |
| **Cliente** y **Destino** | Igual que cualquiera |
| **Total** | La cifra con `.apagado` "a mano" al lado; **"—"** cuando no se capturó |
| **Pago** | `.apagado` **"—"**, y debajo `.apagado` "Sin canal que lo reporte" |
| **Envío** | Igual que cualquiera |

**La referencia va en la tabla, no escondida en el panel.** Es lo que sustituye al folio del canal, y un folio nuestro sin nada al lado no explica por qué existe esa guía.

**El folio no lleva `#` y lleva su propia letra**, porque un folio que no existe en Shopify no se puede ir a buscar allá y el `#` es lo que invita a intentarlo.

**Un envío suelto no tiene estado de pago, y por eso esa celda no lleva pastilla.** Una venta cobrada fuera del canal no la conoce el sistema, y poner "Pagado" sería inventar un dato que nadie reportó. Pero una pastilla en esa columna se compara con las "Pagado" y "Pendiente" de las filas de al lado y se lee como un tercer estado de pago; **el guion dice que la columna no aplica a esa fila**, que es lo cierto.

**Y no se bloquea por pago.** El bloqueo existe para no despachar cuando un canal dice que no se ha cobrado; aquí no hay canal que lo diga y quien lo capturó es quien vendió. **Crear el envío es la decisión de despacharlo**, así que cuenta como listo desde que existe: el botón de generar guía está activo desde el primer momento.

### Un suelto sin guía cae en la misma cola, y la cola cambia de nombre

Un envío suelto puede existir sin guía —se captura hoy y se despacha mañana— y entra en el mismo pendiente que un pedido pagado sin guía. El predicado admite ahora las dos condiciones: **pago confirmado por el canal, o sin canal**.

**Y entonces la etiqueta no puede seguir hablando de pago**, porque la mitad de sus filas no tiene pago que reportar:

| | Antes | Ahora |
|---|---|---|
| `PENDIENTES["pagados-sin-guia"]` | Pagados sin guía | **Listos para despachar** |
| `.metrica__nota` de "Sin guía" en Pedidos | Pendientes de despachar | **Listos para despachar** |
| Tarjeta de Inicio | Pagados sin guía | **Listos para despachar** |

**La clave del predicado se queda como está**: cambiarla obligaría a tocar los enlaces que ya llevan `?pendiente=pagados-sin-guia` y no gana nada. Lo que se lee es la etiqueta.

Dos cosas que gana el cambio además de ser cierto. **El nombre describe mejor el predicado de lo que lo describía antes**: ese pendiente ya excluía los pedidos con error y los que esperan corrección, precisamente porque no están listos, y "pagados" nunca dijo eso. Y **los tres sitios dicen ahora lo mismo**, que es lo que pide la regla de un nombre por pantalla; hasta hoy el pendiente decía "Pagados sin guía" y la métrica de la misma pantalla decía "Pendientes de despachar", dos nombres para una cosa.

**El filtro de canal gana "Sin canal"**, no "Manual": el desplegable contesta por dónde entró la venta, y una forma de capturar no es un sitio por donde entra dinero. Como todos los desplegables del producto, se llena con lo que hay: sin sueltos, la opción no aparece.

## 5.5 El embalaje propone, no decide

Es el estado nuevo, y se distingue del de la función 4 **por el verbo**. En un pedido de canal la caja ya se decidió sin nadie delante; aquí hay alguien delante de la caja.

| Dónde | `.campo__ayuda` de Caja |
|---|---|
| Pedido de canal | *"La eligió la regla «Pedidos de una pieza»."* |
| Envío suelto | *"La propone la regla «Pedidos de una pieza». Aquí la eliges tú."* |

Y cuando ninguna regla pudo evaluarse, que va a ser lo normal —sin artículos no hay piezas ni SKU, sin total no hay costo, y ninguna regla por canal puede cumplirse nunca—:

> `.campo__ayuda` Sin artículos capturados, las reglas de embalaje no tienen con qué decidir. Se propone la plantilla predeterminada.

Dice qué falta para que decidieran, que es más útil que decir que no decidieron. Obligar a alguien a pelearse con una regla que tiene delante es al revés.

**La paquetería preferida sí aplica completa**, con su porqué y con motivo obligatorio al salirse: el orden de preferencia es un criterio sobre las paqueterías y no tiene nada que ver con por dónde entró la venta. **La recolección también**, sin un solo cambio: la regla es por origen × paquetería, un suelto tiene los dos, y el camión recoge bultos, no pedidos. **La generación automática no**: no hay evento de pago que la dispare.

## 5.6 Pedidos y Ventas dejan de ser el mismo número

En cuanto haya un solo suelto, las dos cifras se separan. **Dos números que siempre coincidieron y un día dejan de hacerlo se leen como un error del sistema**, así que se dice donde se ven los dos y solo cuando hay sueltos:

En Inicio, bajo el bloque del periodo:

> `.apagado` De los 43 envíos del periodo, **3 son envíos sueltos y no cuentan como venta**: no entraron por un canal que reporte el importe. `<a>` **Verlos** `</a>`

En Pedidos, la `.metrica__nota` de "Total de pedidos":

> 43 en el periodo · 3 sin canal

Y en Desempeño, bajo la tabla, la otra mitad de la misma frase, porque ahí sí cuentan:

> `.apagado` Incluye los envíos sueltos: los entregó la misma paquetería.

Las dos líneas juntas son la respuesta completa: **no cuentan como venta porque nadie reportó el importe; sí cuentan como envío porque alguien los llevó.** Con una sola de las dos, la otra pantalla parece equivocada.

En Cobros no cambia la conciliación —lista envíos y su llave es la guía—: la columna del pedido enseña el folio nuestro y, debajo, "Sin canal", y **la exportación gana la referencia**, porque un cargo que no se puede atribuir a nada es un cargo que no se puede disputar.

## 5.7 Devoluciones y borrado

**La devolución de un suelto cuelga igual que cualquier otra**, y el panel es el mismo. Dos diferencias, las dos por la misma razón: el mecanismo "Del canal" no aparece en el `select` —no hay canal que administre nada— y la solicitud nunca entra por webhook, así que el filtro de mecanismo tampoco ofrece esa opción cuando solo hay sueltos. Un desplegable se llena con lo que hay.

**Borrar un suelto sin guía se puede**, porque no es más que una captura a medias. En el pie del panel, `.boton--sutil.boton--chico` **Eliminar envío**, y borrar dice qué se lleva:

> **¿Eliminar el envío `E-0043`?**
> Se pierde la referencia "Garantía #4412" y la dirección capturada. No hay guía emitida, así que no hay nada más que cancelar.
> **Conservarlo** · **Sí, eliminar**

**Con guía emitida no se borra.** Se cancela la guía si la matriz lo permite, y si no, la `.instruccion` de 4.3. Un registro que desaparece dejando una guía viva es una guía que nadie va a poder explicar.

## 5.8 Estados

**Vacío:** no hay lista propia, así que el único vacío es el de Pedidos, y ya lleva la acción (5.1).

**Error al crear:** `.aviso--mal` No se pudo crear el envío. Vuelve a intentarlo.

**Guardando:** el botón con `aria-busy="true"` y `.girador`, texto **"Creando envío…"**.

**Varios bultos:** fuera de alcance, igual que el pedido que necesita dos cajas, y se dice donde alguien lo intentaría —en la ayuda de Caja del bloque Envío—: *"Un envío es un bulto. Para dos, se capturan dos envíos con la misma referencia."* La referencia es lo que los junta al conciliar.

## 5.9 Componentes

**Se reutiliza:** `.panel` con sus `.bloque` · `.campo`, `.campos`, `.campos--2`, `.campos--corto-largo`, `.campo__ayuda`, `.campo__error` · `.desplegable` · `.aviso--info` / `--alerta` / `--mal` · `.pastilla--neutra` · `.tabla-caja` · `.metrica` · `.vacio` · `.dialogo` · `.girador` · y **el bloque Envío entero de la función 4**, sin una sola variante nueva salvo la redacción de la ayuda de Caja.

**Se crea:** nada. Pero **el buscador de 3.3 se generaliza**, porque ahora tiene dos fuentes: productos y destinatarios. `.buscar-producto` pasa a **`.buscador-ficha`**, con `.buscador-ficha__panel` y `.buscador-ficha__vacio`, y las filas se quedan como tipos: `.producto` con su `__sku` y su `__uso`, y **`.destinatario`** con su `__lugar` y su `__uso`. **Una clase nombrada por uno de sus dos usos deja de ser la misma clase**, y el cambio cuesta un renombrado hoy y una divergencia dentro de tres meses.

## 5.10 El recorrido completo

Tarea principal: **mandar un reemplazo de garantía que no entró por ningún canal.**

1. Pedidos. **Crear envío** abre el panel "Nuevo envío".
2. Referencia: "Garantía #4412". Es lo primero que pide y es obligatoria.
3. Empieza a escribir el destinatario y **Usar una dirección ya enviada** encuentra a Laura Méndez, con su ciudad y "último envío el 4 de septiembre". La elige y la dirección se llena.
4. El CP es 29321 y no está en el catálogo. La ayuda lo dice sin pintar nada en rojo, y escribe la colonia a mano. Nada se bloquea.
5. Deja el total vacío: es una garantía, no una venta.
6. Antes del pie lee cuándo se comprueba la dirección de verdad. **Crear envío.**
7. **El panel no se cierra**: ahora es el panel de `E-0043`, con el bloque Envío abierto. La caja viene propuesta por la regla y la ayuda dice que la elige él. Cambia a Caja chica.
8. Marca el seguro, ve el `.cobro` recalcularse y las cuatro tarifas con la premisa completa: *"de Almacén Puebla a Tuxtla Gutiérrez · 2 kg facturables"*.
9. `Generar guía con Estafeta Terrestre · $107.00`. Falla: *"Estafeta no tiene cobertura en 29321."* No se reintenta; las tarifas se repintan sin Estafeta. **Ahí es donde se comprueba la dirección**, exactamente como decía el aviso de la captura.
10. Genera con la siguiente. En la tabla, `E-0043` sale con `.pastilla--neutra` "Sin canal", su referencia debajo y su guía. Y la métrica de arriba ya dice "43 en el periodo · 3 sin canal".

---

# Prioridad

El orden de construcción es **4, 3, 2, 1**, con una pieza antes de las cuatro. Si solo se alcanza la mitad, la mitad que deja un producto coherente es 4 y 3: generar la guía correcta. La que se cae sola es 2 y 1: automatizar y devolver encima de una guía que sigue saliendo con la caja equivocada.

### 0.º — La matriz de capacidades

**Va antes que todo y no es opcional.** Las cuatro funciones leen de ella para decidir qué botón existe, y si se construye después hay que volver a tocar las cuatro. Es además barata: una tabla, un pliegue y un vocabulario de tres frases.

**Mínimo:** el objeto `CAPACIDADES` con **una fila por las nueve paqueterías**, sus tres valores, sus dos capas y procedencia y fecha por celda; las dos zonas de Paqueterías, con el pliegue funcionando también en las fichas sin cuenta; las tres frases de la sección 0.3 usadas por todas; y "Confirmar con X" llegando a la celda. Sin esto, cada función inventa su propia forma de decir "esto no se puede", y a la tercera ya no dicen lo mismo.

**Y sin las nueve filas, la mitad del trabajo no sirve:** un "sin registro" que no se puede confirmar se lee igual que un "no", y entonces el tercer valor era un rodeo caro para llegar a dos.

### 1.º — Creación manual de guías (función 4)

Es la tarea central del producto, arregla un defecto que el usuario ya nombró y **no necesita ninguna pantalla nueva**. Todo lo demás se apoya en ella.

**Mínimo:** el bloque Envío con los cuatro controles editables —origen, caja, peso, seguro— más la elección de paquetería; recotización mientras se escribe; **la premisa completa con el origen dentro y la estimación diciendo de qué depende**; el botón que nombra paquetería y precio, con el seguro dentro cuando se conoce; la comprobación al confirmar con sus tres desenlaces; y el fallo que no cierra el panel y distingue lo reintentable.

**Y la matriz mandando en todo el panel, no solo en un bloque.** La cancelación de guía sale de `cancelaGuia` tanto en Envío como en Dirección: un panel que se contradice a sí mismo desmonta el argumento de la capa de en medio en la pantalla donde se demuestra.

**Lo que puede esperar:** el motivo obligatorio al salirse de la regla y el "Forzar paquetería" en lote.

**Lo que salió del alcance:** el bloqueo por edición, entero. No protegía de nada sin modelo de usuarios ni reloj compartido, y la comprobación al confirmar protege de lo que de verdad cuesta dinero.

### 2.º — Reglas de embalaje (función 3)

Es el dinero, y creció respecto de lo que parecía: **cinco condiciones en la primera versión, no tres**, porque el SKU viene en la línea del pedido y no hace falta catálogo para leerlo. Solo la condición por peso espera.

**Mínimo:** la lista ordenable con arrastre y flechas; las cinco condiciones —cantidad, costo, contiene SKU, canal, destino—; **los vetos, que entran en la primera versión** porque dependen del mismo SKU; la regla por defecto fija; el motivo por regla; la cola de revisión manual con su motivo escrito entero en cada fila; **el aviso de regla muerta en la fila**; y el contador de cuántas guías cayeron al final de la lista.

**El aviso de regla muerta no es un adorno del mínimo.** Es, junto al orden, lo que hace que esta lista valga más que una tabla: sin él, el comerciante ve siete filas sin saber cuál gana y una que no gana nunca sin que nada se lo diga. El dato ya se calcula para el panel de edición; sacarlo a la fila es moverlo, no calcularlo.

**Y el buscador de productos, que entra en el mínimo y no después.** Sin él, las dos condiciones que dependen del SKU —"contiene un producto" y los vetos— se capturan de memoria, y un SKU mal tecleado produce una regla que no falla nunca: simplemente no gana. Es el único error de esta pantalla que no hace ruido.

**Lo que puede esperar:** el bloque `.cobro` con el ahorro calculado, y el buscador en los dos sitios donde viajaría después —filtrar Pedidos por producto y la fuente de catálogo—.

**Lo que salió del alcance:** la condición por peso del pedido. Es el único dato que no existe en ninguna parte del sistema.

### 3.º — Recolecciones automáticas (función 2)

Alto rendimiento por hora ahorrada, pero solo paga con volumen.

**Mínimo:** la tabla de parejas en Configuración; **solo el modo agenda**, con ventana validada contra el horario del origen, corte, mínimo de piezas y el campo `via`; la tarjeta de guías que ninguna regla toma, en Recolecciones; "Sin piezas" como resultado que no cuenta en cumplimiento; y las dos cancelaciones leyendo la matriz.

**Lo que puede esperar:** las tres fallas seguidas y el aviso de Inicio.

**Lo que salió del alcance:** los modos acumulación y ruta fija —el agenda ya quita el trabajo repetitivo— y el calendario de días inhábiles, que no bloquea nada aunque no dependa de nadie.

### 4.º — El envío suelto (función 5), junto con la guía manual

**No es una quinta tanda: entra pegado a la función 4 y por eso no lleva puesto propio en la lista.** Un envío suelto termina en el bloque Envío que ya se construyó, y lo único que añade es un panel de captura de seis campos y una columna en la tabla. Construirlo aparte sería construir dos veces el mismo despacho.

**Mínimo:** el panel "Nuevo envío" con referencia obligatoria, dirección con la misma validación de siempre y total opcional; `canal: null` con su folio propio; la columna Canal diciendo "Sin canal"; el filtro; el aviso de cuándo se comprueba la dirección de verdad; y la línea que explica por qué Pedidos y Ventas dejan de coincidir.

**Lo que puede esperar:** los artículos opcionales, el buscador de direcciones ya enviadas y la comprobación de duplicados por destinatario y código postal.

**Lo que salió del alcance:** varios bultos en un envío, la libreta de contactos y la comprobación previa de dirección contra un padrón, que no existe.

### 5.º — Devoluciones (función 1)

La superficie más grande. Pero con la matriz construida deja de estar bloqueada: **el selector de retorno se construye completo ahora y funciona con cero opciones**, porque lee la matriz y pinta lo que haya.

**Mínimo:** el registro colgado del pedido con los cinco mecanismos; la pestaña con su tabla; el RTO creado desde el rastreo y el aviso de retorno declarado; **la puerta desde la guía con estatus**, con sus seis estados y con la espera de "en tránsito" dibujada; **la captura de la guía del comprador**, que va a ser el camino más usado; el salto de Autorizada a Recibida; "Recibida" registrando qué llegó; la resolución "Sin retorno"; **el motivo comercial y la causa del transportista como dos campos**, con la conversión del rastreo que no duplica; y la resta del cierre con el cargo `rto` capturado de la factura.

**La puerta desde la guía entra en el mínimo y no después**, porque es donde el comerciante se entera: mirando el rastreo. Sin ella, la única forma de registrar una devolución es buscar el pedido en una lista de cinco mil, que es el viaje de más que esta función existe para quitar.

**Lo que puede esperar:** la métrica de autorizadas sin movimiento y el desglose de piezas, que depende de que el canal mande líneas.

**Lo que salió del alcance:** el adaptador de emisión de cada paquetería, el aviso de último intento, y el campo de quién recibió.

---

# Los datos de ejemplo que hacen falta

Los artículos no viven en `pedidos`, viven en `DETALLES`, y a la mayoría se le sintetiza `{ nombre: "Artículo del pedido", sku: null, cantidad: 1, precio: total }`. Con eso no se puede enseñar funcionando **ninguna de las cinco condiciones**, **ningún veto**, **la revisión manual** ni **la devolución parcial**. Lo que sigue está escrito para copiarse tal cual.

## Los SKU, en la línea del pedido

**No hace falta un catálogo con pesos**, y por eso esta lista es más corta que la que haría falta para la condición por peso. Hacen falta SKU, nombre y cantidad en las líneas, que es lo que el canal manda.

| SKU | Nombre | Precio | Para qué sirve |
|---|---|---|---|
| `MON-PLU-01` | Pluma de metal grabada | $189 | Una pieza barata: gana "Pedidos de una pieza" |
| `MON-PLY-NEG-M` | Playera negra talla M | $349 | Varias piezas del mismo artículo |
| `MON-TAZ-360` | Taza de cerámica 360 ml | $229 | Acompañante en las condiciones "más N piezas" |
| `MON-AUD-BT` | Audífonos inalámbricos | $2,100 | Ligero y caro: condición por costo y seguro |
| `MON-CRI-6` | Juego de 6 copas | $1,480 | **El veto contra el Sobre** |
| `MON-VEN-16` | Ventilador de pedestal 16" | $1,290 | **La condición "contiene X más N piezas"** |
| `MON-LIC-800` | Licuadora 800 W | $1,890 | Caja mediana |
| `MON-COB-QS` | Cobertor queen size | $1,150 | Abulta y no pesa: el caso del peso volumétrico |
| `MON-TV-55` | Pantalla de 55 pulgadas | $12,400 | El tope por peso, en el único pedido que trae peso del canal |

Y **un SKU que una regla referencia pero que no aparece en ningún pedido**: `MON-VEN-61`, que además es un dedazo verosímil de `MON-VEN-16`. Es lo que enseña el estado `.producto--sin-ver` en el campo y el `.aviso--alerta` en la fila de la regla.

**`export const destinatariosVistos()`** deriva de las direcciones de los pedidos con guía: `{ nombre, ciudad, cp, ultimaFecha, direccion }`, la más reciente primero. Es la otra fuente del mismo buscador, y **hace falta al menos un nombre repetido con dos ciudades distintas** —dos "Arturo García"— o la columna del lugar no se ve hacer nada.

**`export const productosVistos = (dias = 30)`** deriva de las líneas de los pedidos y es lo que alimenta el buscador: `{ sku, nombre, pedidos, ultimaFecha }`, ordenado por uso descendente. **Los pedidos de ejemplo tienen que dar cifras de uso distintas entre sí**, o el tercer dato de cada resultado no se ve hacer nada: con la lista de arriba, `MON-TAZ-360` sale en cuatro pedidos, `MON-PLY-NEG-M` en tres y `MON-TV-55` en uno. Y **al menos un producto con su último pedido viejo** —`MON-COB-QS`, hace más de treinta días— para que "el último el 12 de agosto" se distinga de "el último el 18 de septiembre" y se vea para qué sirve esa columna.

## Pedidos que disparan cada condición, y pedidos que no

Catorce pedidos con `articulos` de verdad en `DETALLES`. **Los que no disparan son tan necesarios como los otros:** una condición que se cumple siempre no se distingue de una que no se evalúa.

| Pedido | Artículos | Qué demuestra |
|---|---|---|
| `#1010` | 1 × `MON-PLU-01` | Cantidad 1 a 1: **gana** "Pedidos de una pieza" |
| `#1011` | 1 × `MON-AUD-BT` | Cantidad 1 a 1 **y** costo ≥ $2,000: dos reglas se solapan y gana la de arriba |
| `#1012` | 2 × `MON-TAZ-360`, con **`pesoCanal` y `medidasCanal`** | **El pedido ya trae medidas**: mandan las del canal y no se evalúa ninguna regla |
| `#1013` | 3 × `MON-PLY-NEG-M` | Una sola línea, `cantidad: 3`: **cuenta piezas, no líneas** |
| `#1014` | 12 × `MON-PLY-NEG-M`, con **`pesoCanal: 16.8` y sin `medidasCanal`** | **El tope por peso.** Gana «Pedido caro» → Caja chica, que pesa 1.5: once veces menos. Revisión manual por el segundo motivo |
| `#1015` | 1 × `MON-VEN-16` | "Contiene `MON-VEN-16`" **más 0 piezas adicionales**: el producto grande solo |
| `#1016` | 1 × `MON-VEN-16`, 2 × `MON-TAZ-360` | "Contiene `MON-VEN-16`" **más 2 piezas**: el producto grande acompañado. Otra caja |
| `#1017` | 3 × `MON-TAZ-360` | Lleva tazas pero **no** el ventilador: la condición del SKU **no** se cumple |
| `#1018` | 1 × `MON-CRI-6` | **El veto sin caja.** Gana "Pedidos de una pieza" → Sobre → vetado; la de por defecto también es Sobre → **revisión manual** |
| `#1019` | 1 × `MON-CRI-6`, 1 × `MON-LIC-800` | **El veto con salida.** Gana otra regla que apunta a Caja mediana: se genera sin revisión manual |
| `#1020` | 2 × `MON-COB-QS` | Peso volumétrico: la alternativa más barata del `.cobro` |
| `#1021` | 1 × `MON-TV-55` | **Dos vetos a la vez.** «Pedidos de una pieza» le da Sobre y «Pedido caro» le da Caja chica: los dos vetados, y la de por defecto también. Revisión manual con las dos cajas nombradas |
| `#1022` | 1 × `MON-AUD-BT`, canal **Mercado Libre** | La condición por canal, y la devolución del canal |
| `#1023` | 2 × `MON-PLY-NEG-M`, canal **Amazon**, línea con `sku: null` | **Línea sin SKU**: la condición y el veto no se pueden evaluar y se saltan con aviso |

La pareja `#1018` / `#1019` es la que más importa: **el mismo producto vetado, con y sin salida.** Sin las dos, no se ve que el veto no siempre manda a revisión manual. El contraste de cantidad —un pedido que **no** gana «Pedidos de una pieza»— lo lleva `#1019`, que son dos piezas.

**El peso del canal y las medidas del canal son dos campos y no se ponen juntos.** Es la distinción que decide cuál de los dos motivos de revisión manual se puede demostrar:

- **Con `medidasCanal`** mandan las del pedido y **no se evalúa ninguna regla**: el pedido sale de la cadena en el paso 1. Solo `#1012` lo lleva. Poner medidas del canal en un pedido que tenía otro trabajo es quitarle ese trabajo.
- **Con `pesoCanal` y sin `medidasCanal`** la regla sí elige caja y después hay peso que comparar contra ella: es el único camino por el que el tope puede dispararse. Solo `#1014` lo lleva.

**Un pedido con veto nunca puede demostrar el tope por peso**, porque se queda sin caja en el paso 2 y el tope se evalúa en el 4. Por eso `#1021`, que tiene dos vetos, demuestra los vetos y no el tope: con el orden de evaluación fijo, los dos papeles no caben en el mismo pedido.

Y al menos dos que salgan de **Tienda Roma**: `#1013` y `#1020`, para que el selector de origen no sea decorativo y para que cambiar "Sale de" tenga dos valores entre los que moverse.

## Las reglas de embalaje — `export const reglasEmbalaje`

Seis, **en este orden y no en otro: las de producto arriba, las genéricas abajo.**

| # | Regla | Caja | Condición |
|---|---|---|---|
| 1 | **Ventilador solo** | Caja mediana | Contiene `MON-VEN-16` más 0 a 0 piezas |
| 2 | **Ventilador acompañado** | Caja grande | Contiene `MON-VEN-16` más 1 a 5 piezas |
| 3 | **Cristalería acompañada** | Caja mediana | Contiene `MON-CRI-6` más 1 a 5 piezas |
| 4 | **Pedidos de una pieza** | Sobre | Cantidad de 1 a 1 |
| 5 | **Pedido caro** | Caja chica | Costo de $2,000 en adelante |
| 6 | **Una pieza a entrega local** | Caja chica | Cantidad de 1 a 1 y destino local |
| — | **Por defecto** | Sobre | *(vacía)* |

**Con las genéricas arriba, este conjunto rompe dos de sus propias demostraciones**, y merece quedar escrito porque es un error que se vuelve a cometer con un argumento razonable —"la general cubre más casos"—:

- **`#1015` deja de demostrar «Ventilador solo».** Con «Pedidos de una pieza» encima, esa regla no gana nunca y el pedido sale en Sobre.
- **`#1019` sale en Caja chica por «Pedido caro»** en vez de en Caja mediana por «Cristalería acompañada». El motivo escrito en esa misma regla dice *"En una caja chica se rompieron tres veces."* Siguiendo el orden equivocado, las copas acaban en la caja que las rompe.

Lo que cada regla demuestra con el orden correcto:

- La **1** y la **2** dan cajas **distintas** a propósito —mediana el ventilador solo, grande acompañado—: si las dos dieran la misma, la condición "más N piezas" no se vería hacer nada.
- La **3** salva a `#1019` de la revisión manual, que es su único trabajo.
- La **4** y la **5** se solapan en `#1011`, y es el caso con el que se enseña el arrastre: mover «Pedido caro» un puesto arriba cambia `#1011` de Sobre a Caja chica. Es la demostración de que el orden decide y no decora.
- La **6** es la regla muerta: «Pedidos de una pieza», en el puesto 4, ya la cubre. Su `efectoEmbalaje` va en `guias: 0` y es la que enseña el `.aviso--alerta` en la fila.

La **de por defecto apunta a Sobre**, y es deliberado: es lo único que hace posible el caso de `#1018`. Con Caja chica por defecto, el veto sin caja no se puede enseñar.

Y una séptima, **desactivada**, con la condición `Contiene MON-VEN-61`, para el aviso de SKU que no aparece en ningún pedido y para que el estado "Desactivada" se pueda ver en la fila.

## Los vetos — `export const vetosEmbalaje`

Dos, porque con uno no se ve que son una lista:

- `MON-CRI-6` → nunca `Sobre`. *(Frágil. Dispara la revisión manual de `#1018` y no la de `#1019`.)*
- `MON-TV-55` → nunca `Sobre` y nunca `Caja chica`. *(Enseña que un SKU puede tener más de un veto, y que el diálogo de borrar una plantilla tiene que contarlos.)*

## El efecto de cada regla — `export const efectoEmbalaje`

Histórico, no se calcula en pantalla: `{ reglaId, guias, porVolumen, diferencia, alternativa: { plantilla, ahorro } }`.

**Las cifras van a la escala del prototipo. Con 40 pedidos en pantalla, un histórico de 214 guías se contradice a la vista** y el aviso general de datos de ejemplo no lo salva: son dos números que se pelean dentro de la misma tarjeta. **39 guías en total**, repartidas así:

| Regla | guias | porVolumen | diferencia | alternativa |
|---|---|---|---|---|
| Ventilador solo | 2 | 0 | $0 | — |
| Ventilador acompañado | 1 | 1 | $96 | — |
| Cristalería acompañada | 9 | 4 | $612 | Caja chica, $188 |
| Pedidos de una pieza | 14 | 0 | $0 | — |
| Pedido caro | 6 | 3 | $410 | Sobre, $150 |
| Una pieza a entrega local | 0 | 0 | $0 | — |
| Por defecto | 7 | 2 | $208 | — |

Suman 39, que es lo que dice el pie de la tarjeta, y la de por defecto sale al 18 %, que es lo que dice su `.cobro`. **Tres reglas sin alternativa**, para que se vea que el bloque de ahorro no siempre aparece, y **la muerta en cero**, que es lo que hace que su aviso tenga sentido.

## Las devoluciones — `export const devoluciones`

Doce registros. **Los cinco mecanismos, y más de uno de los que importan:**

| # | Mecanismo | Estado | Para qué |
|---|---|---|---|
| 1 | Guía prepagada | Solicitada | La cola: es la que se autoriza en el recorrido |
| 2 | Guía prepagada | Autorizada, 2 días | El camino normal, todavía sin atascarse |
| 3 | **Guía del comprador** | Autorizada, **14 días sin movimiento** | La métrica de autorizadas sin moverse, y la pastilla en `--aviso` |
| 4 | **Guía del comprador** | Con guía de retorno, `via: null`, flete $0.00 | El quinto mecanismo funcionando, con su nota "La pagó el comprador" |
| 5 | Guía prepagada | Con guía, **3 días sin usar** | Tono neutro |
| 6 | Guía prepagada | Con guía, **9 días sin usar** | Tono aviso |
| 7 | Guía prepagada | Con guía, **21 días sin usar** | Tono malo. El caso más caro de ignorar |
| 8 | **RTO** | En tránsito de regreso | Creada sola desde el rastreo, con su cargo `rto` en el envío original |
| 9 | Guía prepagada | **Recibida con faltante** | 1 de 2 piezas, estado "Con faltante": sostiene la nota de crédito parcial |
| 10 | Guía prepagada | **Cerrada** | Reembolso parcial de $1,240, con los tres costos poblados |
| 11 | **Del canal** (Mercado Libre) | Cerrada | Sobre `#1022`. Sin guía nuestra, resolución capturada a mano |
| 12 | Guía prepagada | **Sin retorno** | Autorizada, reembolsada, el producto no regresa |

Más **una recibida sin pedido amarrado**, para "el comprador mandó de regreso sin avisar".

**Dos de ellas sobre pedidos sin líneas** —los que conservan el artículo sintético— para que se vea la frase *"Shopify no reporta las líneas de este pedido, así que la devolución solo puede ser total"* y no solo el caso bonito. Las otras diez, sobre pedidos con líneas, para que el desglose de piezas se pueda enseñar.

## Envíos que van de regreso

Dos envíos en `pedidos` con `estado: "Detenido"` y `original` que **declare** el retorno con las palabras del carrier:

- `Delivery exception — return to shipper scheduled`
- `Rechazado por el destinatario. En proceso de retorno al remitente.`

Y **un tercero que no lo declare**: `Delivery exception — customer not available`. Sin él no se ve que la pastilla "Va de regreso" solo sale con los dos primeros, que es justo lo que hay que poder comprobar, y que sobre el tercero no hay ningún aviso de último intento porque no se puede.

## Recolecciones

- **`export const reglasRecoleccion`** con cinco parejas de las doce posibles: Puebla × DHL en agenda con `via: null`; Puebla × Estafeta en agenda con mínimo 5; Roma × UPS sin regla; Puebla × Redpack en agenda con **`via: "Skydropx"`**; Roma × FedEx sin regla. La cuarta es la que enseña el campo `via` funcionando y la que hace que el `select` aparezca.
- **Guías que ninguna regla toma:** cuatro guías de Puebla × DHL compradas en **Skydropx**, que la regla directa no va a incluir. Es el caso de la tarjeta de 2.4, del tercer hecho del panel y del `.aviso--alerta` de la fila.
- **Tres días "Sin piezas"** en el historial (`piezas: 0, recogidas: null, resultado: "sin-piezas"`).
- **Tres fallas seguidas de la misma pareja:** hoy Estafeta × Puebla tiene una fallida y dos incompletas. Hay que dejar `2026-09-19`, `2026-09-17` y `2026-09-13` en `recogidas: 0`.

## La matriz — `export const CAPACIDADES`

Es el dato del que dependen los otros, y **su valor está en que las celdas no digan todas lo mismo**. Si todas dicen "sí", la mitad del documento no se ve; si todas dicen "sin registro", tampoco.

**Nueve filas, no cinco.** Tantas como paqueterías conoce el producto: las que están en el orden de preferencia de Configuración y las que salen en `cotizar()`. Con cinco, las cuatro que faltan caen en "sin registro" por omisión y sin ningún sitio donde resolverlo, que es exactamente el defecto que esta versión corrige.

| | DHL | Estafeta | FedEx | Paquetexpress | Redpack | UPS | 99minutos | AMPM | T1 Envíos |
|---|---|---|---|---|---|---|---|---|---|
| **Cuenta conectada** | Sí | Sí | Sí | — | — | — | — | — | Sí |
| Cancelar recolección | **Sí** | **No** | Sí, corte 16:00 | **Sin registro** | Sin registro | Sin registro | **No** | Sin registro | Sin registro |
| Sumar piezas | No | Sin registro | Sin registro | Sin registro | **Sí** | Sin registro | Sin registro | Sin registro | Sin registro |
| Días de anticipación | 5 | 3 | 5 | *(sin dato)* | 3 | *(sin dato)* | *(sin dato)* | *(sin dato)* | *(sin dato)* |
| Cancelar guía | Sí | **No** | **Sin registro** | Sin registro | Sin registro | Sin registro | Sin registro | Sin registro | Sin registro |
| Emitir guía de retorno | Sin registro | Sin registro | Sin registro | **No** | Sin registro | Sin registro | Sin registro | Sin registro | Sin registro |
| Caducidad del retorno | *(sin dato)* | *(sin dato)* | *(sin dato)* | — | *(sin dato)* | *(sin dato)* | *(sin dato)* | *(sin dato)* | *(sin dato)* |
| Intentos numerados | Sin registro | Sin registro | Sin registro | Sin registro | Sin registro | Sin registro | Sin registro | Sin registro | Sin registro |
| **Costo del seguro** | **1.5 %, mínimo $35** | **No asegura** | Sin registro | Sin registro | Sin registro | Sin registro | Sin registro | Sin registro | Sin registro |
| Divisor volumétrico | 5000 | 5000 | 5000 | 5000 | 5000 | 5000 | 5000 | 5000 | 5000 |

La fila **Cuenta conectada** no es una capacidad: está en la tabla para que se vea de un golpe que las dos preguntas son independientes. **99minutos no tiene cuenta y sí tiene un "no" confirmado**, y ése es el caso que demuestra que conectar no resuelve lo segundo. **Paquetexpress es el ejemplo textual de todo el documento** y tampoco tiene cuenta: si su fila no existiera, su "Confirmar con Paquetexpress" tampoco, y la frase de la sección 0.3 quedaría sin sitio a donde llevar.

**El costo del seguro con tres valores distintos**, que es lo que hace que la casilla de asegurar se pueda enseñar tres veces: DHL con porcentaje y mínimo, Estafeta que no asegura, y el resto sin registro. Con un solo valor, dos de las tres pantallas del punto 4 de §4.2 no se ven.

Con **procedencia distinta en al menos tres celdas**: la de DHL confirmada con la paquetería y fechada, la de Redpack marcada por el comerciante sobre su cuenta, y el resto sin registro. Es lo único que demuestra que las tres frases de procedencia son tres y no una.

**Dos capas que difieren en una celda**, para que la línea de "gana la de cuenta" tenga dónde verse: `DHL · Cancelar guía` con **Sí** en la capa de producto y **No** en la de cuenta. El control muestra "No" y debajo dice por qué.

Y **una celda marcada por el comerciante que va a fallar a propósito**: `Redpack · Sumar piezas: Sí`. Al intentarlo, el fallo ofrece quitarle el registro. Sin ese caso en los datos, esa vuelta no se puede enseñar.

Esta tabla deja el día del lanzamiento retratado: **ninguna paquetería emite retorno**, así que el selector sale vacío y el quinto mecanismo es el camino. Que sea incómodo de ver es la razón por la que tiene que estar en los datos de ejemplo.

## Los envíos sueltos

**Tres**, porque con uno no se ve que son un caso y no una excepción, y porque la línea de "3 no cuentan como venta" necesita tres.

| Folio | Referencia | Total | Para qué sirve |
|---|---|---|---|
| `E-0041` | Garantía #4412 | *(vacío)* | El caso limpio: sin total, la columna dice "—" y no entra en ingresos |
| `E-0042` | Venta por WhatsApp | $1,890 **a mano** | El total capturado: se ve la marca "a mano" y sigue sin contar como venta |
| `E-0043` | Muestra a cliente | *(vacío)* | Con **artículos capturados** —2 × `MON-TAZ-360`— para que se vea que un suelto con líneas sí entra en las reglas por producto y admite devolución parcial |

`E-0041` y `E-0042` con guía emitida, para que **Cobros y Desempeño los cuenten** y las dos líneas de 5.6 tengan cifras reales que enseñar. **`E-0043` sin guía todavía**, para que se vea caer en "Listos para despachar" junto a los pedidos pagados, con su celda de Pago en guion y su botón de generar activo desde el primer momento. Uno de ellos, `E-0041`, **a un código postal que no está en `coloniasPorCP`** —29321— porque es el único modo de ver la ayuda del catálogo sin inventarla.

Y **`E-0042` con el mismo destinatario y el mismo CP que `#1016`**, con siete días de diferencia, para que la comprobación de duplicado tenga dónde dispararse. Sin ese par, ese aviso no se puede probar.

## La devolución que el rastreo convierte

Es el caso que junta los dos porqués, y **no se puede enseñar con un registro: hacen falta tres**, porque lo que hay que ver es la diferencia entre ellos.

| # | Cómo está | Para qué sirve |
|---|---|---|
| **A** | Registrada a mano el 17 sobre `#1028` (detenido), **convertida a RTO el 19** | La franja con las dos fechas, el bloque "Por qué regresa" con sus dos filas, y "La registró: El comerciante" con el mecanismo diciendo "Retorno al remitente" |
| **B** | RTO nacido de cero sobre `#1029` | El mismo bloque con una sola fila útil: motivo "Entrega fallida" puesto por el sistema, y "La registró: La paquetería" |
| **C** | Cualquiera de las doce normales | **El bloque no existe.** Es la comprobación de que la ausencia se dibuja como ausencia y no como hueco |

Y **una cuarta, `D`: convertida con guía de retorno ya emitida**, para el `.aviso--alerta` de la guía huérfana y para que su renglón aparezca en la resta del cierre. Sin ella, el cargo que más fácil se pierde tampoco se puede enseñar perdiéndose.

`causaTransportista` en las convertidas tiene que traer **las dos formas**: la traducida —"Destinatario ausente"— y el texto original del carrier —`Delivery exception — recipient not available, returning to shipper`—. Con solo una, la fila de segundo plano no tiene qué enseñar.

Y **un pedido con dos envíos y dos devoluciones**, `#1030`, una por cada guía de ida: es lo único que demuestra que la búsqueda es por envío y que la primera columna sabe nombrar la guía cuando hace falta.

## Las devoluciones desde una guía con estatus

Las doce de arriba cubren los estados de la devolución. Faltan las que cubren **los seis estatus de la ida**, que es otra cosa: no es en qué estado está la devolución, es qué permitía la guía cuando se registró.

Hacen falta seis envíos, uno por estatus, y **los seis tienen que existir en `pedidos` para poder abrir su panel**:

| Estatus de la ida | Pedido | Qué se ve |
|---|---|---|
| Generada, sin recolectar | `#1024` | Sin botón. La línea del paquete en bodega y la cancelación de la ida |
| Recolección pendiente | `#1025` | Lo mismo |
| **En tránsito** | `#1026` | **El caso principal:** registro en espera, con el botón de emitir en gris y su motivo |
| Entregado | `#1027` | El flujo completo con el selector de 1.4 |
| Detenido | `#1028` | Registro sin retorno, con rastreo público y contacto |
| RTO en curso | `#1029` | Botón "Ver la devolución", que lleva a la que ya creó el rastreo |

`#1026` es el que hay que poder enseñar dos veces: **con la ida en tránsito y con la ida ya entregada**, para que se vea la devolución moverse sola de "Espera la entrega de la ida" a "Lista para emitir". Con los datos fijos del prototipo eso son dos pedidos, `#1026` y `#1026b`, o un interruptor de demostración: sin uno de los dos, el único momento que justifica todo el diseño de la espera no se puede mostrar.

## Las nueve paqueterías en Paqueterías

Hoy `cuentasEnvio` solo tiene T1 Envíos, así que `paqueterias.html` no dibuja tarjeta de ninguna paquetería. Hacen falta **dos listas**, no una:

- **Las tres con cuenta** —DHL, Estafeta y FedEx, que ya existen en `conexiones`— con su `que`, su `desde`, sus `campos` y su teléfono de atención.
- **Las cinco sin cuenta** —Paquetexpress, Redpack, UPS, 99minutos y AMPM— con su nombre y su teléfono, y nada más. Son `.ficha--apagada` y **su pliegue de capacidades funciona igual**: es lo único que hace que "Confirmar con Paquetexpress" lleve a alguna parte.

El teléfono es obligatorio en las nueve, con cuenta o sin ella: es lo que cita cada `.instruccion`, y una instrucción que dice "llama" sin decir a dónde no es una instrucción.

---

# Para el PM

Los cuatro puntos quedaron resueltos y tres eran confirmaciones. El cuarto salió mejor de lo que yo lo había planteado: yo pedí una conversión en vez de un alta, y de ahí saliste con **dos campos en vez de uno**, que es el arreglo de verdad. "El cliente se arrepintió" y "destinatario ausente" contestan dos preguntas distintas, y en un solo campo el que se escribe después borra al que hacía falta.

Los seis de antes siguen abiertos, y ninguno bloquea:

**1. La restricción de `via` hay que avisarla antes de que duela, y eso lo decidí yo.** §2.2 dice que quien caiga en el caso lo resuelve separando por origen o eligiendo un camino, pero no dice cuándo se entera. Diseñé tres avisos: uno mientras se edita la regla, uno en la fila de Configuración y la tarjeta de Recolecciones con la acción manual. **Confírmame que quieres los tres**; con menos, la restricción se descubre con un camión vacío.

**2. Un veto no se puede saltar desde el panel del pedido, y eso también lo decidí yo.** Las cajas vetadas salen deshabilitadas con su motivo en el `title`, y para usarlas hay que ir a quitar el veto. QA lo probó y funciona. **Si prefieres permitirlo con un motivo escrito, dilo, porque cambia el bloque.** Y en la misma línea: **quitar un veto pide confirmación**, porque es lo único que protege un producto frágil y lo quitaba un clic de más.

**3. El reloj de la revisión manual.** Un pedido que la generación automática rechaza a las dos de la mañana espera hasta que alguien abra Pedidos. **Lo conté desde que la regla falló**, no desde que entró el pedido, que es el mismo criterio que ya está escrito para los detenidos. Es una decisión de dato, no de pantalla, y conviene que quede en el documento.

**4. El cargo del RTO se captura de la factura, y no había dónde.** Cobros concilia, no captura. **Lo puse en el diálogo de cierre de la devolución**, que es donde hace falta para la resta. Si la captura de cargos tiene que vivir en Cobros —porque llegan muchos y no solo los de devolución— eso es una pantalla que este documento no diseña.

**5. El tope por peso tiene una casilla y casi ningún caso.** §3.7 dice que solo se puede evaluar sobre los pedidos que traen peso del canal, y con el orden de evaluación fijo un pedido con medidas del canal sale en el paso 1 y uno con veto en el paso 2: al tope solo le queda una franja estrecha. **Vale la pena decidir si justifica su casilla ahora o si entra con el catálogo**, junto a la condición por peso.

**6. §3.6 conserva una rama que en esta versión está muerta.** "El peso del catálogo sumado, si existe" no corre nunca sin catálogo, y quien programe va a escribir una rama que no se puede probar. **Propongo que el documento diga que en la primera versión el peso sale de la plantilla o del canal.**

Y dos cosas nuevas, las dos chicas y las dos de este último ajuste:

**7. La guía de retorno huérfana necesita renglón propio en la resta del cierre, y lo añadí.** §1.4 dice que al convertir no se pisa la guía ya emitida y que se ofrece cancelarla; §1.9 lista tres costos y ninguno es ése. Una guía emitida, sin usar y cobrada es dinero real, y sin renglón la resta del cierre sale más barata que la factura. **Lo puse como cuarta fila, visible solo cuando la hubo.** Es el cargo que más fácil se pierde: nadie lo pidió dos veces y nadie lo espera.

**8. La etiqueta del pendiente cambia en tres sitios, no en uno.** "Pagados sin guía" vive además en la `.metrica__nota` de Pedidos —que hoy dice "Pendientes de despachar", un segundo nombre para lo mismo— y en la tarjeta de Inicio. Los tres pasan a **"Listos para despachar"**. La clave del predicado se queda como está para no romper los enlaces que ya llevan `?pendiente=pagados-sin-guia`. Y vale la pena notar que el nombre nuevo **describe el predicado mejor de lo que lo describía el viejo**: ese pendiente ya excluía los pedidos con error y los que esperan corrección, precisamente porque no están listos, y "pagados" nunca dijo eso.

**Y una que ya no lo es:** el título "Con qué paquetería sale cada pedido" queda confirmado, así que el renombrado de Configuración está cerrado entero.

Sobre partirla en pestañas: **no todavía**, por la razón que tú mismo dejaste escrita —el corte es en la quinta zona y hay cuatro— más una que conviene anotar: `sistema.html` reserva las pestañas para vistas del mismo objeto, y estas cuatro zonas son cuatro pasos de un proceso. Un proceso se lee en orden. Lo que sí deja hecho el renombrado es el corte futuro: las zonas ya se llaman **Entrada · Embalaje · Paquetería · Recolección**, y agrupar las dos de en medio bajo Envío el día que toque es mover dos rótulos, no reescribir nada.

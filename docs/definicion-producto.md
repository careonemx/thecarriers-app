# Definición de producto — Devoluciones, recolecciones automáticas, reglas de embalaje y guías manuales

Documento para el equipo de diseño. Define comportamiento, no pantallas.

Se apoya en lo que ya existe en el prototipo: `pedidos`, `envios`, `recolecciones`, `plantillas`, `origenes`, `reglasPaqueteria`, `decidirPaqueteria()`, `pesoCobrado()`, `PENDIENTES` y `tonos` en `assets/datos.js`; el panel de pedido y el lote en `app/pedidos.html`; la cadena automática en `app/configuracion.html`.

Dos reglas mandan sobre todo lo de abajo, y están tomadas de `sistema.html`:

- **Somos la capa intermedia.** Ninguna acción se ofrece si depende de una integración con la paquetería que no existe. Cuando la acción existe a medias, la interfaz dice qué hace el sistema y qué le toca a la persona.
- **No se inventa lo que no nos informan.** Un dato que no viene del transportista no se muestra, o se muestra marcado como estimación nuestra con el método a la vista.

**Constancia de revisión — quinta versión.** Cuatro ajustes salidos del diseño de las dos funciones nuevas. El más importante: el rastreo **crea o convierte, nunca duplica** (1.4), porque un envío detenido acaba normalmente en retorno y ese es justo el caso donde el comerciante ya registró la devolución a mano; de ahí sale además que el motivo comercial y la causa del transportista sean **dos campos** (1.3), porque son dos hechos verdaderos sobre el mismo paquete. Los otros tres: la serie del envío suelto es `E-0043` porque `TC` ya lo usan las guías (5.2), el contador de días en *Autorizada* no corre mientras la ida va en tránsito (1.5), y capturar y despachar un envío suelto son dos bloques del mismo panel que nunca se cierra (5.3).

**Constancia de revisión — cuarta versión.** El dueño del producto pidió dos funciones que ponen a prueba la frontera del intermediario. **El envío suelto** —una guía sin pedido detrás— entra como sección 5 y se modela como un pedido sin canal, no como una lista aparte, porque `envios` se deriva de `pedidos` y una tercera colección rompería todas las pantallas que leen esa derivación. **El retorno desde una guía con estatus** no es una función nueva sino una puerta de entrada más (1.4) y una condición nueva (1.7): el estatus de la guía de ida decide qué se puede hacer, y en cuatro de los seis estatus la respuesta es que todavía no se emite nada. Las secciones 1.7 a 1.11 corrieron un número.

**Constancia de revisión — tercera versión.** QA probó las funciones construidas y devolvió seis arbitrajes. Dos corrigen este documento con el código delante: el orden de las reglas de embalaje, que estaba al revés y rompía dos de sus propias demostraciones (3.4), y el orden de evaluación, que hacía imposible el caso que ilustraba el tope de peso (3.3). Los otros cuatro cierran huecos: la matriz pasa a tener una fila por paquetería y no por cuenta conectada (0), "sin confirmar" se redacta como hueco del registro y no en primera persona (0), el costo del seguro se vuelve una celda de la matriz (4.3) y la tarifa por zona se declara fuera de la primera versión diciendo qué se enseña mientras tanto (4.4).

**Constancia de revisión — segunda versión.** La primera versión dejaba veintitrés preguntas abiertas con las paqueterías y daba por hecho que se contestarían antes de construir. No se van a contestar. Esta versión resuelve doce contradicciones que encontró el equipo de diseño y sustituye la espera por una pieza: **la matriz de capacidades** de la sección 0, que declara lo desconocido como desconocido y deja que la interfaz se dibuje sin la respuesta. Además cierran tres supuestos que el prototipo no sostiene: no hay servidor, no hay modelo de usuarios y no hay reloj compartido. Lo que dependía de ellos se resolvió sin ellos o salió de la primera versión, y en la sección "Alcance de la primera versión" está dicho cuál fue cuál.

---

## 0. La matriz de capacidades

Todo lo que sigue depende de saber qué expone cada paquetería, y no lo sabemos. La respuesta no es esperar: es **convertir el desconocimiento en un dato del producto, visible y editable.**

`CAPACIDADES` es una tabla con **una fila por cada paquetería que el producto puede ofrecer**, no por cada cuenta conectada. Cada celda tiene **tres valores, no dos**: sí, no y **sin confirmar**.

```
CAPACIDADES["Estafeta"] = {
  cancelaRecoleccion, corteCancelacion, sumaPiezas, diasAnticipacion,
  cancelaGuia, guiaRetorno, caducidadRetorno, intentosNumerados,
  divisorVolumetrico, costoSeguro, telefono
}
```

**Por qué tres valores y no dos.** Un "no" es una afirmación sobre un tercero. Dicho sin haberlo confirmado y resultando falso, el comerciante deja de usar una función que sí tenía. "Sin confirmar" no es un valor vacío: es información, y además es la que el comerciante puede completar, porque él tiene el contrato y el ejecutivo de cuenta.

**Por qué una fila por paquetería y no por cuenta conectada.** El producto ordena y cotiza paqueterías que todavía no tienen cuenta: UPS, Paquetexpress, 99minutos y AMPM están en el orden de preferencia y salen en las cotizaciones de Pedidos. Con la matriz limitada a las cuentas conectadas, esas cuatro caen en "sin confirmar" por omisión y sin ningún sitio donde resolverlo, **y un "sin confirmar" que no se puede confirmar es indistinguible de un "no"** —que es exactamente la distinción por la que esta matriz existe—. La tabla tiene tantas filas como paqueterías conoce el producto, siempre. Una celda sin valor es un hueco declarado, no una ausencia.

**Dos capas por celda, y la de la cuenta manda.** La capa de producto se confirma con la paquetería y vale para todos. La capa de cuenta la confirma el comerciante sobre su contrato, porque dos cuentas de la misma paquetería no tienen contratados los mismos servicios. Cuando hay valor de cuenta, gana el de cuenta. Cada celda guarda de dónde salió y cuándo. *Porque un dato sobre un tercero sin fecha caduca en silencio.*

Una paquetería sin cuenta conectada tiene solo la capa de producto, y la ficha lo dice: lo que se muestra es lo que esa paquetería expone en general, y el contrato del comerciante puede tener menos. **El paso de confirmar existe en las nueve filas**, haya cuenta o no.

**Cómo se nombra cada valor:**

| Valor | Qué se ofrece | Cómo se nombra |
|---|---|---|
| Sí | La acción, completa | Normal |
| No | Nada. En su lugar, la instrucción de qué le toca a la persona | "Estafeta no cancela recolecciones desde aquí" |
| Sin confirmar | Nada, igual que en "no", más el paso de confirmarlo | "Sin registro de si Paquetexpress cancela recolecciones desde aquí" + **Confirmar con Paquetexpress** |

**"Sin confirmar" se redacta como un hueco del registro, nunca en primera persona.** No *"no hemos confirmado si Paquetexpress cancela"*, sino *"no hay registro de si Paquetexpress cancela"*. `sistema.html` prohíbe la primera persona —la interfaz describe, no conversa, y el sistema no es un interlocutor— y aquí no hace falta ninguna excepción, porque la afirmación honesta no es sobre lo que sabemos: **es sobre lo que la matriz tiene guardado.** La matriz es un registro y una celda vacía es un hecho comprobable de ese registro. Quien confirma aparece donde le toca, que es la acción: "Confirmar con Paquetexpress". *Porque una excepción a una regla del sistema sobrevive lo que tarda alguien en leer la regla sin leer la excepción, y aquí no se necesita ninguna.*

**La acción nunca se ofrece con "sin confirmar".** *Porque ofrecer una acción que quizá funcione es la forma más cara de averiguarlo: se averigua con un paquete real.*

**Dónde vive.** En Paqueterías, una fila por paquetería, con la capacidad plegada como las credenciales. La pantalla pasa a contestar dos preguntas separadas que hoy se leen como una: **si hay cuenta conectada** y **qué expone esa paquetería**. *Porque son independientes —hay paqueterías con cuenta que no exponen nada y paqueterías sin cuenta que exponen todo— y juntarlas hace creer que conectar una cuenta resuelve lo segundo.*

**Una paquetería del orden de preferencia sin cuenta conectada se marca como tal**, porque puede ordenarse pero nunca puede salir elegida. Es una regla que no puede ganar, de la misma familia que una regla de embalaje muerta, y se nombra igual: el comerciante decide si la conecta o la saca de la lista.

**Esta matriz es lo que hace que las veintitrés preguntas abiertas dejen de bloquear.** Lo que antes era "no se puede construir hasta saber" ahora es "se construye leyendo la matriz, y el día que se sepa, se cambia una celda". Las preguntas siguen al final del documento, ahora con lo que se construye mientras tanto.

---

## 1. Devoluciones

### 1.1 El problema

Una distribuidora de 20 a 5,000 envíos al mes devuelve entre el 3 % y el 12 % de lo que manda, y hoy esa operación vive en WhatsApp y en una libreta. El paquete regresa, alguien lo recibe en la bodega, y nadie sabe a qué pedido corresponde ni si ya se reembolsó. El costo del retorno aparece en la factura de la paquetería un mes después y nadie lo reconoce.

El producto no tiene que resolver la política comercial de devoluciones. Tiene que resolver tres cosas: **que exista una guía de retorno cuando se necesita, que el paquete de regreso se pueda seguir, y que su costo quede pegado al pedido original.**

### 1.2 Una devolución no es una sola cosa

Antes de definir el flujo hay que separar cinco mecanismos distintos que hoy se llaman igual. Separarlos importa porque cada uno responde distinto a dos preguntas: **quién emite la guía y quién la paga.** Esas dos respuestas son las que deciden si un costo entra o no en la conciliación.

| Mecanismo | Quién emite | Quién paga | Qué hace The Carriers |
|---|---|---|---|
| **Retorno al remitente (RTO)** | La paquetería, sola | El comerciante, sin haberlo pedido | Lo detecta en el rastreo. No lo genera ni lo puede evitar. |
| **Guía de retorno prepagada** | Nosotros, contra la cuenta del comerciante | El comerciante | La emite y se la entrega al comprador |
| **Recolección de retorno en domicilio** | Nosotros | El comerciante | Programa la recolección en la dirección del comprador |
| **Guía del comprador** | El comprador, por su cuenta | El comprador | Solo captura el número y rastrea |
| **Devolución del canal de venta** | El marketplace | Según su política | No interviene. La logística es del canal. |

**El RTO es el más frecuente y es el que hoy no se ve.** Un envío con `estado: "Detenido"` y motivo "Destinatario ausente, segundo intento" termina, si nadie lo atiende, en un retorno que la paquetería cobra completo. Es la primera funcionalidad a construir, y conviene decir con precisión qué promete y qué no: la sección 1.8 lo acota.

**La guía del comprador va a ser el caso más frecuente al principio**, precisamente porque puede que ninguna paquetería exponga emisión de retorno el día del lanzamiento. Es un mecanismo y no un atributo del segundo: emite otro y paga otro, que son las dos preguntas que definen la tabla. *Porque meter una guía que nosotros nunca emitimos ni pagamos en el mismo cajón que las que sí, mete en la conciliación un costo que no existe.*

**La devolución del canal de venta no es nuestra.** Cuando el pedido salió con la logística de Mercado Libre o de Amazon, la devolución la administra el marketplace con sus propias guías. El comerciante no la genera aquí y nosotros no podemos rastrearla con nuestras cuentas. En un pedido de ese tipo, la acción de emitir no se ofrece: se muestra el enlace al panel del canal y se conserva el registro. *Porque ofrecer un botón que duplicaría una guía que el marketplace ya emitió crea dos paquetes y dos cobros.*

### 1.3 Qué es una devolución en este producto

**Una devolución es un registro que cuelga de un pedido existente, con su propio envío de regreso.** No es un pedido nuevo.

La estructura de datos ya anticipó esto: en `datos.js` está escrito que cuando se rompa el 1:1 entre pedido y guía —"un pedido partido en dos guías, una devolución sin pedido nuevo"— la solución es que `envio` pase a ser una lista, no abrir una segunda pantalla. **Se respeta.** Una devolución es un segundo envío del mismo pedido, con `sentido: "retorno"`. *Porque el folio del pedido es la única llave que el comerciante, el comprador y la paquetería comparten.*

Campos mínimos del registro de devolución:

- `pedido` — folio del pedido original. Obligatorio.
- `origenDevolucion` — quién la inició: `comprador`, `comerciante`, `paqueteria` (RTO) o `canal`.
- `motivo` — **por qué el cliente devuelve**, de una lista corta y fija: producto equivocado, producto dañado, no era lo esperado, entrega fallida, arrepentimiento, garantía. Lista fija para poder contarlos; un campo libre no se agrupa.
- `causaTransportista` — **por qué el paquete regresó**, tal como lo reportó la paquetería, con su texto original. Null mientras no haya retorno del transportista.

**Son dos campos y no uno.** "El cliente se arrepintió" y "destinatario ausente" son dos hechos verdaderos sobre el mismo paquete y contestan preguntas distintas: el primero decide el reembolso, el segundo decide a quién se le reclama. *Porque metidos en un solo campo, el que se escriba después borra al que se escribió antes, y el que se borra es siempre el que hacía falta.*
- `piezas` — qué artículos del pedido regresan.
- `mecanismo` — cuál de los cinco de arriba.
- `envioRetorno` — guía, paquetería, `via`, costo, estado. Null mientras no exista.
- `resolucion` — reembolso, cambio, nota de crédito, rechazada. Null hasta el cierre.

**`piezas` se detalla cuando el pedido trae líneas; cuando no, la devolución solo puede ser total, y se dice.** Una devolución parcial es lo normal en la operación real, pero solo se puede expresar sobre un pedido que tenga artículos con cantidad. Sobre un pedido con una línea sintética de una pieza, "2 de 5" no existe y forzar el desglose inventaría un detalle. La dependencia es una sola —líneas de pedido con SKU y cantidad— y es la misma que habilita las condiciones de embalaje por producto de la sección 3.3.

### 1.4 Quién la origina

Cuatro puertas de entrada. Las cuatro terminan en el mismo registro, y eso es literal: **nunca hay dos devoluciones abiertas del mismo envío.**

**Desde el canal de venta.** Shopify y WooCommerce reportan solicitudes de devolución por webhook. Cuando llega una, el sistema crea el registro en estado `Solicitada` y lo pone en la cola. *Porque la solicitud ya existe del lado del comprador y volver a capturarla a mano es trabajo duplicado que además diverge.* En Mercado Libre y Amazon la solicitud existe pero la logística es del canal: el registro se crea igual, sin guía nuestra, para que la contabilidad del pedido cuadre.

**Desde el comerciante, sobre un pedido.** Acción "Registrar devolución" en el panel del pedido en Pedidos. Vive ahí y no en una pantalla aparte, por la regla "un pendiente vive donde se resuelve". *Porque quien decide una devolución está mirando el pedido, no una cola abstracta.*

**Desde el rastreo: crea o convierte, nunca duplica.** Cuando un envío registra un evento de retorno al remitente, el sistema **busca primero una devolución abierta de ese envío**. Si no la hay, la crea con `origenDevolucion: "paqueteria"` y `mecanismo: "RTO"`. Si la hay, **la convierte**. *Porque el camino normal de un envío detenido es acabar en retorno, y ese es justo el caso en el que el comerciante ya registró la devolución a mano: crear una segunda deja el mismo paquete con dos registros abiertos y una cola que no cuadra con la realidad.*

Qué hace la conversión, campo por campo, que es donde se decide si sirve o estorba:

- **Se conserva todo lo que capturó una persona:** el motivo comercial, las piezas, quién paga el flete, las notas. Nada de lo tecleado se pierde.
- **Se conserva `origenDevolucion`.** Quien la originó sigue siendo quien la originó. El RTO cambió cómo regresa el paquete, no quién pidió que regresara, y pisarlo borraría el hecho de que hubo intención comercial antes.
- **Se llena `causaTransportista`** con lo que reportó la paquetería. No toca el motivo comercial.
- **Se fija `mecanismo: "RTO"`.** El paquete ya regresa por esa vía, y cualquier mecanismo que se hubiera elegido —guía prepagada, guía del comprador— dejó de aplicar.
- **El estado salta a *En tránsito de regreso***, sin pasar por los intermedios: el rastreo ya registró movimiento.
- **Si ya se había emitido una guía de retorno, no se pisa.** Queda marcada como emitida y sin usar, y se ofrece cancelarla donde la matriz lo permita. *Porque es dinero, y desaparecerla del registro no la desaparece de la factura.*

**La conversión se avisa dentro de la devolución**, con las dos fechas: *"La paquetería inició el retorno el 19 de septiembre: destinatario ausente. Se conservó la devolución registrada el 17."* *Porque el registro cambió sin que nadie lo pidiera, y un cambio automático que no se ve es un cambio que nadie puede comprobar.*

Un RTO creado desde cero arranca con el motivo comercial en "entrega fallida", que ya está en la lista fija, y la persona puede corregirlo.

**Desde una guía con estatus.** Acción "Registrar devolución" en el bloque de envío del panel del pedido y en la pantalla del envío, que es donde vive una guía en tránsito o entregada. *Porque el momento en que el comerciante se entera de que el cliente quiere devolver es mientras mira el rastreo de esa guía, y mandarlo a otra pantalla a capturar de cero un pedido que tiene delante es el mismo defecto que ya se corrigió al generar guías.* Qué permite hacer cada estatus está en 1.7, y no es lo mismo en todos.

La acción se llama **"Registrar devolución"**, no "Generar guía de retorno". *Porque el botón tiene que nombrar lo que hace en todos los casos, y hoy, con la matriz como está, en la mayoría no termina en una guía.*

No existe puerta de entrada directa para el comprador. El comprador no tiene cuenta en The Carriers.

### 1.5 Estados

Una sola máquina de estados para los cinco mecanismos. Los mecanismos difieren en por dónde entran, no en cómo terminan.

1. **Solicitada** — existe la petición, nadie la ha revisado. Solo aplica cuando la originó el canal o el comprador.
2. **Autorizada** — el comerciante la aceptó. Decisión humana, siempre. *Porque autorizar una devolución es una decisión comercial con costo, y no hay regla que la automatice sin conocer la política del negocio.*
3. **Con guía de retorno** — existe la guía, la haya emitido el sistema o la haya comprado el comprador. Aquí entran de golpe las que originó el comerciante emitiendo.
4. **En tránsito de regreso** — el rastreo registró el primer movimiento. Aquí entra de golpe un RTO.
5. **Recibida** — llegó a la bodega y se registró qué llegó.
6. **Cerrada** — hay resolución registrada.

Más dos salidas laterales:

- **Rechazada** — el comerciante no la autoriza. Termina ahí, con motivo.
- **Sin retorno** — se autorizó el reembolso pero el producto no regresa. Es frecuente con mercancía de bajo valor, donde el flete de regreso cuesta más que el producto. Salta de *Autorizada* a *Cerrada* sin envío. *Porque forzar una guía que nadie va a usar ensucia el cumplimiento de recolecciones y el rastreo con envíos fantasma.*

**De *Autorizada* se puede saltar directo a *Recibida*, sin pasar por guía.** Es el camino del paquete que aparece en la bodega sin que nadie capturara nada, y es el que impide que una devolución autorizada sin mecanismo se quede congelada para siempre. *Porque una cola que solo avanza con una guía se llena de registros que nunca van a avanzar, y una cola con registros muertos deja de leerse.*

Una devolución en *Autorizada* **cuenta los días que lleva esperando al comprador**, igual que los detenidos. Es el único dato duro que hay sobre si el comprador va a devolver o no.

**El contador corre desde el más tardío de dos hechos: la autorización y la entrega de la guía de ida.** Mientras la ida va en tránsito no corre, y la fila dice que espera la entrega en lugar de una cifra. *Porque el contador significa que el comprador no ha hecho su parte, y con el paquete todavía en camino no puede hacerla: contar esos días mide el tránsito del transportista y lo presenta como demora del comprador.* Es la misma disciplina que en los detenidos, donde la antigüedad se mide desde el último evento de la paquetería y no desde que se creó la guía.

### 1.6 Cómo se genera la guía de retorno

Aquí es donde el principio de la capa intermedia manda. **Una guía de retorno no es lo mismo en cada paquetería, y en varias no existe por API.** El diseño tiene que soportar que la misma acción tenga desenlaces distintos según con quién se haga, **y tiene que funcionar el día uno aunque la respuesta sea "ninguna".**

El selector de paquetería para el retorno **no es el mismo control que el de un envío normal**. Se dibuja leyendo `CAPACIDADES.guiaRetorno` y solo lista las paqueterías donde el valor es distinto de nulo. Cada opción declara su modalidad antes de elegir:

- **Guía prepagada emitida por API (`pdf`).** El sistema genera el PDF, se lo manda al comprador por correo, el comprador imprime y pega.
- **Guía prepagada sin impresión (`codigo`).** El comprador recibe un código, lo lleva a mostrador y ahí le imprimen la guía. Sirve para compradores sin impresora, que en México son la mayoría. *Porque una guía en PDF que nadie puede imprimir no es una devolución resuelta.*
- **Recolección de retorno (`recoleccion`).** El sistema programa una recolección en el domicilio del comprador. Requiere que el carrier acepte una dirección de recolección distinta a la de la cuenta.

**Las que no aparecen se nombran, con el motivo exacto y distinguiendo el "no" del "no sabemos":** *"Estafeta no emite guías de retorno. Sin registro de si Paquetexpress las emite."* *Porque esconder la diferencia sin decirlo haría creer que la lista está completa, y porque las dos frases llevan a acciones distintas: una cierra el tema y la otra es una llamada que el comerciante puede hacer.*

**Cuando el selector sale vacío, el bloque no es una pantalla muerta: es el quinto mecanismo.** Se ofrece lo que sí se puede, que es poco y es verdad: copiar la dirección de origen para que el comprador envíe por su cuenta, los teléfonos de atención, y **el campo para capturar la guía del comprador**. Ese campo pide dos cosas juntas, número y paquetería, porque con las dos el retorno se rastrea con el enlace público que ya existe en `RASTREO_PUBLICO`, sin ninguna integración nueva. Con una sola no se rastrea nada.

**Qué se construye y qué espera.** El selector se construye completo ahora, porque es genérico: lee la matriz y pinta lo que haya, incluido nada. Lo que espera es el adaptador de emisión de cada paquetería, que es lo único que de verdad necesita la respuesta. *Porque construir el selector después obligaría a rehacer el bloque entero el día que una paquetería conteste, y construirlo ahora cuesta lo mismo con cero opciones que con tres.*

### 1.7 Qué permite el estatus de la guía de ida

Arrancar la devolución desde la guía hereda contexto, y eso hace fácil prometer de más. **El estatus de la guía de ida decide qué se puede hacer**, y en la mitad de los estatus la respuesta es que no se puede emitir nada todavía.

| Estatus de la ida | Qué se ofrece | Por qué |
|---|---|---|
| Generada, sin recolectar | Cancelar la guía de ida, si la matriz lo permite. No hay retorno | El paquete sigue en la bodega. Devolver algo que nunca salió es cancelar, no devolver. |
| Recolección pendiente | Lo mismo | Igual: el paquete no ha salido |
| En tránsito | Se **registra** la devolución y queda en *Autorizada*. No se emite guía | El comprador todavía no tiene el paquete: no hay quién lo devuelva |
| Entregado | El flujo completo, incluida la emisión si la matriz la permite | Es el único estatus donde devolver es lo que se está haciendo |
| Detenido o con incidencia | No hay retorno. Se registra la devolución y se ofrece el rastreo público y el contacto | El paquete está en poder de la paquetería y quien decide qué pasa con él es ella |
| Ya va de regreso (RTO) | No hay retorno, y se dice por qué: ya hay uno en curso | Un segundo retorno sobre el mismo paquete duplica el costo |

**El caso de "en tránsito" es el que más se va a usar y el que más fácil se hace mal.** El comerciante se entera hoy, el paquete llega en tres días. Se registra ahora, se emite después: el sistema vigila el rastreo de la ida y, cuando pasa a *Entregado*, la devolución se mueve sola a "lista para emitir" y aparece en la cola. *Porque obligarlo a volver dentro de tres días es garantizar que no vuelve, y emitir hoy una guía de retorno para un paquete que el comprador todavía no tiene es emitir una guía que nadie puede usar.*

**Qué se hereda de la guía de ida y qué se vuelve a preguntar.** La herencia silenciosa es lo que convierte un atajo en un error caro:

- **Se hereda y no se pregunta:** los dos extremos, invertidos. El destinatario de la ida es el remitente del retorno y el origen de la ida es su destino. Es lo único que el sistema puede resolver solo sin suponer nada.
- **Se propone, no se hereda:** la paquetería. La de ida puede no exponer retorno; manda la matriz, no la costumbre.
- **Se propone y se dice de dónde sale:** peso y medidas de la ida. *Porque lo que regresa casi nunca pesa lo mismo —falta el empaque original, o vuelve una pieza de tres— y heredarlas en silencio es cotizar un bulto que no existe.*
- **Se vuelve a preguntar, siempre:** el motivo, qué piezas regresan, y el valor declarado. *Porque el valor asegurado de la ida es el de la venta completa y el del retorno es el de lo que regresa; arrastrarlo asegura de más y se paga de más.*
- **Quién paga el flete de retorno**, que no se deduce de nada de la ida.

**Lo que no se puede hacer, por ser la capa intermedia**, y que la interfaz no ofrece en ningún estatus:

- **Convertir la guía de ida en una de retorno.** Son dos guías. Una guía emitida no se modifica.
- **Dar media vuelta a un paquete que ya va en la red del transportista.** Interceptar o devolver al remitente en ruta es una instrucción al carrier sobre un paquete en su poder, y exige una integración que no tenemos. Donde la interfaz podría sugerirlo —un envío en tránsito cuyo cliente ya avisó— dice lo contrario: la devolución queda registrada y espera a la entrega.
- **Liberar o redirigir un envío detenido.** Lo decide la paquetería. Queda el rastreo público, el número de guía y el contacto del destinatario, que es dato nuestro.

**Y esta función no depende de ninguna respuesta de paquetería.** El registro siempre se puede crear; el paso de emisión pinta lo que `guiaRetorno` declare, y cuando no declara nada cae en el quinto mecanismo de 1.6 —la guía del comprador—, que es un flujo que funciona. *Porque una función cuyo valor entero dependiera de una llamada que nadie ha contestado no se podría construir, y esta sí.*

### 1.8 Cómo se rastrea, y qué se avisa de un envío que va de regreso

Un retorno se rastrea igual que cualquier otro envío, con una diferencia de lectura: **en un retorno, "Entregado" significa que llegó a la bodega del comerciante, no al cliente.** Los textos de estado se invierten en la presentación; el dato del carrier no se toca y se conserva en segundo plano con su texto original, como ya se hace en `envio.original`.

Sobre el aviso de que un envío va camino de regresar hay que ser exactos, porque la primera versión de este documento prometió de más. **Hay dos avisos distintos y solo uno se puede construir hoy:**

**Aviso de retorno declarado.** La paquetería reportó, con sus palabras, que el paquete regresa: `return to shipper scheduled`, `en proceso de retorno al remitente`. Mostrarlo no es predecir, es traducir. Se pinta la pastilla "Va de regreso" y se conserva el texto original a la vista. **Esto se construye ahora y funciona con lo que ya llega.** Lo que gana el comerciante no es tiempo para evitarlo —ya no se puede evitar— sino saberlo antes de que la caja aparezca en la bodega: abrir el registro, reservar el costo y avisarle al cliente. Es menos de lo que prometía la primera versión y es cierto.

**Aviso de último intento.** "Va a regresar si este intento falla" exige que la paquetería reporte el intento numerado y cuál es el último. Depende de `CAPACIDADES.intentosNumerados`, que hoy está sin confirmar en todas. **Mientras esté sin confirmar, este aviso no existe**, y no se sustituye contando intentos por nuestra cuenta a partir de eventos sueltos. *Porque un contador nuestro presentado como dato de la paquetería es exactamente lo que el principio prohíbe, y el error es caro en las dos direcciones: avisar de un retorno que no iba a pasar, o callar el que sí.*

Lo que el sistema tampoco hace en ningún caso: decir "regresa en dos días" o "te quedan 24 horas". Los plazos antes de devolver los sabe la paquetería. Sin el campo, no hay cuenta regresiva.

Estado propio y necesario: **"Guía de retorno emitida, sin usar"**, con los días que lleva así. Es el caso más común y el más caro de ignorar: la guía existe, el comprador nunca depositó el paquete, el reembolso quedó en el aire. Se ordena por antigüedad, que es el único dato duro disponible.

### 1.9 Cómo se cierra

Cerrar exige registrar una resolución: **reembolso total, reembolso parcial, cambio, nota de crédito o rechazo tras revisión**. El cierre es siempre humano.

El paso a **Recibida** es manual y no se deriva del rastreo. *Porque "entregado en el origen" dice que el camión llegó, no que la caja traía lo que decía traer.*

**Recibida registra qué llegó, no quién lo recibió.** Tres datos: fecha, cuántas piezas de las esperadas llegaron, y el estado de la mercancía —completa, con faltante, dañada—, más una nota libre. Nada de "Recibió: Karla T.". *Porque el producto no tiene modelo de usuarios y un campo necesita de dónde salir; y porque "quién" solo sirve para pedir cuentas, mientras que "qué llegó" es lo que sostiene la nota de crédito parcial, que es la razón por la que este paso existe.* El día que haya usuarios, el campo se agrega sin tocar nada más.

El reembolso en sí **no se ejecuta aquí**. Se registra que se hizo, con monto y fecha. *Porque el dinero se mueve en el canal de venta o en la pasarela de pago, y un botón de "reembolsar" exigiría una integración de cobros que no tenemos.* Si el canal reporta el reembolso por API, se refleja; si no, se captura.

Una devolución cerrada deja el pedido original marcado. Un pedido con devolución parcial no es un pedido normal y no debe contarse como tal en desempeño ni en ingresos.

### 1.10 El cobro

Tres costos distintos, y confundirlos es lo que hoy hace que la conciliación no cuadre:

1. **El flete de retorno.** Lo paga el comerciante con su cuenta, salvo que lo descuente del reembolso o que la guía la haya comprado el comprador, en cuyo caso es cero para él y se registra como tal.
2. **El cargo del RTO.** La paquetería lo factura sin que nadie lo haya pedido, y hay que ligarlo al envío original o queda como un cargo huérfano.
3. **El flete de ida que ya se pagó.** No se recupera. Se muestra al cerrar la devolución, como parte del costo real de ese pedido.

Regla de presentación: **el costo total de una devolución es la suma de los tres, junto al valor de la mercancía que regresa.** *Porque con esa resta a la vista el comerciante decide solo si le conviene pedir el retorno o autorizar un reembolso sin producto.*

**Esto exige un cambio en el modelo de cobros, y conviene decirlo antes de estimar.** Hoy `envio.diferencia` es una frase: *"Sobrepeso: 8.6 kg facturados contra 7.0 cotizados"*. Una frase se lee pero no se suma, y el punto entero de ligar el RTO al envío original es poder sumarlo. Pasa a ser una lista de cargos tipificados:

```
cargos: [{ tipo, monto, factura, nota }]
tipo ∈ rto · reexpedicion · zona · sobrepeso · reentrega · seguro · otro
```

La frase de hoy migra como un cargo de tipo `otro` con su texto en `nota`: no se pierde nada. **De los siete tipos, la primera versión solo necesita `rto` tipificado**, que es el que entra en la resta del cierre; los demás pueden migrar después sin bloquear nada.

### 1.11 Casos límite

- **Un pedido con dos guías y un RTO.** La conversión busca una devolución abierta **de ese envío**, no de ese pedido. Dos guías del mismo pedido pueden regresar por separado y cada una tiene su registro.
- **Ya hay una devolución cerrada de ese envío y llega un RTO.** Se crea una nueva. Cerrada significa resuelta, y convertir un registro cerrado reescribiría una resolución que alguien ya firmó.
- **El comprador manda de regreso sin avisar.** Llega un paquete sin registro. Acción "Registrar devolución recibida" que arranca en *Recibida* y pide amarrarlo a un pedido. Sin amarre, no se cierra.
- **Devolución de un pedido con dos guías.** La devolución cuelga del pedido, no de la guía. Al registrarla se eligen las piezas, no los bultos.
- **El paquete de retorno se pierde o se daña.** Estado *Con incidencia*, igual que un envío de ida. El reclamo lo levanta el comerciante con la paquetería, o con la plataforma si la guía se compró por `via`. La distinción `paqueteria` / `via` ya existe y decide a quién se le llama.
- **Guía de retorno vencida.** Varias paqueterías caducan las guías prepagadas sin usar. Sale de `CAPACIDADES.caducidadRetorno`: con el dato, la guía muestra su vencimiento; sin él, solo la antigüedad, sin ninguna cuenta regresiva.
- **La guía de retorno no se puede emitir.** Mismo trato que un fallo de generación en Pedidos: motivo, y si es reintentable o no. Falta de cobertura en el CP del comprador no se reintenta; se cambia de paquetería.

---

## 2. Recolecciones automáticas en Configuración

### 2.1 El problema

Hoy las recolecciones se ven y se programan a mano, una por una. Para un comerciante con tres orígenes y cuatro paqueterías eso son hasta doce solicitudes al día, todas iguales, todas a la misma hora. Es trabajo que no decide nada.

Pero automatizarlo con un interruptor global es peor que no automatizarlo, por un hecho operativo que ya está escrito en el código de Pedidos: **una recolección se pide por paquetería y por origen. No existe una sola solicitud que junte un paquete de DHL con uno de FedEx.**

### 2.2 Qué significa "automática"

**La unidad de configuración es la pareja origen × paquetería, y nada más.** Una regla se define para un origen y una paquetería, y eso es lo que el comerciante ve: una lista de parejas, no un interruptor. *Porque es la misma unidad en la que la paquetería recibe la solicitud, y cualquier otra agrupación obligaría a explicar después por qué salieron cuatro solicitudes cuando se configuró una.*

Con tres orígenes y cuatro paqueterías la pantalla muestra hasta doce filas. Solo se listan las parejas que han tenido envíos, más un control para agregar las que faltan. Una lista de doce filas siempre llenas donde ocho nunca se usan es una lista que nadie lee.

**La plataforma por la que se compran las guías (`via`) es un campo de la regla, no una tercera dimensión.** Con tres orígenes, cuatro paqueterías y dos plataformas, una tercera dimensión daría sesenta parejas. La regla dice "Se pide a: Directo" o "Se pide a: Skydropx", y eso impone una restricción de producto que se asume con los ojos abiertos: **una misma pareja de origen y paquetería no puede pedir recolección directa y por plataforma a la vez.** *Porque el comerciante que compra la misma paquetería por los dos caminos desde la misma bodega es raro, y atenderlo cuesta una pantalla de sesenta filas que nadie lee.* Quien caiga en ese caso lo resuelve separando por origen o eligiendo un camino.

Consecuencia que hay que dibujar: **las guías que no coinciden con el `via` de la regla no entran en su solicitud.** Se quedan como sin recolección, visibles, con su plataforma nombrada y con la acción manual disponible. *Porque una guía metida en una solicitud dirigida a la contraparte equivocada es una recolección que no va a ocurrir y un reclamo a quien no le toca.*

El campo `via` solo aparece cuando la cuenta tiene guías compradas por plataforma. Quien no las tiene no lo ve nunca.

Cada regla tiene un **modo**. Son tres y son excluyentes:

**Modo agenda.** Se solicita en días fijos de la semana, en una ventana fija. Ejemplo: Almacén Puebla × DHL, lunes a viernes, 10:00 a 14:00. Es lo que hoy aparece en los datos como `estado: "Recurrente"`. Corresponde al comerciante que ya sabe cuánto manda.

**Modo acumulación.** Se solicita cuando se juntan N guías sin recolección para esa pareja. Ejemplo: Tienda Roma × UPS, a partir de 5 guías. Corresponde a la paquetería de bajo volumen, donde pedir camión todos los días para tres piezas no tiene sentido.

**Modo ruta fija.** La paquetería pasa todos los días por contrato comercial y no hay nada que solicitar. No se manda ninguna petición; el sistema registra la cita esperada para poder medir el cumplimiento. *Porque sin este modo, un comerciante con ruta fija no tendría cómo reclamar un día que el camión no pasó: la cita nunca existió en el sistema.*

### 2.3 Parámetros de una regla

- **Ventana.** De qué hora a qué hora. Se propone la del `horario` del origen, que ya existe en los datos y es la hora en que hay alguien para entregarle el paquete al repartidor. No se puede guardar una ventana fuera del horario del origen. *Porque una recolección programada cuando la bodega está cerrada es una recolección fallida programada.*
- **Hora de corte.** Existe **en los tres modos**, incluida la ruta fija, y es el momento en que se congela la cuenta de piezas. En agenda y acumulación es además el plazo para mandar la solicitud; en ruta fija no hay nada que mandar y solo cuenta. *Porque la única razón por la que existe el modo ruta fija es poder exigir, y una exigencia sin número es una impresión.* La pantalla dice cuál de las dos lecturas aplica según el modo.
- **Mínimo de piezas** (modo agenda). Si ese día no se junta el mínimo, no sale solicitud. Cero significa que sale siempre.
- **Umbral N** (modo acumulación) y **tope de solicitudes al día**, para que un día de mucho volumen no genere seis camiones.
- **Días de anticipación**, acotado por `CAPACIDADES.diasAnticipacion`. Sin confirmar, el campo se limita a lo que ya hemos visto funcionar y lo dice.

### 2.4 Qué decide el sistema y qué decide la persona

El sistema decide **cuándo se dispara y cuántas piezas declara**. Las piezas son las guías de esa pareja —y de ese `via`— que están sin recolección al momento del corte: sale del predicado `sin-recoleccion` que ya existe en `PENDIENTES`. *Porque la cifra que se muestra y la que se manda a la paquetería tienen que salir del mismo predicado; con dos, un día la pantalla dice nueve y el camión llega por siete.*

La persona decide **el modo, la ventana, los umbrales, la plataforma y si la regla está activa**. Nada de eso lo propone el sistema a partir del historial.

### 2.5 Cuando no hay guías ese día

**No sale solicitud y el día se registra como "Sin piezas".** No como recolección fallida.

Esta distinción no es cosmética: `cumplimientoRecolecciones()` divide piezas recogidas entre piezas programadas para saber a quién reclamarle. Un día sin piezas contado como cita programada mete un cero que no es culpa de la paquetería, y una tabla que sirve para exigir deja de servir en cuanto se le puede contestar "ese día no había nada que recoger". **El porcentaje de cumplimiento solo cuenta citas con piezas.**

**No se recalcula el histórico y la tabla no lleva nota de corte.** "Sin piezas" solo puede nacer de una regla automática disparándose en un día vacío: una recolección programada a mano se programó porque había algo que recoger, y todas las que existen tienen piezas. No hay nada que reinterpretar. El pie de la tabla afirma la regla de forma permanente —*"El porcentaje solo cuenta citas con piezas"*— en lugar de fechar un cambio. *Porque una nota del tipo "desde octubre se cuenta distinto" es arqueología a los seis meses, y una afirmación de qué se cuenta se sostiene sola.*

### 2.6 Cuando la paquetería no llega

El incumplimiento se detecta como ya está definido: **una pieza cuenta como recogida cuando su guía registra su primer movimiento.** Nadie marca una casilla. Al día siguiente de la ventana, las guías sin primer evento son las que se quedaron en la bodega.

Qué hace el sistema:

1. Deja la recolección en `recogidas: 0` o parcial, con su folio y su fecha. Eso es lo que se cita al reclamar.
2. Las guías no recogidas **siguen contando como sin recolección**, de modo que la siguiente ejecución de la regla las vuelve a incluir. No hay que rehacer nada a mano.
3. Lo avisa. Una recolección sin cumplir es un problema operativo y entra en la misma familia que las conexiones caídas: bloquea trabajo hecho.

Qué **no** hace: reprogramar sola una recolección extraordinaria fuera de la agenda. *Porque pedir un camión tiene costo en algunos contratos y una consecuencia comercial que el sistema no conoce.* Lo que sí ofrece es la acción de programar una extraordinaria, en un clic, ya prellenada con las piezas que se quedaron.

Si la misma pareja falla **tres veces seguidas**, se muestra en la regla, con las fechas. Ese es el material del reclamo. No se desactiva la regla sola: apagarla dejaría al comerciante sin recolección y sin aviso.

### 2.7 Cancelación

Esta es la parte donde el principio de la capa intermedia cambia el diseño, y hay que decirlo con claridad al equipo.

**Hay dos cancelaciones distintas y la interfaz no las puede llamar igual:**

**Desactivar la regla.** Deja de mandar solicitudes futuras. Es nuestro, funciona siempre, es inmediato. No toca las recolecciones ya confirmadas, y el aviso de guardado lo nombra.

**Cancelar una recolección ya solicitada.** Sale de `CAPACIDADES.cancelaRecoleccion` y `corteCancelacion`. Cuatro comportamientos, decididos por paquetería y no por pantalla:

- *Expone cancelación.* Se cancela y se confirma con su folio. Es el diálogo que ya está en `sistema.html`.
- *Expone cancelación con corte, y no ha pasado.* El mismo botón, diciendo hasta qué hora.
- *Expone cancelación con corte, y ya pasó.* El caso siguiente.
- *No la expone, o está sin confirmar.* **El botón de cancelar no existe.** En su lugar, "Ver qué hacer" abre una instrucción, no una confirmación: el folio para copiar, el teléfono de la paquetería y la advertencia de que la recolección se sigue contando hasta que el rastreo diga otra cosa. La acción que cierra ese panel es fantasma, no primaria, porque no completa la tarea: la completa una llamada.

Los dos últimos casos se ven igual pero **no se nombran igual**: *"Estafeta no cancela recolecciones desde aquí"* frente a *"Sin registro de si Paquetexpress cancela recolecciones desde aquí"*, y esta última lleva el paso de confirmarlo. *Porque la primera frase cierra el tema y la segunda es una llamada que el comerciante puede hacer: él tiene el ejecutivo de cuenta.* La redacción es la de 0: un hueco del registro, nunca la primera persona.

Un diálogo que dice "Sí, cancelar" y termina con un estado que la paquetería no conoce es la interfaz mintiendo.

### 2.8 Casos límite

- **Una regla en un origen que se va a borrar.** Ya está resuelto el principio: borrar dice qué se lleva. Se enumeran las reglas y las recolecciones programadas que habrá que rehacer.
- **Días inhábiles.** Un festivo con agenda activa genera una solicitud que nadie va a atender. Hace falta un calendario de días inhábiles por origen, con los oficiales precargados y la posibilidad de agregar los propios. Sin eso, diciembre llena el historial de fallas que no son fallas.
- **Guía generada después del corte y urgente.** La regla no la tomó. La acción de sumarla a la recolección de hoy se ofrece únicamente donde `CAPACIDADES.sumaPiezas` es afirmativo. Donde es negativo o está sin confirmar, no hay acción y sí hay una línea que dice qué pasa: entra a la del día siguiente.
- **Guía comprada por una plataforma que no es la de la regla.** Queda sin recolección, nombrada, con la acción manual. Es la consecuencia aceptada de que `via` sea un campo y no una dimensión.

---

## 3. Reglas de embalaje para guías automáticas

### 3.1 El problema

Cuando la guía se genera sola, alguien tiene que decir en qué caja va. Hoy `configuracion.html` resuelve eso con un solo desplegable: "Con la plantilla [Caja chica] — peso y medidas cuando el pedido no los incluye". Una plantilla para todo.

Eso cuesta dinero en las dos direcciones. Con una caja chica para todo, los pedidos grandes salen con medidas falsas y la paquetería cobra la diferencia como sobrepeso al facturar. Con una caja mediana para todo, cada pedido de un artículo paga volumen que no ocupa: una caja de 40 × 30 × 25 cm se cobra como si pesara 6 kg aunque lleve 800 gramos.

### 3.2 La gramática de la regla

Una regla es **una condición y un embalaje**:

```
CUANDO se cumple todo esto → usar la plantilla X
```

Cuatro decisiones de forma, cada una con su porqué:

**Las condiciones dentro de una regla se unen con Y, nunca con O.** Para expresar una alternativa se escriben dos reglas. *Porque una condición con Y y O mezclados obliga a pensar en paréntesis, y nadie que empaca cajas debe tener que pensar en paréntesis.*

**Las reglas están ordenadas y gana la primera que se cumple.** Lista ordenable, con asa y con flechas, igual que el orden de preferencia de paqueterías que ya existe. *Porque es el mismo tipo de criterio humano y el equipo ya sabe leerlo así; un segundo modelo mental para el mismo problema es un modelo de más.*

Al ser dos listas con el mismo mecanismo, cada una tiene que decir qué decide. Los títulos son **"En qué caja va cada pedido"** y **"Con qué paquetería sale cada pedido"**; este último sustituye a "Tu orden de preferencia", que es anterior a estas funciones. *Porque "Tu orden de" nombra la forma de la lista y no lo que resuelve, y dos listas que se distinguen por dos palabras abstractas al final obligan a leerlas enteras para saber en cuál se está.*

**Cada regla lleva su motivo escrito, como las paqueterías.** *Porque sin él, dentro de seis meses alguien va a borrar la regla que existe por un producto que se rompió tres veces.*

**La última regla es "Por defecto" y no se puede borrar ni mover.** Su condición está vacía y siempre se cumple, **de modo que ninguna regla deja de asignar caja por falta de cobertura.** No es lo mismo que decir que todo pedido sale siempre con caja: un veto puede quitarle la que le tocaba, y ese caso está resuelto en 3.4.

### 3.3 Las condiciones

Las tres que pidió el usuario son el punto de partida:

1. **Cantidad de productos.** De N a M unidades. Cuenta unidades, no líneas de pedido: tres piezas del mismo artículo ocupan el mismo espacio que tres artículos distintos.
2. **Costo del pedido.** De $X a $Y. No decide el tamaño, pero sí el cuidado: un pedido de $8,000 va en caja con relleno aunque quepa en un sobre. Es también la condición que normalmente acompaña al seguro.
3. **Contiene el producto X más otra cantidad de productos.** Dos partes: un SKU concreto, y un rango de unidades adicionales de cualquier otro artículo. Es la forma de decir "el producto grande solo o el producto grande acompañado".

Tres más, que salen de la misma operación:

4. **Peso sumado del pedido.** De X a Y kg.
5. **Canal de venta.** Mercado Libre y Amazon tienen requisitos de empaque y etiquetado propios.
6. **Destino.** Un envío foráneo a zona extendida justifica una caja más resistente que una entrega local.

Y una condición que no asigna, sino que prohíbe:

7. **Veto: si contiene el producto X, nunca usar la plantilla Y.** Elimina candidatas en vez de asignar. *Porque un producto frágil o largo nunca debe caer en el sobre, y expresarlo como regla positiva obliga a enumerar todas las combinaciones en las que sí cabría.*

**El orden de evaluación es uno y está fijo**, porque de él dependen todos los casos límite de más abajo:

1. **Medidas del canal.** Si el pedido ya las trae, mandan y no se evalúa nada más.
2. **Vetos.** Descartan plantillas.
3. **El orden de reglas.** Gana la primera que se cumple con una plantilla que ningún veto descartó.
4. **Tope de peso.** Sobre la plantilla que salió del paso 3.

Un pedido que cae en el paso 2 **nunca llega al paso 4**: un pedido con veto no puede demostrar el tope por peso, porque se queda sin caja antes de que haya peso que comparar. Los dos terminan en la misma cola de revisión manual (3.5) y por eso cada fila tiene que decir cuál de los dos motivos la mandó ahí.

**De qué depende cada una, dicho sin adornos.** Las condiciones 1, 2, 5 y 6 se evalúan con lo que el pedido ya trae. Las condiciones 3 y 7 necesitan **que la línea del pedido traiga SKU**, que es cosa del canal y no de nuestro catálogo: Shopify, WooCommerce, Mercado Libre y Amazon lo reportan. Sin catálogo propio, el editor de la regla degrada a teclear el SKU en vez de elegir el producto por su nombre; funciona, se lee peor. **La condición 4 es la única que necesita catálogo con peso por SKU, y es la única que se queda fuera de la primera versión.** *Porque es la única cuyo dato no existe en ninguna parte del sistema, mientras que el SKU ya viene en el pedido.*

**Una condición que no se puede evaluar nunca se da por cumplida.** Si el SKU no está en el catálogo, o la línea viene sin SKU, la regla se salta con aviso y el pedido pasa a la siguiente. La regla no se desactiva sola, porque el SKU puede volver.

### 3.4 Cuando dos reglas aplican, y cuando un veto deja sin caja

**Gana la primera de la lista. Punto.** Sin puntajes, sin especificidad calculada, sin "la más restrictiva". *Porque un sistema de puntajes no se puede explicar a la persona que abre la pantalla a las siete de la mañana con doscientos pedidos, y una regla que no se puede explicar no se puede corregir.*

**Lo específico va arriba, lo general abajo. Una regla específica debajo de una general no gana nunca.** No es una recomendación de estilo: es aritmética del orden. "Pedidos de una pieza" cubre todo pedido de una pieza, de modo que "Ventilador solo" colocada debajo no puede ganar jamás, y "Pedido caro" colocada encima de "Cristalería acompañada" manda las copas a la caja que su propio motivo dice que las rompió tres veces. Al crear o mover una regla, el sistema avisa cuando la que está encima ya cubre sus condiciones.

*Este párrafo existe porque la primera redacción del orden de ejemplo ponía las genéricas arriba y rompía dos de sus propias demostraciones. Se detectó ejecutándolo.* Sin dejarlo escrito, alguien vuelve a subir la regla general dentro de seis meses con el argumento razonable de que cubre más casos.

Consecuencia de diseño: la pantalla tiene que **mostrar cuántas reglas se solapan** y en qué se solapan. Dos reglas donde la segunda nunca va a ganar son una regla muerta, y el comerciante merece saberlo antes de que un pedido salga en la caja equivocada por un mes.

**El veto gana sobre la regla por defecto, y el pedido pasa a revisión manual.** Cuando un veto elimina la plantilla que le habría tocado —incluida la de la regla por defecto— el pedido no se genera automáticamente y entra a revisión manual con el veto nombrado: *"El juego de 6 copas no puede ir en Sobre, y Sobre es la caja de la regla por defecto."*

*Por qué el veto y no la cobertura: el veto existe por un hecho físico —seis copas no van en un sobre— y la regla por defecto existe por comodidad administrativa. Un hecho físico gana. Una caja que rompe el producto cuesta más que una guía que no se generó sola esta noche.*

La alternativa era prohibir vetar la plantilla de la regla por defecto. Se descarta: es más simple de programar y deja al comerciante sin poder proteger justo el producto que más lo necesita, porque la caja por defecto es precisamente la que más pedidos toca.

### 3.5 Revisión manual: una sola cola, dos motivos

Hay exactamente dos razones por las que el sistema no elige caja, y las dos terminan en el mismo sitio:

1. **Un veto dejó al pedido sin plantilla.**
2. **El peso del pedido supera el de la plantilla por más del factor configurado** (ver 3.7).

Una sola cola, con el motivo escrito en cada fila. *Porque dos salidas distintas para "el sistema no pudo elegir caja" son dos colas del mismo trabajo, y antes de construir una cola hay que mirar si el trabajo ya tiene casa.* La casa es Pedidos, filtrada, como el resto de los pendientes.

Y una cifra que sí hay que mirar: **cuántas guías salieron por la regla por defecto.** Es la medida de qué tan mal cubierta está la operación. Si más de la mitad de los pedidos cae al final de la lista, las reglas de arriba no sirven. Ese número va en la pantalla de reglas, no escondido en un informe.

Caso aparte y real: **el pedido ya trae peso y medidas desde el canal.** Entonces mandan los del pedido y no se aplica ninguna regla. *Porque un dato medido siempre vale más que uno inferido.* La guía queda marcada con el origen del dato, para poder distinguir después qué guías salieron con medidas reales y cuáles con plantilla.

### 3.6 Relación con el peso volumétrico

Aquí está el dinero. Lo que ya calcula el sistema:

- `pesoVolumetrico(largo, ancho, alto) = (L × A × H) ÷ 5000`
- `pesoCobrado(p)` devuelve real, volumétrico, el mayor de los dos, y si se cobra por volumen.
- Plantillas cotiza con el peso cobrado, no con el real. Eso ya está bien y no se toca.

El divisor 5000 deja de ser una constante global y pasa a `CAPACIDADES.divisorVolumetrico` por paquetería. Mientras esté sin confirmar, se usa 5000 y la cotización se marca como estimación nuestra. *Porque el divisor cambia el precio de todas las guías, y presentarlo como dato del transportista sin haberlo confirmado es inventar la cifra que más importa.*

**Precedencia entre la regla y el pedido, en este orden:**

1. **Medidas:** siempre de la plantilla que eligió la regla. Nadie mide cajas por pedido.
2. **Peso:** el del catálogo sumado, si existe. Si no, el de la plantilla. *Porque el peso por SKU se captura una vez y es el dato más confiable de los dos.*
3. **Peso facturable:** el mayor entre ese peso y el volumétrico de las medidas de la plantilla. Ese es el que se cotiza y el que se declara en la guía.

**Lo que el sistema NO hace: elegir una caja más chica por su cuenta.** Si la regla dice caja mediana, va caja mediana, aunque una chica saliera más barata. *Porque si el producto no cabe físicamente en la caja chica, el ahorro que calculó el sistema se convierte en un paquete que la bodega no puede armar.* Es el mismo principio que "la preferida manda" en paqueterías: la decisión humana no se sobrescribe sola.

**Lo que el sistema SÍ hace: cobrar por el error, por escrito.** Cada regla muestra, sobre lo que ya ocurrió:

> Esta regla generó 214 guías en los últimos 30 días. En 62 se cobró por volumen, no por peso. Diferencia acumulada: $8,430.

Y cuando hay una plantilla alternativa que las 62 habrían usado sin exceder su volumen, lo dice en dinero, siguiendo la regla de que una sugerencia vale lo que ahorra: *"Con Caja chica en vez de Caja mediana, esas 62 guías habrían costado $5,100 menos."* No la cambia. Lo dice.

**Una regla enseña dos cifras y no son la misma. Se distinguen por el sustantivo y por el tiempo verbal, no por una nota al pie.**

| Cifra | Universo | Para qué sirve |
|---|---|---|
| **Lo que ha cobrado** — *"Con esta regla han salido 9 guías en los últimos 30 días"* | Guías ya emitidas. Mira al pasado. | Saber si la regla cuesta dinero |
| **Lo que alcanzaría** — *"Sobre los pedidos de hoy, esta condición alcanza a 1 de 40"* | Pedidos actuales. Mira al presente. | Saber si la regla que se está escribiendo hace lo que se cree |

La primera habla de **guías** y en pasado; la segunda de **pedidos** y en presente. *Porque dos números que comparten sustantivo y periodo se leen como una sola medición mal hecha, y en cuanto cada uno nombra su universo dejan de contradecirse.* La primera nunca menciona pedidos; la segunda nunca menciona guías ni dinero.

**La cifra del presente es un enlace a los pedidos que cuenta.** Un número que se puede abrir y comprobar no es un simulador: es un filtro con su resultado a la vista. *Porque un probador que enseña un resultado que nadie puede comprobar es una maqueta dentro de otra maqueta, y la diferencia entre las dos cosas es exactamente poder pulsarla.*

Y una condición sobre los datos de ejemplo: **el histórico tiene que estar a la escala del prototipo.** Un pie que dice 214 guías junto a una pantalla de 40 pedidos se contradice a la vista, y el aviso general de datos de ejemplo no salva dos cifras que se pelean en la misma tarjeta.

### 3.7 Casos límite

- **El pedido no cabe en ninguna plantilla.** Si el peso del pedido supera el de la plantilla por un factor configurable, no se genera automáticamente y pasa a la revisión manual de 3.5. *Porque una guía con medidas imposibles se paga dos veces: el sobrepeso y la reexpedición.* Esta comprobación necesita el peso del pedido; mientras no haya catálogo, el tope solo se puede evaluar sobre los pedidos que traen peso del canal, y se dice.
- **Pedido que necesita dos cajas.** Fuera de alcance. Se marca para revisión manual. Un pedido partido en dos guías es el cambio de modelo que `datos.js` ya anticipó, y no se resuelve con reglas de embalaje.
- **Se borra una plantilla usada por una regla o por un veto.** Mismo trato que el origen predeterminado: no se borra sin resolver antes qué usa esa regla. Se enumeran las reglas y los vetos afectados.
- **Medidas o peso máximos por servicio.** Si una paquetería los impone, una plantilla puede ser inválida con ella y la regla de embalaje deja de ser independiente de la de paquetería. Mientras no se confirme, las reglas se evalúan por separado y el fallo aparece al generar, con el motivo del carrier. Es la degradación honesta: el sistema no puede prevenir lo que no sabe, pero sí puede no esconderlo.

---

## 4. Creación manual de guías desde Pedidos

### 4.1 El problema

El usuario ya señaló el defecto: **corregir la colonia y tener que irse a otra pantalla a generar la guía es un mal flujo.** Es la misma tarea partida en dos viajes.

Hoy el panel de pedido en `pedidos.html` ya hace lo correcto en estructura: pone primero el bloque de Envío y el de Dirección, porque son lo único sobre lo que el operador puede actuar, y ya cotiza con `cotizar(peso)` mostrando precio, plazo y cumplimiento real por paquetería. Lo que falta es que **todo lo que cambia el precio se pueda cambiar ahí mismo, sin cerrar el panel y sin perder lo capturado.**

### 4.2 El flujo

Una sola pantalla, el panel del pedido, y una sola acción al final.

1. Se abre el pedido desde la tabla.
2. El bloque de Envío muestra la propuesta del sistema: paquetería, servicio, costo y plazo, con el porqué de `decidirPaqueteria()` en una línea. **La propuesta llega ya elegida, no en blanco.** *Porque en el 80 % de los pedidos el operador va a aceptarla, y obligarlo a elegir cada vez convierte una confirmación en una decisión.*
3. Todo lo que mueve el precio está en ese bloque y se puede cambiar sin salir: **paquetería y servicio, embalaje, peso, dirección de origen, seguro**.
4. Cualquier cambio vuelve a cotizar **mientras se escribe**, no al guardar. *Porque el número que importa se calcula con lo que se captura, y verlo después de generar la guía es verlo demasiado tarde.*
5. Si la dirección necesita corrección, se corrige en el mismo panel. Al aplicar la corrección, la cotización se rehace sola porque el CP pudo cambiar de zona, y el botón de generar se reactiva. **No se cierra el panel, no se vuelve a la tabla, no se busca otra vez el pedido.**
6. Se confirma. Una acción.

### 4.3 Qué se puede cambiar, y hasta cuándo

| Campo | Antes de la guía | Después de la guía |
|---|---|---|
| Dirección de destino | Sí | No |
| Paquetería y servicio | Sí | No |
| Embalaje | Sí | No |
| Peso y medidas | Sí | No |
| Dirección de origen (remitente) | Sí | No |
| Seguro / valor declarado | Sí | No |

**Después de generar la guía no se cambia nada.** No es una restricción de producto, es un hecho: modificar un envío ya emitido exige una integración con la paquetería que en general no existe, y el principio de la capa intermedia lo prohíbe. Lo que se ofrece en su lugar es cancelar la guía y generar otra, **y la cancelación sale de `CAPACIDADES.cancelaGuia`.** Donde es negativo o está sin confirmar, no hay botón y sí hay una frase que dice qué pasa: la guía queda sin usar, y si el contrato del comerciante cobra las guías emitidas, se le cobra.

El seguro merece su propia nota: **el valor declarado se define antes de emitir y no se agrega después.** La interfaz lo pide en el mismo momento que todo lo demás, con el total del pedido como valor propuesto.

**Y el interruptor dice qué cuesta, o dice que no hay registro de cuánto cuesta.** El costo del seguro es una celda más de la matriz —`costoSeguro`, normalmente un porcentaje sobre el valor declarado con un mínimo—, con los mismos tres valores que el resto. Con valor, se calcula y aparece como renglón propio en el desglose del costo. Sin registro, el interruptor lo dice y dice dónde va a aparecer el importe: *"Valor declarado $1,480.00. Sin registro del costo del seguro de DHL: el importe aparece en la factura."* *Porque una casilla que cuesta dinero sin decir cuánto tiene el mismo defecto que una guía sin precio, y callar la cifra no la hace menos cara.*

Cuidado con el nombre después de emitir: *"Seguro sobre el valor declarado · $1,480.00"* es **el valor asegurado, no lo que costó asegurarlo**. Se rotula "Valor declarado". Dos cantidades distintas bajo el mismo rótulo se suman mal al conciliar.

### 4.4 Qué se ve antes de confirmar

El botón de confirmar lleva escrito lo que va a pasar: **"Generar guía con DHL Express · $189.00"**. No "Generar". *Porque un botón que solo dice el verbo obliga a mirar hacia arriba para saber qué se está aceptando.*

Y arriba de él, seis cosas y nada más:

- **La premisa de la cotización, completa: de dónde sale, a dónde va y con qué peso facturable.** *"Con tus cuentas, de Almacén Puebla a Ciudad de México · 12 kg facturables"*. El origen va en la frase porque forma parte de la premisa, y una premisa que no se enseña parece que no se usa.
- **Paquetería, servicio y plazo**, con el plazo tal como lo declara la paquetería. No una hora estimada de llegada: ese dato no existe.
- **Costo**, desglosado en guía y seguro si hay. Marcado como estimación cuando la tarifa sale de nuestra tabla y no de una cotización en vivo del carrier.
- **Peso facturable**, con la consecuencia primero: *"Te cobran 6 kg"*, y debajo por qué: *"Pesa 4 kg, pero una caja de 40 × 30 × 25 cm se cobra como si pesara 6"*.
- **Remitente**, el nombre del origen. Es lo que se imprime en la etiqueta.
- **Lo que falta**, si falta. Una dirección sin colonia o sin CP se avisa aquí, no en el papel.

**La tarifa por zona queda fuera de la primera versión, y por eso el origen no mueve el precio todavía.** En la realidad sí lo mueve: cambiar de bodega cambia la zona entre origen y destino, y con ella el costo. Nuestra tabla de tarifas solo mira el peso, y construir una tabla por zona significaría inventar cifras que nadie puede comprobar. **La tarifa real sale de la cotización en vivo de la paquetería; nuestra tabla es el respaldo y siempre va marcada como estimación.** Mientras tanto, la estimación dice de qué depende lo que no calcula: *"Estimado por peso. La tarifa final depende de la zona entre el origen y el destino."* *Porque cotizar lo mismo desde dos bodegas distintas sin decir nada le enseña al comerciante un hecho falso sobre su propia operación, y ese error se descubre al conciliar.*

Cambiar el origen sí cambia hoy dos cosas reales y las dos se ven: el remitente que se imprime en la etiqueta y la recolección que va a recoger el paquete.

### 4.5 Cuando falla

El modelo de fallos ya existe en `simularGeneracion` y en el lote, y se reutiliza. En el flujo manual cambia la presentación, no la lógica:

- **El panel no se cierra.** Lo capturado se queda. *Porque cerrar el panel tras un fallo obliga a recapturar peso, embalaje y seguro para volver a intentar lo mismo.*
- **Se distingue lo reintentable de lo que no.** Un tiempo de espera agotado se reintenta con el mismo botón. Una falta de cobertura para el CP no se reintenta, y ahí el sistema ofrece lo que sirve: **cambiar de paquetería en el mismo bloque, ya con las alternativas cotizadas**. Ofrecer "Reintentar" cuando reintentar no cambia nada es mentir.
- **Idempotencia.** La llave es `folio:intento`. Con el folio solo, la protección contra el doble clic bloquea también el reintento, que es justo lo que hay que permitir.
- **El fallo deja rastro en la tabla.** El pedido queda con `error` y entra en el pendiente "Guías que no se pudieron generar" que ya existe en `PENDIENTES`. Un fallo que solo vive en un panel cerrado es un pedido que nadie va a volver a intentar.

### 4.6 Convivencia con la generación automática

En `configuracion.html` existe "Generar la guía automáticamente: en cuanto el pedido se marque como pagado". Manual y automático van a coexistir sobre los mismos pedidos y eso tiene una consecuencia cara: **dos guías para un pedido son dos paquetes y dos cobros.**

**Lo que impide la guía doble es una comprobación al confirmar, no un bloqueo al abrir.** Antes de emitir se revisa que el pedido siga sin guía y que no haya cambiado en el canal. Si una regla lo generó mientras el panel estaba abierto, no se emite una segunda: se muestra qué pasó, con qué paquetería y a qué hora, y se ofrece ver esa guía o cancelarla y generar otra.

*Por qué así y no con un bloqueo por edición: un arriendo con temporizador protege de que dos personas choquen, y este producto no tiene modelo de usuarios ni reloj compartido con el que sostenerlo. La comprobación al confirmar protege de lo que de verdad cuesta dinero —la guía duplicada— y funciona sin servidor y con un solo operador.* Si algún día hay varios operadores, el bloqueo se agrega encima sin quitar la comprobación, que sigue siendo la última red.

Dos reglas más:

**Lo automático se ve como automático.** Cada guía guarda si la generó una persona o una regla, y cuál. Sin eso, una guía con la paquetería equivocada no se puede diagnosticar: no se sabe si alguien la eligió o si una regla la eligió mal. Es un atributo de la guía, no de una persona, y por eso no necesita usuarios.

**Salirse de la regla se registra con motivo.** Cuando el operador elige una paquetería distinta a la que propuso `decidirPaqueteria()`, se le pide una línea. Lista corta y fija: el cliente la pidió, urgencia, la propuesta no tiene cobertura, precio. *Porque sin ese registro el orden de preferencia de Configuración parece equivocado cuando no lo está, y la frecuencia de las excepciones es exactamente la señal de que hay que reordenarlo.*

### 4.7 Manual sobre varios pedidos

El lote que ya existe es el camino para varios. **No se convierte en un formulario de captura masiva**: el lote usa las reglas, y quien quiere cambiar algo abre el pedido. *Porque un lote donde se puede cambiar el peso de cada pedido es la pantalla de detalle otra vez, dibujada peor y sin sitio para el porqué.*

Lo único que sí debe poder hacerse en lote: **forzar una paquetería para la selección completa**, con el mismo motivo obligatorio. Es el caso real del día en que una paquetería no está recogiendo.

### 4.8 Casos límite

- **El pedido cambia en el canal mientras el panel está abierto.** Se detecta en la misma comprobación de 4.6. Si cambió dirección o artículos, no se genera: se muestra qué cambió y se pide confirmar de nuevo.
- **Pedido no pagado.** Ya resuelto: el botón se deshabilita y dice por qué. No se toca.
- **Pedido con devolución abierta.** No se genera guía de salida sin confirmar que es un reenvío. Un reenvío y una devolución del mismo pedido son fáciles de confundir cuando ambos están en curso.
- **Cotización en vivo que no responde.** Si la paquetería no devuelve tarifa, se muestra la estimación de nuestra tabla **marcada como estimación**, con la opción de generar igual. Bloquear la operación por no tener el precio exacto es peor que generar con un precio aproximado, siempre que esté dicho cuál es cuál.

---

## 5. El envío suelto: una guía sin pedido detrás

### 5.1 El problema

Hoy toda guía nace de un pedido que entró por un canal. La operación real tiene envíos que no: una venta por WhatsApp, un reemplazo de garantía, una muestra a un cliente, algo que se cobró por transferencia. Hoy esos envíos se hacen en el portal de la paquetería, quedan fuera de la conciliación y fuera del desempeño, y el comerciante termina con dos sitios donde mirar sus guías.

### 5.2 Qué es: un pedido sin canal

**Un envío suelto es un pedido sin canal de venta. No es una tercera cosa y no tiene lista propia.**

*Porque `envios` se deriva de `pedidos`, y toda pantalla que trabaja con guías —Cobros, Tracking, Excepciones, Recolecciones, Etiquetas— lee esa derivación. Una tercera colección obligaría a cada una a mezclar dos fuentes y devolvería la pregunta que `datos.js` ya mató: "¿la guía 877… la busco en Pedidos o en la otra lista?".*

Concretamente: `canal: null` y `origenCaptura: "manual"`. El folio es de una serie nuestra y se distingue a la vista de los del canal, porque un folio que no existe en Shopify no se puede ir a buscar allá.

**La serie es `E-0043`, sin almohadilla.** El prefijo `TC` estaba tomado: `simularGeneracion()` lo usa para los números de guía, y dos series con el mismo prefijo se confunden justo en el buscador global, que agrupa por tipo. Y la almohadilla se quita a propósito: **`#` es la marca del folio del canal** y arrastra a buscarlo en la tienda, donde no está.

**Un envío suelto no tiene estado de pago.** Una venta cobrada fuera del canal no la conoce el sistema, y poner "Pagado" sería inventar un dato que nadie reportó. Para lo pendiente cuenta como listo para despachar desde que se crea, porque crearlo **es** la decisión de despacharlo: no hay nada que esperar. El predicado de "pagados sin guía" admite las dos condiciones —pago confirmado por el canal, o sin canal— y la etiqueta del pendiente deja de hablar de pago para hablar de lo que hay que hacer.

**El filtro de canales gana la opción "Sin canal"**, no "Manual". *Porque el desplegable contesta por dónde entró la venta, y una forma de capturar no es un sitio por donde entra dinero.* Como todos los desplegables del producto, se llena con lo que hay: sin envíos sueltos, la opción no aparece.

**Un envío suelto no es una venta.** El total es opcional y, cuando no se captura, la columna dice "—" y ese pedido no entra en ninguna cifra de ingresos. *Porque capturar un número y tratarlo como venta confirmada por un canal mezcla lo que alguien tecleó con lo que un sistema reportó, y esa diferencia es justo la que sostiene la conciliación.*

### 5.3 Qué se captura

- **Destinatario y dirección**, con los mismos campos, las mismas etiquetas y la misma validación que la dirección de un pedido. Una dirección es una dirección.
- **Origen**, de la lista de orígenes. El predeterminado viene ya elegido.
- **Paquete**: plantilla, o medidas y peso a mano. La plantilla predeterminada viene ya elegida.
- **Seguro y valor declarado**, igual que en cualquier guía.
- **Referencia**, texto libre y corto: *"Garantía #4412"*, *"Venta por WhatsApp"*. **Es obligatoria.** *Porque el folio del canal es lo que hoy explica por qué existe una guía, y sin nada que lo sustituya, dentro de un mes nadie sabe por qué se pagó ese envío ni a quién cobrárselo.*
- **Total**, opcional, y marcado como capturado a mano dondequiera que se muestre.

Los artículos son opcionales. Cuando se capturan con SKU y cantidad, el envío suelto participa de todo lo que dependa de líneas; cuando no, no.

**Esta lista dice qué necesita el envío para existir, no qué cabe en un formulario.** Capturar y despachar son dos cosas, y el origen, la caja, el peso y el seguro ya tienen sitio: el bloque Envío del panel del pedido, con su recotización mientras se escribe. **Se capturan ahí y no en un formulario propio.** *Porque duplicarlos sería un segundo sitio donde validar y cotizar lo mismo, que es el defecto que ya evita la regla de que una dirección es una dirección.*

Lo que sí es innegociable: **el panel no se cierra entre las dos cosas.** Al crear el envío, el mismo panel pasa a ser el panel de ese pedido con el bloque Envío abierto. *Porque capturar una dirección y tener que irse a otra pantalla a generar la guía es exactamente el defecto que corrigió la sección 4, y volver a introducirlo por la puerta de atrás en la pantalla nueva sería reincidir.*

De ahí sale una consecuencia que conviene dibujar: **un envío suelto puede existir sin guía**, igual que un pedido pagado sin guía, y aparece en la misma cola.

### 5.4 Qué se valida, qué no, y dónde está la frontera

**Lo que sí comprobamos, porque es forma y es nuestro:** campos obligatorios, que el CP tenga cinco dígitos, el formato del teléfono, que la colonia no vaya vacía. Y la propuesta de colonia por CP que ya existe en `coloniasPorCP`, **declarada como catálogo nuestro**.

**Lo que no podemos comprobar, porque somos el intermediario:** que el código postal exista, que la colonia corresponda a ese CP, y que la paquetería dé cobertura en ese destino. No tenemos padrón propio de direcciones y no sabemos si alguna paquetería expone esa consulta por API.

De ahí sale la regla, que es la parte que la interfaz tiene que decir bien:

**Un CP que no está en nuestro catálogo avisa, no bloquea.** *"Este código postal no está en el catálogo de colonias. No quiere decir que no exista: quiere decir que no se puede proponer colonia."* *Porque nuestro catálogo no es el padrón de nadie, y tratar su hueco como una negativa impediría enviar a destinos que existen.*

**La comprobación de verdad ocurre al comprar la guía, y se dice antes.** La paquetería acepta o rechaza, y su rechazo es el dato bueno: es la misma falla que ya existe en el prototipo —*"La paquetería rechazó el código postal: no corresponde a la colonia"*— y cae en el camino de fallo que ya está definido en 4.5, con su motivo y con su distinción entre lo reintentable y lo que no. Una falta de cobertura no se reintenta: se cambia de paquetería.

La validación previa es una celda más de la matriz, `validaDireccion`. **Mientras esté sin confirmar en todas, no se ofrece ninguna comprobación previa y la pantalla dice cuándo se comprueba.** *Porque prometer una validación que no existe hace que el comerciante confíe en una dirección que va a rebotar, y el rebote llega cuando la caja ya está cerrada y etiquetada.*

### 5.5 Qué reglas le aplican

**La paquetería preferida: sí, completa.** `decidirPaqueteria()` propone igual, con su porqué, y salirse pide motivo. *Porque el orden de preferencia es un criterio del comerciante sobre sus paqueterías, y no tiene nada que ver con por dónde entró la venta.*

**La regla de embalaje: sí, pero propone en vez de decidir.** Las condiciones se evalúan con lo que el envío tenga, y una condición sin dato no se da por cumplida, como siempre: sin líneas capturadas no hay cantidad de piezas ni SKU, sin total no hay costo, y ninguna regla condicionada por canal puede cumplirse nunca. En la práctica la mayoría caería en la regla por defecto. **Por eso aquí la plantilla se elige a mano y la regla solo llega preseleccionada.** *Porque las reglas existen para decidir cuando no hay nadie delante, y quien captura un envío suelto está delante de la caja: obligarlo a pelearse con una regla que ve es al revés.*

**La recolección: sí, sin ningún cambio.** La regla es por origen × paquetería, un envío suelto tiene los dos, y el predicado `sin-recoleccion` lo toma tal cual porque solo mira si hay guía y si falta recolección. *Porque el camión recoge bultos, no pedidos.*

**La generación automática: no.** Un envío suelto se crea a mano por definición; no hay evento de pago de ningún canal que lo dispare.

### 5.6 Cobros y Desempeño

**Cobros funciona sin cambios y no hay que tocar la conciliación**, porque lista envíos y su llave es la guía. Lo único que cambia es qué se lee en la columna del pedido: el folio nuestro y, debajo, "Sin canal" en lugar del canal. La exportación gana la referencia. *Porque conciliar sirve para disputar un cargo, y un cargo que no se puede atribuir a nada es un cargo que no se puede disputar.*

**Desempeño sí los cuenta.** Un envío suelto entregado tarde lo entregó tarde la paquetería. *Porque la cifra sirve para negociar tarifas, y dejar fuera una parte del volumen la deja más chica que la operación real, justo en la conversación donde el volumen es el argumento.*

**Las cifras de venta no los cuentan**, por lo dicho en 5.2. Y esto hay que dibujarlo: en cuanto haya envíos sueltos, "Pedidos" y "Ventas" dejan de ser el mismo número, y la pantalla que enseñe los dos tiene que decir por qué difieren. *Porque dos cifras que siempre coincidieron y un día dejan de hacerlo se leen como un error del sistema, no como un caso nuevo.*

### 5.7 La devolución de un envío suelto

**Cuelga igual que cualquier otra, sin ningún concepto nuevo.** Un envío suelto es un pedido, una devolución es un segundo envío del mismo pedido, y la definición de 1.3 se aplica palabra por palabra. Ese es el dividendo de haberlo modelado como pedido sin canal y no como una tercera cosa: con una lista aparte, las devoluciones habrían necesitado un segundo modelo.

Dos diferencias, las dos por la misma razón:

- **El mecanismo "devolución del canal de venta" no existe** aquí. No hay canal que administre nada.
- **La solicitud nunca entra por webhook.** La origina el comerciante o la origina el rastreo con un RTO.

Todo lo demás —estados, mecanismos, la puerta desde la guía con estatus de 1.7, el cierre, los tres costos— es idéntico.

### 5.8 Casos límite

- **El mismo cliente, dos veces.** No hay directorio de destinatarios y capturar la dirección completa cada vez es el trabajo que hace que la función no se use. Se ofrece buscar entre las direcciones ya usadas, que es dato nuestro y ya existe como mecanismo en el formulario de dirección de Pedidos. No se construye una libreta de contactos.
- **Un envío suelto con varios bultos.** Fuera de alcance, igual que el pedido que necesita dos cajas. Se capturan dos envíos sueltos con la misma referencia, y la referencia es lo que los junta al conciliar.
- **Se captura un envío suelto de algo que sí tenía pedido.** Queda una guía duplicada que nadie va a detectar, porque no hay folio de canal con que cruzarla. La referencia obligatoria es la única defensa, y es una defensa humana. Se dice en la pantalla de captura, no se pretende resolver.
- **Borrar un envío suelto sin guía.** Se puede, porque no es más que una captura a medias. Con guía emitida no se borra: se cancela la guía si la matriz lo permite, y si no, se dice qué pasa.

## Alcance de la primera versión

El orden de construcción es 4, 3, 2, 1: la guía manual sostiene todo lo demás, la caja correcta es el dinero, y automatizar o devolver encima de una guía que sale mal no arregla nada.

**Lo que queda fuera de la primera versión, y por qué:**

| Fuera | Motivo |
|---|---|
| Condición de embalaje por peso del pedido | Único dato que no existe en ninguna parte. Vuelve con el catálogo con peso por SKU. |
| Bloqueo por edición del pedido | Sin modelo de usuarios ni reloj compartido no protege de nada. Lo sustituye la comprobación al confirmar. |
| Quién recibió una devolución | Un campo necesita de dónde salir. Se registra qué llegó, no quién. |
| Aviso de "último intento antes de regresar" | Sin intentos numerados del carrier es una predicción nuestra. Queda el aviso de retorno ya declarado. |
| Adaptador de emisión de guía de retorno por paquetería | Necesita respuesta de al menos una. El selector se construye ahora y pinta lo que la matriz diga, incluido nada. |
| Modos acumulación y ruta fija | El modo agenda ya quita el trabajo repetitivo. Los otros dos suman sin sostener la función. |
| Tarifa por zona entre origen y destino | La tarifa real es la cotización en vivo del carrier. Una tabla por zona propia sería inventar cifras. |
| Validación previa de dirección contra un padrón | No tenemos padrón y no sabemos si alguna paquetería lo expone. La comprobación buena es el rechazo del carrier al comprar. |
| Interceptar o dar media vuelta a un envío en tránsito | Es una instrucción al transportista sobre un paquete en su poder. No somos la paquetería. |
| Libreta de contactos para envíos sueltos | La búsqueda entre direcciones ya usadas resuelve el caso repetido sin una pantalla nueva. |
| Envío suelto con varios bultos | Mismo límite que el pedido que necesita dos cajas: el modelo de una guía por envío todavía no se rompe. |
| Calendario de días inhábiles | Depende de nada externo, pero no bloquea la función. Entra en cuanto haya sitio. |
| Tipificar los cargos distintos de `rto` | Solo `rto` entra en la resta del cierre. Los demás migran después sin bloquear. |

**Lo que sí entra aunque la paquetería no haya contestado**, porque la matriz de capacidades lo permite: el selector de retorno, las dos cancelaciones, la captura de la guía del comprador, el aviso de retorno declarado, y las cinco condiciones de embalaje que no dependen del catálogo.

**Una nota de estructura.** Configuración pasa a tener cuatro zonas —entrada del pedido, paquetería, embalaje, recolección— y se sigue leyendo de corrido, porque es la lista de lo que el sistema hace solo en el orden en que lo hace. Si aparece una quinta, el corte no es sacar entradas al menú: es partirla en pestañas por momento, **Entrada · Envío · Recolección**. No antes.

---

## Preguntas abiertas

Siguen abiertas y no se van a contestar antes de construir. Cada una dice ahora **qué se construye mientras tanto**, y todas se resuelven leyendo `CAPACIDADES`: mientras el valor esté sin confirmar, la acción no se ofrece y la interfaz nombra el desconocimiento en lugar de afirmar un "no".

**Devoluciones — emisión de guía de retorno**

1. ¿Estafeta expone generación de guía de retorno por API, o solo desde su portal? → No aparece en el selector, nombrada como sin confirmar.
2. ¿DHL México expone *Return Label* por API para cuentas de cliente, y en qué modalidad: PDF, código en sucursal, o las dos? → Igual.
3. ¿FedEx México permite emitir guía de retorno sin un envío de ida asociado en su sistema? → Igual. Importa para devoluciones de pedidos que salieron con otra paquetería.
4. ¿Paquetexpress y Redpack tienen figura de guía de retorno, y bajo qué nombre en su contrato? → Igual.
5. ¿T1 Envíos, Skydropx, EnviaYa, Envíame y Turbo Envíos revenden guías de retorno? → Igual.
6. ¿Cuánto vive una guía de retorno prepagada sin usar antes de caducar, por paquetería? → Sin el dato, la guía muestra su antigüedad y ninguna cuenta regresiva.
7. ¿Se cobra al emitir la guía de retorno o al usarse? → Se registra el costo al emitir y se marca como estimado hasta que aparezca en factura.
8. ¿Alguna paquetería acepta programar una recolección en un domicilio distinto al de la cuenta? → La modalidad `recoleccion` no aparece en el selector.
9. ¿Cuál es el cargo por retorno al remitente (RTO) en cada contrato? → El cargo se captura de la factura, no se estima. La resta del cierre lo muestra vacío hasta entonces.
10. ¿Qué paqueterías reportan el intento de entrega numerado y declaran cuál es el último? → Sin eso, solo existe el aviso de retorno ya declarado por el carrier. No se cuentan intentos por nuestra cuenta.

**Devoluciones — canales**

11. ¿Mercado Libre y Amazon permiten registrar por API la resolución de una devolución que ellos administran? → Se captura a mano y el registro lo dice.
12. ¿Shopify y WooCommerce emiten webhook de solicitud de devolución con el detalle de piezas, o solo el aviso? → Sin detalle, la devolución entra como total y el desglose se captura.

**Recolecciones automáticas**

13. ¿Qué paqueterías exponen cancelación de recolección por API? → Sin confirmar, no hay botón de cancelar: hay instrucción, nombrada como sin confirmar.
14. ¿Cuál es la hora de corte de solicitud de cada paquetería, y es fija o depende de la plaza? → El corte lo propone el sistema dos horas antes de la ventana y es editable, dicho como propuesta nuestra.
15. ¿Alguna paquetería acepta modificar una solicitud ya confirmada? → Sin confirmar, la acción de sumar piezas no existe y se dice que entran a la del día siguiente.
16. ¿Se cobra por recolección solicitada, por recolección fallida, o va incluida en el contrato? → El modo acumulación no entra en la primera versión, de modo que la pregunta no bloquea nada todavía.
17. ¿Las solicitudes por plataforma (`via`) llegan a la paquetería igual que las directas, y su folio sirve para reclamar al transportista? → Se guarda el folio y se nombra a quién se le reclama según `via`, que es lo que ya hace el sistema.
18. ¿Cuántos días de anticipación admite cada paquetería? → El campo se limita a lo ya visto funcionar y lo dice.

**Embalaje**

19. ¿Todas las paqueterías usan divisor volumétrico 5000, o alguna aplica otro según el servicio? → Se usa 5000 y la cotización se marca como estimación nuestra.
20. ¿Hay medidas o peso máximos por servicio que invaliden una plantilla con cierta paquetería? → Las reglas se evalúan por separado y el fallo aparece al generar, con el motivo del carrier.
21. ¿El catálogo del comerciante tiene peso y medidas por SKU? → Sin él, la condición por peso no existe y la condición por SKU funciona tecleando el SKU en lugar de elegir el producto.
22. ¿El canal reporta SKU en cada línea del pedido? → De esto dependen la condición por producto, los vetos y la devolución parcial. Es la dependencia más barata de confirmar y la que más funciones desbloquea: conviene verificarla primero.

**Envíos sueltos y retorno desde la guía**

29. ¿Alguna paquetería expone validación de dirección o de cobertura por CP antes de comprar la guía? → Sin registro, no se ofrece comprobación previa y la pantalla dice que se comprueba al comprar.
30. ¿Alguna paquetería expone interceptar un envío en tránsito o devolverlo al remitente a petición del comerciante? → No se ofrece en ningún estatus. La devolución sobre un envío en tránsito queda registrada y espera a la entrega.
31. ¿La emisión de una guía de retorno exige que la de ida se haya emitido con la misma cuenta, o se puede emitir sobre cualquier envío? → Se propone la paquetería de la ida y se permite cambiarla; si alguna lo exige, la restricción entra como celda de la matriz.
32. ¿Cambia el costo de una guía de retorno respecto a una de ida con el mismo peso y la misma ruta? → Se cotiza con la tabla de ida, marcado como estimación.

**Cotización**

27. ¿Qué paqueterías devuelven cotización en vivo por API, con zona y con la tarifa negociada del comerciante? → Mientras tanto se cotiza por peso con nuestra tabla, marcado como estimación y diciendo que la tarifa depende de la zona.
28. ¿Cómo se cobra el seguro en cada paquetería: porcentaje sobre el valor declarado, mínimo, tarifa fija? → Sin registro, el interruptor dice el valor declarado y que el importe aparece en la factura.

**Negocio**

23. ¿Quién paga el flete de retorno por política del negocio: siempre el comerciante, siempre el comprador, o depende del motivo? → Se captura por devolución al cerrar.
24. ¿A partir de qué monto no conviene pedir el retorno del producto? → La resolución "Sin retorno" existe y el monto lo decide la persona con la resta a la vista.
25. ¿Existe una política de plazo para aceptar devoluciones, y se aplica igual en todos los canales? → Autorizar es siempre humano.
26. ¿Hay más de un operador por cuenta? → Se asume que no. Si la respuesta cambia, vuelve el bloqueo por edición, encima de la comprobación al confirmar.

# QA — segunda pasada, con las cuatro funciones

Prototipo en `http://localhost:4400`. Todo lo que sigue se probó con el navegador: clics,
tecleo, celdas de la matriz cambiadas a mano, Tab, anchos de 768 a 1280 y almacenamiento
bloqueado. Cuando cito una línea de código es para que el desarrollador sepa dónde mirar,
no como prueba: la prueba está en los pasos.

Este informe sustituye al de la primera pasada.

---

## Lo que quedó cerrado de la primera pasada

Verificado a mano, uno por uno:

- **G1 · Cancelar guía sin consultar la matriz.** Cerrado. Probado en `#10401` (Estafeta, "no"), `#1007` (FedEx, "sin registro"), `#10415` (UPS) y `#1006` (DHL): el bloque Dirección ya no duplica el botón, la franja remite a Envío —*"Lo que se puede hacer con la guía está arriba, en Envío"*— y el "Generar guía" muerto desapareció. Con `cancelaGuia` en "sí" el botón vuelve.
- **G2 · Modo privado.** Cerrado a medias, y la mitad que falta es aceptable. Ya no hay `SecurityError` sin capturar; el acceso dice, impersonal y exacto: *"Este navegador tiene bloqueado el almacenamiento del sitio y la sesión no se puede guardar. Permite los datos de sitio para este dominio, o sal del modo privado."* Lo que no hay es sesión: se sigue rebotando a `login.html?destino=…`. Como degradación honesta está bien; ver **m5**.
- **G3 · Las reglas no persistían.** Cerrado. Bajé «Pedido caro» un puesto, recargué y aguantó; `tc:embalaje` existe.
- **G4 · Regla sin condiciones.** Cerrado, y mejor de lo que pedí: *"Marca al menos una condición. Una regla sin condiciones se cumple siempre y dejaría a «Por defecto» sin ganar nunca; para que todos los pedidos salgan en otra caja, cámbiale la caja a «Por defecto»."*
- **G5 · Aviso de regla muerta.** Cerrado: *"Esta regla no ha ganado ninguna vez: «Pedidos de una pieza», en el puesto 4, ya cubre sus condiciones"* con **Subirla sobre «Pedidos de una pieza»**, que nombra a la regla y no a un puesto que envejece.
- **G6 · La matriz solo cubría cinco paqueterías.** Cerrado. Nueve filas, tres zonas (`Tus cuentas` · `Las demás paqueterías` · `Se pueden conectar`), las cinco sin cuenta en `.ficha--apagada` con su pliegue funcionando, las dos capas visibles (*"DHL en general sí cancela guías. En tu cuenta no, y eso es lo que manda."*) y el `.aviso--info` de "sin cuenta conectada". Seguí un "Confirmar con UPS" real desde Pedidos y abre la ficha con la celda enfocada.
- **G7 · El orden de las reglas.** Cerrado: el documento se corrigió y el principio —lo específico arriba, lo general abajo— está en la cabeza de la tarjeta. `#1018` sigue cayendo en revisión manual y `#1019` sigue saliendo con Caja mediana.
- **M9 · Primera persona.** Cerrado. Cero apariciones de "hemos", "no hemos", "corregimos", "sabemos" o "avisamos" en Configuración, Paqueterías, Pedidos, Recolecciones y Tracking. La excepción deliberada sobrevive sola: *"Estafeta no ha confirmado la cancelación"*, en `recolecciones.html:320`, y es la única.
- **M10 · "Lo que falta" nombraba un dato de dos.** Cerrado: *"Faltan el número exterior y la colonia"*, y el `title` del botón dice lo mismo.
- **M11 · El origen no movía el precio.** Cerrado por el camino honesto: la cabecera ahora dice *"de Almacén Puebla a Ciudad de México"*, cada tarifa lleva `Estimado` y debajo la razón: *"Estimado por peso. La tarifa final depende de la zona entre el origen y el destino, y sale de la cotización en vivo de la paquetería."*
- **M12 · El seguro no tenía cifra.** Cerrado, y con las tres formas: DHL *"1.5 % sobre el valor declarado, mínimo $35.00"*; Estafeta sustituye la casilla por *"Estafeta no asegura envíos desde aquí"*; UPS *"Sin registro del costo del seguro de UPS: el importe aparece en la factura"* con su **Confirmar con UPS**.
- **M13 · El foco se perdía.** Cerrado. Tras mover una regla con ↓ el foco sigue en "Bajar Pedido caro"; tras cambiar de tarifa con ↓ el foco sigue en el radio elegido.
- **M14 · Desbordes a 768.** Cerrado: la tarjeta de reglas ya no se sale. A 768/834/1024/1280 no hay desplazamiento horizontal de página en ninguna de las pantallas nuevas; solo las tablas se desplazan dentro de su propia caja, como siempre.
- **M15 · El lote se apagaba sin decir por qué.** Cerrado: *"Ninguno de los 3 seleccionados aplica: el pedido no cabe en su caja y ninguna caja quedó disponible."*
- **M16 · El motivo nombraba una caja vetada de dos.** Cerrado: *"Pantalla de 55 pulgadas no puede ir en Sobre y Caja chica, y la última que quedaba era la caja de la regla por defecto."*
- **M17 · Dos cifras que no cuadraban.** Cerrado: el editor ahora acota la suya —*"Sobre los pedidos de hoy, esta condición alcanza a 1 de 44"*— y el documento ganó la sección que explica por qué las dos no se parecen.
- **M18 · Faltaba "Copiar guía".** Cerrado; el botón está en la instrucción.
- **M8 · "así que".** Los cinco de la primera pasada están muertos. Aparecieron **dos nuevos**: ver **V7**.
- **Menores:** la séptima regla ya sale con pastilla **Desactivada**; quitar un veto pide confirmación.

**Regresiones: ninguna.** Recorrí Inicio, Pedidos, Tracking, Recolecciones, Cobros, Desempeño, Correcciones, Configuración, Paqueterías, Plantillas, Orígenes, Canales y Plan. Cero errores de consola, cero `NaN`, `undefined` o `[object Object]` en pantalla. De los cinco choques avisados: `recoleccionesPasadas()` devuelve las citas "sin piezas" con `recogidas: null` y ninguna suma se envenena —se pintan como "—"—; los estados nuevos de `tonos` salen todos con su pastilla; `origenDe(p)` resuelve para los 22 envíos y no hay filas fantasma; las cinco lentes originales siguen filtrando (Detenidos 3, Entregados 7, el resto paginado) y la barra de selección sigue contando por acción; y la pestaña de devoluciones, aunque no pase por `vistaDe()`, tiene buscador que encuentra por pedido, cliente, folio `DV-` y guía de retorno, sus tres filtros propios, su pie y su paginación.

**"Sin piezas" fuera del cumplimiento: correcto, comprobado a mano.** DHL tiene 9 citas en el historial, tres de ellas "sin piezas"; el cumplimiento cuenta **6 citas** y **63 de 63 piezas**. Estafeta: 7 citas, 54 piezas, 29 recogidas, 54 %. El total, 122 de 147, da el 83 % que se enseña. La cifra con la que se reclama es la correcta, y el pie lo afirma sin fecharlo.

**El quinto mecanismo, de punta a punta: funciona.** Autoricé `DV-0031`, salió la franja *"Ninguna de tus paqueterías emite guías de retorno"* con las dos ausencias nombradas distinto, las dos acciones pareadas y los dos campos. Sin número de guía: *"Falta el número de guía. Con la paquetería sola no se rastrea nada."* Con los dos: estado **Con guía de retorno**, mecanismo **Guía del comprador**, flete **$0.00** con *"La pagó el comprador"* y un enlace de rastreo público real. Después "Marcar recibida" registra qué llegó y no quién.

---

# Lo que sigue vivo

## Graves

### V1. Con una paquetería que sí emite retorno, no hay manera de emitirlo

**Gravedad:** grave. Es la función 1 entera detrás de una celda de la matriz.

**Cómo reproducirlo**
1. `http://localhost:4400/app/paqueterias.html?paqueteria=DHL&capacidad=guiaRetorno`.
2. Pon **Emitir guía de retorno** en **Sí** y elige una modalidad. El aviso confirma: *"Guardado. DHL aparece en el selector de guía de retorno."*
3. Abre `http://localhost:4400/app/pedidos.html?pedido=1016` (DV-0030, autorizada).

**Qué esperaba** — Lo que dice ux.md §1.4: el selector con la modalidad declarada antes de elegir y el botón **Generar guía de retorno con DHL · $103.00**.

**Qué pasó** — El selector se pinta perfecto: *"DHL · Guía de retorno en PDF — Se manda al correo del comprador. Tiene que imprimirla. — $103.00"*, con la opción ya elegida, y debajo las ausencias bien nombradas. **Y no hay ningún botón para emitir.** Los únicos del bloque son "Registrar guía del comprador", "Marcar recibida" y "Cerrar sin retorno". Busqué "Generar guía de retorno" en el panel entero: no existe.

Hoy no se nota, porque ninguna paquetería emite y el selector sale vacío. Se nota el día que una conteste que sí, que es justo el día para el que el documento dice que el selector *"se construye completo ahora"*. Probado también en DV-0029.

**A quién le toca:** al desarrollador.

---

### V2. "Sin registro" no se puede elegir, y la interfaz dice que sí

**Gravedad:** grave. El control acepta un valor, informa "Guardado." y se queda con el contrario.

**Cómo reproducirlo**
1. `http://localhost:4400/app/paqueterias.html?paqueteria=DHL&capacidad=cancelaRecoleccion`. La celda dice **Sí**.
2. Elige **Sin registro** en el `select`.

**Qué esperaba** — Que quede en "sin registro", que la acción deje de ofrecerse en Recolecciones y que el aviso lo diga, como especifica ux.md §0.2 con sus tres frases.

**Qué pasó** — El `select` vuelve solo a **Sí**, el valor efectivo sigue siendo `si`, `ofrece()` sigue devolviendo `true`, y el aviso dice **"Guardado. El botón de cancelar aparece en las recolecciones de DHL."** En Recolecciones, las filas de DHL siguen ofreciendo **Cancelar recolección** y el diálogo con "Sí, cancelar".

Acotado con precisión: falla **solo en las celdas que tienen capa de producto**. En la misma celda, "No" funciona y "Sí" funciona. En una celda sin capa de producto —UPS · Cancelar guía— los tres valores funcionan. O sea: todas las celdas confirmadas de DHL, Estafeta y FedEx, y la fila del divisor en las nueve, son celdas de las que ya no se puede salir.

Eso deja sin salida el caso que §0.2 diseña expresamente: *"Cuando un valor puesto por el comerciante falla contra la realidad, el fallo ofrece deshacerlo… **Quitar el registro de «Cancelar recolección»**"*. Ese botón no existe en ninguna parte del código, y el camino manual —elegir "Sin registro"— no funciona.

**A quién le toca:** al desarrollador.

---

### V3. `sumaPiezas` no tiene ninguna pantalla, y la matriz promete que sí

**Gravedad:** grave, por lo que afirma, no por lo que falta.

**Cómo reproducirlo**
1. `http://localhost:4400/app/paqueterias.html?paqueteria=Redpack&capacidad=sumaPiezas`, pon **Sumar piezas** en **Sí**.
2. El aviso dice: *"Guardado. Una guía generada después del corte **se puede sumar** a la recolección de Redpack del mismo día."*
3. Ve a `recolecciones.html` y busca esa acción.

**Qué esperaba** — Lo de ux.md §2.7: con valor afirmativo, `.boton--sutil.boton--chico` **Sumar 2 guías a esta recolección**; con negativo o sin registro, la línea *"DHL no acepta sumar piezas a una solicitud confirmada. Estas 2 entran a la del día siguiente."*, y en el segundo caso su **Confirmar con Redpack**.

**Qué pasó** — No existe ni la acción ni la línea. En todo `app/`, `sumaPiezas` solo se lee en `paqueterias.html`, para pintar su propia celda. Las tres frases de guardado están escritas y las tres son distintas y correctas; lo que no hay es la consecuencia que anuncian.

De las cinco superficies que había que auditar, cuatro obedecen —cancelar guía, cancelar recolección, emitir retorno y el seguro, las tres primeras probadas con los tres valores—. Ésta no existe.

**A quién le toca:** al desarrollador si entra en esta versión; al PM si no, y entonces hay que quitar la fila de la matriz o cambiar el aviso, porque hoy promete un botón.

---

## Medios

### V4. El panel de una devolución recibida no deja cerrarla, y repite el paso ya hecho

**Gravedad:** medio.

**Cómo reproducirlo**
1. `http://localhost:4400/app/pedidos.html?pedido=1019` (DV-0023, estado **Recibida**).

**Qué esperaba** — El cierre, que es donde ux.md §1.9 lo pone y lo único que queda por hacer.

**Qué pasó** — El bloque ofrece **"Rastrear el regreso"** y **"Marcar recibida"** — el paso que ya se dio. No hay "Cerrar devolución". La tabla de la pestaña sí lo ofrece y el diálogo funciona bien, así que el camino existe; el panel es un callejón. Lo mismo pasa al recibir una devolución desde el propio panel: el estado avanza a "Recibida" y la única acción que queda es volver a marcarla recibida.

**A quién le toca:** al desarrollador.

---

### V5. Una devolución se cierra sin resolución y sin monto

**Gravedad:** medio.

**Cómo reproducirlo**
1. Pedidos → pestaña **Devoluciones** → fila de una "Recibida" → **Cerrar devolución**.
2. Sin tocar **Resolución** ni **Monto**, pulsa **Cerrar devolución**.

**Qué esperaba** — Que pidiera lo que el diálogo existe para capturar.

**Qué pasó** — Se cierra. La fila pasa a **Cerrada · Cerrada el 21-sep** con la resolución vacía. El resto del producto valida bien —el nombre de la regla, las condiciones, el número de guía del comprador, la ventana contra el horario, los días—, así que aquí desentona.

**A quién le toca:** al desarrollador.

---

### V6. El cargo de retorno que se captura no llega a Cobros

**Gravedad:** medio.

**Cómo reproducirlo**
1. Pestaña Devoluciones, filtro Mecanismo = **Retorno al remitente**, recibe `DV-0024` y ábrele **Cerrar devolución**.
2. En "Cargo por retorno al remitente" pulsa **Capturar cargo**, pon monto 310 y factura.
3. Ve a `cobros.html`.

**Qué esperaba** — Lo de ux.md §1.1: *"El costo del retorno se refleja en Cobros, como un cargo tipificado."* El diálogo de captura lo promete otra vez: *"Queda pegado a la guía PX-220914, que es lo que hace que deje de ser un cargo huérfano y empiece a sumar."*

**Qué pasó** — La resta del diálogo sí se actualiza ($245 + $310 = $555), pero en Cobros no aparece nada: los únicos motivos son Sobrepeso, Reexpedición y Zona extendida, y ni la guía ni el monto ni la palabra "retorno" figuran. El cargo se queda donde se capturó.

**A quién le toca:** al desarrollador, o al PM si el enlace con Cobros no entra en esta versión — en cuyo caso el texto del diálogo no puede prometerlo.

---

### V7. Dos "así que" nuevos en pantalla, uno de ellos en la frase estrella

**Gravedad:** medio.

Los cinco de la primera pasada están corregidos. Estos dos son texto nuevo:

- **`app/configuracion.html:55`**, cabeza de "Tu orden de reglas": *"Se recorre de arriba abajo: gana la primera que se cumple, **así que** lo específico va arriba y lo general abajo."* Es precisamente el principio que el documento presume de haber colocado ahí.
- **`app/recolecciones.html:380`**, diálogo de cancelar recolección: *"Las guías vuelven a contar como sin recolección, **así que** la siguiente ejecución de la regla las incluye sola."*

**A quién le toca:** al desarrollador.

---

### V8. "Invalid Date" en las nueve fichas, y el divisor pasa a "confirmado" sin estarlo

**Gravedad:** medio. Son dos cosas con una sola causa.

**Cómo reproducirlo**
1. `http://localhost:4400/app/paqueterias.html`, abre el pliegue **Qué expone esta paquetería** de cualquier ficha.
2. Baja hasta **Divisor del peso volumétrico**.

**Qué esperaba** — *"Sin registro."*, que es lo que dice la tabla de datos de ux.md para esa fila.

**Qué pasó** — Dice **"Confirmado con DHL el Invalid Date."** Y lo mismo en las nueve: Estafeta, FedEx, T1 Envíos, Paquetexpress, Redpack, UPS, 99minutos y AMPM. La causa es que `divisorVolumetrico` trae capa de producto sin fecha (`{ producto: { valor: 5000 } }`), así que `procedenciaDe()` entra por la rama de "confirmado" y formatea `undefined`.

El efecto de fondo importa más que el texto roto: al contar como confirmado, **desapareció de la tarjeta de reglas la nota que ux.md §3.2 pide** —*"Calculado con divisor 5000. No está confirmado con la paquetería."*—. Busqué "divisor" en toda la pantalla de Configuración: ya no sale. El documento razona que presentar el divisor como dato del transportista sin haberlo confirmado *"es inventar la cifra que más importa"*, y ahora se presenta exactamente así.

**A quién le toca:** al desarrollador.

---

### V9. Al autorizar una devolución no se ve qué piezas regresan

**Gravedad:** medio.

**Cómo reproducirlo**
1. `http://localhost:4400/app/pedidos.html?pedido=1011`, bloque **Devolución**, estado Solicitada.

**Qué esperaba** — ux.md §1.3: *"Las piezas, en una `.tabla-caja` chica: artículo, SKU, cantidad que regresa, precio."* Y cuando el pedido no trae líneas, la frase que lo dice en vez de inventarlo.

**Qué pasó** — Ni la tabla ni la frase. El bloque tiene la franja, el resumen y los dos botones, y ninguna tabla. `#1011` sí tiene líneas con SKU. En una devolución de 1 de 1 casi no estorba; en `DV-0029`, que es **1 de 3**, o en `DV-0030`, que es **2 de 3**, el que autoriza no ve cuál de los tres artículos regresa. Es la decisión para la que el bloque existe.

**A quién le toca:** al desarrollador.

---

### V10. La lista de ausencias trata a T1 Envíos como paquetería, y apila siete botones

**Gravedad:** medio.

**Cómo reproducirlo**
1. `http://localhost:4400/app/pedidos.html?pedido=1013`, bloque Devolución.

**Qué pasó** — Debajo del selector: *"Sin registro de si Estafeta, FedEx, Redpack, UPS, 99minutos, AMPM **y T1 Envíos** las emiten."* Y una fila con **siete** botones: "Confirmar con Estafeta · Confirmar con FedEx · Confirmar con Redpack · Confirmar con UPS · Confirmar con 99minutos · Confirmar con AMPM · Confirmar con T1 Envíos".

Dos cosas. T1 Envíos es una plataforma que revende guías, no una paquetería: pedirle al comerciante que la llame para preguntarle si emite guías de retorno es mandarlo con quien no lo sabe. Y siete botones iguales en fila dejan de ser una acción y pasan a ser un muro; el ejemplo del documento tiene dos.

Que T1 Envíos tenga fila en la matriz viene del documento —la tabla de `CAPACIDADES` la incluye como novena— mientras §0.1 dice que las plataformas *"no son paqueterías y no tienen fila en la matriz"*. El documento se contradice y la pantalla hereda la contradicción.

**A quién le toca:** al PM la fila de T1 Envíos; al de UX cómo se agrupan las confirmaciones cuando son más de dos.

---

### V11. El panel de la regla de recolección dice dos hechos ciertos y calla la conclusión

**Gravedad:** medio.

**Cómo reproducirlo**
1. Configuración, zona **Cuando hay guías sin recoger**, fila "Almacén Puebla · DHL" → **Editar regla**.

**Qué pasó** — La franja dice *"Ahora mismo hay **4** guías de DHL sin recolección en Almacén Puebla"* y, más abajo, *"**4 de esas 4** se compraron en Skydropx. Con «Se pide directo», esas 4 quedan fuera de la solicitud y se programan a mano."* Las dos son ciertas. Juntas significan que la regla, tal como está guardada, **hoy no recoge nada**, y eso no se dice en ninguna parte.

Es la misma familia que el producto ya resuelve bien dos veces —la regla de embalaje muerta y la paquetería sin cuenta en el primer puesto—, con el mismo remedio disponible: nombrarlo donde se lee. El ejemplo del documento tiene 4 de 9, donde quedan cinco; aquí no queda ninguna.

**A quién le toca:** al de UX.

---

## Menores

- **m1.** El buscador de la pestaña Devoluciones dice `Filtrar por pedido, cliente o destino`; ux.md §1.2 pide `Filtrar por pedido, cliente o guía de retorno`. Busca bien por guía de retorno —lo comprobé—, pero no lo anuncia. — dev
- **m2.** Las parejas de recolección se ordenan por el id interno del origen, así que "Tienda Roma" sale arriba de "Almacén Puebla", que es el origen predeterminado y el que tiene toda la actividad. — dev
- **m3.** El pie de esa tarjeta dice *"Solo aparecen las parejas que han tenido envíos"*, pero también aparecen las que solo han tenido citas de recolección (Tienda Roma · FedEx y · UPS no tienen ningún envío). La frase promete un criterio más estrecho que el real. — dev
- **m4.** `?cuenta=dhl&capacidad=…` sigue funcionando para las paqueterías con cuenta y no hace nada para las otras cinco; el parámetro vivo es `?paqueteria=`. Ningún enlace del producto usa el viejo, así que solo afecta a marcadores de la versión anterior. — dev
- **m5.** Con el almacenamiento bloqueado el mensaje es correcto, pero la copia en memoria no cubre la sesión: sigue sin poderse entrar. Si la intención era que el prototipo funcionara en ventana privada, falta; si era avisar y no romper, está hecho. — PM, para decidir cuál de las dos era.
- **m6.** Tras un guardado fallido en el panel de regla, el error *"Falta el nombre de la regla"* se queda a la vista aunque el campo ya esté lleno, hasta el siguiente intento. — dev
- **m7.** El pie de Devoluciones dice *"$794.00 en retornos del periodo"* y no se mueve al cerrar una devolución ni al capturar un cargo de $310. Puede ser correcto —el flete existe desde que se compra la guía, no desde que se cierra—, pero no hay forma de saber qué suma; la etiqueta no dice si cuenta fletes, cargos o los dos. — PM
- **m8.** En una devolución "Recibida" el panel ofrece **Marcar recibida** otra vez, sin marca de que ya se hizo. — dev

---

# Veredicto

**Sí se sube y sí se le enseña a un cliente, con una condición: arreglar V2 antes, y no enseñar la emisión de guías de retorno.**

El salto entre pasadas es grande y conviene decirlo con números: de los siete graves y once medios de la primera pasada, quedan cerrados todos menos el "así que", que volvió por dos sitios nuevos. Y las dos funciones que no había visto llegan mejor terminadas que las dos que ya conocía. Recolecciones enseña las cinco filas de la tabla de cancelación funcionando con datos reales —botón, botón con corte, corte pasado, "no" y "sin registro"—, valida la ventana contra el horario del origen con las tres frases exactas, avisa de las guías que la regla no va a tomar en los tres sitios donde el documento lo pide, y la cifra de cumplimiento está bien calculada, que era lo que había que comprobar: 63 de 63 para DHL con tres citas vacías correctamente fuera. Devoluciones tiene los cinco mecanismos, el quinto funciona de punta a punta, Tracking marca "Va de regreso" solo en las dos filas donde la paquetería lo declaró con sus palabras y deja en paz la tercera, y el cargo del RTO se captura donde hace falta para la resta.

**V2 hay que arreglarlo antes de subir** porque no es un hueco, es una afirmación falsa: el comerciante elige "Sin registro", lee "Guardado." y se queda con "Sí". Es el mismo tipo de defecto que V1 de la primera pasada, en la pantalla que existe justamente para que el producto no mienta sobre lo que la paquetería expone. Y no hay otra salida: el botón de quitar el registro que el documento diseña no está construido.

**V1 y V3 no bloquean la demostración pero sí acotan lo que se puede prometer.** Mientras ninguna paquetería emita retorno —que es el día de lanzamiento retratado en los datos— el selector sale vacío y nadie ve que no hay botón. Lo que no se puede hacer es enseñar la matriz cambiando `guiaRetorno` a "Sí" para lucir el selector, porque lo que aparece no lleva a ninguna parte. Con `sumaPiezas` igual: la celda se puede enseñar, la consecuencia que anuncia no existe.

De los medios, V8 es el que más se ve en una demostración —"Invalid Date" nueve veces en la pantalla que es el vocabulario del producto— y es de una línea. V4 y V5 están en el camino que un cliente va a recorrer solo si se le enseña cerrar una devolución; si se enseña, se ven los dos seguidos.

**Sobre el criterio del dueño del producto, que es lo que preguntaste aparte:**

- **La pantalla de reglas ahora sí se entiende.** Los tres defectos que señalé desaparecieron: la regla que no ganaba nunca lo dice en su fila y ofrece la salida, la regla sin condiciones no se puede crear y el error explica qué hacer en su lugar, y las dos cifras dejaron de contradecirse porque cada una dice de qué habla. Y la cabeza de la tarjeta ahora enseña el principio del orden, que es lo que le faltaba a alguien que llega por primera vez: ya no hay que deducir por qué siete filas están en ese orden.
- **Recolecciones se entiende rápido.** La tabla de parejas contesta de un vistazo qué está automatizado y qué no, el panel compara los tres modos en vez de esconderlos, cada campo dice su consecuencia, y los avisos de fallas y de `via` están en la fila, no en un informe. Lo único que pediría es V11: que cuando los dos hechos sumen cero, lo diga.
- **Devoluciones es la más difícil de las cuatro y aun así se sigue**, porque la tabla lleva el mecanismo y el estado juntos y la columna de acción dice el siguiente paso. Donde se tropieza es al final: se recibe y no se puede cerrar desde donde se estaba (V4), y al autorizar no se ve qué regresa (V9). Las dos cosas le pasan a quien haga el recorrido completo, que es exactamente lo que va a hacer un cliente al que se le enseñe.

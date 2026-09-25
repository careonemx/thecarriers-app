# QA — matriz de capacidades, guías manuales y reglas de embalaje

Prototipo en `http://localhost:4400`. Todo lo que sigue se probó con el navegador:
clics, tecleo, arrastre real, Tab, anchos y almacenamiento bloqueado. Nada de esto
sale de leer el código; cuando cito una línea es para que el desarrollador sepa
dónde mirar, no como prueba.

Sesión: `sessionStorage.setItem("tc_sesion", JSON.stringify({correo:"bea@ejemplo.mx", desde: Date.now()}))`.

---

## Lo que funciona (una línea cada cosa, para no repetirlo abajo)

- El veto no se puede saltar desde el panel: el Sobre sale deshabilitado con el motivo en su `title` y el botón bloqueado con "Falta elegir la caja del paquete."
- `#1018` cae en revisión manual con el motivo escrito en la fila; `#1019` se genera con Caja mediana por «Cristalería acompañada». Las dos demostraciones del documento se cumplen.
- El arrastre **no** es decorativo: arrastré «Pedido caro» del puesto 5 al 4 con `dragstart`/`dragover`/`drop` reales y `#1011` pasó de Sobre a Caja chica. Cambia el orden y cambia la decisión.
- El precio se recalcula mientras se teclea el peso y al soltar la caja; las tarifas se recotizan con el peso facturable.
- Elegir una paquetería distinta de la propuesta exige motivo, con el botón deshabilitado y el porqué en su `title`.
- Los tres desenlaces de la comprobación al confirmar funcionan: `#1013` no emite la segunda guía, `#1017` enseña los `.cambio` del canal, `#0997` distingue el fallo que no se reintenta y repinta las tarifas sin DHL.
- El panel no se cierra en ningún fallo ni al corregir la dirección, y lo capturado se queda.
- Los tres valores de `cancelaGuia` se comportan distinto en Pedidos, y cambiar la celda de DHL en Paqueterías cambia el bloque Envío de `#1006` en el acto. La prueba de fuego la pasa.
- "Confirmar con FedEx" abre `paqueterias.html` con la ficha desplegada y la celda enfocada.
- El lote omite los pedidos en revisión manual y lo dice con su motivo agrupado.
- Teclado: en las tres pantallas se llega a todo, el foco se ve siempre y el panel del pedido atrapa el foco correctamente.

---

# Graves

## G1. Se ofrece cancelar la guía de paqueterías que no cancelan, y el botón no hace nada

**Gravedad:** grave. Es la violación exacta del principio de la capa de en medio, y además el panel se contradice a sí mismo.

**Cómo reproducirlo**
1. `http://localhost:4400/app/pedidos.html?pedido=10401` (Estafeta, `cancelaGuia: "no"`).
2. En el bloque Dirección de envío, **Editar dirección**.
3. Cambia cualquier campo, por ejemplo la calle. **Guardar dirección**.

**Qué esperaba** — Que la acción saliera de la matriz, igual que en el bloque Envío: con `cancelaGuia` en "no" no se ofrece cancelar, se ofrece la `.instruccion--no`.

**Qué pasó** — Aparece un botón rojo **"Cancelar guía y generar otra"** y el texto *"La guía 6050000998877 ya estaba generada con la anterior, así que hay que cancelarla y generar otra."* Tres centímetros más arriba, el mismo panel dice **"Estafeta no cancela guías desde aquí"** y da los pasos para llamar por teléfono. Al pulsar el botón **no ocurre absolutamente nada**: ni diálogo, ni aviso, ni cambio.

Lo mismo con `?pedido=1007` (FedEx, "sin confirmar") y `?pedido=10415` (UPS, que ni siquiera está en la matriz). El origen está en `app/pedidos.html:368`, donde el botón se pinta con `d.envio ? … : …` sin preguntarle a `ofrece(paqueteria, "cancelaGuia")`.

**A quién le toca:** al desarrollador. El diseño está bien escrito en ux.md §4.3; el bloque Dirección no lo aplicó.

---

## G2. En modo privado no se puede ni entrar, y no se dice por qué

**Gravedad:** grave.

**Cómo reproducirlo**
1. Ventana privada, o cualquier navegador con el almacenamiento del sitio bloqueado.
2. `http://localhost:4400/login.html`, escribe cualquier correo y clave, **Entrar**.

**Qué esperaba** — O que entre, o que diga que hace falta permitir el almacenamiento.

**Qué pasó** — La consola lanza `Uncaught SecurityError: The operation is insecure.`, la pantalla no se mueve y no aparece ningún mensaje. Entrando por una URL interna, el guardián rebota a `login.html?destino=…` y el ciclo se repite. `assets/datos.js` sí envuelve sus accesos en `try/catch` con el comentario "modo privado"; `assets/app.js:19` y `:21` (`sesion.abrir` y `sesion.cerrar`) no.

Es infraestructura compartida, no de estas tres funciones, pero las bloquea a las tres.

**A quién le toca:** al desarrollador.

---

## G3. La zona de embalaje dice "Guardado." y no guarda nada

**Gravedad:** grave. La interfaz afirma algo que no es cierto, y hace imposible la demostración que más importa.

**Cómo reproducirlo**
1. `http://localhost:4400/app/configuracion.html`, zona "Con qué caja sale cada pedido".
2. Mueve «Pedido caro» un puesto arriba con ↓ o arrastrando. Sale el aviso **"Guardado. «Pedido caro» queda en el puesto 4."**
3. Recarga la página, o ve a Pedidos y vuelve.

**Qué esperaba** — Que el orden aguantara al menos lo que dura la sesión, como aguantan las guías generadas (`tc:guias`) y las celdas de la matriz (`tc:capacidades`).

**Qué pasó** — Todo vuelve al orden original. Lo mismo con agregar o borrar una regla, quitar o poner un veto, cambiar una caja, escribir un motivo y tocar el tope de revisión manual: nada sobrevive a un cambio de pantalla.

La consecuencia práctica: **no se puede enseñar que cambiar una regla cambia lo que pasa en Pedidos**, porque al llegar a Pedidos la regla ya volvió a ser la de antes. La matriz sí persiste; las reglas no. Dos funciones hermanas con dos comportamientos.

**A quién le toca:** al desarrollador. Si la decisión es deliberada, entonces la palabra "Guardado." no puede quedarse.

---

## G4. Una regla sin ninguna condición se guarda, se lee igual que «Por defecto» y la deja muerta

**Gravedad:** grave.

**Cómo reproducirlo**
1. `http://localhost:4400/app/configuracion.html` → **Agregar regla**.
2. Escribe solo un nombre, por ejemplo "Prueba". No marques ninguna condición.
3. **Agregar regla**.

**Qué esperaba** — O que no deje guardar una regla que se cumple siempre, o que avise de lo que acaba de pasar.

**Qué pasó** — Se guarda con `condiciones: {}`. Queda en el último puesto movible, justo encima de «Por defecto», y:
- Su columna Regla dice **"Cualquier pedido que no haya ganado arriba"**, exactamente la misma frase que la fila «Por defecto». Dos filas que se leen igual, una con número y otra con guion.
- Como se cumple siempre, **«Por defecto» no puede ganar nunca más**, y sin embargo su `.cobro` sigue diciendo "El 18 % de las guías… 39 de 214".
- No aparece ningún aviso.

El nombre sí es obligatorio (sale "Falta el nombre de la regla."), lo que hace más raro que las condiciones no lo sean.

**A quién le toca:** al desarrollador, y al PM si hay que decidir si una regla sin condiciones debe existir.

---

## G5. El aviso de regla muerta no existe

**Gravedad:** grave, porque es uno de los dos avisos que justifican la tarjeta y el brief pedía comprobar justo este caso.

**Cómo reproducirlo**
1. `http://localhost:4400/app/configuracion.html`, mira la fila 6, «Una pieza a entrega local».

**Qué esperaba** — Lo que dice ux.md §3.2:
> `.aviso--alerta` **Esta regla no ha ganado ninguna vez: «Pedidos de una pieza», en el puesto 4, ya cubre sus condiciones.**
> `.boton--fantasma.boton--chico` **Subirla al puesto 1**

**Qué pasó** — Solo hay un `.cobro` que dice *"Esta regla no generó ninguna guía en los últimos 30 días."* No dice **por qué**, no dice **quién** se la come, y no ofrece la salida. `grep -rn "no ha ganado\|Subirla al puesto"` en `app/` y `assets/` no devuelve nada.

Lo curioso es que la información sí existe: si abres **Editar** en esa regla, la franja dice *"Los toma antes «Pedidos de una pieza», en el puesto 4."* Está calculado y no se pinta donde hace falta. Para enterarte tienes que abrir las siete reglas una por una.

El aviso hermano, el del SKU que no aparece en ningún pedido, sí está y funciona en la fila 7.

**A quién le toca:** al desarrollador.

---

## G6. "Sin confirmar" no cierra el círculo en 5 de las 9 paqueterías, y una de ellas es el ejemplo del documento

**Gravedad:** grave. Es la distinción sobre la que se apoya la matriz entera.

**Cómo reproducirlo**
1. `http://localhost:4400/app/pedidos.html?pedido=10409` (Paquetexpress) o `?pedido=10415` (UPS).
2. Mira el bloque Envío.

**Qué esperaba** — ux.md §0.3 dice que el modificador `--sin-confirmar` **siempre** agrega un paso final y el botón **Confirmar con Paquetexpress**, y usa Paquetexpress como ejemplo textual.

**Qué pasó** — Sale la `.instruccion--sin-confirmar` con el encabezado correcto, pero **sin el tercer paso y sin el botón**. Queda indistinguible de un "no", salvo por la redacción del título. Con DHL, Estafeta y FedEx sí aparece, porque esas tres tienen ficha en `paqueterias.html`.

La causa es de datos: `cuentasEnvio` solo trae DHL, Estafeta, FedEx y T1 Envíos. `CAPACIDADES` tiene cinco paqueterías (Paquetexpress y Redpack incluidas) y **esas dos filas no se pueden editar desde ninguna pantalla**. UPS, 99minutos y AMPM aparecen en el orden de preferencia y se cotizan en Pedidos, pero no están en la matriz: caen al "sin confirmar" por omisión, sin manera de confirmarlas.

ux.md ya pedía las tres cuentas que hay, pero la tabla de `CAPACIDADES` del mismo documento tiene cinco. El documento se contradice consigo mismo.

**A quién le toca:** al PM. Hay que decidir si la matriz cubre todas las paqueterías del producto o solo las que tienen cuenta, y completar `cuentasEnvio` en consecuencia.

---

## G7. Arbitraje: el orden que hay en pantalla es el correcto. El documento está mal

**Gravedad:** grave, como defecto del documento. La pantalla no tiene nada que arreglar aquí.

**Cómo lo comprobé** — Con el orden literal de ux.md («Pedidos de una pieza», «Pedido caro», «Ventilador solo», «Ventilador acompañado», «Cristalería acompañada», la muerta) y con el de pantalla, sobre los mismos pedidos:

| Pedido | Orden del documento | Orden de pantalla |
|---|---|---|
| `#1010` | Sobre · Pedidos de una pieza | Sobre · Pedidos de una pieza |
| `#1011` | Sobre · Pedidos de una pieza | Sobre · Pedidos de una pieza |
| `#1015` | **Sobre · Pedidos de una pieza** | Caja grande · **Ventilador solo** |
| `#1016` | Caja grande · Ventilador acompañado | Caja grande · Ventilador acompañado |
| `#1018` | **Revisión manual** | **Revisión manual** |
| `#1019` | **Caja chica · Pedido caro** | **Caja mediana · Cristalería acompañada** |
| `#1021` | Revisión manual (veto) | Revisión manual (veto) |

Dos demostraciones se rompen con el orden del documento:

- **`#1015` deja de demostrar «Ventilador solo»**, que era su único trabajo según la tabla de datos de ux.md. Con «Pedidos de una pieza» en el puesto 1, esa regla no puede ganar nunca.
- **`#1019` sale en Caja chica por «Pedido caro»**, no en Caja mediana por «Cristalería acompañada». El documento dice explícitamente que Cristalería *"es la que salva a `#1019`"*. Y el motivo escrito en esa misma regla dice *"En una caja chica se rompieron tres veces."* Siguiendo el documento al pie de la letra, las copas acaban en la caja que las rompe.

El desarrollador tenía razón y su argumento es correcto. **Hay que corregir ux.md**, la lista de "Las reglas de embalaje — `export const reglasEmbalaje`": las condiciones por producto van arriba de las genéricas, porque una condición más específica que está debajo de una más general es una regla muerta por construcción.

Hay un segundo error en la misma sección, independiente del orden: **`#1021` no puede demostrar nunca el tope por peso**. El documento le asigna ese papel, pero también le pone dos vetos a `MON-TV-55` (nunca Sobre, nunca Caja chica), y con cualquiera de los dos órdenes el pedido se queda sin caja y cae por veto antes de que el peso llegue a medirse. En el build, el tope lo demuestra `#1014`, al que el documento le había asignado otro papel. Eso también hay que arreglarlo en el documento.

**A quién le toca:** al PM y al de UX.

---

# Medios

## M8. Hay dos "así que" más en pantalla, además de los tres ya detectados

**Gravedad:** medio.

Los tres conocidos están confirmados **visibles**, no solo en el fuente:

- `assets/datos.js:2149` → es el valor del `textarea` de Motivo de la fila 6 en `configuracion.html`. Se lee en pantalla.
- `app/configuracion.html:383` → para verlo hay que poner las seis paqueterías en "No usar" una por una: *"Ninguna paquetería está marcada como Se puede usar, así que no hay preferida…"*. Esa frase tiene además un segundo error: termina diciendo *"y cada envío se resuelve entre las de evitar"* cuando ninguna está en "Evitar".
- `app/pedidos.html:365` → sale al guardar una dirección editada a mano en un pedido con guía (ver G1).

Y dos que no estaban en la lista:

- **`app/plantillas.html:304`** — *"Pesa 2 kg y la caja no abulta más que eso, **así que** pagas por lo que pesa."* Se ve al elegir una caja en Plantillas. Lo llamativo: el `.cobro` nuevo de Pedidos dice la misma idea bien escrita, *"Pesa 0.5 kg y la caja no abulta más que eso."* Las dos copias del mismo texto ya divergieron, que es exactamente lo que ux.md §3.6 quería evitar al convertir `.cobro` en componente.
- **`app/etiqueta.html:303`** — *"La guía ya existe con esa dirección, **así que** corregirla aquí no cambia la etiqueta…"*

**A quién le toca:** al desarrollador.

---

## M9. "No hemos confirmado si X…" está en primera persona, que está prohibido

**Gravedad:** medio, y hace falta que alguien lo decida antes de tocarlo.

`sistema.html:813` dice: *"Nunca en primera persona. La interfaz no dice «corregimos» ni «te avisamos»."* Y ux.md §0.3 manda textualmente **"No hemos confirmado si Paquetexpress cancela recolecciones desde aquí"**, que es primera persona del plural y sale hoy en pantalla en Pedidos.

ux.md dice de sí mismo que `sistema.html` manda sobre él. Entonces la redacción actual está mal, pero no la puede cambiar el desarrollador por su cuenta: la gracia de esa frase es que dice quién no ha confirmado, y una versión impersonal ("Está sin confirmar si Paquetexpress…") pierde justo eso.

**A quién le toca:** al PM y al de UX, para arbitrar. No al desarrollador: hizo lo que decía el documento.

---

## M10. "Lo que falta" nombra un dato cuando faltan dos, y el recorrido cuesta dos viajes

**Gravedad:** medio. Rompe el recorrido principal de la función 4 tal como está escrito en ux.md §4.9.

**Cómo reproducirlo**
1. `http://localhost:4400/app/pedidos.html?pedido=0997`.
2. La franja dice **"Falta la colonia"**. **Editar dirección**.
3. Escribe la colonia. **Guardar dirección**.

**Qué esperaba** — Que se guarde, la franja desaparezca y el botón se reactive, que es lo que el documento describe paso a paso.

**Qué pasó** — El formulario rechaza el guardado con **"Falta el número exterior."**, un campo que la franja nunca mencionó. Hay que escribirlo y volver a guardar. Solo entonces funciona todo bien (la franja se va, el panel no se cierra, vuelve a cotizar y el botón se activa).

Además, al abrir el formulario el foco cae en **"Nombre de contacto"** y ningún campo está marcado: para encontrar la colonia hay que recorrer catorce campos con la vista. Alguien que no sabe de esto va a tardar más en encontrar el campo que en escribirlo.

**A quién le toca:** al desarrollador la lista incompleta; al de UX el que no se señale el campo que falta.

---

## M11. Cambiar "Sale de" no mueve el precio

**Gravedad:** medio.

**Cómo reproducirlo**
1. `http://localhost:4400/app/pedidos.html?pedido=1018`, elige Caja mediana.
2. Cambia **Sale de** de "Almacén Puebla" a "Tienda Roma". El destino es Ciudad de México.

**Qué esperaba** — Que un envío local costara distinto que uno foráneo, o al menos que la línea de encabezado dijera de dónde sale.

**Qué pasó** — Las cuatro tarifas y el botón se quedan idénticos al peso ($444.00 en los dos casos). El encabezado sigue diciendo *"Con tus cuentas, para Ciudad de México · 12 kg facturables:"* sin nombrar el origen. `cotizar(peso)` solo mira el peso.

ux.md justifica el bloque entero diciendo que *"todo lo que mueve el precio se pueda cambiar sin salir"*, y pone "Sale de" el primero de esos campos. Hoy cambia el remitente de la etiqueta, que es real, pero no el precio. Un cliente va a probar justo eso.

**A quién le toca:** al desarrollador si se puede meter la zona en el cálculo; al PM si se decide que el prototipo cotiza solo por peso, y entonces hay que decirlo antes de enseñarlo.

---

## M12. "Asegurar el envío" no tiene ninguna consecuencia visible

**Gravedad:** medio.

**Cómo reproducirlo**
1. `http://localhost:4400/app/pedidos.html?pedido=1018`, elige una caja.
2. Marca **Asegurar el envío**.

**Qué esperaba** — Alguna cifra. Es una casilla que cuesta dinero.

**Qué pasó** — No cambia nada en pantalla: ni el botón, ni las tarifas, ni aparece una línea con el costo del seguro. La ayuda dice *"El seguro se cobra aparte de la guía, sobre el valor declarado"*, lo cual es honesto, pero deja al operador marcando una casilla sin saber cuánto va a pagar. Después de emitir, el bloque sí muestra "Seguro sobre el valor declarado · $1,480.00", que es el valor asegurado, no lo que cuesta asegurarlo.

**A quién le toca:** al PM primero (¿sabemos el costo del seguro o no?), y al de UX después. Si no lo sabemos, la casilla tiene que decir que el importe se ve en la factura.

---

## M13. Al mover una regla o al cambiar de tarifa con el teclado, el foco se pierde

**Gravedad:** medio. Es accesibilidad, y es también velocidad para cualquiera.

**Cómo reproducirlo (reglas)**
1. `http://localhost:4400/app/configuracion.html`.
2. Con Tab, llega al botón **↓** de «Pedido caro». Pulsa Enter.
3. Pulsa Tab.

**Qué pasó** — La lista se repinta entera y `document.activeElement` pasa a ser `<body>`. El siguiente Tab empieza desde el principio del documento. Para bajar una regla dos puestos hay que volver a recorrer toda la lista con Tab.

**Lo mismo en Pedidos:** en la lista de tarifas, con el foco en el radio y pulsando ↓, la tarifa cambia correctamente pero el foco se va a `<body>`. No se puede recorrer la lista con las flechas, que es justo para lo que sirve un grupo de radios.

Lo demás del teclado está bien: en las tres pantallas se llega a todo, el `outline` se ve siempre (`solid 2px`), las flechas tienen nombre accesible ("Subir Ventilador solo"), el asa está `aria-hidden` y fuera del recorrido, el panel del pedido atrapa el foco y todos los campos tienen etiqueta.

**A quién le toca:** al desarrollador.

---

## M14. A 768 px la fila de reglas se corta y "Editar" queda partido

**Gravedad:** medio.

**Cómo reproducirlo**
1. Ventana de **768 px** de ancho. `http://localhost:4400/app/configuracion.html`, baja a "Tu orden de reglas".

**Qué pasó** — El contenedor mide 718 px y el contenido 746. El botón **Editar** se ve como "Edita", el `.cobro` se sale por la derecha ("…Diferencia" cortado) y la cabecera "REGLA · CAJA · MOTIVO" no acompaña al desplazamiento. No hay barra horizontal visible que invite a desplazar.

834, 1024 y 1280 están bien: sin desbordes en ninguna de las tres pantallas. En Paqueterías no hay desbordes a ningún ancho. La tabla de Pedidos se desborda en su propio contenedor con desplazamiento, que es su comportamiento de siempre.

768 es un iPad en vertical, que es el equipo más probable en un almacén.

**A quién le toca:** al desarrollador.

---

## M15. Desde el filtro de revisión manual, el lote se apaga sin decir por qué

**Gravedad:** medio.

**Cómo reproducirlo**
1. `http://localhost:4400/app/configuracion.html` → "Verlos en Pedidos", que lleva a `pedidos.html?pendiente=revision-manual`.
2. Marca la casilla de la cabecera para seleccionar los tres.

**Qué esperaba** — Lo que ux.md §4.6 pide: *"Se omiten porque: Ninguna caja quedó disponible — #1018 #1019."*

**Qué pasó** — La barra dice **"Forzar paquetería (0)"** y **"Generar guías (0)"**, los dos en gris, sin `title` y sin ningún texto. Nada explica por qué. El usuario llegó ahí por un enlace que le prometía trabajo por hacer y se encuentra dos botones apagados.

La frase correcta **sí existe**: si seleccionas una mezcla de pedidos (pon 50 por página y marca todo), el diálogo dice *"Se omiten porque: … El pedido no cabe en su caja — #1014 · Ninguna caja quedó disponible — #1018 #1021."* Está perfecto. Solo falta el caso en que **todos** los seleccionados se omiten, que es justo al que lleva el enlace.

**A quién le toca:** al desarrollador.

---

## M16. El motivo de revisión manual nombra una caja vetada cuando hay dos

**Gravedad:** medio. Es un dato incompleto sobre una decisión del sistema.

**Cómo reproducirlo**
1. `http://localhost:4400/app/pedidos.html?pendiente=revision-manual`, fila `#1021`.

**Qué pasó** — La fila dice *"Pantalla de 55 pulgadas no puede ir en Sobre, y Sobre es la caja de la regla por defecto."* Pero `MON-TV-55` tiene **dos** vetos: Sobre y Caja chica. La regla «Pedido caro» le había asignado Caja chica y también se la quitó el veto. Al abrir el panel el operador encuentra dos cajas bloqueadas cuando el motivo le habló de una.

**A quién le toca:** al desarrollador. `embalajeDe()` se queda con la última regla bloqueada y solo cuenta esa.

---

## M17. Las cifras de la misma tarjeta no cuadran entre sí

**Gravedad:** medio. Confunde, y es lo primero que va a preguntar un cliente.

**Cómo reproducirlo**
1. `http://localhost:4400/app/configuracion.html`, fila «Cristalería acompañada»: *"Esta regla generó 9 guías en los últimos 30 días."*
2. Pulsa **Editar** en esa misma fila: *"De los 40 pedidos de los últimos 30 días, 1 cumple estas condiciones."*

**Qué pasó** — Dos números sobre el mismo periodo que no se pueden conciliar: 9 guías contra 1 pedido que cumple. El pie de la tarjeta habla de 214 guías y los pedidos de ejemplo son 40. `efectoEmbalaje` es un histórico inventado y `hechosDeRegla` se calcula sobre los pedidos reales del prototipo; las dos cifras conviven en la misma pantalla sin puente.

**A quién le toca:** al PM. O los datos de ejemplo se cuadran, o el `.cobro` dice de qué periodo y de qué universo habla.

---

## M18. Falta "Copiar guía" en la instrucción

**Gravedad:** medio.

ux.md §4.3 escribe el paso así:
> **1.** Llama a Estafeta al 800 378 2338 y pide la cancelación de la guía `6050000112233`. — **Copiar guía**

En pantalla (`pedidos.html?pedido=1018` tras generar con Estafeta) el número sale en un `<span class="instruccion__dato">` sin botón. Hay que leerlo de la pantalla y dictarlo por teléfono sin equivocarse. El componente existe precisamente para quitar esa fricción; ux.md §0.4 pide el dato "en monoespaciado y copiable".

**A quién le toca:** al desarrollador.

---

# Menores

- **m1.** Regla nueva: antes de escribir nada la franja dice *"De los 40 pedidos…, 40 cumplen estas condiciones"* y lista cinco reglas que se los llevan. Es correcto y es ruido: el formulario está vacío. Y el foco al abrir cae en el `<dialog>`, no en "Nombre de la regla". — dev
- **m2.** Una regla recién creada no pinta ningún `.cobro`, mientras que las de cero guías dicen "Esta regla no generó ninguna guía en los últimos 30 días." Dos silencios distintos para el mismo hecho. — dev
- **m3.** El aviso de guardado de "No" y el de "Sin confirmar" son **idénticos** palabra por palabra ("Los pedidos con guía de DHL dejan de ofrecer la cancelación…"). Borra justo la distinción que la matriz existe para hacer. El de "Sí" sí es distinto y está bien. — dev
- **m4.** En la cabeza de la matriz: *"Ofrecer una acción que quizá funcione se averigua con un paquete real."* La frase está rota; el original de ux.md es *"…es la forma más cara de averiguarlo: se averigua con un paquete real."* — dev
- **m5.** **"Quitar veto"** borra en el acto, sin confirmación. Es lo que protege un producto frágil y lo quita un clic de más. — UX
- **m6.** Tarjeta 3: la etiqueta dice *"Veces que el peso del pedido puede superar el de la plantilla"* y ux.md pide *"Pasar a revisión manual cuando el peso del pedido supere el de la plantilla por [3] veces"*. La ayuda también lleva una frase de más al principio. — dev
- **m7.** Tras la comprobación "Este pedido ya tiene guía" (`?pedido=1013`), un segundo clic en Generar hace desaparecer la franja y no pasa nada más. No emite la segunda guía, que es lo importante, pero el segundo clic parece no hacer nada. — dev
- **m8.** En esa misma franja no se explica por qué falta "Cancelar guía y generar otra" (Estafeta no cancela). En §4.3 la ausencia sí se explica con la `.instruccion`; aquí es silencio. — dev
- **m9.** El `select` de Paquetería del diálogo de lote va en orden arbitrario (Estafeta, 99minutos, Redpack, Paquetexpress, DHL, FedEx, UPS): ni el de preferencia ni alfabético. — dev
- **m10.** En el lote de "Generar guías" el botón dice **"Generar 6 pedidos"**. El objeto está mal: se generan guías, no pedidos. El de "Forzar paquetería" sí dice "Generar 6 guías con Estafeta". — dev
- **m11.** El motivo del cambio de paquetería en el lote incluye *"La propuesta no tiene cobertura"*, que es el texto de reserva de `motivosCambioPaqueteria(null)`. En el lote no hay una propuesta única, así que se entiende, pero se lee raro al lado de una paquetería ya elegida. — UX
- **m12.** El `.cobro` de las reglas consulta siempre `capacidadDe("DHL", "divisorVolumetrico")` aunque la guía pueda salir con otra paquetería (`configuracion.html`, `cobroHTML`). Hoy las cinco tienen 5000 y no se nota; el día que una difiera, la cifra será de otra. — dev
- **m13.** `ux.md` §3.4 pide que el `select` de motivo de la vista de revisión manual liste solo los motivos que ocurrieron. No hay ningún `select` de motivo. El motivo sí va escrito en cada fila, que es la parte que sostiene el diseño. — dev
- **m14.** La séptima regla, «Ventilador de repuesto», ux.md la pide **desactivada**. En los datos está activa. No cambia ninguna decisión porque su SKU no aparece en ningún pedido, pero el estado "desactivada" no se puede ver en ninguna parte de la pantalla. — PM / dev

---

# Veredicto

**Se puede enseñar a un cliente, pero no tal como está hoy. Faltan tres arreglos, y son de una tarde.**

Lo que hay debajo está bien pensado y, salvo lo que sigue, bien hecho. La matriz funciona de verdad de punta a punta: cambias una celda en Paqueterías y la pantalla de Pedidos cambia en el acto, con los tres valores comportándose distinto y con el camino de vuelta ("Confirmar con FedEx") llevando a la celda exacta. El bloque de guías manuales hace lo que el documento prometió: se corrige la dirección sin salir, el precio se mueve mientras se teclea, el cambio de paquetería exige motivo, el fallo que no se reintenta lo dice y repinta las alternativas. El arrastre de reglas no es decorativo, y lo comprobé moviendo una regla y viendo cambiar la caja de un pedido.

Antes de ponerlo delante de nadie:

1. **G1** — Quitar el "Cancelar guía y generar otra" del bloque Dirección o hacerlo depender de la matriz. Tal como está, el prototipo se contradice a sí mismo dentro del mismo panel y, si el cliente pulsa el botón, no pasa nada. Es el defecto que desmonta el argumento de la capa de en medio en la propia demostración.
2. **G3** — O las reglas persisten en la sesión, o el aviso deja de decir "Guardado.". Sin esto, la demostración más vistosa de la función 3 —cambia el orden, mira cambiar el pedido— no se puede hacer, porque al llegar a Pedidos el orden ya volvió atrás.
3. **G5** — Pintar el aviso de regla muerta. El dato ya está calculado y ya se enseña dentro del panel de edición; solo hay que sacarlo a la fila. Es una de las dos cosas que hacen que la lista de reglas valga más que una tabla.

**G4** y **G2** pueden esperar a la demostración siguiente si nadie va a crear reglas en vivo ni abrir una ventana privada, pero son dos minas: la primera deja la lista en un estado incoherente con un solo clic, y la segunda convierte cualquier prueba en ventana privada en una pantalla de acceso que no responde y no explica nada.

**G6** y **G7** no son del desarrollador y no bloquean la demostración, pero hay que resolverlos antes de estimar la siguiente tanda: el documento pide una matriz de cinco paqueterías con fichas para tres, y el orden de reglas que propone rompe dos de sus propias demostraciones.

Sobre el segundo criterio, el del dueño del producto: alguien que no sabe de esto **sí** genera una guía manual rápido —la caja, el peso y el precio están a la vista y el botón dice lo que va a pasar y cuánto cuesta— pero **no** entiende rápido la pantalla de reglas. Se encuentra siete filas sin saber cuál gana, una que no gana nunca sin que nada se lo diga, dos cifras en la misma tarjeta que no cuadran, y si crea una regla sin condiciones acaba con dos filas que dicen exactamente lo mismo. Esa pantalla necesita otra vuelta.

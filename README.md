# The Carriers — prototipo de interfaz

La UX del sistema en HTML, CSS y JavaScript planos. **No hay backend, no hay
autenticación y no hay datos reales.** Sirve para ver y discutir cómo se opera el
producto antes de construirlo.

**Vista previa:** https://careonemx.github.io/thecarriers-app/

## Correr en local

Necesita un servidor, porque el JavaScript son módulos ES y `file://` los bloquea:

```bash
python3 -m http.server 4400
```

Abre http://localhost:4400. Cualquier correo y contraseña entran.

## Pantallas

```
index.html                 redirige al acceso
login.html                 entrar
recuperar.html             recuperar contraseña

app/envios.html            la tabla principal, con filtros y métricas
app/envio.html             un envío: historial, destino y costos
app/excepciones.html       lo detenido, ordenado por antigüedad
app/recolecciones.html     recolecciones por día
app/desempeno.html         cumplimiento y volumen por paquetería
app/cobros.html            cotizado contra facturado
app/bienvenida.html        primer ingreso, todavía sin datos
```

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

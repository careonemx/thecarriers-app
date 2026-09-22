/**
 * Vigía: si el módulo de la página no arranca, decirlo.
 *
 * Es un script clásico a propósito, no un módulo. Cuando un `import` falla
 * —porque el navegador sirvió una versión vieja de caché, o porque no hay
 * red— el módulo entero ni siquiera se ejecuta, así que ningún manejador
 * suyo puede avisar. Este script sí corre.
 *
 * Detecta el fallo por dos caminos, en este orden:
 *
 *   1. El error de enlace del módulo, que llega a window. Es inmediato y
 *      exacto: si no hubo error, no hay alerta.
 *   2. Un respaldo por tiempo, SOLO en las pantallas de la aplicación, que
 *      son las que montan armazón. La guía de diseño y el índice no montan
 *      nada, así que quedan fuera: si no se distinguiera, mostrarían una
 *      alerta falsa cada vez que cargan bien.
 *
 * Una pantalla muda hace creer que el producto está roto. Una que explica
 * qué pasó y ofrece recargar, no.
 */
(function () {
  "use strict";
  var mostrado = false;

  function cargo() {
    return !!(document.querySelector(".armazon") || document.querySelector(".guia"));
  }

  function mostrar() {
    if (mostrado || !document.body) return;
    mostrado = true;

    var aviso = document.createElement("div");
    aviso.setAttribute("role", "alert");
    aviso.style.cssText =
      "position:fixed;inset:0;z-index:999;display:grid;place-items:center;" +
      "padding:24px;background:#0b1220;color:#eef2f8;" +
      "font-family:Inter,system-ui,sans-serif;text-align:center";
    aviso.innerHTML =
      '<div style="max-width:42ch">' +
      '<p style="font-size:17px;font-weight:600;margin:0">Esta pantalla no terminó de cargar</p>' +
      '<p style="margin:10px 0 0;color:#9aa6bd;font-size:14px;line-height:1.5">' +
      "Casi siempre es una versión vieja guardada en el navegador. " +
      "Recarga y debería quedar." +
      "</p>" +
      '<button type="button" style="margin-top:20px;padding:9px 16px;border:0;border-radius:10px;' +
      'background:#0f9d6e;color:#0b1220;font:inherit;font-weight:600;cursor:pointer">Recargar</button>' +
      "</div>";
    aviso.querySelector("button").addEventListener("click", function () {
      location.reload();
    });
    document.body.appendChild(aviso);
  }

  // 1. El error real. Un módulo que no enlaza lo reporta aquí.
  addEventListener("error", function (e) {
    if (!e || (!e.message && !e.error)) return; // errores de <img>, no de script
    if (cargo()) return; // ya había montado: es otra cosa, no un fallo de carga
    mostrar();
  });

  // 2. Respaldo por tiempo, solo donde debe haber armazón.
  addEventListener("DOMContentLoaded", function () {
    if (!document.body.hasAttribute("data-seccion")) return;
    setTimeout(function () {
      if (!document.querySelector(".armazon")) mostrar();
    }, 2500);
  });
})();

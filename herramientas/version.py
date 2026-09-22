#!/usr/bin/env python3
"""
Sella los archivos compartidos con una versión derivada de su contenido.

GitHub Pages responde `cache-control: max-age=600`. Sin esto, durante diez
minutos después de cada despliegue un navegador puede combinar el HTML nuevo
con el JavaScript viejo. Si el HTML nuevo importa algo que el JS viejo no
exporta, el módulo entero falla al enlazar y NADA se ejecuta: no se inyecta el
armazón, no se pintan los datos, y queda el esqueleto estático en pantalla.

Se ejecuta antes de cada commit:  python3 herramientas/version.py
"""
import hashlib
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
COMPARTIDOS = ["assets/app.css", "assets/app.js", "assets/datos.js",
               "assets/vigia.js", "assets/codigo.js"]
SELLO = re.compile(r"\?v=[0-9a-f]{8}")


def sin_sello(texto: str) -> str:
    return SELLO.sub("", texto)


def main() -> int:
    presentes = [p for p in COMPARTIDOS if (RAIZ / p).exists()]

    # El hash se calcula sobre el contenido SIN sellar; si no, sellar cambiaría
    # el contenido, que cambiaría el hash, que obligaría a sellar de nuevo.
    h = hashlib.sha256()
    for nombre in presentes:
        h.update(sin_sello((RAIZ / nombre).read_text()).encode())
    version = h.hexdigest()[:8]

    # Solo dentro de href="", src="" y de un especificador de import. Un patrón
    # suelto también sella las menciones en prosa: la guía de diseño llegó a
    # decir "se renderiza con assets/app.css?v=ac87998b", que no es una ruta.
    activo = r"(?:app\.css|app\.js|datos\.js|vigia\.js|codigo\.js)"
    objetivo = re.compile(
        r'((?:href|src)="[^"]*?assets/' + activo + r')(\?v=[0-9a-f]{8})?(")'
    )
    importado = re.compile(
        r'(from\s+"[^"]*?assets/' + activo + r')(\?v=[0-9a-f]{8})?(")'
    )
    interno = re.compile(r'(from\s+"\./datos\.js)(\?v=[0-9a-f]{8})?(")')

    tocados = 0
    for archivo in list(RAIZ.glob("*.html")) + list(RAIZ.glob("app/*.html")) + [RAIZ / "assets/app.js"]:
        antes = archivo.read_text()
        despues = objetivo.sub(rf"\1?v={version}\3", antes)
        despues = importado.sub(rf"\1?v={version}\3", despues)
        if archivo.name == "app.js":
            despues = interno.sub(rf"\1?v={version}\3", despues)
        if despues != antes:
            archivo.write_text(despues)
            tocados += 1

    print(f"versión {version} · {tocados} archivos sellados")
    return 0


if __name__ == "__main__":
    sys.exit(main())

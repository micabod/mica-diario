# El diario de Mica — diario/portfolio 3D

Un portfolio con forma de diario íntimo, renderizado como un **libro 3D** que se
puede orbitar y hojear. Hecho con **Three.js** (CSS3DRenderer): las páginas son
HTML real (texto nítido, fuente propia, stickers) colocadas en un espacio 3D.

Autora: **Micaela Bodner** · futura biotecnóloga.

---

## ▶️ Cómo verlo en tu compu (local)

Al usar módulos de JavaScript, **no alcanza con hacer doble clic** en
`index.html` (el navegador lo bloquea). Necesitás un servidor local. Dos formas
fáciles:

**Opción A — Python** (ya viene en casi todas las compus):
```bash
cd mica-diario
python3 -m http.server 8000
```
Después abrí en el navegador: `http://localhost:8000`

**Opción B — VS Code:** instalá la extensión **Live Server**, abrí la carpeta,
clic derecho en `index.html` → *Open with Live Server*.

Controles: **arrastrá** para girar el libro en 3D, **rueda del mouse** (o
pellizcar en el celu) para acercar/alejar, botones o flechas **← →** para pasar
de página. En "lo que dibujo", **tocá un dibujo** para verlo en grande (con
← → pasás al siguiente y con Esc lo cerrás).

---

## 🌐 Cómo publicarlo gratis (GitHub Pages)

1. Entrá a <https://github.com> y creá un repositorio nuevo, por ejemplo
   `mica-diario` (público).
2. Subí **todo el contenido de esta carpeta** al repo (podés arrastrar los
   archivos en *Add file → Upload files*, o usar git).
3. En el repo: **Settings → Pages**.
4. En *Build and deployment → Source* elegí **Deploy from a branch**, rama
   `main` y carpeta `/ (root)`. Guardá.
5. Esperá ~1 minuto y tu diario va a estar en:
   `https://TU-USUARIO.github.io/mica-diario/`

Ese link lo podés compartir con quien quieras. 💛

Con git desde la terminal sería:
```bash
cd mica-diario
git init
git add .
git commit -m "Mi diario 3D"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mica-diario.git
git push -u origin main
```

---

## ✏️ Cómo editarlo

- **Textos y contenido:** `pages.js` — cada entrada del diario es un bloque
  de HTML fácil de leer. Cambiá lo que quieras.
- **Tus fotos:** reemplazá los archivos de la carpeta (`mica.jpg` es la foto
  de "quién soy").
- **Tus dibujos (página 2):** poné la foto en la carpeta y sumala en
  `pages.js`, adentro de `<div class="art-grid">`, con una línea como esta (el
  tercer texto es el epígrafe de la polaroid y el número es cuánto se inclina):
  ```js
  ${art('ojo_nuevo.jpg', 'dibujo de un ojo', 'mi epígrafe', -2)}
  ```
- **Colores y estilos:** `styles.css`.
- **El 3D (cámara, giro, grosor):** `main.js`.

---

## 📁 Estructura

```
mica-diario/
├── index.html      ← punto de entrada
├── styles.css      ← estilos (papel, páginas, galería, botones)
├── main.js         ← motor 3D (Three.js): libro, giro de hojas, cámara, visor de dibujos
├── pages.js        ← contenido de cada página (editá acá los textos)
├── mimpi.ttf       ← la fuente
├── ojo_*.jpg, pintura.jpg      ← mis dibujos (página 2)
└── mica.jpg, cherub.png, brain.png, heart.png, pretty.png, note.png, ltr_*.png
                    ← foto, stickers, notita y letras recortadas de la tapa
```

Three.js se carga desde un CDN (jsDelivr), así que no hace falta instalar nada.

---

## 📝 Licencias de las fuentes

La fuente **Mimpi** (incluida como `mimpi.ttf`) es **demo / uso
personal**. Para uso comercial o promocional hace falta comprar una licencia al
autor. Para un diario/portfolio personal estás bien; si en algún momento le das
un uso comercial, conseguí la licencia correspondiente.

// Diario 3D — Three.js + CSS3DRenderer
// Páginas HTML reales (texto nítido, fuente propia, stickers) en un espacio 3D
// que se orbita. Se pasan como las de un libro.

import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PAGES } from "./pages.js";

const W = 640, H = 860;        // tamaño de cada hoja
const N = PAGES.length;
const SHEET = 1.8;             // grosor entre hojas apiladas
const LIFT = 70;               // cuánto se levanta la hoja en el medio del giro
const TURN_MS = 850;
const VIEW_DIR = new THREE.Vector3(-70, 120, 1120).normalize(); // vista levemente desde arriba a la izquierda

const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 1, 9000);

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("app").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.maxPolarAngle = Math.PI * 0.54;
controls.minAzimuthAngle = -1.35;   // que no se pueda dar la vuelta entera al libro
controls.maxAzimuthAngle = 1.35;

// sombra bajo el libro
const shadowEl = document.createElement("div");
shadowEl.style.cssText =
  "width:" + (W * 2.1) + "px;height:" + (H * 0.9) + "px;border-radius:50%;pointer-events:none;" +
  "background:radial-gradient(closest-side, rgba(40,25,25,.42), rgba(40,25,25,0) 72%);";
const shadow = new CSS3DObject(shadowEl);
shadow.position.set(W / 2, -H / 2 - 8, 0);
shadow.rotation.x = -Math.PI / 2;
scene.add(shadow);

// Los controles 3D "capturan" el puntero al apretar, y eso hace que el clic
// termine en el contenedor y no en el botón/link/checkbox. Si el clic empieza
// sobre algo clickeable, no lo dejamos llegar a los controles.
const INTERACTIVE = "a, button, input, label, select, textarea, .chip";

const leaves = [];
PAGES.forEach((html) => {
  const pivot = new THREE.Group();
  const el = document.createElement("div");
  el.className = "leaf";
  el.innerHTML =
    '<div class="face front">' + html + "</div>" +
    '<div class="face back"><div class="paperback"></div></div>';
  el.addEventListener("pointerdown", (e) => {
    if (e.target.closest(INTERACTIVE)) e.stopPropagation();
  });
  const obj = new CSS3DObject(el);
  obj.position.set(W / 2, 0, 0);
  pivot.add(obj);
  scene.add(pivot);
  leaves.push({ pivot: pivot, el: el });
});

let current = 0;
let animating = false;

function restZ(i, turned) { return turned ? i * SHEET : (N - 1 - i) * SHEET; }
function restackZ() {
  for (let i = 0; i < N; i++) leaves[i].pivot.position.z = restZ(i, i < current);
}
restackZ();

function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

// gira la hoja i hacia la izquierda (turn=true) o de vuelta a la derecha
function turnLeaf(i, turn, done) {
  const leaf = leaves[i];
  const fromY = leaf.pivot.rotation.y, toY = turn ? -Math.PI : 0;
  const fromZ = leaf.pivot.position.z, toZ = restZ(i, turn);
  const t0 = performance.now();
  function step(now) {
    const t = Math.min(1, (now - t0) / TURN_MS);
    const e = easeInOut(t);
    leaf.pivot.rotation.y = fromY + (toY - fromY) * e;
    // se levanta en arco (sin saltos al empezar ni al terminar)
    leaf.pivot.position.z = fromZ + (toZ - fromZ) * e + LIFT * Math.sin(Math.PI * e);
    if (t < 1) requestAnimationFrame(step); else if (done) done();
  }
  requestAnimationFrame(step);
}

/* ===== Cámara: que el libro siempre entre en pantalla ===== */

const ui = document.getElementById("ui");
const hint = document.getElementById("hint");

// distancia y centro de cámara para encuadrar una hoja sola o el libro abierto
function framing(spread) {
  const vw = window.innerWidth, vh = window.innerHeight;
  const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const top = vh < 520 ? 10 : 22;
  const bottom = vh - ui.getBoundingClientRect().top + (hint.offsetHeight ? hint.offsetHeight + 18 : 10);
  const side = vw < 600 ? 10 : 30;
  const availH = Math.max(160, vh - top - bottom);
  const availW = Math.max(160, vw - 2 * side);
  const dH = (H * 1.05 * vh / availH) / (2 * tan);
  const dW = ((spread ? 2 * W : W) * 1.04 * vw / availW) / (2 * tan * camera.aspect);
  const d = Math.max(dH, dW);
  // corremos el centro para que la hoja quede en el espacio libre de arriba de los botones
  const worldPerPx = (2 * d * tan) / vh;
  const shiftPx = vh / 2 - (top + (vh - bottom)) / 2;
  return { x: spread ? 0 : W / 2, y: -shiftPx * worldPerPx, d: d };
}
function goalView() {
  const single = framing(false);
  if (current === 0) return single;
  const spread = framing(true);
  // si el libro abierto entra sin achicarse demasiado, mostramos las dos hojas
  return spread.d <= single.d * 1.2 ? spread : single;
}

let tween = null;
function setView(tx, ty, d, dir) {
  controls.target.set(tx, ty, 0);
  camera.position.copy(dir).multiplyScalar(d).add(controls.target);
}
function frameView(animated) {
  const g = goalView();
  controls.minDistance = g.d * 0.45;
  controls.maxDistance = g.d * 1.7;
  if (!animated) {
    tween = null;
    setView(g.x, g.y, g.d, VIEW_DIR);
    return;
  }
  const off = camera.position.clone().sub(controls.target);
  tween = {
    t0: performance.now(), dur: 950,
    from: { x: controls.target.x, y: controls.target.y, d: off.length(), dir: off.normalize() },
    to: g,
  };
}
function stepTween(now) {
  if (!tween) return;
  const t = Math.min(1, (now - tween.t0) / tween.dur);
  const e = easeInOut(t), f = tween.from, g = tween.to;
  const dir = f.dir.clone().lerp(VIEW_DIR, e).normalize();
  setView(f.x + (g.x - f.x) * e, f.y + (g.y - f.y) * e, f.d + (g.d - f.d) * e, dir);
  if (t >= 1) tween = null;
}
let userMoved = false;
controls.addEventListener("start", () => { tween = null; userMoved = true; }); // si la persona arrastra, manda ella

/* ===== Pasar páginas ===== */

function next() {
  if (animating || lightboxOpen() || current >= N - 1) return;
  animating = true;
  const i = current;
  current++;
  updateUI();
  frameView(true);
  turnLeaf(i, true, () => { animating = false; restackZ(); });
}
function prev() {
  if (animating || lightboxOpen() || current <= 0) return;
  animating = true;
  current--;
  updateUI();
  frameView(true);
  turnLeaf(current, false, () => { animating = false; restackZ(); });
}

function label(i) {
  if (i === 0) return "tapa";
  if (i === N - 1) return "fin";
  return i + " / " + (N - 2);
}
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const counter = document.getElementById("counter");
function updateUI() {
  // solo la hoja visible recibe clics: Chrome a veces "le pega" a elementos de
  // hojas de abajo (con 1.8px de diferencia) y se activaban links invisibles
  // (inline, porque CSS3DObject ya le pone pointer-events:auto inline a cada hoja)
  leaves.forEach((l, i) => { l.el.style.pointerEvents = i === current ? "auto" : "none"; });
  btnPrev.disabled = current === 0;
  btnNext.disabled = current === N - 1;
  counter.textContent = label(current);
  if (current > 0) hint.classList.add("faded");
}
btnPrev.addEventListener("click", prev);
btnNext.addEventListener("click", next);
window.addEventListener("keydown", (e) => {
  if (lightboxOpen()) {
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") showInLightbox(lbIndex + 1);
    else if (e.key === "ArrowLeft") showInLightbox(lbIndex - 1);
    return;
  }
  if (e.key === "ArrowRight") next();
  else if (e.key === "ArrowLeft") prev();
});
hint.textContent = isTouch
  ? "arrastrá para girar el libro · tocá “pasar” para seguir leyendo"
  : "arrastrá para girar el libro en 3D · flechas ← → para pasar página";
updateUI();

/* ===== Fichas de "lo que me interesa" ===== */

document.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  const group = chip.closest(".js-chips");
  const page = chip.closest(".diarypage");
  if (group) group.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
  chip.setAttribute("aria-pressed", "true");
  if (page) {
    const sel = page.querySelector(".js-sel");
    if (sel && chip.dataset.sel) sel.textContent = chip.dataset.sel;
    const blurb = page.querySelector(".js-blurb");
    if (blurb && chip.dataset.blurb) blurb.textContent = chip.dataset.blurb;
  }
});

/* ===== Ver un dibujo en grande ===== */
// Un toque/clic sin arrastrar sobre un dibujo lo abre; si arrastrás, gira el libro.

const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
const lbCap = lb.querySelector("figcaption");
let lbItems = [], lbIndex = 0;

function lightboxOpen() { return !lb.hidden; }
function showInLightbox(i) {
  if (!lbItems.length) return;
  lbIndex = (i + lbItems.length) % lbItems.length;
  const it = lbItems[lbIndex];
  lbImg.src = it.dataset.zoom;
  lbImg.alt = it.querySelector("img").alt;
  lbCap.textContent = it.querySelector("figcaption")?.textContent || "";
  lb.classList.toggle("single", lbItems.length < 2);
}
function openLightbox(item) {
  lbItems = [...item.closest(".diarypage").querySelectorAll("[data-zoom]")];
  showInLightbox(lbItems.indexOf(item));
  lb.hidden = false;
  lb.querySelector(".lb-close").focus({ preventScroll: true });
}
function closeLightbox() { lb.hidden = true; lbImg.removeAttribute("src"); }

lb.addEventListener("click", (e) => {
  if (e.target.closest(".lb-prev")) showInLightbox(lbIndex - 1);
  else if (e.target.closest(".lb-next")) showInLightbox(lbIndex + 1);
  else if (!e.target.closest("img")) closeLightbox();
});

let press = null;
renderer.domElement.addEventListener("pointerdown", (e) => {
  const item = e.target.closest("[data-zoom]");
  press = item ? { item, id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() } : null;
}, true);
window.addEventListener("pointerup", (e) => {
  if (!press || e.pointerId !== press.id) return;
  const p = press; press = null;
  const moved = Math.hypot(e.clientX - p.x, e.clientY - p.y);
  if (moved < 8 && performance.now() - p.t < 700 && !animating) openLightbox(p.item);
});
window.addEventListener("pointercancel", () => { press = null; });

/* ===== Render ===== */

function animate(now) {
  requestAnimationFrame(animate);
  stepTween(now);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  frameView(false);
});

frameView(false);
requestAnimationFrame(animate);

const loading = document.getElementById("loading");
function hideLoading() {
  if (loading) loading.style.display = "none";
  if (current === 0 && !userMoved) frameView(false); // la fuente ya cargó: re-encuadrar con la UI definitiva
}
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(hideLoading);
  setTimeout(hideLoading, 2500);
} else {
  setTimeout(hideLoading, 800);
}

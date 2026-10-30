// Diario 3D — Three.js + CSS3DRenderer
// Las páginas son HTML real (texto nítido, tu fuente, tus stickers) colocadas
// como objetos en un espacio 3D que podés orbitar. Se pasan como las de un libro.

import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PAGES } from "./pages.js";

const W = 520, H = 680;        // tamaño de cada hoja (px-mundo)
const N = PAGES.length;         // cantidad de hojas (tapa + páginas)
const SHEET = 1.6;              // grosor por hoja
const LIFT = 90;                // cuánto se levanta la hoja al girar

// ---------- Escena ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 1, 6000);
camera.position.set(-280, 260, 1080);

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const app = document.getElementById("app");
app.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 650;
controls.maxDistance = 1900;
controls.maxPolarAngle = Math.PI * 0.52;
controls.target.set(0, 0, 0);

// sombra bajo el libro
const shadowEl = document.createElement("div");
shadowEl.style.cssText =
  "width:" + (W * 2.1) + "px;height:" + (H * 0.9) + "px;border-radius:50%;" +
  "background:radial-gradient(closest-side, rgba(40,25,25,.42), rgba(40,25,25,0) 72%);";
const shadow = new CSS3DObject(shadowEl);
shadow.position.set(0, -H / 2 - 8, 0);
shadow.rotation.x = -Math.PI / 2;
scene.add(shadow);

// ---------- Hojas ----------
const leaves = [];
PAGES.forEach((html, i) => {
  const pivot = new THREE.Group();      // bisagra en el lomo (x = 0)
  const el = document.createElement("div");
  el.className = "leaf";
  el.innerHTML =
    '<div class="face front">' + html + "</div>" +
    '<div class="face back"><div class="paperback"></div></div>';
  const obj = new CSS3DObject(el);
  obj.position.set(W / 2, 0, 0);        // el centro de la hoja queda a W/2 → borde izq en el lomo
  pivot.add(obj);
  scene.add(pivot);
  leaves.push({ pivot: pivot, el: el });
});

let current = 0;                        // hoja visible (0 = tapa)
let animating = false;

function restackZ() {
  for (let i = 0; i < N; i++) {
    const p = leaves[i].pivot;
    if (i < current) p.position.z = i * SHEET;             // pila izquierda (ya dadas vuelta)
    else p.position.z = (N - 1 - i) * SHEET;               // pila derecha (la actual arriba)
  }
}
restackZ();

function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

function turnLeaf(leaf, toY, done) {
  const fromY = leaf.pivot.rotation.y;
  const t0 = performance.now(), dur = 850;
  leaf.pivot.position.z = LIFT;
  function step(now) {
    let t = (now - t0) / dur; if (t > 1) t = 1;
    leaf.pivot.rotation.y = fromY + (toY - fromY) * easeInOut(t);
    if (t < 1) requestAnimationFrame(step); else if (done) done();
  }
  requestAnimationFrame(step);
}

function next() {
  if (animating || current >= N - 1) return;
  animating = true;
  const lf = leaves[current];
  current++;
  updateUI();
  turnLeaf(lf, -Math.PI, () => { animating = false; restackZ(); });
}
function prev() {
  if (animating || current <= 0) return;
  animating = true;
  current--;
  const lf = leaves[current];
  updateUI();
  turnLeaf(lf, 0, () => { animating = false; restackZ(); });
}

// ---------- UI ----------
const labels = ["tapa", "1 / 7", "2 / 7", "3 / 7", "4 / 7", "5 / 7", "6 / 7", "fin"];
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const counter = document.getElementById("counter");
function updateUI() {
  btnPrev.disabled = current === 0;
  btnNext.disabled = current === N - 1;
  counter.textContent = labels[current] || "";
}
btnPrev.addEventListener("click", prev);
btnNext.addEventListener("click", next);
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  else if (e.key === "ArrowLeft") prev();
});
updateUI();

// chips interactivos (intereses / humor)
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

// ---------- Loop ----------
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// sacar el cartel de "cargando" cuando la fuente esté lista
const loading = document.getElementById("loading");
function hideLoading() { if (loading) loading.style.display = "none"; }
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(hideLoading);
  setTimeout(hideLoading, 2500);
} else {
  setTimeout(hideLoading, 800);
}

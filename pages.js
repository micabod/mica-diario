// Contenido del diario de Mica. Editá los textos libremente.
// Imágenes en la misma carpeta (cherub.png, mica.jpg, ojo_azul.jpg, brain.png, note.png...).

const heart = (f) => `<svg width="26" height="24" viewBox="0 0 26 24" aria-hidden="true" style="vertical-align:-3px"><path d="M13 22 C 2 13, 4 3, 9 4 C 12 4.5, 13 7, 13 8 C 13 7, 14 4.5, 17 4 C 22 3, 24 13, 13 22 Z" fill="${f||'none'}" stroke="#8A2437" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
const star = (s) => `<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M11 2 L13 8 L19 8.5 L14.5 12.5 L16 19 L11 15 L6 19 L7.5 12.5 L3 8.5 L9 8 Z" fill="none" stroke="${s||'#C07E92'}" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
const aR = `<svg width="42" height="20" viewBox="0 0 42 20" aria-hidden="true" style="vertical-align:middle"><path d="M2 14 C 14 4, 26 6, 38 11" fill="none" stroke="#7E6A66" stroke-width="1.6" stroke-linecap="round"/><path d="M38 11 l-8 -1 M38 11 l-3 -7" fill="none" stroke="#7E6A66" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const aL = `<svg width="42" height="20" viewBox="0 0 42 20" aria-hidden="true" style="vertical-align:middle"><path d="M40 14 C 28 4, 16 6, 4 11" fill="none" stroke="#7E6A66" stroke-width="1.6" stroke-linecap="round"/><path d="M4 11 l8 -1 M4 11 l3 -7" fill="none" stroke="#7E6A66" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const swirl = `<svg width="150" height="26" viewBox="0 0 150 26" aria-hidden="true"><path d="M2 14 C 20 2, 30 24, 48 13 C 64 3, 76 24, 94 13 C 110 3, 124 24, 148 12" fill="none" stroke="#E29AB0" stroke-width="2" stroke-linecap="round"/></svg>`;

// foto de un dibujo tipo polaroid (tocándola se ve en grande).
// pos = qué parte de la foto mostrar en la miniatura (la versión grande se ve entera)
const art = (src, alt, cap, rot, { tall = false, pos = "center", tape = false } = {}) =>
  `<figure class="art${tall ? " tall" : ""}" data-zoom="${src}" style="--r:${rot}deg">` +
  `<img src="${src}" alt="${alt}" style="object-position:${pos}" decoding="async" draggable="false">` +
  `<figcaption>${cap}</figcaption>${tape ? '<div class="tape"></div>' : ""}</figure>`;

// letras recortadas tipo revista
// (comillas simples: van adentro de style="...", con dobles se cortaba el estilo)
const FONTS = ['Georgia, serif', "'Times New Roman', serif", 'Impact, sans-serif', "'Arial Black', sans-serif", "'Courier New', monospace", 'Verdana, sans-serif'];
const ROT = [-4, 3, -2, 5, -3, 2, -5, 4, -3, 2];
function ransom(str, size) {
  let out = "", k = 0;
  for (const ch of str) {
    if (ch === " ") { out += '<span style="display:inline-block;width:.35em"></span>'; continue; }
    if (ch === "'" || ch === "’") { out += `<span style="display:inline-block;font-family:Georgia,serif;font-size:${size}px;margin:0 1px">’</span>`; continue; }
    const f = FONTS[k % FONTS.length], r = ROT[k % ROT.length];
    out += `<span class="cut" style="font-family:${f};font-size:${size}px;transform:rotate(${r}deg)">${ch}</span>`;
    k++;
  }
  return out;
}

// título con letras recortadas reales (archivos ltr_*.png)
const LT = { m:"ltr_m.png", i:"ltr_i.png", c:"ltr_c.png", a:"ltr_a.png", s:"ltr_s.png", d:"ltr_d.png", r:"ltr_r.png", y:"ltr_y.png" };
function cutword(word, h) {
  let out = "", k = 0;
  for (const ch of word) {
    if (ch === " ") { out += '<span style="display:inline-block;width:.3em"></span>'; continue; }
    if (ch === "'" || ch === "’") { out += `<span style="display:inline-block;color:#fff;font-family:Georgia,serif;font-size:${Math.round(h*0.8)}px;margin:0 2px">’</span>`; continue; }
    const src = LT[ch.toLowerCase()];
    const r = ROT[k % ROT.length];
    if (src) out += `<img src="${src}" alt="${ch}" style="height:${h}px;margin:0 2px;transform:rotate(${r}deg);filter:drop-shadow(1px 2px 2px rgba(0,0,0,.25))">`;
    k++;
  }
  return out;
}

export const PAGES = [

// 0 — TAPA (collage realista)
`<div class="cover">
  <div class="edge"></div>
  <img src="cherub.png" alt="angelito" style="position:absolute;top:26px;left:30px;width:96px;transform:rotate(-8deg);filter:drop-shadow(0 6px 9px rgba(0,0,0,.28))">
  <div style="position:absolute;top:34px;right:40px">${star('#FBE9EE')}</div>
  <div style="position:absolute;top:120px;right:70px">${star('#FBE9EE')}</div>
  <div style="margin-bottom:12px">${cutword("Mica's", 60)}</div>
  <div style="margin-bottom:18px">${cutword('diary', 56)}</div>
  <p class="small" style="font-size:26px;margin:0 0 18px">&amp; mi portfolio</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center">
    <span class="plate">FUTURA BIOTECNÓLOGA</span>
    <span class="sticker-chip">just a girl ${heart('#8A2437')}</span>
  </div>
  <p class="small" style="margin-top:20px">Buenos Aires · 2026</p>
</div>`,

// 1 — QUIÉN SOY (foto + flechas a mis gustos)
`<div class="diarypage"><div class="spine"></div>
  <div class="row"><h2 class="bubble">quién soy?</h2><span class="date">entrada n°1</span></div>
  <div class="qs-grid" style="margin-top:44px">
    <div class="qs-list rightcol">
      <div class="qs-item">gilmore girls ${heart('#B23A54')} ${aR}<br><span class="qs-sub">las veía con mi mamá</span></div>
      <div class="qs-item">gossip girl ${aR}</div>
      <div class="qs-item">the office ${aR}</div>
      <div class="qs-item">guns n' roses ${aR}</div>
      <div class="qs-item">olivia rodrigo ${aR}</div>
    </div>
    <div style="position:relative;justify-self:center">
      <div class="photo" style="transform:rotate(2deg)">
        <img src="mica.jpg" alt="Micaela" style="display:block;width:170px;height:214px;object-fit:cover;object-position:center 18%;filter:sepia(.06) saturate(.97)">
        <p style="text-align:center;font-size:24px;margin:5px 0 0">yo ${heart('#B23A54')}</p>
      </div>
      <div class="tape" style="top:-9px;left:50%;transform:translateX(-50%) rotate(-5deg);width:60px;height:19px"></div>
      <div style="position:absolute;top:-16px;left:-14px">${star('#9aa0a6')}</div>
      <div style="position:absolute;bottom:-14px;right:-14px">${star('#9aa0a6')}</div>
    </div>
    <div class="qs-list">
      <div class="qs-item">${aL} danny ocean</div>
      <div class="qs-item">${aL} bruno mars</div>
      <div class="qs-item">${aL} gary moore</div>
      <div class="qs-item">${aL} café (mucho)</div>
      <div class="qs-item">${aL} skincare</div>
    </div>
  </div>
  <div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:34px;align-items:center">
    <span class="tag">team gym</span><span class="tag">papá &amp; hermano = role models</span>
  </div>
  <img src="pretty.png" class="sticker" alt="pretty girls study hard" style="right:34px;bottom:34px;width:270px;transform:rotate(-5deg)">
</div>`,

// 2 — LO QUE DIBUJO (skill artístico)
`<div class="diarypage"><div class="spine"></div>
  <div class="row"><h2 class="title" style="transform:rotate(-1deg)">lo que dibujo</h2><span class="date">entrada n°2</span></div>
  <div class="art-top">
    <div>
      <p class="body">dibujo desde los <span class="accent">11</span>. me obsesionan los <span class="accent">ojos</span> — los copio hasta que salen igual.</p>
      <p class="body">nunca tomé una clase, me salió solo.</p>
      <div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:6px">
        <span class="tag">autodidacta</span><span class="tag">hiperrealismo</span><span class="tag">ojos ${heart('none')}</span>
      </div>
      <p class="sm muted" style="margin-top:14px">tocá un dibujo para verlo en grande</p>
    </div>
    ${art('pintura.jpg', 'pintura de una chica con sombrilla lila entre flores', 'también pinto', 3, { tall: true, tape: true })}
  </div>
  <div class="art-grid">
    ${art('ojo_azul.jpg', 'dibujo de un ojo azul', 'azul', -2.5, { pos: 'center 72%' })}
    ${art('ojo_marron.jpg', 'dibujo de un ojo marrón', 'marrón', 2, { pos: 'center 30%' })}
    ${art('ojo_gris.jpg', 'dibujo de un ojo gris', 'gris', 1.5)}
    ${art('ojo_verde.jpg', 'dibujo de un ojo verde con flores', 'verde con flores', -2)}
  </div>
</div>`,

// 3 — LO QUE ME INTERESA (biotec, piel, neuro)
`<div class="diarypage"><div class="spine"></div>
  <div class="row"><h2 class="title" style="transform:rotate(-1.5deg)">lo que me interesa</h2><span class="date">entrada n°3</span></div>
  <p class="body" style="margin-top:6px">elegí biotecnología porque me deja <span class="accent">crear soluciones</span> a los problemas del cuerpo. si una enfermedad no tiene cura, quiero poder <span class="accent">probar una</span>.</p>
  <div class="grid2" style="grid-template-columns:1fr .9fr;margin-top:26px">
    <div>
      <div class="chips js-chips">
        <button class="chip" aria-pressed="true" data-sel="crear soluciones" data-blurb="usar la biología para resolver problemas reales del cuerpo.">crear soluciones</button>
        <button class="chip" data-sel="vacunas" data-blurb="me fascina la idea de crear vacunas — prevenir antes que curar.">vacunas</button>
        <button class="chip" data-sel="genética" data-blurb="entender y editar el código de la vida para mejorar la salud.">genética</button>
        <button class="chip" data-sel="la piel &amp; skincare" data-blurb="entender cómo funciona la piel por dentro.">la piel &amp; skincare</button>
        <button class="chip" data-sel="neurociencia" data-blurb="cómo funciona el cerebro — de acá nació Neurolearning.">neurociencia</button>
      </div>
      <p class="sm muted" style="margin-top:16px">tocá cada ficha para ver qué me atrae ↑</p>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:14px">
      <div class="note" style="transform:rotate(1deg);width:100%">
        <div class="js-sel" style="font-size:32px;line-height:1;margin-bottom:8px">crear soluciones</div>
        <p class="body js-blurb" style="margin:0;font-size:23px">usar la biología para resolver problemas reales del cuerpo.</p>
      </div>
      <svg width="104" height="216" viewBox="0 0 72 150" aria-hidden="true" style="transform:rotate(-4deg);overflow:visible;margin-top:14px"><g fill="none" stroke="#8A9B74" stroke-width="2.4" stroke-linecap="round"><path d="M24 6 C 62 36, 62 54, 24 84 C -14 114, -14 132, 24 150"/><path d="M48 6 C 10 36, 10 54, 48 84 C 86 114, 86 132, 48 150"/></g><g stroke="#B23A54" stroke-width="2.2" stroke-linecap="round"><line x1="28" y1="20" x2="44" y2="20"/><line x1="20" y1="40" x2="52" y2="40"/><line x1="24" y1="66" x2="48" y2="66"/><line x1="20" y1="92" x2="52" y2="92"/><line x1="28" y1="118" x2="44" y2="118"/></g></svg>
    </div>
  </div>
</div>`,

// 4 — LO QUE CONSTRUÍ (Neurolearning — portfolio)
`<div class="diarypage"><div class="spine"></div>
  <div class="row"><h2 class="title" style="transform:rotate(-1deg)">lo que construí</h2><span class="date">entrada n°4</span></div>
  <p class="green" style="font-size:46px;margin:14px 0 2px">Neurolearning</p>
  <p class="muted sm" style="margin:0 0 14px">app · equipo de 4 · ORT · 2026</p>
  <p class="body">una app de juegos para que chicos neurodivergentes de 5 a 9 años aprendan jugando. palabras + imágenes, con videos que evitan la sobreestimulación.</p>
  <p class="body">la pensamos con psicólogos y con la ONG TGD Padres CABA.</p>
  <p class="body"><span class="muted">mi rol:</span> <span class="accent">backend</span></p>
  <div style="display:flex;gap:9px;flex-wrap:wrap;margin:6px 0 18px">
    <span class="tag">backend</span><span class="tag">dibujo</span><span class="tag">gestión (PMI Tour BA '26)</span>
  </div>
  <a class="linkbtn" href="https://www.iproup.com/startups/60397-estudiantes-argentinas-crearon-una-app-de-aprendizaje-para-ninos-neurodivergentes" target="_blank" rel="noopener">leer la nota →</a>
  <img src="brain.png" class="sticker" alt="cerebro" style="right:30px;bottom:30px;width:250px;transform:rotate(6deg)">
</div>`,

// 5 — MI PORQUÉ (suave)
`<div class="diarypage" style="background-color:#FBEFE2"><div class="spine"></div>
  <div class="row"><h2 class="title" style="transform:rotate(-1deg)">mi porqué</h2><span class="date" style="color:#B88C78">para mí</span></div>
  <p class="green" style="font-size:36px;margin:10px 0 10px;transform:rotate(-1deg)">querido diario,</p>
  <p class="body" style="max-width:22em">me fascina entender el cuerpo — la piel, el cerebro, cómo funciona todo por dentro. por eso elegí <span class="accent">biotecnología</span>.</p>
  <p class="body" style="max-width:22em">una parte de esto también es por mi mamá ${heart('#B23A54')}. la ciencia, para mí, es una forma de cuidar.</p>
  <p style="font-size:30px;margin:14px 0 0;transform:rotate(-1deg)">— Mica</p>
  <img src="heart.png" class="sticker" alt="corazón anatómico" style="left:50%;bottom:118px;width:190px;transform:translateX(-30%) rotate(-6deg)">
  <div style="position:absolute;right:46px;bottom:60px">${swirl}</div>
</div>`,

// 6 — METAS 2026
`<div class="diarypage dots"><div class="spine"></div>
  <div class="row"><h2 style="margin:0">${ransom('metas 2026', 40)}</h2><span class="date">entrada n°6</span></div>
  <div style="margin:8px 0 2px">${swirl}</div>
  <div class="grid2" style="grid-template-columns:1fr 1fr;gap:20px">
    <div>
      <label class="todo"><input type="checkbox"> entrar a <b style="font-weight:400" class="accent">San Andrés</b></label>
      <p class="sm muted" style="margin:-4px 0 8px 30px">me saqué 8 en el parcial — falta el final (dic) ${star('#C07E92')}</p>
      <label class="todo"><input type="checkbox"> que me vaya bien en el colegio</label>
      <label class="todo"><input type="checkbox"> terminar este diario</label>
    </div>
    <div>
      <label class="todo"><input type="checkbox"> viajar a <b style="font-weight:400" class="accent">Israel</b> (¡en dic!)</label>
      <label class="todo"><input type="checkbox"> salud para toda mi familia ${heart('none')}</label>
      <label class="todo"><input type="checkbox"> seguir dibujando</label>
    </div>
  </div>
  <div style="display:flex;justify-content:center;margin-top:40px">
    <img src="note.png" alt="you still have a lot of time to make yourself be what you want" style="width:400px;transform:rotate(3deg);filter:drop-shadow(0 5px 7px rgba(60,40,40,.18))">
  </div>
</div>`,

// 7 — HABLEMOS / FIN
`<div class="diarypage"><div class="spine"></div>
  <div style="text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%">
    <p class="date" style="color:#B88C78;margin:0">última página</p>
    <h2 class="title" style="font-size:54px;margin:8px 0 0">contacto</h2>
    <div style="display:flex;flex-wrap:wrap;gap:11px;justify-content:center;margin-top:22px">
      <a class="linkbtn" style="background:#8A2437;transform:rotate(-1deg)" href="https://www.linkedin.com/in/micabodner" target="_blank" rel="noopener">LinkedIn →</a>
      <a class="linkbtn" style="background:#333;transform:rotate(1deg)" href="https://github.com/micabod" target="_blank" rel="noopener">GitHub →</a>
      <a class="linkbtn" style="background:transparent;color:#4C5A3E;border:1.6px solid #B9A17E" href="mailto:micabodner@gmail.com">mail</a>
    </div>
    <p style="font-size:28px;margin:24px 0 0;transform:rotate(-1deg)">— Mica</p>
  </div>
</div>`

];

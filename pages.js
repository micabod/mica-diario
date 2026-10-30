// Contenido del diario. Cada entrada es el HTML de una página.
// Editá los textos libremente; las imágenes están en assets/img/.

const heart = (fill) => `<svg width="24" height="22" viewBox="0 0 26 24" aria-hidden="true"><path d="M13 22 C 2 13, 4 3, 9 4 C 12 4.5, 13 7, 13 8 C 13 7, 14 4.5, 17 4 C 22 3, 24 13, 13 22 Z" fill="${fill || 'none'}" stroke="#8A2437" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
const star = (stroke) => `<svg width="18" height="18" viewBox="0 0 22 22" aria-hidden="true"><path d="M11 2 L13 8 L19 8.5 L14.5 12.5 L16 19 L11 15 L6 19 L7.5 12.5 L3 8.5 L9 8 Z" fill="none" stroke="${stroke || '#C07E92'}" stroke-width="1.5" stroke-linejoin="round"/></svg>`;

export const PAGES = [

// 0 — TAPA
`<div class="cover">
  <div class="edge"></div><div class="frame"></div>
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;color:#FBE9EE">
    ${star('#FBE9EE')}<span style="font-size:17px;letter-spacing:.1em">make a wish</span>${star('#FBE9EE')}
  </div>
  <h1>Mica's diary</h1>
  <p class="sub">&amp; mi portfolio</p>
  <div style="width:56px;height:2px;background:rgba(252,236,240,.6);margin:18px 0"></div>
  <p class="small">futura biotecnóloga · Buenos Aires</p>
  <p class="small" style="margin-top:6px">pretty girls study hard</p>
  <div class="strap"></div>
  <div class="lock"><svg width="56" height="66" viewBox="0 0 66 78"><path d="M33 30 C 20 12, 2 20, 10 38 C 15 50, 33 60, 33 60 C 33 60, 51 50, 56 38 C 64 20, 46 12, 33 30 Z" fill="#E7C879" stroke="#CBA84E" stroke-width="2"/><circle cx="33" cy="40" r="4" fill="#B8933F"/><rect x="31" y="42" width="4" height="9" rx="1.5" fill="#B8933F"/></svg></div>
  <img src="assets/img/cherub.png" alt="angelito" style="position:absolute;top:12px;left:12px;width:84px;transform:rotate(-8deg);filter:drop-shadow(0 6px 9px rgba(0,0,0,.28))">
</div>`,

// 1 — QUIÉN SOY
`<div class="diarypage"><div class="spine"></div>
  <div class="row"><h2 class="title" style="transform:rotate(-1deg)">hola, soy Mica</h2><span class="date">entrada n°1</span></div>
  <div class="grid2">
    <div>
      <p class="body">querido diario: me interesan <span class="accent">muchísimas</span> cosas, y por eso elegí biotecnología — una carrera tan amplia que puedo seguir todos mis intereses sin soltar ninguno.</p>
      <p class="body">me muevo cómoda entre el código y el laboratorio, y quiero una vida <span class="accent">llena de ciencia</span>.</p>
      <div class="ficha-card" style="transform:rotate(-1deg);margin-top:10px">
        <p class="muted" style="font-size:14px;margin:0 0 5px">ficha de la titular</p>
        <div style="font-size:17px;line-height:1.55">
          <div><span class="muted">nombre →</span> Micaela Bodner</div>
          <div><span class="muted">ciudad →</span> Buenos Aires, AR</div>
          <div><span class="muted">ahora →</span> curso de ingreso (team mates)</div>
          <div><span class="muted">sueño →</span> <span class="accent">investigar el cáncer</span></div>
          <div><span class="muted">lema →</span> pretty girls study hard</div>
        </div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:20px">
      <div style="position:relative;transform:rotate(3deg)">
        <div class="photo"><img src="assets/img/mica.jpg" alt="Micaela" style="display:block;width:150px;height:190px;object-fit:cover;object-position:center 20%;filter:sepia(.07) saturate(.97)"><p style="text-align:center;font-size:19px;margin:3px 0 0">yo :)</p></div>
        <div class="tape" style="top:-8px;left:50%;transform:translateX(-50%) rotate(-5deg);width:56px;height:17px"></div>
      </div>
      <img src="assets/img/pretty.png" alt="pretty girls study hard" style="width:140px;transform:rotate(-4deg);filter:drop-shadow(0 5px 8px rgba(0,0,0,.16))">
    </div>
  </div>
</div>`,

// 2 — OBSESIONES
`<div class="diarypage"><div class="spine"></div>
  <div class="row"><h2 class="title" style="transform:rotate(-1.5deg)">mis obsesiones</h2><span class="date">entrada n°2</span></div>
  <p class="body" style="margin-top:6px">elegí una y leé la notita.</p>
  <div class="grid2" style="grid-template-columns:1fr .9fr">
    <div>
      <div class="chips js-chips" data-group="int">
        <button class="chip" aria-pressed="true" data-sel="oncología" data-blurb="el centro de todo. entender cómo crecen los tumores y cómo podríamos frenarlos.">oncología</button>
        <button class="chip" data-sel="genética" data-blurb="leer el código de la vida: cómo el ADN termina siendo un rasgo o una enfermedad.">genética</button>
        <button class="chip" data-sel="neurociencia" data-blurb="cómo aprende el cerebro. de acá nació Neurolearning.">neurociencia</button>
        <button class="chip" data-sel="inmunología" data-blurb="el sistema de defensa como aliado: lo propio y lo ajeno.">inmunología</button>
        <button class="chip" data-sel="backend" data-blurb="construir el motor detrás de las apps. que la tecnología resuelva problemas reales.">backend</button>
        <button class="chip" data-sel="bioinformática" data-blurb="patrones en montañas de datos biológicos — el puente entre código y laboratorio.">bioinformática</button>
        <button class="chip" data-sel="divulgación" data-blurb="contar la ciencia claro. lo que no se comunica, no llega a quien lo necesita.">divulgación</button>
      </div>
      <div style="display:flex;gap:5px;margin-top:18px;transform:rotate(-1.5deg)">
        ${['53 126.9 I Iodo','27 58.93 Co Cobalto','28 58.69 Ni Niquel','6 12.01 C Carbono'].map(e=>{const[n,m,s,na]=e.split(' ');return `<div style="width:52px;height:60px;border:1.5px solid #8A2437;border-radius:4px;background:#FDF8EC;padding:3px 4px;color:#8A2437;display:flex;flex-direction:column"><div style="font-size:9px;display:flex;justify-content:space-between"><span>${n}</span><span>${m}</span></div><div style="font-size:23px;text-align:center;line-height:1">${s}</div><div style="font-size:10px;text-align:center;margin-top:auto">${na}</div></div>`}).join('')}
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:16px">
      <div class="note" style="transform:rotate(1deg);width:100%">
        <div class="accent" style="font-size:14px;margin-bottom:5px">notita</div>
        <div class="js-sel" style="font-size:26px;line-height:1;margin-bottom:6px">oncología</div>
        <p class="body js-blurb" style="margin:0;font-size:17px">el centro de todo. entender cómo crecen los tumores y cómo podríamos frenarlos.</p>
      </div>
      <img src="assets/img/brain.png" alt="cerebro" style="width:104px;transform:rotate(-5deg);filter:drop-shadow(0 5px 8px rgba(0,0,0,.2))">
    </div>
  </div>
</div>`,

// 3 — MI PORQUÉ
`<div class="diarypage" style="background-color:#FBEFE2"><div class="spine"></div>
  <div class="row"><h2 class="title accent" style="transform:rotate(-1deg)">mi porqué</h2><span class="date" style="color:#B88C78">la entrada importante</span></div>
  <div class="grid2" style="grid-template-columns:1.35fr .65fr">
    <div>
      <p class="green" style="font-size:30px;margin:4px 0 8px;transform:rotate(-1deg)">querido diario,</p>
      <p class="body">entre todo lo que me interesa, hay algo que me mueve de otra manera. quiero investigar el <span class="accent">cáncer</span>.</p>
      <p class="body">es personal. perdí a mi mamá, y esa pérdida le dio una dirección clara a mi curiosidad. quiero dedicar lo que aprenda a entender mejor esta enfermedad y a aportar a la gente que la atraviesa.</p>
      <p class="body green" style="display:flex;align-items:center;gap:7px">la ciencia, para mí, es también una forma de cuidar. ${heart('#B23A54')}</p>
      <p style="font-size:24px;margin:10px 0 0;transform:rotate(-1deg)">con todo mi corazón, Mica</p>
    </div>
    <div style="display:flex;justify-content:center;padding-top:6px">
      <div style="position:relative;transform:rotate(4deg)">
        <img src="assets/img/heart.png" alt="corazón anatómico" style="width:120px;filter:drop-shadow(0 7px 11px rgba(0,0,0,.2))">
        <div class="tape" style="top:6px;left:50%;transform:translateX(-50%) rotate(-6deg);width:44px;height:15px"></div>
      </div>
    </div>
  </div>
</div>`,

// 4 — PROYECTOS
`<div class="diarypage"><div class="spine"></div>
  <div class="row"><h2 class="title" style="transform:rotate(-1deg)">lo que construí</h2><span class="date">entrada n°4</span></div>
  <div class="grid2" style="grid-template-columns:1.3fr .7fr">
    <div>
      <p class="green" style="font-size:36px;margin:6px 0 0">Neurolearning</p>
      <p class="muted" style="font-size:15px;margin:0 0 8px">app · equipo de 4 · ORT · 2026</p>
      <p class="body" style="font-size:17px">una app de juegos para estimular el aprendizaje de chicos neurodivergentes de 5 a 9 años. combina palabras e imágenes para asociar conceptos, con videos que evitan la sobreestimulación.</p>
      <p class="body" style="font-size:17px">la pensamos con psicólogos y con la ONG TGD Padres CABA.</p>
      <p class="body" style="font-size:17px"><span class="muted">mi rol →</span> <span class="accent">backend</span></p>
      <a class="linkbtn" href="https://www.iproup.com/startups/60397-estudiantes-argentinas-crearon-una-app-de-aprendizaje-para-ninos-neurodivergentes" target="_blank" rel="noopener">leer la nota →</a>
    </div>
    <div style="display:flex;justify-content:center;padding-top:6px">
      <div style="position:relative;background:#2B2B2B;padding:8px 8px 12px;transform:rotate(3deg);box-shadow:0 14px 24px -18px rgba(0,0,0,.6)">
        <div style="display:flex;flex-direction:column;gap:4px">
          ${['pegá foto','del proyecto','o del equipo'].map(t=>`<div style="width:96px;height:68px;background:repeating-linear-gradient(45deg,#3a3a3a 0 8px,#333 8px 16px);display:flex;align-items:center;justify-content:center"><span style="color:#B7B7B7;font-size:14px">${t}</span></div>`).join('')}
        </div>
        <div class="tape" style="top:-8px;left:50%;transform:translateX(-50%) rotate(3deg);width:46px;height:15px"></div>
      </div>
    </div>
  </div>
</div>`,

// 5 — MI VIDA
`<div class="diarypage"><div class="spine"></div>
  <div class="row"><h2 class="title" style="transform:rotate(-1deg)">cosas que me llenan</h2><span class="date">entrada n°5</span></div>
  <div class="grid2" style="grid-template-columns:1fr 1fr">
    <div>
      <p class="body" style="margin-bottom:5px">mi humor de hoy →</p>
      <div class="chips js-chips" data-group="mood">
        <button class="chip" aria-pressed="true" data-sel="curiosa" data-blurb="hoy: con ganas de entender cómo funciona absolutamente todo.">curiosa</button>
        <button class="chip" data-sel="motivada" data-blurb="hoy: lista para comerme el mundo (y el temario).">motivada</button>
        <button class="chip" data-sel="soñadora" data-blurb="hoy: pensando en el laboratorio donde algún día voy a estar.">soñadora</button>
      </div>
      <p class="body green js-blurb" style="margin:9px 0 0">hoy: con ganas de entender cómo funciona absolutamente todo.</p>
      <p class="body" style="margin:18px 0 5px">lo que hago para llenar mi taza →</p>
      <div style="display:flex;flex-wrap:wrap;gap:7px">
        <span style="background:#E7B3C2;color:#5A2733;padding:5px 12px;border-radius:14px;font-size:17px;transform:rotate(-2deg);display:inline-block">gym</span>
        <span style="background:#C9D3AE;color:#41492C;padding:5px 12px;border-radius:14px;font-size:17px;transform:rotate(1deg);display:inline-block">entrenar</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:14px">
      <img src="assets/img/note.jpg" alt="you still have a lot of time" style="width:180px;transform:rotate(3deg);filter:drop-shadow(0 5px 9px rgba(0,0,0,.14))">
      <div class="note" style="transform:rotate(-1deg);width:100%">
        <p class="accent" style="font-size:26px;margin:0 0 5px;display:flex;align-items:center;gap:7px">plan 2026 ${star('#E7C879')}</p>
        <label class="todo"><input type="checkbox" checked> <span class="strike">participar del PMI Tour BA</span></label>
        <label class="todo"><input type="checkbox"> aprobar el curso de ingreso</label>
        <label class="todo"><input type="checkbox"> meterme en un laboratorio</label>
        <label class="todo"><input type="checkbox"> bocetar mi app de salud</label>
      </div>
    </div>
  </div>
</div>`,

// 6 — LOGROS
`<div class="diarypage"><div class="spine"></div>
  <div class="row"><h2 class="title" style="transform:rotate(-1deg);display:flex;align-items:center;gap:9px">logros ${star('#C07E92')}</h2><span class="date">entrada n°6</span></div>
  <div style="display:flex;flex-wrap:wrap;gap:16px;margin-top:20px;align-items:flex-start">
    <div class="ficha-card" style="transform:rotate(-1.5deg);max-width:320px;font-size:18px">
      <span class="accent">PMI Tour Buenos Aires 2026</span><br>participé y me llevé mi certificado<br>
      <span class="muted" style="font-size:16px">gestión de proyectos</span>
    </div>
    <div class="ficha-card" style="transform:rotate(2deg);font-size:17px;color:#9C8C84">[tu próximo logro]</div>
  </div>
  <p class="body" style="margin-top:22px;display:flex;align-items:center;gap:7px">esto recién arranca → vienen muchos más ${heart('none')}</p>
</div>`,

// 7 — FIN
`<div class="diarypage"><div class="spine"></div>
  <div style="text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%">
    <p class="date" style="color:#B88C78;margin:0">última página</p>
    <div style="display:flex;align-items:center;gap:12px;margin-top:2px">
      <p class="accent" style="font-size:84px;line-height:.9;margin:0">fin</p>
      <svg width="48" height="44" viewBox="0 0 26 24"><path d="M13 22 C 2 13, 4 3, 9 4 C 12 4.5, 13 7, 13 8 C 13 7, 14 4.5, 17 4 C 22 3, 24 13, 13 22 Z" fill="#B23A54" stroke="#8A2437" stroke-width="1" stroke-linejoin="round"/></svg>
    </div>
    <p class="body green" style="margin:10px auto 0;max-width:20em">…pero esto recién empieza. si algo de todo esto te resonó, escribime.</p>
    <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:18px">
      <a class="linkbtn" style="background:#8A2437;transform:rotate(-1deg)" href="https://www.linkedin.com/in/micabodner" target="_blank" rel="noopener">LinkedIn · /micabodner →</a>
      <a class="linkbtn" style="background:transparent;color:#4C5A3E;border:1.5px solid #B9A17E;transform:rotate(1deg)" href="mailto:micabodner@gmail.com">micabodner@gmail.com</a>
    </div>
    <p style="font-size:26px;margin:20px 0 0;transform:rotate(-1deg)">con cariño, Mica</p>
  </div>
</div>`

];

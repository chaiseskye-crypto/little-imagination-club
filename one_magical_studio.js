/* Little Imagination Club — One Magical Art Studio 3.6 (gentle press-and-hold piece options), unified child-friendly touch editor
 * Use instead of magic_workstation_v2.js: <script src="one_magical_studio.js"></script>
 * Editable projects autosave in this browser using IndexedDB. Manual PNG and project backups available.
 */
(() => {
  if (document.getElementById('lic-easy-art')) return;
  const host = document.querySelector('#create .creator-fields') ||
               document.querySelector('#create') || document.querySelector('main');
  if (!host) return;
  const previous = document.getElementById('lic-mix-studio') ||
                   document.getElementById('lic-drawing-studio');
  const ui = document.createElement('section');
  ui.id = 'lic-easy-art';
  ui.innerHTML = `
    <header class="easy-banner">
      <span class="easy-eyebrow">✨ A LITTLE MAGIC FOR EVERY ARTIST ✨</span>
      <h3>🦊💜 My ONE Magical Art Studio</h3>
      <p class="easy-intro">One canvas, unlimited imagination! Start anywhere and mix it all together. 🦋🌈</p>
    </header>
    <div class="easy-creations-hub" id="easy-creations-hub">
      <h4>📚 My Creations</h4>
      <p class="easy-small">Your pictures and lines save automatically on this device. Return later to keep making them!</p>
      <div class="easy-row">
        <button id="easy-my-creations" type="button">📂 See my creations</button>
        <button id="easy-new-creation" type="button">🌟 New creation</button>
        <button id="easy-backup-project" type="button">⬇️ Backup project</button>
        <label class="easy-backup-label" for="easy-import-project">⬆️ Restore backup</label>
        <input id="easy-import-project" type="file" accept=".json,application/json" hidden>
      </div>
      <p id="easy-autosave-status" role="status" aria-live="polite">⏳ Checking saved creations…</p>
      <div id="easy-creations-library" hidden>
        <div id="easy-creations-list"></div>
        <details id="easy-recently-deleted"><summary>🗑️ Recently Deleted</summary><div id="easy-deleted-list"></div></details>
        <p class="easy-small">Saved here on this device, not in an online account. Back up projects you want to keep. Clearing browser data or switching phones can remove local work.</p>
      </div>
    </div>
    <h4 class="easy-step">💖 1. What would you like to create?</h4>
    <div class="easy-choices" aria-label="Choose how to start">
      <label class="easy-choice easy-file">🖼️<strong>My pictures</strong><small>Upload one or lots</small>
        <input id="easy-files" type="file" accept="image/*" multiple hidden>
      </label>
      <button id="easy-choose-friends" class="easy-choice" type="button">🦊<strong>Club friends</strong><small>Kyle & everyone</small></button>
      <button id="easy-fresh" class="easy-choice" type="button">🎨<strong>Freestyle</strong><small>Blank canvas</small></button>
    </div>
    <p class="easy-mix-message">🧩 Mix it all! Add more pictures, friends, stickers and colours whenever you want.</p>
    <div class="easy-row easy-friends" id="easy-friend-chooser">
      <label class="easy-friend-label">Meet a cute Club friend
      <select id="easy-friend" aria-label="Choose a Club character">
        <option value="0">🦊 Kyle the Fox</option>
        <option value="1">🦄 Unicorn</option>
        <option value="2">🐉 Baby Dragon</option>
        <option value="3">🐰 Bunny</option>
        <option value="4">🐈 Kitten</option>
        <option value="5">🐶 Puppy</option>
        <option value="6">🦌 Deer</option>
        <option value="7">🐧 Penguin</option>
        <option value="8">🐨 Koala</option>
        <option value="9">🐢 Turtle</option>
        <option value="10">🦔 Hedgehog</option>
        <option value="11">🦁 Lion</option>
      </select></label>
      <button id="easy-add-friend" type="button">✨ Add to my picture!</button>
    </div>
    <details class="easy-fun" id="easy-background-options">
      <summary>🏰 Magical backgrounds — choose a world!</summary>
      <div class="easy-gallery" id="easy-scenes"></div>
    </details>
    <details class="easy-fun" id="easy-sticker-options">
      <summary>🎀 68 adorable stickers & accessories</summary>
      <div class="easy-sticker-gallery" id="easy-stickers"></div>
    </details>
    <h4 class="easy-step">🖌️ 2. Tap a magic tool!</h4>
    <div class="easy-tools" role="group" aria-label="Editing tools">
      <button data-easy-tool="move" aria-pressed="true">✋ Grab & Move</button>
      <button data-easy-tool="draw" aria-pressed="false">🖌️ Draw</button>
      <button data-easy-tool="cut" aria-pressed="false">✂️ Box Cut</button>
      <button data-easy-tool="magic" aria-pressed="false">✨ Tap Cut</button>
      <button data-easy-tool="erase" aria-pressed="false">🧽 Erase</button>
      <button data-easy-tool="paint" aria-pressed="false">🌈 Colour part</button>
      <button data-easy-tool="fill" aria-pressed="false">🪣 Fill colour</button>
    </div>
    <p class="easy-help" id="easy-help" aria-live="polite">👆 Tap a picture or line, then drag it wherever you like!</p>
    <div class="easy-row easy-paint">
      <label>🌈 Colour <input id="easy-color" type="color" value="#e970b8"></label>
      <label>🖌️ Brush <input id="easy-brush" type="range" min="4" max="50" value="12"></label>
      <label class="easy-checkbox"><input type="checkbox" id="easy-white" checked> Remove white paper when cutting</label>
    </div>
    <details class="easy-fun"><summary>🌈 More colours (24)</summary>
      <div class="easy-palette" id="easy-palette" aria-label="Choose a colour"></div>
    </details>
    <h4 class="easy-step">🌟 3. Create your masterpiece!</h4>
    <div class="easy-canvas-toolbar" aria-label="Picture controls">
      <button id="easy-grab" type="button">✋ Grab</button>
      <button id="easy-zoom-out" type="button">➖ Zoom</button>
      <strong id="easy-zoom-level" aria-live="polite">100%</strong>
      <button id="easy-zoom-in" type="button">➕ Zoom</button>
      <button id="easy-zoom-reset" type="button">🔎 Fit</button>
    </div>
    <p class="easy-small">For a closer look, zoom in, then slide around the picture. Zoom does not resize the saved artwork.</p>
    <div class="easy-workspace-layout" aria-label="Drawing space and separate bin">
      <div class="easy-canvas-wrap">
        <canvas id="easy-canvas" width="800" height="600" aria-label="Drag or draw on your magical canvas"></canvas>
      </div>
      <div class="easy-bin-rail">
        <div class="easy-trash-target" id="easy-trash-target" hidden aria-hidden="true">
          <span aria-hidden="true">🗑️</span><strong>BIN</strong><small>Drop here</small>
        </div>
      </div>
    </div>
    <p class="easy-small easy-piece-hint">👆 To change a picture or line, press and hold it for a moment. Or tap ✋ Grab, then tap the piece.</p>
    <div class="easy-piece-menu" id="easy-piece-menu" hidden>
      <strong id="easy-piece-name">✨ What would you like to do with this piece?</strong>
      <div class="easy-piece-choices">
        <button id="easy-piece-move" type="button">✋ Move</button>
        <button id="easy-piece-copy" type="button">🧩 Copy</button>
        <button id="easy-piece-show-bin" type="button">🗑️ Show bin</button>
        <button id="easy-piece-delete" type="button">❌ Throw away</button>
        <button id="easy-piece-cancel" type="button">✅ Done</button>
      </div>
    </div>
    <div class="easy-quick-help">
      <button id="easy-delete-selected" type="button" hidden>🧩 Piece options</button>
      <button id="easy-undo-near" type="button">↩️ Oops! Undo</button>
      <button id="easy-save-now" type="button">💾 Save now</button>
    </div>
    <p id="easy-near-save-status" class="easy-near-save-status" role="status" aria-live="polite">⏳ Checking saved creations…</p>
    <div class="easy-cut-confirm" id="easy-cut-confirm" hidden>
      <strong>✂️ Happy with this selection?</strong>
      <button id="easy-cut-done" type="button">✅ Done — cut it</button>
      <button id="easy-cut-cancel" type="button">❌ Cancel</button>
    </div>
    <details class="easy-layer-picker" id="easy-layer-picker" open>
      <summary>🧩 My movable pictures & lines (<span id="easy-layer-count">0</span>)</summary>
      <p class="easy-small">Tap a name to grab it, even when it is behind another picture.</p>
      <div id="easy-layer-list" class="easy-layer-list"></div>
    </details>
    <p id="easy-status" role="status">Ready for your next masterpiece! 💜</p>
    <div class="easy-selected" id="easy-selected" hidden>
      <h4>✨ Change the selected picture or line</h4>
      <p class="easy-small">Grab and drag it, or use the arrow buttons below. Resize, rotate or change its layer.</p>
      <div class="easy-row">
        <button data-easy-act="up">⬆️ Move up</button>
        <button data-easy-act="down">⬇️ Move down</button>
        <button data-easy-act="moveleft">⬅️ Left</button>
        <button data-easy-act="moveright">➡️ Right</button>
      </div>
      <div class="easy-row">
        <button data-easy-act="smaller">➖ Smaller</button>
        <button data-easy-act="bigger">➕ Bigger</button>
        <button data-easy-act="left">↩️ Turn</button>
        <button data-easy-act="right">↪️ Turn</button>
        <button data-easy-act="recolor">🌈 Recolour line</button>
        <button data-easy-act="asbackground">🏡 Fill page</button>
      </div>
      <div class="easy-row">
        <button data-easy-act="copy">🧩 Copy</button>
        <button data-easy-act="front">⬆️ In front</button>
        <button data-easy-act="back">⬇️ Behind</button>
      </div>
    </div>
    <h4 class="easy-step">💝 4. Keep your creation!</h4>
    <div class="easy-row easy-end">
      <button id="easy-undo" type="button">↩️ Undo</button>
      <button id="easy-redo" type="button">↪️ Redo</button>
      <button id="easy-save" type="button">💜 Save my picture</button>
    </div>
    <p class="easy-small">Your original uploads stay unchanged. Each line drawn here is a movable piece. Box Cut selects a rectangle; Tap Cut selects a connected area of similar colour (best on cartoons). Preview cuts before pressing Done. Undo is always there! 💜</p>
  `;
  const style = document.createElement('style');
  style.textContent = `
    #lic-easy-art, #lic-easy-art *{box-sizing:border-box}
    #lic-easy-art{background:linear-gradient(155deg,#fff1fc,#f4edff 38%,#effbfa);
      color:#3e2d62;border:3px solid #e4c4f5;
      border-radius:26px;padding:16px;margin:20px 0;min-width:0;max-width:100%;}
    #lic-easy-art .easy-banner{background:linear-gradient(125deg,#fce4f7,#e6deff,#ddfaf2);
      border-radius:20px;padding:15px 12px;text-align:center;margin:0 0 14px}
    #lic-easy-art .easy-eyebrow{font-size:11px;letter-spacing:.05em;color:#8054ab;font-weight:850}
    #lic-easy-art .easy-step{background:#fff9ff;border-radius:14px;padding:10px 12px}
    #lic-easy-art .easy-creations-hub{background:#fff;border:2px solid #d6b6eb;border-radius:19px;padding:13px;margin:14px 0}
    #lic-easy-art .easy-creations-hub h4{margin:0 0 8px;font-size:1.13rem}
    #lic-easy-art #easy-autosave-status{font-size:13px;font-weight:800;color:#6743a7;margin:9px 0}
    #lic-easy-art #easy-creations-library[hidden]{display:none!important}
    #lic-easy-art #easy-creations-list,#lic-easy-art #easy-deleted-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:9px;margin:10px 0}
    #lic-easy-art .easy-creation-card{border:2px solid #efe1fa;background:#fffafc;border-radius:14px;padding:9px;min-width:0}
    #lic-easy-art .easy-creation-card img{width:100%;aspect-ratio:4/3;object-fit:contain;background:#fff;border-radius:9px;display:block}
    #lic-easy-art .easy-creation-title{font-weight:850;margin:6px 0 3px;overflow-wrap:anywhere}
    #lic-easy-art .easy-creation-meta{font-size:12px;color:#716180}
    #lic-easy-art .easy-creation-actions{display:flex;flex-wrap:wrap;gap:5px;margin-top:9px}
    #lic-easy-art .easy-creation-actions button{font-size:12px;min-height:42px;padding:7px 9px;flex:1 1 67px}
    #lic-easy-art #easy-recently-deleted{border-top:1px solid #ebdaf4;padding-top:11px;margin-top:10px}
    #lic-easy-art #easy-recently-deleted summary{font-weight:800;cursor:pointer}
    #lic-easy-art .easy-backup-label{display:inline-flex;align-items:center;justify-content:center;background:#fff;border:2px solid #dabdf1;border-radius:15px;padding:12px;font-size:14px;font-weight:800;min-height:48px;cursor:pointer}
    #lic-easy-art .easy-choices{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
    #lic-easy-art .easy-choices .easy-choice{display:flex;align-items:center;justify-content:center;
      flex-direction:column;gap:5px;min-height:120px;padding:10px 3px;font-size:27px;
      border-radius:19px;background:white;border:2px solid #ddbff4;cursor:pointer;
      text-align:center;min-width:0}
    #lic-easy-art .easy-choices .easy-choice strong{font-size:clamp(11px,3vw,16px);line-height:1.13}
    #lic-easy-art .easy-choices .easy-choice small{font-size:clamp(9px,2.5vw,12px);
      color:#756083;font-weight:600;line-height:1.1}
    #lic-easy-art .easy-mix-message{background:#fff9d9;color:#624673;
      padding:11px;border-radius:13px;font-size:13px;font-weight:750}
    #lic-easy-art .easy-friend-label{display:flex;flex-direction:column;gap:5px;
      font-size:12px;font-weight:750;max-width:100%;flex:1 1 160px}
    #lic-easy-art .easy-friend-label select{width:100%}
    #lic-easy-art .easy-choice:focus-visible,#lic-easy-art button:focus-visible{
      outline:3px solid #6036b2;outline-offset:2px}
    #lic-easy-art h3{font-size:1.5rem;margin:0 0 4px}
    #lic-easy-art h4{font-size:1rem;margin:15px 0 8px}
    #lic-easy-art p{margin:8px 0 12px}
    #lic-easy-art .easy-intro{color:#7b55a2;font-weight:700}
    #lic-easy-art .easy-row{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:10px 0}
    #lic-easy-art button, #lic-easy-art .easy-button, #lic-easy-art select{
      color:#553781;background:white;border:2px solid #dabdf1;border-radius:15px;
      padding:12px;font:inherit;font-size:14px;font-weight:800;min-height:48px;
      cursor:pointer;max-width:100%;}
    #lic-easy-art .easy-start>*{flex:1 1 125px;text-align:center}
    #lic-easy-art .easy-tools{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
    #lic-easy-art .easy-tools button{padding:13px 6px;font-size:clamp(12px,3.5vw,16px);min-width:0}
    #lic-easy-art .easy-fun{background:#ffffffb8;border:2px solid #eedaf9;border-radius:16px;padding:10px;margin:12px 0}
    #lic-easy-art .easy-fun summary{font-weight:850;color:#604096;cursor:pointer;padding:5px}
    #lic-easy-art .easy-gallery{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:12px}
    #lic-easy-art .easy-scene{display:flex;align-items:center;flex-direction:column;gap:5px;min-width:0;padding:5px;font-size:11px;overflow-wrap:anywhere}
    #lic-easy-art .easy-scene-preview{aspect-ratio:1;width:100%;border-radius:9px;background-image:url('lic_cute_art_sheet.jpg');background-size:400% 500%;background-repeat:no-repeat}
    #lic-easy-art .easy-sticker-gallery{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:5px;margin-top:10px;max-height:235px;overflow-y:auto}
    #lic-easy-art .easy-sticker-gallery button{padding:4px 0;font-size:22px;min-height:41px}
    #lic-easy-art .easy-palette{display:flex;gap:7px;flex-wrap:wrap;margin:8px 0 14px}
    #lic-easy-art .easy-swatch{width:31px;height:31px;min-height:31px;padding:0;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px #b397c7;flex:0 0 31px}
    #lic-easy-art .easy-swatch[aria-pressed=true]{box-shadow:0 0 0 3px #7552bb}
    #lic-easy-art button[aria-pressed="true"]{background:#7753ba;color:white;border-color:#7753ba}
    #lic-easy-art .easy-help{background:#f0ddff;border-radius:14px;padding:12px;font-weight:750;min-height:58px}
    #lic-easy-art .easy-paint label{display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:13px}
    #lic-easy-art .easy-checkbox{width:100%}
    #lic-easy-art input[type="range"]{width:100px;max-width:27vw}
    #lic-easy-art .easy-canvas-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:5px;margin:10px 0}
    #lic-easy-art .easy-canvas-toolbar button{padding:8px;min-height:45px;flex:1 0 64px}
    #lic-easy-art .easy-canvas-toolbar strong{font-size:13px;flex:0 0 45px;text-align:center}
    /* The bin sits in its own rail BESIDE the drawing: it never covers artwork. */
    #lic-easy-art .easy-workspace-layout{display:grid;grid-template-columns:minmax(0,1fr);
      gap:8px;align-items:center;width:100%;min-width:0}
    #lic-easy-art .easy-workspace-layout.easy-bin-open{grid-template-columns:minmax(0,1fr) clamp(68px,20%,142px)}
    #lic-easy-art .easy-canvas-wrap{border:3px solid #d7b6eb;background:white;border-radius:20px;
      overflow:auto;position:relative;max-height:75vh;min-width:0;width:100%}
    #lic-easy-art canvas{display:block;width:100%;max-width:none;height:auto;aspect-ratio:4 / 3;touch-action:none;user-select:none}
    #lic-easy-art .easy-bin-rail{display:flex;justify-content:center;align-items:center;min-width:0;align-self:stretch}
    #lic-easy-art .easy-trash-target[hidden]{display:none!important}
    #lic-easy-art .easy-trash-target{position:relative;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      width:100%;max-width:142px;min-height:118px;
      gap:3px;padding:7px 2px;border:4px dashed #9854c8;border-radius:19px;
      background:#fae4ff;color:#582b89;pointer-events:none;
      text-align:center;font-weight:900;box-shadow:0 3px 15px #4c217044;
      transition:background .12s ease,border-color .12s ease;}
    #lic-easy-art .easy-trash-target span{font-size:clamp(27px,6.5vw,44px);line-height:1.1}
    #lic-easy-art .easy-trash-target strong{font-size:clamp(12px,3vw,17px);line-height:1.1}
    #lic-easy-art .easy-trash-target small{font-size:clamp(9px,2.2vw,12px);line-height:1.1;overflow-wrap:anywhere}
    #lic-easy-art .easy-trash-target.easy-trash-hover{background:#ffe5a9;border-color:#d25c2f;}
    @media (max-width:380px){#lic-easy-art .easy-workspace-layout{gap:5px;grid-template-columns:minmax(0,1fr) 66px}
      #lic-easy-art .easy-trash-target{border-width:3px;border-radius:13px;min-height:99px;padding:4px 1px}}

    #lic-easy-art .easy-quick-help{display:flex;align-items:center;justify-content:space-between;
      flex-wrap:wrap;gap:8px;margin-top:8px;padding:8px 2px;font-weight:850;font-size:13px}
    #lic-easy-art #easy-undo-near{background:#fff3c8;border-color:#c692d4;min-height:48px}
    #lic-easy-art #easy-save-now{background:#dff6e9;border-color:#63ac88;min-height:48px}
    #lic-easy-art .easy-near-save-status{font-size:13px;font-weight:800;color:#6743a7;margin:9px 2px 12px;line-height:1.45}
    #lic-easy-art #easy-delete-selected{background:#f0e5ff;border-color:#aa85d4;min-height:48px}
    #lic-easy-art #easy-delete-selected[hidden]{display:none!important}
    #lic-easy-art .easy-piece-hint{font-size:13px;line-height:1.5;margin:9px 0}
    #lic-easy-art .easy-piece-menu{background:#fffdf9;border:2px solid #ab81d7;
       padding:11px;border-radius:17px;margin:11px 0;box-shadow:0 5px 13px #55337817}
    #lic-easy-art .easy-piece-menu[hidden]{display:none!important}
    #lic-easy-art .easy-piece-menu strong{display:block;margin-bottom:9px;font-size:14px}
    #lic-easy-art .easy-piece-choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
    #lic-easy-art .easy-piece-choices button{min-height:51px;font-size:14px;white-space:normal;padding:7px}
    #lic-easy-art #easy-piece-delete{background:#ffe7e9;border-color:#d65c83}
    #lic-easy-art #easy-piece-cancel{background:#e6f8ef;border-color:#68b593}
    @media(max-width:385px){#lic-easy-art .easy-workspace-layout.easy-bin-open{gap:5px;grid-template-columns:minmax(0,1fr) 66px}}
    #lic-easy-art .easy-cut-confirm{display:flex;flex-wrap:wrap;gap:8px;align-items:center;
      background:#fff7d9;padding:11px;border:2px solid #e5cb79;border-radius:15px;margin:8px 0}
    #lic-easy-art .easy-cut-confirm[hidden]{display:none!important}
    #lic-easy-art .easy-cut-confirm strong{width:100%}
    #lic-easy-art #easy-cut-done{background:#d8f5e6;border-color:#51af86}
    #lic-easy-art .easy-layer-picker{background:#fcf7ff;border:2px solid #ddc9ef;border-radius:14px;padding:10px;margin-top:10px}
    #lic-easy-art .easy-layer-picker summary{font-weight:850;cursor:pointer}
    #lic-easy-art .easy-layer-list{display:flex;flex-direction:column;gap:5px;max-height:195px;overflow:auto}
    #lic-easy-art .easy-layer-list button{width:100%;text-align:left;min-height:43px;padding:7px 12px;font-size:13px}
    #lic-easy-art .easy-layer-list button[aria-pressed=true]{background:#7653b8;color:#fff}
    #lic-easy-art button:disabled{opacity:.48;cursor:default}
    #lic-easy-art #easy-status{color:#643e8b;font-size:13px;min-height:21px}
    #lic-easy-art .easy-selected{background:#f4eaff;border:2px solid #e0cdf7;padding:12px;border-radius:17px}
    #lic-easy-art .easy-selected button{flex:1 1 92px;font-size:12px}
    #lic-easy-art .easy-end button{flex:1 1 90px}
    #lic-easy-art #easy-save{background:#7552bb;color:white;flex:2 1 180px}
    #lic-easy-art .easy-small{font-size:12px;color:#6b587c}
    #lic-easy-art .easy-paint{margin-bottom:12px}
    #lic-drawing-studio, #lic-mix-studio{display:none!important}
    @media(max-width:385px){#lic-easy-art{padding:9px}#lic-easy-art .easy-tools{gap:3px}}
  `;
  document.head.append(style);
  if (previous) previous.before(ui);
  else host.append(ui);
  const $ = id => ui.querySelector('#' + id);
  const canvas = $('easy-canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const W = canvas.width, H = canvas.height;
  const items = [];
  let selected = null, tool = 'move', interaction = null, draft = null, pendingCut = null, zoom = 1;
  let showDropBin=false, pieceMenuOpen=false, holdTimer=null, holdPointer=null;
  const cancelHold=()=>{if(holdTimer!==null)clearTimeout(holdTimer);holdTimer=null;holdPointer=null;};
  let history = [{pieces:[],scene:-1}], step = 0, changed = false;
  const message = s => { $('easy-status').textContent = s; };
  const hints = {
    move:'✋ Drag to move. Hold a picture or line for options — nothing is thrown away automatically!',
    draw:'🖌️ Draw with your finger. Every new line can be moved separately!',
    cut:'✂️ Draw a box, check the dotted preview, then press ✅ Done below.',
    magic:'✨ Tap a coloured area to select it, check the preview, then press ✅ Done.',
    erase:'🧽 Rub on a picture or line to erase parts of it.',
    paint:'🌈 Pick a colour, then paint on the part you want to change (like hair).',
    fill:'🪣 Tap one coloured area of a picture to change that area. Works best on cartoons.'
  };
  let scene = -1;
  let sceneImage = null;
  function cloneItems(a=items) { return a.map(o => ({...o})); }
  function snapshot() { return {pieces: cloneItems(), scene}; }
  function checkpoint() {
    history = history.slice(0, step + 1);
    history.push(snapshot());
    if (history.length > 22) history.shift();
    step = history.length-1;
    changed = true;
    if(!creationLoaded)editsBeforeReady=true;
    controls();
    queueCreationSave();
  }
  function rollback(n) {
    const snap = history[n];
    scene = snap.scene;
    items.splice(0, items.length, ...cloneItems(snap.pieces));
    selected = null;
    interaction = null;
    draft = null; pendingCut = null;
    updateSceneButtons(); controls(); render();
    queueCreationSave();
  }
  function chosen() { return items.find(o => o.id === selected); }
  function controls() {
    ui.querySelectorAll('[data-easy-tool]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.easyTool===tool)));
    $('easy-help').textContent = hints[tool];
    $('easy-selected').hidden = !chosen();
    ui.querySelectorAll('.easy-swatch').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.color === $('easy-color').value)));
    $('easy-undo').disabled = step <= 0;
    $('easy-undo-near').disabled = step <= 0;
    $('easy-redo').disabled = step >= history.length - 1;
    $('easy-white').disabled = tool !== 'cut';
    if(!chosen()) {pieceMenuOpen=false;showDropBin=false;}
    $('easy-delete-selected').hidden = !chosen();
    $('easy-piece-menu').hidden = !(chosen() && pieceMenuOpen);
    if(chosen())$('easy-piece-name').textContent='✨ '+(chosen().name||'This piece')+' — what would you like to do?';
    $('easy-cut-confirm').hidden = !pendingCut;
    $('easy-layer-count').textContent=String(items.length);
    renderLayers();
    const bin=$('easy-trash-target');
    bin.hidden = !(showDropBin && tool==='move' && chosen());
    ui.querySelector('.easy-workspace-layout').classList.toggle('easy-bin-open',!bin.hidden);
    if(bin.hidden) bin.classList.remove('easy-trash-hover');
  }
  function renderLayers(){
    const list=$('easy-layer-list');
    list.replaceChildren();
    if(!items.length){const p=document.createElement('p');p.className='easy-small';p.textContent='Upload a picture or draw a line and it will appear here.';list.append(p);return;}
    for(let k=items.length-1;k>=0;k--){
      const o=items[k],b=document.createElement('button');b.type='button';
      b.textContent=(o.isLine?'🖌️ ':'🖼️ ')+(o.name||'Picture')+' — '+(k+1);
      b.setAttribute('aria-pressed',String(o.id===selected));
      b.addEventListener('click',()=>{cancelHold();selected=o.id;tool='move';pieceMenuOpen=false;showDropBin=false;pendingCut=null;draft=null;controls();render();
        $('easy-canvas').scrollIntoView({block:'center',behavior:'smooth'});
        message('✋ Grab '+o.name+' by dragging inside the dotted outline, or use the arrow buttons below.');});
      list.append(b);
    }
  }
  function updateZoom(old){
    const wrap=ui.querySelector('.easy-canvas-wrap');
    canvas.style.width=(100*zoom)+'%';
    $('easy-zoom-level').textContent=Math.round(zoom*100)+'%';
    wrap.scrollLeft=(wrap.scrollLeft+wrap.clientWidth/2)*(zoom/old)-wrap.clientWidth/2;
    wrap.scrollTop=(wrap.scrollTop+wrap.clientHeight/2)*(zoom/old)-wrap.clientHeight/2;
  }
  $('easy-zoom-in').addEventListener('click',()=>{const old=zoom;zoom=Math.min(3,+(zoom+.5).toFixed(2));if(zoom!==old)updateZoom(old);});
  $('easy-zoom-out').addEventListener('click',()=>{const old=zoom;zoom=Math.max(1,+(zoom-.5).toFixed(2));if(zoom!==old)updateZoom(old);});
  $('easy-zoom-reset').addEventListener('click',()=>{zoom=1;canvas.style.width='100%';$('easy-zoom-level').textContent='100%';ui.querySelector('.easy-canvas-wrap').scrollTo(0,0);});
  $('easy-grab').addEventListener('click',()=>setTool('move'));
  function showPieceMenu(){
    if(!chosen())return;
    tool='move';pieceMenuOpen=true;showDropBin=false;
    controls();render();
    message('✨ Choose what to do. Nothing is deleted until you confirm Throw away.');
    $('easy-piece-menu').scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  $('easy-delete-selected').addEventListener('click',showPieceMenu);
  $('easy-piece-move').addEventListener('click',()=>{
    pieceMenuOpen=false;showDropBin=false;controls();render();
    message('✋ Grab your chosen piece and move it with your finger.');
  });
  $('easy-piece-copy').addEventListener('click',()=>{
    const o=chosen();if(!o)return;
    if(items.length>=45){message('Your page is full. Save and start a fresh page.');return;}
    const n={...o,id:makeId(),x:o.x+30,y:o.y+30};items.push(n);
    selected=n.id;pieceMenuOpen=false;showDropBin=false;
    checkpoint();render();message('🧩 Piece copied! Grab the new copy to move it.');
  });
  $('easy-piece-show-bin').addEventListener('click',()=>{
    showDropBin=true;pieceMenuOpen=false;controls();render();
    message('🗑️ Bin is ready beside the drawing. Drop your piece there, then choose whether to throw it away.');
  });
  function askToDeletePiece(){
    const o=chosen();if(!o)return;
    // A deliberate second action protects children from accidental loss.
    if(!confirm('Throw away '+(o.name||'this piece')+'? You can tap Oops! Undo to bring it back.')){
      showDropBin=false;pieceMenuOpen=false;controls();render();
      message('💜 Kept your piece safe.');return;
    }
    items.splice(items.findIndex(item=>item.id===o.id),1);
    selected=null;pendingCut=null;showDropBin=false;pieceMenuOpen=false;
    checkpoint();render();message('🗑️ Piece removed. Tap ↩️ Oops! Undo if you want it back.');
  }
  $('easy-piece-delete').addEventListener('click',askToDeletePiece);
  $('easy-piece-cancel').addEventListener('click',()=>{
    pieceMenuOpen=false;showDropBin=false;selected=null;controls();render();
    message('✅ All done! Keep making your masterpiece.');
  });
  $('easy-cut-cancel').addEventListener('click',()=>{pendingCut=null;draft=null;controls();render();message('✂️ Cut cancelled. Your picture is unchanged.');});
  $('easy-cut-done').addEventListener('click',()=>finishPendingCut());
  const makeId = () => Math.random().toString(36).slice(2);
  function makeCanvas(w,h){const c=document.createElement('canvas'); c.width=w; c.height=h; return c;}
  function pos(e){ const r=canvas.getBoundingClientRect(); return {
    x:(e.clientX-r.left)*W/r.width,
    y:(e.clientY-r.top)*H/r.height
  }; }
  function overBin(e){
    const bin=$('easy-trash-target');if(bin.hidden)return false;
    const r=bin.getBoundingClientRect();
    return e.clientX>=r.left && e.clientX<=r.right &&
           e.clientY>=r.top && e.clientY<=r.bottom;
  }
  function showBinTarget(e){
    $('easy-trash-target').classList.toggle('easy-trash-hover',!!e && overBin(e));
  }
  function paintItem(o,context) {
    context.save(); context.translate(o.x,o.y); context.rotate(o.rot*Math.PI/180);
    context.drawImage(o.img,-o.w*o.scale/2,-o.h*o.scale/2,o.w*o.scale,o.h*o.scale);
    context.restore();
  }
  function paintBackground(context) {
    context.fillStyle='#fffdfa';context.fillRect(0,0,W,H);
    if(scene >= 0 && sceneImage && sceneImage.complete && sceneImage.naturalWidth) {
      const tw=sceneImage.naturalWidth/4,th=sceneImage.naturalHeight/5;
      const idx=12+scene;
      context.drawImage(sceneImage,(idx%4)*tw,Math.floor(idx/4)*th,tw,th,0,0,W,H);
    }
  }
  function render() {
    paintBackground(ctx);
    items.forEach(o=>paintItem(o,ctx));
    if (draft && tool === 'draw' && draft.length) {
      ctx.save(); ctx.strokeStyle=$('easy-color').value;
      ctx.lineWidth=Number($('easy-brush').value);ctx.lineCap='round';ctx.lineJoin='round';
      ctx.beginPath();draft.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
      if (draft.length === 1) ctx.lineTo(draft[0].x+.2,draft[0].y+.2);
      ctx.stroke();ctx.restore();
    }
    if ((draft && tool==='cut' && draft.length===2) || (pendingCut && pendingCut.kind==='box')) {
      const preview=(draft && tool==='cut' && draft.length===2)?draft:[pendingCut.a,pendingCut.b];
      const a=preview[0],b=preview[1];
      ctx.save();ctx.strokeStyle='#793fb4';ctx.lineWidth=4;ctx.setLineDash([10,8]);
      ctx.strokeRect(a.x,a.y,b.x-a.x,b.y-a.y);ctx.restore();
    }
    if(pendingCut && pendingCut.kind==='magic' && pendingCut.preview){
      ctx.save();ctx.globalAlpha=.6;ctx.drawImage(pendingCut.preview,0,0);ctx.restore();
    }
    const o=chosen();
    if (o && tool==='move') {
      ctx.save();ctx.translate(o.x,o.y);ctx.rotate(o.rot*Math.PI/180);
      ctx.setLineDash([9,7]);ctx.strokeStyle='#9255c6';ctx.lineWidth=3;
      ctx.strokeRect(-o.w*o.scale/2,-o.h*o.scale/2,o.w*o.scale,o.h*o.scale);
      ctx.setLineDash([]);ctx.fillStyle='#fff';ctx.strokeStyle='#793fb4';ctx.lineWidth=3;
      const rw=o.w*o.scale/2,rh=o.h*o.scale/2;
      [[-rw,-rh],[rw,-rh],[-rw,rh],[rw,rh]].forEach(([x,y])=>{ctx.beginPath();ctx.arc(x,y,8,0,Math.PI*2);ctx.fill();ctx.stroke();});
      ctx.restore();
    }
  }
  function local(o,p){
    const dx=p.x-o.x,dy=p.y-o.y,r=o.rot*Math.PI/180;
    return {x:(dx*Math.cos(r)+dy*Math.sin(r))/o.scale+o.w/2,
            y:(-dx*Math.sin(r)+dy*Math.cos(r))/o.scale+o.h/2};
  }
  function inside(o,p,pad=0){const v=local(o,p);return v.x>=-pad && v.x<o.w+pad && v.y>=-pad && v.y<o.h+pad;}
  function hit(p){
    // A selected line can be grabbed anywhere within its dotted outline.
    const sel=chosen(); if(tool==='move' && sel && inside(sel,p,7))return sel;
    for(let i=items.length-1;i>=0;i--){
      const o=items[i],v=local(o,p);
      if(v.x<0||v.x>=o.w||v.y<0||v.y>=o.h) continue;
      const ix=Math.min(o.img.width-1,Math.floor(v.x*o.img.width/o.w));
      const iy=Math.min(o.img.height-1,Math.floor(v.y*o.img.height/o.h));
      const sample = makeCanvas(1,1).getContext('2d');
      sample.drawImage(o.img,-ix,-iy);
      if(sample.getImageData(0,0,1,1).data[3]>20) return o;
      // Allow a forgiving tap near thin lines.
      if(o.isLine){
        const near=makeCanvas(23,23),n=near.getContext('2d');
        n.drawImage(o.img,11-ix,11-iy);
        const a=n.getImageData(0,0,23,23).data;
        for(let k=3;k<a.length;k+=4)if(a[k]>28)return o;
      }
    }
    // Forgiving fallback for transparent images and narrow drawn lines.
    for(let i=items.length-1;i>=0;i--)if(inside(items[i],p,6))return items[i];
    return null;
  }
  function add(img,name) {
    if(items.length>=45) {message('This page is full! Save your picture and start a new one.');return;}
    const s=Math.min(W*.6/img.width,H*.75/img.height,2.5);
    const o={id:makeId(),name,img,w:img.width,h:img.height,
      scale:s,rot:0,x:W/2+((items.length%4)*34-44),y:H/2};
    items.push(o);selected=o.id;tool='move';checkpoint();render();
    message(`${name} added! Touch and drag to move it. 💜`);
  }
  function readImage(url) {return new Promise((resolve,reject)=>{
    const im=new Image(); im.onload=()=>resolve(im);im.onerror=reject;im.src=url;
  });}
  async function addFiles(files) {
    for(const file of Array.from(files).slice(0,10)){
      if(!file.type.startsWith('image/'))continue;
      if(file.size>12*1024*1024){message('Picture too large. Please choose one under 12 MB.');continue;}
      const url=URL.createObjectURL(file);
      try{
        const im=await readImage(url);
        const ratio=Math.min(1,1100/Math.max(im.width,im.height));
        const w=Math.max(1,Math.round(im.width*ratio)),h=Math.max(1,Math.round(im.height*ratio));
        const c=makeCanvas(w,h);c.getContext('2d').drawImage(im,0,0,w,h);
        add(c,file.name);
      }catch(e){message('Could not open that image. Try PNG or JPG.');}
      finally{URL.revokeObjectURL(url);}
    }
  }
  $('easy-files').addEventListener('change',e=>{addFiles(e.target.files);e.target.value='';});
  $('easy-choose-friends').addEventListener('click',()=>{
    const chooser=$('easy-friend-chooser');
    chooser.scrollIntoView({behavior:'smooth',block:'center'});
    $('easy-friend').focus({preventScroll:true});
    message('Pick your favourite friend and tap Add to my picture! 🦊💜');
  });

  // A picture's individual lines or photos remain moveable pieces.
  const swatches=['#e970b8','#f8a4ce','#fe5e83','#f4973d','#f7cc42','#f7ed8d',
    '#8ad26c','#42b981','#82dfea','#459cda','#6968da','#b68cf2',
    '#8b563f','#d6a980','#fde9db','#292536','#ffffff','#b2b2b2',
    '#ff6f61','#c0eeff','#b0a2ff','#5bba73','#fbd5b5','#de4fa5'];
  for(const color of swatches){
    const b=document.createElement('button');b.type='button';b.className='easy-swatch';
    b.dataset.color=color;b.style.backgroundColor=color;b.title=color;b.setAttribute('aria-label','Choose '+color);
    b.addEventListener('click',()=>{$('easy-color').value=color;controls();});
    $('easy-palette').append(b);
  }
  $('easy-color').addEventListener('input',controls);
  const names=['Enchanted forest','Fairy garden','Ocean','Outer space','Dinosaur valley','Snowy wonderland','Sunny farm','Cloud kingdom'];
  const sceneArea=$('easy-scenes');
  const blank=document.createElement('button');blank.type='button';blank.className='easy-scene';
  blank.innerHTML='<span class="easy-scene-preview" style="background-image:none;background-color:white;border:2px solid #eee"></span>Blank page';
  sceneArea.append(blank);
  const sceneBtns=[blank];
  names.forEach((name,i)=>{
    const b=document.createElement('button');b.type='button';b.className='easy-scene';
    const tile=document.createElement('span');tile.className='easy-scene-preview';
    const idx=12+i;tile.style.backgroundPosition=`${(idx%4)*100/3}% ${Math.floor(idx/4)*25}%`;
    b.append(tile,document.createTextNode(name));sceneArea.append(b);sceneBtns.push(b);
  });
  function updateSceneButtons(){sceneBtns.forEach((b,i)=>b.setAttribute('aria-pressed',String(scene===i-1)));}
  sceneBtns.forEach((b,i)=>b.addEventListener('click',()=>{scene=i-1;checkpoint();updateSceneButtons();render();message('Your new background looks magical! 🌈');}));
  sceneImage=new Image();sceneImage.onload=render;sceneImage.src='lic_cute_art_sheet.jpg';
  const stickers=[
    '👑','🎀','🦄','🦊','🐉','🦋','🐛','🐝','🐞','🌸','🌺','🌼','🌷','🌹','🍄',
    '🌈','☀️','🌙','⭐','🌟','✨','💖','💜','❤️','🩷','💎','🎈','🎁','🧸','🪄',
    '🪽','🦇','🐰','🐱','🐶','🐻','🐼','🦕','🐠','🐬','🪸','🐢','🦉','🐥',
    '🍓','🍒','🍉','🍦','🍭','🧁','🎂','🍩','🍪','🚀','🪐','☁️','❄️','⚡','🏰','🏡','🌳','🌻','🎵','🎨','🌿','🦖','🧚','🧜‍♀️'];
  stickers.forEach(symbol=>{
    const b=document.createElement('button');b.type='button';b.textContent=symbol;
    b.setAttribute('aria-label','Add '+symbol+' sticker');
    b.addEventListener('click',()=>{
      const c=makeCanvas(180,180),cx=c.getContext('2d');
      cx.font='130px system-ui,Apple Color Emoji,Segoe UI Emoji,sans-serif';
      cx.textAlign='center';cx.textBaseline='middle';cx.fillText(symbol,90,96);
      add(c,'Sticker '+symbol);message('Sticker added! Drag it anywhere you like. 🎀');
    });
    $('easy-stickers').append(b);
  });
  updateSceneButtons();
  $('easy-add-friend').addEventListener('click',async()=>{
    try{
      const im=await readImage('lic_cute_art_sheet.jpg');
      const i=Number($('easy-friend').value),tw=im.width/4,th=im.height/5;
      const c=makeCanvas(300,300);
      c.getContext('2d').drawImage(im,(i%4)*tw,Math.floor(i/4)*th,tw,th,0,0,300,300);
      add(c,$('easy-friend').selectedOptions[0].text);
    }catch(e){message('Character artwork unavailable. Please check your GitHub art sheet.');}
  });
  function setTool(next) {cancelHold();tool=next;interaction=null;draft=null;pendingCut=null;pieceMenuOpen=false;showDropBin=false;controls();render();
    if((next==='paint'||next==='fill')&&!chosen())message('Tap Move and choose a picture first, then return to this tool.');
    else message(hints[next]);}
  ui.querySelectorAll('[data-easy-tool]').forEach(b=>b.addEventListener('click',()=>setTool(b.dataset.easyTool)));
  function updateImage(o,modifier) {
    const copy=makeCanvas(o.img.width,o.img.height);
    const c=copy.getContext('2d');c.drawImage(o.img,0,0);
    modifier(c,copy);
    const idx=items.findIndex(a=>a.id===o.id);
    if(idx>=0)items[idx]={...o,img:copy};
  }
  function brushColour(o,p,fill=false) {
    const v=local(o,p),sx=o.img.width/o.w,sy=o.img.height/o.h;
    updateImage(o,(c,can)=>{
      const x=v.x*sx,y=v.y*sy;
      if(fill){
        const image=c.getImageData(0,0,can.width,can.height),d=image.data;
        const ix=Math.floor(x),iy=Math.floor(y);
        if(ix<0||ix>=can.width||iy<0||iy>=can.height)return;
        const width=can.width,height=can.height,start=(iy*width+ix)*4;
        const target=[d[start],d[start+1],d[start+2],d[start+3]];
        if(target[3]<20)return;
        const hex=$('easy-color').value, rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
        const seen=new Uint8Array(width*height),stack=[iy*width+ix],tolerance=42;
        let count=0;
        while(stack.length){
          const n=stack.pop();if(n<0||n>=width*height||seen[n])continue;
          seen[n]=1;const off=n*4;
          if(Math.abs(d[off]-target[0])+Math.abs(d[off+1]-target[1])+
             Math.abs(d[off+2]-target[2])>tolerance*3 || Math.abs(d[off+3]-target[3])>60)continue;
          d[off]=rgb[0];d[off+1]=rgb[1];d[off+2]=rgb[2];
          count++;if(count>width*height)break;
          const px=n%width;
          if(px>0)stack.push(n-1);
          if(px<width-1)stack.push(n+1);
          if(n>=width)stack.push(n-width);
          if(n<width*(height-1))stack.push(n+width);
        }
        c.putImageData(image,0,0);
      }else{
        const r=Math.max(3,Number($('easy-brush').value)*sx/(o.scale||1)/2);
        c.save();c.globalCompositeOperation='source-atop';c.fillStyle=$('easy-color').value;
        c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();c.restore();
      }
    });
  }
  function brushErase(o,p) {
    const v=local(o,p),scaleX=o.img.width/o.w,scaleY=o.img.height/o.h;
    const radius=Number($('easy-brush').value)/(o.scale||1)*scaleX/2;
    updateImage(o,(c)=>{c.save();c.globalCompositeOperation='destination-out';
      c.beginPath();c.arc(v.x*scaleX,v.y*scaleY,Math.max(2,radius),0,Math.PI*2);
      c.fill();c.restore();});
  }
  function startHold(e,p,o){
    cancelHold();
    if(!o)return;
    const id=e.pointerId;
    holdPointer={id,x:e.clientX,y:e.clientY,itemId:o.id};
    holdTimer=setTimeout(()=>{
      holdTimer=null;
      if(!holdPointer||holdPointer.id!==id)return;
      const wanted=items.find(item=>item.id===holdPointer.itemId);
      holdPointer=null;
      if(!wanted)return;
      // A press-and-hold selects without drawing a mark or moving any piece.
      if(interaction?.kind==='move'){
        wanted.x=interaction.startX;wanted.y=interaction.startY;
      }
      interaction=null;draft=null;pendingCut=null;
      selected=wanted.id;tool='move';showPieceMenu();
    },650);
  }
  canvas.addEventListener('pointerdown',e=>{
    if(e.button!==undefined && e.button!==0) return;
    e.preventDefault();const p=pos(e);canvas.setPointerCapture(e.pointerId);
    if(tool==='draw'){
      draft=[p];interaction={kind:'draw'};
      // A stationary hold on an existing line shows its options; a stroke draws normally.
      startHold(e,p,hit(p));render();return;
    }
    if(tool==='cut'){pendingCut=null;draft=[p,p];interaction={kind:'cut'};controls();render();return;}
    if(tool==='magic'){prepareMagicCut(p);return;}
    if(tool==='erase' || tool==='paint' || tool==='fill'){
      const hitItem=hit(p) || chosen();
      if(!hitItem){message('First tap Move and select a picture or line.');return;}
      selected=hitItem.id;
      // Separate the image layer before altering pixels; Undo keeps its earlier copy.
      interaction={kind:tool,id:hitItem.id};
      if(tool==='erase')brushErase(items.find(o=>o.id===hitItem.id),p);
      else brushColour(items.find(o=>o.id===hitItem.id),p,tool==='fill');
      if(tool==='fill'){checkpoint();interaction=null;message('Colour changed! Tap Undo if it spread too far.');}
      render();return;
    }
    const o=hit(p);selected=o?.id||null;pieceMenuOpen=false;showDropBin=false;
    controls();render();
    interaction=o?{kind:'move',id:o.id,x:p.x-o.x,y:p.y-o.y,startX:o.x,startY:o.y}:null;
    if(o)startHold(e,p,o);
    if(o){const i=items.findIndex(x=>x.id===o.id);items[i]={...items[i]};}
    if(!o)message('Tap directly on a picture or coloured line to select it.');
  });
  canvas.addEventListener('pointermove',e=>{
    if(holdPointer && holdPointer.id===e.pointerId &&
       Math.hypot(e.clientX-holdPointer.x,e.clientY-holdPointer.y)>12)cancelHold();
    if(!interaction)return;e.preventDefault();const p=pos(e);
    if(interaction.kind==='draw'){draft.push(p);render();return;}
    if(interaction.kind==='cut'){draft[1]=p;render();return;}
    const o=items.find(x=>x.id===interaction.id);if(!o)return;
    if(interaction.kind==='move'){
      o.x=p.x-interaction.x;o.y=p.y-interaction.y;
      showBinTarget(e);render();
    }
    if(interaction.kind==='erase'){brushErase(o,p);render();}
    if(interaction.kind==='paint'){brushColour(o,p);render();}
  });
  function finishDraw(points){
    if(items.length>=45){message('This page is full. Save your picture and start a new page.');return;}
    const pad=30,minX=Math.max(0,Math.min(...points.map(p=>p.x))-pad),
      minY=Math.max(0,Math.min(...points.map(p=>p.y))-pad),
      maxX=Math.min(W,Math.max(...points.map(p=>p.x))+pad),
      maxY=Math.min(H,Math.max(...points.map(p=>p.y))+pad);
    const w=Math.max(2,Math.ceil(maxX-minX)),h=Math.max(2,Math.ceil(maxY-minY));
    const c=makeCanvas(w,h),cx=c.getContext('2d');
    cx.lineCap='round';cx.lineJoin='round';cx.lineWidth=Number($('easy-brush').value);
    cx.strokeStyle=$('easy-color').value;cx.beginPath();
    points.forEach((p,i)=>i?cx.lineTo(p.x-minX,p.y-minY):cx.moveTo(p.x-minX,p.y-minY));
    if(points.length===1)cx.lineTo(points[0].x-minX+.2,points[0].y-minY+.2);
    cx.stroke();
    const o={id:makeId(),name:'My line',img:c,x:minX+w/2,y:minY+h/2,
      w,h,scale:1,rot:0,isLine:true};
    // Drawing stays in Draw mode. The child chooses Grab explicitly when ready.
    items.push(o);selected=null;tool='draw';
    checkpoint();render();message('🖌️ Lovely! Keep drawing. Tap ✋ Grab only when you want to move a line.');
  }
  function cutSelected(a,b){
    if(items.length>=45){message('This page is full. Save and start a fresh page.');return;}
    const x=Math.max(0,Math.floor(Math.min(a.x,b.x))),y=Math.max(0,Math.floor(Math.min(a.y,b.y)));
    const w=Math.min(W-x,Math.ceil(Math.abs(b.x-a.x))),h=Math.min(H-y,Math.ceil(Math.abs(b.y-a.y)));
    if(w<12||h<12){message('Draw a bigger box around the part you want to cut.');return;}
    const center={x:x+w/2,y:y+h/2};
    let original=hit(center);
    if(!original){
      const corners=[{x:x+4,y:y+4},{x:x+w-4,y:y+4},{x:x+4,y:y+h-4}];
      original=corners.map(hit).find(Boolean);
    }
    if(!original){message('Try making your box over a picture or line.');return;}
    const world=makeCanvas(W,H),wc=world.getContext('2d');paintItem(original,wc);
    const piece=makeCanvas(w,h),pc=piece.getContext('2d');
    pc.drawImage(world,x,y,w,h,0,0,w,h);
    if($('easy-white').checked){
      const pixels=pc.getImageData(0,0,w,h);
      for(let i=0;i<pixels.data.length;i+=4){
        const r=pixels.data[i],g=pixels.data[i+1],b=pixels.data[i+2];
        const brightness=Math.min(r,g,b);
        if(brightness>247) pixels.data[i+3]=0;
        else if(brightness>225) pixels.data[i+3]=Math.round(pixels.data[i+3]*(247-brightness)/22);
      }
      pc.putImageData(pixels,0,0);
    }
    // Rasterize source in page coordinates, then remove cut pixels. Original uploaded file remains unchanged.
    wc.clearRect(x,y,w,h);
    const idx=items.findIndex(o=>o.id===original.id);
    items[idx]={...original,img:world,w:W,h:H,scale:1,rot:0,x:W/2,y:H/2};
    const cut={id:makeId(),name:'Cut-out',img:piece,w,h,scale:1,rot:0,x:x+w/2,y:y+h/2};
    items.push(cut);selected=cut.id;tool='move';checkpoint();render();
    message('✂️ Got it! Move the piece wherever you want, or drop it in the bin beside the canvas.');
  }
  function prepareMagicCut(p){
    const original=hit(p);
    if(!original){message('✨ Tap a coloured area of a picture first.');return;}
    const world=makeCanvas(W,H),c=world.getContext('2d');paintItem(original,c);
    const image=c.getImageData(0,0,W,H),data=image.data;
    const x=Math.max(0,Math.min(W-1,Math.floor(p.x))),y=Math.max(0,Math.min(H-1,Math.floor(p.y)));
    const first=(y*W+x)*4;
    if(data[first+3]<20){message('Tap inside a visible coloured part.');return;}
    const target=[data[first],data[first+1],data[first+2],data[first+3]];
    const mask=new Uint8Array(W*H),visited=new Uint8Array(W*H),stack=[y*W+x];
    const preview=makeCanvas(W,H),pc=preview.getContext('2d'),pd=pc.createImageData(W,H);
    let minX=W,minY=H,maxX=-1,maxY=-1,count=0;
    while(stack.length){
      const n=stack.pop();if(n<0||n>=W*H||visited[n])continue;
      visited[n]=1;const at=n*4;
      const delta=Math.abs(data[at]-target[0])+Math.abs(data[at+1]-target[1])+Math.abs(data[at+2]-target[2]);
      if(delta>105 || Math.abs(data[at+3]-target[3])>65 || data[at+3]<20)continue;
      mask[n]=1;pd.data[at]=150;pd.data[at+1]=70;pd.data[at+2]=223;pd.data[at+3]=145;
      const yy=Math.floor(n/W),xx=n%W;
      if(xx<minX)minX=xx;if(xx>maxX)maxX=xx;if(yy<minY)minY=yy;if(yy>maxY)maxY=yy;
      count++;
      if(xx>0)stack.push(n-1);if(xx<W-1)stack.push(n+1);
      if(yy>0)stack.push(n-W);if(yy<H-1)stack.push(n+W);
    }
    if(count<5){message('That area is tiny. Tap another coloured area or try Box Cut.');return;}
    pc.putImageData(pd,0,0);
    pendingCut={kind:'magic',originalId:original.id,mask,minX,minY,maxX,maxY,preview};
    controls();render();message('✨ Purple shows your selection. Press ✅ Done to cut, or Cancel.');
  }
  function finishPendingCut(){
    if(!pendingCut)return;
    const pc=pendingCut;pendingCut=null;
    if(pc.kind==='box')cutSelected(pc.a,pc.b);
    else if(pc.kind==='magic'){
      if(items.length>=45){message('Page is full. Save first.');controls();render();return;}
      const original=items.find(o=>o.id===pc.originalId);
      if(!original){message('That picture has changed. Please select again.');controls();render();return;}
      const world=makeCanvas(W,H),c=world.getContext('2d');paintItem(original,c);
      const image=c.getImageData(0,0,W,H),px=image.data;
      const w=pc.maxX-pc.minX+1,h=pc.maxY-pc.minY+1;
      const part=makeCanvas(w,h),partCtx=part.getContext('2d');
      const partData=partCtx.createImageData(w,h);
      for(let y=pc.minY;y<=pc.maxY;y++)for(let x=pc.minX;x<=pc.maxX;x++){
        const n=y*W+x;if(!pc.mask[n])continue;
        const si=n*4,di=((y-pc.minY)*w+(x-pc.minX))*4;
        for(let k=0;k<4;k++)partData.data[di+k]=px[si+k];
        px[si+3]=0;
      }
      partCtx.putImageData(partData,0,0);
      c.putImageData(image,0,0);
      const index=items.findIndex(o=>o.id===original.id);
      items[index]={...original,img:world,w:W,h:H,scale:1,rot:0,x:W/2,y:H/2};
      const cut={id:makeId(),name:'Tap cut piece',img:part,w,h,scale:1,rot:0,x:pc.minX+w/2,y:pc.minY+h/2};
      items.push(cut);selected=cut.id;tool='move';checkpoint();render();
      message('✨ Cut finished! Grab your new piece or use the arrow buttons below.');
    }
    controls();render();
  }
  canvas.addEventListener('pointerup',e=>{
    cancelHold();
    const i=interaction;interaction=null;if(!i)return;
    if(i.kind==='draw'){const points=draft;draft=null;if(points?.length)finishDraw(points);return;}
    if(i.kind==='cut'){
      const points=draft;draft=null;
      if(points?.length===2 && Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y)>=12){
        pendingCut={kind:'box',a:points[0],b:points[1]};controls();render();
        message('✂️ Check the dotted box. Press ✅ Done to cut, or Cancel to keep the original.');
      }else{render();message('Draw a bigger box. Nothing was cut.');}
      return;
    }
    if(i.kind==='erase'||i.kind==='paint'){
      checkpoint();render();message(i.kind==='paint'?'You changed the colour! 🌈':'Erased! Tap Undo if you want it back.');return;}
    if(i.kind==='move'){
      const o=items.find(item=>item.id===i.id);
      const distance=o?Math.hypot(o.x-i.startX,o.y-i.startY):0;
      // Even a deliberate drag to the bin asks for confirmation: never auto-delete artwork.
      if(o && showDropBin && distance>=18 && overBin(e)){
        o.x=i.startX;o.y=i.startY;
        showDropBin=false;pieceMenuOpen=true;controls();render();
        message('🗑️ Is this the piece you want to throw away? Choose Throw away or Done below.');
        $('easy-piece-menu').scrollIntoView({behavior:'smooth',block:'nearest'});
        return;
      }
      showBinTarget(null);
      if(o){
        // Don't let a lost finger outside the canvas permanently lose the piece.
        const p=pos(e);
        if(p.x<0||p.x>W||p.y<0||p.y>H){o.x=i.startX;o.y=i.startY;}
        if(o.x!==i.startX||o.y!==i.startY)checkpoint();
      }
      render();if(o)message('Nice! Press and hold the piece or tap Piece options to see the bin. 💜');
    }
  });
  canvas.addEventListener('pointercancel',()=>{
    cancelHold();
    if(interaction?.kind==='move'){
      const o=items.find(item=>item.id===interaction.id);
      if(o){o.x=interaction.startX;o.y=interaction.startY;}
    }
    interaction=null;draft=null;showBinTarget(null);render();
  });
  ui.querySelectorAll('[data-easy-act]').forEach(b=>b.addEventListener('click',()=>{
    const o=chosen();if(!o)return;
    const action=b.dataset.easyAct;
    const index=items.findIndex(v=>v.id===o.id);
    if(action==='delete'){items.splice(index,1);selected=null;}
    else if(action==='copy'){const n={...o,id:makeId(),x:o.x+35,y:o.y+35};items.push(n);selected=n.id;}
    else if(action==='front'&&index<items.length-1){items.splice(index+1,0,items.splice(index,1)[0]);}
    else if(action==='back'&&index>0){items.splice(index-1,0,items.splice(index,1)[0]);}
    else if(action==='asbackground'){
      // Use the selected upload as an editable full-bleed backdrop layer.
      const n={...o,x:W/2,y:H/2,scale:Math.max(W/o.w,H/o.h),rot:0};
      items.splice(index,1);items.unshift(n);
    }
    else if(action==='recolor'){
      if(!o.isLine){message('Colour line works on lines you drew. Use Draw or Erase to change photos.');return;}
      updateImage(o,(c,can)=>{
        c.globalCompositeOperation='source-in';c.fillStyle=$('easy-color').value;
        c.fillRect(0,0,can.width,can.height);c.globalCompositeOperation='source-over';
      });
    } else {
      const n={...o};
      if(action==='up')n.y-=25;
      if(action==='down')n.y+=25;
      if(action==='moveleft')n.x-=25;
      if(action==='moveright')n.x+=25;
      if(action==='smaller')n.scale=Math.max(.1,n.scale*.8);
      if(action==='bigger')n.scale=Math.min(8,n.scale*1.25);
      if(action==='left')n.rot-=15;
      if(action==='right')n.rot+=15;
      items[index]=n;
    }
    checkpoint();render();message('Looking cute! 💜 Keep creating.');
  }));
  // ---- My Creations: editable artwork, saved on this device ----
  const CREATIONS_DB='lic_editable_creations_v1';
  const ACTIVE_KEY='lic_active_creation_v1';
  const RECOVERY_KEY='lic_editable_creation_emergency_v1';
  const recoveryImageCache=new WeakMap();
  let editsBeforeReady=false;
  let localRecoveryAvailable=true;
  const imageBlobCache=new WeakMap();
  let creationId=makeId(), creationName='My Masterpiece', creationLoaded=false;
  let creationTimer=null, creationSaveChain=Promise.resolve(), creationRevision=0;
  let lastWrittenCreationRevision=-1;
  let creationDB=null, creationsOpen=false;
  let previewURLs=[];
  const autosaveStatus=s=>{
    $('easy-autosave-status').textContent=s;
    $('easy-near-save-status').textContent=s;
  };
  function openCreationsDB(){return new Promise((resolve,reject)=>{
    if(!('indexedDB' in window)){reject(new Error('No IndexedDB'));return;}
    const req=indexedDB.open(CREATIONS_DB,1);
    req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('projects'))req.result.createObjectStore('projects',{keyPath:'id'});};
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error||new Error('Cannot open storage'));
    req.onblocked=()=>reject(new Error('Storage is busy'));
  });}
  function dbAction(type,mode='readonly',data){return new Promise((resolve,reject)=>{
    if(!creationDB){reject(new Error('Storage unavailable'));return;}
    let result,tx;
    try{
      tx=creationDB.transaction('projects',mode);
      const store=tx.objectStore('projects');
      const req=type==='all'?store.getAll():type==='get'?store.get(data):type==='put'?store.put(data):store.delete(data);
      req.onsuccess=()=>{result=req.result;};
      req.onerror=()=>reject(req.error||new Error('Storage failed'));
      tx.oncomplete=()=>resolve(result);
      tx.onerror=()=>reject(tx.error||new Error('Storage failed'));
      tx.onabort=()=>reject(tx.error||new Error('Storage failed'));
    }catch(e){reject(e);}
  });}
  // A synchronous recovery journal protects rapid refreshes before IndexedDB finishes.
  // It is intentionally best-effort and size-limited; the full editable project
  // remains in IndexedDB when available.
  function emergencyImage(img){
    if(recoveryImageCache.has(img))return recoveryImageCache.get(img);
    const width=img.width||img.naturalWidth,height=img.height||img.naturalHeight;
    if(!width||!height||width*height>4600000)throw new Error('Image too large for quick recovery');
    const c=makeCanvas(width,height);
    c.getContext('2d').drawImage(img,0,0);
    const url=c.toDataURL(width*height>180000?'image/webp':'image/png',.86);
    if(url.length>1900000)throw new Error('Quick recovery exceeds safe storage size');
    recoveryImageCache.set(img,url);
    return url;
  }
  function writeEmergencyDraft(){
    if(!creationLoaded)return false;
    if(!items.length&&scene<0&&!changed)return false;
    try{
      const layers=items.map(o=>({id:o.id,name:o.name||'Picture',w:o.w,h:o.h,
        x:o.x,y:o.y,scale:o.scale,rot:o.rot,isLine:!!o.isLine,img:emergencyImage(o.img)}));
      const state=JSON.stringify({format:'lic-quick-recovery-1',id:creationId,
        name:creationName,scene,updated:Date.now(),layers});
      if(state.length>2400000)throw new Error('Draft exceeds device recovery limit');
      localStorage.setItem(RECOVERY_KEY,state);
      localRecoveryAvailable=true;
      return true;
    }catch(e){
      // Never restore an old journal if we could not encode the latest edit.
      try{localStorage.removeItem(RECOVERY_KEY);}catch(_e){}
      localRecoveryAvailable=false;
      return false;
    }
  }
  function clearEmergencyFor(id){
    try{const raw=localStorage.getItem(RECOVERY_KEY);
      if(raw&&JSON.parse(raw)?.id===id)localStorage.removeItem(RECOVERY_KEY);
    }catch(e){}
  }
  function readEmergencyDraft(activeId){
    try{
      const raw=localStorage.getItem(RECOVERY_KEY);
      if(!raw||raw.length>2500000)return null;
      const record=JSON.parse(raw);
      if(record?.format!=='lic-quick-recovery-1'||record.id!==activeId||
         !Array.isArray(record.layers)||record.layers.length>45)return null;
      if(record.layers.some(o=>typeof o.img!=='string'||!o.img.startsWith('data:image/')||o.img.length>1900000))return null;
      return record;
    }catch(e){return null;}
  }
  async function restoreEmergencyDraft(record){
    const layers=await Promise.all(record.layers.map(async o=>({...o,img:await readImage(o.img)})));
    items.splice(0,items.length,...layers);
    scene=Number.isInteger(record.scene)?record.scene:-1;
    creationId=record.id;creationName=record.name||'My Masterpiece';rememberActive();
    selected=null;tool='move';interaction=null;draft=null;pendingCut=null;
    history=[snapshot()];step=0;changed=true;
    updateSceneButtons();controls();render();
    autosaveStatus('🛟 Recovered your drawing after refresh — saving it safely now…');
  }
  function imageBlob(img){
    if(imageBlobCache.has(img))return imageBlobCache.get(img);
    const pending=new Promise((resolve,reject)=>{
      try{
        const c=makeCanvas(img.width||img.naturalWidth,img.height||img.naturalHeight);
        c.getContext('2d').drawImage(img,0,0);
        c.toBlob(b=>b?resolve(b):reject(new Error('Could not save picture')),'image/png');
      }catch(e){reject(e);}
    });
    imageBlobCache.set(img,pending);
    return pending;
  }
  function previewBlob(){return new Promise((resolve,reject)=>{
    try{
      const c=makeCanvas(240,180),cx=c.getContext('2d');
      cx.scale(240/W,180/H);paintBackground(cx);items.forEach(o=>paintItem(o,cx));
      c.toBlob(b=>b?resolve(b):reject(new Error('Could not save preview')),'image/jpeg',.76);
    }catch(e){reject(e);}
  });}
  function queueCreationSave(){
    if(!creationLoaded)return;
    clearTimeout(creationTimer);
    // Write a compact recovery copy right now, before any timer or async PNG work.
    const journaled=writeEmergencyDraft();
    if(!creationDB){
      autosaveStatus(journaled?'⚠️ Kept a recovery copy on this device; full automatic saving is unavailable.':'⚠️ Saving unavailable — please download your artwork.');
      return;
    }
    autosaveStatus(journaled?'⏳ Saving… quick recovery is ready':'⏳ Saving… please wait for Saved automatically before closing');
    // Never wait 280ms to begin a save after a finished stroke.
    creationTimer=setTimeout(()=>{creationTimer=null;saveCreationNow();},0);
  }
  function saveCreationNow(){
    clearTimeout(creationTimer);creationTimer=null;
    if(!creationLoaded)return Promise.resolve();
    if(!creationDB){writeEmergencyDraft();return Promise.resolve();}
    if(!items.length && scene===-1 && !changed)return creationSaveChain;
    const revision=++creationRevision;
    // Capture layer positions right away; PNG blobs are cached while layers stay unchanged.
    const snapshotPieces=items.map(o=>({id:o.id,name:o.name||'Picture',w:o.w,h:o.h,x:o.x,y:o.y,scale:o.scale,rot:o.rot,isLine:!!o.isLine,img:o.img}));
    const captured={id:creationId,name:creationName,scene,updated:Date.now(),deletedAt:null};
    const thumbnail=previewBlob();
    creationSaveChain=creationSaveChain.catch(()=>{}).then(async()=>{
      const layers=await Promise.all(snapshotPieces.map(async o=>({id:o.id,name:o.name,w:o.w,h:o.h,x:o.x,y:o.y,scale:o.scale,rot:o.rot,isLine:o.isLine,blob:await imageBlob(o.img)})));
      const record={...captured,layers,thumbnail:await thumbnail};
      await dbAction('put','readwrite',record);
      if(revision===creationRevision && creationId===record.id){
        clearEmergencyFor(record.id);
        lastWrittenCreationRevision=revision;
        autosaveStatus('✅ Saved automatically on this device');
        if(creationsOpen)await renderCreationsHub();
      }
    }).catch(e=>{
      console.warn('Local creation save failed',e);
      if(revision===creationRevision)autosaveStatus('⚠️ Not saved — device storage may be full or blocked. Try Backup project or Save my picture.');
    });
    return creationSaveChain;
  }
  function rememberActive(){try{localStorage.setItem(ACTIVE_KEY,creationId);}catch(e){}}
  async function blobToImage(blob){
    const url=URL.createObjectURL(blob);
    try{return await readImage(url);}finally{URL.revokeObjectURL(url);}
  }
  async function openCreation(record,skipSave=false){
    if(!record)return;
    if(!skipSave)await saveCreationNow();
    if(record.id===creationId){record=await dbAction('get','readonly',record.id)||record;}
    creationLoaded=false;
    try{
      const restored=await Promise.all((record.layers||[]).map(async o=>({...o,img:await blobToImage(o.blob)})));
      items.splice(0,items.length,...restored);
      scene=Number.isInteger(record.scene)?record.scene:-1;
      creationId=record.id;creationName=record.name||'My Masterpiece';rememberActive();
      history=[snapshot()];step=0;selected=null;interaction=null;draft=null;pendingCut=null;tool='move';changed=false;
      zoom=1;canvas.style.width='100%';$('easy-zoom-level').textContent='100%';
      updateSceneButtons();controls();render();
      autosaveStatus('✅ Restored '+creationName+' — ready to continue!');
      message('💜 Welcome back! Your pictures, separate lines and positions are ready.');
    }catch(e){console.warn(e);autosaveStatus('⚠️ Could not open this saved picture. Your other creations have not been deleted.');}
    finally{creationLoaded=true;}
  }
  async function freshCreation(){
    await saveCreationNow();
    creationLoaded=false;
    const lastCreation=creationId;
    creationId=makeId();creationName='My Masterpiece';rememberActive();clearEmergencyFor(lastCreation);
    items.length=0;scene=-1;history=[{pieces:[],scene:-1}];step=0;selected=null;
    changed=false;tool='move';pendingCut=null;draft=null;interaction=null;
    zoom=1;canvas.style.width='100%';$('easy-zoom-level').textContent='100%';
    updateSceneButtons();controls();render();creationLoaded=true;
    autosaveStatus('🌟 New page! Your earlier masterpieces remain in My Creations.');
    message('Fresh page! Your old project is safe in My Creations. 🦋');
    if(creationsOpen)renderCreationsHub();
  }
  function makeCreationCard(rec,isDeleted){
    const card=document.createElement('article');card.className='easy-creation-card';
    if(rec.thumbnail instanceof Blob){
      const preview=document.createElement('img');preview.alt='Preview of '+(rec.name||'artwork');
      const url=URL.createObjectURL(rec.thumbnail);previewURLs.push(url);preview.src=url;card.append(preview);
    }
    const title=document.createElement('p');title.className='easy-creation-title';title.textContent='🎨 '+(rec.name||'My Masterpiece');
    const meta=document.createElement('div');meta.className='easy-creation-meta';
    meta.textContent=(rec.deletedAt?'Removed ':'Saved ')+new Date(rec.deletedAt||rec.updated).toLocaleString('en-AU',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'});
    card.append(title,meta);
    const actions=document.createElement('div');actions.className='easy-creation-actions';
    function action(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',async()=>{b.disabled=true;try{await fn();}catch(e){console.warn(e);autosaveStatus('⚠️ Could not change this project.');}finally{b.disabled=false;}});actions.append(b);}
    if(isDeleted){
      action('↩️ Restore',async()=>{rec.deletedAt=null;rec.updated=Date.now();await dbAction('put','readwrite',rec);await renderCreationsHub();});
      action('🗑️ Forever',async()=>{if(!confirm('Permanently delete this creation? This cannot be undone.'))return;await dbAction('delete','readwrite',rec.id);await renderCreationsHub();});
    }else{
      action('✏️ Continue',async()=>{await openCreation(rec);creationsOpen=false;$('easy-creations-library').hidden=true;$('easy-canvas').scrollIntoView({block:'center',behavior:'smooth'});});
      action('✏️ Rename',async()=>{
        if(rec.id===creationId){await saveCreationNow();rec=await dbAction('get','readonly',rec.id)||rec;}
        const name=prompt('Give your masterpiece a name:',rec.name||'My Masterpiece');
        if(!name||!name.trim())return;rec.name=name.trim().slice(0,70);rec.updated=Date.now();
        if(rec.id===creationId)creationName=rec.name;
        await dbAction('put','readwrite',rec);await renderCreationsHub();
      });
      action('🧩 Copy',async()=>{if(rec.id===creationId){await saveCreationNow();rec=await dbAction('get','readonly',rec.id)||rec;}
        const copy={...rec,id:makeId(),name:(rec.name||'My Masterpiece')+' (copy)',updated:Date.now(),deletedAt:null};
        await dbAction('put','readwrite',copy);await renderCreationsHub();
      });
      action('🗑️ Bin',async()=>{
        if(!confirm('Move this masterpiece to Recently Deleted? You can restore it later.'))return;
        if(rec.id===creationId){await saveCreationNow();rec=await dbAction('get','readonly',rec.id)||rec;}
        rec.deletedAt=Date.now();await dbAction('put','readwrite',rec);
        if(rec.id===creationId)await freshCreationAfterDelete();
        await renderCreationsHub();
      });
    }
    card.append(actions);return card;
  }
  async function freshCreationAfterDelete(){
    creationLoaded=false;creationId=makeId();creationName='My Masterpiece';rememberActive();
    items.length=0;scene=-1;history=[{pieces:[],scene:-1}];step=0;selected=null;
    changed=false;tool='move';pendingCut=null;draft=null;interaction=null;
    updateSceneButtons();controls();render();creationLoaded=true;
    autosaveStatus('🗑️ Previous project moved to Recently Deleted.');
  }
  function showStoryCards(holder){
    try{
      const books=JSON.parse(localStorage.getItem('lic_library_v1')||'[]');
      if(!Array.isArray(books)||!books.length)return;
      const h=document.createElement('h4');h.textContent='📖 My saved stories';holder.append(h);
      books.slice().reverse().forEach((book)=>{
        const card=document.createElement('article');card.className='easy-creation-card';
        const title=document.createElement('p');title.className='easy-creation-title';title.textContent='📖 '+(book.title||'My story');
        const p=document.createElement('p');p.className='easy-creation-meta';p.textContent='Saved story — editable in My Little Library';
        const btn=document.createElement('button');btn.type='button';btn.textContent='✏️ Continue story';
        btn.addEventListener('click',()=>{
          // Let the existing book library handle editing, keeping its data intact.
          const cards=[...document.querySelectorAll('#lib-items .lib-item')];
          const ordered=books.slice().reverse();const index=ordered.findIndex(b=>b.id===book.id);
          const edit=cards[index]?.querySelectorAll('button')[1];
          if(edit){edit.click();document.getElementById('club-library')?.scrollIntoView({behavior:'smooth'});}
          else document.getElementById('club-library')?.scrollIntoView({behavior:'smooth'});
        });
        card.append(title,p,btn);holder.append(card);
      });
    }catch(e){console.warn('Saved books preview failed',e);}
  }
  async function renderCreationsHub(){
    if(!creationDB||!creationsOpen)return;
    const all=await dbAction('all');
    all.sort((a,b)=>(b.updated||0)-(a.updated||0));
    previewURLs.forEach(u=>URL.revokeObjectURL(u));previewURLs=[];
    const active=$('easy-creations-list'),deleted=$('easy-deleted-list');active.replaceChildren();deleted.replaceChildren();
    const current=all.filter(o=>!o.deletedAt),discarded=all.filter(o=>!!o.deletedAt);
    if(!current.length){const p=document.createElement('p');p.textContent='Your first masterpiece will appear here automatically as you create it.';active.append(p);}
    current.forEach(o=>active.append(makeCreationCard(o,false)));
    showStoryCards(active);
    if(!discarded.length){const p=document.createElement('p');p.textContent='The bin is empty. 🦊';deleted.append(p);}
    discarded.forEach(o=>deleted.append(makeCreationCard(o,true)));
  }
  $('easy-my-creations').addEventListener('click',async()=>{
    creationsOpen=!creationsOpen;
    $('easy-creations-library').hidden=!creationsOpen;
    if(creationsOpen){await saveCreationNow();await renderCreationsHub();}
  });
  $('easy-new-creation').addEventListener('click',freshCreation);
  async function blobAsDataURL(blob){return new Promise((resolve,reject)=>{
    const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.readAsDataURL(blob);
  });}
  $('easy-backup-project').addEventListener('click',async()=>{
    await saveCreationNow();
    if(!creationDB){autosaveStatus('⚠️ Automatic storage unavailable. Use Save my picture to download a PNG.');return;}
    const record=await dbAction('get','readonly',creationId);
    if(!record){autosaveStatus('Add a picture or line before backing up.');return;}
    try{
      const layers=await Promise.all(record.layers.map(async o=>({...o,blob:await blobAsDataURL(o.blob)})));
      const data={format:'lic-editable-project-v1',name:record.name,scene:record.scene,layers};
      const url=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:'application/json'}));
      const a=document.createElement('a');a.href=url;a.download='my-magical-project-backup.json';document.body.append(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),3000);
      autosaveStatus('⬇️ Editable backup downloaded. Keep it somewhere safe!');
    }catch(e){console.warn(e);autosaveStatus('⚠️ Could not make backup. Try Save my picture instead.');}
  });
  $('easy-import-project').addEventListener('change',async e=>{
    const file=e.target.files?.[0];if(!file)return;
    try{
      if(file.size>65*1024*1024)throw new Error('Backup too big');
      const data=JSON.parse(await file.text());
      if(data?.format!=='lic-editable-project-v1'||!Array.isArray(data.layers)||data.layers.length>45)throw new Error('Invalid backup');
      const layers=await Promise.all(data.layers.map(async o=>{
        if(!o||typeof o.blob!=='string'||!o.blob.startsWith('data:image/png;base64,')||o.blob.length>20*1024*1024)throw new Error('Invalid image');
        const blob=await (await fetch(o.blob)).blob();
        return {id:String(o.id||makeId()),name:String(o.name||'Picture').slice(0,100),blob,
          w:Number(o.w)||100,h:Number(o.h)||100,x:Number(o.x)||400,y:Number(o.y)||300,
          scale:Number(o.scale)||1,rot:Number(o.rot)||0,isLine:!!o.isLine};
      }));
      await saveCreationNow();
      const record={id:makeId(),name:String(data.name||'Restored project').slice(0,70),scene:Number.isInteger(data.scene)?data.scene:-1,layers,updated:Date.now(),deletedAt:null};
      await dbAction('put','readwrite',record);
      await openCreation(record,true);await renderCreationsHub();
      autosaveStatus('✅ Editable project restored into My Creations!');
    }catch(err){console.warn(err);autosaveStatus('⚠️ This backup could not be opened. Please choose an exported project JSON.');}
    finally{e.target.value='';}
  });
  async function initialiseCreations(){
    let lastId='';try{lastId=localStorage.getItem(ACTIVE_KEY)||'';}catch(e){}
    try{
      creationDB=await openCreationsDB();
      const all=(await dbAction('all')).filter(o=>!o.deletedAt).sort((a,b)=>(b.updated||0)-(a.updated||0));
      if(editsBeforeReady){
        // Don't overwrite work the child started while storage was opening.
        creationLoaded=true;rememberActive();queueCreationSave();return;
      }
      const existing=all.find(o=>o.id===lastId)||all[0];
      const emergency=readEmergencyDraft(lastId);
      // A half-finished save can leave the emergency copy newer than IndexedDB.
      if(emergency && (!existing||emergency.id===existing.id&&emergency.updated>(existing.updated||0))){
        creationLoaded=true;
        await restoreEmergencyDraft(emergency);
        queueCreationSave();return;
      }
      if(existing)await openCreation(existing,true);
      else{creationLoaded=true;rememberActive();autosaveStatus('💜 Auto-save is ready. Start creating!');}
    }catch(e){
      console.warn('IndexedDB auto-save not available:',e);
      creationDB=null;creationLoaded=true;
      const emergency=readEmergencyDraft(lastId);
      if(emergency){
        try{await restoreEmergencyDraft(emergency);}catch(err){console.warn('Emergency draft could not be restored:',err);}
      }
      autosaveStatus('⚠️ Full automatic saving is unavailable on this browser. Please download and back up your pictures.');
    }
  }
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden'&&(creationTimer||creationRevision>lastWrittenCreationRevision)){
      writeEmergencyDraft();saveCreationNow();
    }
  });
  window.addEventListener('pagehide',()=>{
    if(creationTimer||creationRevision>lastWrittenCreationRevision){writeEmergencyDraft();saveCreationNow();}
  });
  $('easy-save-now').addEventListener('click',async()=>{
    writeEmergencyDraft();
    await saveCreationNow();
    if(!creationDB)message('Please download the picture: full auto-save is unavailable.');
  });
  // ---- end My Creations ----

  function undo(){if(step>0){rollback(--step);message('↩️ Brought it back! 💜');}}
  $('easy-undo').addEventListener('click',undo);
  $('easy-undo-near').addEventListener('click',undo);
  $('easy-redo').addEventListener('click',()=>{if(step<history.length-1)rollback(++step);});
  $('easy-fresh').addEventListener('click',freshCreation);
  $('easy-save').addEventListener('click',()=>{
    const image=makeCanvas(W,H),out=image.getContext('2d');paintBackground(out);
    items.forEach(o=>paintItem(o,out));
    const a=document.createElement('a');a.download='my-magical-masterpiece.png';
    a.href=image.toDataURL('image/png');a.click();changed=false;
    message('💜 Saved a copy! Your original pictures remain unchanged.');
  });
  controls();render();
  initialiseCreations();
})();

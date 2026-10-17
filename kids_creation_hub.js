/* Little Imagination Club — ONE Magical Workspace v2.0 (2026-10-18)
 * One project, four connected views: story, pictures, mini movie, eBook/print.
 * Local-first: honest about templated story writing and silent WebM export.
 * Existing art editor and prior creations are not altered.
 */
(()=>{'use strict';
  if(document.getElementById('lic-unified-workspace'))return;
  const art=window.LICKingdomAssets||{};
  const DB='lic-unified-projects-v2', OLD='lic-kids-books-v1';
  const friends=[['kyle','King Kyle','🦊'],['bunny','Bouncy Bunny','🐰'],['dragon','Baby Dragon','🐉'],['unicorn','Rainbow Unicorn','🦄'],['chippy','Chippy','🐿️'],['cuddles','Cuddles','🧸'],['peppy','Peppy','🦜'],['bertie','Bertie','🐛'],['scrap','Scrap','🐭'],['chilly','Chilly','🐧'],['dennis','Dennis','🐶'],['messy','Messy Kitty','🐱'],['me','My own hero','⭐']].map(([id,name,emoji])=>({id,name,emoji}));
  const worlds=[['castle','Royal Castle','🏰'],['forest','Enchanted Forest','🌳'],['sea','Under the Sea','🐬'],['space','Outer Space','🚀'],['garden','Rainbow Garden','🌈'],['snow','Snowy Mountains','❄️']].map(([id,name,emoji])=>({id,name,emoji}));
  const adventures=[['key','Golden key','🗝️'],['lost','Lost friend','💜'],['star','Fallen star','⭐'],['party','Surprise party','🎉'],['bridge','Broken bridge','🌉'],['wish','Magical wish','✨']].map(([id,name,emoji])=>({id,name,emoji}));
  const friendBy=Object.fromEntries(friends.map(x=>[x.id,x]));const worldBy=Object.fromEntries(worlds.map(x=>[x.id,x]));
  const $=id=>document.getElementById(id);const body=document.body;
  const hub=document.createElement('div');hub.id='lic-unified-workspace';hub.setAttribute('aria-label','One Magical Workspace');
  const style=document.createElement('style');style.textContent=`
    body.lic-unified-mode>header.topbar,body.lic-unified-mode>main#top,body.lic-unified-mode>footer.footer{display:none!important}
    #lic-unified-workspace[hidden]{display:none!important}
    #lic-unified-workspace, #lic-unified-workspace *{box-sizing:border-box}
    #lic-unified-workspace{background:linear-gradient(135deg,#faf2ff,#fffefa 56%,#e9f9f5);min-height:100dvh;color:#35244e;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;padding-bottom:44px}
    #lic-unified-workspace [hidden]{display:none!important}
    #lic-unified-workspace .u-wrap{width:min(1000px,94%);margin:auto}
    #lic-unified-workspace button,#lic-unified-workspace input,#lic-unified-workspace textarea,#lic-unified-workspace select{font:inherit}
    #lic-unified-workspace button{border:2px solid #d4b9ef;background:#fff;color:#583986;border-radius:15px;min-height:46px;padding:9px 13px;cursor:pointer;font-weight:800;touch-action:manipulation}
    #lic-unified-workspace button:focus-visible,#lic-unified-workspace input:focus-visible,#lic-unified-workspace select:focus-visible,#lic-unified-workspace textarea:focus-visible{outline:3px solid #7b54c3;outline-offset:2px}
    #lic-unified-workspace button:disabled{opacity:.45;cursor:not-allowed}
    #lic-unified-workspace button.primary{background:#7052bb;border-color:#7052bb;color:#fff}
    #lic-unified-workspace button.positive{background:#e0f8ed;border-color:#76b997;color:#285d43}
    #lic-unified-workspace button.warn{background:#fff0f4;border-color:#d5a0b9;color:#8d3154}
    #lic-unified-workspace .u-header{background:#fffdfc;border-bottom:2px solid #eaddf5;position:sticky;top:0;z-index:20}
    #lic-unified-workspace .u-bar{display:flex;align-items:center;justify-content:space-between;gap:6px;padding:8px 0}
    #lic-unified-workspace .u-brand{font-size:clamp(15px,3vw,20px);font-weight:900;line-height:1.2}
    #lic-unified-workspace .u-header button{font-size:14px;padding:7px 9px;min-height:42px}
    #lic-unified-workspace h1{font-size:clamp(28px,6vw,44px);line-height:1.15;margin:10px 0}
    #lic-unified-workspace h2{font-size:clamp(22px,4.5vw,28px);margin:4px 0 12px}
    #lic-unified-workspace h3{font-size:clamp(18px,3.5vw,22px);margin:6px 0 12px}
    #lic-unified-workspace p{line-height:1.5}
    #lic-unified-workspace .u-card{background:#fff;border:2px solid #e2cff4;border-radius:24px;padding:clamp(14px,3vw,24px);margin:14px 0}
    #lic-unified-workspace .u-welcome{max-width:700px;margin:16px auto;text-align:center}
    #lic-unified-workspace .u-welcome img{width:100%;max-height:315px;object-fit:cover;aspect-ratio:1.85;border-radius:20px;background:#ece4f7}
    #lic-unified-workspace .u-action{font-size:clamp(17px,3vw,21px);min-height:58px!important}
    #lic-unified-workspace .u-actions{display:flex;flex-wrap:wrap;gap:9px;margin:14px 0}
    #lic-unified-workspace .u-actions>*{flex:1 1 150px}
    #lic-unified-workspace .u-muted{font-size:13px;color:#685b7b;line-height:1.5}
    #lic-unified-workspace .u-banner{background:#efe6ff;border-radius:13px;padding:9px 13px;font-weight:800;margin:12px 0;font-size:14px}
    #lic-unified-workspace .u-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;background:#f3eafb;padding:5px;border-radius:20px;margin:12px 0;position:sticky;top:61px;z-index:18;box-shadow:0 5px 12px #513d7013}
    #lic-unified-workspace .u-tabs button{padding:8px 2px;min-width:0;font-size:clamp(11px,2.8vw,16px);line-height:1.3;border-color:transparent;background:transparent}
    #lic-unified-workspace .u-tabs button[aria-selected=true]{background:#7052bb;color:white;border-color:#7052bb;box-shadow:0 3px 9px #593c9250}
    #lic-unified-workspace .u-tabs button span{display:block;font-size:clamp(19px,4vw,25px);line-height:1.2}
    #lic-unified-workspace .u-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    #lic-unified-workspace label.u-field{display:flex;flex-direction:column;font-weight:800;gap:6px;font-size:14px;min-width:0}
    #lic-unified-workspace .u-field input,#lic-unified-workspace .u-field select,#lic-unified-workspace .u-field textarea{border:2px solid #d5b8eb;background:#fffdfc;border-radius:13px;padding:11px;width:100%;font-size:16px;color:#362450;min-width:0}
    #lic-unified-workspace .u-field textarea{resize:vertical;min-height:135px;line-height:1.55}
    #lic-unified-workspace .u-pagebar{display:flex;gap:7px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:12px 0}
    #lic-unified-workspace .u-pagebar button{flex:1 1 65px}
    #lic-unified-workspace .u-pagebar strong{flex:1 1 66px;text-align:center}
    #lic-unified-workspace .u-preview{display:block;width:100%;max-width:760px;aspect-ratio:4/3;margin:12px auto;background:#e9e0f6;border:2px solid #dac0f2;border-radius:20px;height:auto}
    #lic-unified-workspace .u-status{font-weight:800;color:#5a3b92;min-height:22px;font-size:14px}
    #lic-unified-workspace .u-reading{font-size:clamp(17px,3.3vw,23px);white-space:pre-wrap;line-height:1.6;text-align:center}
    #lic-unified-workspace .u-reader{max-width:790px;margin:auto}
    #lic-unified-workspace .u-book-card{background:#fff9fd;border:2px solid #ddc9ef;padding:18px;border-radius:22px}
    #lic-unified-workspace .u-book-title{font-size:clamp(20px,4vw,28px);font-weight:900;text-align:center}
    #lic-unified-workspace .u-library-item{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;border:2px solid #ecdff8;border-radius:16px;padding:12px;margin:9px 0}
    #lic-unified-workspace .u-library-item strong{overflow-wrap:anywhere}
    #lic-unified-workspace .u-library-item button{min-height:42px}
    #lic-unified-workspace .u-note{background:#fff9dd;border-radius:14px;padding:12px;border:1px solid #e7d18e;font-size:13px}
    #lic-unified-workspace .u-movie-buttons{margin-top:10px}
    #lic-unified-workspace .u-progress{height:8px;border-radius:10px;background:#eadcf6;overflow:hidden}
    #lic-unified-workspace .u-progress>div{height:100%;background:#7657be;width:0;transition:width .1s linear}
    #lic-unified-workspace .u-shelf{border-top:2px dashed #d9c9eb;padding-top:12px;margin-top:23px}
    #lic-unified-workspace .u-classic{text-align:center;margin:30px auto}
    #lic-unified-workspace .u-classic button{background:#fffefc}

    /* Kyle stays available throughout the new and original site. The small dock only expands when asked. */
    #lic-kyle-guide{position:fixed;left:max(10px,env(safe-area-inset-left));bottom:max(10px,env(safe-area-inset-bottom));z-index:2147483500;font-family:system-ui,-apple-system,'Segoe UI',sans-serif}
    #lic-kyle-toggle{display:flex;align-items:center;gap:7px;border:3px solid #fff;border-radius:999px;background:#6b4dae;color:#fff;min-height:53px;padding:5px 14px 5px 6px;box-shadow:0 6px 20px #30204466;font-size:14px;font-weight:900;cursor:pointer}
    #lic-kyle-toggle img{width:38px;height:38px;border-radius:50%;object-fit:cover;background:#fff6de}
    #lic-kyle-toggle:focus-visible,#lic-kyle-guide button:focus-visible,#lic-kyle-guide select:focus-visible{outline:3px solid #e8a23b;outline-offset:2px}
    #lic-kyle-panel[hidden]{display:none!important}
    #lic-kyle-panel{position:absolute;bottom:64px;left:0;width:min(364px,calc(100vw - 22px));max-height:min(68dvh,590px);overflow:auto;background:#fffdfb;border:3px solid #c5a9e6;border-radius:23px;padding:13px;color:#39275c;box-shadow:0 9px 30px #24183b77}
    #lic-kyle-panel p{margin:7px 0 10px;line-height:1.45;font-size:14px}
    #lic-kyle-panel h2{font-size:19px;line-height:1.2;margin:0}
    #lic-kyle-panel .kyle-head{display:flex;align-items:center;justify-content:space-between;gap:8px}
    #lic-kyle-panel button,#lic-kyle-panel select{font:inherit;font-size:14px;border:2px solid #d6c3ee;border-radius:11px;padding:9px;color:#4b327c;background:#fff;min-height:43px;cursor:pointer}
    #lic-kyle-panel .kyle-choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:10px}
    #lic-kyle-panel .kyle-choices button{min-width:0;font-weight:800}
    #lic-kyle-panel .kyle-voices{display:flex;flex-direction:column;font-weight:800;font-size:13px;gap:4px;margin:12px 0 4px}
    #lic-kyle-voice{width:100%;min-width:0}
    #lic-kyle-panel .kyle-close{font-size:17px;font-weight:900;min-width:43px}
    #lic-kyle-panel .kyle-note{font-size:11px;color:#766588}
    @media(max-width:400px){#lic-kyle-toggle{font-size:12px;padding-right:10px}#lic-kyle-panel{max-height:62dvh}}
    @media print{#lic-kyle-guide{display:none!important}}
    #lic-unified-return{position:fixed;right:12px;bottom:12px;z-index:2147483000;background:#7052bb;color:#fff;border:2px solid white;border-radius:14px;padding:11px;font:800 15px system-ui;box-shadow:0 5px 20px #23123f77;cursor:pointer}
    body.lic-unified-mode #lic-unified-return{display:none}
    @media(max-width:480px){#lic-unified-workspace .u-form{grid-template-columns:1fr}#lic-unified-workspace .u-tabs{top:58px}#lic-unified-workspace .u-card{padding:12px}#lic-unified-workspace .u-tabs button{letter-spacing:-.15px}}
    @media print{body.lic-unified-mode #lic-unified-workspace .u-header,body.lic-unified-mode #lic-unified-workspace .u-tabs,body.lic-unified-mode #lic-unified-workspace button{display:none!important}}
  `;document.head.append(style);
  hub.innerHTML=`<header class="u-header"><div class="u-wrap u-bar"><span class="u-brand">🌙 Little Imagination Club</span><button type="button" id="u-home">🏡 Home</button></div></header>
    <div class="u-wrap">
      <section id="u-welcome"><div class="u-card u-welcome"><img id="u-family" alt="King Kyle and friends" loading="eager"><h1>👑 King Kyle's Happy Kingdom</h1><p>Make your own story, pictures and movie — all in one place!</p><div class="u-actions"><button id="u-start" class="primary u-action">✨ Start creating</button><button id="u-my-books" class="u-action">📚 My stories</button></div></div><p class="u-muted" style="text-align:center">Your creations stay on this device. Download a backup to keep them safe.</p></section>
      <section id="u-work" hidden><div class="u-banner">✨ One creation, lots of magic! Change anything, then choose how to enjoy it.</div>
        <label class="u-field">📕 My creation's name<input id="u-title" maxlength="85" placeholder="My magical adventure"></label>
        <div class="u-tabs" role="tablist" aria-label="Make and share your creation">
          <button id="u-tab-story" data-u-tab="story" type="button" role="tab" aria-selected="true"><span>✏️</span>Story</button>
          <button id="u-tab-picture" data-u-tab="picture" type="button" role="tab" aria-selected="false"><span>🖼️</span>Pictures</button>
          <button id="u-tab-movie" data-u-tab="movie" type="button" role="tab" aria-selected="false"><span>🎬</span>Mini Movie</button>
          <button id="u-tab-book" data-u-tab="book" type="button" role="tab" aria-selected="false"><span>📖</span>Book & Print</button>
        </div>
        <div class="u-pagebar"><button id="u-prev" type="button">← Page</button><strong id="u-count">Page 1 of 1</strong><button id="u-next" type="button">Next →</button></div>
        <section id="u-panel-story" class="u-card" role="tabpanel">
          <h2>✏️ Make your story</h2><p class="u-muted">Write your own, or ask the website to make a starting story. Then change every page!</p>
          <div class="u-form"><label class="u-field">🌟 Main character<select id="u-hero"></select></label><label class="u-field">🏰 Story world<select id="u-world"></select></label><label class="u-field">✨ Adventure<select id="u-adventure"></select></label><label class="u-field" id="u-hero-name-box" hidden>My hero's name<input id="u-hero-name" maxlength="40" placeholder="Your first name or nickname"></label></div>
          <div class="u-actions"><button id="u-generate" class="primary" type="button">✨ Make a story for me</button><button id="u-write" type="button">✏️ I'll write my own</button></div>
          <div class="u-note">Story helper works offline using built-in adventures. A secure AI storyteller hasn't been connected yet.</div>
          <label class="u-field" style="margin-top:16px">📝 Words for this page<textarea id="u-words" maxlength="2200" placeholder="Once upon a time…"></textarea></label>
          <div class="u-actions"><button id="u-add-page" class="positive" type="button">➕ Add page</button><button id="u-remove-page" class="warn" type="button">➖ Remove page</button></div>
          <div class="u-actions"><button id="u-story-picture" type="button">🖼️ Choose page picture →</button><button id="u-story-book" type="button">📖 Read my book →</button></div>
        </section>
        <section id="u-panel-picture" class="u-card" role="tabpanel" hidden><h2>🖼️ Pictures for my story</h2><p class="u-muted">Change the picture on this page. It appears in your movie, eBook and printed book too!</p>
          <div class="u-form"><label class="u-field">Character in this picture<select id="u-pic-hero"></select></label><label class="u-field">Background world<select id="u-pic-world"></select></label></div>
          <canvas id="u-picture-canvas" class="u-preview" width="1000" height="750" aria-label="Picture on the current page"></canvas>
          <label class="u-field">📷 Use my own drawing or photo<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" id="u-upload"></label>
          <div class="u-actions"><button id="u-remove-picture" class="warn" type="button">✖ Remove my photo</button><button id="u-download-picture" class="positive" type="button">⬇️ Save this picture</button></div>
          <p class="u-note">3D-look illustration with our club artwork (not a generated 3D model). You can replace it with your own picture.</p>
          <button id="u-picture-movie" class="primary" type="button" style="width:100%;margin-top:10px">🎬 Make my mini movie →</button>
        </section>
        <section id="u-panel-movie" class="u-card" role="tabpanel" hidden><h2>🎬 My mini movie</h2><p class="u-muted">The same pages come alive with moving pictures and captions. No need to rebuild your story.</p>
          <canvas id="u-movie-canvas" class="u-preview" width="1000" height="750" aria-label="Animated story movie"></canvas>
          <div class="u-progress"><div id="u-movie-progress"></div></div><p id="u-movie-status" class="u-muted">Ready for the adventure!</p>
          <div class="u-form"><label class="u-field">Scene speed<select id="u-movie-speed"><option value="3500">Quick (3.5 seconds)</option><option value="5500" selected>Normal (5.5 seconds)</option><option value="8000">Slow (8 seconds)</option></select></label><label class="u-field">🔊 Read pages aloud<select id="u-movie-voice"><option value="on">During playback (if supported)</option><option value="off">No voice</option></select></label></div>
          <div class="u-actions u-movie-buttons"><button class="primary" id="u-play-movie" type="button">▶️ Play movie</button><button id="u-stop-movie" type="button">⏹ Stop</button><button class="positive" id="u-save-movie" type="button">⬇️ Save video</button></div>
          <div class="u-note">Downloaded movies are <strong>silent WebM videos with captions</strong>. Read-aloud is available in the browser preview only. Video downloading depends on your browser's support.</div>
        </section>
        <section id="u-panel-book" class="u-card" role="tabpanel" hidden><h2>📖 My magical book</h2>
          <div class="u-reader"><div class="u-book-card"><div class="u-book-title" id="u-reader-title"></div><canvas id="u-book-canvas" class="u-preview" width="1000" height="750" aria-label="Illustration for this book page"></canvas><p class="u-reading" id="u-book-words"></p></div></div>
          <div class="u-actions"><button id="u-read" class="positive" type="button">🔊 Read to me</button><button id="u-edit-from-book" type="button">✏️ Change this page</button></div>
          <div class="u-actions"><button id="u-ebook" type="button">⬇️ Save eBook</button><button id="u-print" class="primary" type="button">🖨️ Print / PDF</button></div>
          <div class="u-note">eBook downloads as a self-contained HTML book you can read offline. Print / PDF opens your device's print options.</div>
        </section>
        <p id="u-status" class="u-status" role="status" aria-live="polite"></p><div class="u-actions"><button id="u-save" class="positive" type="button">💾 Save my creation</button><button id="u-backup" type="button">⬇️ Backup project</button></div>
      </section>
      <section id="u-library" class="u-card u-shelf" hidden><h2>📚 My saved stories</h2><div class="u-actions"><button id="u-new" class="primary" type="button">✨ New creation</button><button id="u-import" type="button">⬆️ Restore a backup</button><input id="u-import-file" type="file" accept=".json,application/json" hidden></div><div id="u-library-list"></div><p class="u-muted">Earlier books are offered here too. Your old drawings remain safely in the original editor.</p></section>
      <div class="u-classic"><button id="u-old-drawing" type="button">🎨 Original drawing studio</button><button id="u-old-site" type="button">🧰 Original website</button></div>
    </div>`;
  const returnButton=document.createElement('button');returnButton.id='lic-unified-return';returnButton.type='button';returnButton.textContent='🏡 One Magic Workspace';body.append(returnButton);
  // Kyle is a real contextual guide, not a chatbot or an unconnected decoration.
  const kyle=document.createElement('aside');kyle.id='lic-kyle-guide';kyle.setAttribute('aria-label','King Kyle site helper');
  kyle.innerHTML=`<button type="button" id="lic-kyle-toggle" aria-controls="lic-kyle-panel" aria-expanded="false" aria-label="Ask King Kyle for help"><img id="lic-kyle-avatar" alt="" aria-hidden="true">👑 Ask Kyle</button>
  <div id="lic-kyle-panel" role="region" aria-label="Help from King Kyle" hidden>
    <div class="kyle-head"><h2>🦊 King Kyle can help!</h2><button class="kyle-close" type="button" id="lic-kyle-close" aria-label="Close Kyle help">✕</button></div>
    <p id="lic-kyle-tip">Hello, friend! What would you like to make?</p>
    <div class="kyle-choices" id="lic-kyle-choices"></div>
    <label class="kyle-voices" for="lic-kyle-voice">🎙️ Choose a storytelling voice<select id="lic-kyle-voice" aria-label="Choose narration voice"><option value="">Device voice</option></select></label>
    <button id="lic-kyle-read" type="button" style="width:100%">🔊 Hear Kyle explain</button>
    <p class="kyle-note">Voice choices depend on the voices installed on this device. You can change your choice any time.</p>
  </div>`;
  document.body.append(kyle);$('lic-kyle-avatar').src=art.kyle||'lic_cute_art_sheet.jpg';
  const oldHeader=document.querySelector('header.topbar');if(oldHeader)oldHeader.after(hub);else body.prepend(hub);body.classList.add('lic-unified-mode');
  const wait=(ms)=>new Promise(r=>setTimeout(r,ms));const id=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
  const xml=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const filename=s=>String(s||'magical-creation').replace(/[^a-zA-Z0-9_-]+/g,'-').slice(0,48)||'magical-creation';
  const mkPage=(hero='kyle',world='castle',text='')=>({id:id(),hero,world,text,photo:null});
  const normalizePage=(p,hero,world)=>typeof p==='string'?mkPage(hero,world,p):({id:p?.id||id(),hero:p?.hero||hero,world:p?.world||world,text:String(p?.text||''),photo:p?.photo||null});
  function normalize(b){const hero=b.hero||'kyle',world=b.world||'castle';return {...b,id:b.id||id(),title:String(b.title||'My Magic Story').slice(0,85),hero,world,quest:b.quest||'key',heroName:b.heroName||'',pages:(b.pages||[]).map(p=>normalizePage(p,hero,world)),updated:b.updated||Date.now()};}
  function readLocal(k){try{const list=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(list)?list:[];}catch(_){return [];}}
  function readProjects(){const current=readLocal(DB).map(normalize);const ids=new Set(current.map(p=>p.id));for(const old of readLocal(OLD)){if(old&&Array.isArray(old.pages)&&!ids.has(old.id)){const b=normalize(old);if(old.coverPhoto&&b.pages[0])b.pages[0].photo=old.coverPhoto;current.push(b);}}return current.sort((a,b)=>b.updated-a.updated).slice(0,50);}
  let projects=readProjects(),active=null,pageIndex=0,currentTab='story',saveTimer=null,renderToken=0,recorder=null,playing=false,movieRAF=0,animationToken=0,speaking=false;
  function status(s){$('u-status').textContent=s||'';}
  function persist(){if(!active)return;active.updated=Date.now();const idx=projects.findIndex(b=>b.id===active.id);if(idx>=0)projects[idx]=active;else projects.unshift(active);projects.sort((a,b)=>b.updated-a.updated);
    try{localStorage.setItem(DB,JSON.stringify(projects.slice(0,22)));status('✅ Saved on this device');}catch(_){status('⚠️ Storage is full. Download a project backup to keep your changes.');}}
  function schedule(){clearTimeout(saveTimer);saveTimer=setTimeout(persist,450);}
  function stopVoice(){if('speechSynthesis' in window)window.speechSynthesis.cancel();speaking=false;$('u-read').textContent='🔊 Read to me';}
  function say(words){if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance)return false;stopVoice();let u=new SpeechSynthesisUtterance(words);u.lang='en-AU';u.rate=.9;
    const voices=speechSynthesis.getVoices?.()||[];const chosen=voices.find(v=>v.voiceURI===$('lic-kyle-voice').value);if(chosen){u.voice=chosen;u.lang=chosen.lang;}
    u.onend=()=>{speaking=false;$('u-read').textContent='🔊 Read to me';};speechSynthesis.speak(u);speaking=true;return true;}
  function choose(select,things){for(const v of things){const opt=document.createElement('option');opt.value=v.id;opt.textContent=v.emoji+' '+v.name;select.append(opt);}}
  choose($('u-hero'),friends);choose($('u-pic-hero'),friends);choose($('u-world'),worlds);choose($('u-pic-world'),worlds);choose($('u-adventure'),adventures);
  const kyleTips={
    home:{message:'Welcome to my Happy Kingdom! Tap Start creating to make your own adventure, or My stories to open a saved one.',choices:[['✨ Start creating','start'],['📚 My stories','library']]},
    story:{message:'Choose a character, a world and an adventure. Ask for a starter story or write your own words. Add and remove pages just below!',choices:[['✏️ Find my writing','words'],['✨ Story starter','starter'],['🖼️ Pictures','picture'],['📖 Read book','book']]},
    picture:{message:'Pick a character and background for this page, or add your own photo or drawing. This same picture appears in the book and movie!',choices:[['🎨 Pick character','pick-picture'],['📷 My photo','upload'],['✏️ Story words','story'],['🎬 Mini movie','movie']]},
    movie:{message:'Your story pages become moving scenes! Tap Play movie to watch. You can turn on the read-aloud voice during playback. Saved WebM movies have captions but no voice track.',choices:[['▶️ Watch movie','play'],['🔊 Choose voice','voice'],['✏️ Change story','story'],['📖 Book & Print','book']]},
    book:{message:'This is your illustrated book! Use Page and Next above to turn pages, Read to me to listen, or Save eBook and Print / PDF below.',choices:[['🔊 Read this page','read'],['✏️ Change words','words'],['⬇️ Save eBook','ebook'],['🖨️ Print / PDF','print']]},
    library:{message:'All your saved stories are here. Tap Open beside a story to change it, or New creation to begin a different adventure.',choices:[['📚 See saved stories','find-books'],['✨ New creation','start']]},
    classic:{message:'You are visiting the older tools. You can still use them, or return to our easier one-stop story workspace any time.',choices:[['🏡 Magic Workspace','return'],['📚 My stories','back-library']]}
  };
  function kyleLocation(){if(hub.hidden)return 'classic';if(!$('u-welcome').hidden)return 'home';if(!$('u-library').hidden)return 'library';return currentTab;}
  function refreshKyle(){const info=kyleTips[kyleLocation()];$('lic-kyle-tip').textContent=info.message;
    const actions=$('lic-kyle-choices');actions.replaceChildren();for(const [label,action] of info.choices){const button=document.createElement('button');button.type='button';button.textContent=label;button.dataset.kyleAction=action;actions.append(button);}}
  function closeKyle(){if($('lic-kyle-panel').hidden)return;$('lic-kyle-panel').hidden=true;$('lic-kyle-toggle').setAttribute('aria-expanded','false');$('lic-kyle-toggle').focus({preventScroll:true});}
  $('lic-kyle-toggle').addEventListener('click',()=>{const panel=$('lic-kyle-panel');const opening=panel.hidden;panel.hidden=!opening;$('lic-kyle-toggle').setAttribute('aria-expanded',String(opening));if(opening){refreshKyle();$('lic-kyle-close').focus({preventScroll:true});}});
  $('lic-kyle-close').addEventListener('click',closeKyle);
  kyle.addEventListener('keydown',e=>{if(e.key==='Escape'){closeKyle();e.stopPropagation();}});
  function refreshVoices(){const sel=$('lic-kyle-voice'),old=sel.value;sel.replaceChildren();const defaultVoice=document.createElement('option');defaultVoice.value='';defaultVoice.textContent='Device voice';sel.append(defaultVoice);
    const voices=('speechSynthesis' in window?speechSynthesis.getVoices():[])||[];for(const v of voices){if(!/^(en|en-)/i.test(v.lang))continue;const option=document.createElement('option');option.value=v.voiceURI;option.textContent=`${v.name} (${v.lang})`;sel.append(option);}sel.value=[...sel.options].some(o=>o.value===old)?old:'';}
  refreshVoices();if('speechSynthesis' in window)speechSynthesis.addEventListener?.('voiceschanged',refreshVoices);
  $('lic-kyle-read').onclick=()=>{if(!say($('lic-kyle-tip').textContent))$('lic-kyle-tip').textContent+=' This device cannot speak text aloud right now.';};
  $('lic-kyle-choices').addEventListener('click',e=>{const action=e.target.closest('[data-kyle-action]')?.dataset.kyleAction;if(!action)return;closeKyle();
    const guideTo=tab=>{if(!active)newProject();selectTab(tab);};
    if(action==='start')newProject();else if(action==='library'){show('library');drawLibrary();}else if(action==='return')returnToWorkspace();else if(action==='back-library'){returnToWorkspace();show('library');drawLibrary();}
    else if(action==='find-books')$('u-library-list').scrollIntoView({behavior:'smooth',block:'start'});
    else if(action==='starter'){guideTo('story');$('u-generate').focus();$('u-generate').scrollIntoView({behavior:'smooth',block:'center'});}
    else if(action==='words'){guideTo('story');$('u-words').focus({preventScroll:true});$('u-words').scrollIntoView({behavior:'smooth',block:'center'});}
    else if(action==='pick-picture'){guideTo('picture');$('u-pic-hero').focus({preventScroll:true});}
    else if(action==='upload'){guideTo('picture');$('u-upload').focus({preventScroll:true});}
    else if(action==='voice'){$('lic-kyle-toggle').click();$('lic-kyle-voice').focus();}
    else if(action==='play'){guideTo('movie');$('u-play-movie').click();}
    else if(action==='read'){guideTo('book');$('u-read').click();}
    else if(action==='ebook'){guideTo('book');$('u-ebook').click();}
    else if(action==='print'){guideTo('book');$('u-print').click();}
    else if(['story','picture','movie','book'].includes(action)){guideTo(action);}
  });
  function show(which){$('u-welcome').hidden=which!=='home';$('u-work').hidden=which!=='work';$('u-library').hidden=which!=='library';if(which!=='work'){stopMovie();stopVoice();}refreshKyle();window.scrollTo({top:0,behavior:'instant'});}
  function useClassic(selector){stopMovie();stopVoice();hub.hidden=true;body.classList.remove('lic-unified-mode');refreshKyle();const el=selector?$(selector):document.querySelector('main#top');if(el)requestAnimationFrame(()=>el.scrollIntoView({block:'start',behavior:'instant'}));}
  function returnToWorkspace(){hub.hidden=false;body.classList.add('lic-unified-mode');show('work');selectTab('story');}
  returnButton.onclick=returnToWorkspace;$('u-old-site').onclick=()=>useClassic(null);$('u-old-drawing').onclick=()=>useClassic('lic-easy-art');
  $('u-home').onclick=()=>{flush();show('home');};$('u-start').onclick=()=>newProject();$('u-my-books').onclick=()=>{show('library');drawLibrary();};
  function newProject(){stopMovie();stopVoice();flush();active={id:id(),title:'My Magical Adventure',hero:'kyle',world:'castle',quest:'key',heroName:'',pages:[mkPage()]};pageIndex=0;persist();show('work');selectTab('story',false);renderAll();}
  function flush(){if(!active)return;const p=active.pages[pageIndex];if(!p)return;active.title=$('u-title').value.trim().slice(0,85)||active.title;
    if(currentTab==='story')p.text=$('u-words').value.slice(0,2200);}
  function activate(project){stopMovie();stopVoice();flush();active=normalize(project);pageIndex=0;show('work');selectTab('story',false);renderAll();}
  function current(){return active?.pages?.[pageIndex];}
  function selectTab(tab,commit=true){if(active&&commit)flush();stopMovie();stopVoice();currentTab=tab;refreshKyle();for(const name of ['story','picture','movie','book']){$('u-panel-'+name).hidden=name!==tab;$('u-tab-'+name).setAttribute('aria-selected',String(name===tab));}renderAll(false);}
  for(const b of hub.querySelectorAll('[data-u-tab]'))b.addEventListener('click',()=>selectTab(b.dataset.uTab));
  function renderAll(rewrite=true){if(!active)return;const p=current();$('u-title').value=active.title;$('u-count').textContent=`Page ${pageIndex+1} of ${active.pages.length}`;
    $('u-prev').disabled=pageIndex===0;$('u-next').disabled=pageIndex>=active.pages.length-1;
    if(rewrite){$('u-hero').value=active.hero;$('u-world').value=active.world;$('u-adventure').value=active.quest;$('u-hero-name').value=active.heroName||'';$('u-hero-name-box').hidden=active.hero!=='me';$('u-words').value=p.text||'';}
    $('u-pic-hero').value=p.hero;$('u-pic-world').value=p.world;$('u-remove-picture').disabled=!p.photo;
    $('u-reader-title').textContent=active.title;$('u-book-words').textContent=p.text||'Your story words go here!';
    $('u-remove-page').disabled=active.pages.length<=1;
    if(currentTab==='picture')renderCanvas($('u-picture-canvas'),p);
    if(currentTab==='book')renderCanvas($('u-book-canvas'),p);
    if(currentTab==='movie')renderMovieStill();
  }
  function movePage(delta){flush();pageIndex=Math.max(0,Math.min(active.pages.length-1,pageIndex+delta));schedule();renderAll();stopVoice();}
  $('u-prev').onclick=()=>movePage(-1);$('u-next').onclick=()=>movePage(1);
  $('u-title').addEventListener('input',e=>{if(!active)return;active.title=e.target.value.slice(0,85);$('u-reader-title').textContent=active.title;schedule();});
  $('u-words').addEventListener('input',e=>{if(!current())return;current().text=e.target.value;$('u-book-words').textContent=e.target.value;schedule();});
  function globalChange(){if(!active)return;active.hero=$('u-hero').value;active.world=$('u-world').value;active.quest=$('u-adventure').value;active.heroName=$('u-hero-name').value.slice(0,40);
    $('u-hero-name-box').hidden=active.hero!=='me';const p=current();if(p&&!p.photo){p.hero=active.hero;p.world=active.world;}schedule();}
  for(const name of ['u-hero','u-world','u-adventure','u-hero-name'])$(name).addEventListener('change',globalChange);
  $('u-add-page').onclick=()=>{flush();if(active.pages.length>=20){status('A book can have up to 20 pages.');return;}active.pages.splice(pageIndex+1,0,mkPage(active.hero,active.world));pageIndex++;persist();renderAll();$('u-words').focus();};
  $('u-remove-page').onclick=()=>{if(active.pages.length<=1)return;if(!confirm('Remove this page from your story?'))return;active.pages.splice(pageIndex,1);pageIndex=Math.max(0,Math.min(pageIndex,active.pages.length-1));persist();renderAll();};
  $('u-write').onclick=()=>{if(active.pages.some(p=>p.text.trim())&&!confirm('Start with a blank story? Your current story pages will be replaced.'))return;active.pages=[mkPage(active.hero,active.world)];pageIndex=0;persist();renderAll();$('u-words').focus();status('✏️ Your story is yours to write! Add more pages whenever you like.');};
  function storyText(){const hero=active.hero==='me'?(active.heroName.trim()||'Our little hero'):(friendBy[active.hero]?.name||'King Kyle');const place=(worldBy[active.world]?.name||'magical kingdom').toLowerCase();
    const q={key:['a little golden key','Nobody knew what the key would open.','A tiny door hidden in the flowers','Inside, they discovered a room full of wonderful pictures.'],lost:['a worried little friend','The friend could not find the way home.','They followed soft footprints through the trees','Together, they found the way home and shared a big hug.'],star:['a fallen sparkling star','The star needed to get back into the night sky.','They made a ladder of silver moonbeams','The little star flew up and twinkled thank you.'],party:['a secret party invitation','Nobody knew who the party was for.','They gathered lanterns, balloons and their friends','Surprise! The party was for the whole kingdom.'],bridge:['a broken bridge','Some tiny animals were stranded across the river.','They collected safe wooden planks and worked together','The animals crossed safely and everybody cheered.'],wish:['a glowing wish stone','It could grant just one wish.','They listened carefully to what their friends needed','They wished that nobody in the kingdom would feel alone.']}[active.quest]||[];
    return [`One bright morning, ${hero} set off into the ${place}. It felt like the beginning of something extraordinary.`,
     `On the path, ${hero} found ${q[0]}. What a surprising discovery!`,
     `${q[1]} ${hero} wondered how to help. This was going to be a real adventure.`,
     `${q[2]}. ${hero} was brave, but remembered that asking friends for help could be brave too.`,
     `${q[3]} ${hero} smiled. What wonderful magic friendship can make! The end. 💜`];
  }
  $('u-generate').onclick=()=>{globalChange();flush();if(active.pages.some(p=>p.text.trim())&&!confirm('Replace your current words with a new starter story?'))return;
    const old=active.pages.slice();active.pages=storyText().map((t,i)=>({...mkPage(active.hero,active.world,t),photo:old[i]?.photo||null,hero:old[i]?.hero||active.hero,world:old[i]?.world||active.world}));pageIndex=0;persist();renderAll();status('✨ Your story is ready! Change any words or add your own pages.');};
  $('u-story-picture').onclick=()=>selectTab('picture');$('u-story-book').onclick=()=>selectTab('book');$('u-picture-movie').onclick=()=>selectTab('movie');$('u-edit-from-book').onclick=()=>{selectTab('story');$('u-words').focus();};
  $('u-pic-hero').onchange=()=>{current().hero=$('u-pic-hero').value;current().photo=null;persist();renderAll();};
  $('u-pic-world').onchange=()=>{current().world=$('u-pic-world').value;current().photo=null;persist();renderAll();};
  const cache=new Map();async function loadImage(src){if(!src)return null;if(cache.has(src))return cache.get(src);const p=new Promise(resolve=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=src;});cache.set(src,p);return p;}
  async function uploadData(file){if(!file||!/^image\/(jpeg|png|gif|webp)$/.test(file.type)||file.size>12e6)throw Error('Choose a JPG, PNG or WebP under 12 MB.');
    const raw=await new Promise((res,rej)=>{const f=new FileReader();f.onload=()=>res(f.result);f.onerror=rej;f.readAsDataURL(file);});const image=await loadImage(raw);if(!image)throw Error('Could not read this image.');
    const c=document.createElement('canvas');const ratio=Math.min(1,850/Math.max(image.width,image.height));c.width=Math.round(image.width*ratio);c.height=Math.round(image.height*ratio);
    const ctx=c.getContext('2d');ctx.fillStyle='#fffdfa';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(image,0,0,c.width,c.height);return c.toDataURL('image/jpeg',.72);}
  $('u-upload').onchange=async e=>{const file=e.target.files?.[0];if(!file)return;try{current().photo=await uploadData(file);persist();renderAll();status('✅ Your picture is part of this page, book and movie!');}catch(err){status(err.message);}e.target.value='';};
  $('u-remove-picture').onclick=()=>{current().photo=null;persist();renderAll();};
  function rounded(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
  async function drawScene(c,p){const ctx=c.getContext('2d');if(!ctx)return;
    const w=c.width,h=c.height,world=p.world||'castle',friend=friendBy[p.hero]||friends[0];const colors={castle:['#c4b0f8','#ffdef3','#c2f6cf'],forest:['#8fd7b8','#e1f6ba','#5cb58a'],sea:['#85d7f6','#defaff','#67accb'],space:['#282851','#7b6dca','#31396b'],garden:['#facbeb','#ffedd2','#a9e4ca'],snow:['#c3e8fe','#f7faff','#accbdf']}[world]||['#d1b8fe','#ffedf9','#c3f3da'];
    const gr=ctx.createLinearGradient(0,0,w,h);gr.addColorStop(0,colors[0]);gr.addColorStop(.6,colors[1]);gr.addColorStop(1,colors[2]);ctx.fillStyle=gr;ctx.fillRect(0,0,w,h);
    if(world==='castle'){const bg=await loadImage(art.castle);if(bg){ctx.globalAlpha=.45;const scale=Math.max(w/bg.width,h/bg.height);ctx.drawImage(bg,(w-bg.width*scale)/2,(h-bg.height*scale)/2,bg.width*scale,bg.height*scale);ctx.globalAlpha=1;}}
    for(let i=0;i<19;i++){ctx.fillStyle='rgba(255,255,255,.65)';ctx.beginPath();ctx.arc((i*237)%w,60+(i*131)%(h-120),3+i%6,0,Math.PI*2);ctx.fill();}
    if(p.photo){const im=await loadImage(p.photo);if(im){const scale=Math.min((w-70)/im.width,(h-70)/im.height);const x=(w-im.width*scale)/2,y=(h-im.height*scale)/2;ctx.fillStyle='#fff';rounded(ctx,x-8,y-8,im.width*scale+16,im.height*scale+16,20);ctx.fill();ctx.drawImage(im,x,y,im.width*scale,im.height*scale);return;}}
    ctx.fillStyle='rgba(79,57,126,.18)';ctx.beginPath();ctx.ellipse(w*.5,h*.87,w*.3,38,0,0,Math.PI*2);ctx.fill();
    const im=await loadImage(art[p.hero]);if(im){const scale=Math.min(w*.65/im.width,h*.76/im.height);ctx.save();ctx.shadowColor='#32294c77';ctx.shadowBlur=35;ctx.shadowOffsetY=16;ctx.drawImage(im,(w-im.width*scale)/2,(h-im.height*scale)/2,im.width*scale,im.height*scale);ctx.restore();}
    else{ctx.save();ctx.font=`${Math.floor(h*.45)}px system-ui,'Segoe UI Emoji'`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowBlur=25;ctx.shadowColor='#31205670';ctx.fillText(friend.emoji,w/2,h/2);ctx.restore();}
  }
  const sceneCache=new Map();function sceneKey(p){return [p.hero,p.world,p.photo||''].join('|');}
  async function getScene(p){const key=sceneKey(p);if(sceneCache.has(key))return sceneCache.get(key);
    const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=750;const prom=drawScene(canvas,p).then(()=>canvas);sceneCache.set(key,prom);if(sceneCache.size>28)sceneCache.delete(sceneCache.keys().next().value);return prom;}
  async function renderCanvas(c,p){const token=++renderToken,scene=await getScene(p);if(token!==renderToken)return;c.getContext('2d').drawImage(scene,0,0,c.width,c.height);}
  async function savePNG(){const p=current();const c=await getScene(p);c.toBlob(blob=>{if(blob)download(blob,filename(active.title)+'-picture.png');else status('Could not save picture.');},'image/png');}
  $('u-download-picture').onclick=savePNG;
  function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.download=name;a.href=url;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
  async function renderMovieStill(){if(!active)return;const c=$('u-movie-canvas'),scene=await getScene(current());drawMovie(c,scene,current().text,0,0);}
  function wrapText(ctx,text,maxWidth,maxLines=5){const words=String(text||'').split(/\s+/).filter(Boolean),lines=[];let l='';for(const word of words){if(ctx.measureText(l+' '+word).width>maxWidth&&l){lines.push(l);l=word;}else l=l?l+' '+word:word;if(lines.length>=maxLines)break;}if(l&&lines.length<maxLines)lines.push(l);if(lines.length===maxLines&&words.length>lines.join(' ').split(/\s+/).length)lines[maxLines-1]+='…';return lines;}
  function drawMovie(c,scene,words,t,index){const ctx=c.getContext('2d'),W=c.width,H=c.height;ctx.clearRect(0,0,W,H);
    const zoom=1.04+.075*t,dx=Math.sin(index*1.73)*26*t,dy=Math.cos(index*1.3)*17*t;
    ctx.save();ctx.translate(W/2+dx,H/2+dy);ctx.scale(zoom,zoom);ctx.drawImage(scene,-W/2,-H/2,W,H);ctx.restore();
    for(let i=0;i<12;i++){const x=(i*197+Math.sin(t*8+i)*22)%W,y=(i*123+t*150)%H;ctx.globalAlpha=.3+.45*Math.sin(i+t*7)**2;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,3+(i%3)*2,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
    ctx.fillStyle='rgba(42,25,76,.82)';rounded(ctx,25,H-233,W-50,205,25);ctx.fill();ctx.font='bold 33px system-ui';ctx.textAlign='center';ctx.fillStyle='#fff';
    const lines=wrapText(ctx,words||'Make your magical story!',W-115,4);const lineHeight=41,start=H-230+(200-lines.length*lineHeight)/2+30;
    lines.forEach((line,i)=>ctx.fillText(line,W/2,start+i*lineHeight,W-95));
    ctx.font='bold 20px system-ui';ctx.fillText(`${index+1} / ${active.pages.length}`,W/2,H-12);
  }
  function stopMovie(){animationToken++;playing=false;cancelAnimationFrame(movieRAF);if(recorder&&recorder.state!=='inactive')recorder.stop();recorder=null;stopVoice();$('u-play-movie').textContent='▶️ Play movie';}
  async function prebuild(){return Promise.all(active.pages.map(p=>getScene(p)));}
  async function runMovie(exportVideo=false){if(!active)return;stopMovie();flush();const token=++animationToken;
    if(exportVideo&&(!window.MediaRecorder||!$('u-movie-canvas').captureStream)){status('Video saving is not supported in this browser. You can still play your movie.');return;}
    $('u-movie-status').textContent='Preparing your scenes…';const scenes=await prebuild();if(token!==animationToken)return;
    const c=$('u-movie-canvas'),total=active.pages.length,ms=Number($('u-movie-speed').value)||5500;
    let mr=null,stream=null,chunks=[];if(exportVideo){const kinds=['video/webm;codecs=vp8','video/webm'];const kind=kinds.find(x=>MediaRecorder.isTypeSupported?.(x))||'';
      try{stream=c.captureStream(20);mr=new MediaRecorder(stream,kind?{mimeType:kind,videoBitsPerSecond:1800000}:undefined);mr.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};mr.onstop=()=>{stream.getTracks().forEach(t=>t.stop());if(chunks.length)download(new Blob(chunks,{type:mr.mimeType||'video/webm'}),filename(active.title)+'-mini-movie.webm');status('✅ Movie saved! Video is silent and has captions.');};mr.start();recorder=mr;}catch(_){if(stream)stream.getTracks().forEach(t=>t.stop());status('Your browser cannot record this video. You can still watch the movie.');return;}}
    playing=true;$('u-play-movie').textContent='⏹ Stop movie';$('u-save-movie').disabled=!!exportVideo;$('u-movie-status').textContent=exportVideo?'Recording your movie…':'Playing your magical movie!';
    let start=performance.now(),spoken=-1;
    function frame(now){if(token!==animationToken){if(mr&&mr.state!=='inactive')mr.stop();recorder=null;$('u-save-movie').disabled=false;return;}
      const elapsed=Math.min(total*ms,now-start),sceneIdx=Math.min(total-1,Math.floor(elapsed/ms)),part=Math.min(1,(elapsed%ms)/ms);
      drawMovie(c,scenes[sceneIdx],active.pages[sceneIdx].text,part,sceneIdx);$('u-movie-progress').style.width=(elapsed/(total*ms)*100).toFixed(1)+'%';
      $('u-movie-status').textContent=(exportVideo?'Recording':'Playing')+` scene ${sceneIdx+1} of ${total}`;
      if(!exportVideo&&$('u-movie-voice').value==='on'&&sceneIdx!==spoken){spoken=sceneIdx;say(active.pages[sceneIdx].text);}
      if(elapsed<total*ms)movieRAF=requestAnimationFrame(frame);else{playing=false;stopVoice();$('u-play-movie').textContent='▶️ Play movie';$('u-save-movie').disabled=false;$('u-movie-status').textContent='✨ The end! Play again or change your story.';
        if(mr&&mr.state!=='inactive')mr.stop();recorder=null;}
    }
    movieRAF=requestAnimationFrame(frame);
  }
  $('u-play-movie').onclick=()=>playing?stopMovie():runMovie(false);
  $('u-stop-movie').onclick=()=>{stopMovie();$('u-movie-status').textContent='Movie stopped';};
  $('u-save-movie').onclick=()=>runMovie(true);
  $('u-read').onclick=()=>{if(speaking){stopVoice();return;}if(!say(current().text||'Your magical story is waiting!'))status('Read aloud is unavailable in this browser.');else $('u-read').textContent='⏹ Stop reading';};
  async function builtBook(){flush();const pages=[];for(const [i,p] of active.pages.entries()){const c=await getScene(p);pages.push({words:p.text||'',image:c.toDataURL('image/jpeg',.82),number:i+1});}return pages;}
  function makeBookHTML(pages){const css=`*{box-sizing:border-box}body{font:18px system-ui,Arial;color:#372553;background:#f4eafb;margin:0}.page{width:min(800px,96%);margin:20px auto;padding:20px;border:2px solid #ddc8f2;border-radius:24px;background:white;break-after:page;text-align:center}h1{font-size:clamp(23px,5vw,34px)}img{display:block;width:100%;max-width:710px;height:auto;border-radius:18px;margin:auto}p{font-size:clamp(18px,3vw,24px);white-space:pre-wrap;line-height:1.6}small{color:#66547b}@media print{body{background:white}.page{margin:0 auto;width:100%;border:0;page-break-after:always}}`;
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+xml(active.title)+'</title><style>'+css+'</style></head><body>'+pages.map((p,i)=>'<section class="page"><h1>'+xml(active.title)+'</h1><img src="'+p.image+'" alt="Story illustration"><p>'+xml(p.words)+'</p><small>Page '+(i+1)+' of '+pages.length+'</small></section>').join('')+'</body></html>';}
  $('u-ebook').onclick=async()=>{status('Preparing your illustrated eBook…');const pages=await builtBook();download(new Blob([makeBookHTML(pages)],{type:'text/html;charset=utf-8'}),filename(active.title)+'-ebook.html');status('✅ Your illustrated offline eBook has downloaded!');};
  $('u-print').onclick=async()=>{const tab=window.open('','_blank');if(!tab){status('Please allow pop-ups, or download your eBook and print it from there.');return;}tab.document.write('<title>Preparing your magic book…</title><p>Preparing your pages…</p>');status('Preparing your print pages…');try{const pages=await builtBook();tab.document.open();tab.document.write(makeBookHTML(pages));tab.document.close();tab.focus();setTimeout(()=>tab.print(),750);status('🖨️ Choose Print or Save as PDF in the print window.');}catch(_){tab.close();status('Could not prepare the book for printing.');}};
  function drawLibrary(){projects=readProjects();const el=$('u-library-list');el.replaceChildren();if(!projects.length){const text=document.createElement('p');text.textContent='No saved stories yet. Tap New creation to begin!';el.append(text);return;}
    projects.forEach(b=>{const item=document.createElement('div');item.className='u-library-item';const name=document.createElement('strong');name.textContent='📖 '+b.title+' · '+b.pages.length+' page'+(b.pages.length===1?'':'s');const actions=document.createElement('div');actions.className='u-actions';
      const open=document.createElement('button');open.textContent='✏️ Open';open.className='primary';open.onclick=()=>activate(b);
      const del=document.createElement('button');del.textContent='🗑️ Delete';del.className='warn';del.onclick=()=>{if(!confirm('Delete this saved creation? Please make a backup first if you want to keep it.'))return;projects=projects.filter(p=>p.id!==b.id);try{localStorage.setItem(DB,JSON.stringify(projects.filter(p=>p.id!==b.id)));}catch(_){ }drawLibrary();};
      actions.append(open,del);item.append(name,actions);el.append(item);});
  }
  $('u-new').onclick=newProject;
  $('u-import').onclick=()=>$('u-import-file').click();
  $('u-import-file').onchange=async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>7e6)throw Error('Backup is too large (max 7 MB).');const o=JSON.parse(await file.text());if(!o||!Array.isArray(o.pages)||o.pages.length>20)throw Error('Not a valid story backup.');const b=normalize(o);b.id=id();projects.unshift(b);active=b;pageIndex=0;persist();show('work');selectTab('story');renderAll();status('✅ Your project is restored!');}catch(err){status('Could not restore project: '+err.message);}e.target.value='';};
  $('u-save').onclick=()=>{flush();persist();};
  $('u-backup').onclick=()=>{flush();download(new Blob([JSON.stringify(active,null,2)],{type:'application/json'}),filename(active.title)+'-backup.json');status('✅ Downloaded a complete project backup.');};
  $('u-family').src=art.family||'lic_cute_art_sheet.jpg';
  show('home');
})();

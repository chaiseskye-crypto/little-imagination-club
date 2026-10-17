/* Little Imagination Club — Kid-First Home (2026-10-18)
 * One connected, offline-first creation flow. Existing studio and older saved stories untouched.
 * '3D-look' means a layered illustration; no real AI/3D generation is claimed.
 */
(()=>{'use strict';
  if(document.getElementById('lic-kids-hub'))return;
  const art=window.LICKingdomAssets||{};
  const KEY='lic-kids-books-v1';
  const friends=[
    {id:'kyle',name:'King Kyle',emoji:'🦊',asset:'kyle'},
    {id:'bunny',name:'Bouncy Bunny',emoji:'🐰',asset:'bunny'},
    {id:'dragon',name:'Baby Dragon',emoji:'🐉',asset:'dragon'},
    {id:'unicorn',name:'Rainbow Unicorn',emoji:'🦄',asset:'unicorn'},
    {id:'chippy',name:'Chippy',emoji:'🐿️'},
    {id:'cuddles',name:'Cuddles',emoji:'🧸'},
    {id:'peppy',name:'Peppy',emoji:'🦜'},
    {id:'bertie',name:'Bertie',emoji:'🐛'},
    {id:'scrap',name:'Scrap',emoji:'🐭'},
    {id:'chilly',name:'Chilly',emoji:'🐧'},
    {id:'dennis',name:'Dennis',emoji:'🐶'},
    {id:'messy',name:'Messy Kitty',emoji:'🐱'},
    {id:'me',name:'Me! (My own hero)',emoji:'⭐'}
  ];
  const worlds=[{id:'castle',name:'Royal Castle',emoji:'🏰'},{id:'forest',name:'Enchanted Forest',emoji:'🌳'},
    {id:'sea',name:'Under the Sea',emoji:'🐬'},{id:'space',name:'Outer Space',emoji:'🚀'},
    {id:'garden',name:'Rainbow Garden',emoji:'🌈'},{id:'snow',name:'Snowy Mountains',emoji:'❄️'}];
  const quests=[{id:'key',name:'A mysterious key',emoji:'🗝️'},{id:'lost',name:'A lost little friend',emoji:'💜'},
    {id:'star',name:'A fallen star',emoji:'⭐'},{id:'party',name:'A surprise party',emoji:'🎉'},
    {id:'bridge',name:'A broken bridge',emoji:'🌉'},{id:'wish',name:'A magical wish',emoji:'✨'}];
  const $=id=>document.getElementById(id);
  const body=document.body;
  const hub=document.createElement('section'); hub.id='lic-kids-hub'; hub.setAttribute('aria-label','Little Imagination Club, make and read');
  const css=document.createElement('style');css.textContent=`
    body.lic-kid-first main#top, body.lic-kid-first footer.footer, body.lic-kid-first header.topbar{display:none!important}
    #lic-kids-hub[hidden]{display:none!important}#lic-kids-hub *,#lic-kids-hub *::before,#lic-kids-hub *::after{box-sizing:border-box}
    #lic-kids-hub{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#39275d;min-height:100dvh;background:linear-gradient(160deg,#faf1ff,#fffefa 57%,#e9f8f5);padding:0 0 50px}
    #lic-kids-hub [hidden]{display:none!important}
    #lic-kids-hub .lic-wrap{width:min(900px,94%);margin:auto}
    #lic-kids-hub .lic-head{background:#fffdfc;border-bottom:2px solid #eee1fc;position:relative;z-index:5}
    #lic-kids-hub .lic-head-inner{display:flex;gap:10px;align-items:center;justify-content:space-between;padding:11px 0}
    #lic-kids-hub .lic-logo{font-weight:900;line-height:1.2;font-size:clamp(16px,3vw,22px);display:flex;align-items:center;gap:8px}
    #lic-kids-hub .lic-logo span{background:#efe8ff;border-radius:15px;padding:10px;font-size:25px}
    #lic-kids-hub button,#lic-kids-hub select,#lic-kids-hub input,#lic-kids-hub textarea{font:inherit}
    #lic-kids-hub button{cursor:pointer;touch-action:manipulation;border:2px solid #cdb8ea;border-radius:16px;padding:12px 16px;background:#fff;color:#463077;font-weight:800;min-height:48px}
    #lic-kids-hub button:focus-visible,#lic-kids-hub select:focus-visible,#lic-kids-hub input:focus-visible,#lic-kids-hub textarea:focus-visible{outline:4px solid #8460bc;outline-offset:2px}
    #lic-kids-hub .lic-primary{background:#7051be;color:white;border-color:#7051be}
    #lic-kids-hub .lic-green{background:#ddf6e8;border-color:#7fbd9a;color:#245743}
    #lic-kids-hub .lic-danger{border-color:#d79bb0;color:#8f3152}
    #lic-kids-hub .lic-big{min-height:64px;font-size:clamp(16px,3.3vw,20px)}
    #lic-kids-hub .lic-small{font-size:13px;color:#62547a;line-height:1.55}
    #lic-kids-hub h1{font-size:clamp(29px,6vw,46px);margin:12px 0;line-height:1.12}
    #lic-kids-hub h2{font-size:clamp(24px,5vw,33px);margin:4px 0 12px}
    #lic-kids-hub p{line-height:1.6}
    #lic-kids-hub .lic-screen{padding:20px 0 28px}
    #lic-kids-hub .lic-welcome{background:#fff;border:3px solid #dfc5f7;border-radius:28px;padding:14px;box-shadow:0 10px 30px #6d55c71c}
    #lic-kids-hub .lic-welcome img{width:100%;max-height:350px;object-fit:cover;aspect-ratio:1.9;border-radius:20px;background:#f0e9fc;display:block}
    #lic-kids-hub .lic-welcome-copy{text-align:center;padding:8px 6px}
    #lic-kids-hub .lic-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin:18px 0}
    #lic-kids-hub .lic-tile{min-width:0;min-height:143px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;text-align:center;border-radius:22px;background:white}
    #lic-kids-hub .lic-tile .lic-emoji{font-size:41px;line-height:1.2}
    #lic-kids-hub .lic-tile strong{font-size:clamp(15px,3vw,19px)}
    #lic-kids-hub .lic-tile small{color:#685980;line-height:1.3;font-size:12px}
    #lic-kids-hub .lic-panel{background:#fff;border:2px solid #dec9f5;border-radius:24px;padding:clamp(14px,3vw,24px);margin:14px 0}
    #lic-kids-hub .lic-field{display:flex;flex-direction:column;gap:6px;margin:12px 0;font-weight:800}
    #lic-kids-hub .lic-field input,#lic-kids-hub .lic-field select,#lic-kids-hub .lic-field textarea{width:100%;min-width:0;border:2px solid #ccafe8;background:#fffdfd;color:#33224f;border-radius:13px;padding:12px;font-size:16px}
    #lic-kids-hub .lic-field textarea{resize:vertical;min-height:145px;line-height:1.6}
    #lic-kids-hub .lic-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px}
    #lic-kids-hub .lic-buttons{display:flex;flex-wrap:wrap;gap:9px;margin:14px 0}
    #lic-kids-hub .lic-buttons>*{flex:1 1 135px}
    #lic-kids-hub .lic-book{max-width:700px;margin:12px auto;border:3px solid #dbbaf5;border-radius:28px;background:linear-gradient(145deg,#fff,#fff3f9);padding:14px;box-shadow:0 14px 32px #5e3c871f}
    #lic-kids-hub canvas{display:block;width:100%;height:auto;border-radius:17px;background:#f7f0ff;aspect-ratio:4/3}
    #lic-kids-hub .lic-page-words{font-size:clamp(19px,3.9vw,25px);line-height:1.7;white-space:pre-wrap;text-align:center;margin:17px 4px 12px}
    #lic-kids-hub .lic-pager{display:flex;align-items:center;justify-content:space-between;gap:8px}
    #lic-kids-hub .lic-pager button{min-width:90px}
    #lic-kids-hub .lic-pager strong{text-align:center;white-space:nowrap}
    #lic-kids-hub .lic-book-title{font-size:clamp(22px,5vw,32px);text-align:center;margin:10px 0;font-weight:900;overflow-wrap:anywhere}
    #lic-kids-hub .lic-shelf-item{background:#fff;border:2px solid #e2cffa;border-radius:17px;padding:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;margin:9px 0}
    #lic-kids-hub .lic-shelf-title{font-weight:850;overflow-wrap:anywhere}
    #lic-kids-hub .lic-notice{min-height:20px;color:#543583;font-weight:750}
    #lic-kids-hub .lic-note{background:#fff9da;border:1px solid #e7d38d;border-radius:15px;padding:11px 13px;color:#645329}
    #lic-kids-hub .lic-pic-frame{width:min(700px,100%);margin:12px auto}
    #lic-kids-hub .lic-center{text-align:center}
    #lic-kids-hub .lic-back-row{margin:2px 0 16px}
    #lic-return-home{position:fixed;right:13px;bottom:14px;z-index:2147483000;background:#7051be;color:white;border:2px solid #fff;border-radius:20px;padding:13px 17px;font:800 16px system-ui;box-shadow:0 5px 16px #321d5470;cursor:pointer}
    body.lic-kid-first #lic-return-home{display:none!important}
    #lic-kids-hub .lic-extra{margin-top:26px;text-align:center}
    @media(max-width:560px){#lic-kids-hub .lic-fields{grid-template-columns:1fr}#lic-kids-hub .lic-tile{min-height:145px;padding:8px}#lic-kids-hub .lic-grid{gap:9px}#lic-kids-hub .lic-shelf-item{align-items:flex-start;flex-direction:column}#lic-kids-hub .lic-pager button{min-width:74px;padding:9px 7px}}
    @media print{body.lic-kid-first header.topbar,body.lic-kid-first #lic-kids-hub .lic-head,body.lic-kid-first #lic-kids-hub button,body.lic-kid-first #lic-kids-hub .lic-extra,body.lic-kid-first #lic-kids-hub .lic-notice{display:none!important}#lic-kids-hub{background:white}}
  `;
  document.head.append(css);
  hub.innerHTML=`<div class="lic-head"><div class="lic-wrap lic-head-inner"><div class="lic-logo"><span>🌙</span> Little Imagination Club</div><button id="lic-home" type="button">🏡 Home</button></div></div>
  <div class="lic-wrap">
    <section class="lic-screen" data-lic-screen="home"><div class="lic-welcome"><img id="lic-family-art" alt="King Kyle and his happy kingdom friends" loading="eager"><div class="lic-welcome-copy"><h1>👑 King Kyle's Happy Kingdom</h1><p>Make a story, create a magical picture, and keep your favourite books. Choose where you want to go!</p></div></div>
      <div class="lic-grid">
        <button class="lic-tile" type="button" data-lic-go="create"><span class="lic-emoji">📖</span><strong>Make a story</strong><small>Choose a friend and an adventure</small></button>
        <button class="lic-tile" type="button" data-lic-go="picture"><span class="lic-emoji">✨</span><strong>Make a 3D-look picture</strong><small>Create and save a layered illustration</small></button>
        <button class="lic-tile" type="button" data-lic-go="shelf"><span class="lic-emoji">📚</span><strong>My books</strong><small>Read and change saved stories</small></button>
        <button class="lic-tile" type="button" id="lic-drawing-link"><span class="lic-emoji">🎨</span><strong>Drawing studio</strong><small>Our original picture tools</small></button>
      </div><p class="lic-small lic-center">Everything begins here. Your older creations remain in the original library.</p>
    </section>
    <section class="lic-screen" data-lic-screen="create" hidden><div class="lic-back-row"><button type="button" data-lic-go="home">← Back home</button></div>
      <h2>📖 Make your own story</h2><p>Choose a friend, a place and something exciting. Then make a storybook you can change!</p>
      <div class="lic-panel"><div class="lic-fields">
        <label class="lic-field">Who is the hero?<select id="lic-hero"></select></label>
        <label class="lic-field">Where does it happen?<select id="lic-world"></select></label>
        <label class="lic-field">What's the adventure?<select id="lic-quest"></select></label>
        <label class="lic-field" id="lic-name-field" hidden>Your name for the story<input id="lic-personal-name" maxlength="40" autocomplete="off" placeholder="Your first name"></label>
        <label class="lic-field">Book title (optional)<input id="lic-story-title" maxlength="90" placeholder="My magical adventure"></label>
      </div>
      <label class="lic-field">🖼️ My own drawing or picture (optional)<input id="lic-story-photo" type="file" accept="image/*"></label>
      <p class="lic-small" id="lic-photo-status">Your picture can appear on the first page of your book. Choose a drawing or image from this device.</p>
      <p class="lic-small">Stories are made on this device from story templates. They are not live AI-generated.</p>
      <button type="button" class="lic-primary lic-big" id="lic-generate" style="width:100%">✨ Make my storybook</button></div>
    </section>
    <section class="lic-screen" data-lic-screen="reader" hidden><div class="lic-back-row"><button type="button" data-lic-go="shelf">← My books</button></div>
      <h2 class="lic-center">📖 My Magic Book</h2><div class="lic-book"><div id="lic-book-title" class="lic-book-title"></div><canvas id="lic-reader-canvas" width="1000" height="750" aria-label="Illustrated scene from your story"></canvas>
      <p id="lic-page-text" class="lic-page-words"></p><div class="lic-pager"><button type="button" id="lic-prev">← Back</button><strong id="lic-page-num">1 / 5</strong><button type="button" id="lic-next">Next →</button></div></div>
      <div class="lic-buttons"><button type="button" class="lic-green" id="lic-speak">🔊 Read to me</button><button type="button" class="lic-primary" id="lic-edit">✏️ Change my book</button></div>
      <div class="lic-panel" id="lic-editor" hidden><h2>✏️ Change this page</h2>
        <label class="lic-field">Book title<input id="lic-edit-title" maxlength="90"></label>
        <label class="lic-field">Words on this page<textarea id="lic-edit-words" maxlength="2200"></textarea></label>
        <div class="lic-buttons"><button type="button" class="lic-primary" id="lic-save-edit">💾 Save changes</button><button type="button" id="lic-cancel-edit">Cancel changes</button></div>
      </div><div class="lic-buttons"><button id="lic-print" type="button">🖨️ Print / Save PDF</button><button id="lic-download-book" type="button">⬇️ Download book</button></div><p class="lic-small lic-center">Books save on this device. Download a copy to keep it safe when changing phones.</p>
    </section>
    <section class="lic-screen" data-lic-screen="picture" hidden><div class="lic-back-row"><button type="button" data-lic-go="home">← Back home</button></div><h2>✨ Make a magical picture</h2>
      <p>Pick your friend and place. Create a layered illustration with a 3D-like depth effect and save it as a picture.</p>
      <div class="lic-panel"><div class="lic-fields"><label class="lic-field">Choose a friend<select id="lic-pic-hero"></select></label><label class="lic-field">Choose a world<select id="lic-pic-world"></select></label></div>
        <div class="lic-pic-frame"><canvas id="lic-picture-canvas" width="1000" height="750" aria-label="Preview of your magical illustration"></canvas></div>
        <div class="lic-buttons"><button type="button" id="lic-refresh-picture">✨ Update picture</button><button type="button" class="lic-primary" id="lic-save-picture">⬇️ Save PNG picture</button></div>
        <p class="lic-note lic-small">This makes a 3D-look illustration, not a true 3D model, AI-generated picture or animated movie. Those would require a separate service.</p>
      </div>
    </section>
    <section class="lic-screen" data-lic-screen="shelf" hidden><div class="lic-back-row"><button type="button" data-lic-go="home">← Back home</button></div><h2>📚 My Books</h2><div class="lic-buttons"><button type="button" data-lic-go="create" class="lic-primary">✨ Make another story</button><button id="lic-older" type="button">📂 Earlier creations</button></div><div id="lic-shelf-list"></div>
      <p class="lic-small">This shelf holds books made in the new kid-friendly creator. Earlier artwork and story drafts are still in the original creation library.</p>
    </section>
    <p id="lic-message" class="lic-notice" role="status" aria-live="polite"></p>
    <div class="lic-extra"><button type="button" id="lic-classic">🧰 Original website and older tools</button><p class="lic-small">For grown-ups: access all existing features and earlier saved creations without deleting anything.</p></div>
  </div>`;
  const returnHome=document.createElement('button');returnHome.id='lic-return-home';returnHome.textContent='🏡 Back to kid home';returnHome.type='button';
  body.append(returnHome);returnHome.addEventListener('click',()=>navigate('home'));
  const oldHeader=document.querySelector('header.topbar');
  if(oldHeader)oldHeader.after(hub);else body.prepend(hub);
  body.classList.add('lic-kid-first');
  const screens=[...hub.querySelectorAll('[data-lic-screen]')];
  function note(message){$('lic-message').textContent=message||'';}
  function navigate(name){stopReading();screens.forEach(s=>s.hidden=s.dataset.licScreen!==name);hub.hidden=false;body.classList.add('lic-kid-first');$('lic-editor').hidden=true;note('');if(name==='shelf')showShelf();if(name==='picture')renderPicture();window.scrollTo({top:0,behavior:'instant'});}
  function classic(selector){stopReading();body.classList.remove('lic-kid-first');hub.hidden=true;let target=selector?$(selector):document.querySelector('main#top');if(target){target.hidden=false;requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));}else window.scrollTo({top:0,behavior:'instant'});}
  hub.querySelectorAll('[data-lic-go]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.licGo)));
  $('lic-home').addEventListener('click',()=>navigate('home'));
  $('lic-classic').addEventListener('click',()=>classic(null));
  $('lic-drawing-link').addEventListener('click',()=>classic('lic-easy-art'));
  $('lic-older').addEventListener('click',()=>{classic('easy-creations-hub');const b=$('easy-my-creations');if($('easy-creations-library')?.hidden)b?.click();});
  const friendMap=Object.fromEntries(friends.map(x=>[x.id,x]));
  const worldMap=Object.fromEntries(worlds.map(x=>[x.id,x]));
  function opts(select,items){items.forEach(item=>{const o=document.createElement('option');o.value=item.id;o.textContent=item.emoji+' '+item.name;select.append(o);});}
  opts($('lic-hero'),friends);opts($('lic-pic-hero'),friends.filter(x=>x.id!=='me'));
  opts($('lic-world'),worlds);opts($('lic-pic-world'),worlds);opts($('lic-quest'),quests);
  $('lic-hero').addEventListener('change',()=>$('lic-name-field').hidden=$('lic-hero').value!=='me');
  function readBooks(){try{const value=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(value)?value.filter(b=>b&&Array.isArray(b.pages)).slice(0,80):[];}catch(_){return [];}}
  let books=readBooks(),active=null,page=0;const id=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(books.slice(0,35)));note('✅ Saved on this device.');return true;}catch(_){note('⚠️ Could not save on this device. Download a copy of your book.');return false;}}
  function saveActive(){if(!active)return false;active.updated=Date.now();const i=books.findIndex(b=>b.id===active.id);if(i<0)books.unshift(active);else books[i]=active;books.sort((a,b)=>b.updated-a.updated);return persist();}
  function escapeHTML(s){return String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function storyPages(hero,world,quest){
    const place=world.name.toLowerCase();const q={
      key:{thing:'a tiny golden key',mystery:'a little locked door hidden behind bright flowers',problem:'Nobody knew what the key was for.',action:'They tried the key in the lock, and a gentle golden light shone through the doorway.',end:'Inside was a little room filled with drawings made by the kingdom’s friends.'},
      lost:{thing:'a little lost friend',mystery:'a soft voice calling for help',problem:'The little friend could not find the way home.',action:'They followed a trail of friendly footprints and asked the birds for directions.',end:'They found the right path, and the little friend ran home for a happy hug.'},
      star:{thing:'a twinkling fallen star',mystery:'a bright sparkle among the flowers',problem:'The star had forgotten how to reach the night sky.',action:'They climbed the highest hill and made a ladder of shimmering moonbeams.',end:'The little star floated home and twinkled three times to say thank you.'},
      party:{thing:'a secret party invitation',mystery:'a ribbon-covered envelope',problem:'Nobody knew who the surprise party was for.',action:'They decorated the clearing with lanterns, ribbons and bright balloons.',end:'All their friends appeared singing: the party was for everyone!' },
      bridge:{thing:'a broken little bridge',mystery:'a stream with no safe way across',problem:'A family of tiny animals was waiting on the other side.',action:'They gathered sturdy twigs and worked together to build a safe bridge.',end:'Every animal crossed safely, and everyone celebrated their teamwork.'},
      wish:{thing:'a glowing wish stone',mystery:'a warm light beneath a tree',problem:'The stone could grant only one special wish.',action:'They listened to what the other friends needed before making a choice.',end:'They wished for every friend to have someone kind beside them.'}
    }[quest.id]||{};
    const heroName=hero.name;
    return [
      `One beautiful morning, ${heroName} went exploring in the ${place}. Everything sparkled with possibility, and a new adventure was about to begin.`,
      `Just beyond a winding path, ${heroName} discovered ${q.thing}. There was ${q.mystery}. What could it mean?`,
      `${q.problem} For a moment, ${heroName} felt unsure. Then a gentle voice said, “We can find a way if we help one another.”`,
      `${q.action} It wasn't easy at first, but ${heroName} kept trying. With kindness and a clever idea, everything began to change.`,
      `${q.end} ${heroName} smiled and waved to the friends. The biggest magic wasn't the adventure at all — it was being brave and kind together. The end. 💜`
    ];
  }
  let storyPhoto=null;
  $('lic-story-photo').addEventListener('change',async event=>{
    const file=event.target.files?.[0];storyPhoto=null;
    if(!file)return;
    if(!/^image\/(jpeg|png|webp|gif)$/.test(file.type)){$('lic-photo-status').textContent='Please choose a JPG, PNG, GIF or WebP picture.';return;}
    if(file.size>12*1024*1024){$('lic-photo-status').textContent='Please choose a picture smaller than 12 MB.';return;}
    try{
      const src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});
      const img=await loadImage(src);if(!img)throw Error('Cannot read image');
      const c=document.createElement('canvas'),ratio=Math.min(1,850/Math.max(img.width,img.height));
      c.width=Math.max(1,Math.round(img.width*ratio));c.height=Math.max(1,Math.round(img.height*ratio));
      c.getContext('2d').drawImage(img,0,0,c.width,c.height);
      storyPhoto=c.toDataURL('image/jpeg',.75);
      $('lic-photo-status').textContent='✅ Your picture is ready for page one!';
    }catch(_){$('lic-photo-status').textContent='Could not open the picture. Try JPG or PNG.';}
  });
  $('lic-generate').addEventListener('click',()=>{
    const chosen=friendMap[$('lic-hero').value]||friends[0],world=worldMap[$('lic-world').value]||worlds[0];
    const quest=quests.find(q=>q.id===$('lic-quest').value)||quests[0];
    const hero={...chosen,name:chosen.id==='me'?($('lic-personal-name').value.trim().slice(0,40)||'Our little hero'):chosen.name};
    active={id:id(),updated:Date.now(),title:$('lic-story-title').value.trim().slice(0,90)||`${hero.name} and ${quest.name.toLowerCase()}`,hero:hero.id,heroName:hero.name,world:world.id,quest:quest.id,pages:storyPages(hero,world,quest),coverPhoto:storyPhoto||null};
    page=0;saveActive();openReader();
  });
  const imageCache=new Map();
  function loadImage(src){if(!src)return Promise.resolve(null);if(imageCache.has(src))return imageCache.get(src);
    const promise=new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>resolve(null);image.src=src;});imageCache.set(src,promise);return promise;}
  function drawCover(ctx,src,width,height){const ratio=Math.max(width/src.width,height/src.height),w=src.width*ratio,h=src.height*ratio;
    ctx.drawImage(src,(width-w)/2,(height-h)/2,w,h);}
  async function drawScene(canvas,heroId,worldId,chapter=0,label=''){
    const ctx=canvas.getContext('2d');if(!ctx)return;
    const W=canvas.width,H=canvas.height,world=worldMap[worldId]||worlds[0],friend=friendMap[heroId]||friends[0];
    const palette={castle:['#c9b5ff','#f8deff','#a7eac9'],forest:['#8fe8cb','#d6f5bb','#64bb8e'],sea:['#93e9f3','#c5f7fa','#4ea5d3'],space:['#28325e','#7368be','#111b46'],garden:['#ffd1ee','#fff0b5','#95dbc7'],snow:['#b5defb','#f1f8ff','#9abfdb']}[world.id];
    const grad=ctx.createLinearGradient(0,0,W,H);grad.addColorStop(0,palette[0]);grad.addColorStop(.65,palette[1]);grad.addColorStop(1,palette[2]);ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
    const backdrop=(world.id==='castle'?await loadImage(art.castle):null);
    if(backdrop){ctx.save();ctx.globalAlpha=.55;drawCover(ctx,backdrop,W,H);ctx.restore();}
    ctx.save();
    for(let j=0;j<13;j++){const x=((j*251+chapter*107)%W),y=70+(j*127+chapter*31)%(H-200);const r=4+(j%4)*4;ctx.fillStyle='rgba(255,255,255,.7)';ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
    ctx.fillStyle=world.id==='space'?'rgba(46,54,103,.6)':'rgba(104,158,126,.19)';
    ctx.beginPath();ctx.ellipse(W*.47,H*1.05,W*.9,H*.39,0,0,Math.PI*2);ctx.fill();
    ctx.restore();
    const hero=await loadImage(art[friend.asset]);
    ctx.save();ctx.translate(W*.52,H*.53);ctx.fillStyle='rgba(35,22,65,.24)';ctx.beginPath();ctx.ellipse(4,H*.32,W*.22,31,0,0,Math.PI*2);ctx.fill();
    if(hero){const size=Math.min(W*.65,H*.78);const ratio=Math.min(size/hero.width,size/hero.height);
      const w=hero.width*ratio,h=hero.height*ratio;ctx.shadowColor='rgba(47,28,81,.32)';ctx.shadowBlur=36;ctx.shadowOffsetY=18;ctx.drawImage(hero,-w/2,-h/2,w,h);
    }else{ctx.font=`${Math.round(H*.41)}px system-ui,Apple Color Emoji,Segoe UI Emoji`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowBlur=25;ctx.shadowColor='#7050a0';ctx.fillText(friend.emoji,0,0);}
    ctx.restore();
    ctx.save();const ribbon=ctx.createLinearGradient(0,H-95,W,H-95);ribbon.addColorStop(0,'rgba(255,255,255,.85)');ribbon.addColorStop(1,'rgba(250,238,255,.86)');ctx.fillStyle=ribbon;ctx.fillRect(0,H-90,W,90);
    ctx.font='bold 30px system-ui';ctx.textAlign='center';ctx.fillStyle='#49316c';ctx.fillText((label||world.emoji+' '+world.name).slice(0,38),W/2,H-34,W-35);ctx.restore();
  }
  let painting=0;
  async function paintBook(){if(!active)return;const token=++painting;
    if(page===0&&active.coverPhoto){
      const c=$('lic-reader-canvas'),ctx=c.getContext('2d'),photo=await loadImage(active.coverPhoto);
      if(photo){ctx.fillStyle='#f4e7ff';ctx.fillRect(0,0,c.width,c.height);
        const r=Math.min((c.width-60)/photo.width,(c.height-60)/photo.height);const w=r*photo.width,h=r*photo.height;
        ctx.shadowBlur=22;ctx.shadowColor='#5b398c55';ctx.drawImage(photo,(c.width-w)/2,(c.height-h)/2,w,h);}
      else await drawScene(c,active.hero,active.world,page,'My magical picture');
    }else await drawScene($('lic-reader-canvas'),active.hero,active.world,page,(worldMap[active.world]?.emoji||'✨')+' '+(worldMap[active.world]?.name||'Magic'));
    if(token!==painting)return;
  }
  function openReader(){if(!active)return;page=Math.max(0,Math.min(page,active.pages.length-1));navigate('reader');paintReader();}
  function paintReader(){if(!active)return;$('lic-book-title').textContent=active.title;
    $('lic-page-text').textContent=active.pages[page]||'';$('lic-page-num').textContent=`${page+1} / ${active.pages.length}`;
    $('lic-prev').disabled=page===0;$('lic-next').disabled=page>=active.pages.length-1;paintBook();}
  function stopReading(){if('speechSynthesis' in window){window.speechSynthesis.cancel();}$('lic-speak').textContent='🔊 Read to me';}
  function gotoPage(next){if(!$('lic-editor').hidden)commitEdits();stopReading();page=Math.min(active.pages.length-1,Math.max(0,next));paintReader();}
  $('lic-prev').onclick=()=>gotoPage(page-1);$('lic-next').onclick=()=>gotoPage(page+1);
  $('lic-edit').onclick=()=>{$('lic-editor').hidden=false;$('lic-edit-title').value=active.title;$('lic-edit-words').value=active.pages[page];$('lic-editor').scrollIntoView({behavior:'smooth',block:'nearest'});};
  function commitEdits(){if(!active)return;active.title=$('lic-edit-title').value.trim().slice(0,90)||active.title;
    active.pages[page]=$('lic-edit-words').value.trim().slice(0,2200)||active.pages[page];saveActive();$('lic-editor').hidden=true;paintReader();}
  $('lic-save-edit').onclick=commitEdits;$('lic-cancel-edit').onclick=()=>$('lic-editor').hidden=true;
  $('lic-speak').onclick=()=>{
    if(!('speechSynthesis' in window)){note('Read aloud is not supported in this browser.');return;}
    if(speechSynthesis.speaking){stopReading();return;}
    const u=new SpeechSynthesisUtterance(active.pages[page]);u.lang='en-AU';u.rate=.83;u.onend=()=>{$('lic-speak').textContent='🔊 Read to me';};
    u.onerror=()=>{$('lic-speak').textContent='🔊 Read to me';};
    $('lic-speak').textContent='⏹ Stop reading';speechSynthesis.speak(u);
  };
  function showShelf(){const el=$('lic-shelf-list');el.replaceChildren();books=readBooks();
    if(!books.length){const empty=document.createElement('p');empty.className='lic-note';empty.textContent='No books yet. Tap Make another story to begin!';el.append(empty);return;}
    books.forEach(book=>{const card=document.createElement('div');card.className='lic-shelf-item';const left=document.createElement('div');left.className='lic-shelf-title';left.textContent='📖 '+book.title;
      const buttons=document.createElement('div');buttons.className='lic-buttons';const open=document.createElement('button');open.textContent='📖 Read';open.className='lic-primary';open.onclick=()=>{active=book;page=0;openReader();};
      const del=document.createElement('button');del.textContent='🗑️ Delete';del.className='lic-danger';del.onclick=()=>{if(!confirm('Delete this saved book? This cannot be undone.'))return;books=books.filter(b=>b.id!==book.id);persist();showShelf();};
      buttons.append(open,del);card.append(left,buttons);el.append(card);});
  }
  function triggerDownload(blob,filename){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.style.display='none';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),15000);}
  const safeName=s=>String(s||'my-magic-book').replace(/[^a-zA-Z0-9_-]+/g,'-').slice(0,44)||'my-magic-book';
  function standaloneBook(book){const pictures=book.pages.map((_,i)=>{
     const a=art[(friendMap[book.hero]||{}).asset]||'';const background=book.world==='castle'?(art.castle||''):'';
     const bg=background?`background-image:linear-gradient(#f8f0ff83,#f8f0ff83),url('${background}')`:'';
     const graphic=i===0&&book.coverPhoto?`<img src="${book.coverPhoto}" alt="My uploaded picture"/>`:a?`<img src="${a}" alt="${escapeHTML(friendMap[book.hero]?.name||'Friend')}"/>`:`<span>${escapeHTML(friendMap[book.hero]?.emoji||'⭐')}</span>`;
     return `<section class="page"><h2>${escapeHTML(book.title)}</h2><div class="art" style="${bg}">${graphic}</div><div class="words">${escapeHTML(book.pages[i])}</div><small>Page ${i+1} of ${book.pages.length}</small></section>`;}).join('');
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHTML(book.title)}</title><style>*{box-sizing:border-box}body{margin:0;background:#f3eaff;font-family:system-ui;color:#39255b;text-align:center}.page{width:min(760px,96%);margin:25px auto;padding:22px;background:#fff;border:2px solid #dcbff7;border-radius:24px;break-after:page}h2{font-size:clamp(25px,6vw,38px)}.art{height:350px;border-radius:18px;background-color:#ebdbff;background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;position:relative}.art img{max-width:72%;max-height:92%;filter:drop-shadow(6px 14px 14px #553a7999)}.art span{font-size:170px}.words{font-size:clamp(18px,3vw,24px);line-height:1.6;padding:15px;white-space:pre-wrap}@media print{body{background:#fff}.page{border:0;box-shadow:none;margin:0 auto;page-break-after:always}}</style></head><body>${pictures}</body></html>`;
  }
  $('lic-download-book').onclick=()=>{if(!active)return;if(!$('lic-editor').hidden)commitEdits();triggerDownload(new Blob([standaloneBook(active)],{type:'text/html;charset=utf-8'}),safeName(active.title)+'.html');note('⬇️ Book downloaded. Open it later to read offline.');};
  $('lic-print').onclick=()=>{if(!active)return;if(!$('lic-editor').hidden)commitEdits();const html=standaloneBook(active);
    const win=window.open('','_blank');if(!win){note('Allow pop-ups for printing, or use Download book.');return;}win.document.open();win.document.write(html);win.document.close();win.focus();setTimeout(()=>win.print(),700);};
  let picRendering=0;
  async function renderPicture(){const run=++picRendering;await drawScene($('lic-picture-canvas'),$('lic-pic-hero').value,$('lic-pic-world').value,2,'✨ My magical picture');if(run!==picRendering)return;}
  $('lic-refresh-picture').onclick=renderPicture;
  $('lic-pic-hero').onchange=renderPicture;$('lic-pic-world').onchange=renderPicture;
  $('lic-save-picture').onclick=async()=>{await renderPicture();$('lic-picture-canvas').toBlob(blob=>{if(blob){triggerDownload(blob,'little-imagination-picture.png');note('✅ Your PNG picture has been downloaded!');}else note('Could not save this picture. Please try again.');},'image/png');};
  $('lic-family-art').src=art.family||'lic_cute_art_sheet.jpg';
  navigate('home');
})();

/* Little Imagination Club — Magic Creator Workstation 2.0, child-friendly touch editor
 * Add below current drawing/mix scripts: <script src="magic_workstation_v2.js"></script>
 * All artwork remains in browser; saved copies download as PNG.
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
    <h3>🦄✨ My Magical Creator Studio</h3>
    <p class="easy-intro">1. Add pictures or draw • 2. Pick a tool • 3. Save your masterpiece!</p>
    <div class="easy-row easy-start">
      <label class="easy-file easy-button">🖼️ Add my pictures
        <input id="easy-files" type="file" accept="image/*" multiple hidden>
      </label>
      <button id="easy-fresh" type="button">📄 Blank page</button>
    </div>
    <div class="easy-row">
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
      </select>
      <button id="easy-add-friend" type="button">➕ Add cute friend</button>
    </div>
    <details class="easy-fun">
      <summary>🌈 Pick a magical background</summary>
      <div class="easy-gallery" id="easy-scenes"></div>
    </details>
    <details class="easy-fun">
      <summary>🎀 Choose from 68 stickers & accessories</summary>
      <div class="easy-sticker-gallery" id="easy-stickers"></div>
    </details>
    <h4>What do you want to do? Tap a tool!</h4>
    <div class="easy-tools" role="group" aria-label="Editing tools">
      <button data-easy-tool="move" aria-pressed="true">👆 Move</button>
      <button data-easy-tool="draw" aria-pressed="false">🖌️ Draw</button>
      <button data-easy-tool="cut" aria-pressed="false">✂️ Cut</button>
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
    <div class="easy-canvas-wrap">
      <canvas id="easy-canvas" width="800" height="600" aria-label="Drag or draw on your magical canvas"></canvas>
    </div>
    <p id="easy-status" role="status">Ready for your next masterpiece! 💜</p>
    <div class="easy-selected" id="easy-selected">
      <h4>✨ Change this piece</h4>
      <p class="easy-small">Drag it to move • resize it • turn it • send it behind!</p>
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
        <button data-easy-act="delete">🗑️ Remove</button>
      </div>
    </div>
    <div class="easy-row easy-end">
      <button id="easy-undo" type="button">↩️ Undo</button>
      <button id="easy-redo" type="button">↪️ Redo</button>
      <button id="easy-save" type="button">💜 Save my picture</button>
    </div>
    <p class="easy-small">Your original uploads stay unchanged. Cut makes rectangular pieces; Colour part paints where you touch; Fill colour works best on simple outlined drawings. Undo is always there! 💜</p>
  `;
  const style = document.createElement('style');
  style.textContent = `
    #lic-easy-art, #lic-easy-art *{box-sizing:border-box}
    #lic-easy-art{background:#fff2fa;color:#3e2d62;border:3px solid #e4c4f5;
      border-radius:26px;padding:16px;margin:20px 0;min-width:0;max-width:100%;}
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
    #lic-easy-art .easy-tools{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
    #lic-easy-art .easy-tools button{padding:11px 3px;font-size:clamp(11px,3.2vw,16px);min-width:0}
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
    #lic-easy-art .easy-canvas-wrap{border:3px solid #d7b6eb;background:white;border-radius:20px;overflow:hidden;}
    #lic-easy-art canvas{display:block;width:100%;height:auto;aspect-ratio:4 / 3;touch-action:none;user-select:none}
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
  let selected = null, tool = 'move', interaction = null, draft = null;
  let history = [{pieces:[],scene:-1}], step = 0, changed = false;
  const message = s => { $('easy-status').textContent = s; };
  const hints = {
    move:'👆 Tap a picture, sticker or drawn line and drag to move it!',
    draw:'🖌️ Draw with your finger. Tap Move to pick up your new line.',
    cut:'✂️ Drag a box around the part you want to lift. Now drag that piece!',
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
    controls();
  }
  function rollback(n) {
    const snap = history[n];
    scene = snap.scene;
    items.splice(0, items.length, ...cloneItems(snap.pieces));
    selected = null;
    interaction = null;
    draft = null;
    updateSceneButtons(); controls(); render();
  }
  function chosen() { return items.find(o => o.id === selected); }
  function controls() {
    ui.querySelectorAll('[data-easy-tool]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.easyTool===tool)));
    $('easy-help').textContent = hints[tool];
    $('easy-selected').hidden = !chosen();
    ui.querySelectorAll('.easy-swatch').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.color === $('easy-color').value)));
    $('easy-undo').disabled = step <= 0;
    $('easy-redo').disabled = step >= history.length - 1;
    $('easy-white').disabled = tool !== 'cut';
  }
  const makeId = () => Math.random().toString(36).slice(2);
  function makeCanvas(w,h){const c=document.createElement('canvas'); c.width=w; c.height=h; return c;}
  function pos(e){ const r=canvas.getBoundingClientRect(); return {
    x:(e.clientX-r.left)*W/r.width,
    y:(e.clientY-r.top)*H/r.height
  }; }
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
    if (draft && tool==='cut' && draft.length===2) {
      const a=draft[0],b=draft[1];
      ctx.save();ctx.strokeStyle='#793fb4';ctx.lineWidth=3;ctx.setLineDash([10,8]);
      ctx.strokeRect(a.x,a.y,b.x-a.x,b.y-a.y);ctx.restore();
    }
    const o=chosen();
    if (o && tool==='move') {
      ctx.save();ctx.translate(o.x,o.y);ctx.rotate(o.rot*Math.PI/180);
      ctx.setLineDash([9,7]);ctx.strokeStyle='#9255c6';ctx.lineWidth=3;
      ctx.strokeRect(-o.w*o.scale/2,-o.h*o.scale/2,o.w*o.scale,o.h*o.scale);
      ctx.restore();
    }
  }
  function local(o,p){
    const dx=p.x-o.x,dy=p.y-o.y,r=o.rot*Math.PI/180;
    return {x:(dx*Math.cos(r)+dy*Math.sin(r))/o.scale+o.w/2,
            y:(-dx*Math.sin(r)+dy*Math.cos(r))/o.scale+o.h/2};
  }
  function hit(p){
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
  function setTool(next) {tool=next;interaction=null;draft=null;controls();render();
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
  canvas.addEventListener('pointerdown',e=>{
    if(e.button!==undefined && e.button!==0) return;
    e.preventDefault();const p=pos(e);canvas.setPointerCapture(e.pointerId);
    if(tool==='draw'){draft=[p];interaction={kind:'draw'};render();return;}
    if(tool==='cut'){draft=[p,p];interaction={kind:'cut'};render();return;}
    if(tool==='erase' || tool==='paint' || tool==='fill'){
      const hitItem=chosen() || hit(p);
      if(!hitItem){message('First tap Move and select a picture or line.');return;}
      selected=hitItem.id;
      // Separate the image layer before altering pixels; Undo keeps its earlier copy.
      interaction={kind:tool,id:hitItem.id};
      if(tool==='erase')brushErase(items.find(o=>o.id===hitItem.id),p);
      else brushColour(items.find(o=>o.id===hitItem.id),p,tool==='fill');
      if(tool==='fill'){checkpoint();interaction=null;message('Colour changed! Tap Undo if it spread too far.');}
      render();return;
    }
    const o=hit(p);selected=o?.id||null;controls();render();
    interaction=o?{kind:'move',id:o.id,x:p.x-o.x,y:p.y-o.y,startX:o.x,startY:o.y}:null;
    if(o){const i=items.findIndex(x=>x.id===o.id);items[i]={...items[i]};}
    if(!o)message('Tap directly on a picture or coloured line to select it.');
  });
  canvas.addEventListener('pointermove',e=>{
    if(!interaction)return;e.preventDefault();const p=pos(e);
    if(interaction.kind==='draw'){draft.push(p);render();return;}
    if(interaction.kind==='cut'){draft[1]=p;render();return;}
    const o=items.find(x=>x.id===interaction.id);if(!o)return;
    if(interaction.kind==='move'){o.x=p.x-interaction.x;o.y=p.y-interaction.y;render();}
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
    items.push(o);selected=o.id;tool='move';
    checkpoint();render();message('Your line is ready! 👆 Drag it to move it or choose Recolour line.');
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
    message('✂️ Cut out! Drag this piece wherever you want.');
  }
  canvas.addEventListener('pointerup',()=>{
    const i=interaction;interaction=null;if(!i)return;
    if(i.kind==='draw'){const points=draft;draft=null;if(points?.length)finishDraw(points);return;}
    if(i.kind==='cut'){const points=draft;draft=null;if(points?.length===2)cutSelected(points[0],points[1]);return;}
    if(i.kind==='erase'||i.kind==='paint'){
      checkpoint();render();message(i.kind==='paint'?'You changed the colour! 🌈':'Erased! Tap Undo if you want it back.');return;}
    if(i.kind==='move'){
      const o=chosen();if(o&&(o.x!==i.startX||o.y!==i.startY))checkpoint();
      render();if(o)message('Great moving! You can resize, turn or copy it below.');
    }
  });
  canvas.addEventListener('pointercancel',()=>{interaction=null;draft=null;render();});
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
      if(action==='smaller')n.scale=Math.max(.1,n.scale*.8);
      if(action==='bigger')n.scale=Math.min(8,n.scale*1.25);
      if(action==='left')n.rot-=15;
      if(action==='right')n.rot+=15;
      items[index]=n;
    }
    checkpoint();render();message('Looking cute! 💜 Keep creating.');
  }));
  $('easy-undo').addEventListener('click',()=>{if(step>0)rollback(--step);});
  $('easy-redo').addEventListener('click',()=>{if(step<history.length-1)rollback(++step);});
  $('easy-fresh').addEventListener('click',()=>{
    if(changed && !window.confirm('Start a new page? Save your picture first if you want to keep it.'))return;
    items.length=0;scene=-1;history=[{pieces:[],scene:-1}];step=0;selected=null;changed=false;tool='move';updateSceneButtons();
    controls();render();message('Fresh page! Add pictures or start drawing. 🦋');
  });
  $('easy-save').addEventListener('click',()=>{
    const image=makeCanvas(W,H),out=image.getContext('2d');paintBackground(out);
    items.forEach(o=>paintItem(o,out));
    const a=document.createElement('a');a.download='my-magical-masterpiece.png';
    a.href=image.toDataURL('image/png');a.click();changed=false;
    message('💜 Saved a copy! Your original pictures remain unchanged.');
  });
  controls();render();
})();

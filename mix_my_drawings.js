/* Little Imagination Club — Mix My Drawings v1
   Multiple drawings + freehand strokes + optional Club character.
   All editing happens locally in the browser; no images are sent to a server.
   Add <script src="mix_my_drawings.js"></script> above </body>.
*/
(() => {
  if (document.getElementById('lic-mix-studio')) return;
  const host = document.querySelector('#create .creator-fields') ||
    document.querySelector('#create') || document.querySelector('main');
  if (!host) return;
  const css = document.createElement('style');
  css.textContent = `
    #lic-mix-studio,#lic-mix-studio *{box-sizing:border-box}
    #lic-mix-studio{background:#fff3fc;border:2px solid #e2c6f8;
      color:#392454;border-radius:24px;padding:15px;margin:20px 0;min-width:0;max-width:100%}
    #lic-mix-studio h3{margin:3px 0 6px;font-size:1.3rem}
    #lic-mix-studio p{margin:6px 0 12px;font-size:.9rem}
    #lic-mix-studio .mix-row{display:flex;flex-wrap:wrap;gap:7px;margin:9px 0;align-items:center}
    #lic-mix-studio button,#lic-mix-studio .mix-upload{border:2px solid #d9bdee;
      border-radius:12px;background:white;color:#56317b;font:inherit;font-weight:700;
      font-size:13px;padding:9px;min-height:42px;cursor:pointer}
    #lic-mix-studio button:disabled{opacity:.42;cursor:not-allowed}
    #lic-mix-studio button[aria-pressed="true"]{background:#7654bc;color:white}
    #lic-mix-studio .mix-upload{display:inline-flex;align-items:center}
    #lic-mix-studio select,#lic-mix-studio input[type=color]{max-width:100%;min-height:36px}
    #lic-mix-studio label.mix-setting{font-size:13px;display:flex;align-items:center;gap:6px}
    #lic-mix-studio .mix-setting input[type=range]{width:105px;max-width:35vw}
    #lic-mix-studio #mix-canvas{display:block;width:100%;height:auto;
      aspect-ratio:4/3;border:3px solid #e1c7fa;border-radius:17px;
      background:#fff;touch-action:none;user-select:none}
    #lic-mix-studio .mix-help{font-size:12px;color:#6d587a}
    #lic-mix-studio #mix-status{min-height:1.4em}
  `;
  document.head.appendChild(css);

  const section = document.createElement('section');
  section.id = 'lic-mix-studio';
  section.innerHTML = `
    <h3>🧩 Mix My Drawings</h3>
    <p>Bring butterflies, caterpillars, gardens and all your drawings together!</p>
    <div class="mix-row">
      <label class="mix-upload">🖼️ Add pictures
        <input id="mix-files" type="file" accept="image/*" multiple hidden>
      </label>
      <button type="button" id="mix-clear">📄 New page</button>
      <button type="button" id="mix-move" aria-pressed="true">👆 Move</button>
      <button type="button" id="mix-draw" aria-pressed="false">🖌️ Draw</button>
    </div>
    <div class="mix-row">
      <label class="mix-setting">🎨 Colour <input id="mix-color" type="color" value="#e977bb"></label>
      <label class="mix-setting">Brush size <input id="mix-brush" type="range" min="3" max="35" value="9"></label>
    </div>
    <div class="mix-row">
      <label class="mix-setting">🦊 Club friend
        <select id="mix-friend">
          <option value="0">Kyle the Fox</option><option value="1">Rainbow Unicorn</option>
          <option value="2">Baby Dragon</option><option value="3">Bouncy Bunny</option>
          <option value="4">Playful Kitten</option><option value="5">Happy Puppy</option>
          <option value="6">Sweet Deer</option><option value="7">Penguin</option>
          <option value="8">Koala</option><option value="9">Turtle</option>
          <option value="10">Hedgehog</option><option value="11">Lion</option>
        </select>
      </label>
      <button id="mix-add-friend" type="button">✨ Add friend</button>
    </div>
    <canvas id="mix-canvas" width="900" height="675" aria-label="Mix and arrange your artwork"></canvas>
    <p id="mix-status" role="status">Tap Add pictures to choose two or more drawings.</p>
    <div class="mix-row">
      <label class="mix-setting">Size <input id="mix-size" type="range" min="20" max="300" value="100" disabled></label>
      <label class="mix-setting">Turn <input id="mix-angle" type="range" min="-180" max="180" value="0" disabled></label>
    </div>
    <div class="mix-row">
      <button id="mix-forward" type="button" disabled>⬆️ Bring forward</button>
      <button id="mix-back" type="button" disabled>⬇️ Send behind</button>
      <button id="mix-copy" type="button" disabled>🧩 Copy piece</button>
      <button id="mix-remove" type="button" disabled>🗑️ Remove piece</button>
    </div>
    <div class="mix-row">
      <button id="mix-undo" type="button" disabled>↩️ Undo</button>
      <button id="mix-redo" type="button" disabled>↪️ Redo</button>
      <button id="mix-save" type="button">💜 Save combined picture</button>
    </div>
    <p class="mix-help">Add several pictures, tap one to select it, then drag, resize or turn it.
      Draw right on the page too! Originals stay unchanged. White paper behind drawings
      remains visible in this first version; magic cut-out comes next.</p>
  `;
  const original = document.getElementById('lic-drawing-studio');
  if (original && original.parentNode === host) original.before(section);
  else host.appendChild(section);

  const $ = id => section.querySelector('#' + id);
  const cvs = $('mix-canvas'), ctx = cvs.getContext('2d');
  if (!ctx) return;
  const W=cvs.width,H=cvs.height;
  const items = [];
  let selected=null, mode='move', gesture=null, path=null, dirty=false;
  let history=[], cursor=-1;
  const status=message => {$('mix-status').textContent=message;};
  const cloneItems=()=>items.map(o=>({...o, img:o.img}));
  function checkpoint(){
    history=history.slice(0,cursor+1);
    history.push(cloneItems());
    if(history.length>24)history.shift();
    cursor=history.length-1;
    dirty=true; controls();
  }
  function restore(step){
    items.splice(0,items.length,...step.map(o=>({...o,img:o.img})));
    selected=null;gesture=null;render();controls();
  }
  function selectedPiece(){return items.find(o=>o.id===selected);}
  function controls(){
    const o=selectedPiece();
    for(const name of ['mix-size','mix-angle','mix-forward','mix-back','mix-copy','mix-remove'])
      $(name).disabled=!o;
    if(o){$('mix-size').value=Math.round(o.scale*100);$('mix-angle').value=Math.round(o.angle);}
    $('mix-undo').disabled=cursor<=0;
    $('mix-redo').disabled=cursor>=history.length-1;
    $('mix-move').setAttribute('aria-pressed',String(mode==='move'));
    $('mix-draw').setAttribute('aria-pressed',String(mode==='draw'));
  }
  function paintPiece(o,target){
    target.save();target.translate(o.x,o.y);target.rotate(o.angle*Math.PI/180);
    target.drawImage(o.img,-o.w*o.scale/2,-o.h*o.scale/2,o.w*o.scale,o.h*o.scale);
    target.restore();
  }
  function render(){
    ctx.fillStyle='#fffdfc';ctx.fillRect(0,0,W,H);
    items.forEach(o=>paintPiece(o,ctx));
    if(path && path.length){
      ctx.save();ctx.lineWidth=Number($('mix-brush').value);ctx.lineCap='round';
      ctx.lineJoin='round';ctx.strokeStyle=$('mix-color').value;
      ctx.beginPath();path.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
      if(path.length===1)ctx.lineTo(path[0].x+.1,path[0].y+.1);
      ctx.stroke();ctx.restore();
    }
    const o=selectedPiece();
    if(o && mode==='move'){
      ctx.save();ctx.translate(o.x,o.y);ctx.rotate(o.angle*Math.PI/180);
      ctx.setLineDash([12,8]);ctx.lineWidth=3;ctx.strokeStyle='#7949c0';
      ctx.strokeRect(-o.w*o.scale/2,-o.h*o.scale/2,o.w*o.scale,o.h*o.scale);
      ctx.restore();
    }
  }
  function pos(e){const r=cvs.getBoundingClientRect();return {
    x:(e.clientX-r.left)*W/r.width,y:(e.clientY-r.top)*H/r.height
  };}
  function hit(p){
    for(let i=items.length-1;i>=0;i--){
      const o=items[i], dx=p.x-o.x,dy=p.y-o.y,a=o.angle*Math.PI/180;
      const x=dx*Math.cos(a)+dy*Math.sin(a),y=-dx*Math.sin(a)+dy*Math.cos(a);
      if(Math.abs(x)<=o.w*o.scale/2 && Math.abs(y)<=o.h*o.scale/2) return o;
    }
    return null;
  }
  function newId(){return Math.random().toString(36).slice(2)+Date.now().toString(36);}
  function addImage(img,name,w,h){
    if(items.length>=25){status('Maximum 25 pieces. Remove one before adding more.');return;}
    const maxW=W*.56,maxH=H*.68,fit=Math.min(maxW/w,maxH/h,1.5);
    const o={id:newId(),img,name,x:W/2+(items.length%4)*32-48,
      y:H/2+(items.length%3)*24-24,w:w*fit,h:h*fit,angle:0,scale:1};
    items.push(o);selected=o.id;mode='move';checkpoint();render();
    status(name+' added! Drag it, resize or turn it.');
  }
  function loadImage(url){return new Promise((resolve,reject)=>{
    const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=url;
  });}
  async function addFile(file){
    if(!file.type.startsWith('image/'))return;
    if(file.size>12*1024*1024){status('That picture is too large (12 MB maximum).');return;}
    const url=URL.createObjectURL(file);
    try{
      const originalImg=await loadImage(url);
      const ratio=Math.min(1,1000/Math.max(originalImg.width,originalImg.height));
      const width=Math.max(1,Math.round(originalImg.width*ratio));
      const height=Math.max(1,Math.round(originalImg.height*ratio));
      const work=document.createElement('canvas');work.width=width;work.height=height;
      work.getContext('2d').drawImage(originalImg,0,0,width,height);
      const image=await loadImage(work.toDataURL('image/png'));
      addImage(image,file.name,width,height);
    }catch(err){status('Could not open '+file.name+'. Try a JPG or PNG.');}
    finally{URL.revokeObjectURL(url);}
  }
  $('mix-files').addEventListener('change',async e=>{
    const files=Array.from(e.target.files||[]).slice(0,10);
    if(!files.length)return;
    status('Adding your pictures…');
    for(const file of files)await addFile(file);
    e.target.value='';
  });
  $('mix-add-friend').addEventListener('click',async()=>{
    try{
      const img=await loadImage('lic_cute_art_sheet.jpg');
      const i=Number($('mix-friend').value),tw=img.width/4,th=img.height/5;
      const piece=document.createElement('canvas');piece.width=300;piece.height=300;
      piece.getContext('2d').drawImage(img,(i%4)*tw,Math.floor(i/4)*th,tw,th,0,0,300,300);
      const copy=await loadImage(piece.toDataURL('image/png'));
      addImage(copy,$('mix-friend').selectedOptions[0].text,300,300);
    }catch(err){status('Club art not found. Check lic_cute_art_sheet.jpg is in GitHub.');}
  });
  function setMode(value){mode=value;selected=null;controls();render();
    status(value==='draw'?'Draw with your finger. Each line can later be moved.':'Tap a picture or line to move it.');}
  $('mix-move').addEventListener('click',()=>setMode('move'));
  $('mix-draw').addEventListener('click',()=>setMode('draw'));
  cvs.addEventListener('pointerdown',e=>{
    e.preventDefault();const p=pos(e);cvs.setPointerCapture(e.pointerId);
    if(mode==='draw'){path=[p];selected=null;gesture={draw:true};controls();render();return;}
    const item=hit(p);selected=item?item.id:null;
    gesture=item?{id:item.id,dx:p.x-item.x,dy:p.y-item.y,startX:item.x,startY:item.y}:null;
    controls();render();
  });
  cvs.addEventListener('pointermove',e=>{
    if(!gesture)return;e.preventDefault();const p=pos(e);
    if(gesture.draw){path.push(p);render();return;}
    const item=selectedPiece();if(!item)return;
    item.x=p.x-gesture.dx;item.y=p.y-gesture.dy;render();
  });
  async function finish(){
    if(!gesture)return;
    if(gesture.draw && path?.length){
      const points=path;path=null;gesture=null;
      const pad=30;
      const minX=Math.max(0,Math.min(...points.map(p=>p.x))-pad);
      const minY=Math.max(0,Math.min(...points.map(p=>p.y))-pad);
      const maxX=Math.min(W,Math.max(...points.map(p=>p.x))+pad);
      const maxY=Math.min(H,Math.max(...points.map(p=>p.y))+pad);
      const iw=Math.max(2,Math.ceil(maxX-minX)),ih=Math.max(2,Math.ceil(maxY-minY));
      const tmp=document.createElement('canvas');tmp.width=iw;tmp.height=ih;
      const c=tmp.getContext('2d');c.strokeStyle=$('mix-color').value;
      c.lineCap='round';c.lineJoin='round';c.lineWidth=Number($('mix-brush').value);
      c.beginPath();points.forEach((p,i)=>i?c.lineTo(p.x-minX,p.y-minY):c.moveTo(p.x-minX,p.y-minY));
      if(points.length===1)c.lineTo(points[0].x-minX+.1,points[0].y-minY+.1);
      c.stroke();
      const img=await loadImage(tmp.toDataURL('image/png'));
      const item={id:newId(),img,name:'My drawing',x:minX+iw/2,y:minY+ih/2,w:iw,h:ih,scale:1,angle:0};
      items.push(item);checkpoint();render();status('New line added! Tap Move to reposition it.');
      return;
    }
    if(gesture.id){
      const o=selectedPiece();
      if(o && (o.x!==gesture.startX || o.y!==gesture.startY))checkpoint();
    }
    gesture=null;render();
  }
  cvs.addEventListener('pointerup',finish);
  cvs.addEventListener('pointercancel',finish);
  $('mix-size').addEventListener('input',e=>{const o=selectedPiece();if(o){o.scale=Number(e.target.value)/100;render();}});
  $('mix-size').addEventListener('change',()=>{if(selectedPiece())checkpoint();});
  $('mix-angle').addEventListener('input',e=>{const o=selectedPiece();if(o){o.angle=Number(e.target.value);render();}});
  $('mix-angle').addEventListener('change',()=>{if(selectedPiece())checkpoint();});
  $('mix-forward').addEventListener('click',()=>{
    const i=items.findIndex(o=>o.id===selected);if(i<0||i===items.length-1)return;
    items.splice(i+1,0,items.splice(i,1)[0]);checkpoint();render();
  });
  $('mix-back').addEventListener('click',()=>{
    const i=items.findIndex(o=>o.id===selected);if(i<=0)return;
    items.splice(i-1,0,items.splice(i,1)[0]);checkpoint();render();
  });
  $('mix-copy').addEventListener('click',()=>{
    const o=selectedPiece();if(!o)return;
    const copy={...o,id:newId(),x:o.x+45,y:o.y+45};
    items.push(copy);selected=copy.id;checkpoint();render();
  });
  $('mix-remove').addEventListener('click',()=>{
    const i=items.findIndex(o=>o.id===selected);if(i<0)return;
    items.splice(i,1);selected=null;checkpoint();render();
  });
  $('mix-undo').addEventListener('click',()=>{if(cursor>0)restore(history[--cursor]);});
  $('mix-redo').addEventListener('click',()=>{if(cursor<history.length-1)restore(history[++cursor]);});
  $('mix-clear').addEventListener('click',()=>{
    if(dirty&&!confirm('Start a new page? Save your picture first if you want to keep it.'))return;
    items.length=0;selected=null;checkpoint();dirty=false;render();status('Fresh blank page, ready for new ideas!');
  });
  $('mix-save').addEventListener('click',()=>{
    const out=document.createElement('canvas');out.width=W;out.height=H;
    const c=out.getContext('2d');c.fillStyle='#fffdfc';c.fillRect(0,0,W,H);
    items.forEach(o=>paintPiece(o,c));
    const a=document.createElement('a');a.download='my-mixed-magical-picture.png';
    a.href=out.toDataURL('image/png');a.click();dirty=false;
    status('Saved a new picture! Your originals are unchanged.');
  });
  history=[[]];cursor=0;controls();render();
})();

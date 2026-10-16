
(() => {
  if (document.getElementById('lic-drawing-studio')) return;

  const host = document.querySelector('#create .creator-fields') ||
    document.querySelector('#create') || document.querySelector('main');
  if (!host) return;

  const css = document.createElement('style');
  css.textContent = `
    #lic-drawing-studio {
      margin:25px 0;padding:18px;background:#faf2ff;
      border:2px solid #ddc8fa;border-radius:24px;
      color:#36265d;min-width:0
    }
    #lic-drawing-studio h3 {margin:0 0 8px}
    #lic-drawing-studio p {margin:5px 0 12px}
    #lic-drawing-studio .lic-tools {
      display:flex;gap:8px;flex-wrap:wrap;margin:10px 0
    }
    #lic-drawing-studio button,
    #lic-drawing-studio .lic-upload {
      cursor:pointer;background:white;color:#51348b;
      border:2px solid #d8c4f5;padding:9px 12px;
      border-radius:14px;font-weight:700;font-size:15px
    }
    #lic-drawing-studio button[aria-pressed=true] {
      background:#7554c7;color:white
    }
    #lic-drawing-studio .lic-upload {display:inline-block}
    #lic-drawing-studio label {
      display:inline-flex;align-items:center;gap:7px
    }
    #lic-drawing-studio .lic-stack {
      position:relative;width:100%;aspect-ratio:4/3;
      border:3px solid #dbc4f7;border-radius:18px;
      overflow:hidden;background:white;touch-action:none
    }
    #lic-drawing-studio canvas {
      position:absolute;inset:0;width:100%;height:100%
    }
    #lic-drawing-studio #lic-paint {touch-action:none}
    #lic-drawing-studio .lic-note {
      font-size:13px;color:#65567a
    }
  `;
  document.head.append(css);

  const box = document.createElement('section');
  box.id = 'lic-drawing-studio';
  box.innerHTML = `
    <h3>🎨 My Magical Drawing Studio</h3>
    <p>Draw or upload a picture, then decorate it!</p>
    <div class="lic-tools">
      <label class="lic-upload">🖼️ Upload drawing
        <input id="lic-upload-art" type="file"
          accept="image/*" hidden>
      </label>
      <button type="button" data-tool="brush"
        aria-pressed="true">🖌️ Brush</button>
      <button type="button" data-tool="erase"
        aria-pressed="false">🧽 Eraser</button>
      <button type="button" data-tool="sticker"
        aria-pressed="false">🌟 Sticker</button>
    </div>
    <div class="lic-tools">
      <label>🌈 Colour
        <input id="lic-colour" type="color" value="#e95bad">
      </label>
      <label>Size
        <input id="lic-size" type="range"
          min="3" max="42" value="9">
      </label>
    </div>
    <div class="lic-tools" id="lic-stickers"></div>
    <div class="lic-stack">
      <canvas id="lic-base" width="640" height="480"></canvas>
      <canvas id="lic-paint" width="640" height="480"></canvas>
    </div>
    <div class="lic-tools">
      <button type="button" id="lic-undo">↩️ Undo</button>
      <button type="button" id="lic-redo">↪️ Redo</button>
      <button type="button" id="lic-clear">
        ✨ Clear decorations
      </button>
      <button type="button" id="lic-save">
        💜 Save my picture
      </button>
    </div>
    <p class="lic-note">
      Your original picture stays unchanged.
      The eraser removes added decorations.
      Save downloads a new PNG to your device.
    </p>
  `;
  host.append(box);

  const base = box.querySelector('#lic-base');
  const paint = box.querySelector('#lic-paint');
  const bg = base.getContext('2d');
  const ctx = paint.getContext('2d');

  const stickers = [
    '👑','🎀','✨','🌈','🦋','🌸','💖','⭐',
    '🦄','🐉','☁️','🎈','💎','🍄','🧸','🪄'
  ];

  const stickerBar = box.querySelector('#lic-stickers');
  let tool = 'brush';
  let stamp = '👑';
  let active = false;
  let history = [];
  let position = -1;

  bg.fillStyle = '#fffdfd';
  bg.fillRect(0, 0, base.width, base.height);

  function remember() {
    history = history.slice(0, position + 1);
    history.push(
      ctx.getImageData(0, 0, paint.width, paint.height)
    );
    if (history.length > 15) history.shift();
    position = history.length - 1;
  }
  remember();

  function mode(next) {
    tool = next;
    box.querySelectorAll('[data-tool]').forEach(b =>
      b.setAttribute(
        'aria-pressed',
        String(b.dataset.tool === next)
      )
    );
  }

  box.querySelectorAll('[data-tool]').forEach(b =>
    b.addEventListener('click', () => mode(b.dataset.tool))
  );

  stickers.forEach(symbol => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = symbol;
    button.setAttribute('aria-label', 'Sticker ' + symbol);
    button.addEventListener('click', () => {
      stamp = symbol;
      mode('sticker');
    });
    stickerBar.append(button);
  });

  function coords(e) {
    const rect = paint.getBoundingClientRect();
    return [
      (e.clientX - rect.left) * paint.width / rect.width,
      (e.clientY - rect.top) * paint.height / rect.height
    ];
  }

  function draw(e, first) {
    const [x, y] = coords(e);

    if (tool === 'sticker') {
      if (!first) return;
      ctx.save();
      ctx.font = '64px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(stamp, x, y);
      ctx.restore();
      remember();
      return;
    }

    ctx.lineWidth =
      Number(box.querySelector('#lic-size').value);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation =
      tool === 'erase' ? 'destination-out' : 'source-over';
    ctx.strokeStyle = box.querySelector('#lic-colour').value;

    if (first) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + .1, y + .1);
    } else {
      ctx.lineTo(x, y);
    }

    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  }

  paint.addEventListener('pointerdown', e => {
    e.preventDefault();
    active = true;
    paint.setPointerCapture(e.pointerId);
    draw(e, true);
  });

  paint.addEventListener('pointermove', e => {
    if (!active || tool === 'sticker') return;
    e.preventDefault();
    draw(e, false);
  });

  function finish() {
    if (!active) return;
    active = false;
    if (tool !== 'sticker') remember();
  }

  paint.addEventListener('pointerup', finish);
  paint.addEventListener('pointercancel', finish);

  function restore() {
    ctx.putImageData(history[position], 0, 0);
  }

  box.querySelector('#lic-undo').addEventListener('click', () => {
    if (position > 0) {
      position--;
      restore();
    }
  });

  box.querySelector('#lic-redo').addEventListener('click', () => {
    if (position < history.length - 1) {
      position++;
      restore();
    }
  });

  box.querySelector('#lic-clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, paint.width, paint.height);
    remember();
  });

  box.querySelector('#lic-upload-art')
    .addEventListener('change', e => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith('image/')) return;

      const url = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        bg.fillStyle = 'white';
        bg.fillRect(0, 0, 640, 480);

        const scale = Math.min(
          640 / img.width, 480 / img.height
        );
        const w = img.width * scale;
        const h = img.height * scale;

        bg.drawImage(
          img, (640 - w) / 2, (480 - h) / 2, w, h
        );

        ctx.clearRect(0, 0, 640, 480);
        history = [];
        position = -1;
        remember();
        URL.revokeObjectURL(url);
      };

      img.onerror = () => URL.revokeObjectURL(url);
      img.src = url;
    });

  box.querySelector('#lic-save')
    .addEventListener('click', () => {
      const result = document.createElement('canvas');
      result.width = 640;
      result.height = 480;

      const out = result.getContext('2d');
      out.drawImage(base, 0, 0);
      out.drawImage(paint, 0, 0);

      const link = document.createElement('a');
      link.download = 'my-magical-drawing.png';
      link.href = result.toDataURL('image/png');
      link.click();
    });
})();

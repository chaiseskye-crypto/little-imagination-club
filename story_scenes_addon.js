(() => {
  const fields = document.querySelector('#create .creator-fields');
  const make = document.getElementById('club-make');
  const book = document.getElementById('club-preview');
  const text = document.getElementById('club-book-text');
  if (!fields || !make || !book || !text) return;

  const scenes = [
    ['Enchanted Forest', '🌳🌸🦋', '#c7f6df', '#86c99b'],
    ['Magic Castle', '🏰🌈✨', '#ffe1f4', '#bf9bec'],
    ['Underwater World', '🪸🐠🫧', '#b6f6ff', '#49a4d7'],
    ['Outer Space', '🚀🪐⭐', '#455392', '#9c70cf'],
    ['Happy Farm', '🌻🏡🐥', '#fff0bd', '#a3d783'],
    ['Dinosaur Land', '🌴🌋🍃', '#baf4d7', '#65bfa0']
  ];

  const friends = [
    ['Little Fox', '🦊'],
    ['Baby Dragon', '🐉'],
    ['Unicorn', '🦄'],
    ['Little Frog', '🐸'],
    ['Hedgehog', '🦔'],
    ['Astronaut', '👩‍🚀']
  ];

  const picker = document.createElement('div');
  picker.className = 'lic-scene-picker';
  picker.innerHTML = `
    <h3>🌈 Design your story world</h3>
    <label>Choose a background
      <select id="lic-background"></select>
    </label>
    <label>Choose a character
      <select id="lic-character"></select>
    </label>
    <div id="lic-scene-preview" aria-live="polite"></div>
  `;
  fields.append(picker);

  const background = picker.querySelector('#lic-background');
  const character = picker.querySelector('#lic-character');
  const preview = picker.querySelector('#lic-scene-preview');

  scenes.forEach((s, i) => background.add(new Option(s[0], i)));
  friends.forEach((f, i) => character.add(new Option(f[0], i)));

  const style = document.createElement('style');
  style.textContent = `
    .lic-scene-picker {
      padding:20px;
      background:#f5edff;
      border:2px solid #ddd0f5;
      border-radius:22px;
      min-width:0;
    }
    .lic-scene-picker label {
      display:grid;
      gap:8px;
      margin:15px 0;
    }
    .lic-scene-picker select {
      width:100%;
      max-width:100%;
    }
    .lic-scene-art {
      border-radius:22px;
      padding:24px 12px;
      min-height:240px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:space-around;
      gap:12px;
      text-align:center;
      overflow:hidden;
    }
    .lic-scene-world {
      font-size:clamp(30px,8vw,55px);
    }
    .lic-scene-hero {
      font-size:clamp(75px,18vw,125px);
      filter:drop-shadow(0 10px 6px #3334);
    }
    .lic-scene-label {
      background:#ffffffdd;
      padding:10px;
      border-radius:20px;
      font-weight:bold;
      color:#342452;
    }
    @media print {
      .lic-scene-picker {display:none}
    }
  `;
  document.head.append(style);

  function draw(target) {
    const s = scenes[Number(background.value)];
    const f = friends[Number(character.value)];
    target.className = 'lic-scene-art';
    target.style.background =
      `linear-gradient(160deg, ${s[2]}, ${s[3]})`;
    target.replaceChildren();

    for (const [cls, value] of [
      ['lic-scene-world', s[1]],
      ['lic-scene-hero', f[1]],
      ['lic-scene-label', f[0] + ' in ' + s[0]]
    ]) {
      const part = document.createElement('div');
      part.className = cls;
      part.textContent = value;
      target.append(part);
    }
  }

  background.addEventListener('change', () => draw(preview));
  character.addEventListener('change', () => draw(preview));
  draw(preview);

  make.addEventListener('click', () => {
    setTimeout(() => {
      if (book.hidden) return;
      let page = document.getElementById('lic-book-scene');
      if (!page) {
        page = document.createElement('div');
        page.id = 'lic-book-scene';
        text.before(page);
      }
      draw(page);
    }, 0);
  });
})();

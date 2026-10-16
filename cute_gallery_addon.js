
(() => {
  const panel = document.querySelector('.lic-scene-picker');
  const make = document.getElementById('club-make');
  const book = document.getElementById('club-preview');
  if (!panel || !make || !book || document.getElementById('lic-cute-art')) return;

  const heroes = [
    'Clever Fox', 'Rainbow Unicorn', 'Baby Dragon',
    'Bouncy Bunny', 'Playful Kitten', 'Happy Puppy',
    'Sweet Deer', 'Chilly Penguin', 'Sleepy Koala',
    'Little Turtle', 'Hedgehog Friend', 'Brave Lion'
  ];

  const places = [
    'Enchanted Forest', 'Fairy Garden',
    'Underwater World', 'Outer Space',
    'Dinosaur Valley', 'Snowy Wonderland',
    'Sunny Farm', 'Cloud Kingdom'
  ];

  let hero = 0, place = 0;

  const styles = document.createElement('style');
  styles.textContent = `
    .lic-scene-picker > label,
    .lic-scene-picker > #lic-scene-preview {
      display:none!important;
    }
    #lic-cute-art {
      background:#f8f0ff;
      border-radius:20px;
      padding:13px;
      min-width:0;
    }
    #lic-cute-art h4 {
      margin:16px 0 9px;
      color:#382461;
    }
    .lic-art-grid {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:9px;
    }
    .lic-art-grid.worlds {
      grid-template-columns:repeat(2,minmax(0,1fr));
    }
    .lic-art-choice {
      min-width:0;
      display:block;
      background:#fff;
      border:3px solid #e2d3f5;
      border-radius:15px;
      padding:5px;
      color:#49327f;
      font-weight:700;
      font-size:.77rem;
      text-align:center;
      line-height:1.25;
      overflow-wrap:anywhere;
    }
    .lic-art-choice[aria-pressed="true"] {
      border-color:#7953d3;
      box-shadow:0 0 0 2px #ffd1f0;
    }
    .lic-art-tile {
      width:100%;
      aspect-ratio:1;
      border-radius:11px;
      margin-bottom:6px;
      background-image:url('lic_cute_art_sheet.jpg');
      background-size:400% 500%;
      background-repeat:no-repeat;
    }
    .lic-art-stage {
      width:100%;
      max-width:420px;
      aspect-ratio:1;
      position:relative;
      border-radius:20px;
      overflow:hidden;
      margin:12px auto;
      border:3px solid #eee0ff;
    }
    .lic-art-stage .lic-art-bg {
      position:absolute;
      inset:0;
      margin:0;
      border-radius:0;
    }
    .lic-art-stage .lic-art-hero {
      position:absolute;
      width:42%;
      bottom:18%;
      left:29%;
      border:4px solid #fff;
      border-radius:22%;
      box-shadow:0 5px 15px #24144566;
    }
    .lic-art-stage .lic-art-name {
      position:absolute;
      bottom:9px;
      left:6px;
      right:6px;
      background:#fffffff0;
      color:#3e286d;
      border-radius:20px;
      padding:6px;
      text-align:center;
      font-weight:800;
      font-size:.83rem;
    }
    @media(max-width:430px) {
      .lic-art-grid {
        grid-template-columns:repeat(2,minmax(0,1fr));
      }
    }
    @media print {
      #lic-cute-art {
        display:none!important;
      }
      .lic-art-stage {
        print-color-adjust:exact;
      }
    }
  `;
  document.head.append(styles);

  const pack = document.createElement('section');
  pack.id = 'lic-cute-art';
  pack.innerHTML = `
    <h3>🦊 My Extra-Cute Story World</h3>
    <p>Tap a character and a magical world!</p>
    <h4>🐾 Choose a character</h4>
    <div class="lic-art-grid" id="lic-heroes"></div>
    <h4>🌈 Choose a background</h4>
    <div class="lic-art-grid worlds" id="lic-worlds"></div>
    <h4>📖 Your magical scene</h4>
    <div id="lic-art-preview"></div>
  `;
  panel.append(pack);

  function tile(index) {
    const el = document.createElement('div');
    el.className = 'lic-art-tile';
    const col = index % 4;
    const row = Math.floor(index / 4);
    el.style.backgroundPosition =
      `${col * 100 / 3}% ${row * 25}%`;
    return el;
  }

  function stage() {
    const el = document.createElement('div');
    el.className = 'lic-art-stage';
    el.setAttribute('role','img');
    el.setAttribute(
      'aria-label',
      `${heroes[hero]} in ${places[place]}`
    );

    const background = tile(12 + place);
    background.className += ' lic-art-bg';

    const character = tile(hero);
    character.className += ' lic-art-hero';

    const caption = document.createElement('div');
    caption.className = 'lic-art-name';
    caption.textContent =
      `${heroes[hero]} in ${places[place]}`;

    el.append(background, character, caption);
    return el;
  }

  function preview() {
    pack.querySelector('#lic-art-preview')
      .replaceChildren(stage());
  }

  function choices(list, target, kind) {
    list.forEach((name, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lic-art-choice';
      btn.setAttribute(
        'aria-pressed',
        i === 0 ? 'true' : 'false'
      );

      btn.append(
        tile(kind === 'hero' ? i : 12 + i)
      );
      btn.append(document.createTextNode(name));
      target.append(btn);

      btn.addEventListener('click', () => {
        if (kind === 'hero') hero = i;
        else place = i;

        [...target.children].forEach((x, j) => {
          x.setAttribute(
            'aria-pressed',
            String(i === j)
          );
        });
        preview();
      });
    });
  }

  choices(
    heroes,
    pack.querySelector('#lic-heroes'),
    'hero'
  );
  choices(
    places,
    pack.querySelector('#lic-worlds'),
    'place'
  );
  preview();

  function updateSelect(id, name) {
    const el = document.getElementById(id);
    if (!el || el.tagName !== 'SELECT') return;

    const value = name.toLowerCase();
    if (![...el.options].some(o => o.value === value)) {
      el.add(new Option(value, value));
    }
    el.value = value;
  }

  make.addEventListener('click', () => {
    updateSelect('club-hero', heroes[hero]);
    updateSelect('club-place', places[place]);
  }, true);

  make.addEventListener('click', () => {
    setTimeout(() => {
      if (book.hidden) return;

      let output = document.getElementById('lic-book-scene');
      if (!output) {
        output = document.createElement('div');
        output.id = 'lic-book-scene';
        document.getElementById('club-book-text')
          ?.before(output);
      }

      if (output) {
        output.removeAttribute('class');
        output.removeAttribute('style');
        output.replaceChildren(stage());
      }
    }, 30);
  });
})();

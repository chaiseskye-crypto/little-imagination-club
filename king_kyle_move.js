/* Little Imagination Club — King Kyle movable helper (v1)
 * Loads after kids_creation_hub.js. Does not touch children's books or artwork.
 * Tap the helper to open it. Drag the helper to move it out of the way.
 */
(() => {
  'use strict';
  const STORAGE_KEY = 'lic-kyle-dock-position-v1';
  const EDGE = 10;
  const GAP = 9;
  let attempts = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function setup() {
    const dock = document.getElementById('lic-kyle-guide');
    const button = document.getElementById('lic-kyle-toggle');
    const panel = document.getElementById('lic-kyle-panel');

    if (!dock || !button || !panel) {
      if (++attempts < 30) window.setTimeout(setup, 300);
      return;
    }
    if (dock.dataset.kyleMovable === 'true') return;
    dock.dataset.kyleMovable = 'true';
    button.style.touchAction = 'none';
    button.style.userSelect = 'none';
    button.title = 'Tap for help, or drag me to move';

    // Always position the open panel within the visible phone screen.
    function positionPanel() {
      if (panel.hidden) return;
      panel.style.setProperty('position', 'fixed', 'important');
      panel.style.setProperty('left', '10px', 'important');
      panel.style.setProperty('right', 'auto', 'important');
      panel.style.setProperty('top', '10px', 'important');
      panel.style.setProperty('bottom', 'auto', 'important');
      panel.style.setProperty('max-width', 'calc(100vw - 20px)', 'important');
      panel.style.setProperty('max-height', 'calc(100dvh - 20px)', 'important');

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const anchor = button.getBoundingClientRect();
      const size = panel.getBoundingClientRect();
      const x = clamp(anchor.left + anchor.width / 2 - size.width / 2,
        EDGE, Math.max(EDGE, winW - size.width - EDGE));
      const above = anchor.top - size.height - GAP;
      const below = anchor.bottom + GAP;
      const y = above >= EDGE ? above :
        below + size.height <= winH - EDGE ? below :
        clamp(above, EDGE, Math.max(EDGE, winH - size.height - EDGE));
      panel.style.setProperty('left', Math.round(x) + 'px', 'important');
      panel.style.setProperty('top', Math.round(y) + 'px', 'important');
    }

    // Override the old bottom/right dock coordinates only after a drag.
    function moveDock(x, y) {
      const rect = dock.getBoundingClientRect();
      const maxX = Math.max(EDGE, window.innerWidth - rect.width - EDGE);
      const maxY = Math.max(EDGE, window.innerHeight - rect.height - EDGE);
      dock.style.setProperty('left', Math.round(clamp(x, EDGE, maxX)) + 'px', 'important');
      dock.style.setProperty('top', Math.round(clamp(y, EDGE, maxY)) + 'px', 'important');
      dock.style.setProperty('right', 'auto', 'important');
      dock.style.setProperty('bottom', 'auto', 'important');
      positionPanel();
    }

    function savePosition() {
      try {
        const r = dock.getBoundingClientRect();
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          x: clamp((r.left - EDGE) / Math.max(1, window.innerWidth - r.width - EDGE * 2), 0, 1),
          y: clamp((r.top - EDGE) / Math.max(1, window.innerHeight - r.height - EDGE * 2), 0, 1)
        }));
      } catch (_) { /* Storage may be disabled. Dragging still works. */ }
    }

    let savedPosition = null;
    try {
      const p = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) savedPosition = p;
    } catch (_) { /* Invalid stored preference; use the default corner. */ }

    function restorePosition() {
      if (savedPosition) {
        const r = dock.getBoundingClientRect();
        moveDock(
          EDGE + savedPosition.x * Math.max(0, window.innerWidth - r.width - EDGE * 2),
          EDGE + savedPosition.y * Math.max(0, window.innerHeight - r.height - EDGE * 2)
        );
      } else {
        positionPanel();
      }
    }
    restorePosition();

    let gesture = null;
    let suppressClick = false;
    let clearSuppression = 0;

    button.addEventListener('pointerdown', event => {
      if (event.isPrimary === false || (event.pointerType === 'mouse' && event.button !== 0)) return;
      const r = dock.getBoundingClientRect();
      gesture = {
        id: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        left: r.left,
        top: r.top,
        moved: false
      };
      try { button.setPointerCapture(event.pointerId); } catch (_) { /* Older browsers. */ }
    });

    button.addEventListener('pointermove', event => {
      if (!gesture || event.pointerId !== gesture.id) return;
      const dx = event.clientX - gesture.startX;
      const dy = event.clientY - gesture.startY;
      if (!gesture.moved && Math.hypot(dx, dy) < 7) return;
      gesture.moved = true;
      event.preventDefault();
      moveDock(gesture.left + dx, gesture.top + dy);
    });

    function finish(event) {
      if (!gesture || event.pointerId !== gesture.id) return;
      const moved = gesture.moved;
      gesture = null;
      if (!moved) return;
      const r = dock.getBoundingClientRect();
      savedPosition = {
        x: clamp((r.left - EDGE) / Math.max(1, window.innerWidth - r.width - EDGE * 2), 0, 1),
        y: clamp((r.top - EDGE) / Math.max(1, window.innerHeight - r.height - EDGE * 2), 0, 1)
      };
      savePosition();
      suppressClick = true;
      window.clearTimeout(clearSuppression);
      clearSuppression = window.setTimeout(() => { suppressClick = false; }, 400);
    }
    button.addEventListener('pointerup', finish);
    button.addEventListener('pointercancel', finish);

    // A drag must never accidentally open or close the panel.
    button.addEventListener('click', event => {
      if (suppressClick) {
        event.preventDefault();
        event.stopImmediatePropagation();
        suppressClick = false;
        return;
      }
      window.requestAnimationFrame(positionPanel);
    }, true);

    const observer = new MutationObserver(() => {
      if (!panel.hidden) window.requestAnimationFrame(positionPanel);
    });
    observer.observe(panel, { attributes: true, attributeFilter: ['hidden'] });
    window.addEventListener('resize', restorePosition, { passive: true });
    window.addEventListener('orientationchange', () => window.requestAnimationFrame(restorePosition));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }
})();

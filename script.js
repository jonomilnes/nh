/* ============================================================
   NIKOLAI HALONEN — DIRECTOR OF PHOTOGRAPHY
   script.js

   Table of contents:
     1. Configuration & project data
     2. Utility functions
     3. Cursor — smooth lerp follower with text labels
     4. ShowreelManager — Vimeo background player + mute toggle
     5. ProjectsRenderer — builds project DOM from data
     6. LightboxManager — Vimeo fullscreen lightbox
     7. ScrollHandler — showreel width animation on scroll
     8. Init — bootstrap on DOMContentLoaded

   To update content: edit only the PROJECTS array and
   SHOWREEL_VIMEO_ID at the top. No layout code changes needed.
============================================================ */


/* ============================================================
   1. CONFIGURATION & PROJECT DATA

   - Replace SHOWREEL_VIMEO_ID with your showreel video ID
   - Replace each project's vimeoId for the lightbox
   - Replace asset paths with your actual images/videos
   - All media paths are relative to index.html
============================================================ */

const SHOWREEL_VIMEO_ID = 'REPLACE_WITH_SHOWREEL_ID';

const PROJECTS = [
  {
    id: 'constellation',
    index: '01',
    title: 'Constellation',
    year: '2024',
    category: 'Feature Film',
    description: 'A meditation on memory and the arctic landscape. Shot across three weeks in northern Finland during the blue hour, exploring the space between presence and absence.',
    credits: [
      { role: 'directed by',  name: 'Astrid Lindqvist' },
      { role: 'produced by',  name: 'Polar Frame Films' },
      { role: 'colorist',     name: 'Magnus Keld' },
      { role: 'studio',       name: 'A24' },
    ],
    vimeoId: 'REPLACE_WITH_VIMEO_ID',
    media: [
      { type: 'image', src: 'assets/projects/constellation/still-01.svg', alt: 'Interior — cabin window, arctic light' },
      { type: 'image', src: 'assets/projects/constellation/still-02.svg', alt: 'Aurora over frozen lake' },
      { type: 'video', src: 'assets/projects/constellation/teaser-01.mp4', poster: 'assets/projects/constellation/teaser-poster.svg' },
      { type: 'image', src: 'assets/projects/constellation/still-03.svg', alt: 'Silhouette at the blue hour' },
    ],
  },
  {
    id: 'parallels',
    index: '02',
    title: 'Parallels',
    year: '2023',
    category: 'Commercial',
    description: 'A visual identity campaign for Maison Ehrlich. Three days in Lisbon capturing the tension between old city geometry and modernist form.',
    credits: [
      { role: 'directed by',  name: 'Elsa Fontaine' },
      { role: 'agency',       name: 'Bureau de Passage' },
      { role: 'colorist',     name: 'Hiro Tanaka' },
      { role: 'brand',        name: 'Maison Ehrlich' },
    ],
    vimeoId: 'REPLACE_WITH_VIMEO_ID',
    media: [
      { type: 'image', src: 'assets/projects/parallels/still-01.svg', alt: 'Tiled courtyard, midday light' },
      { type: 'image', src: 'assets/projects/parallels/still-02.svg', alt: 'Portrait in arch shadow' },
      { type: 'video', src: 'assets/projects/parallels/teaser-01.mp4', poster: 'assets/projects/parallels/teaser-poster.svg' },
      { type: 'image', src: 'assets/projects/parallels/still-03.svg', alt: 'Afternoon, terrace geometry' },
      { type: 'image', src: 'assets/projects/parallels/still-04.svg', alt: 'Low angle, cobblestone street' },
    ],
  },
  {
    id: 'still-water',
    index: '03',
    title: 'Still Water',
    year: '2023',
    category: 'Feature Film',
    description: 'An intimate portrait of the Norwegian coast and a family in transition. Shot in available light across six weeks between autumn and winter.',
    credits: [
      { role: 'directed by',  name: 'Jørgen Vale' },
      { role: 'produced by',  name: 'Nordisk Film' },
      { role: 'colorist',     name: 'Silje Berg' },
      { role: 'studio',       name: 'MUBI' },
    ],
    vimeoId: 'REPLACE_WITH_VIMEO_ID',
    media: [
      { type: 'image', src: 'assets/projects/still-water/still-01.svg', alt: 'Fjord at dawn, morning fog' },
      { type: 'video', src: 'assets/projects/still-water/teaser-01.mp4', poster: 'assets/projects/still-water/teaser-poster.svg' },
      { type: 'image', src: 'assets/projects/still-water/still-02.svg', alt: 'Child at window, overcast light' },
      { type: 'image', src: 'assets/projects/still-water/still-03.svg', alt: 'Harbour at dusk' },
    ],
  },
  {
    id: 'reverie',
    index: '04',
    title: 'Reverie',
    year: '2022',
    category: 'Fashion Editorial',
    description: 'A seven-page editorial on softness and restraint. Shot in a Parisian studio using available light from a single north-facing window.',
    credits: [
      { role: 'directed by',  name: 'Camille Aubert' },
      { role: 'styled by',    name: 'Noémie Voss' },
      { role: 'publication',  name: "Harper's Bazaar" },
    ],
    vimeoId: 'REPLACE_WITH_VIMEO_ID',
    media: [
      { type: 'image', src: 'assets/projects/reverie/still-01.svg', alt: 'Studio, north light, white' },
      { type: 'image', src: 'assets/projects/reverie/still-02.svg', alt: 'Detail — fabric and shadow' },
      { type: 'image', src: 'assets/projects/reverie/still-03.svg', alt: 'Portrait, soft defocus' },
      { type: 'video', src: 'assets/projects/reverie/teaser-01.mp4', poster: 'assets/projects/reverie/teaser-poster.svg' },
    ],
  },
  {
    id: 'meridian',
    index: '05',
    title: 'Meridian',
    year: '2022',
    category: 'Feature Film',
    description: 'A road film shot on 35mm across the American Southwest. Landscapes as language — the camera as witness to a disappearing geography.',
    credits: [
      { role: 'directed by',  name: 'Marcus Bell' },
      { role: 'produced by',  name: 'Desert Kin Films' },
      { role: 'colorist',     name: 'Yuki Matsuda' },
      { role: 'premiere',     name: 'Sundance 2022' },
    ],
    vimeoId: 'REPLACE_WITH_VIMEO_ID',
    media: [
      { type: 'image', src: 'assets/projects/meridian/still-01.svg', alt: 'Desert highway, golden hour' },
      { type: 'image', src: 'assets/projects/meridian/still-02.svg', alt: 'Canyon wall, late afternoon' },
      { type: 'video', src: 'assets/projects/meridian/teaser-01.mp4', poster: 'assets/projects/meridian/teaser-poster.svg' },
      { type: 'image', src: 'assets/projects/meridian/still-03.svg', alt: 'Motel exterior, neon and dark sky' },
    ],
  },
  {
    id: 'frequency',
    index: '06',
    title: 'Frequency',
    year: '2021',
    category: 'Commercial',
    description: 'A product film for the Bang & Olufsen Beolab 90. Shot in a white studio environment, the film treats the object as architecture.',
    credits: [
      { role: 'directed by',  name: 'Søren Dahl' },
      { role: 'agency',       name: 'Wolff Olins' },
      { role: 'colorist',     name: 'Felix Roth' },
      { role: 'brand',        name: 'Bang & Olufsen' },
    ],
    vimeoId: 'REPLACE_WITH_VIMEO_ID',
    media: [
      { type: 'image', src: 'assets/projects/frequency/still-01.svg', alt: 'Speaker form, white studio' },
      { type: 'video', src: 'assets/projects/frequency/teaser-01.mp4', poster: 'assets/projects/frequency/teaser-poster.svg' },
      { type: 'image', src: 'assets/projects/frequency/still-02.svg', alt: 'Detail — mesh and light' },
      { type: 'image', src: 'assets/projects/frequency/still-03.svg', alt: 'Wide shot, geometric shadow' },
    ],
  },
];


/* ============================================================
   2. UTILITY FUNCTIONS
============================================================ */

/**
 * Clamp a value within [min, max].
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between start and end by factor.
 */
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

/**
 * Map a value from one range to another, clamped.
 */
function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

/**
 * Cubic ease-out: fast start, gentle finish.
 */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Returns true if the device uses touch as primary input.
 * Used to disable custom cursor and hover interactions.
 */
function isTouchDevice() {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}


/* ============================================================
   3. CURSOR
   Smoothly follows the mouse via requestAnimationFrame lerp.
   Label text is set by other modules to reflect context.
============================================================ */

class Cursor {
  constructor() {
    this.el       = document.getElementById('cursor');
    this.dotEl    = this.el.querySelector('.cursor__dot');
    this.labelEl  = this.el.querySelector('.cursor__label');

    // Current rendered position (lerped toward target)
    this.x        = -200;
    this.y        = -200;
    // Raw mouse position
    this.targetX  = -200;
    this.targetY  = -200;

    this.currentLabel = '';
    this.isVisible    = false;
    this.rafId        = null;

    if (!isTouchDevice()) {
      this._bindEvents();
      this._tick();
    }
  }

  _bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;

      if (!this.isVisible) {
        // Snap on first move to avoid a slide-in from off-screen
        this.x = e.clientX;
        this.y = e.clientY;
        this.isVisible = true;
        this.el.classList.add('is-visible');
      }
    });

    document.addEventListener('mouseleave', () => {
      this.el.classList.remove('is-visible');
    });

    document.addEventListener('mouseenter', () => {
      if (this.isVisible) {
        this.el.classList.add('is-visible');
      }
    });
  }

  /**
   * Animation loop — lerp at ~12% per frame gives a
   * ~200ms lag at 60fps, which feels premium without
   * appearing broken.
   */
  _tick() {
    this.x = lerp(this.x, this.targetX, 0.115);
    this.y = lerp(this.y, this.targetY, 0.115);

    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;

    this.rafId = requestAnimationFrame(() => this._tick());
  }

  setLabel(text) {
    if (this.currentLabel === text) return;
    this.currentLabel = text;
    this.labelEl.textContent = text;
  }

  clearLabel() {
    this.setLabel('');
  }

  destroy() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }
}


/* ============================================================
   4. SHOWREEL MANAGER
   Initializes a Vimeo background player for the hero showreel.
   Handles mute/unmute toggle and exposes updateWidth() for
   the scroll handler.
============================================================ */

class ShowreelManager {
  constructor(cursor) {
    this.cursor       = cursor;
    this.wrapperEl    = document.getElementById('showreel-wrapper');
    this.hitAreaEl    = document.getElementById('showreel-hit-area');
    this.playerEl     = document.getElementById('showreel-player');

    this.player       = null;
    this.isMuted      = true;
    this.playerReady  = false;
    this.isTouch      = isTouchDevice();

    this._initPlayer();
    if (!this.isTouch) {
      this._bindInteractions();
    }
  }

  _initPlayer() {
    if (typeof Vimeo === 'undefined') {
      console.warn('Vimeo Player API unavailable — showreel will not load.');
      return;
    }

    this.player = new Vimeo.Player(this.playerEl, {
      id:         SHOWREEL_VIMEO_ID,
      background: true,   // No controls, autoplay, loop, muted
      loop:       true,
      muted:      true,
      responsive: true,   // Vimeo handles aspect ratio
      dnt:        true,   // Do not track
    });

    this.player.ready().then(() => {
      this.playerReady = true;
      this.player.setMuted(true);
      // Trigger play (may be blocked by browser until interaction)
      this.player.play().catch(() => {});
    }).catch((err) => {
      // Expected if Vimeo ID is a placeholder — fail silently
      console.warn('Showreel player init failed:', err.message);
    });
  }

  _bindInteractions() {
    // Show mute/unmute label on hover
    this.hitAreaEl.addEventListener('mouseenter', () => {
      this.cursor.setLabel(this.isMuted ? 'unmute' : 'mute');
    });

    this.hitAreaEl.addEventListener('mouseleave', () => {
      this.cursor.clearLabel();
    });

    // Toggle mute on click
    this.hitAreaEl.addEventListener('click', () => {
      this._toggleMute();
    });

    // Keyboard accessibility: Space/Enter to toggle
    this.hitAreaEl.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this._toggleMute();
      }
    });
  }

  _toggleMute() {
    if (!this.playerReady || !this.player) return;

    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.player.setMuted(true);
      this.player.setVolume(0);
    } else {
      this.player.setMuted(false);
      this.player.setVolume(1);
    }

    // Update cursor label to reflect new state
    this.cursor.setLabel(this.isMuted ? 'unmute' : 'mute');
  }

  /**
   * Called on each scroll event.
   * Maps the showreel's vertical position in the viewport
   * to a width value between 66.667% and 100%.
   *
   * Animation range:
   *   videoCenter = viewport bottom   → width = 66.667% (8/12 columns)
   *   videoCenter = viewport center   → width = 100%    (full bleed)
   */
  updateWidth() {
    if (this.isTouch) return;

    const rect        = this.wrapperEl.getBoundingClientRect();
    const vh          = window.innerHeight;
    const videoCenter = rect.top + rect.height / 2;

    // progress 0 → 1 as videoCenter moves from vh → vh/2
    const progress = mapRange(videoCenter, vh, vh * 0.5, 0, 1);
    const eased    = easeOutCubic(progress);
    const width    = 66.667 + 33.333 * eased;

    this.wrapperEl.style.width = `${width}%`;
  }
}


/* ============================================================
   5. PROJECTS RENDERER
   Builds project <article> elements from the PROJECTS data
   array and appends them to #projects.
   Lazy-loads images and videos via IntersectionObserver.
============================================================ */

class ProjectsRenderer {
  constructor(cursor, lightbox) {
    this.cursor    = cursor;
    this.lightbox  = lightbox;
    this.container = document.getElementById('projects');

    this._render();
    this._initLazyLoad();
    this._initInteractions();
  }

  _render() {
    const fragment = document.createDocumentFragment();
    PROJECTS.forEach((project) => {
      fragment.appendChild(this._buildProjectEl(project));
    });
    this.container.appendChild(fragment);
  }

  _buildProjectEl(project) {
    const article = document.createElement('article');
    article.className  = 'project';
    article.dataset.id = project.id;

    // ---- LEFT COLUMN ----
    const left = document.createElement('div');
    left.className = 'project__left';
    left.innerHTML = `
      <p class="project__index">${project.index}</p>
      <h2 class="project__title">${project.title}</h2>
      <p class="project__year">${project.year}</p>
      <p class="project__category">${project.category}</p>
      <p class="project__description">${project.description}</p>
      <ul class="project__credits">
        ${project.credits.map((c) => `
          <li class="project__credit">
            <span class="project__credit-role">${c.role}</span>
            <span class="project__credit-name">${c.name}</span>
          </li>
        `).join('')}
      </ul>
    `;

    // ---- RIGHT COLUMN ----
    const right = document.createElement('div');
    right.className = 'project__right';

    project.media.forEach((item, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = `project__media-item project__media-item--${item.type}`;

      if (item.type === 'image') {
        const img = document.createElement('img');
        img.alt     = item.alt || `${project.title} — still ${index + 1}`;
        img.loading = 'lazy';
        // Store src in data attribute; IntersectionObserver sets it
        img.dataset.src = item.src;
        wrapper.appendChild(img);

      } else if (item.type === 'video') {
        const video = document.createElement('video');
        video.muted      = true;
        video.loop       = true;
        video.playsInline = true;
        video.setAttribute('playsinline', ''); // iOS compatibility
        if (item.poster) {
          video.dataset.poster = item.poster;
        }
        video.dataset.src = item.src;
        wrapper.appendChild(video);
      }

      right.appendChild(wrapper);
    });

    article.appendChild(left);
    article.appendChild(right);
    return article;
  }

  /**
   * Use IntersectionObserver to defer loading media until it
   * approaches the viewport, improving initial page performance.
   */
  _initLazyLoad() {
    // Load slightly before entering viewport for a seamless reveal
    const loadObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        if (el.tagName === 'IMG' && el.dataset.src) {
          el.src = el.dataset.src;
          delete el.dataset.src;

        } else if (el.tagName === 'VIDEO' && el.dataset.src) {
          if (el.dataset.poster) {
            el.poster = el.dataset.poster;
            delete el.dataset.poster;
          }
          el.src = el.dataset.src;
          delete el.dataset.src;
          el.load();

          // Once loaded, use a separate observer for play/pause
          this._initVideoPlayback(el);
        }

        loadObserver.unobserve(el);
      });
    }, { rootMargin: '120px 0px', threshold: 0.01 });

    this.container.querySelectorAll('[data-src]').forEach((el) => {
      loadObserver.observe(el);
    });
  }

  /**
   * Autoplay teaser video when ≥30% visible;
   * pause when it leaves the viewport.
   */
  _initVideoPlayback(videoEl) {
    const playObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      });
    }, { threshold: 0.3 });

    playObserver.observe(videoEl);
  }

  _initInteractions() {
    if (isTouchDevice()) return;

    this.container.querySelectorAll('.project').forEach((projectEl) => {
      const projectData = PROJECTS.find((p) => p.id === projectEl.dataset.id);
      if (!projectData) return;

      projectEl.addEventListener('mouseenter', () => {
        this.cursor.setLabel('play video');
      });

      projectEl.addEventListener('mouseleave', () => {
        this.cursor.clearLabel();
      });

      // Open lightbox on click (skip if clicking a real link)
      projectEl.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        this.lightbox.open(projectData.vimeoId);
      });
    });
  }
}


/* ============================================================
   6. LIGHTBOX MANAGER
   Fullscreen Vimeo player overlay.
   Opens with a smooth opacity fade; closes on ESC, scrim click,
   or external call to .close().
============================================================ */

class LightboxManager {
  constructor(cursor) {
    this.cursor     = cursor;
    this.el         = document.getElementById('lightbox');
    this.scrimEl    = document.getElementById('lightbox-scrim');
    this.videoEl    = document.getElementById('lightbox-video');

    this.player         = null;
    this.isOpen         = false;
    this.isPlaying      = false;
    // Bound event handler refs for clean removal
    this._onVideoClick  = this._handleVideoClick.bind(this);

    this._bindStaticEvents();
  }

  _bindStaticEvents() {
    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    // Scrim click to close
    this.scrimEl.addEventListener('click', () => {
      if (this.isOpen) this.close();
    });

    if (!isTouchDevice()) {
      // Scrim hover → "close" cursor
      this.scrimEl.addEventListener('mouseenter', () => {
        this.cursor.setLabel('close');
      });
      this.scrimEl.addEventListener('mouseleave', () => {
        this.cursor.clearLabel();
      });

      // Video hover → "pause" / "play" cursor
      this.videoEl.addEventListener('mouseenter', () => {
        this.cursor.setLabel(this.isPlaying ? 'pause' : 'play');
      });
      this.videoEl.addEventListener('mouseleave', () => {
        this.cursor.clearLabel();
      });
    }
  }

  open(vimeoId) {
    if (this.isOpen) return;
    this.isOpen = true;

    // Reveal overlay
    this.el.classList.add('is-open');
    this.el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Destroy any previous player instance
    this._destroyPlayer();

    // Mount new Vimeo player inside the lightbox
    if (typeof Vimeo === 'undefined') return;

    this.player = new Vimeo.Player(this.videoEl, {
      id:          vimeoId,
      autoplay:    true,
      muted:       false,
      loop:        false,
      responsive:  true,
      title:       false,
      byline:      false,
      portrait:    false,
      dnt:         true,
    });

    this.player.ready().then(() => {
      this.isPlaying = true;

      this.player.on('play',  () => { this.isPlaying = true;  });
      this.player.on('pause', () => { this.isPlaying = false; });
      this.player.on('ended', () => { this.isPlaying = false; });
    }).catch((err) => {
      console.warn('Lightbox player error:', err.message);
    });

    // Video area click toggles play/pause
    this.videoEl.addEventListener('click', this._onVideoClick);
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;

    this.el.classList.remove('is-open');
    this.el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.cursor.clearLabel();

    // Remove video click handler
    this.videoEl.removeEventListener('click', this._onVideoClick);

    // Wait for CSS fade-out before destroying the player
    // to avoid a flash of no-content
    const delay = 500; // matches --dur-slow in CSS
    setTimeout(() => this._destroyPlayer(), delay);
  }

  _handleVideoClick() {
    if (!this.player) return;

    if (this.isPlaying) {
      this.player.pause().then(() => {
        this.cursor.setLabel('play');
      }).catch(() => {});
    } else {
      this.player.play().then(() => {
        this.cursor.setLabel('pause');
      }).catch(() => {});
    }
  }

  _destroyPlayer() {
    if (!this.player) return;
    this.player.destroy().catch(() => {});
    this.player = null;
    this.isPlaying = false;
    this.videoEl.innerHTML = '';
  }
}


/* ============================================================
   7. SCROLL HANDLER
   Requests showreel width update on scroll using
   requestAnimationFrame batching to avoid layout thrashing.
============================================================ */

class ScrollHandler {
  constructor(showreel) {
    this.showreel = showreel;
    this.ticking  = false;

    this._bindEvents();
    // Run once immediately to set correct initial state
    this._update();
  }

  _bindEvents() {
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this._update();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });

    // Also update on resize (width percentages depend on viewport)
    window.addEventListener('resize', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this._update();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
  }

  _update() {
    this.showreel.updateWidth();
  }
}


/* ============================================================
   8. INIT
   Bootstrap everything on DOMContentLoaded.
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const cursor   = new Cursor();
  const lightbox = new LightboxManager(cursor);
  const showreel = new ShowreelManager(cursor);

  // Render projects before setting up scroll, so the
  // IntersectionObservers register against real DOM nodes
  new ProjectsRenderer(cursor, lightbox);

  // Scroll handler drives showreel width animation
  new ScrollHandler(showreel);
});

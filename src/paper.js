/* =========================================================
   PAPER PORTFOLIO — page-curl engine & interactions
   1. Helpers               5. Gestures (drag, swipe, hover peel)
   2. Project sheets        6. Navigation UI & deep links
   3. Fold geometry         7. Contact form
   4. Flip sessions         8. Boot
   You normally only need to edit src/data.js.
   ========================================================= */
(() => {
    'use strict';

    /* ---------- 1. HELPERS ---------- */
    const DATA = window.PORTFOLIO || { projects: [], contact: {} };
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const pad = n => String(n).padStart(2, '0');
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const isField = el => !!(el && el.closest && el.closest('input, textarea, select, [contenteditable="true"]'));


    /* ---------- 2. PROJECT SHEETS (generated from data.js) ---------- */
    function preview(p) {
        if (p.images && p.images.length) {
            return `<img class="shot-img" src="${esc(p.images[0])}" alt="Screenshot of ${esc(p.title)}" loading="lazy" decoding="async">`;
        }
        const v = p.preview || {};
        const [c1, c2, c3] = v.palette || ['#25231F', '#F5F0E8', '#A66A50'];
        return `
            <div class="mock mock--${esc(v.layout || 'site')}" style="--m1:${esc(c1)};--m2:${esc(c2)};--m3:${esc(c3)}" role="img" aria-label="Illustrated preview of ${esc(p.title)}">
                <div class="mock-bar"><i></i><i></i><i></i><span>${esc(v.domain || p.id)}</span></div>
                <div class="mock-body">
                    <div class="mock-nav"><b>${esc(p.title)}</b><span></span><span></span><span></span></div>
                    <div class="mock-hero"><strong>${esc(v.tagline || p.summary)}</strong><em></em><em></em><u></u><div class="mock-art"></div></div>
                    <div class="mock-grid"><span></span><span></span><span></span>${v.layout === 'shop' ? '<span></span>' : ''}</div>
                </div>
            </div>`;
    }

    function phonePreview(p) {
        if (p.images && p.images[1]) {
            return `<img class="shot-img" src="${esc(p.images[1])}" alt="Second screenshot of ${esc(p.title)}" loading="lazy" decoding="async">`;
        }
        const [c1, c2, c3] = (p.preview && p.preview.palette) || ['#25231F', '#F5F0E8', '#A66A50'];
        return `
            <div class="mock mock--phone" style="--m1:${esc(c1)};--m2:${esc(c2)};--m3:${esc(c3)}" role="img" aria-label="Mobile preview of ${esc(p.title)}">
                <div class="mock-screen"><b>${esc(p.title)}</b><i></i><em></em><u></u><s></s></div>
            </div>`;
    }

    const tagList = tech => `<ul class="mini-tags">${(tech || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;

    function extLink(url, label, cls) {
        return url
            ? `<a class="btn ${cls}" href="${esc(url)}" target="_blank" rel="noopener">${label} <span aria-hidden="true">↗</span></a>`
            : `<span class="btn ${cls} is-disabled" aria-disabled="true" title="Link coming soon">${label} · soon</span>`;
    }

    function projectCard(p, i) {
        return `
            <article class="work-card" data-reveal>
                <figure class="shot">${preview(p)}</figure>
                <div class="work-meta"><span class="n">${pad(i + 1)}</span><span>${esc(p.year)}</span></div>
                <h3>${esc(p.title)}</h3>
                <p>${esc(p.summary)}</p>
                ${tagList(p.tech)}
                <div class="work-actions">
                    <button class="read-more" data-goto="project-${esc(p.id)}">Read more →</button>
                    ${p.live ? extLink(p.live, 'Live', 'btn--ghost btn--sm') : ''}
                    ${p.code ? extLink(p.code, 'GitHub', 'btn--ghost btn--sm') : ''}
                    ${p.live || p.code ? '' : '<span class="soon">Links soon</span>'}
                </div>
            </article>`;
    }

    function projectSheet(p, i, total) {
        const tones = ['#F5F0E8', '#F2EDE4', '#F4EFE7', '#F1ECE2'];
        return `
            <section class="page page--project" id="project-${esc(p.id)}" data-title="${esc(p.title)}" data-sub="1"
                     style="--tone:${tones[i % tones.length]}" tabindex="-1" aria-labelledby="project-${esc(p.id)}-title">
                <div class="page-inner">
                    <div class="proj-grid">
                        <div class="proj-head">
                            <p class="kicker" data-reveal>Project ${pad(i + 1)} of ${pad(total)}</p>
                            <h2 id="project-${esc(p.id)}-title" data-reveal>${esc(p.title)}</h2>
                            <p class="proj-lede" data-reveal>${esc(p.description)}</p>
                            <dl class="proj-facts" data-reveal>
                                <div><dt>Role</dt><dd>${esc(p.role)}</dd></div>
                                <div><dt>Year</dt><dd>${esc(p.year)}</dd></div>
                            </dl>
                            <div class="proj-actions" data-reveal>
                                ${extLink(p.live, 'Live Demo', 'btn--solid')}
                                ${extLink(p.code, 'GitHub', 'btn--ghost')}
                            </div>
                        </div>
                        <div class="proj-media" data-reveal>
                            <figure class="shot shot--main">${preview(p)}</figure>
                            <figure class="shot shot--phone">${phonePreview(p)}</figure>
                            ${tagList(p.tech)}
                            ${p.images && p.images.length ? '' : '<p class="proj-caption">Illustrated preview. Screenshots coming soon.</p>'}
                        </div>
                    </div>
                    <div class="proj-body" data-reveal>
                        <div><h3><span class="num">i.</span> The problem</h3><p>${esc(p.problem)}</p></div>
                        <div><h3><span class="num">ii.</span> Key features</h3><ul>${(p.features || []).map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>
                        <div><h3><span class="num">iii.</span> Approach</h3><p>${esc(p.approach)}</p></div>
                        <div><h3><span class="num">iv.</span> Challenges</h3><p>${esc(p.challenges)}</p></div>
                    </div>
                </div>
            </section>`;
    }

    const projects = DATA.projects || [];
    $('#workGrid').innerHTML = projects.map(projectCard).join('');
    $('#work').insertAdjacentHTML('afterend', projects.map((p, i) => projectSheet(p, i, projects.length)).join(''));


    /* ---------- 3. FOLD GEOMETRY ----------
       The page is folded along the perpendicular bisector of the segment
       from its corner C to the pointer P. The front sheet keeps the part on
       the far side of that line; the folded part is drawn as the paper's
       back side, mirrored across the fold line. */
    const stage = $('#stage');
    const pages = $$('.page', stage);
    const N = pages.length;
    const flapWrap = $('#flapWrap');
    const flap = $('#flap');
    const flapShade = $('#flapShade');
    const foldShadow = $('#foldShadow');

    let W = 0, H = 0;
    const measure = () => { W = stage.clientWidth; H = stage.clientHeight; };

    // Rectangle (0,0)-(W,H) clipped to the half-plane sign * ((X - M) · n) >= 0
    function clipRect(nx, ny, mx, my, sign) {
        const pts = [[0, 0], [W, 0], [W, H], [0, H]];
        const side = p => sign * ((p[0] - mx) * nx + (p[1] - my) * ny);
        const out = [];
        for (let i = 0; i < 4; i++) {
            const a = pts[i], b = pts[(i + 1) % 4];
            const sa = side(a), sb = side(b);
            if (sa >= 0) out.push(a);
            if ((sa >= 0) !== (sb >= 0)) {
                const t = sa / (sa - sb);
                out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
            }
        }
        return out;
    }

    const polygon = pts => pts.length > 2
        ? `polygon(${pts.map(p => `${p[0].toFixed(1)}px ${p[1].toFixed(1)}px`).join(',')})`
        : 'polygon(0 0, 0 0, 0 0)';

    // Positions a long strip whose top edge lies on the fold line and which extends along +n
    function band(el, mx, my, nx, ny, width) {
        const L = 2 * (W + H);
        el.style.width = `${L}px`;
        el.style.height = `${Math.max(1, width)}px`;
        el.style.transform = `translate(${mx}px, ${my}px) rotate(${Math.atan2(-nx, ny)}rad) translate(${-L / 2}px, 0)`;
    }

    // Keep the corner where a real sheet could physically reach
    function constrain(P, C) {
        const F = { x: 0, y: C.y };
        const G = { x: 0, y: H - C.y };
        let p = { x: Math.min(P.x, W), y: C.y === 0 ? Math.max(P.y, 0) : Math.min(P.y, H) };
        let dx = p.x - F.x, dy = p.y - F.y, d = Math.hypot(dx, dy);
        if (d > W) p = { x: F.x + dx * W / d, y: F.y + dy * W / d };
        const diag = Math.hypot(W, H);
        dx = p.x - G.x; dy = p.y - G.y; d = Math.hypot(dx, dy);
        if (d > diag) p = { x: G.x + dx * diag / d, y: G.y + dy * diag / d };
        return p;
    }


    /* ---------- 4. FLIP SESSIONS ---------- */
    let current = 0;
    let S = null;            // active session: { target, dir, front, under, C, start, end, P, mode }
    let rafId = 0;
    let peelRaf = 0;

    function render() {
        const { C } = S;
        const P = S.P = constrain(S.P, C);
        const dx = C.x - P.x, dy = C.y - P.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 0.5) {
            S.front.style.clipPath = '';
            S.front.style.opacity = '';
            flapWrap.style.visibility = 'hidden';
            foldShadow.style.opacity = 0;
            return;
        }

        const nx = dx / dist, ny = dy / dist;
        const mx = (C.x + P.x) / 2, my = (C.y + P.y) / 2;

        S.front.style.clipPath = polygon(clipRect(nx, ny, mx, my, -1));

        const folded = clipRect(nx, ny, mx, my, 1);
        flap.style.clipPath = polygon(folded);
        // reflection across the fold line: X' = R(X - M) + M, with R = I - 2nnᵀ
        const a = 1 - 2 * nx * nx, b = -2 * nx * ny, d = 1 - 2 * ny * ny;
        flap.style.transform = `matrix(${a}, ${b}, ${b}, ${d}, ${mx - (a * mx + b * my)}, ${my - (b * mx + d * my)})`;

        let depth = 1;
        for (const p of folded) depth = Math.max(depth, (p[0] - mx) * nx + (p[1] - my) * ny);
        band(flapShade, mx, my, nx, ny, depth);
        band(foldShadow, mx, my, nx, ny, Math.min(depth * 0.9, W * 0.32) + 24);

        // as the sheet leaves (or arrives) beyond the left edge it settles away
        const progress = (C.x - P.x) / (2 * W);
        const fade = progress > 0.8 ? Math.max(0, 1 - (progress - 0.8) / 0.2) : 1;
        flapWrap.style.visibility = 'visible';
        flapWrap.style.opacity = fade;
        flapWrap.style.transform = fade < 1 ? `translateX(${-(1 - fade) * 36}px)` : '';
        S.front.style.opacity = fade < 1 ? fade : '';
        foldShadow.style.opacity = Math.min(1, dist / 70) * fade;
    }

    function openSession(target, cornerTop) {
        measure();
        const dir = target > current ? 1 : -1;
        const C = { x: W, y: cornerTop ? 0 : H };
        const flat = { x: W, y: C.y };
        const gone = { x: -W, y: C.y };
        S = {
            target, dir, C,
            front: pages[dir > 0 ? current : target],
            under: pages[dir > 0 ? target : current],
            start: dir > 0 ? flat : gone,
            end: dir > 0 ? gone : flat,
            P: { ...(dir > 0 ? flat : gone) },
            mode: 'peel'
        };
        S.front.classList.add('is-front');
        S.under.classList.add('is-under');
        stage.classList.add('is-flipping');
        render();
    }

    function markEntering() {
        const el = pages[S.target];
        el.classList.remove('is-entering');
        void el.offsetWidth;                    // restart the reveal animation
        el.classList.add('is-entering');
    }

    function finish(completed) {
        cancelAnimationFrame(rafId);
        cancelAnimationFrame(peelRaf);
        peelRaf = 0;
        if (!S) return;
        const { target } = S;
        pages.forEach(p => {
            p.style.clipPath = '';
            p.style.opacity = '';
            p.classList.remove('is-front', 'is-under');
        });
        flapWrap.style.visibility = 'hidden';
        flapWrap.style.opacity = '';
        flapWrap.style.transform = '';
        foldShadow.style.opacity = 0;
        stage.classList.remove('is-flipping');
        if (!completed) pages[target].classList.remove('is-entering');
        S = null;
        const changed = completed && target !== current;
        if (changed) current = target;
        syncPages();
        updateUI(changed);
    }

    const dropSession = () => finish(false);

    function animate(path, ms, done) {
        cancelAnimationFrame(rafId);
        const t0 = performance.now();
        const step = now => {
            const t = Math.min(1, (now - t0) / ms);
            S.P = path(t);
            render();
            if (t < 1) rafId = requestAnimationFrame(step);
            else done();
        };
        rafId = requestAnimationFrame(step);
    }

    const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    // straight travel with a gentle lift in the middle, like a hand turning paper
    function arc(from, to, ease, liftScale = 1) {
        const lift = H * 0.16 * liftScale * (S.C.y === 0 ? 1 : -1);
        return t => {
            const e = ease(t);
            return {
                x: from.x + (to.x - from.x) * e,
                y: from.y + (to.y - from.y) * e + lift * Math.sin(Math.PI * e)
            };
        };
    }

    function goTo(target, { cornerTop = false } = {}) {
        target = Math.max(0, Math.min(N - 1, target));
        if (S && S.mode !== 'peel') return;                 // a flip is already running
        if (target === current) { if (S) dropSession(); return; }

        if (reducedMotion.matches) {
            if (S) dropSession();
            return fadeTo(target);
        }

        if (S && (S.target !== target || S.C.y !== (cornerTop ? 0 : H))) dropSession();
        if (!S) openSession(target, cornerTop);
        S.mode = 'anim';
        markEntering();
        const from = { ...S.P };
        const ms = Math.max(360, 920 * Math.abs(S.end.x - from.x) / (2 * W));
        animate(arc(from, S.end, easeInOut), ms, () => finish(true));
    }

    function fadeTo(target) {
        current = target;
        syncPages();
        pages[current].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease-out' });
        updateUI(true);
    }

    function syncPages() {
        pages.forEach((p, i) => {
            const active = i === current;
            p.classList.toggle('is-current', active);
            p.inert = !active;
            p.setAttribute('aria-hidden', String(!active));
        });
    }


    /* ---------- 5. GESTURES ---------- */
    let drag = null;
    let suppressClickUntil = 0;

    stage.addEventListener('pointerdown', e => {
        if (e.button !== 0 || (S && S.mode === 'anim')) return;
        const edge = e.target.closest('.edge');
        // mouse drags only from the edges (so text stays selectable); touch can swipe anywhere
        if (!edge && (e.pointerType === 'mouse' || isField(e.target))) return;
        drag = {
            id: e.pointerId,
            x0: e.clientX, y0: e.clientY,
            rect: stage.getBoundingClientRect(),
            edge: edge ? edge.dataset.dir : null,
            started: false,
            vx: 0, lx: e.clientX, lt: e.timeStamp
        };
    });

    window.addEventListener('pointermove', e => {
        if (drag && e.pointerId === drag.id) onDragMove(e);
        else if (!drag && e.pointerType === 'mouse') hoverPeel(e);
    });
    window.addEventListener('pointerup', e => endDrag(e, false));
    window.addEventListener('pointercancel', e => endDrag(e, true));

    function onDragMove(e) {
        const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;

        if (!drag.started) {
            if (Math.hypot(dx, dy) < 8) return;
            let dir;
            if (drag.edge) dir = drag.edge === 'next' ? 1 : -1;
            else {
                if (Math.abs(dx) < Math.abs(dy) * 1.3) { drag = null; return; }   // vertical: let the page scroll
                dir = dx < 0 ? 1 : -1;
            }
            const target = current + dir;
            if (target < 0 || target >= N || (S && S.mode === 'anim')) { drag = null; return; }

            drag.started = true;
            drag.dir = dir;
            try { stage.setPointerCapture(e.pointerId); } catch (_) { /* not critical */ }
            if (reducedMotion.matches) return;

            const cornerTop = drag.edge ? (drag.y0 - drag.rect.top) < drag.rect.height * 0.4 : false;
            if (S && (S.target !== target || S.C.y !== (cornerTop ? 0 : H))) dropSession();
            if (!S) openSession(target, cornerTop);
            S.mode = 'drag';
            markEntering();
            drag.origin = { ...S.P };
            drag.k = drag.edge ? 1.5 : 2.2;
        }

        const dt = Math.max(1, e.timeStamp - drag.lt);
        drag.vx = drag.vx * 0.6 + ((e.clientX - drag.lx) / dt) * 0.4;
        drag.lx = e.clientX;
        drag.lt = e.timeStamp;

        if (!S) return;
        S.P = { x: drag.origin.x + dx * drag.k, y: drag.origin.y + dy * (drag.edge ? 0.9 : 0.35) };
        render();
    }

    function endDrag(e, cancelled) {
        if (!drag || e.pointerId !== drag.id) return;
        const d = drag;
        drag = null;
        if (!d.started) return;
        suppressClickUntil = performance.now() + 400;

        if (reducedMotion.matches) {
            if (!cancelled) goTo(current + d.dir);
            return;
        }
        if (!S) return;

        const progress = (S.C.x - S.P.x) / (2 * W);
        const v = d.vx;   // px per ms; negative = moving left
        const complete = !cancelled && (S.dir > 0
            ? v < -0.45 || (progress > 0.3 && v < 0.45)
            : v > 0.45 || (progress < 0.7 && v > -0.45));

        S.mode = 'anim';
        const from = { ...S.P };
        const to = complete ? S.end : S.start;
        const ms = Math.max(240, 820 * Math.abs(to.x - from.x) / (2 * W));
        animate(arc(from, to, easeOut, 0.4), ms, () => finish(complete));
    }

    // Swallow the click that follows a drag so links/buttons under the finger don't fire
    stage.addEventListener('click', e => {
        if (performance.now() < suppressClickUntil) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    // Hovering near the bottom-right corner lifts it slightly
    function hoverPeel(e) {
        if ((S && S.mode !== 'peel') || current >= N - 1 || reducedMotion.matches) return;
        const r = stage.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const zone = Math.min(150, r.width * 0.18);
        const edgeW = $('.edge--next').offsetWidth;
        const inCorner = x > r.width - zone && x <= r.width + 6 && y > r.height - zone && y <= r.height + 6;
        const onEdge = x > r.width - edgeW && x <= r.width && y >= 0 && y <= r.height;

        if (inCorner || onEdge) {
            const prox = inCorner ? 1 - Math.max(r.width - x, r.height - y) / zone : 0;
            const amt = 16 + Math.max(0, prox) * 54;
            if (!S) openSession(current + 1, false);
            peelTo({ x: W - amt * 1.15, y: H - amt * 0.85 }, false);
        } else if (S && S.mode === 'peel') {
            peelTo({ x: W, y: H }, true);
        }
    }

    function peelTo(target, release) {
        S.peelTarget = target;
        S.peelRelease = release;
        if (peelRaf) return;
        const step = () => {
            if (!S || S.mode !== 'peel') { peelRaf = 0; return; }
            const T = S.peelTarget;
            S.P = { x: S.P.x + (T.x - S.P.x) * 0.18, y: S.P.y + (T.y - S.P.y) * 0.18 };
            render();
            if (Math.hypot(T.x - S.P.x, T.y - S.P.y) < 0.4) {
                peelRaf = 0;
                if (S.peelRelease) dropSession();
                return;
            }
            peelRaf = requestAnimationFrame(step);
        };
        peelRaf = requestAnimationFrame(step);
    }

    document.addEventListener('mouseleave', () => { if (S && S.mode === 'peel') peelTo({ x: W, y: H }, true); });

    // Edge zones: click / tap / Enter
    $$('.edge').forEach(btn => btn.addEventListener('click', e => {
        const dir = btn.dataset.dir === 'next' ? 1 : -1;
        let cornerTop = false;
        if (e.detail) {                                     // real pointer click (not keyboard)
            const r = stage.getBoundingClientRect();
            cornerTop = e.clientY - r.top < r.height * 0.4;
        }
        goTo(current + dir, { cornerTop });
    }));

    // Keyboard
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !toc.hidden) { closeToc(true); return; }
        if (isField(e.target) || e.altKey || e.ctrlKey || e.metaKey) return;
        if (e.key === 'ArrowRight') goTo(current + 1);
        else if (e.key === 'ArrowLeft') goTo(current - 1);
        else return;
        e.preventDefault();
    });

    // Mobile browsers resize while the address bar hides mid-swipe: keep the flip going
    // and re-anchor its corner to the new sheet size.
    new ResizeObserver(() => {
        measure();
        if (!S) return;
        const y = S.C.y === 0 ? 0 : H;
        S.C = { x: W, y };
        const flat = { x: W, y }, gone = { x: -W, y };
        S.start = S.dir > 0 ? flat : gone;
        S.end = S.dir > 0 ? gone : flat;
        render();
    }).observe(stage);


    /* ---------- 6. NAVIGATION UI & DEEP LINKS ---------- */
    const toc = $('#toc');
    const tocToggle = $('#tocToggle');
    const tocList = $('#tocList');
    const prevBtn = $('#prevBtn');
    const nextBtn = $('#nextBtn');
    const counterNow = $('#counterNow');
    const nowLabel = $('#nowLabel');
    const announcer = $('#announcer');
    const edgePrev = $('.edge--prev');
    const edgeNext = $('.edge--next');
    const baseTitle = document.title;

    $('#counterTotal').textContent = pad(N);
    $('#year').textContent = new Date().getFullYear();

    // running head + folio on every sheet
    pages.forEach((p, i) => {
        p.insertAdjacentHTML('beforeend',
            `<div class="runhead" aria-hidden="true"><span>Mustafa Magdi · Portfolio</span><span>${pad(i + 1)} · ${esc(p.dataset.title)}</span></div>` +
            `<div class="folio" aria-hidden="true">${i + 1}</div>`);
    });

    tocList.innerHTML = pages.map((p, i) => `
        <li class="${p.dataset.sub ? 'is-sub' : ''}">
            <a href="#${p.id}" data-goto="${p.id}"><span class="toc-num">${pad(i + 1)}</span>${esc(p.dataset.title)}</a>
        </li>`).join('');

    const indexOf = id => pages.findIndex(p => p.id === id);

    function openToc() {
        toc.hidden = false;
        tocToggle.setAttribute('aria-expanded', 'true');
        const cur = $('[aria-current="page"]', toc);
        (cur || $('a', toc)).focus({ preventScroll: true });
    }
    function closeToc(returnFocus) {
        if (toc.hidden) return;
        toc.hidden = true;
        tocToggle.setAttribute('aria-expanded', 'false');
        if (returnFocus) tocToggle.focus();
    }
    tocToggle.addEventListener('click', () => (toc.hidden ? openToc() : closeToc(false)));
    document.addEventListener('click', e => {
        if (!toc.hidden && !toc.contains(e.target) && !tocToggle.contains(e.target)) closeToc(false);
    });

    // Any [data-goto] / in-page link turns straight to that sheet
    document.addEventListener('click', e => {
        const el = e.target.closest('[data-goto], [data-goto-next], a[href^="#"]');
        if (!el || el.classList.contains('skip-link')) return;
        let idx;
        if (el.hasAttribute('data-goto-next')) idx = current + 1;
        else idx = indexOf(el.dataset.goto || el.getAttribute('href').slice(1));
        if (idx < 0) return;
        e.preventDefault();
        closeToc(false);
        goTo(idx);
    });

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    function updateUI(changed) {
        const page = pages[current];
        const title = page.dataset.title;
        counterNow.textContent = pad(current + 1);
        nowLabel.textContent = title;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === N - 1;
        edgePrev.hidden = current === 0;
        edgeNext.hidden = current === N - 1;
        $$('a', tocList).forEach(a => {
            if (a.dataset.goto === page.id) a.setAttribute('aria-current', 'page');
            else a.removeAttribute('aria-current');
        });

        const hash = current === 0 ? '' : `#${page.id}`;
        if (location.hash !== hash) history.replaceState(null, '', hash || location.pathname + location.search);
        document.title = current === 0 ? baseTitle : `${title} · Mustafa Magdi`;

        if (!changed) return;
        counterNow.classList.remove('is-ticking');
        void counterNow.offsetWidth;
        counterNow.classList.add('is-ticking');
        announcer.textContent = `Page ${current + 1} of ${N}: ${title}`;
        // focus was on something inside the old sheet (now inert) → move it to the new sheet
        const active = document.activeElement;
        if (!active || active === document.body || (active.closest('.page') && active.closest('.page') !== page)) {
            page.focus({ preventScroll: true });
        }
        setTimeout(() => page.classList.remove('is-entering'), 1200);
    }

    window.addEventListener('hashchange', () => {
        const idx = indexOf(location.hash.slice(1));
        if (idx >= 0 && idx !== current) goTo(idx);
    });


    /* ---------- 7. CONTACT FORM ---------- */
    const form = $('#contactForm');
    const status = $('#formStatus');
    const endpoint = (DATA.contact && DATA.contact.formEndpoint) || '';
    const mailTo = (DATA.contact && DATA.contact.email) || 'mustafamagdi110@gmail.com';

    if (!endpoint) {
        console.info('[portfolio] Contact form is in mailto mode. Add a Formspree endpoint to PORTFOLIO.contact.formEndpoint in src/data.js to send messages directly.');
    }

    form.addEventListener('input', e => e.target.closest('.field')?.classList.remove('is-invalid'));

    form.addEventListener('submit', async e => {
        e.preventDefault();
        status.className = 'form-status';
        let firstBad = null;
        $$('input, textarea', form).forEach(f => {
            const bad = !f.value.trim() || !f.checkValidity();
            f.closest('.field').classList.toggle('is-invalid', bad);
            f.setAttribute('aria-invalid', String(bad));
            if (bad && !firstBad) firstBad = f;
        });
        if (firstBad) {
            status.textContent = 'Please fill in every field with a valid email.';
            status.classList.add('is-error');
            firstBad.focus();
            return;
        }

        const data = new FormData(form);
        if (!endpoint) {
            const subject = `Portfolio enquiry from ${data.get('name')}`;
            const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`;
            location.href = `mailto:${mailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            status.textContent = 'Your email app should open with the message ready to send.';
            status.classList.add('is-ok');
            return;
        }

        const btn = $('button[type="submit"]', form);
        btn.disabled = true;
        status.textContent = 'Sending…';
        try {
            const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
            if (!res.ok) throw new Error(res.status);
            form.reset();
            status.textContent = 'Thank you! Your message is on its way. I’ll reply soon.';
            status.classList.add('is-ok');
        } catch (_) {
            status.innerHTML = `Something went wrong. Please email me at <a class="link" href="mailto:${esc(mailTo)}">${esc(mailTo)}</a>.`;
            status.classList.add('is-error');
        } finally {
            btn.disabled = false;
        }
    });


    /* ---------- 8. BOOT ---------- */
    measure();
    const startIdx = indexOf(location.hash.slice(1));
    current = startIdx > 0 ? startIdx : 0;
    syncPages();
    updateUI(false);
    pages[current].classList.add('is-entering');
    setTimeout(() => pages[current].classList.remove('is-entering'), 1200);

    // A small, one-time corner lift on the first sheet hints that pages can be turned
    if (current === 0 && !reducedMotion.matches) {
        setTimeout(() => {
            if (S || drag || current !== 0) return;
            openSession(1, false);
            peelTo({ x: W - 80, y: H - 58 }, false);
            setTimeout(() => { if (S && S.mode === 'peel') peelTo({ x: W, y: H }, true); }, 900);
        }, 1400);
    }
})();

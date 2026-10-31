/* =========================================================
   One-page portfolio: reveals, nav, projects, contact form.
   Projects come from src/data.js.
   ========================================================= */
(() => {
    'use strict';

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const DATA = window.PORTFOLIO || { projects: [], contact: {} };
    const PROJECTS = DATA.projects || [];
    const EMAIL = (DATA.contact && DATA.contact.email) || 'Mustafa.Work.em@gmail.com';

    /* ---------- Skills ---------- */
    const icon = n => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${n}/${n}-original.svg`;
    const SKILLS = [
        ['Frontend', [['HTML5', 'html5'], ['CSS3', 'css3'], ['JavaScript', 'javascript'], ['TypeScript', 'typescript'], ['React', 'react'], ['Bootstrap', 'bootstrap']]],
        ['Backend', [['PHP', 'php'], ['Java', 'java'], ['C++', 'cplusplus'], ['REST APIs', '']]],
        ['Data', [['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['Elastic', 'elasticsearch']]],
        ['Tools', [['Git', 'git'], ['GitHub', 'github', 'invert'], ['UI / UX', ''], ['Networking', ''], ['Security', '']]]
    ];
    $('#skillGroups').innerHTML = SKILLS.map(([group, items]) => `
        <div class="skill-group" data-reveal>
            <h3>${group}</h3>
            <ul class="tiles">${items.map(([name, dev, cls]) => `<li class="tile">${dev
                ? `<img src="${icon(dev)}" alt="" width="26" height="26" loading="lazy" class="${cls || ''}" data-letter="${esc(name.slice(0, 2))}">`
                : `<span class="letter">${esc(name.slice(0, 2))}</span>`}${esc(name)}</li>`).join('')}</ul>
        </div>`).join('');

    // if an icon can't load, show its initials instead
    $$('img[data-letter]').forEach(img => img.addEventListener('error', () => {
        const s = document.createElement('span');
        s.className = 'letter'; s.textContent = img.dataset.letter;
        img.replaceWith(s);
    }, { once: true }));

    /* ---------- Projects ---------- */
    const categoryOf = p => p.category || ((p.tech || []).some(t => /php|mysql|node|mongo|sql/i.test(t)) ? 'Full-stack' : 'Front-end');

    function shot(p) {
        if (p.images && p.images.length) return `<div class="shot"><img src="${esc(p.images[0])}" alt="Screenshot of ${esc(p.title)}" loading="lazy"></div>`;
        const pv = p.preview || {};
        const [a, b, c] = pv.palette || ['#2F5D50', '#F1EADF', '#C9784F'];
        return `<div class="shot" aria-hidden="true"><div class="mock" style="--p0:${a};--p1:${b};--p2:${c}">
            <div class="mock-bar"><i></i><i></i><i></i><span>${esc(pv.domain || '')}</span></div>
            <div class="mock-hero"><div><b>${esc(pv.tagline || p.title)}</b><em></em></div><div class="mock-art"></div></div>
            <div class="mock-cards"><i></i><i></i><i></i></div>
        </div></div>`;
    }

    function renderCards(cat = 'All') {
        $('#cards').innerHTML = PROJECTS.filter(p => cat === 'All' || categoryOf(p) === cat).map((p, i) => `
            <article class="card" style="--d:${i * 90}ms">
                <button class="card-shot" data-project="${esc(p.id)}" aria-label="Open ${esc(p.title)} details">${shot(p)}</button>
                <div class="card-body">
                    <h3>${esc(p.title)}</h3>
                    <p>${esc(p.summary || '')}</p>
                    <ul class="tags">${(p.tech || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
                    <div class="card-links">
                        <button data-project="${esc(p.id)}">Details →</button>
                        ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener">Live Demo ↗</a>` : ''}
                        ${p.code ? `<a class="alt" href="${esc(p.code)}" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
                    </div>
                </div>
            </article>`).join('');
    }

    // label shows the real number of projects, e.g. "// Projects (1)"
    $('#projectsLabel').textContent = `// Projects (${PROJECTS.length})`;

    const cats = ['All', ...new Set(PROJECTS.map(categoryOf))];
    $('#filters').hidden = cats.length <= 2;
    $('#filters').innerHTML = cats.map((c, i) => `<button class="chip" aria-pressed="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
    $('#filters').addEventListener('click', e => {
        const b = e.target.closest('.chip'); if (!b) return;
        $$('.chip').forEach(c => c.setAttribute('aria-pressed', String(c === b)));
        renderCards(b.dataset.cat);
    });

    // Cards are drawn right away (so the page height never changes mid-scroll),
    // then cascade in the first time the projects section comes into view.
    renderCards();
    const cardsEl = $('#cards');
    if (reduceMotion || !('IntersectionObserver' in window)) cardsEl.classList.add('is-in');
    else {
        const cio = new IntersectionObserver(([en]) => {
            if (en.isIntersecting) { cardsEl.classList.add('is-in'); cio.disconnect(); }
        }, { rootMargin: '0px 0px -15% 0px' });
        cio.observe(cardsEl);
    }

    /* ---------- In-page links: glide to the exact top of each section ---------- */
    function scrollToSection(id, push = true) {
        const el = document.getElementById(id);
        if (!el) return;
        const target = () => Math.round(el.getBoundingClientRect().top + window.scrollY);
        window.scrollTo({ top: target(), behavior: reduceMotion ? 'auto' : 'smooth' });
        if (push && location.hash !== '#' + id) history.pushState(null, '', '#' + id);
        // once the glide ends, nudge onto the exact spot if anything above moved
        const settle = () => {
            const off = Math.round(el.getBoundingClientRect().top);
            if (Math.abs(off) > 1 && window.scrollY + off <= document.documentElement.scrollHeight - innerHeight) {
                window.scrollTo({ top: target(), behavior: 'auto' });
            }
        };
        if ('onscrollend' in window) window.addEventListener('scrollend', settle, { once: true });
        else setTimeout(settle, 1000);
    }

    document.addEventListener('click', e => {
        const a = e.target.closest('a[href^="#"]');
        if (!a || a.getAttribute('href') === '#' || e.ctrlKey || e.metaKey || e.shiftKey) return;
        const id = decodeURIComponent(a.getAttribute('href').slice(1));
        if (!document.getElementById(id)) return;
        e.preventDefault();
        scrollToSection(id);
    });
    window.addEventListener('popstate', () => {
        const id = location.hash.slice(1);
        if (id && !id.startsWith('project-')) scrollToSection(id, false);
    });

    /* ---------- Project modal ---------- */
    const modal = $('#projectModal');
    const detail = $('#projectDetail');

    function renderDetail(id) {
        const i = PROJECTS.findIndex(p => p.id === id);
        const p = PROJECTS[i];
        if (!p) return false;
        const prev = PROJECTS[i - 1], next = PROJECTS[i + 1];
        detail.innerHTML = `
            <div class="detail-top">
                <div>
                    <p class="label">// Project</p>
                    <p class="detail-meta">${esc(p.year || '')} · ${esc(p.role || '')}</p>
                    <h2 class="title" id="modalTitle">${esc(p.title)}</h2>
                    <p class="sub">${esc(p.description || p.summary || '')}</p>
                    <ul class="tags">${(p.tech || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
                    ${p.live || p.code ? `<div class="btns">
                        ${p.live ? `<a class="btn btn--grad btn--sm" href="${esc(p.live)}" target="_blank" rel="noopener">Live Demo →</a>` : ''}
                        ${p.code ? `<a class="btn btn--ghost btn--sm" href="${esc(p.code)}" target="_blank" rel="noopener">View Code</a>` : ''}
                    </div>` : ''}
                </div>
                ${shot(p)}
            </div>
            <div class="detail-info">
                ${p.problem ? `<div><h3>The Challenge</h3><p>${esc(p.problem)}</p></div>` : ''}
                ${(p.features || []).length ? `<div><h3>Key Features</h3><ul>${p.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>` : ''}
                ${p.approach ? `<div><h3>My Approach</h3><p>${esc(p.approach)}</p></div>` : ''}
            </div>
            <div class="detail-nav">
                ${prev ? `<button data-project="${esc(prev.id)}">← ${esc(prev.title)}</button>` : '<span></span>'}
                ${next ? `<button data-project="${esc(next.id)}">${esc(next.title)} →</button>` : '<span></span>'}
            </div>`;
        // replay the fade when switching between projects inside the modal
        detail.style.animation = 'none'; void detail.offsetWidth; detail.style.animation = '';
        modal.scrollTop = 0;
        return true;
    }

    function openProject(id) {
        if (!renderDetail(id)) return;
        if (!modal.open) {
            modal.showModal();
            document.body.style.overflow = 'hidden';
        }
        history.replaceState(null, '', '#project-' + id);
    }

    function closeProject() {
        if (!modal.open || modal.classList.contains('is-closing')) return;
        const done = () => {
            modal.classList.remove('is-closing');
            modal.close();
            document.body.style.overflow = '';
            history.replaceState(null, '', '#projects');
        };
        if (reduceMotion) return done();
        modal.classList.add('is-closing');
        setTimeout(done, 300);
    }

    document.addEventListener('click', e => {
        const t = e.target.closest('[data-project]');
        if (t) openProject(t.dataset.project);
    });
    $('#modalClose').addEventListener('click', closeProject);
    modal.addEventListener('cancel', e => { e.preventDefault(); closeProject(); });
    modal.addEventListener('click', e => { if (e.target === modal) closeProject(); }); // click on backdrop

    /* ---------- Scroll reveals ---------- */
    const revealEls = $$('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('is-in'));
    } else {
        // stagger elements that share a parent so they cascade in smoothly
        const groups = new Map();
        revealEls.forEach(el => {
            const key = el.closest('.container > *, .container') || el.parentElement;
            const n = groups.get(key) || 0;
            el.style.setProperty('--d', Math.min(n, 6) * 90 + 'ms');
            groups.set(key, n + 1);
        });
        const rio = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) { en.target.classList.add('is-in'); rio.unobserve(en.target); }
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: .08 });
        revealEls.forEach(el => rio.observe(el));
    }

    /* ---------- Header: background, progress bar, active link ---------- */
    const header = $('#header');
    const progress = $('#progress');
    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            header.classList.toggle('is-scrolled', y > 20);
            const max = document.documentElement.scrollHeight - innerHeight;
            progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
            ticking = false;
        });
    }
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const links = $$('.nav a');
    const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    const nio = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => nio.observe(s));

    /* ---------- Deep link to a project ---------- */
    const h = decodeURIComponent(location.hash.slice(1));
    if (h.startsWith('project-')) {
        $('#projects').scrollIntoView();
        openProject(h.slice(8));
    }

    /* ---------- Contact form ---------- */
    const form = $('#contactForm'), status = $('#formStatus');
    const endpoint = (DATA.contact && DATA.contact.formEndpoint) || '';
    form.addEventListener('input', e => e.target.classList.remove('is-invalid'));
    form.addEventListener('submit', async e => {
        e.preventDefault();
        status.className = 'form-status';
        $$('input, textarea', form).forEach(f => f.classList.toggle('is-invalid', !f.value.trim() || !f.checkValidity()));
        const bad = $('.is-invalid', form);
        if (bad) { status.textContent = 'Please fill in every field with a valid email.'; status.classList.add('err'); bad.focus(); return; }

        const data = new FormData(form);
        if (!endpoint) {
            const subject = `Portfolio enquiry from ${data.get('name')}`;
            const body = `${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`;
            location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            status.textContent = 'Your email app should open with the message ready to send.';
            status.classList.add('ok');
            return;
        }
        const btn = $('button', form);
        btn.disabled = true; status.textContent = 'Sending…';
        try {
            const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
            if (!res.ok) throw new Error(res.status);
            form.reset();
            status.textContent = 'Thank you! Your message is on its way.'; status.classList.add('ok');
        } catch (_) {
            status.innerHTML = `Something went wrong. Please email me at <a href="mailto:${esc(EMAIL)}">${esc(EMAIL)}</a>.`;
            status.classList.add('err');
        } finally { btn.disabled = false; }
    });

    $('#year').textContent = new Date().getFullYear();
})();

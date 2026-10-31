/* =========================================================
   1. YOUR PORTFOLIO DATA — edit only this part to add work
   ========================================================= */

/* Categories shown as tabs in the Projects section.
   To add a new section (e.g. "Mobile Games"), add an entry here.
   A tab only appears once at least one project uses its id. */
const CATEGORIES = [
    { id: 'all',          label: 'All',          icon: 'uil-apps',            intro: 'Everything I have built, in one place.' },
    { id: 'websites',     label: 'Websites',     icon: 'uil-globe',           intro: 'Responsive websites and web experiences built for real users.' },
    { id: 'applications', label: 'Applications', icon: 'uil-mobile-android',  intro: 'Web and mobile applications with interactive, app-like functionality.' },
    { id: 'systems',      label: 'Systems',      icon: 'uil-server-network',  intro: 'Management systems, dashboards and back-end solutions.' },
    { id: 'automation',   label: 'Automation',   icon: 'uil-robot',           intro: 'Scripts and workflows that save time by automating repetitive tasks.' }
];

/* Your projects. To add one, copy a block and change the values.
   category must match one of the ids above (except 'all').
   Leave live or code as '' if there is no link yet. */
const PROJECTS = [
    {
        title: 'HopeOasis — Donation Platform',
        category: 'applications',
        icon: 'uil-heart',
        description: 'A web platform tackling healthcare shortages in Sudan. Users can donate money or medical supplies, and doctors can volunteer for online consultations, with donation tracking, live impact updates and a consultation scheduler.',
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
        live: '',
        code: ''
    },
    {
        title: 'Personal Portfolio',
        category: 'websites',
        icon: 'uil-user-square',
        description: 'This site: a responsive portfolio showcasing my projects and skills, with categorized work, smooth navigation and interactive animations.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        live: '',
        code: 'https://github.com/nsevsevbjbv'
    },
    {
        title: 'Food Ordering Website',
        category: 'websites',
        icon: 'uil-utensils',
        description: 'An online food ordering site with a menu, cart and order flow.',
        tech: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
        live: '',
        code: ''
    }
    // Example — remove the // to use:
    // {
    //     title: 'Inventory Management System',
    //     category: 'systems',
    //     icon: 'uil-box',
    //     description: 'Tracks stock, suppliers and orders with a reporting dashboard.',
    //     tech: ['Java', 'MySQL'],
    //     live: '',
    //     code: 'https://github.com/nsevsevbjbv/your-repo'
    // },
];

/* Words cycled by the typing effect in the hero */
const ROLES = ['Web Developer', 'Full-Stack Developer', 'Problem Solver'];

/* Numbers shown under the hero buttons.
   Technologies is counted automatically from the Skills section. */
const HERO_STATS = [
    { value: '3', label: 'Certifications' },
    { value: '2', label: 'Languages' }
];


/* =========================================================
   2. PROJECTS SECTION — tabs, cards and filtering
   ========================================================= */
const tabsEl  = document.getElementById('projectTabs');
const gridEl  = document.getElementById('projectGrid');
const introEl = document.getElementById('categoryIntro');

function countFor(categoryId) {
    return categoryId === 'all'
        ? PROJECTS.length
        : PROJECTS.filter(p => p.category === categoryId).length;
}

function labelFor(categoryId) {
    const cat = CATEGORIES.find(c => c.id === categoryId);
    return cat ? cat.label : categoryId;
}

/* Hide categories with no projects yet */
const visibleCategories = CATEGORIES.filter(c => countFor(c.id) > 0);

function renderTabs(activeId) {
    tabsEl.innerHTML = visibleCategories.map(cat => `
        <button class="project-tab ${cat.id === activeId ? 'active' : ''}"
                role="tab" aria-selected="${cat.id === activeId}"
                data-category="${cat.id}">
            <i class="uil ${cat.icon}"></i>
            ${cat.label}
            <span class="count">${countFor(cat.id)}</span>
        </button>
    `).join('');
}

function projectCard(p, index) {
    const link = (url, icon, text) => url
        ? `<a href="${url}" target="_blank" rel="noopener"><i class="uil ${icon}"></i>${text}</a>`
        : '';
    const links = link(p.live, 'uil-external-link-alt', 'Live') + link(p.code, 'uil-github-alt', 'Code');

    return `
        <article class="project-card glass" style="animation-delay:${index * 80}ms">
            <div class="project-card-top">
                <div class="project-icon"><i class="uil ${p.icon || 'uil-folder'}"></i></div>
                <span class="project-badge">${labelFor(p.category)}</span>
            </div>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="project-tech">${(p.tech || []).map(t => `<span>${t}</span>`).join('')}</div>
            ${links ? `<div class="project-links">${links}</div>` : ''}
        </article>
    `;
}

function renderProjects(activeId) {
    const cat = CATEGORIES.find(c => c.id === activeId);
    introEl.textContent = cat ? cat.intro : '';

    const list = activeId === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === activeId);

    gridEl.innerHTML = list.length
        ? list.map(projectCard).join('')
        : `<div class="project-empty">
               <i class="uil ${cat.icon}"></i>
               <strong>${cat.label} coming soon</strong>
               <span>I'm currently working on projects for this section. Check back soon!</span>
           </div>`;
}

function selectCategory(id) {
    renderTabs(id);
    renderProjects(id);
}

tabsEl.addEventListener('click', e => {
    const tab = e.target.closest('.project-tab');
    if (tab) selectCategory(tab.dataset.category);
});

/* Glow that follows the mouse on project cards */
gridEl.addEventListener('mousemove', e => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
});

selectCategory('all');


/* =========================================================
   3. HERO STATS
   ========================================================= */
const techCount = document.querySelectorAll('.skills-list span').length;
document.getElementById('heroStats').innerHTML =
    [{ value: techCount, label: 'Technologies' }, ...HERO_STATS]
        .map(s => `<div class="hero-stat"><strong>${s.value}</strong><span>${s.label}</span></div>`)
        .join('');


/* =========================================================
   4. NAVIGATION
   ========================================================= */
const navMenu = document.getElementById('myNavMenu');
const navBtn  = document.getElementById('navMenuBtn');
const header  = document.getElementById('header');

function toggleMenu(forceClose) {
    const open = forceClose ? false : !navMenu.classList.contains('responsive');
    navMenu.classList.toggle('responsive', open);
    header.classList.toggle('menu-open', open);
    navBtn.setAttribute('aria-expanded', open);
    navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navBtn.innerHTML = `<i class="uil ${open ? 'uil-times' : 'uil-bars'}"></i>`;
}
navBtn.addEventListener('click', () => toggleMenu());
navMenu.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => toggleMenu(true))
);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(true);
});

/* Shrink + blur the nav bar while scrolling */
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

/* Highlight the nav link of the section on screen */
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => observer.observe(s));

document.getElementById('year').textContent = new Date().getFullYear();


/* =========================================================
   5. TYPING EFFECT
   ========================================================= */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !window.Typed) {
    document.querySelector('.typedText').textContent = ROLES[0];
} else {
    new Typed('.typedText', {
        strings: ROLES,
        loop: true,
        typeSpeed: 90,
        backSpeed: 60,
        backDelay: 1800
    });
}


/* =========================================================
   6. SCROLL REVEAL ANIMATIONS
   ========================================================= */
if (window.ScrollReveal && !reducedMotion) {
    const sr = ScrollReveal({ origin: 'bottom', distance: '40px', duration: 1200, reset: false });

    sr.reveal('.featured-text-card');
    sr.reveal('.featured-name', { delay: 100 });
    sr.reveal('.featured-text-info', { delay: 200 });
    sr.reveal('.featured-text-btn', { delay: 250 });
    sr.reveal('.hero-stats', { delay: 300 });
    sr.reveal('.social_icons', { delay: 350 });
    sr.reveal('.featured-image', { delay: 300, origin: 'right' });
    sr.reveal('.top-header');
    sr.reveal('.project-tabs', { delay: 100 });
    sr.reveal('.about-info', { origin: 'left', distance: '60px' });
    sr.reveal('.skills-box', { origin: 'right', distance: '60px', interval: 150 });
    sr.reveal('.contact-card', { interval: 150 });
}

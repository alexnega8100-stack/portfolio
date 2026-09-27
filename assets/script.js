// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => navObserver.observe(s));

// Scroll reveal
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
}

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('#projectGrid .project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cats = card.dataset.category || '';
      const match = filter === 'all' || cats.split(' ').includes(filter);
      card.classList.toggle('hidden', !match);
    });
  });
});

// ===========================================================
// Certificates — single source of truth
//
// To add a new certificate later, just add another object to this
// array. category can be any of: "ISC2", "eSHE", "TVET", "Networking",
// "Cybersecurity", or "Other" — filter buttons are generated
// automatically from whichever categories are actually present below,
// so the gallery scales to 20, 50+ certificates without further edits.
// ===========================================================
const certificates = [
  { title: 'ISC2 — Domain 1', category: 'ISC2', meta: 'ISC2', image: 'assets/certificates/isc2-domain-1.png' },
  { title: 'ISC2 — Access Control Concepts (Domain 3)', category: 'ISC2', meta: 'ISC2', image: 'assets/certificates/isc2-access-control-domain-3.png' },
  { title: 'ISC2 — Network Security', category: 'ISC2', meta: 'ISC2', image: 'assets/certificates/isc2-network-security.png' },
  { title: '[ADD eSHE COURSE NAME]', category: 'eSHE', meta: 'eSHE — Certificate 1 of 7', image: 'assets/certificates/eshe-certificate-01.jpg' },
  { title: '[ADD eSHE COURSE NAME]', category: 'eSHE', meta: 'eSHE — Certificate 2 of 7', image: 'assets/certificates/eshe-certificate-02.jpg' },
  { title: '[ADD eSHE COURSE NAME]', category: 'eSHE', meta: 'eSHE — Certificate 3 of 7', image: 'assets/certificates/eshe-certificate-03.jpg' },
  { title: '[ADD eSHE COURSE NAME]', category: 'eSHE', meta: 'eSHE — Certificate 4 of 7', image: 'assets/certificates/eshe-certificate-04.jpg' },
  { title: '[ADD eSHE COURSE NAME]', category: 'eSHE', meta: 'eSHE — Certificate 5 of 7', image: 'assets/certificates/eshe-certificate-05.jpg' },
  { title: '[ADD eSHE COURSE NAME]', category: 'eSHE', meta: 'eSHE — Certificate 6 of 7', image: 'assets/certificates/eshe-certificate-06.jpg' },
  { title: '[ADD eSHE COURSE NAME]', category: 'eSHE', meta: 'eSHE — Certificate 7 of 7', image: 'assets/certificates/eshe-certificate-07.jpg' },
  { title: 'Mobile Phone Service and Repair', category: 'TVET', meta: 'TVET / Hello Institute of Technology', image: 'assets/certificates/mobile-phone-service-and-repair.png' },
];

// Preferred display order for filter buttons; only categories that are
// actually present in `certificates` get a button.
const CATEGORY_ORDER = ['ISC2', 'eSHE', 'TVET', 'Networking', 'Cybersecurity', 'Other'];

const certGrid = document.getElementById('certGrid');
const certFilterBar = document.getElementById('certFilterBar');
const certCount = document.getElementById('certCount');

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function renderCertificates() {
  if (!certGrid || !certFilterBar) return;

  // Count text — updates automatically as certificates[] grows.
  if (certCount) {
    certCount.textContent = `${certificates.length} confirmed certificate${certificates.length === 1 ? '' : 's'} / training credential${certificates.length === 1 ? '' : 's'}.`;
  }

  // Build filter buttons from categories actually present.
  const present = new Set(certificates.map(c => c.category));
  const orderedCats = CATEGORY_ORDER.filter(c => present.has(c))
    .concat([...present].filter(c => !CATEGORY_ORDER.includes(c)));

  certFilterBar.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'cert-filter-btn active';
  allBtn.dataset.certfilter = 'all';
  allBtn.textContent = 'All';
  certFilterBar.appendChild(allBtn);

  orderedCats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cert-filter-btn';
    btn.dataset.certfilter = slugify(cat);
    btn.textContent = cat;
    certFilterBar.appendChild(btn);
  });

  // Build certificate cards.
  certGrid.innerHTML = '';
  certificates.forEach(cert => {
    const card = document.createElement('button');
    card.className = 'cert-card cert-open';
    card.type = 'button';
    card.dataset.certfilter = slugify(cert.category);
    card.dataset.lightboxSrc = cert.image;
    card.dataset.lightboxTitle = cert.title;

    const imgWrap = document.createElement('div');
    imgWrap.className = 'cert-image';
    const img = document.createElement('img');
    img.src = cert.image;
    img.alt = `${cert.title} certificate`;
    img.loading = 'lazy';
    imgWrap.appendChild(img);

    const badge = document.createElement('span');
    badge.className = 'cert-category-badge';
    badge.textContent = cert.category;

    const title = document.createElement('p');
    title.className = 'cert-title';
    title.textContent = cert.title;

    const meta = document.createElement('p');
    meta.className = 'cert-meta';
    meta.textContent = cert.meta || cert.category;

    card.appendChild(imgWrap);
    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(meta);
    certGrid.appendChild(card);
  });

  // Wire up filtering for the freshly rendered buttons/cards.
  const certFilterBtns = certFilterBar.querySelectorAll('.cert-filter-btn');
  const certCards = certGrid.querySelectorAll('.cert-card');
  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.certfilter;
      certCards.forEach(card => {
        const match = filter === 'all' || card.dataset.certfilter === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  // Lightbox clicks for the newly created cert cards.
  certCards.forEach(card => card.addEventListener('click', () => openLightbox(card.dataset.lightboxSrc, card.dataset.lightboxTitle)));
}

// ===========================================================
// Generic lightbox — used by certificate cards and by any
// diagram/photo marked with class="lightbox-img" (network
// diagrams, internship photos, project screenshots).
// ===========================================================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, title) {
  if (!src) return;
  lightboxImage.innerHTML = '';
  const img = document.createElement('img');
  img.src = src;
  img.alt = title || '';
  lightboxImage.appendChild(img);
  lightboxTitle.textContent = title || '';
  lightbox.hidden = false;
  lightboxClose.focus();
}
function closeLightbox() { lightbox.hidden = true; }
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

renderCertificates();

// Static (non-certificate) diagram/photo images marked as lightbox triggers.
document.querySelectorAll('.diagram-placeholder img.lightbox-img').forEach(img => {
  const open = () => openLightbox(img.getAttribute('src'), img.dataset.lightboxTitle || img.alt);
  img.addEventListener('click', open);
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
});

// Contact form — no backend wired up yet
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = 'This form is not yet connected to an email service. See README.md to configure one (e.g. Formspree, EmailJS, or a backend endpoint).';
});

# Alex Nega — Portfolio

A personal portfolio website for Alex Nega, a 4th-year Information Technology
student at Bahir Dar University / Bahir Dar Institute of Technology, focused on
**Networking & IT Infrastructure**, with secondary strengths in frontend
development, cybersecurity, software development, mobile development, and IT
support.

## Project structure

```
portfolio/
├── index.html              # The entire site (single page)
├── README.md                # This file
└── assets/
    ├── style.css             # All styling / design tokens
    ├── script.js             # Nav, scroll reveal, filters, lightbox, certificate data, form
    ├── images/
    │   ├── favicon.svg
    │   ├── automated-examination-system.jpg
    │   ├── cable-management.jpg
    │   ├── enterprise-network-diagram.png
    │   ├── hotel-network-diagram.png
    │   ├── internship.jpg
    │   ├── rack-installation.jpg
    │   └── topology.png
    ├── files/
    │   └── Alex_Nega_CV.docx
    ├── certificates/
    │   ├── isc2-domain-1.png
    │   ├── isc2-access-control-domain-3.png
    │   ├── isc2-network-security.png
    │   ├── eshe-certificate-01.jpg … eshe-certificate-07.jpg
    │   └── mobile-phone-service-and-repair.png
    └── photos/
        └── alex.jpg
```

All assets above are already connected to `index.html` — the profile photo,
network diagrams, internship photos, project screenshot, and every
certificate render from these real files. No generated or placeholder images
remain where a real asset exists.

## What still needs real content

Only information that was never provided remains marked "Coming Soon":

- Campus Helper / Reminder Application — technologies and GitHub / demo link
  (no screenshot or repo has been supplied yet)
- The Distributed To-Do List and Campus Helper projects show
  "Screenshot Coming Soon" since no screenshot asset exists

No verification URLs have been provided for any certificate, so no
"Verification Link" buttons are shown. Add one to a certificate only once a
real URL exists.

## The certificate gallery is data-driven and future-proof

Certificates are defined once, at the top of `assets/script.js`, as a plain
array:

```javascript
const certificates = [
  { title: 'ISC2 — Domain 1', category: 'ISC2', meta: 'ISC2', image: 'assets/certificates/isc2-domain-1.png' },
  // ...
];
```

The grid, the filter buttons (All / ISC2 / eSHE / TVET / …), the lightbox,
and the "N confirmed certificates" count are all rendered from this array at
page load — nothing about the layout is hard-coded to 11 certificates.

**To add a new certificate:** drop its image into `assets/certificates/`,
then add one object to the `certificates` array with a `title`, a
`category` (`ISC2`, `eSHE`, `TVET`, `Networking`, `Cybersecurity`, or
`Other`), and the image path. A new category automatically gets its own
filter button; no HTML or CSS changes are needed. The gallery has been
designed to hold 20, 50+ certificates without breaking.

## Lightbox

Clicking any certificate, network diagram (Enterprise/Hotel/Other/Tsedey
Bank topology), or internship/infrastructure photo opens a larger version in
a shared lightbox (keyboard accessible — Tab to focus, Enter/Space to open,
Esc to close).

## CV download

The CV is provided as a Word document (`assets/files/Alex_Nega_CV.docx`),
not a PDF — both "Download CV" buttons link to and download this file as-is.
Replace the file with an updated `.docx` (or swap the two button `href`s to
a `.pdf` if one is produced later) whenever the CV changes.

## Wiring up the contact form

The contact form currently does **not** send messages anywhere — it only
shows a status message saying so (see `assets/script.js`). Two easy options:

1. **Formspree** (no backend needed): sign up at formspree.io, get a form
   endpoint, then set the form's `action` attribute to that URL and remove
   the `preventDefault()` call in `script.js`.
2. **EmailJS**: similar no-backend approach, works client-side.

Do not remove the "not yet connected" note until a real service is wired up.

## Running locally

No build step is required — it's plain HTML/CSS/JS.

```bash
# from the portfolio/ folder
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `alexnega8100-stack/portfolio`).
2. Push this folder's contents to the repository root (or to a `docs/` folder
   if you prefer — adjust the Pages source setting accordingly):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/alexnega8100-stack/portfolio.git
   git push -u origin main
   ```
3. In the repository: **Settings → Pages → Build and deployment → Source**,
   choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. The site will be published at
   `https://alexnega8100-stack.github.io/portfolio/` within a few minutes.
5. Whenever you update `index.html`, `style.css`, `script.js`, or add real
   photos/certificates, just commit and push — Pages rebuilds automatically.
   All asset paths in the site are relative, so this works unchanged on
   GitHub Pages.

## Notes on content honesty

This site was intentionally built with **no fabricated statistics, clients,
testimonials, employers, or skill percentages**. Every claim about the
Tsedey Bank internship is scoped to what was confirmed (rack installation,
rack organization, cable management, physical infrastructure exposure), and
the Tsedey Bank network design is clearly labeled as an academic/simulated
project, not a production deployment. Where an asset doesn't exist yet
(certain project screenshots, some certificate details), the site shows a
clearly labeled "Coming Soon" state or a bracketed placeholder instead of a
broken image or invented detail. Keep this distinction when adding new
content.

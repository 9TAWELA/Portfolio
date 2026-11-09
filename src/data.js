/* =========================================================
   PORTFOLIO DATA — edit this file to update your work.

   Every project below automatically gets:
     • a card on the "Selected Work" sheet
     • its own full sheet (page) right after it
     • an entry in the Contents menu
     • a shareable link:  index.html#project-<id>

   To add a project, copy a block and change the values.
   To remove one, delete its block. Nothing else needs editing.
   ========================================================= */

window.PORTFOLIO = {
    contact: {
        email: 'Mustafa.Work.em@gmail.com',

        /* Contact form delivery.
           Leave '' and the form opens the visitor's email app with the
           message pre-filled (mailto). To send messages directly instead,
           create a free form at https://formspree.io and paste its
           endpoint here, e.g. 'https://formspree.io/f/abcdwxyz'. */
        formEndpoint: ''
    },

    projects: [
        {
            id: 'devspace',
            title: 'DevSpace',
            year: '2026',
            role: 'Solo project: design, development & deployment (built to learn Vercel)',
            category: 'Full-stack',
            summary: 'A community platform where developers publish projects, explore each other’s work and connect. Built with Next.js and deployed on Vercel.',
            description: 'DevSpace is a home for software creators: a place to publish a project page with screenshots, tech stack and demo/source links, then let others discover it through Explore, search, categories and a “newest” feed. I built it solo as a passion project to learn the Vercel platform end-to-end, from the first Git push to a live, server-rendered production app.',
            tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'Serverless Functions', 'Git CI/CD'],
            features: [
                'Project showcase pages with screenshots, stack and demo/source links',
                'Explore feed with 12 categories and “newest” sorting via URL query parameters',
                'Site-wide search, communities and user accounts (sign-up / log-in)',
                'Server-side rendering on Vercel, serving fresh dynamic content on every request',
                'Git-connected deployments: every push builds automatically, every branch gets its own preview URL',
                'Production domain separated from protected preview deployments',
                'Accessible markup (skip-to-content link, semantic structure) and SEO meta tags'
            ],
            problem: 'Talented students and hobbyists build great side projects that nobody ever sees. I wanted a place to share them, and a real project to learn modern deployment on Vercel properly instead of just following tutorials.',
            approach: 'Built the app with the Next.js App Router, React and Tailwind CSS, then connected the GitHub repository to Vercel. Pushes to main ship to production automatically, while other branches and commits get isolated preview deployments for testing before release. Dynamic pages are server-rendered by Vercel Functions, and static assets are served from Vercel’s edge network with immutable caching.',
            challenges: 'Learning Vercel’s Deployment Protection: preview and deployment URLs were locked behind Vercel Authentication, so shared links sent visitors to a login wall. I learned the difference between preview deployments and the production domain, and configured protection so previews stay private while the production site is public.',
            live: 'https://dev-space-taupe.vercel.app/',
            code: '',
            images: [],
            preview: {
                layout: 'site',
                domain: 'dev-space-taupe.vercel.app',
                tagline: 'Build something. Share it. Find your people.',
                palette: ['#111827', '#F5F5F4', '#6366F1']
            }
        },
        {
            id: 'gradewise',
            title: 'GradeWise',
            year: '2026',
            role: 'Designer & full-stack developer',
            category: 'Full-stack',
            summary: 'AI-assisted assignment marking: teachers post work with a rubric, students hand it in, AI marks each criterion with evidence, and the teacher reviews before release.',
            description: 'GradeWise is a web app for teachers and students. Teachers create assignments with a brief and a rubric, students upload their work (PDF, Word or text), and an AI model marks it criterion by criterion, quoting evidence from the work. The teacher then reviews, adjusts and releases the marks. It is a rebuild of a system from a UTHM industrial-training report (originally Streamlit + FastAPI), redone as plain HTML, CSS and JavaScript with a Node.js + Express back end and no build step. Note: the live demo is on Render’s free plan, so the first visit can take 30–60 seconds while the server wakes up. Use the “Demo teacher” or “Demo student” buttons to sign in.',
            tech: ['Node.js', 'Express', 'SQLite', 'JavaScript', 'HTML', 'CSS', 'OpenRouter AI', 'Render'],
            features: [
                'Teacher and student dashboards with secure sign-in (scrypt password hashing, httpOnly session cookies)',
                'Rubric editor with five templates, or let the AI extract criteria from an uploaded rubric document',
                'AI marking per criterion with quoted evidence; every quote is verified against the real submission',
                'Review screen with highlighted evidence, editable scores and flags for low confidence, missing quotes, prompt-injection attempts and very short work',
                'Copying check between submissions using TF-IDF similarity and shared 5-word phrases',
                'Class results (average, distribution, per-criterion scores), CSV export and printable PDF reports',
                'Drag-and-drop uploads for PDF/Word/text with file-type validation',
                'Light and dark mode, keyboard and screen-reader friendly, responsive on phones'
            ],
            problem: 'Marking long written assignments by hand is slow and inconsistent, and students wait a long time for feedback. Fully automatic AI marking is risky, though, because models can misread work, invent evidence or be manipulated by the text they are marking.',
            approach: 'Kept the teacher in control: the AI drafts marks, the teacher checks and releases them. Built an Express 5 server with Node’s built-in SQLite, a plain JavaScript front end, and an AI client that calls free OpenRouter models with automatic fallback models, retries and rate-limit handling, plus an offline practice marker so the app works without an API key. Covered the API and core logic with node:test tests and deployed to Render using a render.yaml Blueprint.',
            challenges: 'Making AI marking trustworthy and safe. Student text is wrapped as untrusted data in the prompt to resist prompt injection, names, emails, phone numbers and IDs are redacted before anything is sent to the AI, and every quote the model cites is checked against the actual submission so invented evidence gets flagged for the teacher.',
            live: 'https://gradewise-rdgp.onrender.com/',
            code: 'https://github.com/9TAWELA/gradewise',
            images: [],
            preview: {
                layout: 'site',
                domain: 'gradewise-rdgp.onrender.com',
                tagline: 'AI-assisted marking, with the teacher in control.',
                palette: ['#0B7568', '#F5F6F8', '#F0A63A']
            }
        },
        {
            id: 'hopeoasis',
            title: 'HopeOasis',
            year: '2024 — 2025',
            role: 'Designer & full-stack developer (final-year project)',
            summary: 'A donation platform tackling healthcare shortages in Sudan.',
            description: 'A web platform that lets people donate money or medical supplies to conflict-affected communities in Sudan, and lets medical professionals volunteer their time for online consultations.',
            tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
            features: [
                'Monetary and medical-supply donations',
                'Secure donation tracking for every contribution',
                'Real-time impact updates for donors',
                'Online consultation scheduler for volunteer doctors'
            ],
            problem: 'Hospitals in Sudan face severe shortages of supplies and staff, and donors rarely see where their help actually ends up.',
            approach: 'Designed the donor and volunteer journeys first, then built a PHP + MySQL back end around a clear data model for donations, supplies and appointments.',
            challenges: 'Keeping donations traceable from pledge to delivery. Solved with status tracking on each donation and an impact feed that reports progress back to the donor.',
            live: 'https://hopeoasis.site.je/index.php',
            code: '',
            images: ['Assets/hopeoasis.png'],
            challenges: 'Keeping donations traceable from pledge to delivery. Solved with status tracking on each donation and an impact feed that reports progress back to the donor.',
            live: 'https://hopeoasis.site.je/index.php',
            code: '',
            images: ['Assets/hopeoasis.png'],
            preview: {                        // used for the illustrated preview until screenshots exist
                layout: 'site',
                domain: 'hopeoasis.org',
                tagline: 'Healthcare help, where it’s needed most.',
                palette: ['#2F5D50', '#F1EADF', '#C9784F']
            }
        }
    ]
};

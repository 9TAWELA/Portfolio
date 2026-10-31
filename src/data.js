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
            preview: {                        // used for the illustrated preview until screenshots exist
                layout: 'site',
                domain: 'hopeoasis.org',
                tagline: 'Healthcare help, where it’s needed most.',
                palette: ['#2F5D50', '#F1EADF', '#C9784F']
            }
        }
    ]
};

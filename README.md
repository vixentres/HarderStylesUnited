# Ticket App (Static Web + GAS Backend)

Application for selling and managing tickets, designed with a "Google Stitch" inspired aesthetic.

## Architecture
*   **Frontend**: HTML5, CSS3 (Variables/Tokens), Vanilla JS.
*   **Hosting**: GitHub Pages (`/` root).
*   **Backend**: Google Apps Script (Web App).
*   **Database**: Google Sheets.

## Directory Structure
```
/
├── index.html            # Entry Point
├── .nojekyll             # Bypasses Jekyll processing on GH Pages
├── assets/
│   ├── css/
│   │   ├── tokens.css    # Design System Variables
│   │   └── main.css      # Components & Utilities
│   ├── js/
│   │   ├── app.js        # Main Controller
│   │   ├── router.js     # SPA Navigation
│   │   └── api.js        # Backend Adapter
│   └── images/
└── backend/              # server-side code (for Google Apps Script)
    ├── Code.gs
    ├── DB.gs
    ├── Utils.gs
    └── ...
```

## Setup
1.  **Frontend**: Push this repository to GitHub and enable "GitHub Pages" on the `main` branch / root folder.
2.  **Backend**: Create a new Google Apps Script project and copy the files from `/backend`. Publish as Web App.

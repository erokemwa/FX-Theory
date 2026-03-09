# Copilot Instructions for FX Theory

## Project Overview

FX Theory is a fintech web application that provides a banking simulation platform called **FX Pay**. It allows users to log in, transfer funds between accounts, apply for loans, and manage their accounts. The project is built by [Eric Okemwa](https://github.com/erokemwa) and is hosted at [fxtheory.tech](http://fxtheory.tech/).

## Repository Structure

```
FX-Theory/
├── backend/
│   ├── app.py              # Flask application entry point
│   ├── requirements.txt    # Python dependencies
│   ├── static/
│   │   ├── css/            # Custom stylesheets
│   │   ├── img/            # Images and icons
│   │   ├── js/             # Vanilla JavaScript (main.js)
│   │   └── vendor/         # Third-party CSS/JS libraries (Bootstrap, AOS, etc.)
│   └── templates/
│       └── index.html      # Main Jinja2 HTML template served by Flask
├── .github/
│   └── copilot-instructions.md
├── .gitignore
├── README.md
└── CNAME
```

## Tech Stack

- **Backend**: Python 3, Flask
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Templating**: Jinja2 (via Flask's `render_template`)
- **UI Libraries**: Bootstrap 5, Bootstrap Icons, AOS (Animate on Scroll), Boxicons, GLightbox, Swiper, Remixicon
- **Python Dependencies**: See `backend/requirements.txt`

## Running the Application

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The app runs in debug mode by default on `http://127.0.0.1:5000`.

## Code Conventions

- **Python**: Follow PEP 8 style guidelines. Keep Flask routes in `app.py`.
- **JavaScript**: Use `"use strict"` mode. Vanilla JS only — no frameworks. Functions follow existing patterns in `main.js` using the `select`, `on`, and `onscroll` helper utilities.
- **HTML**: Jinja2 templates live in `backend/templates/`. Use semantic HTML5 elements.
- **CSS**: Custom styles go in `backend/static/css/style.css`. Vendor/third-party styles stay in `backend/static/vendor/`.

## Key Features

- **Login**: Simulated login with hardcoded demo accounts (no real authentication backend).
- **Fund Transfer**: Transfer a value between two demo accounts.
- **Loans**: Apply for loans within the simulation.
- **Account Closure**: Delete/close a demo account.

## Demo Accounts

| Username | Password |
|----------|----------|
| `s`      | `1111`   |
| `tk`     | `2222`   |

> **Note**: Usernames must be lowercase. There is no real registration system; the app is a frontend simulation.

## Testing

There is currently no automated test suite. Manual testing is done by running the Flask app and interacting with the browser UI.

## Notes for Copilot

- This is a portfolio/demo project — keep changes minimal and consistent with the existing simple architecture.
- Do not introduce new backend frameworks or databases; the app intentionally has no real data persistence.
- Frontend logic lives in `backend/static/js/main.js` and uses vanilla JS patterns.
- Avoid adding external dependencies unless absolutely necessary.

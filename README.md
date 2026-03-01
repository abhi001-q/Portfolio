# Abhishek Goswami — Portfolio

A modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## 🔗 Live Demo

[View Portfolio](https://abhi001-q.github.io/Portfolio)

## ✨ Features

- **Responsive Design** — Fully responsive across desktop, tablet, and mobile
- **GSAP Animations** — Smooth scroll-triggered animations and page transitions
- **Dynamic Projects** — Data-driven project cards rendered from a single source (`projects.js`)
- **Contact Form** — Integrated with EmailJS for real email delivery
- **Google Maps** — Embedded map showing location
- **Portfolio Filter** — Filter projects by category (All, Full-Stack, Frontend, React)
- **Force Download CV** — One-click resume download
- **Dark Theme** — Clean dark UI with orange accent (#eb5d3a)

## 📄 Pages

| Page           | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `index.html`   | Homepage — hero, tech stack, projects preview, stats, CTA     |
| `about.html`   | About — bio, skills, education, experience, services, pricing |
| `works.html`   | Works — full project gallery with category filters            |
| `contact.html` | Contact — form (EmailJS), info, Google Maps embed             |

## 🛠️ Tech Stack

- **HTML5** / **CSS3** / **JavaScript**
- **GSAP** + ScrollTrigger — animations
- **Remix Icon** — icon library
- **EmailJS** — contact form backend
- **Google Fonts** — Poppins

## 📂 Project Structure

```
Portfolio/
├── index.html          # Homepage
├── about.html          # About page
├── works.html          # Works/Projects page
├── contact.html        # Contact page
├── README.md
├── css/
│   └── style.css       # All styles
├── js/
│   ├── script.js       # Main JavaScript
│   ├── projects.js     # Project data + renderer
│   └── config.js       # EmailJS credentials (gitignored)
└── images/
    ├── profile.jpeg    # Profile photo
    └── Resume.png      # Downloadable resume
```

## 🚀 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/abhi001-q/Portfolio.git
   cd Portfolio
   ```

2. **Create `js/config.js`** (for contact form)

   ```js
   const CONFIG = {
     EMAILJS_PUBLIC_KEY: "your_public_key",
     EMAILJS_SERVICE_ID: "your_service_id",
     EMAILJS_TEMPLATE_ID: "your_template_id",
   };
   ```

3. **Open with Live Server** or any static file server

## 📬 Contact

- **Email:** abhishek987ff@gmail.com
- **Location:** Ramdhuni Bhasi, Sunsari, Nepal

## 📝 License

© 2026 Abhishek Goswami. All Rights Reserved.

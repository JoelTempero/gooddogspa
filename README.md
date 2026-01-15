# 🐕 Good Dog Spa Wigram

A modern, playful website for Good Dog Spa Wigram - offering premium dog day care, hydrotherapy, and rehabilitation services in Christchurch, New Zealand.

![Good Dog Spa Logo](https://wigramvet.co.nz/wp-content/uploads/2019/01/gooddogspa-2.png)

## 🌐 Live Demo

- **GitHub Pages:** [joeltempero.github.io/gooddogspa](https://joeltempero.github.io/gooddogspa)
- **Production:** [gooddogspa.sidequest.nz](https://gooddogspa.sidequest.nz) *(coming soon)*

## 🎨 Design

- **Theme:** Playful, kid-friendly playground aesthetic
- **Primary Blue:** `#01ADCD`
- **Primary Yellow:** `#FFCB08`
- **Fonts:** Fredoka One (headings), Nunito (body)

## 📁 Project Structure

```
gooddogspa/
├── index.html              # Homepage
├── services.html           # Services overview
├── daycare.html            # Dog Day Care
├── daycare-prices.html     # Pricing
├── daycare-regulations.html # Regulations
├── rehabilitation.html     # Rehab & Hydrotherapy
├── gallery.html            # Photo gallery
├── blog.html               # Blog listing
├── login.html              # Member login
├── portal.html             # Member portal (SPA)
├── terms.html              # Terms & Conditions
├── privacy.html            # Privacy Policy
├── 404.html                # Error page
│
├── css/
│   ├── main.css            # Core styles & variables
│   ├── components.css      # UI components
│   ├── layout.css          # Grid & responsive
│   ├── animations.css      # Animations
│   ├── utilities.css       # Helper classes
│   └── portal.css          # Portal styles
│
├── js/
│   ├── main.js             # App initialization
│   ├── config/             # Firebase config
│   ├── services/           # Auth, DB, Storage
│   ├── components/         # Navigation, Gallery, etc.
│   ├── portal/             # Portal functionality
│   └── utils/              # Helpers
│
├── assets/
│   ├── images/             # Images & icons
│   ├── fonts/              # Local fonts
│   └── documents/          # PDFs
│
└── data/
    └── demo-data.js        # Demo data
```

## ✨ Features

### Public Website
- 🏠 Responsive homepage with services overview
- 🐕 Dog Day Care information & pricing
- 💧 Rehabilitation & Hydrotherapy services
- 📸 Photo gallery
- 📝 Blog with latest news
- 📞 Contact form

### Member Portal
- 🔐 User authentication (Firebase Auth)
- 📅 Booking system with calendar
- 🐾 Dog profile management (with photo upload)
- 💳 Credit system with Stripe payments
- 📊 Booking history & status tracking

### Admin Portal
- ✅ Booking approval/denial
- 📈 Capacity management
- 🐕 All dogs database
- 👥 User management
- 📸 Gallery management
- 📝 Blog post editor

## 🔧 Tech Stack

- **Frontend:** HTML5, CSS3 (custom properties), Vanilla JavaScript
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Payments:** Stripe (mock integration, live coming soon)
- **Hosting:** GitHub Pages

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/joeltempero/gooddogspa.git
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   npx serve .
   ```

3. For Firebase functionality, update `js/config/firebase-config.js` with your credentials.

## 📱 Demo Accounts

| Role  | Email                     | Password    |
|-------|---------------------------|-------------|
| User  | demo@user.com             | password123 |
| Admin | admin@gooddogspa.co.nz    | admin123    |

## 🏢 Part of Wigram Vet

Good Dog Spa is proudly part of [Wigram Vet](https://wigramvet.co.nz).

---

## 📞 Contact

**Good Dog Spa Wigram**
- 📞 (03) 929 0987
- ✉️ gooddogspa@wigramvet.co.nz
- 📍 Wigram, Christchurch, New Zealand
- 🕐 Mon-Fri: 7am - 6pm

---

© 2024 Good Dog Spa Wigram. All rights reserved.

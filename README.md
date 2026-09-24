# 🎮 Aaron Mutua (@Aaronica123) — Interactive Developer Portfolio

> **Callsign:** `AARONICA // LVL.24 SYSTEMS PALADIN`  
> **Specializations:** Low-Level C Systems • Microsoft Azure Cloud & DevOps • AI / Machine Learning Pipelines • Full-Stack Web Architecture  
> **Education:** Masinde Muliro University of Science and Technology  
> **Experience:** Kenya Marine and Fisheries Research Institute (KMFRI)  
> **GitHub Repository:** [https://github.com/Aaronica123/portfolio.git](https://github.com/Aaronica123/portfolio.git)

---

## ⚡ Overview

An interactive, high-contrast dark blue gamer-HUD styled developer portfolio and online presence engineered for **Aaron Mutua**. Built with React 18, TypeScript, Tailwind CSS, and custom sound synthesis, this portfolio showcases systems-level low-level C programming, DevOps pipelines, AI/ML models, and comprehensive project overhauls.

### 🌟 Key Highlights & Feature Matrix

- 🛡️ **Gamer HUD Aesthetics & Theming:** Deep navy & vibrant cyan high-contrast styling, dynamic telemetry ribbon, live system clock, sound synthesis engine, and interactive scanlines.
- ⚡ **The Veneva Project 2.0 Overhaul Lab:** Live interactive benchmark simulator comparing a hardened C micro-daemon vs. Node.js/TypeScript vs. Legacy monolith across throughput, P99 latency, and memory footprint.
- 🎒 **Tactical Developer Loadout & Inventory:** RPG-style inspectable developer items (**Binary Scalpel**, **Azure Cloud Holocron**, **Docker Stasis Capsule**, **Neural Inference Core**, **PostgreSQL Vault**, **React Cyber Deck**).
- 🏆 **Accredited Industry Certifications:**
  - **Introduction to Cybersecurity** — Cisco Networking Academy
  - **Web Fundamentals** — IBM
  - **IT Fundamentals** — IBM
  - **Software Development** — Power Learn Project (PLP)
  - **Azure Cloud Speedrun Track** — Aspiring AZ-900 / AZ-104 / AZ-400
- 💻 **Interactive Command Line Interface (`$ launch_cli`):** Embedded terminal console supporting commands (`help`, `whoami`, `certs`, `c-lang`, `azure`, `veneva`, `julisha`, `skills`, `inventory`, `quests`).
- 🤖 **A.A.R.O.N.-AI Copilot:** In-browser intelligent assistant answering questions about Aaron's background, projects, and availability.
- 📄 **Curriculum Vitae & Resume Modal:** Complete, formatted, and printable CV with verified history, skills, and contact links.

---

## 🚀 How to Push & Deploy to GitHub

Your repository remote is already set to:
```bash
https://github.com/Aaronica123/portfolio.git
```

### Option A: Push from Your Local Machine or Terminal

1. **Clone or pull into your local machine** (or if pushing directly from this workspace with your credentials):
   ```bash
   git remote set-url origin https://github.com/Aaronica123/portfolio.git
   git add .
   git commit -m "feat: complete interactive developer portfolio with certifications & Veneva 2.0 overhaul"
   git branch -M main
   git push -u origin main
   ```

2. **When prompted for authentication:**
   - **Username:** `Aaronica123`
   - **Password:** Use your [GitHub Personal Access Token (Classic or Fine-Grained)](https://github.com/settings/tokens) with `repo` permissions (or SSH keys).

---

### Option B: Automatic Deployment with GitHub Pages

This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Push your code to the `main` branch:
   ```bash
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. GitHub Actions will automatically compile the Vite app and deploy it to:
   ```
   https://Aaronica123.github.io/portfolio/
   ```

---

### Option C: Deploy to Vercel, Netlify, or Azure Static Web Apps

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** `20.x` or higher

#### Deploying on Vercel:
1. Go to [vercel.com](https://vercel.com) and click **Import Project**.
2. Select your `Aaronica123/portfolio` GitHub repository.
3. Keep default settings (`Vite` framework preset) and click **Deploy**.

#### Deploying on Azure Static Web Apps:
1. In Azure Portal, search for **Static Web Apps** > **Create**.
2. Link your GitHub account and select repository `Aaronica123/portfolio`.
3. Set build presets:
   - App location: `/`
   - Output location: `dist`

---

## 💻 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/Aaronica123/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server (Port 3000)
npm run dev

# 4. Compile production build
npm run build
```

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** React 18 with Vite
- **Programming Language:** TypeScript 5.x
- **Styling:** Tailwind CSS (Dark Blue, High-Contrast Gamer HUD, Cyber Grid)
- **Typography:** Chakra Petch (Display/Tactical), JetBrains Mono (Technical/Telemetry), Plus Jakarta Sans (Body)
- **Icons:** Lucide React
- **Audio Engine:** Web Audio API synthesized retro UI tones (bip, click, achievement, terminal hum)
- **Backend API Server:** Express 4.x / tsx runtime with lazy initialization and Gemini Copilot integration

---

## 📬 Contact & Transmissions

- **Developer:** Aaron Mutua
- **Email:** [k.aaronmutua@gmail.com](mailto:k.aaronmutua@gmail.com)
- **GitHub:** [https://github.com/Aaronica123](https://github.com/Aaronica123)
- **LinkedIn:** [https://linkedin.com/in/aaron-mutua-b2034b256](https://linkedin.com/in/aaron-mutua-b2034b256)

# Pavan Kumar's Dynamic Portfolio

Interactive portfolio website showcasing software engineering skills with modern animations and dynamic features.

![Portfolio Preview](public/hero/heroImage.png)

## Key Features

- **Dynamic Hero Section** - Particle background effects
- **Interactive Timeline** - Animated work experience showcase
- **Animated Skills Grid** - Technology logos with hover effects
- **Project Cards** - Featured projects with smooth animations
- **Responsive Design** - Works on all devices

## Tech Stack

- **React 18** + **Vite** - Modern React with fast build
- **Framer Motion** - Smooth animations and transitions
- **Particles.js** - Interactive background effects
- **CSS Modules** - Scoped component styling

## How It Works

The portfolio uses React components with Framer Motion for animations:

- **Hero Component** - Displays animated introduction with typewriter effect
- **Experience Component** - Interactive timeline showing work history
- **Skills Component** - Grid of technology logos with hover animations
- **Projects Component** - Cards displaying featured projects with details
- **Contact Component** - Links to social profiles and email

Data is stored in JSON files (`skills.json`, `projects.json`) making it easy to update content.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   npm install @fontsource/outfit @fontsource/roboto
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview build**
   ```bash
   npm run preview
   ```

## Structure

```
src/
├── components/         # React components (Hero, Skills, Projects, etc.)
├── data/              # JSON files for content (skills.json, projects.json)
└── App.jsx            # Main app component

public/
├── skills/            # Technology logos
├── projects/          # Project images
└── hero/              # Profile image and resume
```

## Customization

- **Add Skills**: Edit `src/data/skills.json`
- **Add Projects**: Edit `src/data/projects.json`  
- **Change Colors**: Update `src/vars.css`
- **Update Images**: Replace files in `public/` folders

## Contact

- **LinkedIn**: [Pavan Kumar Nuthi](https://linkedin.com/in/pavan-kumar-nuthi-80a9002a8)
- **GitHub**: [pavan-nuthi](https://github.com/pavan-nuthi)
- **Email**: pavankumarnuthi@gmail.com

---

Built with React + Framer Motion by [Pavan Kumar Nuthi](https://github.com/pavan-nuthi)

  



# Modern Personal Portfolio

A beautiful, minimal personal portfolio built with Vite + React and plain CSS. Features full-screen sections with smooth transitions, mobile swipe support, and adjustable scroll sensitivity.

## Features

- ✨ Full-screen section navigation (no page scroll)
- 🎨 Modern, minimal design with Poppins typography
- 📱 Fully responsive with mobile swipe support
- 🎯 Smooth opacity + slide transitions
- ⚡ Fast performance with Vite
- ♿ Accessible with keyboard navigation
- 🎪 Project carousel with detail panels
- 📝 Contact form with social links
- 🔧 Easy to customize

## Tech Stack

- **Vite** - Fast build tool
- **React** - UI library
- **Plain CSS** - No frameworks, just clean CSS
- **Poppins** - Google Font

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Customization

### Adding Your Hero Section

Replace the `HeroPlaceholder` component in `src/components/HeroPlaceholder.jsx` with your own hero section design.

### Editing Projects

Edit the `src/data/projectsData.js` file to add/modify your projects:

```javascript
{
  id: 'unique-id',
  title: 'Project Title',
  shortDescription: 'Brief description',
  image: '/assets/images/project.jpg',
  status: 'completed', // 'completed', 'ongoing', or 'maintenance'
  tags: ['React', 'CSS', 'Vite'],
  tools: ['React', 'Vite', 'CSS'],
  goal: 'Project goal description',
  description: 'Full project description',
  liveDemo: 'https://demo-url.com',
  repo: 'https://github.com/username/repo'
}
```

### Adding Images

Place your images in `public/assets/images/`:
- `project-placeholder-1.jpg` - Project thumbnails
- `profile-placeholder.jpg` - Profile photo
- `education-placeholder.jpg` - Education logos
- `work-placeholder.jpg` - Company logos

### Adjusting Scroll Sensitivity

Edit `src/utils/scrollConfig.js` to change scroll/swipe sensitivity:

```javascript
export function getScrollSensitivity() {
  const width = window.innerWidth;
  if (width < 480) return 100; // phones
  if (width < 768) return 80;
  if (width < 1024) return 60; // tablets
  return 50; // desktop
}
```

Higher values = less sensitive (require more scroll/swipe distance)

### Updating Social Links

Edit social links in:
- `src/components/ContactSection.jsx`
- `src/components/Footer.jsx`

### Color Scheme

The accent color `#a779f7` is used throughout. To change it, search and replace in all CSS files, or add a CSS variable.

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── HeroPlaceholder.jsx
│   ├── AboutSection.jsx
│   ├── AboutModal.jsx
│   ├── ProjectsCarousel.jsx
│   ├── ProjectCard.jsx
│   ├── ProjectDetailPanel.jsx
│   ├── ContactSection.jsx
│   └── Footer.jsx
├── data/
│   └── projectsData.js
├── styles/
│   ├── globals.css
│   ├── Navbar.css
│   ├── Hero.css
│   ├── About.css
│   ├── Modal.css
│   ├── Projects.css
│   ├── ProjectDetail.css
│   ├── Contact.css
│   └── Footer.css
├── utils/
│   └── scrollConfig.js
├── App.jsx
└── main.jsx
```

## Keyboard Navigation

- **Arrow Keys** - Navigate carousel projects
- **Escape** - Close modals/panels
- **Tab** - Focus navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use for your personal portfolio!

## Credits

Built with ❤️ using Vite + React

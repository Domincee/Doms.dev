import bananaLeafHero from '../assets/bg-images/bananaLeaf.svg';
import myGoal from '../assets/bg-images/myGoal.svg';
import howIsIt from '../assets/bg-images/howIsIt.svg';

const projects = [
  {
    id: 'project-1',
    title: 'Task Manager Pro',
    shortDescription: 'A modern task management application',
    image: bananaLeafHero,
    status: 'completed',
    tags: ['React', 'Vite', 'CSS'],
    tools: ['React', 'Vite', 'Plain CSS'],
    goal: 'Create an intuitive task management system to boost productivity and organization.',
    description: 'Task Manager Pro is a comprehensive solution for managing daily tasks and deadlines. Features include task categorization, priority levels, and deadline tracking. Built with React for a responsive user experience and styled with modern CSS for a clean interface.',
    liveDemo: '',
    repo: ''
  },
  {
    id: 'project-2',
    title: 'Weather Dashboard',
    shortDescription: 'Real-time weather tracking application',
    image: myGoal,
    status: 'ongoing',
    tags: ['React', 'API', 'CSS'],
    tools: ['React', 'Weather API', 'CSS'],
    goal: 'Provide users with accurate, real-time weather information in a beautiful interface.',
    description: 'Weather Dashboard integrates with weather APIs to display current conditions, forecasts, and weather alerts. Features location-based weather tracking, hourly and weekly forecasts, and interactive weather maps.',
    liveDemo: '',
    repo: ''
  },
  {
    id: 'project-3',
    title: 'Portfolio Template',
    shortDescription: 'Customizable developer portfolio',
    image: howIsIt,
    status: 'maintenance',
    tags: ['React', 'Vite', 'Responsive'],
    tools: ['React', 'Vite', 'CSS', 'GitHub Pages'],
    goal: 'Create a reusable, customizable portfolio template for developers.',
    description: 'A fully responsive portfolio template designed for developers. Includes sections for projects, skills, experience, and contact information. Easy to customize with a simple data structure and clean component architecture.',
    liveDemo: '',
    repo: ''
  },
  {
    id: 'project-4',
    title: 'E-Commerce Platform',
    shortDescription: 'Modern online shopping experience',
    image: howIsIt,
    status: 'completed',
    tags: ['React', 'Redux', 'API'],
    tools: ['React', 'Redux', 'REST API', 'Stripe'],
    goal: 'Build a scalable e-commerce platform with seamless checkout.',
    description: 'A full-featured e-commerce platform with product browsing, cart management, secure checkout, and order tracking. Integrated with Stripe for payment processing and includes an admin dashboard for inventory management.',
    liveDemo: '',
    repo: ''
  },
  {
    id: 'project-5',
    title: 'Fitness Tracker',
    shortDescription: 'Track workouts and progress',
    image: '/assets/images/project-placeholder-5.jpg',
    status: 'ongoing',
    tags: ['React', 'Charts', 'Mobile'],
    tools: ['React', 'Chart.js', 'LocalStorage'],
    goal: 'Help users track fitness goals and visualize progress over time.',
    description: 'A fitness tracking application that allows users to log workouts, set goals, and visualize progress through interactive charts. Features workout history, calorie tracking, and customizable exercise routines.',
    liveDemo: '',
    repo: ''
  },
  {
    id: 'project-6',
    title: 'Recipe Finder',
    shortDescription: 'Discover and save recipes',
    image: '/assets/images/project-placeholder-6.jpg',
    status: 'completed',
    tags: ['React', 'API', 'Search'],
    tools: ['React', 'Recipe API', 'CSS Grid'],
    goal: 'Create an intuitive recipe discovery platform with advanced search.',
    description: 'A recipe discovery platform that integrates with recipe APIs to provide search, filtering by ingredients and dietary restrictions, and the ability to save favorite recipes. Features detailed cooking instructions and nutritional information.',
    liveDemo: '',
    repo: ''
  }
];

export default projects;

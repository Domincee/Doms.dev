import bananaLeafHero from '../assets/bg-images/bananaLeaf.svg';
import myGoal from '../assets/bg-images/myGoal.svg';
import howIsIt from '../assets/bg-images/howIsIt.svg';
import summarizer from '../assets/bg-images/summarizer.jpg';


const project1Images = import.meta.glob(
  '../assets/project-imgs/project1/*.{png,jpg,jpeg,webp}',
  { eager: true }
);
const project2Images = import.meta.glob(
  '../assets/project-imgs/project2/*.{png,jpg,jpeg,webp}',
  { eager: true }
);

// Extract valid URLs regardless of how Vite wraps them
const images1 = Object.values(project1Images).map((mod) => {
  return mod?.default || mod;
});


const images2 = Object.values(project2Images)
  .map((mod) => mod?.default || mod)
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || 0, 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || 0, 10);
    return numA - numB; // ascending numeric order
  });

/* console.log(images2);  */
const projects = [
  {

     id: 'project-1',
    title: 'Banana Leaf Disease Detector (KNN)',
    shortDescription: 'Image classification system to identify banana leaf health using traditional computer vision features.',
    image: bananaLeafHero,
    totalImages: images1.length,
    dateStarted: "11-4-2025" ,

    images: images1,
    status: 'completed',
    tags: ['Python', 'Computer Vision', 'Machine Learning', 'Classification'],
    tools: ['OpenCV', 'Scikit-learn', 'Numpy', 'Pandas'],
    goal: 'Accurately classify banana leaf images (Healthy vs. Diseased vs None-leaf) by extracting color, texture, and shape features.',
    description: 'This project implements a banana leaf health classification system using classical Machine Learning. It processes input images to segment the leaf and extracts detailed features (such as GLCM texture, LBP, HOG, and color statistics). These features are then fed into a K-Nearest Neighbors (KNN) classifier, optimized via iterative search, to determine the leaf’s health status. The system includes data preprocessing, feature normalization, and robust model evaluation using confusion matrices.',
    liveDemo: '', // Add link if deployed
    repo: 'https://github.com/Domincee/Banana-Leaf-Detector'
  },
    {
      id: 'project-2',
      title: 'AI Text Summarizer (Web App)',
      shortDescription: 'A web app that generates concise summaries from long articles or text inputs using an AI-powered API.',
      image: summarizer,
      images: images2,
      dateStarted: "4-24-2024" ,

      totalImages: images1.length,
      status: 'maintenance',
      tags: ['React', 'RapidAPI', 'Tailwind CSS', 'NLP'],
      tools: ['Vite', 'React', 'Tailwind CSS', 'External AI API'],
      goal: 'Build a user-friendly, responsive tool that quickly condenses large text inputs, saving users time and improving information comprehension.',
      description:
        'The AI Text Summarizer is a modern web utility designed to tackle information overload. Built with React and styled using Tailwind CSS, it connects to an NLP-powered API (via RapidAPI) to generate accurate, concise summaries from any provided text or URL. The goal is to make content digestion faster and more efficient through an intuitive user experience.',
      liveDemo: '', // Add your deployed link when ready, e.g. 'https://summarizer.domince.com'
      repo: 'https://github.com/Domincee/Summarizer'
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
    image: howIsIt,
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
    image: howIsIt,
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

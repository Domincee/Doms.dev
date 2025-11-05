import bananaLeafHero from '../assets/bg-images/bananaLeaf.svg';
import myGoal from '../assets/bg-images/myGoal.svg';
import howIsIt from '../assets/bg-images/howIsIt.svg';
import summarizer from '../assets/bg-images/summarizer.jpg';
import Templx from '../assets/project-imgs/project3/1.png';


const project1Images = import.meta.glob(
  '../assets/project-imgs/project1/*.{png,jpg,jpeg,webp}',
  { eager: true }
);
const project2Images = import.meta.glob(
  '../assets/project-imgs/project2/*.{png,jpg,jpeg,webp}',
  { eager: true }
);

const project3Images = import.meta.glob(
  '../assets/project-imgs/project3/*.{png,jpg,jpeg,webp}',
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

const images3 = Object.values(project3Images)
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
    liveDemo: 'https://banana-leaf-detector.onrender.com/', // Add link if deployed
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
      liveDemo: 'https://summarizer-2-pve4.onrender.com/',
      repo: 'https://github.com/Domincee/Summarizer'
    },
  {
  id: 'project-3',
  title: 'Templyx',
  shortDescription: 'Inspirational developer portfolio platform with community features',
  image: Templx,
  images: images3,

  status: 'ongoing',
  tags: ['React', 'Vite', 'Supabase', 'Authentication', 'Real-time'],
  tools: ['React', 'Vite', 'CSS', 'Supabase', 'GitHub Pages'],
  goal: 'Create an inspirational portfolio template for developers to showcase their work creatively.',
  description: 'A modern portfolio platform for developers featuring user authentication, real-time notifications, project publishing and browsing, community interactions with reactions, and detailed profile pages. Built with React, Vite, and Supabase for a seamless and interactive developer experience.',
  liveDemo: 'https://templyx.vercel.app/',
  repo: 'https://github.com/Domincee/Templyx'
  },
  
];

export default projects;

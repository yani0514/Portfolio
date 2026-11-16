export interface SkillDomain {
  id: string;
  title: string;
  description: string;
  practice: string;
  skills: string[];
  studied: string[];
  projects: string[];
}
export const skillDomains: SkillDomain[] = [
  {
    id: 'robotics',
    title: 'Robotics & cyber-physical systems',
    description: 'Where algorithms meet sensors, actuators and physical constraints.',
    practice: 'Implemented a Pure Pursuit controller with C++ and ROS 2.',
    skills: ['ROS 2', 'C++', 'Pure Pursuit', 'TF2', 'Ackermann steering', 'RViz 2'],
    studied: ['LiDAR', 'SLAM fundamentals', 'Autonomous navigation'],
    projects: ['autonomous-racing-cars'],
  },
  {
    id: 'languages',
    title: 'Programming languages',
    description: 'Choosing a language around the system and its constraints.',
    practice: 'C++ for control, TypeScript for developer tools, and Python for data and AI.',
    skills: ['C++', 'Python', 'JavaScript', 'TypeScript', 'Java'],
    studied: ['Go · learning'],
    projects: ['autonomous-racing-cars', 'multi-coverage-visualization', 'generative-ai'],
  },
  {
    id: 'frontend',
    title: 'Frontend engineering',
    description: 'Clear interfaces for complex systems and meaningful data.',
    practice: 'Interactive web experiences, editor integration and this portfolio.',
    skills: [
      'React',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'CSS Modules',
      'Vite',
      'GSAP',
      'Three.js',
      'React Three Fiber',
    ],
    studied: [],
    projects: ['artmart', 'multi-coverage-visualization'],
  },
  {
    id: 'backend',
    title: 'Backend & connected systems',
    description: 'Reliable communication and explicit responsibilities across a system.',
    practice: 'Client-server coursework with sessions, validation and live collaboration.',
    skills: ['Node.js', 'Express', 'REST APIs', 'WebSockets', 'HTTP', 'Session handling'],
    studied: [],
    projects: ['artmart'],
  },
  {
    id: 'ai',
    title: 'Artificial intelligence & data',
    description: 'Mathematical foundations with a focus on observable, evaluated behavior.',
    practice: 'Machine learning implementations and LLM routing evaluation.',
    skills: ['Python', 'NumPy', 'Pandas', 'scikit-learn', 'Matplotlib', 'LLM evaluation'],
    studied: ['Regression', 'Classification', 'Optimization', 'Deep learning foundations'],
    projects: ['machine-learning', 'generative-ai'],
  },
  {
    id: 'tools',
    title: 'Tools & engineering practice',
    description: 'The habits and tooling that make technical work understandable.',
    practice: 'Collaborative Git workflows, modeling, debugging and security exercises.',
    skills: [
      'Git',
      'GitHub',
      'Linux',
      'WSL',
      'VS Code',
      'Docker',
      'Testing & debugging',
      'Sequence diagrams',
    ],
    studied: ['Network analysis', 'Secure programming'],
    projects: ['tutti', 'security-labs'],
  },
];

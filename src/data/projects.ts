export const categories = [
  'All projects',
  'Robotics',
  'Software',
  'AI & Data',
  'IoT',
  'Security',
] as const;
export type Category = (typeof categories)[number];
export type ProjectVisual =
  'racing' | 'coverage' | 'iot' | 'artmart' | 'ai' | 'tutti' | 'ml' | 'security';
export interface Project {
  slug: string;
  title: string;
  category: Exclude<Category, 'All projects'>;
  status: 'Coursework' | 'In development' | 'Concept · details pending';
  summary: string;
  institution: string;
  period: string;
  technologies: string[];
  visual: ProjectVisual;
  featured?: boolean;
  intro: string;
  role: string;
  architecture: { title: string; detail: string }[];
  implementation: { title: string; body: string }[];
  challenges: { title: string; body: string }[];
  outcome: string;
  next: string;
}

export const projects: Project[] = [
  {
    slug: 'autonomous-racing-cars',
    title: 'Autonomous Racing Cars',
    category: 'Robotics',
    status: 'Coursework',
    summary:
      'Path tracking meets the physical world. A Pure Pursuit controller built with C++ and ROS 2.',
    institution: 'TU Wien',
    period: 'Spring 2026',
    technologies: ['ROS 2', 'C++', 'Pure Pursuit', 'RViz', 'TF2'],
    visual: 'racing',
    featured: true,
    intro:
      'How does a small autonomous vehicle turn a planned path into a steering command? During the Autonomous Racing Cars course at TU Wien, I worked on that connection: a Pure Pursuit path-tracking controller for an F1TENTH-style vehicle.',
    role: 'Pure Pursuit controller implementation, path geometry and ROS 2 communication.',
    architecture: [
      {
        title: 'Planned path',
        detail: 'Path messages and vehicle pose provide the geometric input.',
      },
      {
        title: 'Target selection',
        detail: 'Choose a lookahead point and transform it into the vehicle frame using TF2.',
      },
      {
        title: 'Pure Pursuit',
        detail: 'Calculate curvature and convert it to a constrained steering angle.',
      },
      {
        title: 'Drive & inspect',
        detail: 'Publish Ackermann drive commands and a goal point for RViz 2.',
      },
    ],
    implementation: [
      {
        title: 'Coordinate frames first',
        body: 'The controller receives a planned path and finds the relevant position along it. The selected target is transformed into vehicle coordinates, where x points forward and y points left. Keeping geometry in a consistent frame makes the steering calculation meaningful.',
      },
      {
        title: 'From target to curvature',
        body: 'For a target (x, y), curvature is κ = 2y / (x² + y²). The steering command is δ = atan(Lκ), where L is the wheelbase, approximately 0.31 m in the known implementation. Steering is constrained to the vehicle’s available range.',
      },
      {
        title: 'ROS 2 integration',
        body: 'C++ nodes communicate through ROS 2 Jazzy, using nav_msgs, geometry_msgs and ackermann_msgs. The wider course environment includes LiDAR, SLAM Toolbox, map components and RViz 2; my main contribution was the path-tracking controller.',
      },
      {
        title: 'Lookahead as a control parameter',
        body: 'The system included dynamic lookahead tuning for driving conditions. A nearby target responds more sharply to path changes, while a farther target smooths steering. The interactive geometry below isolates this relationship without claiming to simulate the full vehicle.',
      },
    ],
    challenges: [
      {
        title: 'Consistent transforms',
        body: 'Path, vehicle pose and target must agree in coordinate frame and time before calculating control commands.',
      },
      {
        title: 'Responsive, constrained steering',
        body: 'Lookahead selection affects path tracking, while steering limits reflect what the physical platform can execute.',
      },
      {
        title: 'Making behavior observable',
        body: 'Publishing the chosen target makes it possible to inspect the geometric decision alongside the path in RViz.',
      },
    ],
    outcome:
      'Implemented and worked with a C++ Pure Pursuit controller in a ROS 2 autonomous racing environment. This course strengthened my interest in software that interacts with sensors, actuators and physical constraints. No competition rankings or measured performance results are reported here.',
    next: 'Explore how control, perception and planning fit together in complete autonomous systems.',
  },
  {
    slug: 'multi-coverage-visualization',
    title: 'Multi-Coverage Visualization',
    category: 'Software',
    status: 'In development',
    summary:
      'One editor, multiple perspectives. Bringing code coverage sources into a unified VS Code experience.',
    institution: 'University of Luxembourg',
    period: 'Semester project 5 · 2026',
    technologies: ['TypeScript', 'VS Code API', 'Code Coverage', 'Developer Tools'],
    visual: 'coverage',
    featured: true,
    intro:
      'A single coverage report only tells part of a testing story. My Bachelor Semester Project 5 explores how multiple sources can be represented together inside VS Code, so developers can reason about what their tests exercise.',
    role: 'Developing a TypeScript extension and exploring a unified coverage visualization.',
    architecture: [
      {
        title: 'Coverage sources',
        detail: 'Multiple reports provide different perspectives on the same code.',
      },
      {
        title: 'Representation',
        detail: 'A shared model connects coverage information to source lines.',
      },
      {
        title: 'Combined view',
        detail: 'Aggregation makes relationships between sources visible.',
      },
      {
        title: 'Editor workflow',
        detail: 'VS Code is the intended home for interpreting the results.',
      },
    ],
    implementation: [
      {
        title: 'A consistent representation',
        body: 'The project investigates coverage data representation and source handling. A useful combined view needs to preserve which source contributes each piece of information rather than flattening away the context.',
      },
      {
        title: 'Inside the development loop',
        body: 'TypeScript and the VS Code API provide the foundation for the extension. The intended workflow brings covered and uncovered lines closer to the code a developer is already reading.',
      },
      {
        title: 'An honest demonstration',
        body: 'The interactive example below combines two small synthetic coverage datasets. It illustrates source selection and union coverage; it is not a recording of the extension or evidence that the final features are complete.',
      },
    ],
    challenges: [
      {
        title: 'Preserving source meaning',
        body: 'Combining data should make agreement and differences between reports understandable.',
      },
      {
        title: 'Readable visual feedback',
        body: 'Coverage decorations should inform code reading without overwhelming syntax or relying only on color.',
      },
    ],
    outcome:
      'The project is in development. The documented scope is a VS Code extension for unified visualization of multiple coverage sources; final feature completeness and evaluation results are not yet established.',
    next: 'Refine source handling, aggregation and editor usability as the semester project develops.',
  },
  {
    slug: 'iot-room-selection',
    title: 'IoT Room Selection System',
    category: 'IoT',
    status: 'Concept · details pending',
    summary:
      'Exploring how sensor information and user preferences could inform university room selection.',
    institution: 'Project concept',
    period: 'Documentation pending',
    technologies: ['IoT', 'Decision Support', 'Data Visualization'],
    visual: 'iot',
    featured: true,
    intro:
      'A concept for helping people choose university rooms using environmental information and personal preferences. This entry comes from the portfolio’s visual brief; an implementation history has not yet been documented.',
    role: 'Concept entry. Personal implementation contributions are not yet established.',
    architecture: [
      {
        title: 'Room information',
        detail: 'Conceptual input: information about available spaces.',
      },
      { title: 'User preferences', detail: 'Conceptual input: the conditions a person values.' },
      { title: 'Decision support', detail: 'Conceptual output: a more informed room choice.' },
    ],
    implementation: [
      {
        title: 'The idea',
        body: 'The intended experience connects room information to a person’s preferences. The concept is relevant to cyber-physical systems because it links observations about physical spaces with a software interface.',
      },
      {
        title: 'What remains to be documented',
        body: 'The actual data sources, hardware, backend, selection logic and interface need supporting project material. Python and REST APIs appeared as possible technologies in the visual reference, but are not presented here as an implemented stack.',
      },
    ],
    challenges: [
      {
        title: 'A useful decision needs trustworthy inputs',
        body: 'Data freshness, available measurements and the meaning of a room recommendation would need to be defined before evaluating an implementation.',
      },
    ],
    outcome:
      'Concept only. No deployed system, collected sensor dataset, implemented algorithm or measured result is claimed.',
    next: 'Add authentic documentation, screenshots and implementation details when available.',
  },
  {
    slug: 'artmart',
    title: 'Artmart',
    category: 'Software',
    status: 'Coursework',
    summary:
      'An art framing and checkout application connecting a responsive client with a Node.js backend.',
    institution: 'TU Wien',
    period: 'Spring 2026',
    technologies: ['JavaScript', 'Node.js', 'Express', 'REST APIs', 'WebSockets'],
    visual: 'artmart',
    intro:
      'Artmart brought full-stack engineering into a concrete workflow: discover artwork, configure a frame, manage a cart and complete a checkout flow. It was developed across TU Wien Web Engineering coursework.',
    role: 'Coursework spanning client behavior, server endpoints and collaborative configuration.',
    architecture: [
      {
        title: 'Browser client',
        detail: 'Artwork search, framing controls and cart presentation.',
      },
      { title: 'Express API', detail: 'HTTP endpoints, input validation and price calculation.' },
      { title: 'Session cart', detail: 'Cart state associated with the client’s session.' },
      {
        title: 'Live collaboration',
        detail: 'WebSocket messages coordinate framing configuration.',
      },
    ],
    implementation: [
      {
        title: 'Clear client and server responsibilities',
        body: 'The client presents artwork and configuration controls. The server is responsible for validating input and calculating prices, so the browser is not treated as the authority for a checkout total.',
      },
      {
        title: 'State across requests',
        body: 'Session-associated shopping carts connect separate HTTP requests into a user workflow. External API integration supports artwork discovery and presentation.',
      },
      {
        title: 'A shared framing experience',
        body: 'WebSockets support collaborative framing configuration. The coursework introduces the distinction between ordinary request-response communication and an ongoing channel for coordinated changes.',
      },
    ],
    challenges: [
      {
        title: 'Keeping state consistent',
        body: 'Cart, framing options and calculated prices need consistent representations across browser and server.',
      },
      {
        title: 'Validating at the boundary',
        body: 'Server-side validation protects the application from malformed or incomplete client requests.',
      },
    ],
    outcome:
      'Practical full-stack coursework covering REST interfaces, session handling, validation, external APIs and WebSocket communication. No commercial deployment or production usage metrics are claimed.',
    next: 'Apply these client-server foundations to interfaces for physical and intelligent systems.',
  },
  {
    slug: 'generative-ai',
    title: 'Generative AI Evaluation',
    category: 'AI & Data',
    status: 'Coursework',
    summary: 'Routing, structured evaluation and error analysis for LLM-based text processing.',
    institution: 'University of Luxembourg',
    period: 'Academic coursework',
    technologies: ['Python', 'LLMs', 'Evaluation', 'Classification'],
    visual: 'ai',
    intro:
      'Useful AI systems need more than plausible text. This coursework involved building and evaluating a router, working with gold datasets and checking generated project artifacts against structured expectations.',
    role: 'Router development, evaluation, artifact verification and error analysis.',
    architecture: [
      { title: 'Text input', detail: 'Examples provide the input for routing or classification.' },
      { title: 'Router', detail: 'Model-based processing assigns an output or route.' },
      { title: 'Gold reference', detail: 'Expected labels provide a basis for evaluation.' },
      { title: 'Verification', detail: 'Outputs and traces help identify errors.' },
    ],
    implementation: [
      {
        title: 'Evaluate against a reference',
        body: 'Gold datasets make it possible to compare model outputs to expected behavior. The work included structured evaluation rather than relying on a few convincing examples.',
      },
      {
        title: 'Inspect what happened',
        body: 'Model outputs, traces and verification tooling support error analysis. Generated project artifacts were checked as part of the workflow.',
      },
    ],
    challenges: [
      {
        title: 'Plausibility is not correctness',
        body: 'A fluent answer can still violate routing or output requirements. Explicit reference data and validation make these errors visible.',
      },
      {
        title: 'Understanding failure cases',
        body: 'Looking at incorrect classifications and traces helps separate ambiguous inputs from systematic behavior.',
      },
    ],
    outcome:
      'Coursework experience with LLM routing and evaluation. The exact final application objective and quantitative results have not been established, so they are not inferred here.',
    next: 'Build more reliable intelligent systems through reproducible evaluation and clear interfaces.',
  },
  {
    slug: 'tutti',
    title: 'Tutti',
    category: 'Software',
    status: 'Coursework',
    summary:
      'Turning shared requirements into behavior models and architecture documentation with a team.',
    institution: 'University of Luxembourg',
    period: 'Group coursework',
    technologies: ['Software Modeling', 'Sequence Diagrams', 'Git', 'Architecture'],
    visual: 'tutti',
    intro:
      'Engineering a system together starts with a shared understanding of its behavior. Tutti was a software engineering group project involving models, architecture documentation, collaborative Git workflows and a project presentation.',
    role: 'Software behavior modeling, sequence diagrams, documentation and team collaboration.',
    architecture: [
      { title: 'Shared behavior', detail: 'Describe the interactions the system must support.' },
      { title: 'Sequence models', detail: 'Make responsibilities and message flow explicit.' },
      { title: 'Architecture', detail: 'Document how the pieces fit together.' },
      { title: 'Team workflow', detail: 'Use Git and presentations to communicate the work.' },
    ],
    implementation: [
      {
        title: 'Model interactions',
        body: 'Sequence diagrams describe behavior over time and make dependencies between participants visible. They provide a concrete artifact for reviewing a design as a group.',
      },
      {
        title: 'Document for other people',
        body: 'Architecture documentation and project presentation translate individual understanding into shared context. Git workflows support collaboration on those artifacts.',
      },
    ],
    challenges: [
      {
        title: 'Shared understanding',
        body: 'Different team members need a consistent interpretation of system responsibilities and behavior.',
      },
      {
        title: 'Keeping models useful',
        body: 'A diagram should communicate an important interaction clearly, without introducing unsupported implementation detail.',
      },
    ],
    outcome:
      'Documented experience in software modeling, architecture communication and team practices. Application features and implementation technologies are omitted where supporting material is unavailable.',
    next: 'Carry clear modeling and documentation practices into multidisciplinary engineering teams.',
  },
  {
    slug: 'machine-learning',
    title: 'Machine Learning Foundations',
    category: 'AI & Data',
    status: 'Coursework',
    summary:
      'From data preprocessing to gradient descent: the mathematics and code behind learning systems.',
    institution: 'TU Wien',
    period: 'Spring 2026',
    technologies: ['Python', 'NumPy', 'Pandas', 'scikit-learn', 'Matplotlib'],
    visual: 'ml',
    intro:
      'Machine learning becomes more useful when its mathematical assumptions are visible. My TU Wien coursework explored regression, classification and optimization through numerical computing and practical implementations.',
    role: 'Course exercises in preprocessing, model implementation, optimization and visualization.',
    architecture: [
      { title: 'Prepare data', detail: 'Preprocessing and feature transformations.' },
      { title: 'Define a model', detail: 'Regression or classification with explicit parameters.' },
      { title: 'Optimize', detail: 'Loss functions, gradients and regularization.' },
      { title: 'Inspect', detail: 'Numerical results and visualizations.' },
    ],
    implementation: [
      {
        title: 'Learn the objective',
        body: 'Topics included logistic regression and cross-entropy loss, connecting model outputs to an objective that can be optimized.',
      },
      {
        title: 'Follow the gradient',
        body: 'Gradient descent and regularization provide the foundation for understanding learning dynamics and model complexity. Polynomial feature transformations explore richer relationships in the input data.',
      },
      {
        title: 'Use the scientific ecosystem',
        body: 'Python, NumPy, Pandas, scikit-learn and Matplotlib support data preparation, numerical operations, modeling and visualization.',
      },
    ],
    challenges: [
      {
        title: 'Representing the input',
        body: 'Preprocessing and feature selection shape what a model can learn.',
      },
      {
        title: 'Model complexity',
        body: 'Regularization and feature transformations raise practical questions about fitting data and generalizing beyond it.',
      },
    ],
    outcome:
      'Academic foundations in regression, classification and optimization. These are coursework implementations, not independent research results or benchmark claims.',
    next: 'Connect these foundations to perception and decision-making in autonomous systems.',
  },
  {
    slug: 'security-labs',
    title: 'Security Labs & CTF',
    category: 'Security',
    status: 'Coursework',
    summary:
      'Exploring web security, network traffic and secure programming through controlled exercises.',
    institution: 'Academic security coursework',
    period: 'Coursework & CTF exercises',
    technologies: ['Python', 'Linux', 'Wireshark', 'Burp Suite', 'Nmap'],
    visual: 'security',
    intro:
      'Understanding how software fails is part of learning how to build it well. My security work includes coursework and capture-the-flag exercises involving web security, authentication and network analysis.',
    role: 'Controlled security exercises, traffic inspection and vulnerability analysis.',
    architecture: [
      { title: 'Controlled environment', detail: 'Coursework and CTF exercises define the scope.' },
      { title: 'Observe behavior', detail: 'Inspect application responses and network traffic.' },
      {
        title: 'Analyze boundaries',
        detail: 'Study inputs, authentication and trust assumptions.',
      },
      { title: 'Secure reasoning', detail: 'Relate observations to defensive programming.' },
    ],
    implementation: [
      {
        title: 'Web security foundations',
        body: 'Topics include SQL injection, authentication concepts and vulnerability assessment in controlled learning environments.',
      },
      {
        title: 'Observe the network',
        body: 'Wireshark and tcpdump support traffic inspection; Nmap and Burp Suite are part of the tooling used in security-oriented exercises. Python and Linux support the broader workflow.',
      },
    ],
    challenges: [
      {
        title: 'Reason about trust',
        body: 'Inputs, sessions and network boundaries each carry assumptions that can fail.',
      },
      {
        title: 'Make observations actionable',
        body: 'An unusual response or packet is a starting point for analysis, not a complete explanation on its own.',
      },
    ],
    outcome:
      'Academic and CTF experience with security analysis and secure programming principles. This portfolio does not disclose credentials, sensitive infrastructure or private findings.',
    next: 'Apply security-aware thinking to connected devices, APIs and engineering tools.',
  },
];

export function filterProjects(category: string, query: string) {
  const term = query.trim().toLocaleLowerCase();
  return projects.filter(
    (project) =>
      (category === 'All projects' || project.category === category) &&
      [project.title, project.summary, project.institution, ...project.technologies]
        .join(' ')
        .toLocaleLowerCase()
        .includes(term),
  );
}

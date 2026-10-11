// Dashboard Statistics
export const dashboardStats = {
  interviewsCompleted: 24,
  averageScore: 78,
  communicationScore: 82,
  improvementPercent: 12,
};

// Performance over time (for line/area charts)
export const performanceHistory = [
  { date: 'Jan', overall: 62, communication: 58, technical: 65, confidence: 60 },
  { date: 'Feb', overall: 65, communication: 63, technical: 67, confidence: 62 },
  { date: 'Mar', overall: 68, communication: 70, technical: 66, confidence: 68 },
  { date: 'Apr', overall: 72, communication: 74, technical: 71, confidence: 70 },
  { date: 'May', overall: 71, communication: 72, technical: 70, confidence: 73 },
  { date: 'Jun', overall: 75, communication: 76, technical: 74, confidence: 75 },
  { date: 'Jul', overall: 78, communication: 80, technical: 76, confidence: 77 },
  { date: 'Aug', overall: 82, communication: 82, technical: 80, confidence: 81 },
];

// Score distribution (for bar charts)
export const scoreDistribution = [
  { category: 'Answer Quality', score: 82 },
  { category: 'Communication', score: 78 },
  { category: 'Technical Knowledge', score: 85 },
  { category: 'Confidence', score: 74 },
  { category: 'Clarity', score: 80 },
  { category: 'Problem Solving', score: 76 },
];

// Recent interviews list
export const recentInterviews = [
  {
    id: '1',
    type: 'Technical',
    role: 'Senior Frontend Developer',
    date: '2024-08-15',
    score: 85,
    duration: '28 min',
    status: 'Completed',
    questionsAnswered: 10,
    totalQuestions: 10,
  },
  {
    id: '2',
    type: 'Behavioral',
    role: 'Software Engineer',
    date: '2024-08-12',
    score: 78,
    duration: '22 min',
    status: 'Completed',
    questionsAnswered: 8,
    totalQuestions: 10,
  },
  {
    id: '3',
    type: 'HR',
    role: 'MERN Stack Developer',
    date: '2024-08-10',
    score: 82,
    duration: '18 min',
    status: 'Completed',
    questionsAnswered: 10,
    totalQuestions: 10,
  },
  {
    id: '4',
    type: 'Technical',
    role: 'Backend Developer',
    date: '2024-08-08',
    score: 71,
    duration: '25 min',
    status: 'Completed',
    questionsAnswered: 9,
    totalQuestions: 10,
  },
  {
    id: '5',
    type: 'Mixed',
    role: 'Full Stack Developer',
    date: '2024-08-05',
    score: 88,
    duration: '30 min',
    status: 'Completed',
    questionsAnswered: 15,
    totalQuestions: 15,
  },
  {
    id: '6',
    type: 'Behavioral',
    role: 'Data Analyst',
    date: '2024-08-01',
    score: 75,
    duration: '20 min',
    status: 'Completed',
    questionsAnswered: 10,
    totalQuestions: 10,
  },
  {
    id: '7',
    type: 'Technical',
    role: 'Frontend Developer',
    date: '2024-07-28',
    score: 68,
    duration: '24 min',
    status: 'Completed',
    questionsAnswered: 10,
    totalQuestions: 10,
  },
  {
    id: '8',
    type: 'HR',
    role: 'Software Engineer',
    date: '2024-07-25',
    score: 80,
    duration: '15 min',
    status: 'Completed',
    questionsAnswered: 5,
    totalQuestions: 5,
  },
];

// Interview questions (for the live interview page)
export const interviewQuestions = [
  {
    id: 1,
    question: 'Tell me about yourself and your experience with full-stack development.',
    type: 'introduction',
    difficulty: 'easy',
    timeLimit: 120,
  },
  {
    id: 2,
    question: 'Can you explain the difference between REST and GraphQL APIs? When would you choose one over the other?',
    type: 'technical',
    difficulty: 'medium',
    timeLimit: 180,
  },
  {
    id: 3,
    question: 'Describe a challenging project you worked on. What was your role and how did you overcome the obstacles?',
    type: 'behavioral',
    difficulty: 'medium',
    timeLimit: 180,
  },
  {
    id: 4,
    question: 'How do you handle state management in large React applications? Compare different approaches.',
    type: 'technical',
    difficulty: 'hard',
    timeLimit: 180,
  },
  {
    id: 5,
    question: 'Tell me about a time when you had to work with a difficult team member. How did you handle the situation?',
    type: 'behavioral',
    difficulty: 'medium',
    timeLimit: 150,
  },
  {
    id: 6,
    question: 'Explain the concept of database indexing. How does it improve query performance?',
    type: 'technical',
    difficulty: 'medium',
    timeLimit: 150,
  },
  {
    id: 7,
    question: 'What is your approach to testing in a full-stack application? Describe the testing pyramid.',
    type: 'technical',
    difficulty: 'medium',
    timeLimit: 180,
  },
  {
    id: 8,
    question: 'Where do you see yourself in five years? How does this role align with your career goals?',
    type: 'hr',
    difficulty: 'easy',
    timeLimit: 120,
  },
  {
    id: 9,
    question: 'How would you design a real-time notification system for a web application?',
    type: 'technical',
    difficulty: 'hard',
    timeLimit: 240,
  },
  {
    id: 10,
    question: 'What motivates you as a developer? How do you stay updated with the latest technologies?',
    type: 'hr',
    difficulty: 'easy',
    timeLimit: 120,
  },
];

// Results data for a completed interview
export const interviewResults = {
  id: '1',
  date: '2024-08-15',
  type: 'Technical',
  role: 'Senior Frontend Developer',
  duration: '28 min',
  questionsAnswered: 10,
  totalQuestions: 10,
  overallScore: 82,
  performanceLabel: 'Good Performance',
  scores: {
    overall: 82,
    answerQuality: 85,
    communication: 78,
    confidence: 80,
    clarity: 84,
    technicalKnowledge: 86,
  },
  verbal: {
    answerRelevance: 88,
    vocabulary: 82,
    grammar: 90,
    fillerWords: 72,
    answerStructure: 78,
  },
  vocal: {
    speakingPace: 76,
    pauses: 80,
    voiceStability: 82,
    energy: 74,
  },
  visual: {
    eyeContact: 70,
    posture: 78,
    facialEngagement: 72,
    attention: 82,
  },
  strengths: [
    'Clear and structured technical explanations',
    'Strong vocabulary and professional language',
    'Good understanding of core concepts',
    'Consistent speaking pace throughout the interview',
    'Excellent grammar and articulation',
  ],
  improvements: [
    'Reduce usage of filler words (um, uh, like)',
    'Improve answer conciseness — some responses were longer than necessary',
    'Maintain stronger eye contact with the camera',
    'Use the STAR method for behavioral questions',
    'Add more specific examples from past experience',
  ],
  aiFeedback: 'Your overall performance demonstrates solid technical knowledge and good communication skills. You showed particular strength in explaining complex concepts clearly. To improve further, focus on reducing filler words and structuring your behavioral answers using the STAR method (Situation, Task, Action, Result). Your visual behavioral signals suggest you could benefit from practicing with a camera to build more natural eye contact. Consider preparing 2-3 specific project examples you can reference across different question types.',
  questionResults: [
    { question: 'Tell me about yourself...', score: 85, feedback: 'Good introduction with relevant experience highlights.' },
    { question: 'REST vs GraphQL...', score: 90, feedback: 'Excellent technical comparison with practical examples.' },
    { question: 'Challenging project...', score: 78, feedback: 'Good story but could use more specific metrics.' },
    { question: 'State management...', score: 88, feedback: 'Comprehensive answer covering multiple approaches.' },
    { question: 'Difficult team member...', score: 72, feedback: 'Answer lacked specific resolution details.' },
    { question: 'Database indexing...', score: 85, feedback: 'Clear explanation with good examples.' },
    { question: 'Testing approach...', score: 82, feedback: 'Solid understanding of testing pyramid.' },
    { question: 'Five year plan...', score: 80, feedback: 'Good alignment with role, could be more specific.' },
    { question: 'Notification system...', score: 78, feedback: 'Good high-level design, missed some edge cases.' },
    { question: 'Motivation...', score: 82, feedback: 'Authentic answer with good self-awareness.' },
  ],
};

// Recommended improvements for dashboard
export const recommendedImprovements = [
  {
    id: 1,
    title: 'Reduce filler words',
    description: 'Your filler word usage has decreased but still averages 8 per answer. Aim for fewer than 3.',
    priority: 'high',
    category: 'Communication',
  },
  {
    id: 2,
    title: 'Improve answer structure',
    description: 'Use frameworks like STAR for behavioral questions and structured approaches for technical ones.',
    priority: 'medium',
    category: 'Content',
  },
  {
    id: 3,
    title: 'Maintain consistent speaking pace',
    description: 'Your pace tends to speed up during complex explanations. Practice deliberate pausing.',
    priority: 'medium',
    category: 'Vocal',
  },
  {
    id: 4,
    title: 'Strengthen eye contact',
    description: 'Visual behavioral signals indicate frequent gaze shifts. Practice looking directly at the camera.',
    priority: 'low',
    category: 'Visual',
  },
];

// User profile data
export const userProfile = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  role: 'Software Engineer',
  experience: 'Mid-Level',
  avatar: null,
  joinDate: '2024-01-15',
  interviewsTaken: 24,
  averageScore: 78,
  strongestArea: 'Technical Knowledge',
  weakestArea: 'Filler Words',
};

// Interview type options
export const interviewTypes = [
  { value: 'technical', label: 'Technical', description: 'Data structures, algorithms, system design, and coding concepts' },
  { value: 'hr', label: 'HR', description: 'Culture fit, motivation, salary expectations, and company knowledge' },
  { value: 'behavioral', label: 'Behavioral', description: 'Past experiences, teamwork, leadership, and conflict resolution' },
  { value: 'mixed', label: 'Mixed', description: 'A combination of technical, behavioral, and HR questions' },
];

// Target roles
export const targetRoles = [
  'Software Engineer',
  'MERN Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Analyst',
  'Data Scientist',
  'DevOps Engineer',
  'Product Manager',
];

// Difficulty levels
export const difficultyLevels = [
  { value: 'beginner', label: 'Beginner', description: 'Entry-level questions for freshers and juniors' },
  { value: 'intermediate', label: 'Intermediate', description: 'Mid-level questions requiring practical experience' },
  { value: 'advanced', label: 'Advanced', description: 'Senior-level questions with system design and architecture' },
];

// Performance page detailed analysis
export const performanceAnalysis = {
  overall: {
    score: 78,
    trend: 'up',
    change: 12,
    label: 'Good',
  },
  categories: [
    { name: 'Answer Quality', score: 82, trend: 'up', change: 8 },
    { name: 'Communication', score: 78, trend: 'up', change: 15 },
    { name: 'Technical Knowledge', score: 85, trend: 'up', change: 10 },
    { name: 'Confidence', score: 74, trend: 'up', change: 14 },
    { name: 'Clarity', score: 80, trend: 'stable', change: 2 },
    { name: 'Problem Solving', score: 76, trend: 'up', change: 11 },
  ],
  radarData: [
    { subject: 'Answer Quality', score: 82, fullMark: 100 },
    { subject: 'Communication', score: 78, fullMark: 100 },
    { subject: 'Technical', score: 85, fullMark: 100 },
    { subject: 'Confidence', score: 74, fullMark: 100 },
    { subject: 'Clarity', score: 80, fullMark: 100 },
    { subject: 'Problem Solving', score: 76, fullMark: 100 },
  ],
};

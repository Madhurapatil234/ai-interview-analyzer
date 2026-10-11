import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Download, CheckCircle, AlertTriangle, Sparkles, 
  ChevronDown, ChevronUp, MessageSquare, Mic, Eye, 
  BarChart2, BrainCircuit, Activity
} from 'lucide-react';
import { interviewResults } from '../data/mockData';

const ProgressBar = ({ progress, colorClass }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div className={`h-2.5 rounded-full ${colorClass}`} style={{ width: `${progress}%` }}></div>
  </div>
);

const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

const getProgressBarColor = (score) => {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

export default function Results() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('verbal');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const data = interviewResults || {
    overallScore: 82,
    date: 'Oct 6, 2026',
    type: 'Technical Interview',
    role: 'Frontend Developer',
    performanceLabel: 'Good Performance',
    metrics: [
      { label: 'Overall Performance', score: 82, icon: BarChart2 },
      { label: 'Answer Quality', score: 85, icon: MessageSquare },
      { label: 'Communication', score: 78, icon: Mic },
      { label: 'Confidence', score: 80, icon: Activity },
      { label: 'Clarity', score: 84, icon: Eye },
      { label: 'Technical Knowledge', score: 86, icon: BrainCircuit }
    ],
    verbal: [
      { label: 'Answer Relevance', score: 88 },
      { label: 'Vocabulary', score: 82 },
      { label: 'Grammar', score: 90 },
      { label: 'Filler Words', score: 72 },
      { label: 'Answer Structure', score: 78 }
    ],
    vocal: [
      { label: 'Speaking Pace', score: 76 },
      { label: 'Pauses', score: 80 },
      { label: 'Voice Stability', score: 82 },
      { label: 'Energy', score: 74 }
    ],
    visual: [
      { label: 'Eye Contact', score: 70 },
      { label: 'Posture', score: 78 },
      { label: 'Facial Engagement', score: 72 },
      { label: 'Attention', score: 82 }
    ],
    strengths: [
      'Strong technical knowledge and problem-solving skills.',
      'Clear and concise communication of complex concepts.',
      'Good eye contact and professional posture.'
    ],
    improvements: [
      'Reduce the use of filler words (e.g., "um", "like").',
      'Pace yourself when explaining technical architecture.',
      'Show more facial engagement when listening to questions.'
    ],
    aiFeedback: 'Overall, a solid performance. You demonstrated a good understanding of frontend technologies, especially React and state management. Your communication was generally clear, but try to speak a bit slower when explaining complex topics to ensure the interviewer can follow your thought process easily. Consider reducing filler words to sound more confident.',
    questions: [
      { id: 1, question: 'Can you explain the virtual DOM in React?', score: 85, feedback: 'Excellent explanation. You clearly distinguished between the real DOM and virtual DOM, and accurately described the reconciliation process.' },
      { id: 2, question: 'How do you manage state in a large application?', score: 75, feedback: 'Good overview of Redux and Context API, but missed discussing more modern approaches like Zustand or server state management with React Query.' },
      { id: 3, question: 'Describe a time you had to optimize a slow web page.', score: 90, feedback: 'Great STAR method usage. Concrete examples of lazy loading, code splitting, and memoization showed deep practical experience.' }
    ]
  };

  const tabs = [
    { id: 'verbal', label: 'Verbal Analysis' },
    { id: 'vocal', label: 'Vocal Analysis' },
    { id: 'visual', label: 'Visual Behavioral Analysis' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Interview Performance Report</h1>
          <p className="text-gray-500">{data.date} • {data.type} • {data.role}</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </button>
      </div>

      {/* Overall Score Hero */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-indigo-500 mb-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900">{data.overallScore}</div>
            <div className="text-sm text-gray-500">Out of 100</div>
          </div>
        </div>
        <div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getScoreColor(data.overallScore)}`}>
            {data.performanceLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {data.metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-100 text-left">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-white rounded-md shadow-sm text-gray-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-700">{metric.label}</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">{metric.score}</span>
                </div>
                <ProgressBar progress={metric.score} colorClass={getProgressBarColor(metric.score)} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Breakdown Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id 
                    ? 'border-indigo-500 text-indigo-600 bg-indigo-50/50' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'visual' && (
            <div className="mb-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100">
              Note: These metrics represent visual behavioral signal indicators and should be interpreted as general patterns rather than definitive assessments.
            </div>
          )}
          <div className="space-y-5">
            {(data[activeTab] || []).map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900">{item.score}/100</span>
                </div>
                <ProgressBar progress={item.score} colorClass={getProgressBarColor(item.score)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
            <h3 className="text-lg font-bold text-gray-900">Key Strengths</h3>
          </div>
          <ul className="space-y-4">
            {data.strengths.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            <h3 className="text-lg font-bold text-gray-900">Areas to Improve</h3>
          </div>
          <ul className="space-y-4">
            {data.improvements.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Feedback Section */}
      <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-6">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">AI Feedback Summary</h3>
            <p className="text-indigo-800 leading-relaxed">
              {data.aiFeedback}
            </p>
          </div>
        </div>
      </div>

      {/* Question-by-Question Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Question Results</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {data.questions.map((q, idx) => (
            <div key={q.id} className="p-6">
              <button 
                onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                className="w-full flex items-center justify-between focus:outline-none"
              >
                <div className="flex items-center flex-1 text-left">
                  <div className="mr-4 flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
                    Q{idx + 1}
                  </div>
                  <div className="flex-1 pr-4">
                    <h4 className="text-base font-semibold text-gray-900">{q.question}</h4>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right hidden sm:block">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getScoreColor(q.score)}`}>
                      Score: {q.score}
                    </span>
                  </div>
                  {expandedQuestion === q.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              {expandedQuestion === q.id && (
                <div className="mt-4 pl-12 pr-4 sm:pr-12">
                  <div className="sm:hidden mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getScoreColor(q.score)}`}>
                      Score: {q.score}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1 text-xs text-gray-500">
                      <span>Performance Indicator</span>
                      <span>{q.score}/100</span>
                    </div>
                    <ProgressBar progress={q.score} colorClass={getProgressBarColor(q.score)} />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 border border-gray-100">
                    <span className="font-semibold text-gray-900 block mb-1">Feedback:</span>
                    {q.feedback}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

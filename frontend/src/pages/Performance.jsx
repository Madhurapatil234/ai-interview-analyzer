import React from 'react';
import { 
  TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, 
  Target
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { 
  performanceAnalysis, performanceHistory, scoreDistribution, 
  recommendedImprovements 
} from '../data/mockData';

const getTrendIcon = (trend) => {
  if (trend > 0) return <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />;
  if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-500 mr-1" />;
  return <Minus className="w-4 h-4 text-gray-400 mr-1" />;
};

const getTrendColor = (trend) => {
  if (trend > 0) return 'text-emerald-600';
  if (trend < 0) return 'text-red-600';
  return 'text-gray-500';
};

const getProgressBarColor = (score) => {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

const ProgressBar = ({ progress, colorClass }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 mt-3 dark:bg-gray-700">
    <div className={`h-2 rounded-full ${colorClass}`} style={{ width: `${progress}%` }}></div>
  </div>
);

export default function Performance() {
  const analysis = performanceAnalysis || {
    overallScore: 78,
    trend: 12,
    label: 'Good',
    description: 'Your overall performance has been consistently improving over the past month.',
    categories: [
      { name: 'Technical Skills', score: 82, trend: 5 },
      { name: 'Communication', score: 75, trend: -2 },
      { name: 'Problem Solving', score: 88, trend: 8 },
      { name: 'Leadership', score: 65, trend: 0 },
      { name: 'Behavioral', score: 79, trend: 3 },
      { name: 'System Design', score: 70, trend: 15 }
    ],
    radarData: [
      { subject: 'Technical', A: 82, fullMark: 100 },
      { subject: 'Communication', A: 75, fullMark: 100 },
      { subject: 'Problem Solving', A: 88, fullMark: 100 },
      { subject: 'Leadership', A: 65, fullMark: 100 },
      { subject: 'Behavioral', A: 79, fullMark: 100 },
      { subject: 'System Design', A: 70, fullMark: 100 }
    ],
    strengths: [
      'Strong problem solving and analytical thinking.',
      'Consistent improvement in system design questions.',
      'Technical proficiency in core frontend concepts.'
    ],
    improvements: [
      'Communication clarity under pressure can be improved.',
      'Leadership examples need more concrete details.',
      'Reduce pause duration when framing answers.'
    ]
  };

  const historyData = performanceHistory || [
    { date: 'Sep 1', score: 65 },
    { date: 'Sep 8', score: 68 },
    { date: 'Sep 15', score: 72 },
    { date: 'Sep 22', score: 75 },
    { date: 'Sep 29', score: 82 },
    { date: 'Oct 6', score: 78 }
  ];

  const distributionData = scoreDistribution || [
    { name: '<60', count: 2 },
    { name: '60-69', count: 5 },
    { name: '70-79', count: 8 },
    { name: '80-89', count: 12 },
    { name: '90-100', count: 3 }
  ];

  const improvements = recommendedImprovements || [
    { id: 1, priority: 'High', category: 'Communication', title: 'Reduce Filler Words', description: 'Practice speaking with deliberate pauses instead of using words like "um" or "like".' },
    { id: 2, priority: 'Medium', category: 'System Design', title: 'Deepen Microservices Knowledge', description: 'Review architectural patterns for distributed systems and inter-service communication.' },
    { id: 3, priority: 'Low', category: 'Behavioral', title: 'Enhance STAR Stories', description: 'Prepare more detailed examples of overcoming conflicts in a team setting.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Performance Analysis</h1>
        <p className="text-gray-500 mt-1">Track your interview performance over time</p>
      </div>

      {/* Overall Score Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-8">
        <div className="text-center md:text-left flex-shrink-0">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <span className="text-6xl font-bold text-gray-900">{analysis.overallScore}</span>
            <div className={`flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${getTrendColor(analysis.trend)} bg-gray-50 border border-gray-200`}>
              {getTrendIcon(analysis.trend)}
              {Math.abs(analysis.trend)}%
            </div>
          </div>
          <div className="mt-2 text-xl font-semibold text-indigo-600">{analysis.label}</div>
        </div>
        <div className="text-gray-600 leading-relaxed md:border-l md:border-gray-200 md:pl-8">
          {analysis.description}
        </div>
      </div>

      {/* Category Scores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {analysis.categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-700">{cat.name}</h3>
              <div className={`flex items-center text-sm font-medium ${getTrendColor(cat.trend)}`}>
                {getTrendIcon(cat.trend)}
                {Math.abs(cat.trend)}%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{cat.score}</div>
            <ProgressBar progress={cat.score} colorClass={getProgressBarColor(cat.score)} />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Line type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Skill Analysis</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={analysis.radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4B5563', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                <Radar name="Score" dataKey="A" stroke="#6366F1" fill="#6366F1" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Breakdown Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Score Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="count" fill="#818CF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
            {analysis.strengths.map((item, idx) => (
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
            {analysis.improvements.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Improvement Plan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Target className="w-6 h-6 text-indigo-500" />
          <h3 className="text-lg font-bold text-gray-900">Improvement Plan</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {improvements.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">
                  {item.category}
                </span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  item.priority === 'High' ? 'bg-red-50 text-red-600' : 
                  item.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  {item.priority}
                </span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

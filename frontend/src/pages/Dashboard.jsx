import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Target, 
  TrendingUp, 
  MessageSquare, 
  ArrowUpRight, 
  Calendar, 
  ChevronRight,
  Play
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { 
  dashboardStats, 
  performanceHistory, 
  scoreDistribution, 
  recentInterviews, 
  recommendedImprovements 
} from '../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 ring-emerald-600/20';
    if (score >= 60) return 'text-amber-700 bg-amber-50 ring-amber-600/20';
    return 'text-red-700 bg-red-50 ring-red-600/20';
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-8 pb-12 px-4 sm:px-6 lg:px-8 font-sans animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Calendar className="w-4 h-4" />
              <span>{today}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-gray-500 mt-1">
              Ready for your next interview? Review your progress below.
            </p>
          </div>
          <button 
            onClick={() => navigate('/interview/setup')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Play className="w-4 h-4 fill-current" />
            Start New Interview
          </button>
        </div>

        {/* Statistics Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4 transition-all hover:shadow-md">
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Interviews Completed</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{dashboardStats?.interviewsCompleted || 0}</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4 transition-all hover:shadow-md">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Average Score</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{dashboardStats?.averageScore || 0}/100</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4 transition-all hover:shadow-md">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Communication Score</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{dashboardStats?.communicationScore || 0}/100</h3>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4 transition-all hover:shadow-md">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Improvement</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">+{dashboardStats?.improvement || 0}%</h3>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Trend</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceHistory} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '0.75rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="overall" name="Overall" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="communication" name="Communication" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="technical" name="Technical" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="confidence" name="Confidence" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Score Breakdown</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistribution} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '0.75rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="score" name="Score" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Interviews Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recent Interviews</h3>
            <Link to="/history" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Interview Type</th>
                  <th className="px-6 py-4">Target Role</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {(recentInterviews || []).slice(0, 5).map((interview) => (
                  <tr key={interview.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{interview.type}</td>
                    <td className="px-6 py-4">{interview.role}</td>
                    <td className="px-6 py-4 text-gray-500">{interview.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${getScoreColor(interview.score)}`}>
                        {interview.score}/100
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        {interview.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        to={`/results/${interview.id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        View Report
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Improvements Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Improvements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(recommendedImprovements || []).map((improvement) => (
              <div key={improvement.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full transition-all hover:shadow-md hover:border-indigo-100">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-md">
                    {improvement.category}
                  </span>
                  <div className="flex items-center gap-1.5" title={`${improvement.priority} Priority`}>
                    <span className={`w-2 h-2 rounded-full ${getPriorityColor(improvement.priority)}`}></span>
                    <span className="text-xs text-gray-500 capitalize">{improvement.priority}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{improvement.title}</h4>
                <p className="text-sm text-gray-600 flex-grow">{improvement.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

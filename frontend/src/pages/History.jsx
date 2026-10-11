import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, Clock, ChevronRight, XCircle } from 'lucide-react';
import { recentInterviews } from '../data/mockData';

const defaultInterviews = [
  { id: '1', role: 'Frontend Developer', type: 'Technical', date: 'Oct 6, 2026', score: 82, duration: '45m', status: 'Completed' },
  { id: '2', role: 'Full Stack Engineer', type: 'Mixed', date: 'Oct 2, 2026', score: 75, duration: '60m', status: 'Completed' },
  { id: '3', role: 'UI Engineer', type: 'Behavioral', date: 'Sep 28, 2026', score: 88, duration: '30m', status: 'Completed' },
  { id: '4', role: 'Frontend Developer', type: 'Technical', date: 'Sep 20, 2026', score: 65, duration: '45m', status: 'Completed' }
];

const getTypeColor = (type) => {
  switch (type.toLowerCase()) {
    case 'technical': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'behavioral': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'hr': return 'bg-pink-100 text-pink-800 border-pink-200';
    case 'mixed': return 'bg-orange-100 text-orange-800 border-orange-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-700 bg-emerald-100 border-emerald-200';
  if (score >= 60) return 'text-amber-700 bg-amber-100 border-amber-200';
  return 'text-red-700 bg-red-100 border-red-200';
};

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortOption, setSortOption] = useState('Newest First');

  const interviews = recentInterviews || defaultInterviews;

  const filteredInterviews = interviews.filter(i => {
    const matchesSearch = i.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || i.type === typeFilter;
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    // Basic sorting logic mock
    if (sortOption === 'Newest First') return -1;
    if (sortOption === 'Oldest First') return 1;
    if (sortOption === 'Highest Score') return b.score - a.score;
    if (sortOption === 'Lowest Score') return a.score - b.score;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interview History</h1>
          <p className="text-gray-500 mt-1">Review your past interview sessions</p>
        </div>
        <Link 
          to="/interview/setup"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start New Interview
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search by role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative w-full md:w-48">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>
          
          <div className="relative w-full md:w-48">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Newest First">Newest First</option>
              <option value="Oldest First">Oldest First</option>
              <option value="Highest Score">Highest Score</option>
              <option value="Lowest Score">Lowest Score</option>
            </select>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600 font-medium">
        Showing {filteredInterviews.length} interview{filteredInterviews.length !== 1 ? 's' : ''}
      </div>

      {/* Interview List */}
      {filteredInterviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredInterviews.map((interview) => (
            <div key={interview.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getTypeColor(interview.type)}`}>
                    {interview.type}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                    {interview.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{interview.role}</h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                    {interview.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
                    {interview.duration}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-6 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1 font-medium">Overall Score</div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getScoreColor(interview.score)}`}>
                    {interview.score}/100
                  </span>
                </div>
                
                <Link
                  to={`/results/${interview.id}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Report
                  <ChevronRight className="ml-2 -mr-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl border-dashed">
          <Search className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No interviews found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <div className="mt-6">
            <button
              onClick={() => { setSearchTerm(''); setTypeFilter('All'); }}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <XCircle className="-ml-1 mr-2 h-5 w-5" />
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Pagination (mock) */}
      {filteredInterviews.length > 0 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-xl border mt-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredInterviews.length}</span> of <span className="font-medium">{filteredInterviews.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" disabled>
                  <span className="sr-only">Previous</span>
                  <ChevronRight className="h-5 w-5 transform rotate-180" aria-hidden="true" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" disabled>
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

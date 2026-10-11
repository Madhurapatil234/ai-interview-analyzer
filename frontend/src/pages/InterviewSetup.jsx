import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, Users, Heart, Layers, ChevronDown, Upload, 
  Info, ChevronRight, ChevronUp 
} from 'lucide-react';
import { interviewTypes, targetRoles, difficultyLevels } from '../data/mockData';

const InterviewSetup = () => {
  const navigate = useNavigate();
  
  // State
  const [interviewType, setInterviewType] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [duration, setDuration] = useState(10);
  
  // Optional section state
  const [showOptional, setShowOptional] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState({});

  // Icons mapping for interview types
  const getIconForType = (id) => {
    switch (id) {
      case 'technical': return <Code className="w-6 h-6" />;
      case 'hr': return <Users className="w-6 h-6" />;
      case 'behavioral': return <Heart className="w-6 h-6" />;
      case 'mixed': return <Layers className="w-6 h-6" />;
      default: return <Code className="w-6 h-6" />;
    }
  };

  const getDifficultyColor = (levelId) => {
    switch(levelId) {
      case 'beginner': return 'text-green-600 border-green-200 bg-green-50';
      case 'intermediate': return 'text-amber-600 border-amber-200 bg-amber-50';
      case 'advanced': return 'text-red-600 border-red-200 bg-red-50';
      default: return 'text-gray-600 border-gray-200 bg-gray-50';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!interviewType) newErrors.interviewType = 'Please select an interview type';
    if (!targetRole) newErrors.targetRole = 'Please select a target role';
    if (targetRole === 'custom' && !customRole.trim()) newErrors.customRole = 'Please enter a custom role';
    if (!difficulty) newErrors.difficulty = 'Please select a difficulty level';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    navigate('/interview');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Set Up Your Interview</h1>
          <p className="mt-2 text-lg text-gray-600">Configure your mock interview session</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            
            {/* Interview Type */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Interview Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {interviewTypes.map((type) => (
                  <div 
                    key={type.id}
                    onClick={() => {
                      setInterviewType(type.id);
                      setErrors({...errors, interviewType: null});
                    }}
                    className={`relative rounded-lg border p-4 cursor-pointer flex flex-col items-start hover:bg-gray-50 transition-colors ${
                      interviewType === type.id 
                        ? 'border-indigo-600 bg-indigo-50 hover:bg-indigo-50 ring-1 ring-indigo-600' 
                        : 'border-gray-300'
                    }`}
                  >
                    <div className="flex items-center w-full mb-2">
                      <div className={`p-2 rounded-lg ${interviewType === type.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
                        {getIconForType(type.id)}
                      </div>
                      <span className="ml-3 font-medium text-gray-900">{type.name}</span>
                      <div className="ml-auto flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 bg-white">
                        {interviewType === type.id && <div className="w-3 h-3 rounded-full bg-indigo-600" />}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                ))}
              </div>
              {errors.interviewType && <p className="mt-2 text-sm text-red-600">{errors.interviewType}</p>}
            </div>

            {/* Target Role */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Target Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={targetRole}
                  onChange={(e) => {
                    setTargetRole(e.target.value);
                    setErrors({...errors, targetRole: null});
                  }}
                  className="appearance-none block w-full bg-white border border-gray-300 text-gray-900 py-3 px-4 pr-10 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a role...</option>
                  {targetRoles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                  <option value="custom">Custom Role...</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
              {errors.targetRole && <p className="mt-2 text-sm text-red-600">{errors.targetRole}</p>}
              
              {targetRole === 'custom' && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="E.g. Senior Machine Learning Engineer"
                    value={customRole}
                    onChange={(e) => {
                      setCustomRole(e.target.value);
                      setErrors({...errors, customRole: null});
                    }}
                    className="block w-full bg-white border border-gray-300 text-gray-900 py-3 px-4 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.customRole && <p className="mt-2 text-sm text-red-600">{errors.customRole}</p>}
                </div>
              )}
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Difficulty Level <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {difficultyLevels.map((level) => {
                  const isSelected = difficulty === level.id;
                  const activeStyle = getDifficultyColor(level.id);
                  return (
                    <div
                      key={level.id}
                      onClick={() => {
                        setDifficulty(level.id);
                        setErrors({...errors, difficulty: null});
                      }}
                      className={`relative rounded-lg border p-4 cursor-pointer text-center transition-colors ${
                        isSelected 
                          ? `${activeStyle} ring-1 ring-current` 
                          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="font-medium mb-1">{level.name}</div>
                      <div className="text-xs opacity-80">{level.description}</div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 rounded-full border border-current bg-white">
                          <div className="w-2 h-2 rounded-full bg-current" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {errors.difficulty && <p className="mt-2 text-sm text-red-600">{errors.difficulty}</p>}
            </div>

            {/* Number of Questions & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Number of Questions
                </label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  {[5, 10, 15].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNumQuestions(num)}
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                        numQuestions === num 
                          ? 'bg-white text-indigo-700 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Duration
                </label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  {[10, 20, 30].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDuration(mins)}
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                        duration === mins 
                          ? 'bg-white text-indigo-700 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {mins} min
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Section */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setShowOptional(!showOptional)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
              >
                <span className="font-medium text-gray-900">Optional Context (Resume & Job Description)</span>
                {showOptional ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </button>
              
              {showOptional && (
                <div className="p-4 space-y-6 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Upload Resume (PDF)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors cursor-pointer bg-gray-50">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input type="file" className="sr-only" accept=".pdf" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF up to 5MB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Job Description</label>
                    <textarea
                      rows={4}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the job description here to get more tailored questions..."
                      className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 p-4 rounded-lg flex items-start">
              <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="ml-3 text-sm text-blue-800">
                The AI interviewer will generate questions based on your selected role, difficulty, and interview type.
              </p>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row-reverse gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors"
              >
                Start Interview
                <ChevronRight className="ml-2 -mr-1 w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;

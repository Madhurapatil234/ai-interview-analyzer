import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Edit2, Save, X, User, Briefcase, Mail, Calendar, Target, Award, BrainCircuit, Activity } from 'lucide-react';

// Fallback in case userProfile is not available in mockData
const defaultUserProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  role: 'User',
  memberSince: 'January 15, 2024',
  targetRole: 'Software Engineer',
  experienceLevel: 'Mid-Level',
  stats: {
    totalInterviews: 24,
    averageScore: 78,
    strongestArea: 'Technical Knowledge',
    areaToImprove: 'Filler Words',
  }
};

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(defaultUserProfile);
  const [editForm, setEditForm] = useState(defaultUserProfile);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleEditClick = () => {
    setEditForm(profileData);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setProfileData(editForm);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const currentData = isEditing ? editForm : profileData;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {getInitials(currentData.name)}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-200 text-gray-600 hover:text-indigo-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="text-center sm:text-left mt-2">
                <h2 className="text-2xl font-bold text-gray-900">{currentData.name}</h2>
                <p className="text-gray-500">{currentData.email}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {currentData.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-0">
              {!isEditing ? (
                <button
                  onClick={handleEditClick}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancelClick}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveClick}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Personal Info */}
            <div className="space-y-6">
              <h4 className="text-md font-semibold text-gray-700 border-b pb-2 flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                Personal Information
              </h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 font-medium">{profileData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1" /> Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 font-medium">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> Member Since
                </label>
                <p className="mt-1 text-sm text-gray-900 font-medium">{profileData.memberSince}</p>
              </div>
            </div>

            {/* Right Column - Professional Info */}
            <div className="space-y-6">
              <h4 className="text-md font-semibold text-gray-700 border-b pb-2 flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                Professional Information
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-500 flex items-center">
                  <Target className="w-3.5 h-3.5 mr-1" /> Target Role
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="targetRole"
                    value={editForm.targetRole}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 font-medium">{profileData.targetRole}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Experience Level</label>
                {isEditing ? (
                  <select
                    name="experienceLevel"
                    value={editForm.experienceLevel}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Entry-Level</option>
                    <option>Mid-Level</option>
                    <option>Senior</option>
                    <option>Lead / Manager</option>
                  </select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900 font-medium">{profileData.experienceLevel}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Statistics Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Interview Statistics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg flex items-center shadow-sm">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 truncate">Total Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{profileData.stats.totalInterviews}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg flex items-center shadow-sm">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 truncate">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{profileData.stats.averageScore}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg flex flex-col justify-center shadow-sm">
              <div className="flex items-center mb-1">
                <BrainCircuit className="w-4 h-4 text-emerald-500 mr-2" />
                <p className="text-sm font-medium text-gray-500 truncate">Strongest Area</p>
              </div>
              <p className="text-lg font-bold text-gray-900 truncate">{profileData.stats.strongestArea}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg flex flex-col justify-center shadow-sm">
              <div className="flex items-center mb-1">
                <Target className="w-4 h-4 text-amber-500 mr-2" />
                <p className="text-sm font-medium text-gray-500 truncate">Area to Improve</p>
              </div>
              <p className="text-lg font-bold text-gray-900 truncate">{profileData.stats.areaToImprove}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

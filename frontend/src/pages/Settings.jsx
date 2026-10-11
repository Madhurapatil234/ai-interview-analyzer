import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Shield, Moon, Sun, Monitor, Lock, AlertTriangle, LogOut, Smartphone, Check, Settings as SettingsIcon } from 'lucide-react';

// Custom Toggle Component
const Toggle = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      className={`${
        enabled ? 'bg-indigo-600' : 'bg-gray-200'
      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
      />
    </button>
  );
};

const Settings = () => {
  const { logout } = useAuth();
  
  // State for Appearance
  const [theme, setTheme] = useState('light');
  const [compactMode, setCompactMode] = useState(false);
  
  // State for Notifications
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyWeekly, setNotifyWeekly] = useState(true);
  const [notifyTips, setNotifyTips] = useState(false);
  const [notifyUpdates, setNotifyUpdates] = useState(true);

  // State for Interview Preferences
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [questionCount, setQuestionCount] = useState('10');
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);

  // State for Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);
  
  // State for Delete Account Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    alert("Password updated successfully!");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    alert("Account deleted.");
    setShowDeleteModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8">
        <SettingsIcon className="w-8 h-8 text-gray-700 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        
        {/* Appearance Section */}
        <div className="p-6 sm:p-8">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900">Appearance</h2>
            <p className="text-sm text-gray-500">Customize how the application looks on your device.</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-3">Theme</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center p-3 border rounded-lg ${theme === 'light' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                  <Sun className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center p-3 border rounded-lg ${theme === 'dark' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                  <Moon className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Dark</span>
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`flex flex-col items-center p-3 border rounded-lg ${theme === 'system' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                  <Monitor className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">System</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Compact Mode</h4>
                <p className="text-sm text-gray-500">Decrease spacing for a denser layout.</p>
              </div>
              <Toggle enabled={compactMode} onChange={setCompactMode} />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="p-6 sm:p-8">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-gray-500" /> Notifications
            </h2>
            <p className="text-sm text-gray-500">Manage what alerts and emails you receive.</p>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive an email with your interview results immediately.</p>
              </div>
              <Toggle enabled={notifyEmail} onChange={setNotifyEmail} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Weekly Summary</h4>
                <p className="text-sm text-gray-500">Receive a weekly digest of your performance.</p>
              </div>
              <Toggle enabled={notifyWeekly} onChange={setNotifyWeekly} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Tips & Suggestions</h4>
                <p className="text-sm text-gray-500">Occasional tips to improve your interview skills.</p>
              </div>
              <Toggle enabled={notifyTips} onChange={setNotifyTips} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Product Updates</h4>
                <p className="text-sm text-gray-500">News about new features and major changes.</p>
              </div>
              <Toggle enabled={notifyUpdates} onChange={setNotifyUpdates} />
            </div>
          </div>
        </div>

        {/* Interview Preferences */}
        <div className="p-6 sm:p-8">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900">Interview Preferences</h2>
            <p className="text-sm text-gray-500">Set default values for new practice sessions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enable Camera by Default</h4>
                <p className="text-sm text-gray-500">Automatically request camera access when starting an interview.</p>
              </div>
              <Toggle enabled={cameraEnabled} onChange={setCameraEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enable Microphone by Default</h4>
                <p className="text-sm text-gray-500">Automatically request microphone access when starting.</p>
              </div>
              <Toggle enabled={micEnabled} onChange={setMicEnabled} />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="p-6 sm:p-8">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-gray-500" /> Security
            </h2>
            <p className="text-sm text-gray-500">Manage your password and security settings.</p>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4 mt-6 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Password
            </button>
          </form>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 flex items-center">
                  <Shield className="w-4 h-4 mr-1.5 text-gray-500" /> Two-Factor Authentication
                </h4>
                <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account.</p>
              </div>
              <Toggle enabled={twoFactor} onChange={setTwoFactor} />
            </div>
          </div>
        </div>

        {/* Account Actions Section */}
        <div className="p-6 sm:p-8">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900">Account Access</h2>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => logout && logout()}
              className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
            <br />
            <button className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2">
              <Smartphone className="w-4 h-4 mr-2" />
              Sign out of all devices
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-6 sm:p-8 border-t-2 border-red-200 bg-red-50 rounded-b-lg">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-red-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" /> Danger Zone
            </h2>
            <p className="text-sm text-red-600 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowDeleteModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Account
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure? This action cannot be undone. All of your data, interview history, and analytics will be permanently removed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

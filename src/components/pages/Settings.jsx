import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Settings = () => {
  const [preferences, setPreferences] = useState({
    gradeAlerts: true,
    assignmentReminders: true,
    attendanceAlerts: true,
    emailNotifications: false,
    pushNotifications: true,
    gradeThreshold: 80,
    reminderDays: 2,
    notificationSound: true,
    autoMarkRead: false
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('gradelink-preferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleToggleChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNumberChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem('gradelink-preferences', JSON.stringify(preferences));
      
      toast.success('Preferences saved successfully');
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPreferences = () => {
    const defaultPreferences = {
      gradeAlerts: true,
      assignmentReminders: true,
      attendanceAlerts: true,
      emailNotifications: false,
      pushNotifications: true,
      gradeThreshold: 80,
      reminderDays: 2,
      notificationSound: true,
      autoMarkRead: false
    };
    
    setPreferences(defaultPreferences);
    toast.success('Preferences reset to defaults');
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{label}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <motion.span
          layout
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </motion.button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Customize your notification preferences and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Preferences */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <ApperIcon name="Bell" className="text-primary" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">
              Notification Preferences
            </h2>
          </div>

          <div className="space-y-2 divide-y divide-gray-100">
            <ToggleSwitch
              enabled={preferences.gradeAlerts}
              onChange={() => handleToggleChange('gradeAlerts')}
              label="Grade Alerts"
              description="Get notified when new grades are posted"
            />
            
            <ToggleSwitch
              enabled={preferences.assignmentReminders}
              onChange={() => handleToggleChange('assignmentReminders')}
              label="Assignment Reminders"
              description="Receive reminders for upcoming assignments"
            />
            
            <ToggleSwitch
              enabled={preferences.attendanceAlerts}
              onChange={() => handleToggleChange('attendanceAlerts')}
              label="Attendance Alerts"
              description="Get notified about attendance issues"
            />
            
            <ToggleSwitch
              enabled={preferences.emailNotifications}
              onChange={() => handleToggleChange('emailNotifications')}
              label="Email Notifications"
              description="Receive notifications via email"
            />
            
            <ToggleSwitch
              enabled={preferences.pushNotifications}
              onChange={() => handleToggleChange('pushNotifications')}
              label="Push Notifications"
              description="Enable browser push notifications"
            />
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <ApperIcon name="Settings" className="text-primary" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">
              Advanced Settings
            </h2>
          </div>

          <div className="space-y-6">
            {/* Grade Threshold */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Grade Alert Threshold
              </label>
              <p className="text-sm text-gray-500 mb-3">
                Get alerted when grades fall below this percentage
              </p>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={preferences.gradeThreshold}
                  onChange={(e) => handleNumberChange('gradeThreshold', e.target.value)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                  {preferences.gradeThreshold}%
                </span>
              </div>
            </div>

            {/* Reminder Days */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Assignment Reminder Days
              </label>
              <p className="text-sm text-gray-500 mb-3">
                How many days before due date to send reminders
              </p>
              <select
                value={preferences.reminderDays}
                onChange={(e) => handleNumberChange('reminderDays', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value={1}>1 day</option>
                <option value={2}>2 days</option>
                <option value={3}>3 days</option>
                <option value={5}>5 days</option>
                <option value={7}>1 week</option>
              </select>
            </div>

            {/* Additional Toggles */}
            <div className="space-y-2 divide-y divide-gray-100">
              <ToggleSwitch
                enabled={preferences.notificationSound}
                onChange={() => handleToggleChange('notificationSound')}
                label="Notification Sound"
                description="Play sound for new notifications"
              />
              
              <ToggleSwitch
                enabled={preferences.autoMarkRead}
                onChange={() => handleToggleChange('autoMarkRead')}
                label="Auto Mark as Read"
                description="Automatically mark notifications as read when viewed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <ApperIcon name="User" className="text-primary" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">
            Account Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Name
            </label>
            <input
              type="text"
              defaultValue="Sarah Johnson"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="sarah.johnson@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="(555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              School District
            </label>
            <input
              type="text"
              defaultValue="Lincoln Unified School District"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              readOnly
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <ApperIcon name="Info" size={14} className="inline mr-1" />
            Account information is managed by your school district. 
            Contact the school office to update your contact details.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
        <Button
          onClick={handleSavePreferences}
          disabled={loading}
          variant="primary"
          className="flex-1 sm:flex-none"
        >
          {loading ? (
            <>
              <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <ApperIcon name="Save" size={16} className="mr-2" />
              Save Preferences
            </>
          )}
        </Button>
        
        <Button
          onClick={handleResetPreferences}
          variant="secondary"
          className="flex-1 sm:flex-none"
        >
          <ApperIcon name="RotateCcw" size={16} className="mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default Settings;
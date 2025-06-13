import ApperIcon from '@/components/ApperIcon';
import ToggleSwitch from '@/components/molecules/ToggleSwitch';

const NotificationPreferencesForm = ({ preferences, handleToggleChange }) => {
  return (
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
  );
};

export default NotificationPreferencesForm;
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import ToggleSwitch from '@/components/molecules/ToggleSwitch';
import FormField from '@/components/molecules/FormField';

const AdvancedSettingsForm = ({ preferences, handleNumberChange, handleToggleChange }) => {
  const reminderOptions = [
    { value: 1, label: '1 day' },
    { value: 2, label: '2 days' },
    { value: 3, label: '3 days' },
    { value: 5, label: '5 days' },
    { value: 7, label: '1 week' },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <ApperIcon name="Settings" className="text-primary" size={20} />
        <h2 className="text-lg font-semibold text-gray-900">
          Advanced Settings
        </h2>
      </div>

      <div className="space-y-6">
        <FormField
          label="Grade Alert Threshold"
          description="Get alerted when grades fall below this percentage"
        >
          <div className="flex items-center space-x-4">
            <Input
              type="range"
              min="50"
              max="95"
              step="5"
              value={preferences.gradeThreshold}
              onChange={(value) => handleNumberChange('gradeThreshold', value)}
            />
            <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
              {preferences.gradeThreshold}%
            </span>
          </div>
        </FormField>

        <FormField
          label="Assignment Reminder Days"
          description="How many days before due date to send reminders"
        >
          <Input
            type="select"
            value={preferences.reminderDays}
            onChange={(value) => handleNumberChange('reminderDays', value)}
            options={reminderOptions}
          />
        </FormField>

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
  );
};

export default AdvancedSettingsForm;
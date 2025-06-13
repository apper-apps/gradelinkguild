import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/organisms/PageHeader';
import NotificationPreferencesForm from '@/components/organisms/NotificationPreferencesForm';
import AdvancedSettingsForm from '@/components/organisms/AdvancedSettingsForm';
import AccountInformation from '@/components/organisms/AccountInformation';
import SettingsActions from '@/components/organisms/SettingsActions';

const SettingsPage = () => {
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
      await new Promise(resolve => setTimeout(resolve, 1000));
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

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings"
        description="Customize your notification preferences and account settings."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationPreferencesForm 
          preferences={preferences} 
          handleToggleChange={handleToggleChange} 
        />
        <AdvancedSettingsForm 
          preferences={preferences} 
          handleNumberChange={handleNumberChange} 
          handleToggleChange={handleToggleChange} 
        />
      </div>

      <AccountInformation />

      <SettingsActions 
        loading={loading} 
        onSave={handleSavePreferences} 
        onReset={handleResetPreferences} 
      />
    </div>
  );
};

export default SettingsPage;
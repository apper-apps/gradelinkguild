import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const SettingsActions = ({ loading, onSave, onReset }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
      <Button
        onClick={onSave}
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
        onClick={onReset}
        variant="secondary"
        className="flex-1 sm:flex-none"
      >
        <ApperIcon name="RotateCcw" size={16} className="mr-2" />
        Reset to Defaults
      </Button>
    </div>
  );
};

export default SettingsActions;
import { 
  FileText, 
  Users, 
  Calendar, 
  Bell, 
  Settings, 
  BookOpen,
  AlertCircle,
  Search,
  Inbox,
  Plus
} from 'lucide-react';

const EmptyState = ({ 
  icon = 'FileText', 
  title = 'No items found', 
  description = 'There are no items to display at the moment.', 
  className = '',
  action = null 
}) => {
  const getIcon = (iconName) => {
    const iconMap = {
      FileText,
      Users,
      Calendar,
      Bell,
      Settings,
      BookOpen,
      AlertCircle,
      Search,
      Inbox,
      Plus
    };
    
    const IconComponent = iconMap[iconName] || FileText;
    return <IconComponent className="w-12 h-12 text-gray-400" />;
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="mb-4">
        {getIcon(icon)}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-sm">
        {description}
      </p>
      
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
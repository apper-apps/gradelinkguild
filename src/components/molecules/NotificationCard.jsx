import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const NotificationCard = ({ notification, onMarkAsRead, className = '' }) => {
  const getTypeIcon = () => {
    switch (notification.type) {
      case 'grade': return 'Award';
      case 'assignment': return 'FileText';
      case 'attendance': return 'Calendar';
      default: return 'Bell';
    }
  };

  const getPriorityColor = () => {
    switch (notification.priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const formatTime = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 ${
        !notification.read ? 'border-l-4 border-l-primary' : ''
      } ${className}`}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${
          notification.type === 'grade' ? 'bg-success/10 text-success' :
          notification.type === 'assignment' ? 'bg-primary/10 text-primary' :
          'bg-info/10 text-info'
        }`}>
          <ApperIcon name={getTypeIcon()} size={16} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-sm font-semibold text-gray-900">{notification.title}</h3>
            <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
              <Badge variant={getPriorityColor()} size="sm">
                {notification.priority}
              </Badge>
              {!notification.read && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs text-primary hover:text-primary/80"
                >
                  Mark read
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2 break-words">{notification.message}</p>
          <p className="text-xs text-gray-500">{formatTime(notification.timestamp)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationCard;
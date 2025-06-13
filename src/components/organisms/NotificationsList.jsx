import { motion } from 'framer-motion';
import NotificationCard from '@/components/molecules/NotificationCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';

const NotificationsList = ({ notifications, loading, onMarkAsRead, emptyTitle, emptyDescription, className = '' }) => {
  if (loading) {
    return <SkeletonLoader count={5} type="notification" className={className} />;
  }

  if (notifications.length === 0) {
    return (
      <EmptyState
        icon="Bell"
        title={emptyTitle}
        description={emptyDescription}
        className={className}
      />
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {notifications.map((notification, index) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <NotificationCard
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default NotificationsList;
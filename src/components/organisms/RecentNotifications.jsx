import { motion } from 'framer-motion';
import NotificationCard from '@/components/molecules/NotificationCard';
import EmptyState from '@/components/molecules/EmptyState';

const RecentNotifications = ({ notifications, onMarkAsRead }) => {
  if (notifications.length === 0) {
    return (
      <EmptyState
        icon="Bell"
        title="No notifications"
        description="You're all caught up! New notifications will appear here."
        className="py-8"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NotificationCard
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              className="border-0 shadow-none bg-gray-50"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotifications;
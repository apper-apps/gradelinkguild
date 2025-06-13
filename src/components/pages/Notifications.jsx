import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import NotificationCard from '@/components/molecules/NotificationCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { notificationService } from '@/services';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { id: 'all', label: 'All', icon: 'List' },
    { id: 'unread', label: 'Unread', icon: 'Bell' },
    { id: 'grade', label: 'Grades', icon: 'Award' },
    { id: 'assignment', label: 'Assignments', icon: 'FileText' },
    { id: 'attendance', label: 'Attendance', icon: 'Calendar' }
  ];

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    filterNotifications();
  }, [notifications, activeFilter]);

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err) {
      setError(err.message || 'Failed to load notifications');
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const filterNotifications = () => {
    let filtered = [...notifications];

    switch (activeFilter) {
      case 'unread':
        filtered = notifications.filter(n => !n.read);
        break;
      case 'grade':
        filtered = notifications.filter(n => n.type === 'grade');
        break;
      case 'assignment':
        filtered = notifications.filter(n => n.type === 'assignment');
        break;
      case 'attendance':
        filtered = notifications.filter(n => n.type === 'attendance');
        break;
      default:
        // 'all' - no filtering needed
        break;
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredNotifications(filtered);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
      toast.success('Notification marked as read');
    } catch (error) {
      toast.error('Failed to mark notification as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all notifications as read');
    }
  };

  const getNotificationCounts = () => {
    return {
      total: notifications.length,
      unread: notifications.filter(n => !n.read).length,
      grade: notifications.filter(n => n.type === 'grade').length,
      assignment: notifications.filter(n => n.type === 'assignment').length,
      attendance: notifications.filter(n => n.type === 'attendance').length
    };
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          ))}
        </div>
        <SkeletonLoader count={5} type="notification" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadNotifications} />;
  }

  const counts = getNotificationCounts();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
            Notifications
          </h1>
          <p className="text-gray-600">
            Stay updated with real-time academic alerts and important updates.
          </p>
        </div>
        {counts.unread > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="secondary">
            <ApperIcon name="CheckCheck" size={16} className="mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
        >
          <div className="text-2xl font-bold text-gray-900">{counts.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
        >
          <div className="text-2xl font-bold text-primary">{counts.unread}</div>
          <div className="text-sm text-gray-600">Unread</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
        >
          <div className="text-2xl font-bold text-success">{counts.grade}</div>
          <div className="text-sm text-gray-600">Grades</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
        >
          <div className="text-2xl font-bold text-warning">{counts.assignment}</div>
          <div className="text-sm text-gray-600">Assignments</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
        >
          <div className="text-2xl font-bold text-info">{counts.attendance}</div>
          <div className="text-sm text-gray-600">Attendance</div>
        </motion.div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ApperIcon name={filter.icon} size={14} />
            <span>{filter.label}</span>
            {filter.id !== 'all' && (
              <Badge variant={activeFilter === filter.id ? 'default' : 'primary'} size="sm">
                {filter.id === 'unread' ? counts.unread :
                 filter.id === 'grade' ? counts.grade :
                 filter.id === 'assignment' ? counts.assignment :
                 filter.id === 'attendance' ? counts.attendance :
                 counts.total}
              </Badge>
            )}
          </motion.button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon="Bell"
          title={`No ${activeFilter === 'all' ? '' : activeFilter} notifications`}
          description={
            activeFilter === 'all' 
              ? "You're all caught up! New notifications will appear here."
              : `No ${activeFilter} notifications found. Try a different filter.`
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NotificationCard
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;